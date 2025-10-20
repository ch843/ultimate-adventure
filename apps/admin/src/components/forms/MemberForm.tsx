import { forwardRef } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ClubMember } from "@ultimate-adventure/shared-models";

export type MemberFormData = Omit<ClubMember, "id">;

interface MemberFormProps {
  initialValues?: Partial<MemberFormData>;
  onSubmit: (data: MemberFormData) => void | Promise<void>;
  submitButtonText?: string;
}

export const MemberForm = forwardRef<HTMLFormElement, MemberFormProps>(
  ({ initialValues, onSubmit }, ref) => {
    const form = useForm({
      defaultValues: {
        first_name: initialValues?.first_name || "",
        last_name: initialValues?.last_name || "",
        email: initialValues?.email || "",
        phone_num: initialValues?.phone_num || null,
        group_num: initialValues?.group_num || 1,
        experience_level: initialValues?.experience_level || null,
        paid_for_year: initialValues?.paid_for_year || false,
        waiver_link: initialValues?.waiver_link || null,
        notes: initialValues?.notes || null,
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
        <div className="grid grid-cols-2 gap-4">
          <form.Field name="first_name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                />
              </div>
            )}
          </form.Field>
          <form.Field name="last_name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!value) return "Email is required";
              if (!emailRegex.test(value))
                return "Please enter a valid email address";
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                required
              />
              {field.state.meta.errors && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="phone_num"
          validators={{
            onChange: ({ value }) => {
              if (!value) return undefined; // Optional field
              // Allow various phone formats: (123) 456-7890, 123-456-7890, 1234567890, +1 123-456-7890
              const phoneRegex =
                /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
              if (!phoneRegex.test(value))
                return "Please enter a valid phone number";
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="phone_num">Phone Number</Label>
              <Input
                id="phone_num"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value || null)}
                onBlur={field.handleBlur}
                placeholder="(123) 456-7890"
              />
              {field.state.meta.errors && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-2 gap-4">
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
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="experience_level">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="experience_level">Experience Level</Label>
                <Select
                  value={field.state.value || ""}
                  onValueChange={(value) => field.handleChange(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="waiver_link">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="waiver_link">Waiver Link</Label>
              <Input
                id="waiver_link"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value || null)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="paid_for_year">
          {(field) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="paid_for_year"
                checked={field.state.value}
                onCheckedChange={(checked) =>
                  field.handleChange(checked as boolean)
                }
              />
              <Label htmlFor="paid_for_year" className="cursor-pointer">
                Paid for Year
              </Label>
            </div>
          )}
        </form.Field>

        <form.Field name="notes">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value || null)}
                onBlur={field.handleBlur}
                rows={4}
                placeholder="Add any notes about this member..."
              />
            </div>
          )}
        </form.Field>
      </form>
    );
  },
);

MemberForm.displayName = "MemberForm";
