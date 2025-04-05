const CompanyFeature = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">Featured Experiences</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unforgettable adventures carefully curated by our travel experts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-lg">
          <div className='py-20'>
            <div className='flex-col'>
                <p>About Us</p>
                <button className='bg-emerald-800 text-white p-6 opacity-50'>Click here</button>
            </div>
          </div>
          <div className='bg-orange-100 py-20'>
            Greeeeeeeen
          </div>
          <div className='py-20'>
            Join us on ur next adventure
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyFeature;