import type {
  SubmitContactFormRequest,
  SubmitContactFormResponse,
} from '@ultimate-adventure/shared-models';
import { ContactFormDAO } from '@ultimate-adventure/backend-utils';

export const contactFormService = {
  async submitContactForm(request: SubmitContactFormRequest): Promise<SubmitContactFormResponse> {
    const result = await ContactFormDAO.createContactForm({
      first_name: request.first_name,
      last_name: request.last_name,
      email: request.email,
      phone: request.phone,
      activity_inquiry_id: request.activity_inquiry_id,
      message: request.message,
      created_at: new Date().toISOString(),
    });

    return {
      success: true,
      id: result.id,
    };
  },
};
