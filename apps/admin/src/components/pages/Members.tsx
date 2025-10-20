import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ultimate-adventure/shared-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { useClubMembers, useDeleteClubMember } from "../../hooks/useClubMembers";
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

const Members = () => {
  const { clubMembers, isLoading, refetch } = useClubMembers();
  const { deleteClubMemberAsync, isDeleting } = useDeleteClubMember();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingMemberId, setDeletingMemberId] = useState<number | null>(null);

  const handleDeleteClick = (memberId: number) => {
    setDeletingMemberId(memberId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMemberId) return;

    try {
      await deleteClubMemberAsync({ id: deletingMemberId });
      refetch();
      setDeleteDialogOpen(false);
      setDeletingMemberId(null);
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Error deleting member. Please try again.');
    }
  };

  const deletingMember = clubMembers.find(m => m.id === deletingMemberId);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Club Members</h1>
          <p className="text-muted-foreground mt-2">
            Manage club membership and member information
          </p>
        </div>
        <Button size="lg">
          Add Member
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Loading members...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Members ({clubMembers.length})</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            {clubMembers.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No members yet</p>
                <Button variant="outline">Get Started</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clubMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.first_name} {member.last_name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.phone_num || '-'}
                      </TableCell>
                      <TableCell>
                        {member.experience_level || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.paid_for_year ? "default" : "secondary"}>
                          {member.paid_for_year ? 'Paid' : 'Unpaid'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(member.id)}
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
            )}
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deletingMember?.first_name} {deletingMember?.last_name}. This action cannot be undone.
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

export default Members;
