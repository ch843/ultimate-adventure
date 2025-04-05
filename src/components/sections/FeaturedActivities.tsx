interface Activity {
  id: number;
  imgPath: string;
  name: string;
  description: string;
}

const featuredActivities = [
    {
        id: 1,
        imgPath: '/src/assets/canyon-rock-img.avif',
        name: "Canyoneering",
        description: "Locations such as Zion, Capital Reef, and more",
    },
    {
        id: 2,
        imgPath: '/src/assets/rappelling1.avif',
        name: "Climbing",
        description: "Rock climbing, ice climbing, and more",
    },
    {
        id: 3,
        imgPath: '/src/assets/canyon-rock-img.avif',
        name: "Rafting",
        description: "White water",
    }
]


const FeaturedActivityCard = ({ activity }: { activity: Activity }) => {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg shadow-lg relative h-80">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${activity.imgPath})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex items-center gap-2">
        <h3 className="text-4xl font-bold mb-2">{activity.name}</h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
      </div>
    </div>
  );
};

const FeaturedActivities = () => {
  return (
    <section className="py-16 bg-orange-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-gray-800">FEATURED ACTIVITIES</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredActivities.map((activity) => (
            <FeaturedActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedActivities;