export {
  listFollowUps,
  listFollowUpsByStatus,
  listFollowUpsWithContacts,
  createFollowUp,
  updateFollowUpStatus,
} from "./service";
export type { FollowUp, FollowUpWithContact } from "./service";
export { createFollowUpFromExtraction } from "./create-from-extraction";
