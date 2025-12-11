import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import CategorySection from "@/components/CategorySection";
import Video from "@/components/Video";
import Load from "@/components/Load";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <NewArrivals />
      <CategorySection />
      <Video />
      <Load />
      <Footer />
      
     
    </div>
  );
};

export default Index;