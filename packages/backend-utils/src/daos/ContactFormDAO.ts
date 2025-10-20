import { getSupabaseClient } from "../supabase-client";
import type { Tables } from "@ultimate-adventure/shared-models";
import type { SupabaseClient } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";

export type ContactFormInsert = Omit<Tables<"Contact Form Info">, "id">;

class _ContactFormDAO {
  private _client: SupabaseClient | null = null;

  private get client() {
    if (!this._client) {
      this._client = getSupabaseClient();
    }
    return this._client;
  }

  public async createContactForm(
    formData: ContactFormInsert,
  ): Promise<Tables<"Contact Form Info">> {
    const { data, error } = await this.client
      .from("Contact Form Info")
      .insert([
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          activity_inquiry_id: formData.activity_inquiry_id,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating contact form:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create contact form: ${error.message}`,
        cause: error,
      });
    }

    return data;
  }

  public async getContactForm(
    id: number,
  ): Promise<Tables<"Contact Form Info">> {
    const { data, error } = await this.client
      .from("Contact Form Info")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) {
      console.error("Error fetching contact form:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch contact form: ${error.message}`,
        cause: error,
      });
    }

    if (!data || data.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Contact form with id ${id} not found`,
      });
    }

    return data[0];
  }

  public async getAllContactForms(): Promise<Tables<"Contact Form Info">[]> {
    const { data, error } = await this.client
      .from("Contact Form Info")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all contact forms:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch contact forms: ${error.message}`,
        cause: error,
      });
    }

    return data || [];
  }
}

export const ContactFormDAO = new _ContactFormDAO();
