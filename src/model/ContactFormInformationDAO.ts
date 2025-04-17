import {SupabaseClient} from "@supabase/supabase-js";
import {getClient} from "./getClient.ts";
import {z} from "zod";

export const ContactFormSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z
        .string()
        .min(10, { message: 'Must be a valid mobile number' })
        .max(14, { message: 'Must be a valid mobile number' })
        .nullable(),
    activity_inquiry_id: z.number()
        .min(0)
        .nullable(),
    message: z.string(),
    created_at: z.string()
})

export type ContactFormToSubmit = z.infer<typeof ContactFormSchema>//Omit<Tables<'Contact Form Info'>, 'id'>

//private class definition
class _ContactFormInformationDAO {
    private _client: SupabaseClient
    constructor(client: SupabaseClient) {
        this._client = client;
    }

    public async postContactFormData(formData: ContactFormToSubmit): Promise<void> {
        const { error } = await this._client
            .from('Contact Form Info')
            .insert([
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                    activity_inquiry_id: formData.activity_inquiry_id,
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