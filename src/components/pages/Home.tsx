import Hero from '../sections/Hero';
import FeaturedActivities from '../sections/FeaturedActivities.tsx';
import FeaturedExperiences from '../sections/FeaturedExperiences';
import Newsletter from '../sections/Newsletter';
import CallToAction from '../sections/CallToAction';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedActivities />
            <FeaturedExperiences />
            <Newsletter />
            <CallToAction />
        </>
    );
};

export default Home;