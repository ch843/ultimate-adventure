import {SupabaseClient} from "@supabase/supabase-js";
import {getClient} from "./getClient.ts";
import {Tables} from "../definitions/generatedDefinitions.ts";

//private class definition
class _ActivityCardDAO {
    private _client: SupabaseClient
    constructor(client: SupabaseClient) {
        this._client = client;
    }

    public async getActivityCard(id: number): Promise<Tables<'Adventure Cards'>> {
        const { data, error } = await this._client
            .from('Adventure Cards')
            .select('*')
            .eq('card_id', id)
            .limit(1)
        if (error)  {
            console.log(error);
            throw error;
        }
        return data[0];
    }

    public async getAllActivityCards(): Promise<Tables<'Adventure Cards'>[]> {
        const { data, error } = await this._client
            .from('Adventure Cards')
            .select('*')
        if (error)  {
            console.log(error);
            throw error;
        }
        return data;
    }

    public async updateActivityCard(id: number, updateData: Partial<Tables<'Adventure Cards'>>): Promise<void> {
        const { error } = await this._client
            .from('Adventure Cards')
            .update(updateData)
            .eq('card_id', id);
        
        if (error) {
            console.log(error);
            throw error;
        }
    }

    // public async deleteActivityCard(id: string): Promise<void> {}
    //
    // public async createActivityCard(activityId: string): Promise<void> {}

}

//export instance of class
export const ActivityCardDAO = new _ActivityCardDAO(getClient());
