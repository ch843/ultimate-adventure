import { getSupabaseClient } from '../supabase-client';
import type { Tables } from '@ultimate-adventure/shared-models';
import type { SupabaseClient } from '@supabase/supabase-js';
import { TRPCError } from '@trpc/server';

class _CardDetailsDAO {
  private _client: SupabaseClient | null = null;

  private get client() {
    if (!this._client) {
      this._client = getSupabaseClient();
    }
    return this._client;
  }

  public async getCardDetails(id: number): Promise<Tables<'Card Details'>> {
    const { data, error } = await this.client
      .from('Card Details')
      .select('*')
      .eq('card_id', id)
      .limit(1);

    if (error) {
      console.error('Error fetching card details:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch card details: ${error.message}`,
        cause: error,
      });
    }

    if (!data || data.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Card details with id ${id} not found`,
      });
    }

    return data[0];
  }

  public async getAllCardDetails(): Promise<Tables<'Card Details'>[]> {
    const { data, error } = await this.client
      .from('Card Details')
      .select('*');

    if (error) {
      console.error('Error fetching all card details:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch card details: ${error.message}`,
        cause: error,
      });
    }

    return data || [];
  }

  public async createCardDetails(
    cardId: number,
    detailsData: Omit<Tables<'Card Details'>, 'details_id' | 'card_id'>
  ): Promise<Tables<'Card Details'>> {
    const { data, error } = await this.client
      .from('Card Details')
      .insert({ ...detailsData, card_id: cardId })
      .select()
      .single();

    if (error) {
      console.error('Error creating card details:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to create card details: ${error.message}`,
        cause: error,
      });
    }

    if (!data) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create card details: No data returned',
      });
    }

    return data;
  }

  public async updateCardDetails(
    id: number,
    updateData: Partial<Tables<'Card Details'>>
  ): Promise<void> {
    const { error } = await this.client
      .from('Card Details')
      .update(updateData)
      .eq('card_id', id);

    if (error) {
      console.error('Error updating card details:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update card details: ${error.message}`,
        cause: error,
      });
    }
  }
}

export const CardDetailsDAO = new _CardDetailsDAO();
