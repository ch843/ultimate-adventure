export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      "Adventure Cards": {
        Row: {
          adult_price: number | null;
          card_id: number;
          category: string;
          child_price: number | null;
          created_at: string;
          full_day_pp: number | null;
          half_day_pp: number | null;
          hourly: boolean;
          img_link: string;
          location: string;
          max_people: number | null;
          min_people: number | null;
          price_pp: number | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          adult_price?: number | null;
          card_id?: number;
          category: string;
          child_price?: number | null;
          created_at?: string;
          full_day_pp?: number | null;
          half_day_pp?: number | null;
          hourly?: boolean;
          img_link: string;
          location: string;
          max_people?: number | null;
          min_people?: number | null;
          price_pp?: number | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          adult_price?: number | null;
          card_id?: number;
          category?: string;
          child_price?: number | null;
          created_at?: string;
          full_day_pp?: number | null;
          half_day_pp?: number | null;
          hourly?: boolean;
          img_link?: string;
          location?: string;
          max_people?: number | null;
          min_people?: number | null;
          price_pp?: number | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      "Card Details": {
        Row: {
          card_id: number;
          details_id: number;
          flood_danger: string | null;
          gallery_img1: string | undefined;
          gallery_img2: string | undefined;
          gallery_img3: string | undefined;
          gear: string | null;
          hype: string | null;
          length: string | null;
          location_id: number | null;
          maps: string | null;
          notes: string | null;
          rappels: string | null;
          rating: string | null;
          season: string | null;
          water: string | null;
        };
        Insert: {
          card_id: number;
          details_id?: number;
          flood_danger?: string | null;
          gallery_img1?: string | null;
          gallery_img2?: string | null;
          gallery_img3?: string | null;
          gear?: string | null;
          hype?: string | null;
          length?: string | null;
          location_id?: number | null;
          maps?: string | null;
          notes?: string | null;
          rappels?: string | null;
          rating?: string | null;
          season?: string | null;
          water?: string | null;
        };
        Update: {
          card_id?: number;
          details_id?: number;
          flood_danger?: string | null;
          gallery_img1?: string | null;
          gallery_img2?: string | null;
          gallery_img3?: string | null;
          gear?: string | null;
          hype?: string | null;
          length?: string | null;
          location_id?: number | null;
          maps?: string | null;
          notes?: string | null;
          rappels?: string | null;
          rating?: string | null;
          season?: string | null;
          water?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Card Details_card_id_fkey";
            columns: ["card_id"];
            isOneToOne: false;
            referencedRelation: "Adventure Cards";
            referencedColumns: ["card_id"];
          },
          {
            foreignKeyName: "Card Details_location_id_fkey";
            columns: ["location_id"];
            isOneToOne: false;
            referencedRelation: "Location";
            referencedColumns: ["location_id"];
          },
        ];
      };
      "Contact Form Info": {
        Row: {
          activity_inquiry_id: number | null;
          created_at: string;
          email: string;
          first_name: string;
          id: number;
          last_name: string;
          message: string;
          phone: string | null;
        };
        Insert: {
          activity_inquiry_id?: number | null;
          created_at?: string;
          email: string;
          first_name: string;
          id?: number;
          last_name: string;
          message: string;
          phone?: string | null;
        };
        Update: {
          activity_inquiry_id?: number | null;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          message?: string;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Contact Form Info_activity_inquiry_id_fkey";
            columns: ["activity_inquiry_id"];
            isOneToOne: false;
            referencedRelation: "Adventure Cards";
            referencedColumns: ["card_id"];
          },
        ];
      };
      Location: {
        Row: {
          location: string;
          location_id: number;
          title: string;
        };
        Insert: {
          location: string;
          location_id?: number;
          title: string;
        };
        Update: {
          location?: string;
          location_id?: number;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
