import {SupabaseClient} from "@supabase/supabase-js";
import {getClient} from "./getClient.ts";
import {Tables} from "../definitions/generatedDefinitions.ts";

//private class definition
class _ActivityCardDAO {
    private _client: SupabaseClient
    constructor(client: SupabaseClient) {
        this._client = client;
    }

    // public async getActivityCard(activityId: string): Promise</*supabase generated type*/> {}
    //
    // public async updateActivityCard(id: string): Promise<void> {}
    //
    // public async deleteActivityCard(id: string): Promise<void> {}
    //
    // public async createActivityCard(activityId: string): Promise<void> {}

    public async getAllActivityCards(): Promise<Tables<'Adventure Cards'>[]> {
        const { data, error } = await this._client
            .from('Adventure Cards')
            .select('*')
        if (error)  {
            console.log(error);
            throw error;
        }
        console.log('getAllActivityCards', data);
        return data;
    }

}

//export instance of class
export const ActivityCardDAO = new _ActivityCardDAO(getClient());
