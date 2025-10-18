import { getSupabaseClient } from '../supabase-client';
import type { Tables } from '@ultimate-adventure/shared-models';
import type { SupabaseClient } from '@supabase/supabase-js';
import { TRPCError } from '@trpc/server';

class _ActivityCardDAO {
  private _client: SupabaseClient | null = null;

  private get client() {
    if (!this._client) {
      this._client = getSupabaseClient();
    }
    return this._client;
  }

  public async getActivityCard(id: number): Promise<Tables<'Adventure Cards'>> {
    const { data, error } = await this.client
      .from('Adventure Cards')
      .select('*')
      .eq('card_id', id)
      .limit(1);

    if (error) {
      console.error('Error fetching activity card:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch activity card: ${error.message}`,
        cause: error,
      });
    }

    if (!data || data.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Activity card with id ${id} not found`,
      });
    }

    return data[0];
  }

  public async getAllActivityCards(): Promise<Tables<'Adventure Cards'>[]> {
    const { data, error } = await this.client
      .from('Adventure Cards')
      .select('*');

    if (error) {
      console.error('Error fetching all activity cards:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch activity cards: ${error.message}`,
        cause: error,
      });
    }

    return data || [];
  }

  public async updateActivityCard(
    id: number,
    updateData: Partial<Tables<'Adventure Cards'>>
  ): Promise<void> {
    const { error } = await this.client
      .from('Adventure Cards')
      .update(updateData)
      .eq('card_id', id);

    if (error) {
      console.error('Error updating activity card:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update activity card: ${error.message}`,
        cause: error,
      });
    }
  }
}

export const ActivityCardDAO = new _ActivityCardDAO();
