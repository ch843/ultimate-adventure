import { router } from '@ultimate-adventure/backend-utils';
import { adventureRouter } from './routers/adventure.router';
import { activityCardRouter } from './routers/activity-card.router';
import { cardDetailsRouter } from './routers/card-details.router';
import { clubMemberRouter } from './routers/club-member.router';
import { tripRouter } from './routers/trip.router';
import { tripMemberRouter } from './routers/trip-member.router';

/**
 * Main app router that combines all sub-routers
 */
export const appRouter = router({
  adventure: adventureRouter,
  activityCard: activityCardRouter,
  cardDetails: cardDetailsRouter,
  clubMember: clubMemberRouter,
  trip: tripRouter,
  tripMember: tripMemberRouter,
});

export type AppRouter = typeof appRouter;
