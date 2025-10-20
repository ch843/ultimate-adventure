import type {
  GetActivityDetailsRequest,
  GetActivityDetailsResponse,
  CreateCardDetailsRequest,
  CreateCardDetailsResponse,
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

  async createCardDetails(
    request: CreateCardDetailsRequest,
  ): Promise<CreateCardDetailsResponse> {
    const { location_id, ...rest } = request.data;
    const details = await CardDetailsDAO.createCardDetails(request.cardId, {
      ...rest,
      location_id: location_id ?? null,
    });
    return { details };
  },

  async updateCardDetails(
    request: UpdateCardDetailsRequest,
  ): Promise<UpdateCardDetailsResponse> {
    await CardDetailsDAO.updateCardDetails(request.cardId, request.data);
    return { success: true };
  },
};
