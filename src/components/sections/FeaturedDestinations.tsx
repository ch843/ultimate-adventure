const destinations = [
  {
    id: 1,
    name: "New Zealand",
    image: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=1936&auto=format&fit=crop",
    description: "Explore breathtaking landscapes from mountains to beaches",
  },
  {
    id: 2,
    name: "Iceland",
    image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=2070&auto=format&fit=crop",
    description: "Discover volcanic landscapes and northern lights",
  },
  {
    id: 3,
    name: "Costa Rica",
    image: "https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=2034&auto=format&fit=crop",
    description: "Adventure through rainforests and pristine beaches",
  },
  {
    id: 4,
    name: "Thailand",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop",
    description: "Experience vibrant culture and island paradise",
  },
];

const DestinationCard = ({ destination }: { destination: typeof destinations[0] }) => {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg shadow-lg relative h-80">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${destination.image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
        <p className="text-sm mb-4 opacity-90">{destination.description}</p>
        <div className="transition-transform duration-300 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          <button className="bg-secondary hover:bg-secondary/90 text-white font-medium py-2 px-4 rounded-md text-sm">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedDestinations = () => {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">Featured Destinations</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of the world's most spectacular adventure destinations
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;