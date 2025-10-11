import { relations } from "drizzle-orm/relations";
import { 
  usersInDinda,
  inovatorInDinda, 
  inovasiInDinda, 
  sdgsInDinda,
  kecamatanInDinda,
  forumCategoriesInDinda,
  forumTopicsInDinda,
  forumRepliesInDinda,
  webinarsInDinda,
  webinarRegistrationsInDinda,
  inkubasiProgramInDinda,
  inkubasiApplicationsInDinda,
  competitionsInDinda,
  competitionSubmissionsInDinda,
  knowledgeBaseInDinda,
  activityLogsInDinda,
  notificationsInDinda
} from "./tables";

// Users Relations
export const usersInDindaRelations = relations(usersInDinda, ({one, many}) => ({
  inovator: one(inovatorInDinda),
  forumTopics: many(forumTopicsInDinda),
  forumReplies: many(forumRepliesInDinda),
  webinarRegistrations: many(webinarRegistrationsInDinda),
  inkubasiApplications: many(inkubasiApplicationsInDinda),
  competitionSubmissions: many(competitionSubmissionsInDinda),
  knowledgeBaseArticles: many(knowledgeBaseInDinda),
  activityLogs: many(activityLogsInDinda),
  notifications: many(notificationsInDinda),
}));

// Inovator Relations
export const inovatorInDindaRelations = relations(inovatorInDinda, ({one, many}) => ({
  user: one(usersInDinda, {
    fields: [inovatorInDinda.userId],
    references: [usersInDinda.id]
  }),
  kecamatan: one(kecamatanInDinda, {
    fields: [inovatorInDinda.idKecamatan],
    references: [kecamatanInDinda.id]
  }),
  inovasiList: many(inovasiInDinda),
}));

// Kecamatan Relations
export const kecamatanInDindaRelations = relations(kecamatanInDinda, ({many}) => ({
  inovators: many(inovatorInDinda),
  inovasiList: many(inovasiInDinda),
}));

// Inovasi Relations
export const inovasiInDindaRelations = relations(inovasiInDinda, ({one}) => ({
  inovator: one(inovatorInDinda, {
    fields: [inovasiInDinda.inovatorId],
    references: [inovatorInDinda.id]
  }),
  sdgs: one(sdgsInDinda, {
    fields: [inovasiInDinda.sdgsId],
    references: [sdgsInDinda.id]
  }),
  kecamatan: one(kecamatanInDinda, {
    fields: [inovasiInDinda.idKecamatan],
    references: [kecamatanInDinda.id]
  }),
}));

// SDGs Relations
export const sdgsInDindaRelations = relations(sdgsInDinda, ({many}) => ({
  inovasiList: many(inovasiInDinda),
}));

// Forum Categories Relations
export const forumCategoriesInDindaRelations = relations(forumCategoriesInDinda, ({many}) => ({
  topics: many(forumTopicsInDinda),
  knowledgeBaseArticles: many(knowledgeBaseInDinda),
}));

// Forum Topics Relations
export const forumTopicsInDindaRelations = relations(forumTopicsInDinda, ({one, many}) => ({
  category: one(forumCategoriesInDinda, {
    fields: [forumTopicsInDinda.categoryId],
    references: [forumCategoriesInDinda.id]
  }),
  author: one(usersInDinda, {
    fields: [forumTopicsInDinda.userId],
    references: [usersInDinda.id]
  }),
  lastReplyUser: one(usersInDinda, {
    fields: [forumTopicsInDinda.lastReplyUserId],
    references: [usersInDinda.id]
  }),
  replies: many(forumRepliesInDinda),
}));

// Forum Replies Relations
export const forumRepliesInDindaRelations = relations(forumRepliesInDinda, ({one, many}) => ({
  topic: one(forumTopicsInDinda, {
    fields: [forumRepliesInDinda.topicId],
    references: [forumTopicsInDinda.id]
  }),
  author: one(usersInDinda, {
    fields: [forumRepliesInDinda.userId],
    references: [usersInDinda.id]
  }),
  parent: one(forumRepliesInDinda, {
    fields: [forumRepliesInDinda.parentId],
    references: [forumRepliesInDinda.id]
  }),
  children: many(forumRepliesInDinda),
}));

// Webinars Relations
export const webinarsInDindaRelations = relations(webinarsInDinda, ({many}) => ({
  registrations: many(webinarRegistrationsInDinda),
}));

// Webinar Registrations Relations
export const webinarRegistrationsInDindaRelations = relations(webinarRegistrationsInDinda, ({one}) => ({
  webinar: one(webinarsInDinda, {
    fields: [webinarRegistrationsInDinda.webinarId],
    references: [webinarsInDinda.id]
  }),
  user: one(usersInDinda, {
    fields: [webinarRegistrationsInDinda.userId],
    references: [usersInDinda.id]
  }),
}));

// Inkubasi Program Relations
export const inkubasiProgramInDindaRelations = relations(inkubasiProgramInDinda, ({many}) => ({
  applications: many(inkubasiApplicationsInDinda),
}));

// Inkubasi Applications Relations
export const inkubasiApplicationsInDindaRelations = relations(inkubasiApplicationsInDinda, ({one}) => ({
  program: one(inkubasiProgramInDinda, {
    fields: [inkubasiApplicationsInDinda.programId],
    references: [inkubasiProgramInDinda.id]
  }),
  user: one(usersInDinda, {
    fields: [inkubasiApplicationsInDinda.userId],
    references: [usersInDinda.id]
  }),
}));

// Competitions Relations
export const competitionsInDindaRelations = relations(competitionsInDinda, ({many}) => ({
  submissions: many(competitionSubmissionsInDinda),
}));

// Competition Submissions Relations
export const competitionSubmissionsInDindaRelations = relations(competitionSubmissionsInDinda, ({one}) => ({
  competition: one(competitionsInDinda, {
    fields: [competitionSubmissionsInDinda.competitionId],
    references: [competitionsInDinda.id]
  }),
  user: one(usersInDinda, {
    fields: [competitionSubmissionsInDinda.userId],
    references: [usersInDinda.id]
  }),
}));

// Knowledge Base Relations
export const knowledgeBaseInDindaRelations = relations(knowledgeBaseInDinda, ({one}) => ({
  category: one(forumCategoriesInDinda, {
    fields: [knowledgeBaseInDinda.categoryId],
    references: [forumCategoriesInDinda.id]
  }),
  author: one(usersInDinda, {
    fields: [knowledgeBaseInDinda.authorId],
    references: [usersInDinda.id]
  }),
}));

// Activity Logs Relations
export const activityLogsInDindaRelations = relations(activityLogsInDinda, ({one}) => ({
  user: one(usersInDinda, {
    fields: [activityLogsInDinda.userId],
    references: [usersInDinda.id]
  }),
}));

// Notifications Relations
export const notificationsInDindaRelations = relations(notificationsInDinda, ({one}) => ({
  user: one(usersInDinda, {
    fields: [notificationsInDinda.userId],
    references: [usersInDinda.id]
  }),
}));