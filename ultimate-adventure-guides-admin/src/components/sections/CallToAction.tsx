const CallToAction = () => {
  return (
    <section className="relative py-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070')",
            filter: "brightness(0.4)"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready For Your Next Adventure?</h2>
          <p className="text-lg mb-8">
            Let us help you plan the perfect adventure tailored to your interests and preferences.
            Our expert guides are ready to create an unforgettable experience for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-md text-lg">
              Start Planning
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md border-2 border-white text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;