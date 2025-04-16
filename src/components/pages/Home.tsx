import Hero from '../sections/Hero';
import FeaturedActivities from '../sections/FeaturedActivities.tsx';
import CompanyFeature from '../sections/CompanyFeature.tsx';
import ContactForm from '../sections/ContactForm.tsx';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedActivities />
            <CompanyFeature />
            <ContactForm />
        </>
    );
};

export default Home;