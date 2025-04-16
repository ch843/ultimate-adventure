import { useEffect, useState } from "react";
import { ActivityCardDAO } from "../../model/ActivityCardDAO.ts";
import Hero from "../sections/Hero.tsx";
import { Tables } from "../../definitions/generatedDefinitions.ts";

const AdventureCard = ({ card }: { card: Tables<'Adventure Cards'> }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={card.img_link} 
        alt={card.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{card.title}</h3>
        <p className="text-orange-500">{card.location}</p>
        {card.price_pp && (
          <p className="mt-2">${card.price_pp} / PERSON</p>
        )}
        {card.min_people && card.max_people && (
          <p className="mt-1">
            MIN: {card.min_people} PEOPLE<br />
            MAX: {card.max_people} PEOPLE
          </p>
        )}
        <a href={`/activity/${card.card_id}`} className="text-orange-500 mt-2 inline-block">
          MORE INFO
        </a>
      </div>
    </div>
  );
};

const Book = () => {
    const [activityCards, setActivityCards] = useState<Tables<'Adventure Cards'>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCards() {
            try {
                const cards = await ActivityCardDAO.getAllActivityCards();
                setActivityCards(cards);
            } catch (error) {
                console.error("Error fetching activity cards:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchCards();
    }, []);

    return (
        <>
            <Hero
                imgUrl='https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod//hikingRocks.avif'
                title='Design your adventure'
                bannerHeight={60}
            />
            
            <div className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Available Adventures</h2>
                
                {loading ? (
                    <p className="text-center">Loading adventures...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activityCards.map(card => (
                            <AdventureCard key={card.card_id} card={card} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Book;