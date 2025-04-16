import {SupabaseClient} from "@supabase/supabase-js";
import {getClient} from "./getClient.ts";
import {Tables} from "../definitions/generatedDefinitions.ts";

//private class definition
class _ContactFormInformationDAO {
    private _client: SupabaseClient
    constructor(client: SupabaseClient) {
        this._client = client;
    }

    public async postContactFormData({formData}: {formData: Tables<'Contact Form Info'>}) {
        const { error } = await this._client
            .from('Contact Form Information')
            .insert([
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                    activity_type: formData.activity_inquiry_id,
                    message: formData.message,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) {
            console.log('Error inserting into table:', error);
            throw error;
        }
    }
}

//export instance of class
export const ContactFormInformationDAO = new _ContactFormInformationDAO(getClient());