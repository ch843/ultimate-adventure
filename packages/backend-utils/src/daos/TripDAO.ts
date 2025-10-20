import { BaseDAO } from "./BaseDAO";
import type { Tables } from "@ultimate-adventure/shared-models";

class _TripDAO extends BaseDAO<"Trips"> {
  protected tableName = "Trips" as const;
  protected idColumn = "id" as const;

  public async getTrip(id: number): Promise<Tables<"Trips">> {
    return this.getById<Tables<"Trips">>(id);
  }

  public async getAllTrips(): Promise<Tables<"Trips">[]> {
    return this.getAll<Tables<"Trips">>();
  }

  public async createTrip(
    tripData: Omit<Tables<"Trips">, "id">,
  ): Promise<Tables<"Trips">> {
    return this.create<Tables<"Trips">, typeof tripData>(tripData);
  }

  public async updateTrip(
    id: number,
    updateData: Partial<Tables<"Trips">>,
  ): Promise<void> {
    return this.update(id, updateData);
  }

  public async deleteTrip(id: number): Promise<void> {
    return this.delete(id);
  }

  // Additional helper method to get trips by group number
  public async getTripsByGroupNum(
    groupNum: number,
  ): Promise<Tables<"Trips">[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select("*")
      .eq("group_num", groupNum);

    if (error) {
      throw new Error(
        `Failed to fetch trips for group ${groupNum}: ${error.message}`,
      );
    }

    return data || [];
  }
}

export const TripDAO = new _TripDAO();
