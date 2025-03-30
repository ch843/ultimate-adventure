const experiences = [
  {
    id: 1,
    name: "Hiking the Inca Trail",
    location: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",
    duration: "4 days",
    difficulty: "Moderate",
  },
  {
    id: 2,
    name: "Northern Lights Safari",
    location: "Norway",
    image: "https://images.unsplash.com/photo-1579033462043-0f11a7862f7d?q=80&w=2070&auto=format&fit=crop",
    duration: "5 days",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Great Barrier Reef Diving",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop",
    duration: "3 days",
    difficulty: "Moderate",
  },
];

const ExperienceCard = ({ experience }: { experience: typeof experiences[0] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-dark">{experience.name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{experience.location}</p>
        
        <div className="flex space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>{experience.difficulty}</span>
          </div>
        </div>
      </div>
      
      {/* Button */}
      <div className="px-6 pb-6 mt-auto">
        <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

const FeaturedExperiences = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">Featured Experiences</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unforgettable adventures carefully curated by our travel experts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md">
            Browse All Experiences
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;