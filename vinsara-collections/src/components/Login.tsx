import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authService } from "../services/api"; 
// 1. IMPORT GOOGLE HOOK
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  
  // Toggle between Login and Signup view
  const [view, setView] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if already logged in, redirect to profile if yes
    if (localStorage.getItem("userToken")) {
      navigate("/user");
    }

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- STANDARD EMAIL/PASSWORD SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (view === 'signup' && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
    }

    try {
        let loginResponse;

        if (view === 'login') {
            // --- CASE A: LOGIN ---
            loginResponse = await authService.login({
                email: formData.email,
                password: formData.password
            });
        } else {
            // --- CASE B: SIGNUP ---
            // 1. Create the Account
            await authService.signup({
                email: formData.email,
                password: formData.password,
                first_name: formData.fullName, 
                phone: "" 
            });

            // 2. Account created! Now AUTO-LOGIN to get the token
            loginResponse = await authService.login({
                email: formData.email,
                password: formData.password
            });
            
            toast.success("Account created successfully!");
        }

        // --- SUCCESS HANDLING ---
        const token = loginResponse.access || loginResponse.key || loginResponse.token;
        
        if (token) {
            localStorage.setItem("userToken", token);
            if (view === 'login') toast.success("Welcome back!");
            navigate("/user");
        } else {
            toast.error("Authentication successful, but no token received.");
        }

    } catch (error: any) {
        console.error("Auth Error:", error);
        
        // Handle Errors
        let message = "Something went wrong.";
        if (error.email) {
            message = `Email: ${error.email[0]}`;
        } else if (error.detail) {
            message = error.detail;
        } else if (error.password) {
            message = `Password: ${error.password[0]}`;
        } else if (error.non_field_errors) {
            message = error.non_field_errors[0];
        }
        
        toast.error(message);
    } finally {
        setIsLoading(false);
    }
  };

  // --- GOOGLE LOGIN LOGIC ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        // We get a 'code' from Google, pass it to Django
        const res = await authService.googleLogin({
          code: tokenResponse.code,
        });

        // Django returns the standard key/token
        const token = res.key || res.access || res.token;
        if (token) {
           localStorage.setItem("userToken", token);
           toast.success("Logged in with Google!");
           navigate("/user");
        }
      } catch (err) {
        console.error("Google Auth Failed", err);
        toast.error("Google Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Google Login Failed");
      setIsLoading(false);
    },
    flow: 'auth-code', // Important for Django backend exchange
  });

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          
          <button 
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#440504] transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="mb-12">
            <p className="text-sm font-medium text-gray-400 tracking-widest mb-3 uppercase">
                {view === 'login' ? 'Welcome Back' : 'Start your journey'}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {view === 'login' ? 'Log in to account' : 'Create new account'}<span className="text-[#440504]">.</span>
            </h1>
            <p className="text-gray-500 text-base">
              {view === 'login' ? "Don't Have An Account? " : "Already A Member? "}
              <button 
                onClick={() => setView(view === 'login' ? 'signup' : 'login')} 
                className="text-[#440504] hover:underline font-medium focus:outline-none"
              >
                {view === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {view === 'signup' && (
                <div className="animate-fade-in-up">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border-0 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#440504] outline-none transition-all rounded-lg"
                        placeholder="John Doe"
                    />
                </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-0 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#440504] outline-none transition-all rounded-lg"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-600">Password</label>
                {view === 'login' && (
                    <a href="#" className="text-sm text-[#440504] hover:underline font-medium">Forgot Password?</a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-0 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#440504] outline-none transition-all rounded-lg"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
            </div>

            {view === 'signup' && (
                <div className="animate-fade-in-up">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-4 bg-gray-50 border-0 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#440504] outline-none transition-all rounded-lg"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-[#440504] hover:bg-[#5a0605] text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2 rounded-lg flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (view === 'login' ? 'Log in' : 'Create Account')}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-400">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => googleLogin()} 
              className="w-full px-8 py-4 bg-white border-2 border-gray-200 hover:border-[#440504] text-gray-700 font-semibold transition-all flex items-center justify-center gap-3 group rounded-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="group-hover:text-[#440504] transition-colors">Continue with Google</span>
            </button>
          </form>

        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#440504]/10 to-rose-900/10"></div>
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1200&fit=crop" 
          alt="Fashion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#440504]/80 via-[#440504]/20 to-transparent"></div>
        
        <div className="absolute bottom-12 left-12 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-1.5 4-4 6-8 6 0 4.5 3.5 8 8 10 4.5-2 8-5.5 8-10-4 0-6.5-2-8-6z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-light tracking-wider">vinsaraa</h2>
              <p className="text-sm text-white/80 italic">Where tradition meets modernity</p>
            </div>
          </div>
          <p className="text-white/90 text-lg max-w-md">
            Experience luxury fashion that blends timeless tradition with contemporary elegance.
          </p>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={() => navigate("/")}
          className="fixed bottom-8 right-8 bg-[#440504] hover:bg-[#5a0605] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50 group"
        >
          <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}
    </div>
  );
}