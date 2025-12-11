import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'SLEEVED',
    image: 'https://i.pinimg.com/736x/39/82/bf/3982bfebdb524d24b494e86a1b64f5b0.jpg',
    alt: 'Sleeved collection',
    href: '/sleeved'
  },
  {
    id: 2,
    title: 'SLEEVELESS',
    image: 'https://i.pinimg.com/474x/3d/0c/6e/3d0c6e2f69b956c80a3ec8943438743a.jpg',
    alt: 'Sleeveless collection',
    href: '/sleeveless'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-center text-xl md:text-2xl font-light tracking-[0.3em] text-foreground">
            COLLECTIONS
          </h1>
        </div>
      </header>

      {/* Category Section */}
    <main className="w-full py-12 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          to={category.href}
          className="group relative overflow-hidden cursor-pointer block animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
            <img
              src={category.image}
              alt={category.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-500" />

            {/* Category Label */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-background px-8 py-3 border border-border 
                  group-hover:bg-[#440504] group-hover:border-[#440504] transition-all duration-300">
                <span className="text-sm tracking-[0.2em] font-medium text-foreground 
                    group-hover:text-white transition-colors duration-300">
                  {category.title}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</main>

    </div>
  );
};

export default Index;
