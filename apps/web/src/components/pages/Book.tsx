import Hero from "../sections/Hero.tsx";
import { Tables } from "../../definitions/generatedDefinitions.ts";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@ultimate-adventure/shared-components";
import ContactForm from "../sections/ContactForm.tsx";
import { useActivityCards } from "../../hooks/useActivityCards";

const AdventureCard = ({ card, type }: { card: Tables<'Adventure Cards'>, type: string }) => {
  return (
    <>
      {card.category === type &&
        <Card className="overflow-hidden">
          <img
            src={card.img_link}
            alt={card.title}
            className="h-70 w-full object-cover"
          />
          <CardHeader>
            <CardTitle className="text-3xl tracking-wide uppercase">{card.title}</CardTitle>
            <p className="text-orange-400 text-xl font-light tracking-wide uppercase">{card.location}</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {card.price_pp && (
              <p className="font-medium">${card.price_pp} / PERSON
                {card.hourly && <span> / HOUR</span>}
              </p>
            )}
            {card.half_day_pp && card.full_day_pp && (
              <>
                <p>HALF-DAY: ${card.half_day_pp}</p>
                <p>FULL-DAY: ${card.full_day_pp}</p>
              </>
            )}
            {card.adult_price && card.child_price && (
              <>
                <p>ADULT: ${card.adult_price}</p>
                <p>CHILD (8-11): ${card.child_price}</p>
              </>
            )}
            {card.min_people && <p>MIN: {card.min_people} PEOPLE</p>}
            {card.max_people && <p>MAX: {card.max_people} PEOPLE</p>}

            <Button
              variant="link"
              className="text-orange-400 mt-2 mb-4 p-0 h-auto font-normal underline"
              asChild
            >
              <a href={`/activity/${card.card_id}`}>MORE INFO</a>
            </Button>
          </CardContent>
        </Card>
      }
    </>
  );
};

const Book = () => {
  const { activityCards, isLoading: loading } = useActivityCards();

  const activityCategories = ["Canyoneering", "Climbing", "Rafting"];

  return (
    <>
      <Hero
        imgUrl='https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod//hikingRocks.avif'
        title='Choose your adventure'
      />

      <div className="container mx-auto py-12 px-4">
        {loading ? (
          <p className="text-center">Loading adventures...</p>
        ) : (
          <>
            {activityCategories.map(category => (
              <section key={category}>
                <h2 className="text-5xl font my-8 text-center uppercase">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-20">
                  {activityCards.map(card => (
                    <AdventureCard key={card.card_id} card={card} type={category} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
      <ContactForm />
    </>
  );
};

export default Book;
