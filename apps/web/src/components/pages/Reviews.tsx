import Reviews from "../sections/Reviews.tsx";
import Hero from "../sections/Hero.tsx";
import ContactForm from "../sections/ContactForm.tsx";


const _Reviews = () => {
    return (
        <>
            <Hero
                imgUrl="https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/review-profiles/testimonial-background.avif"
                title="Reviews"
            />
            <Reviews />
            <ContactForm />
        </>
    );
};

export default _Reviews;