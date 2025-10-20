import { BaseDAO } from './BaseDAO';
import type { Tables } from '@ultimate-adventure/shared-models';

class _TripMemberDAO extends BaseDAO<'Trip Members'> {
  protected tableName = 'Trip Members' as const;
  protected idColumn = 'id' as const;

  public async getTripMember(id: number): Promise<Tables<'Trip Members'>> {
    return this.getById<Tables<'Trip Members'>>(id);
  }

  public async getAllTripMembers(): Promise<Tables<'Trip Members'>[]> {
    return this.getAll<Tables<'Trip Members'>>();
  }

  public async createTripMember(
    tripMemberData: Omit<Tables<'Trip Members'>, 'id'>
  ): Promise<Tables<'Trip Members'>> {
    return this.create<Tables<'Trip Members'>, typeof tripMemberData>(tripMemberData);
  }

  public async updateTripMember(
    id: number,
    updateData: Partial<Tables<'Trip Members'>>
  ): Promise<void> {
    return this.update(id, updateData);
  }

  public async deleteTripMember(id: number): Promise<void> {
    return this.delete(id);
  }

  // Additional helper method specific to Trip Members
  public async getTripMembersByTripId(tripId: number): Promise<Tables<'Trip Members'>[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('trip_id', tripId);

    if (error) {
      throw new Error(`Failed to fetch trip members for trip ${tripId}: ${error.message}`);
    }

    return data || [];
  }

  // Get all trip members for a specific club member
  public async getTripMembersByMemberId(memberId: number): Promise<Tables<'Trip Members'>[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('member_id', memberId);

    if (error) {
      throw new Error(`Failed to fetch trip members for member ${memberId}: ${error.message}`);
    }

    return data || [];
  }
}

export const TripMemberDAO = new _TripMemberDAO();
