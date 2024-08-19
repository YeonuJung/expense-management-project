export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact: {
        Row: {
          detail: string
          email: string
          id: number
          name: string
          phone_number: string | null
        }
        Insert: {
          detail: string
          email: string
          id?: number
          name: string
          phone_number?: string | null
        }
        Update: {
          detail?: string
          email?: string
          id?: number
          name?: string
          phone_number?: string | null
        }
        Relationships: []
      }
      expensebook: {
        Row: {
          expense_limit: number
          id: number
        }
        Insert: {
          expense_limit: number
          id?: number
        }
        Update: {
          expense_limit?: number
          id?: number
        }
        Relationships: []
      }
      expenserecord: {
        Row: {
          category: string
          date: string
          expense_book_id: number
          id: number
          name: string
          place: string | null
          price: number
          rating: string
        }
        Insert: {
          category: string
          date: string
          expense_book_id: number
          id?: number
          name: string
          place?: string | null
          price: number
          rating: string
        }
        Update: {
          category?: string
          date?: string
          expense_book_id?: number
          id?: number
          name?: string
          place?: string | null
          price?: number
          rating?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_4"
            columns: ["expense_book_id"]
            isOneToOne: false
            referencedRelation: "expensebook"
            referencedColumns: ["id"]
          },
        ]
      }
      expenserecordmember: {
        Row: {
          expense_book_id: number
          id: number
          is_active: boolean
          member_id: number
          role: string
          user_id: string
        }
        Insert: {
          expense_book_id: number
          id?: number
          is_active: boolean
          member_id: number
          role: string
          user_id: string
        }
        Update: {
          expense_book_id?: number
          id?: number
          is_active?: boolean
          member_id?: number
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenserecordmember_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_3"
            columns: ["expense_book_id"]
            isOneToOne: false
            referencedRelation: "expensebook"
            referencedColumns: ["id"]
          },
        ]
      }
      loginhistory: {
        Row: {
          browser: string
          created_at: string
          id: number
          ip: string
          user_id: string
        }
        Insert: {
          browser: string
          created_at: string
          id?: number
          ip: string
          user_id: string
        }
        Update: {
          browser?: string
          created_at?: string
          id?: number
          ip?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loginhistory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      member: {
        Row: {
          email: string
          id: number
          name: string
          profile_img: string | null
          user_id: string
        }
        Insert: {
          email: string
          id?: number
          name: string
          profile_img?: string | null
          user_id: string
        }
        Update: {
          email?: string
          id?: number
          name?: string
          profile_img?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
