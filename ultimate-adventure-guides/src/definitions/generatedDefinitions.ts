export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      "Adventure Cards": {
        Row: {
          active: boolean
          adult_price: number | null
          card_id: number
          category: string
          child_price: number | null
          created_at: string
          full_day_pp: number | null
          half_day_pp: number | null
          hourly: boolean
          img_link: string
          location: string
          max_people: number | null
          min_people: number | null
          price_pp: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active: boolean
          adult_price?: number | null
          card_id?: number
          category: string
          child_price?: number | null
          created_at?: string
          full_day_pp?: number | null
          half_day_pp?: number | null
          hourly?: boolean
          img_link: string
          location: string
          max_people?: number | null
          min_people?: number | null
          price_pp?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          adult_price?: number | null
          card_id?: number
          category?: string
          child_price?: number | null
          created_at?: string
          full_day_pp?: number | null
          half_day_pp?: number | null
          hourly?: boolean
          img_link?: string
          location?: string
          max_people?: number | null
          min_people?: number | null
          price_pp?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      "Card Details": {
        Row: {
          card_id: number
          details_id: number
          flood_danger: string | null
          gallery_img1: string | null
          gallery_img2: string | null
          gallery_img3: string | null
          gear: string | null
          hype: string | null
          length: string | null
          location_id: number | null
          maps: string | null
          notes: string | null
          rappels: string | null
          rating: string | null
          season: string | null
          water: string | null
        }
        Insert: {
          card_id: number
          details_id?: number
          flood_danger?: string | null
          gallery_img1?: string | null
          gallery_img2?: string | null
          gallery_img3?: string | null
          gear?: string | null
          hype?: string | null
          length?: string | null
          location_id?: number | null
          maps?: string | null
          notes?: string | null
          rappels?: string | null
          rating?: string | null
          season?: string | null
          water?: string | null
        }
        Update: {
          card_id?: number
          details_id?: number
          flood_danger?: string | null
          gallery_img1?: string | null
          gallery_img2?: string | null
          gallery_img3?: string | null
          gear?: string | null
          hype?: string | null
          length?: string | null
          location_id?: number | null
          maps?: string | null
          notes?: string | null
          rappels?: string | null
          rating?: string | null
          season?: string | null
          water?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Card Details_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "Adventure Cards"
            referencedColumns: ["card_id"]
          },
          {
            foreignKeyName: "Card Details_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "Location"
            referencedColumns: ["location_id"]
          },
        ]
      }
      "Contact Form Info": {
        Row: {
          activity_inquiry_id: number | null
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
          message: string
          phone: string | null
        }
        Insert: {
          activity_inquiry_id?: number | null
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
          message: string
          phone?: string | null
        }
        Update: {
          activity_inquiry_id?: number | null
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          message?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Contact Form Info_activity_inquiry_id_fkey"
            columns: ["activity_inquiry_id"]
            isOneToOne: false
            referencedRelation: "Adventure Cards"
            referencedColumns: ["card_id"]
          },
        ]
      }
      Location: {
        Row: {
          location: string
          location_id: number
          title: string
        }
        Insert: {
          location: string
          location_id?: number
          title: string
        }
        Update: {
          location?: string
          location_id?: number
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
