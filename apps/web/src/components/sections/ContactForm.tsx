import * as React from "react";
import { useState } from "react";
import { SubmitContactFormRequest } from "@ultimate-adventure/shared-models";
import { useActivityCards } from "../../hooks/useActivityCards";
import { useSubmitContactForm } from "../../hooks/useContactForm";
import {
  Button,
  Input,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Alert,
  AlertDescription,
} from "@ultimate-adventure/shared-components";

const formDataDefaults: SubmitContactFormRequest = {
  first_name: "",
  last_name: "",
  email: "",
  phone: null,
  activity_inquiry_id: null,
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] =
    useState<SubmitContactFormRequest>(formDataDefaults);

  const { activityCards } = useActivityCards();
  const { submitContactForm, isSubmitting, isSuccess, isError, error } =
    useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    submitContactForm(formData, {
      onSuccess: () => {
        // Reset form on success
        setFormData(formDataDefaults);
      },
      onError: (error) => {
        console.error("Error submitting form:", error);
      },
    });
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Left Side - Adventure Image */}
          <div
            className="md:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/canyon-rock-img.avif')",
            }}
          ></div>

          {/* Right Side - Contact Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-5xl font-light mb-8 text-center">CONTACT US</h2>

            {isSuccess && (
              <Alert className="bg-green-100 border-green-400 text-green-700 mb-4">
                <AlertDescription>
                  Thank you for your message! We'll be in touch soon.
                </AlertDescription>
              </Alert>
            )}

            {isError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  {error?.message ||
                    "Failed to submit form. Please try again later."}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        first_name: newVal,
                      }));
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        last_name: newVal,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      email: newVal,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone ?? ""}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      phone: newVal,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityType">Activity Type (Optional)</Label>
                <Select
                  value={formData.activity_inquiry_id?.toString()}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      activity_inquiry_id: value ? Number(value) : null,
                    }));
                  }}
                >
                  <SelectTrigger id="activityType">
                    <SelectValue placeholder="Choose an activity..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activityCards.map((activity) => (
                      <SelectItem
                        key={activity.card_id}
                        value={activity.card_id.toString()}
                      >
                        {activity.title.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      message: newVal,
                    }));
                  }}
                  placeholder="Tell us about your inquiry or what you're interested in booking..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
