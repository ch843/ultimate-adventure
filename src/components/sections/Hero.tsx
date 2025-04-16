type HeroProps = {
    imgUrl: string;
    ifMain?: boolean;
    title: string;
    bannerHeight?: number;
};

const Hero = ({ imgUrl, ifMain = false, title, bannerHeight = 80 }: HeroProps) => {
    return (
          <section className={`relative h-[${bannerHeight}vh] min-h-[500px] flex items-center`}>
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
                  <p className="text-8xl font-medium mb-8 max-w-8xl mx-auto">
                      {title.toUpperCase()}
                  </p>
                  {ifMain &&
                      <button className="bg-transparent hover:bg-white/10 text-white my-3 py-3 px-8 rounded-md border-2 border-white text-3xl">
                        ADVENTURE STARTS HERE
                      </button>
                  }
              </div>
          </section>
    );
};

export default Hero;