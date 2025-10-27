import { router } from "@ultimate-adventure/backend-utils";
import { adventureRouter } from "./routers/adventure.router.js";
import { activityCardRouter } from "./routers/activity-card.router.js";
import { cardDetailsRouter } from "./routers/card-details.router.js";
import { contactFormRouter } from "./routers/contact-form.router.js";

/**
 * Main app router that combines all sub-routers
 */
export const appRouter = router({
  adventure: adventureRouter,
  activityCard: activityCardRouter,
  cardDetails: cardDetailsRouter,
  contactForm: contactFormRouter,
});

export type AppRouter = typeof appRouter;
