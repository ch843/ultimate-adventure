import { useState, useEffect } from 'react';
import { useActivityCard } from '../../hooks/useActivityCards';
import { useCardDetails, useUpdateCardDetails } from '../../hooks/useCardDetails';
import { useUpdateActivityCard } from '../../hooks/useActivityCards';

interface EditCardFormProps {
  cardId: number;
  onSave: () => void;
  onClose: () => void;
}

const EditCardForm = ({ cardId, onSave, onClose }: EditCardFormProps) => {
  const { activityCard: card, isLoading: cardLoading } = useActivityCard(cardId);
  const { cardDetails: details, isLoading: detailsLoading } = useCardDetails(cardId);
  const { updateActivityCard, isUpdating: isUpdatingCard } = useUpdateActivityCard();
  const { updateCardDetails, isUpdating: isUpdatingDetails } = useUpdateCardDetails();

  const loading = cardLoading || detailsLoading;
  const saving = isUpdatingCard || isUpdatingDetails;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    img_link: '',
    price_pp: '',
    adult_price: '',
    child_price: '',
    half_day_pp: '',
    full_day_pp: '',
    min_people: '',
    max_people: '',
    hourly: false
  });

  const [detailsData, setDetailsData] = useState({
    hype: '',
    gear: '',
    length: '',
    season: '',
    rating: '',
    water: '',
    flood_danger: '',
    rappels: '',
    notes: '',
    maps: '',
    gallery_img1: '',
    gallery_img2: '',
    gallery_img3: ''
  });

  // Populate form with existing data when card and details are loaded
  useEffect(() => {
    if (card) {
      setFormData({
        title: card.title || '',
        location: card.location || '',
        category: card.category || '',
        img_link: card.img_link || '',
        price_pp: card.price_pp?.toString() || '',
        adult_price: card.adult_price?.toString() || '',
        child_price: card.child_price?.toString() || '',
        half_day_pp: card.half_day_pp?.toString() || '',
        full_day_pp: card.full_day_pp?.toString() || '',
        min_people: card.min_people?.toString() || '',
        max_people: card.max_people?.toString() || '',
        hourly: card.hourly || false
      });
    }
  }, [card]);

  useEffect(() => {
    if (details) {
      setDetailsData({
        hype: details.hype || '',
        gear: details.gear || '',
        length: details.length || '',
        season: details.season || '',
        rating: details.rating || '',
        water: details.water || '',
        flood_danger: details.flood_danger || '',
        rappels: details.rappels || '',
        notes: details.notes || '',
        maps: details.maps || '',
        gallery_img1: details.gallery_img1 || '',
        gallery_img2: details.gallery_img2 || '',
        gallery_img3: details.gallery_img3 || ''
      });
    }
  }, [details]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetailsData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!card) return;

    try {
      // Update activity card
      await updateActivityCard(
        {
          id: cardId,
          data: {
            title: formData.title,
            location: formData.location,
            category: formData.category,
            img_link: formData.img_link,
            price_pp: formData.price_pp ? parseFloat(formData.price_pp) : null,
            adult_price: formData.adult_price ? parseFloat(formData.adult_price) : null,
            child_price: formData.child_price ? parseFloat(formData.child_price) : null,
            half_day_pp: formData.half_day_pp ? parseFloat(formData.half_day_pp) : null,
            full_day_pp: formData.full_day_pp ? parseFloat(formData.full_day_pp) : null,
            min_people: formData.min_people ? parseInt(formData.min_people) : null,
            max_people: formData.max_people ? parseInt(formData.max_people) : null,
            hourly: formData.hourly
          }
        },
        {
          onError: (error) => {
            console.error('Error saving card:', error);
            alert('Error saving card. Please try again.');
          }
        }
      );

      // Update card details if they exist
      if (details) {
        await updateCardDetails(
          {
            cardId,
            data: detailsData
          },
          {
            onError: (error) => {
              console.error('Error saving card details:', error);
              alert('Error saving card details. Please try again.');
            }
          }
        );
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Adventure Card</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Canyoneering">Canyoneering</option>
            <option value="Climbing">Climbing</option>
            <option value="Rafting">Rafting</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Link
          </label>
          <input
            type="url"
            name="img_link"
            value={formData.img_link}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Per Person
          </label>
          <input
            type="number"
            name="price_pp"
            value={formData.price_pp}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adult Price
          </label>
          <input
            type="number"
            name="adult_price"
            value={formData.adult_price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Child Price
          </label>
          <input
            type="number"
            name="child_price"
            value={formData.child_price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Half Day Price
          </label>
          <input
            type="number"
            name="half_day_pp"
            value={formData.half_day_pp}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Day Price
          </label>
          <input
            type="number"
            name="full_day_pp"
            value={formData.full_day_pp}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min People
          </label>
          <input
            type="number"
            name="min_people"
            value={formData.min_people}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max People
          </label>
          <input
            type="number"
            name="max_people"
            value={formData.max_people}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hourly"
              checked={formData.hourly}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Hourly Pricing</span>
          </label>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Card Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hype
          </label>
          <textarea
            name="hype"
            value={detailsData.hype}
            onChange={handleDetailsChange}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gear
          </label>
          <textarea
            name="gear"
            value={detailsData.gear}
            onChange={handleDetailsChange}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Length
          </label>
          <input
            type="text"
            name="length"
            value={detailsData.length}
            onChange={handleDetailsChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Season
          </label>
          <input
            type="text"
            name="season"
            value={detailsData.season}
            onChange={handleDetailsChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <input
            type="text"
            name="rating"
            value={detailsData.rating}
            onChange={handleDetailsChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water
          </label>
          <input
            type="text"
            name="water"
            value={detailsData.water}
            onChange={handleDetailsChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default EditCardForm;
