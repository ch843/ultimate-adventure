import type {
  GetAdventureRequest,
  GetAdventureResponse,
  ListAdventuresRequest,
  ListAdventuresResponse,
  CreateAdventureRequest,
  CreateAdventureResponse,
  Adventure,
} from "@ultimate-adventure/shared-models";
import { TRPCError } from "@trpc/server";

// Mock data store (replace with real database later)
// In production, this would be shared via database
const adventures: Adventure[] = [
  {
    id: "1",
    title: "Mountain Hiking Adventure",
    description: "An exciting trek through the mountains",
    location: "Rocky Mountains, Colorado",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Beach Surfing Experience",
    description: "Learn to surf on beautiful beaches",
    location: "Maui, Hawaii",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const adventureService = {
  async getAdventure(
    request: GetAdventureRequest,
  ): Promise<GetAdventureResponse> {
    const adventure = adventures.find((a) => a.id === request.id);

    if (!adventure) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Adventure with id ${request.id} not found`,
      });
    }

    return { adventure };
  },

  async listAdventures(
    request: ListAdventuresRequest,
  ): Promise<ListAdventuresResponse> {
    const pageSize = request.pageSize || 10;

    return {
      adventures: adventures.slice(0, pageSize),
      nextPageToken: undefined,
    };
  },

  async createAdventure(
    request: CreateAdventureRequest,
  ): Promise<CreateAdventureResponse> {
    const newAdventure: Adventure = {
      id: String(adventures.length + 1),
      title: request.title,
      description: request.description,
      location: request.location,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    adventures.push(newAdventure);

    return { adventure: newAdventure };
  },
};
