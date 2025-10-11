import { 
  pgTable, 
  pgSchema, 
  integer, 
  timestamp, 
  smallint, 
  text, 
  bigint, 
  varchar, 
  foreignKey, 
  serial,
  boolean,
  pgEnum,
  jsonb,
  uuid
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const dinda = pgSchema("dinda");

// Enums
export const statusEnum = pgEnum('status', ['draft', 'review', 'approved', 'rejected', 'published']);
export const kategoriEnum = pgEnum('kategori', ['teknologi', 'digital', 'lingkungan', 'infrastruktur', 'pelayanan_publik', 'ekonomi']);
export const roleEnum = pgEnum('role', ['admin', 'user', 'moderator', 'inovator']);
export const jenisPelatihanEnum = pgEnum('jenis_pelatihan', ['webinar', 'workshop', 'seminar', 'training']);

// Users & Authentication
export const usersInDinda = dinda.table("users", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  avatar: text(),
  role: roleEnum().default('user').notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// SDGs
export const sdgsInDinda = dinda.table("sdgs", {
  id: integer().primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }),
  tujuanKe: smallint("tujuan_ke"),
  sdgs: text(),
  image: text(),
  deskripsi: text(),
  target: text(),
});

// Kecamatan
export const kecamatanInDinda = dinda.table("kecamatan", {
  id: bigint({ mode: "number" }).primaryKey().notNull(),
  nama: varchar({ length: 255 }).notNull(),
  kode: varchar({ length: 20 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Inovator
export const inovatorInDinda = dinda.table("inovator", {
  id: serial().primaryKey(),
  userId: integer("user_id").references(() => usersInDinda.id),
  inovator: text().notNull(),
  agencyIdPanrb: integer("agency_id_panrb"),
  idKabkot: integer("id_kabkot").notNull(),
  idProvinsi: integer("id_provinsi").notNull(),
  longlat: varchar({ length: 100 }),
  alamat: text(),
  telepon: varchar({ length: 20 }),
  website: varchar({ length: 255 }),
  bio: text(),
  expertise: text(),
  idKecamatan: bigint("id_kecamatan", { mode: "number" }).references(() => kecamatanInDinda.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Inovasi
export const inovasiInDinda = dinda.table("inovasi", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  judulInovasi: text("judul_inovasi").notNull(),
  slug: varchar({ length: 255 }).unique(),
  // OPD/Instansi di Kota Cilegon
  opd: varchar({ length: 255 }), // Organisasi Perangkat Daerah
  urusan: text(), // Urusan pemerintahan yang ditangani
  deskripsi: text().notNull(),
  latarBelakang: text("latar_belakang"), // Background masalah
  tujuan: text(), // Tujuan inovasi
  manfaat: text(), // Manfaat yang diharapkan
  tahapPelaksanaan: text("tahap_pelaksanaan"), // Tahapan implementasi
  dampak: text(),
  tahun: varchar({ length: 4 }),
  status: statusEnum().default('draft'),
  kategori: kategoriEnum().notNull(),
  // Lokasi spesifik di Kota Cilegon
  idKecamatan: bigint("id_kecamatan", { mode: "number" }).references(() => kecamatanInDinda.id),
  lokasi: text(), // Alamat/lokasi spesifik implementasi
  // Referensi inovator
  inovatorId: integer("inovator_id").references(() => inovatorInDinda.id),
  // SDGs alignment
  sdgsId: integer("sdgs_id").references(() => sdgsInDinda.id),
  // Media dan dokumentasi
  gambar: jsonb(), // Array gambar/foto
  dokumen: jsonb(), // Dokumen pendukung
  video: varchar({ length: 255 }), // Link video presentasi/demo
  // Metadata
  tags: text(), // Tags untuk kategorisasi
  sumberDana: varchar("sumber_dana", { length: 255 }), // Sumber pendanaan
  anggaranDiperlukan: bigint("anggaran_diperlukan", { mode: "number" }), // Budget needed
  targetPenerima: text("target_penerima"), // Target beneficiaries
  indikatorKeberhasilan: text("indikator_keberhasilan"), // Success indicators
  // Engagement metrics
  viewCount: integer("view_count").default(0),
  likeCount: integer("like_count").default(0),
  downloadCount: integer("download_count").default(0), // Document downloads
  // Publishing
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  isFeatured: boolean("is_featured").default(false), // Featured innovation
});

// Forum Categories
export const forumCategoriesInDinda = dinda.table("forum_categories", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique().notNull(),
  description: text(),
  icon: varchar({ length: 50 }),
  color: varchar({ length: 7 }),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Forum Topics
export const forumTopicsInDinda = dinda.table("forum_topics", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique(),
  content: text().notNull(),
  categoryId: integer("category_id").references(() => forumCategoriesInDinda.id),
  userId: integer("user_id").references(() => usersInDinda.id),
  isPinned: boolean("is_pinned").default(false),
  isLocked: boolean("is_locked").default(false),
  viewCount: integer("view_count").default(0),
  replyCount: integer("reply_count").default(0),
  lastReplyAt: timestamp("last_reply_at", { withTimezone: true }),
  lastReplyUserId: integer("last_reply_user_id").references(() => usersInDinda.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Forum Replies
interface ForumRepliesInDindaSchema {
  id: ReturnType<typeof serial>;
  uuid: ReturnType<typeof uuid>;
  content: ReturnType<typeof text>;
  topicId: ReturnType<typeof integer>;
  userId: ReturnType<typeof integer>;
  parentId: ReturnType<typeof integer>;
  isApproved: ReturnType<typeof boolean>;
  createdAt: ReturnType<typeof timestamp>;
  updatedAt: ReturnType<typeof timestamp>;
}

export const forumRepliesInDinda = dinda.table("forum_replies", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  content: text().notNull(),
  topicId: integer("topic_id").references(() => forumTopicsInDinda.id),
  userId: integer("user_id").references(() => usersInDinda.id),
  parentId: integer("parent_id"), // Remove direct reference here
  isApproved: boolean("is_approved").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}) as unknown as { [K in keyof ForumRepliesInDindaSchema]: ForumRepliesInDindaSchema[K] & { references?: any } };

// Add the foreign key reference after declaration to avoid circular reference
forumRepliesInDinda.parentId.references?.(() => forumRepliesInDinda.id);

// Webinars
export const webinarsInDinda = dinda.table("webinars", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique(),
  description: text(),
  content: text(),
  jenis: jenisPelatihanEnum().default('webinar'),
  pembicara: jsonb(),
  tanggalMulai: timestamp("tanggal_mulai", { withTimezone: true }).notNull(),
  tanggalSelesai: timestamp("tanggal_selesai", { withTimezone: true }),
  linkWebinar: varchar("link_webinar", { length: 255 }),
  linkMateri: varchar("link_materi", { length: 255 }),
  maxPeserta: integer("max_peserta"),
  currentPeserta: integer("current_peserta").default(0),
  gambar: varchar({ length: 255 }),
  tags: text(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Webinar Registrations
export const webinarRegistrationsInDinda = dinda.table("webinar_registrations", {
  id: serial().primaryKey(),
  webinarId: integer("webinar_id").references(() => webinarsInDinda.id),
  userId: integer("user_id").references(() => usersInDinda.id),
  nama: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  telepon: varchar({ length: 20 }),
  instansi: varchar({ length: 255 }),
  jabatan: varchar({ length: 255 }),
  isAttended: boolean("is_attended").default(false),
  feedback: text(),
  rating: smallint(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Inkubasi Program
export const inkubasiProgramInDinda = dinda.table("inkubasi_program", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  kategori: kategoriEnum().notNull(),
  durasi: integer(), // dalam hari
  maxPeserta: integer("max_peserta"),
  currentPeserta: integer("current_peserta").default(0),
  persyaratan: jsonb(),
  benefit: jsonb(),
  timeline: jsonb(),
  mentor: jsonb(),
  isActive: boolean("is_active").default(true),
  tanggalMulai: timestamp("tanggal_mulai", { withTimezone: true }),
  tanggalSelesai: timestamp("tanggal_selesai", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Inkubasi Applications
export const inkubasiApplicationsInDinda = dinda.table("inkubasi_applications", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  programId: integer("program_id").references(() => inkubasiProgramInDinda.id),
  userId: integer("user_id").references(() => usersInDinda.id),
  judulIde: varchar("judul_ide", { length: 255 }).notNull(),
  deskripsiIde: text("deskripsi_ide").notNull(),
  masalahYangDipecahkan: text("masalah_yang_dipecahkan"),
  solusiYangDitawarkan: text("solusi_yang_ditawarkan"),
  targetPengguna: text("target_pengguna"),
  dampakYangDiharapkan: text("dampak_yang_diharapkan"),
  dokumenPendukung: jsonb("dokumen_pendukung"),
  status: statusEnum().default('review'),
  catatan: text(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Competition/Lomba
export const competitionsInDinda = dinda.table("competitions", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique(),
  description: text(),
  rules: text(),
  prizes: jsonb(),
  timeline: jsonb(),
  categories: jsonb(),
  criteria: jsonb(),
  registrationStart: timestamp("registration_start", { withTimezone: true }),
  registrationEnd: timestamp("registration_end", { withTimezone: true }),
  submissionEnd: timestamp("submission_end", { withTimezone: true }),
  announcementDate: timestamp("announcement_date", { withTimezone: true }),
  maxParticipants: integer("max_participants"),
  currentParticipants: integer("current_participants").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Competition Submissions
export const competitionSubmissionsInDinda = dinda.table("competition_submissions", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  competitionId: integer("competition_id").references(() => competitionsInDinda.id),
  userId: integer("user_id").references(() => usersInDinda.id),
  teamName: varchar("team_name", { length: 255 }),
  projectTitle: varchar("project_title", { length: 255 }).notNull(),
  description: text().notNull(),
  category: varchar({ length: 100 }),
  files: jsonb(),
  presentationUrl: varchar("presentation_url", { length: 255 }),
  demoUrl: varchar("demo_url", { length: 255 }),
  teamMembers: jsonb("team_members"),
  score: integer().default(0),
  ranking: integer(),
  feedback: text(),
  isWinner: boolean("is_winner").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Knowledge Base
export const knowledgeBaseInDinda = dinda.table("knowledge_base", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique(),
  content: text().notNull(),
  excerpt: text(),
  categoryId: integer("category_id").references(() => forumCategoriesInDinda.id),
  authorId: integer("author_id").references(() => usersInDinda.id),
  tags: text(),
  viewCount: integer("view_count").default(0),
  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Activity Logs
export const activityLogsInDinda = dinda.table("activity_logs", {
  id: serial().primaryKey(),
  userId: integer("user_id").references(() => usersInDinda.id),
  action: varchar({ length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 50 }),
  entityId: integer("entity_id"),
  description: text(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  metadata: jsonb(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Notifications
export const notificationsInDinda = dinda.table("notifications", {
  id: serial().primaryKey(),
  uuid: uuid().defaultRandom().unique().notNull(),
  userId: integer("user_id").references(() => usersInDinda.id),
  title: varchar({ length: 255 }).notNull(),
  message: text().notNull(),
  type: varchar({ length: 50 }).default('info'),
  entityType: varchar("entity_type", { length: 50 }),
  entityId: integer("entity_id"),
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
