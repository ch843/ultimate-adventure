import { getSupabaseClient } from "../supabase-client.js";
import { ReviewInfoSchema, type Tables } from "@ultimate-adventure/shared-models";
import type { SupabaseClient } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";

class _ReviewsDAO {
  private _client: SupabaseClient | null = null;

  private get client() {
    if (!this._client) {
      this._client = getSupabaseClient();
    }
    return this._client;
  }

  public async getAllReviews(): Promise<Tables<"Reviews">[]> {
    const { data, error } = await this.client
      .from("Reviews")
      .select("*");

    if (error) {
      console.error("Error fetching reviews:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch reviews: ${error.message}`,
        cause: error,
      });
    }

    return data.map((review) => {
      return ReviewInfoSchema.parse(review)
    }) || [];
  }

  public async createReview(
    reviewData: Omit<
      Tables<"Reviews">,
      "id" | "created_at"
    >,
  ): Promise<Tables<"Reviews">> {
    const { data, error } = await this.client
      .from("Reviews")
      .insert({ ...reviewData, published: false })
      .select()
      .single();

    if (error) {
      console.error("Error creating review.", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create review: ${error.message}`,
        cause: error,
      });
    }

    if (!data) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create review: No data returned",
      });
    }

    return data;
  }

}

export const ReviewsDAO = new _ReviewsDAO();
