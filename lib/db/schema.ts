
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
export const tahapEnum = pgEnum('tahap', ['Tahap Persiapan', 'Tahap Pelaksanaan', 'Tahap Monitoring dan Evaluasi']);
export const statusEnum = pgEnum('status', ['draft', 'review', 'approved', 'rejected', 'published']);
export const kategoriEnum = pgEnum('kategori', ['teknologi', 'digital', 'lingkungan', 'infrastruktur', 'pelayanan_publik', 'ekonomi']);
export const roleEnum = pgEnum('role', ['admin', 'user', 'moderator', 'inovator']);
export const jenisPelatihanEnum = pgEnum('jenis_pelatihan', ['webinar', 'workshop', 'seminar', 'training']);

// Users & Authentication
export const usersInDinda = dinda.table("users", {
  id: serial().primaryKey(),
  username: varchar({ length: 100 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }),
  nip: varchar({ length: 30 }),
  role: varchar({ length: 50 }).default('user').notNull(),
  phone: varchar({ length: 20 }),
  opd: varchar({ length: 255 }),
  position: varchar({ length: 255 }),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Videos
export const videosInDinda = dinda.table("videos", {
  id: serial().primaryKey(),
  title: varchar({ length: 500 }).notNull(),
  description: text(),
  youtubeId: varchar("youtube_id", { length: 50 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  category: varchar({ length: 100 }),
  categoryLabel: varchar("category_label", { length: 100 }),
  date: timestamp({ mode: 'date' }),
  views: integer().default(0),
  duration: varchar({ length: 20 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// OPD (Organisasi Perangkat Daerah)
export const opdInDinda = dinda.table("master_opd", {
  id: serial().primaryKey(),
  namaOpd: varchar("nama_opd", { length: 255 }).notNull(),
  kepalaDinas: varchar("kepala_dinas", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// SDGs
export const sdgsInDinda = dinda.table("sdgs", {
  id: integer().primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }),
  tujuanKe: smallint("tujuan_ke"),
  sdgs: text(),
  image: text(),
});

// Kecamatan
export const kecamatanInDinda = dinda.table("kecamatan", {
  id: bigint({ mode: "number" }).primaryKey().notNull(),
  nama: varchar({ length: 255 }).notNull(),
  svgPath: text("svg_path"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Inovator
export const inovatorInDinda = dinda.table("inovator", {
  id: integer("id").primaryKey().notNull(),
  inovator: text("inovator"),
  agencyIdPanrb: integer("agency_id_panrb"),
  idKabkot: integer("id_kabkot"),
  idProvinsi: integer("id_provinsi"),
  longlat: varchar("longlat", { length: 255 }),
  alamat: varchar("alamat", { length: 255 }),
  idKecamatan: bigint("id_kecamatan", { mode: "number" }),
});

// Inovasi
export const inovasiInDinda = dinda.table("inovasi", {
  id: integer("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }),
  judulInovasi: text("judul_inovasi"),
  kld: text("kld"),
  urusan: text("urusan"),
  deskripsi: text("deskripsi"),
  tahun: text("tahun"),
  idProvinsi: integer("id_provinsi"),
  idKabkot: integer("id_kabkot"),
  inovator: text("inovator"),
  sdgs: integer("sdgs"),
  agencyIdPanrb: bigint("agency_id_panrb", { mode: "number" }),
  inovatorId: bigint("inovator_id", { mode: "number" }),
  idKecamatan: bigint("id_kecamatan", { mode: "number" }),
  thumbUrl: varchar("thumb_url", { length: 255 }),
  videoUrl: varchar("video_url", { length: 255 }),
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

// Chat Messages
export const chatMessagesInDinda = dinda.table("chat_messages", {
  id: serial().primaryKey(),
  room: varchar("room", { length: 100 }).default('global').notNull(),
  userId: integer("user_id").references(() => usersInDinda.id),
  message: text("message").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Ide Inovasi (Innovation Ideas)
export const ideInovasiInDinda = dinda.table("ide_inovasi", {
  id: serial().primaryKey(),
  latarBelakang: text("latar_belakang"),
  ideInovasi: text("ide_inovasi"),
  stakeholderInovasi: text("stakeholder_inovasi"),
  sumberDaya: text("sumber_daya"),
  penerimaManfaat: text("penerima_manfaat"),
  deskripsiSingkat: text("deskripsi_singkat"),
  keterangan: text(),
  kebaruan: text(),
  createdBy: integer("created_by").references(() => usersInDinda.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
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

// Ide Inovasi Comments
export const ideInovasiCommentsInDinda = dinda.table("ide_inovasi_comments", {
  id: serial().primaryKey(),
  ideInovasiId: integer("ide_inovasi_id").references(() => ideInovasiInDinda.id).notNull(),
  userId: integer("user_id").references(() => usersInDinda.id).notNull(),
  parentId: integer("parent_id"),
  content: text().notNull(),
  isApproved: boolean("is_approved").default(false),
  likeCount: integer("like_count").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Rencana Aksi
export const rencanaAksiInDinda = dinda.table("rencana_aksi", {
  id: serial().primaryKey(),
  ideInovasiId: integer("ide_inovasi_id").notNull(),
  judulAksi: varchar("judul_aksi", { length: 255 }).notNull(),
  deskripsiAksi: text("deskripsi_aksi"),
  jenisPeriode: varchar("jenis_periode", { length: 50 }),
  periodeMulai: timestamp("periode_mulai", { mode: 'date' }),
  periodeSelesai: timestamp("periode_selesai", { mode: 'date' }),
  targetCapaian: text("target_capaian"),
  indikatorKeberhasilan: text("indikator_keberhasilan"),
  picPelaksana: varchar("pic_pelaksana", { length: 255 }),
  anggaran: bigint("anggaran", { mode: "number" }),
  tahap: varchar("tahap", { length: 50 }),
  progressPercentage: integer("progress_percentage"),
  catatanPelaksanaan: text("catatan_pelaksanaan"),
  hambatan: text("hambatan"),
  solusi: text("solusi"),
  createdBy: integer("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Forum Posts
export const forumPostsInDinda = dinda.table("forum_posts", {
  id: serial().primaryKey(),
  threadId: integer("thread_id").notNull(),
  userId: integer("user_id").references(() => usersInDinda.id).notNull(),
  parentId: integer("parent_id"),
  content: text().notNull(),
  isApproved: boolean("is_approved").default(false),
  likeCount: integer("like_count").default(0),
  attachments: jsonb("attachments"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Forum Threads
export const forumThreadsInDinda = dinda.table("forum_threads", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique().notNull(),
  content: text().notNull(),
  categoryId: integer("category_id").notNull(),
  userId: integer("user_id").references(() => usersInDinda.id).notNull(),
  isPinned: boolean("is_pinned").default(false),
  isLocked: boolean("is_locked").default(false),
  isApproved: boolean("is_approved").default(false),
  viewCount: integer("view_count").default(0),
  replyCount: integer("reply_count").default(0),
  likeCount: integer("like_count").default(0),
  lastReplyAt: timestamp("last_reply_at", { withTimezone: true }),
  lastReplyBy: integer("last_reply_by"),
  tags: text(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Forum Questions (Pertanyaan)
export const forumQuestionsInDinda = dinda.table("forum_questions", {
  id: serial().primaryKey(),
  userId: integer("user_id").references(() => usersInDinda.id),
  nama: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  noTelepon: varchar("no_telepon", { length: 50 }),
  judul: varchar({ length: 255 }).notNull(),
  kategori: varchar({ length: 100 }),
  prioritas: varchar({ length: 50 }),
  deskripsi: text().notNull(),
  tipe: varchar({ length: 50 }),
  status: varchar({ length: 50 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Webinar Events
export const webinarEventsInDinda = dinda.table("webinar_events", {
  id: serial().primaryKey(),
  kodeEvent: varchar("kode_event", { length: 50 }),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  imageUrl: varchar("image_url", { length: 500 }),
  category: varchar({ length: 100 }),
  dateStart: timestamp("date_start", { withTimezone: true }),
  dateEnd: timestamp("date_end", { withTimezone: true }),
  durationHours: integer("duration_hours"),
  platform: varchar({ length: 100 }),
  meetingLink: varchar("meeting_link", { length: 500 }),
  speaker: varchar({ length: 255 }),
  organizer: varchar({ length: 255 }),
  status: varchar({ length: 50 }),
  totalParticipants: integer("total_participants").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

