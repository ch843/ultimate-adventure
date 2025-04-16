import {ActivityCardDAO} from "../../model/ActivityCardDAO.ts";
import Hero from "../sections/Hero.tsx";

const Book = () => {
    async function getActivityCards() {
        await ActivityCardDAO.getAllActivityCards()
    }

    return (
        <>
            <Hero
                imgUrl='https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod//hikingRocks.avif'
                title='Design your adventure'
                bannerHeight={60}
            />
        </>
    );
};

export default Book;