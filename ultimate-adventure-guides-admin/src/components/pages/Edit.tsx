import { useEffect, useState } from "react";
import { ActivityCardDAO } from "../../model/ActivityCardDAO.ts";
import { Tables } from "../../definitions/generatedDefinitions.ts";
import { Modal } from "../shared/modal.tsx";
import EditCardForm from "../forms/EditCardForm.tsx";

const AdventureCard = ({ card, type, onEdit }: { card: Tables<'Adventure Cards'>, type: string, onEdit: (cardId: number) => void }) => {
  return (
    <>
      {card.category === type &&
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={card.img_link}
            alt={card.title}
            className="h-70 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-3xl font tracking-wide uppercase">{card.title}</h3>
            <p className="text-orange-400 text-xl font-light tracking-wide uppercase">{card.location}</p>
            {card.price_pp && (
              <p className="mt-2">${card.price_pp} / PERSON
                {card.hourly && <span> / HOUR</span>}
              </p>
            )}
            {card.half_day_pp && card.full_day_pp && (
              <>
                <p className="mt-2">
                  HALF-DAY: ${card.half_day_pp}
                </p>
                <p className="mt-1">
                  FULL-DAY: ${card.full_day_pp}
                </p>
              </>
            )}
            {card.adult_price && card.child_price && (
              <>
                <p className="mt-2">
                  ADULT: ${card.adult_price}
                </p>
                <p className="mt-1">
                  CHILD (8-11): ${card.child_price}
                </p>
              </>
            )}
            {card.min_people && (
              <p className="mt-1">
                MIN: {card.min_people} PEOPLE
              </p>
            )}
            {card.max_people && (
              <p className="mt-1">
                MAX: {card.max_people} PEOPLE
              </p>
            )}
            <div className="flex gap-2 mt-4">
              <button
                  onClick={() => onEdit(card.card_id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                EDIT
              </button>
              {card.active ? (
                  <div className="bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-white">
                    Active
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                    Inactive
                  </div>
                )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

const Edit = () => {
  const [activityCards, setActivityCards] = useState<Tables<'Adventure Cards'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

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

    void fetchCards();
  }, []);

  const activityCategories = ["Canyoneering", "Climbing", "Rafting"];

  const handleEditCard = (cardId: number) => {
    setEditingCardId(cardId);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingCardId(null);
  };

  const handleSaveCard = async () => {
    // Refresh the cards list after saving
    try {
      const cards = await ActivityCardDAO.getAllActivityCards();
      setActivityCards(cards);
    } catch (error) {
      console.error("Error refreshing activity cards:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto py-12 px-4">
        <h1 className="mt-7 text-center text-6xl p-10 pb-0">EDIT ADVENTURES</h1>
        <h3 className="text-center italic text-md mt-3">Edit available activities for clients, including details and pricing</h3>
        {loading ? (
          <p className="text-center">Loading adventures...</p>
        ) : (
          <>
            {activityCategories.map(category => (
              <section key={category}>
                <h2 className="text-5xl font my-8 text-center uppercase">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-20">
                  {activityCards.map(card => (
                    <AdventureCard key={card.card_id} card={card} type={category} onEdit={handleEditCard} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>

      {editingCardId && (
        <Modal isOpen={editModalOpen} onClose={handleCloseModal}>
          <EditCardForm
            cardId={editingCardId}
            onSave={handleSaveCard}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Edit;
