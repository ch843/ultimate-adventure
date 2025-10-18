import type {
  GetActivityCardRequest,
  GetActivityCardResponse,
  GetAllActivityCardsRequest,
  GetAllActivityCardsResponse,
  UpdateActivityCardRequest,
  UpdateActivityCardResponse,
  AdventureCard,
} from '@ultimate-adventure/shared-models';
import {
  AdventureCardSchema,
} from '@ultimate-adventure/shared-models';
import { ActivityCardDAO } from '@ultimate-adventure/backend-utils';

export const activityCardService = {
  async getActivityCard(request: GetActivityCardRequest): Promise<GetActivityCardResponse> {
    const dbCard = await ActivityCardDAO.getActivityCard(request.id);

    // Validate the response from DB with Zod
    const card: AdventureCard = AdventureCardSchema.parse(dbCard);

    return { card };
  },

  async getAllActivityCards(_request: GetAllActivityCardsRequest): Promise<GetAllActivityCardsResponse> {
    const dbCards = await ActivityCardDAO.getAllActivityCards();

    // Validate all cards from DB with Zod
    const cards: AdventureCard[] = dbCards.map(card => AdventureCardSchema.parse(card));

    return { cards };
  },

  async updateActivityCard(request: UpdateActivityCardRequest): Promise<UpdateActivityCardResponse> {
    await ActivityCardDAO.updateActivityCard(request.id, request.data);

    return { success: true };
  },
};
