import { useState } from "react";
import {
  useActivityCard,
  useDeleteActivityCard,
} from "../../hooks/useActivityCards";
import {
  useCardDetails,
  useUpdateCardDetails,
} from "../../hooks/useCardDetails";
import { useUpdateActivityCard } from "../../hooks/useActivityCards";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@ultimate-adventure/shared-components";
import { AdventureForm, AdventureFormData } from "./AdventureForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EditCardFormProps {
  cardId: number;
  onSave: () => void;
  onClose: () => void;
}

const EditCardForm = ({ cardId, onSave, onClose }: EditCardFormProps) => {
  const { activityCard: card, isLoading: cardLoading } =
    useActivityCard(cardId);
  const { cardDetails: details, isLoading: detailsLoading } =
    useCardDetails(cardId);
  const { updateActivityCard, isUpdating: isUpdatingCard } =
    useUpdateActivityCard();
  const { updateCardDetails, isUpdating: isUpdatingDetails } =
    useUpdateCardDetails();
  const { deleteActivityCardAsync, isDeleting } = useDeleteActivityCard();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const loading = cardLoading || detailsLoading;
  const saving = isUpdatingCard || isUpdatingDetails;

  const handleSubmit = async (value: AdventureFormData) => {
    if (!card) return;

    try {
      // Update activity card
      await updateActivityCard(
        {
          id: cardId,
          data: {
            title: value.title,
            location: value.location,
            category: value.category,
            img_link: value.img_link,
            price_pp: value.price_pp ? parseFloat(value.price_pp) : null,
            adult_price: value.adult_price
              ? parseFloat(value.adult_price)
              : null,
            child_price: value.child_price
              ? parseFloat(value.child_price)
              : null,
            half_day_pp: value.half_day_pp
              ? parseFloat(value.half_day_pp)
              : null,
            full_day_pp: value.full_day_pp
              ? parseFloat(value.full_day_pp)
              : null,
            min_people: value.min_people ? parseInt(value.min_people) : null,
            max_people: value.max_people ? parseInt(value.max_people) : null,
            hourly: value.hourly,
            active: value.active,
          },
        },
        {
          onError: (error) => {
            console.error("Error saving card:", error);
            alert("Error saving card. Please try again.");
          },
        },
      );

      // Update card details if they exist
      if (details) {
        await updateCardDetails(
          {
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
            },
          },
          {
            onError: (error) => {
              console.error("Error saving card details:", error);
              alert("Error saving card details. Please try again.");
            },
          },
        );
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteActivityCardAsync({ id: cardId });
      onSave();
      onClose();
    } catch (error) {
      console.error("Error deleting adventure:", error);
      alert("Error deleting adventure. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner className="size-8" />
        <p className="mt-4 text-muted-foreground">Loading adventure data...</p>
      </div>
    );
  }

  const initialValues = {
    title: card?.title || "",
    location: card?.location || "",
    category: card?.category || "",
    img_link: card?.img_link || "",
    price_pp: card?.price_pp?.toString() || "",
    adult_price: card?.adult_price?.toString() || "",
    child_price: card?.child_price?.toString() || "",
    half_day_pp: card?.half_day_pp?.toString() || "",
    full_day_pp: card?.full_day_pp?.toString() || "",
    min_people: card?.min_people?.toString() || "",
    max_people: card?.max_people?.toString() || "",
    hourly: card?.hourly || false,
    active: card?.active ?? true,
    hype: details?.hype || "",
    gear: details?.gear || "",
    length: details?.length || "",
    season: details?.season || "",
    rating: details?.rating || "",
    water: details?.water || "",
    flood_danger: details?.flood_danger || "",
    rappels: details?.rappels || "",
    notes: details?.notes || "",
    maps: details?.maps || "",
    gallery_img1: details?.gallery_img1 || "",
    gallery_img2: details?.gallery_img2 || "",
    gallery_img3: details?.gallery_img3 || "",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Edit Adventure Card</h2>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
      <AdventureForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Save Changes"
        isSubmitting={saving}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{card?.title}". This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditCardForm;
