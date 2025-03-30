import Hero from '../sections/Hero';
import FeaturedDestinations from '../sections/FeaturedDestinations';
import FeaturedExperiences from '../sections/FeaturedExperiences';
import Testimonials from '../sections/Testimonials';
import Newsletter from '../sections/Newsletter';
import CallToAction from '../sections/CallToAction';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <FeaturedExperiences />
      <Testimonials />
      <Newsletter />
      <CallToAction />
    </>
  );
};

export default HomePage;