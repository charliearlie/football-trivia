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
      answer: {
        Row: {
          createdat: string | null
          id: number
          iscorrect: boolean
          questionid: number
          text: string
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          id?: number
          iscorrect: boolean
          questionid: number
          text: string
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          id?: number
          iscorrect?: boolean
          questionid?: number
          text?: string
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answer_questionid_fkey"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
        ]
      }
      career_path: {
        Row: {
          acceptedanswers: string
          createdat: string | null
          difficulty: number | null
          id: number
          playername: string
          updatedat: string | null
          wiki_id: string
        }
        Insert: {
          acceptedanswers: string
          createdat?: string | null
          difficulty?: number | null
          id?: number
          playername: string
          updatedat?: string | null
          wiki_id?: string
        }
        Update: {
          acceptedanswers?: string
          createdat?: string | null
          difficulty?: number | null
          id?: number
          playername?: string
          updatedat?: string | null
          wiki_id?: string
        }
        Relationships: []
      }
      question: {
        Row: {
          createdat: string | null
          difficulty: number | null
          id: number
          text: string
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          difficulty?: number | null
          id?: number
          text: string
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          difficulty?: number | null
          id?: number
          text?: string
          updatedat?: string | null
        }
        Relationships: []
      }
      quiz: {
        Row: {
          createdat: string | null
          difficulty: Database["public"]["Enums"]["quizdifficulty"]
          id: number
          title: string
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          difficulty: Database["public"]["Enums"]["quizdifficulty"]
          id?: number
          title: string
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          difficulty?: Database["public"]["Enums"]["quizdifficulty"]
          id?: number
          title?: string
          updatedat?: string | null
        }
        Relationships: []
      }
      quizquestion: {
        Row: {
          questionid: number
          quizid: number
        }
        Insert: {
          questionid: number
          quizid: number
        }
        Update: {
          questionid?: number
          quizid?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizquestion_questionid_fkey"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizquestion_quizid_fkey"
            columns: ["quizid"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_random_career_path: {
        Args: Record<PropertyKey, never>
        Returns: {
          acceptedanswers: string
          createdat: string | null
          difficulty: number | null
          id: number
          playername: string
          updatedat: string | null
          wiki_id: string
        }[]
      }
    }
    Enums: {
      quizdifficulty:
        | "BEGINNER"
        | "AMATEUR"
        | "SEMI_PRO"
        | "PROFESSIONAL"
        | "WORLD_CLASS"
        | "LEGENDARY"
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
