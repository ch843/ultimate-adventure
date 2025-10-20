import { useForm } from '@tanstack/react-form';
import {
  Button,
  Textarea,
  Label,
  Checkbox,
  Separator,
} from '@ultimate-adventure/shared-components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AdventureFormData {
  title: string;
  location: string;
  category: string;
  img_link: string;
  price_pp: string;
  adult_price: string;
  child_price: string;
  half_day_pp: string;
  full_day_pp: string;
  min_people: string;
  max_people: string;
  hourly: boolean;
  active: boolean;
  hype: string;
  gear: string;
  length: string;
  season: string;
  rating: string;
  water: string;
  flood_danger: string;
  rappels: string;
  notes: string;
  maps: string;
  gallery_img1: string;
  gallery_img2: string;
  gallery_img3: string;
}

interface AdventureFormProps {
  initialValues?: Partial<AdventureFormData>;
  onSubmit: (data: AdventureFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const defaultValues: AdventureFormData = {
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
  hourly: false,
  active: true,
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
  gallery_img3: '',
};

export const AdventureForm = ({
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = 'Save Changes',
  isSubmitting = false,
}: AdventureFormProps) => {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <form.Field name="title">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
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
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Canyoneering">Canyoneering</SelectItem>
                  <SelectItem value="Climbing">Climbing</SelectItem>
                  <SelectItem value="Rafting">Rafting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        <form.Field name="img_link">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="img_link">Image Link</Label>
              <Input
                id="img_link"
                type="url"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="price_pp">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="price_pp">Price Per Person</Label>
              <Input
                id="price_pp"
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="adult_price">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="adult_price">Adult Price</Label>
              <Input
                id="adult_price"
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="child_price">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="child_price">Child Price</Label>
              <Input
                id="child_price"
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="half_day_pp">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="half_day_pp">Half Day Price</Label>
              <Input
                id="half_day_pp"
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="full_day_pp">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="full_day_pp">Full Day Price</Label>
              <Input
                id="full_day_pp"
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="min_people">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="min_people">Min People</Label>
              <Input
                id="min_people"
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="max_people">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="max_people">Max People</Label>
              <Input
                id="max_people"
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="hourly">
          {(field) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hourly"
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked as boolean)}
              />
              <Label htmlFor="hourly" className="cursor-pointer">
                Hourly Pricing
              </Label>
            </div>
          )}
        </form.Field>

        <form.Field name="active">
          {(field) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked as boolean)}
              />
              <Label htmlFor="active" className="cursor-pointer">
                Published
              </Label>
            </div>
          )}
        </form.Field>
      </div>

      <Separator className="my-6" />

      <h3 className="text-xl font-bold mb-4">Card Details</h3>

      <form.Field name="hype">
        {(field) => (
          <div className="space-y-2 mb-6">
            <Label htmlFor="hype">Hype</Label>
            <Textarea
              id="hype"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={7}
            />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <form.Field name="gear">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="gear">Gear</Label>
              <Textarea
                id="gear"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={2}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="length">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="season">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Input
                id="season"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="rating">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="water">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="water">Water</Label>
              <Input
                id="water"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export type { AdventureFormData };
