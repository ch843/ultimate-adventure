import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ultimate-adventure/shared-components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil } from "lucide-react";
import EditCardForm from "../forms/EditCardForm.tsx";
import { AddAdventureDialog } from "../dialogs/AddAdventureDialog";
import { useActivityCards, useDeleteActivityCard } from "../../hooks/useActivityCards";

const Adventures = () => {
  const { activityCards, isLoading, refetch } = useActivityCards();
  const { deleteActivityCardAsync, isDeleting } = useDeleteActivityCard();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<number | null>(null);

  const handleEditCard = (cardId: number) => {
    setEditingCardId(cardId);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingCardId(null);
  };

  const handleSaveCard = () => {
    refetch();
  };

  const handleDeleteClick = (cardId: number) => {
    setDeletingCardId(cardId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCardId) return;

    try {
      await deleteActivityCardAsync({ id: deletingCardId });
      refetch();
      setDeleteDialogOpen(false);
      setDeletingCardId(null);
    } catch (error) {
      console.error('Error deleting adventure:', error);
      alert('Error deleting adventure. Please try again.');
    }
  };

  const deletingCard = activityCards.find(card => card.card_id === deletingCardId);

  const getCategoryBadgeProps = (category: string) => {
    switch (category) {
      case "Canyoneering":
        return { variant: "default" as const, className: "bg-emerald-600 text-white hover:bg-emerald-700" };
      case "Climbing":
        return { variant: "default" as const, className: "bg-orange-600 text-white hover:bg-orange-700" };
      case "Rafting":
        return { variant: "default" as const, className: "bg-blue-600 text-white hover:bg-blue-700" };
      default:
        return { variant: "secondary" as const };
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Adventures</h1>
          <p className="text-muted-foreground mt-2">
            Manage your adventure activities and experiences
          </p>
        </div>
        <Button size="lg" onClick={() => setAddModalOpen(true)}>
          Add Adventure
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Loading adventures...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Adventures ({activityCards.length})</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityCards.map((card) => (
                  <TableRow key={card.card_id}>
                    <TableCell>
                      <img
                        src={card.img_link}
                        alt={card.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{card.title}</TableCell>
                    <TableCell>
                      <Badge {...getCategoryBadgeProps(card.category)}>
                        {card.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {card.location}
                    </TableCell>
                    <TableCell>
                      {card.price_pp && (
                        <span className="text-sm">
                          ${card.price_pp}/person
                          {card.hourly && "/hr"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCard(card.card_id)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(card.card_id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {editingCardId && (
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Adventure</DialogTitle>
            </DialogHeader>
            <EditCardForm
              cardId={editingCardId}
              onSave={handleSaveCard}
              onClose={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
      )}

      <AddAdventureDialog
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSuccess={refetch}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingCard?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Adventures;
