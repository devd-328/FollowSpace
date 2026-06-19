export type FollowUpStatus = "pending" | "overdue" | "done" | "snoozed";
export type FollowUpPriority = "low" | "medium" | "high";
export type NotificationChannel = "in_app" | "email";

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  company: string | null;
  last_contact_at: string | null;
  created_at: string;
}

export interface FollowUp {
  id: string;
  user_id: string;
  contact_id: string;
  context: string | null;
  action: string;
  due_date: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  followup_id: string;
  channel: NotificationChannel;
  sent_at: string;
  read_at: string | null;
}

export interface ExtractedFollowUp {
  person: string;
  action: string;
  follow_up_date: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
  context?: string;
}
