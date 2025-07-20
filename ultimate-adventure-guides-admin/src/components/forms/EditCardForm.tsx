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
  // Main Info fields
  const mainFields = [
    { label: 'Title', name: 'title', type: 'text' },
    { label: 'Location', name: 'location', type: 'text' },
    {
      label: 'Category',
      name: 'category',
      type: 'select',
      options: ['Canyoneering', 'Climbing', 'Rafting'],
    },
    { label: 'Image Link', name: 'img_link', type: 'url' },
    { label: 'Price Per Person', name: 'price_pp', type: 'number' },
    { label: 'Adult Price', name: 'adult_price', type: 'number' },
    { label: 'Child Price', name: 'child_price', type: 'number' },
    { label: 'Half Day Price', name: 'half_day_pp', type: 'number' },
    { label: 'Full Day Price', name: 'full_day_pp', type: 'number' },
    { label: 'Min People', name: 'min_people', type: 'number' },
    { label: 'Max People', name: 'max_people', type: 'number' },
  ] as const;

  // Card Details fields
  const cardFields = [
    { label: 'Hype', name: 'hype', type: 'textarea' },
    { label: 'Gear', name: 'gear', type: 'textarea' },
    { label: 'Length', name: 'length', type: 'text' },
    { label: 'Season', name: 'season', type: 'text' },
    { label: 'Rating', name: 'rating', type: 'text' },
    { label: 'Water', name: 'water', type: 'text' },
    { label: 'Flood Danger', name: 'flood_danger', type: 'text' },
    { label: 'Rappels', name: 'rappels', type: 'text' },
    { label: 'Maps Location', name: 'maps', type: 'text' },
    { label: 'Gallery Img 1 Link', name: 'gallery_img1', type: 'text' },
    { label: 'Gallery Img 2 Link', name: 'gallery_img2', type: 'text' },
    { label: 'Gallery Img 3 Link', name: 'gallery_img3', type: 'text' },

  ] as const;

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
        {mainFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === 'select' ? (
                  <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                    ))}
                  </select>
              ) : (
                  <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
              )}
            </div>
        ))}

        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
                type="checkbox"
                name="hourly"
                checked={!!formData.hourly}
                onChange={handleInputChange}
                className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Hourly Pricing</span>
          </label>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Card Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {cardFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                  <textarea
                      name={field.name}
                      value={detailsData[field.name]}
                      onChange={handleDetailsChange}
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
              ) : (
                  <input
                      type={field.type}
                      name={field.name}
                      value={detailsData[field.name]}
                      onChange={handleDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
              )}
            </div>
        ))}
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
