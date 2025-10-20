import { Link } from "react-router-dom";
import { Button } from "@ultimate-adventure/shared-components";

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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-48"
          style={{ backgroundImage: `url('${imgUrl}')` }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-white text-center flex-col items-center">
        {ifMain && (
          <div className="hover:bg-secondary/90 text-white py-3 mb-8 font-light rounded-md text-xl sm:text-2xl md:text-6xl">
            CANYONEERING | ROCK CLIMBING | RAPPELLING | AND MORE
          </div>
        )}
        <p className="text-4xl md:text-6xl font-medium mb-8 max-w-8xl mx-auto uppercase">
          {title}
        </p>
        {ifMain && (
          <Link to="/book">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent hover:bg-white/10 text-white my-3 border-2 border-white text-lg sm:text-xl md:text-3xl md:py-3 md:px-10"
            >
              ADVENTURE STARTS HERE
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Hero;
