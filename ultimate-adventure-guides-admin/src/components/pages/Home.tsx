import Hero from '../sections/Hero';
import FeaturedActivities from '../sections/FeaturedActivities.tsx';
import CompanyFeature from '../sections/CompanyFeature.tsx';

const Home = () => {

  return (
    <>
      <Hero
        imgUrl='https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod//canyon-rock-img.avif'
        ifMain={true}
        title='Ultimate Adventure Guides'

      />
      <FeaturedActivities />
      <CompanyFeature />
    </>
  );
};

export default Home;
