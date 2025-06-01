import { useState, useEffect, useCallback } from 'react';
import { ActivityCardDAO } from '../../model/ActivityCardDAO';
import { CardDetailsDAO } from '../../model/CardDetailsDAO';
import { Tables } from '../../definitions/generatedDefinitions';

interface EditCardFormProps {
  cardId: number;
  onSave: () => void;
  onClose: () => void;
}

const EditCardForm = ({ cardId, onSave, onClose }: EditCardFormProps) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [card, setCard] = useState<Tables<'Adventure Cards'> | null>(null);
  const [details, setDetails] = useState<Tables<'Card Details'> | null>(null);

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

  const fetchCard = useCallback(async () => {
    setLoading(true);
    try {
      const cardData = await ActivityCardDAO.getActivityCard(cardId);
      const cardDetails = await CardDetailsDAO.getAllActivityDetails(cardId);

      setCard(cardData);
      setDetails(cardDetails);

      // Populate form with existing data
      setFormData({
        title: cardData.title || '',
        location: cardData.location || '',
        category: cardData.category || '',
        img_link: cardData.img_link || '',
        price_pp: cardData.price_pp?.toString() || '',
        adult_price: cardData.adult_price?.toString() || '',
        child_price: cardData.child_price?.toString() || '',
        half_day_pp: cardData.half_day_pp?.toString() || '',
        full_day_pp: cardData.full_day_pp?.toString() || '',
        min_people: cardData.min_people?.toString() || '',
        max_people: cardData.max_people?.toString() || '',
        hourly: cardData.hourly || false
      });

      if (cardDetails) {
        setDetailsData({
          hype: cardDetails.hype || '',
          gear: cardDetails.gear || '',
          length: cardDetails.length || '',
          season: cardDetails.season || '',
          rating: cardDetails.rating || '',
          water: cardDetails.water || '',
          flood_danger: cardDetails.flood_danger || '',
          rappels: cardDetails.rappels || '',
          notes: cardDetails.notes || '',
          maps: cardDetails.maps || '',
          gallery_img1: cardDetails.gallery_img1 || '',
          gallery_img2: cardDetails.gallery_img2 || '',
          gallery_img3: cardDetails.gallery_img3 || ''
        });
      }
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setLoading(false);
    }
  }, [cardId]);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

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

    setSaving(true);
    try {
      await ActivityCardDAO.updateActivityCard(cardId, {
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
      });

      if (details) {
        await CardDetailsDAO.updateCardDetails(cardId, detailsData);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving card:', error);
      alert('Error saving card. Please try again.');
    } finally {
      setSaving(false);
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
