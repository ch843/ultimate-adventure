import Testimonials from "../sections/Testimonials.tsx";
import Hero from "../sections/Hero.tsx";
import ContactForm from "../sections/ContactForm.tsx";


const Reviews = () => {
    return (
        <>
            <Hero
                imgUrl="https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/review-profiles/testimonial-background.avif"
                title="Testimonials"
            />
            <Testimonials />
            <ContactForm />
        </>
    );
};

export default Reviews;