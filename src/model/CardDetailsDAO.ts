import {SupabaseClient} from "@supabase/supabase-js";
import {getClient} from "./getClient.ts";
import {Tables} from "../definitions/generatedDefinitions.ts";

//private class definition
class _CardDetailsDAO {
    private _client: SupabaseClient
    constructor(client: SupabaseClient) {
        this._client = client;
    }

    public async getAllActivityDetails(id: number): Promise<Tables<'Card Details'>> {
        const { data, error } = await this._client
            .from('Card Details')
            .select('*')
            .eq('card_id', id)
            .limit(1)
        if (error)  {
            console.log(error);
            throw error;
        }
        console.log('getAllDetails', data);
        return data[0];
    }

}

//export instance of class
export const CardDetailsDAO = new _CardDetailsDAO(getClient());
