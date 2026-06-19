import type {
  Contact,
  FollowUp,
  FollowUpPriority,
  FollowUpStatus,
  Notification,
  NotificationChannel,
} from "@/lib/types/domain";

type ContactInsert = {
  id?: string;
  user_id: string;
  name: string;
  company?: string | null;
  last_contact_at?: string | null;
  created_at?: string;
};

type FollowUpInsert = {
  id?: string;
  user_id: string;
  contact_id: string;
  context?: string | null;
  action: string;
  due_date: string;
  priority?: FollowUpPriority;
  status?: FollowUpStatus;
  created_at?: string;
};

type NotificationInsert = {
  id?: string;
  user_id: string;
  followup_id: string;
  channel: NotificationChannel;
  sent_at?: string;
  read_at?: string | null;
};

type ContactRelationship = {
  foreignKeyName: "contacts_user_id_fkey";
  columns: ["user_id"];
  isOneToOne: false;
  referencedRelation: "users";
  referencedColumns: ["id"];
};

type FollowUpRelationship = {
  foreignKeyName: "followups_user_id_fkey" | "followups_contact_id_fkey";
  columns: ["user_id"] | ["contact_id"];
  isOneToOne: false;
  referencedRelation: "users" | "contacts";
  referencedColumns: ["id"];
};

type NotificationRelationship = {
  foreignKeyName: "notifications_user_id_fkey" | "notifications_followup_id_fkey";
  columns: ["user_id"] | ["followup_id"];
  isOneToOne: false;
  referencedRelation: "users" | "followups";
  referencedColumns: ["id"];
};

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: Contact;
        Insert: ContactInsert;
        Update: Partial<Contact>;
        Relationships: ContactRelationship[];
      };
      followups: {
        Row: FollowUp;
        Insert: FollowUpInsert;
        Update: Partial<FollowUp>;
        Relationships: FollowUpRelationship[];
      };
      notifications: {
        Row: Notification;
        Insert: NotificationInsert;
        Update: Partial<Notification>;
        Relationships: NotificationRelationship[];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}
