const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070')",
            filter: "brightness(0.7)"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Discover The World's Most Amazing Adventures
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Expert travel guides and tips for your next unforgettable journey
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-md text-lg">
            Explore Destinations
          </button>
          <button className="bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md border-2 border-white text-lg">
            View Adventures
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;