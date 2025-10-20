import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AdventureForm, AdventureFormData } from '../forms/AdventureForm';
import { useCreateActivityCard } from '../../hooks/useActivityCards';
import { useCreateCardDetails } from '../../hooks/useCardDetails';

interface AddAdventureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddAdventureDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AddAdventureDialogProps) => {
  const { createActivityCardAsync, isCreating: isCreatingCard } = useCreateActivityCard();
  const { createCardDetailsAsync, isCreating: isCreatingDetails } = useCreateCardDetails();
  const [error, setError] = useState<string | null>(null);

  const isSubmitting = isCreatingCard || isCreatingDetails;

  const handleSubmit = async (value: AdventureFormData) => {
    try {
      setError(null);

      // Create activity card
      const result = await createActivityCardAsync({
        data: {
          title: value.title,
          location: value.location,
          category: value.category,
          img_link: value.img_link,
          price_pp: value.price_pp ? parseFloat(value.price_pp) : null,
          adult_price: value.adult_price ? parseFloat(value.adult_price) : null,
          child_price: value.child_price ? parseFloat(value.child_price) : null,
          half_day_pp: value.half_day_pp ? parseFloat(value.half_day_pp) : null,
          full_day_pp: value.full_day_pp ? parseFloat(value.full_day_pp) : null,
          min_people: value.min_people ? parseInt(value.min_people) : null,
          max_people: value.max_people ? parseInt(value.max_people) : null,
          hourly: value.hourly,
          active: value.active,
        }
      });

      // Get the created card ID
      const cardId = result?.card?.card_id;

      if (!cardId) {
        throw new Error('Failed to create activity card');
      }

      // Create card details
      await createCardDetailsAsync({
        cardId,
        data: {
          hype: value.hype,
          gear: value.gear,
          length: value.length,
          season: value.season,
          rating: value.rating,
          water: value.water,
          flood_danger: value.flood_danger,
          rappels: value.rappels,
          notes: value.notes,
          maps: value.maps,
          gallery_img1: value.gallery_img1,
          gallery_img2: value.gallery_img2,
          gallery_img3: value.gallery_img3,
        }
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error('Error creating adventure:', err);
      setError('Failed to create adventure. Please try again.');
    }
  };

  const handleCancel = () => {
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Adventure</DialogTitle>
        </DialogHeader>
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}
        <AdventureForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="Create Adventure"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
