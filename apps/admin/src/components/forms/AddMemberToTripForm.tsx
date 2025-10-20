import { forwardRef, useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@ultimate-adventure/shared-components";
import { Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { ClubMember } from "@ultimate-adventure/shared-models";
import { getExperienceBadgeColor } from "../../utils/badgeStyles";

export interface AddMemberToTripFormData {
  memberIds: number[];
}

interface AddMemberToTripFormProps {
  availableMembers: ClubMember[];
  isLoadingMembers: boolean;
  onSubmit: (data: AddMemberToTripFormData) => void | Promise<void>;
}

export const AddMemberToTripForm = forwardRef<
  HTMLFormElement,
  AddMemberToTripFormProps
>(({ availableMembers, isLoadingMembers, onSubmit }, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<number>>(
    new Set(),
  );

  const toggleMember = (memberId: number) => {
    setSelectedMemberIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const form = useForm({
    defaultValues: {
      memberIds: [] as number[],
    },
    onSubmit: async () => {
      if (selectedMemberIds.size > 0) {
        await onSubmit({ memberIds: Array.from(selectedMemberIds) });
      }
    },
  });

  // Search filter for available members
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) {
      return availableMembers;
    }

    const query = searchQuery.toLowerCase();
    return availableMembers.filter((member) => {
      const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
      const email = member.email.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    });
  }, [availableMembers, searchQuery]);

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        {selectedMemberIds.size > 0 && (
          <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium">
              {selectedMemberIds.size} member
              {selectedMemberIds.size !== 1 ? "s" : ""} selected
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedMemberIds(new Set())}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto space-y-2">
        {isLoadingMembers ? (
          <div className="flex justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No members found"
                : "All members are already on this trip"}
            </p>
          </div>
        ) : (
          filteredMembers.map((member) => {
            const isSelected = selectedMemberIds.has(member.id);
            return (
              <div
                key={member.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${
                  isSelected ? "bg-primary/10" : "bg-muted/30 hover:bg-muted/50"
                }`}
                onClick={() => toggleMember(member.id)}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleMember(member.id)}
                    className="flex-shrink-0"
                  />
                </div>
                <p className="font-medium flex-shrink-0">
                  {member.first_name} {member.last_name}
                </p>
                <p className="text-sm text-muted-foreground flex-1 truncate">
                  {member.email}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 flex-shrink-0">
                  Group {member.group_num}
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {member.experience_level && (
                    <Badge
                      className={`text-xs ${getExperienceBadgeColor(member.experience_level)}`}
                    >
                      {member.experience_level}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </form>
  );
});

AddMemberToTripForm.displayName = "AddMemberToTripForm";
