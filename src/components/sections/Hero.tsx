import {Link} from "react-router-dom";

type HeroProps = {
    imgUrl: string;
    ifMain?: boolean;
    title: string;
};

const Hero = ({ imgUrl, ifMain = false, title }: HeroProps) => {
    return (
          <section className={`relative h-[70vh] min-h-[550px] flex items-center`}>
          {/* Background image with overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-48" style={{backgroundImage: `url('${imgUrl}')`}} />
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 z-10 text-white text-center flex-col items-center">
                  {ifMain &&
                      <div className="bg-secondary hover:bg-secondary/90 text-white py-3 mb-8 font-light rounded-md text-4xl">
                          CANYONEERING | ROCK CLIMBING | RAPPELLING | AND MORE
                      </div>
                  }
                  <p className="text-8xl font-medium mb-8 max-w-8xl mx-auto uppercase">
                      {title}
                  </p>
                  {ifMain &&
                      <Link to="/book">
                          <button className="bg-transparent hover:bg-white/10 text-white my-3 py-3 px-8 rounded-md border-2 border-white text-3xl">
                            ADVENTURE STARTS HERE
                          </button>
                      </Link>
                  }
              </div>
          </section>
    );
};

export default Hero;