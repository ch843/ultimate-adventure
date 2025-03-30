import Hero from '../sections/Hero';
import FeaturedDestinations from '../sections/FeaturedDestinations';
import FeaturedExperiences from '../sections/FeaturedExperiences';
import Newsletter from '../sections/Newsletter';
import CallToAction from '../sections/CallToAction';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedDestinations />
            <FeaturedExperiences />
            <Newsletter />
            <CallToAction />
        </>
    );
};

export default Home;