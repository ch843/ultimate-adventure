import { router } from '@ultimate-adventure/backend-utils';
import { adventureRouter } from './routers/adventure.router';
import { activityCardRouter } from './routers/activity-card.router';
import { cardDetailsRouter } from './routers/card-details.router';

/**
 * Main app router that combines all sub-routers
 */
export const appRouter = router({
  adventure: adventureRouter,
  activityCard: activityCardRouter,
  cardDetails: cardDetailsRouter,
});

export type AppRouter = typeof appRouter;
