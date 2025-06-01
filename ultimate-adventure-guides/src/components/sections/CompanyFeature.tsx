import {Link} from "react-router-dom";

const CompanyFeature = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-4xl mb-4 text-emerald-800 tracking-wide">YOUR NEXT ADVENTURE STARTS TODAY</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-lg">
          <div className='py-20 flex justify-center items-center' style={{backgroundImage: "url('https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod//rappelling1.avif')"}}>
                <Link to="/about" type="button" className='bg-emerald-800 text-white rounded-2xl p-8 text-xl shadow-lg'>
                  ABOUT US
                </Link>
          </div>
          <div className='bg-orange-100 py-14 px-14 text-2xl font-light tracking-wide leading-loose text-center'>
            With over 30 years of experience, Ultimate Adventure Guides
            is your gateway to amazing outdoor adventures. We'll help you
            create an amazing adventure based on your abilities and the kind
            of experience you'd like to have. We also offer pre-planned adventures
            to some of our favorite past destinations.
          </div>
          <div className='py-20 flex justify-center items-center' style={{backgroundImage: "url('https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod//rappelling2.avif')"}}>
              <Link to="/book" type="button" className='bg-orange-100 text-gray-700 rounded-2xl py-8 px-10 text-xl shadow-lg'>
                JOIN US
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyFeature;