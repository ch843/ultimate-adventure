import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import { SubmitContactFormRequestSchema } from "@ultimate-adventure/shared-models";
import { contactFormService } from "../services/contact-form.service";

export const contactFormRouter = router({
  submit: publicProcedure
    .input(SubmitContactFormRequestSchema)
    .mutation(({ input }) => contactFormService.submitContactForm(input)),
});

export type ContactFormRouter = typeof contactFormRouter;
