import Hero from '../sections/Hero';
import FeaturedActivities from '../sections/FeaturedActivities.tsx';
import CompanyFeature from '../sections/CompanyFeature.tsx';
import Newsletter from '../sections/Newsletter';
import CallToAction from '../sections/CallToAction';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedActivities />
            <CompanyFeature />
            <Newsletter />
            <CallToAction />
        </>
    );
};

export default Home;