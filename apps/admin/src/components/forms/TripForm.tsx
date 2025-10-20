import { forwardRef } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Trip } from "@ultimate-adventure/shared-models";

export type TripFormData = Omit<Trip, "id"> & {
  add_group_members?: boolean;
};

interface TripFormProps {
  initialValues?: Partial<TripFormData>;
  onSubmit: (data: TripFormData) => void | Promise<void>;
}

export const TripForm = forwardRef<HTMLFormElement, TripFormProps>(
  ({ initialValues, onSubmit }, ref) => {
    const form = useForm({
      defaultValues: {
        title: initialValues?.title || "",
        location: initialValues?.location || "",
        date_start: initialValues?.date_start || "",
        date_end: initialValues?.date_end || "",
        group_num: initialValues?.group_num || 1,
        add_group_members: initialValues?.add_group_members ?? true,
      },
      onSubmit: async ({ value }) => {
        await onSubmit(value);
      },
    });

    return (
      <form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="grid gap-4 py-4"
      >
        <form.Field name="title">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="title">Trip Title</Label>
              <Input
                id="title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="e.g., Zion National Park Adventure"
                required
              />
            </div>
          )}
        </form.Field>

        <form.Field name="location">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="e.g., Zion National Park, Utah"
                required
              />
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-2 gap-4">
          <form.Field name="date_start">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="date_start">Start Date</Label>
                <Input
                  id="date_start"
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="date_end">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="date_end">End Date</Label>
                <Input
                  id="date_end"
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="group_num">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="group_num">Group Number</Label>
              <Input
                id="group_num"
                type="number"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(parseInt(e.target.value) || 0)
                }
                onBlur={field.handleBlur}
                min="1"
                required
              />
            </div>
          )}
        </form.Field>

        <form.Field name="add_group_members">
          {(field) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="add_group_members"
                checked={field.state.value}
                onCheckedChange={(checked) =>
                  field.handleChange(checked as boolean)
                }
              />
              <Label htmlFor="add_group_members" className="cursor-pointer">
                Automatically add all members from this group to the trip
              </Label>
            </div>
          )}
        </form.Field>
      </form>
    );
  },
);

TripForm.displayName = "TripForm";
