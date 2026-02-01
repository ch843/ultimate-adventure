import { useState, useRef, useMemo } from "react";
import {
  Button,
  Card,
  CardContent,
} from "@ultimate-adventure/shared-components";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type RowSelectionState,
  type FilterFn,
} from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableSearch,
  DataTableToolbar,
  DataTableViewOptions,
} from "@/components/ui/data-table";
import {
  DataTableAddFilter,
  DataTableActiveFilters,
  type FilterDefinition,
} from "@/components/ui/data-table-filters";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pencil,
  Trash2,
  Mail,
  MessageSquare,
  Users,
  Award,
  CreditCard,
  Type,
} from "lucide-react";
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
import { useTableUrlState } from "../../hooks/useTableUrlState";

// Custom filter function for select (array) filtering
const selectFilterFn: FilterFn<ClubMember> = (row, columnId, filterValue) => {
  const cellValue = String(row.getValue(columnId));
  const selectedValues = filterValue as string[];
  return selectedValues.includes(cellValue);
};

// Custom filter function for boolean paid status
const paidFilterFn: FilterFn<ClubMember> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId) as boolean;
  const selectedValues = filterValue as string[];
  const valueStr = cellValue ? "true" : "false";
  return selectedValues.includes(valueStr);
};

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
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const {
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
  } = useTableUrlState();
  const editFormRef = useRef<HTMLFormElement>(null);
  const addFormRef = useRef<HTMLFormElement>(null);

  // Extract unique experience levels and groups for filter options
  const experienceOptions = useMemo(() => {
    const levels = [
      ...new Set(
        clubMembers
          .map((m) => m.experience_level)
          .filter((level): level is string => !!level),
      ),
    ];
    return levels.map((level) => ({ label: level, value: level }));
  }, [clubMembers]);

  const groupOptions = useMemo(() => {
    const groups = [...new Set(clubMembers.map((m) => m.group_num))];
    return groups.map((g) => ({ label: `Group ${g}`, value: String(g) }));
  }, [clubMembers]);

  // Filter definitions for the members table
  const memberFilterDefinitions: FilterDefinition[] = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        type: "text",
        icon: Type,
      },
      {
        id: "experience_level",
        label: "Experience",
        type: "select",
        icon: Award,
        options: experienceOptions,
      },
      {
        id: "group_num",
        label: "Group",
        type: "select",
        icon: Users,
        options: groupOptions,
      },
      {
        id: "paid_for_year",
        label: "Payment Status",
        type: "select",
        icon: CreditCard,
        options: [
          { label: "Paid", value: "true" },
          { label: "Unpaid", value: "false" },
        ],
      },
    ],
    [experienceOptions, groupOptions],
  );

  const handleEditClick = (member: ClubMember, e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  const handleDeleteClick = (memberId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  const handleEmailMember = (
    email: string,
    name: string,
    e?: React.MouseEvent,
  ) => {
    e?.stopPropagation();
    const subject = encodeURIComponent(`Message to ${name}`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const handleTextMember = (phoneNum: string | null, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!phoneNum) {
      alert("No phone number available for this member.");
      return;
    }
    const cleanPhone = phoneNum.replace(/\D/g, "");
    window.location.href = `sms:${cleanPhone}`;
  };

  const handleEmailSelectedMembers = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const emails = selectedRows
      .map((row) => row.original.email)
      .filter(Boolean)
      .join(",");
    window.location.href = `mailto:?bcc=${emails}`;
  };

  const deletingMember = clubMembers.find((m) => m.id === deletingMemberId);

  const columns: ColumnDef<ClubMember>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            onClick={(e) => e.stopPropagation()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "name",
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.first_name} {row.original.last_name}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.getValue("email")}</span>
        ),
      },
      {
        accessorKey: "phone_num",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.getValue("phone_num") || "-"}
          </span>
        ),
      },
      {
        accessorKey: "group_num",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Group" />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">{row.getValue("group_num")}</span>
        ),
        filterFn: selectFilterFn,
      },
      {
        accessorKey: "experience_level",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Experience" />
        ),
        cell: ({ row }) => {
          const level = row.getValue("experience_level") as string | null;
          return level ? (
            <Badge className={getExperienceBadgeColor(level)}>{level}</Badge>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
        filterFn: selectFilterFn,
      },
      {
        accessorKey: "paid_for_year",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const paid = row.getValue("paid_for_year") as boolean;
          return (
            <Badge variant={paid ? "default" : "secondary"}>
              {paid ? "Paid" : "Unpaid"}
            </Badge>
          );
        },
        filterFn: paidFilterFn,
      },
      {
        accessorKey: "waiver_link",
        header: () => (
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Waiver
          </div>
        ),
        cell: ({ row }) => {
          const waiverLink = row.getValue("waiver_link") as string | null;
          return waiverLink ? (
            <a
              href={waiverLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View
            </a>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
        enableSorting: false,
      },
      {
        id: "actions",
        header: () => (
          <div className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Actions
          </div>
        ),
        cell: ({ row }) => {
          const member = row.original;
          return (
            <div
              className="flex items-center justify-end gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleTextMember(member.phone_num, e)}
                disabled={!member.phone_num}
              >
                <MessageSquare className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) =>
                  handleEmailMember(
                    member.email,
                    `${member.first_name} ${member.last_name}`,
                    e,
                  )
                }
              >
                <Mail className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleEditClick(member, e)}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteClick(member.id, e)}
                disabled={isDeleting}
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [isDeleting],
  );

  const table = useReactTable({
    data: clubMembers,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      pagination,
    },
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
  });

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

      {clubMembers.length === 0 && !isLoading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No members yet</p>
            <Button variant="outline" onClick={() => setAddDialogOpen(true)}>
              Add Your First Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          table={table}
          loading={isLoading}
          onRowClick={({ row }) => handleEditClick(row)}
        >
          <DataTableToolbar>
            <DataTableSearch />
            <DataTableAddFilter filters={memberFilterDefinitions} />
            <DataTableActiveFilters filters={memberFilterDefinitions} />
            {Object.keys(rowSelection).length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEmailSelectedMembers}
                className="h-9 gap-1.5"
              >
                <Mail className="size-4" />
                Email {Object.keys(rowSelection).length} selected
              </Button>
            )}
            <DataTableViewOptions />
          </DataTableToolbar>
          <DataTablePagination />
        </DataTable>
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
