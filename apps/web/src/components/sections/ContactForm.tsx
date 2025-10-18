import * as React from 'react';
import { useState } from 'react';
import { SubmitContactFormRequest } from '@ultimate-adventure/shared-models';
import { useActivityCards } from '../../hooks/useActivityCards';
import { useSubmitContactForm } from '../../hooks/useContactForm';

const formDataDefaults: SubmitContactFormRequest = {
  first_name: "",
  last_name: "",
  email: "",
  phone: null,
  activity_inquiry_id: null,
  message: "",
}

const ContactForm = () => {
  const [formData, setFormData] = useState<SubmitContactFormRequest>(formDataDefaults);

  const { activityCards } = useActivityCards();
  const {
    submitContactForm,
    isSubmitting,
    isSuccess,
    isError,
    error,
  } = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    submitContactForm(formData, {
      onSuccess: () => {
        // Reset form on success
        setFormData(formDataDefaults);
      },
      onError: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Left Side - Adventure Image */}
          <div className="md:w-1/2 bg-cover bg-center"
               style={{ backgroundImage: "url('https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/canyon-rock-img.avif')" }}>
          </div>

          {/* Right Side - Contact Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-5xl font-light mb-8 text-center">CONTACT US</h2>

            {isSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Thank you for your message! We'll be in touch soon.
              </div>
            )}

            {isError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error?.message || 'Failed to submit form. Please try again later.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        first_name: newVal
                      }))}}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        last_name: newVal
                      }))}}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      email: newVal
                    }))}}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone ?? ""}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      phone: newVal
                    }))}}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">Activity Type (Optional)</label>
                <select
                  id="activityType"
                  name="activityType"
                  value={formData.activity_inquiry_id ?? 0}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      activity_inquiry_id: Number(newVal)
                    }))}}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option selected value="">Choose an activity...</option>
                  {activityCards.map((activity) => (
                      <option key={activity.card_id} value={activity.card_id} className="uppercase">{activity.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      message: newVal
                    }))}}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Tell us about your inquiry or what you're interested in booking..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
