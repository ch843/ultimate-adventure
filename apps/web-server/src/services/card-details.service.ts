import type {
  GetActivityDetailsRequest,
  GetActivityDetailsResponse,
  UpdateCardDetailsRequest,
  UpdateCardDetailsResponse,
} from "@ultimate-adventure/shared-models";
import { CardDetailsDAO } from "@ultimate-adventure/backend-utils";

export const cardDetailsService = {
  async getActivityDetails(
    request: GetActivityDetailsRequest,
  ): Promise<GetActivityDetailsResponse> {
    const details = await CardDetailsDAO.getCardDetails(request.cardId);
    return { details };
  },

  async updateCardDetails(
    request: UpdateCardDetailsRequest,
  ): Promise<UpdateCardDetailsResponse> {
    await CardDetailsDAO.updateCardDetails(request.cardId, request.data);
    return { success: true };
  },
};
