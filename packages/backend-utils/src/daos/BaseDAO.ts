import { getSupabaseClient } from '../supabase-client';
import type { SupabaseClient } from '@supabase/supabase-js';
import { TRPCError } from '@trpc/server';

export abstract class BaseDAO<TTable extends string> {
  private _client: SupabaseClient | null = null;

  protected abstract tableName: TTable;
  protected abstract idColumn: string;

  protected get client() {
    if (!this._client) {
      this._client = getSupabaseClient();
    }
    return this._client;
  }

  public async getById<T>(id: number): Promise<T> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq(this.idColumn, id)
      .limit(1);

    if (error) {
      console.error(`Error fetching ${this.tableName}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch ${this.tableName}: ${error.message}`,
        cause: error,
      });
    }

    if (!data || data.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `${this.tableName} with ${this.idColumn} ${id} not found`,
      });
    }

    return data[0] as T;
  }

  public async getAll<T>(): Promise<T[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*');

    if (error) {
      console.error(`Error fetching all ${this.tableName}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch ${this.tableName}: ${error.message}`,
        cause: error,
      });
    }

    return (data || []) as T[];
  }

  public async create<T, TInsert>(insertData: TInsert): Promise<T> {
    const { data, error } = await this.client
      .from(this.tableName)
      .insert(insertData as any)
      .select()
      .single();

    if (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to create ${this.tableName}: ${error.message}`,
        cause: error,
      });
    }

    if (!data) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to create ${this.tableName}: No data returned`,
      });
    }

    return data as T;
  }

  public async update<TUpdate>(id: number, updateData: TUpdate): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .update(updateData as any)
      .eq(this.idColumn, id);

    if (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update ${this.tableName}: ${error.message}`,
        cause: error,
      });
    }
  }

  public async delete(id: number): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq(this.idColumn, id);

    if (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to delete ${this.tableName}: ${error.message}`,
        cause: error,
      });
    }
  }
}
