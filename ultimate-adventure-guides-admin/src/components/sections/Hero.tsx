import {Link} from "react-router-dom";

type HeroProps = {
    imgUrl: string;
};

const Hero = ({ imgUrl }: HeroProps) => {
    return (
        <>
            <section className={`relative h-[70vh] min-h-[550px] flex items-center`}>
            {/* Background image with overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-48" style={{backgroundImage: `url('${imgUrl}')`}} />
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 z-10 text-white text-center flex-col items-center">
                  <p className="text-4xl md:text-6xl font-medium mb-8 max-w-8xl mx-auto uppercase">
                      Welcome, Admin
                  </p>

                  <div className="flex flex-col flex-wrap items-center justify-center w-full">
                      <Link to="/edit">
                          <button className="bg-transparent hover:bg-white/10 text-white my-3 py-2 px-4 md:py-3 md:px-10 rounded-md border-2 border-white text-lg sm:text-xl md:text-3xl">
                              Edit Adventures
                          </button>
                      </Link>
                      <Link to="/club">
                          <button className="bg-transparent hover:bg-white/10 text-white my-3 py-2 px-4 md:py-3 md:px-10 rounded-md border-2 border-white text-lg sm:text-xl md:text-3xl">
                              Manage Club Membership
                          </button>
                      </Link>
                  </div>
              </div>
            </section>
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-4xl mt-5 text-center">More on this page is coming soon!</h1>
            </div>
        </>

    );
};

export default Hero;