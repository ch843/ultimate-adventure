import Hero from "../sections/Hero.tsx";
import ContactForm from "../sections/ContactForm.tsx";

const About = () => {
  return (
    <>
      <Hero
        imgUrl="https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/about-page/canyonLandscape.png"
        title="About"
      />
      <section className="bg-white text-gray-800 p-6 my-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <img
              src="https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/about-page/Sharon%20Rogers.avif"
              alt="Sharon Rogers"
              className="rounded-full w-60 h-60 object-cover shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-5xl font-semibold text-teal-800 uppercase mb-4">
              Sharon Rogers
            </h1>
            <p className="text-xl font-light leading-relaxed tracking-wide">
              Sharon has loved sharing her passion for the outdoors with youth
              and others for over 30 years. She loves almost any kind of outdoor
              adventure, including climbing, rappelling, river rafting, and
              hiking, but especially loves to guide canyoneering trips through
              the beautiful slot canyons of the desert southwest.
            </p>
            <p className="text-xl font-light leading-relaxed tracking-wide mt-4">
              In her 30 years of canyoneering experience, she's led many
              different kinds of groups through more than 100 canyons. Let
              Sharon customize a great adventure for your group. You'll quickly
              learn to appreciate her knowledge, experience, attention to
              detail, and especially her passion for scenic outdoor adventure.
            </p>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
};

export default About;
