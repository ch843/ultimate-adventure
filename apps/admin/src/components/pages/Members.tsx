import { useState, useRef, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Search, Mail, MessageSquare } from "lucide-react";
import {
  useClubMembers,
  useDeleteClubMember,
  useUpdateClubMember,
  useCreateClubMember,
} from "../../hooks/useClubMembers";
import { getExperienceBadgeColor } from "../../utils/badgeStyles";
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
import { FormDialog } from "../dialogs/FormDialog";
import { MemberForm, type MemberFormData } from "../forms/MemberForm";
import type { ClubMember } from "@ultimate-adventure/shared-models";

const Members = () => {
  const { clubMembers, isLoading, refetch } = useClubMembers();
  const { deleteClubMemberAsync, isDeleting } = useDeleteClubMember();
  const { updateClubMemberAsync, isUpdating } = useUpdateClubMember();
  const { createClubMemberAsync, isCreating } = useCreateClubMember();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingMemberId, setDeletingMemberId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<ClubMember | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const editFormRef = useRef<HTMLFormElement>(null);
  const addFormRef = useRef<HTMLFormElement>(null);

  const handleEditClick = (member: ClubMember) => {
    setEditingMember(member);
    setEditDialogOpen(true);
  };

  const handleEditSave = async (data: MemberFormData) => {
    if (!editingMember) return;

    try {
      await updateClubMemberAsync({
        id: editingMember.id,
        data,
      });
      refetch();
      setEditDialogOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Error updating member. Please try again.");
    }
  };

  const handleAddMember = async (data: MemberFormData) => {
    try {
      await createClubMemberAsync({ data });
      refetch();
      setAddDialogOpen(false);
    } catch (error) {
      console.error("Error creating member:", error);
      alert("Error creating member. Please try again.");
    }
  };

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
      console.error("Error deleting member:", error);
      alert("Error deleting member. Please try again.");
    }
  };

  const handleEmailMember = (email: string, name: string) => {
    const subject = encodeURIComponent(`Message from ${name}`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const handleTextMember = (phoneNum: string | null) => {
    if (!phoneNum) {
      alert("No phone number available for this member.");
      return;
    }
    // Remove all non-numeric characters from phone number
    const cleanPhone = phoneNum.replace(/\D/g, "");
    window.location.href = `sms:${cleanPhone}`;
  };

  const deletingMember = clubMembers.find((m) => m.id === deletingMemberId);

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) {
      return clubMembers;
    }

    const query = searchQuery.toLowerCase();
    return clubMembers.filter((member) => {
      const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
      const email = member.email.toLowerCase();
      const phone = member.phone_num?.toLowerCase() || "";
      const experience = member.experience_level?.toLowerCase() || "";
      const groupNum = member.group_num.toString();
      const notes = member.notes?.toLowerCase() || "";

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        experience.includes(query) ||
        groupNum.includes(query) ||
        notes.includes(query)
      );
    });
  }, [clubMembers, searchQuery]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Club Members</h1>
          <p className="text-muted-foreground mt-2">
            Manage club membership and member information
          </p>
        </div>
        <Button size="lg" onClick={() => setAddDialogOpen(true)}>
          Add Member
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Loading members...
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                All Members ({filteredMembers.length}
                {searchQuery && ` of ${clubMembers.length}`})
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            {clubMembers.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No members yet</p>
                <Button variant="outline">Get Started</Button>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="py-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No members found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Waiver</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow
                      key={member.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleEditClick(member)}
                    >
                      <TableCell className="font-medium">
                        {member.first_name} {member.last_name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.phone_num || "-"}
                      </TableCell>
                      <TableCell>{member.group_num}</TableCell>
                      <TableCell>
                        {member.experience_level ? (
                          <Badge
                            className={getExperienceBadgeColor(
                              member.experience_level,
                            )}
                          >
                            {member.experience_level}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.paid_for_year ? "default" : "secondary"
                          }
                        >
                          {member.paid_for_year ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {member.waiver_link ? (
                          <a
                            href={member.waiver_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTextMember(member.phone_num)}
                            disabled={!member.phone_num}
                          >
                            <MessageSquare className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleEmailMember(
                                member.email,
                                `${member.first_name} ${member.last_name}`,
                              )
                            }
                          >
                            <Mail className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(member)}
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

      <FormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        title="Edit Member"
        description="Update member information"
        formRef={editFormRef}
        isSubmitting={isUpdating}
      >
        {editingMember && (
          <MemberForm
            ref={editFormRef}
            initialValues={editingMember}
            onSubmit={handleEditSave}
          />
        )}
      </FormDialog>

      <FormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        title="Add Member"
        description="Create a new club member"
        formRef={addFormRef}
        isSubmitting={isCreating}
        submitButtonText="Add Member"
        submittingText="Creating..."
      >
        <MemberForm ref={addFormRef} onSubmit={handleAddMember} />
      </FormDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deletingMember?.first_name}{" "}
              {deletingMember?.last_name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Members;
