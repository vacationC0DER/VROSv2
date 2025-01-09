export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string
          name: string
          position: number
          head_user_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          position: number
          head_user_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          position?: number
          head_user_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      objectives: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          department_id: string
          owner_id: string
          parent_objective_id: string | null
          progress: number | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          department_id: string
          owner_id: string
          parent_objective_id?: string | null
          progress?: number | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          department_id?: string
          owner_id?: string
          parent_objective_id?: string | null
          progress?: number | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: string
          department_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          role: string
          department_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          role?: string
          department_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}