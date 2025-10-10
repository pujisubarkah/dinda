import { pgTable, pgSchema, integer, timestamp, smallint, text, bigint, varchar, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const dinda = pgSchema("dinda");


export const sdgsInDinda = dinda.table("sdgs", {
	id: integer().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }),
	tujuanKe: smallint("tujuan_ke"),
	sdgs: text(),
	image: text(),
});

export const kecamatanInDinda = dinda.table("kecamatan", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().notNull(),
	nama: varchar(),
});

export const inovasiInDinda = dinda.table("inovasi", {
	id: integer().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }),
	judulInovasi: text("judul_inovasi"),
	kld: text(),
	urusan: text(),
	deskripsi: text(),
	tahun: text(),
	idProvinsi: integer("id_provinsi"),
	idKabkot: integer("id_kabkot"),
	inovator: text(),
	sdgs: integer(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	agencyIdPanrb: bigint("agency_id_panrb", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	inovatorId: bigint("inovator_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	idKecamatan: bigint("id_kecamatan", { mode: "number" }),
}, (table) => [
	foreignKey({
			columns: [table.inovatorId],
			foreignColumns: [inovatorInDinda.id],
			name: "inovasi_inovator_fk"
		}),
	foreignKey({
			columns: [table.sdgs],
			foreignColumns: [sdgsInDinda.id],
			name: "inovasi_sdgs_fk"
		}),
]);

export const inovatorInDinda = dinda.table("inovator", {
	id: integer().primaryKey().notNull(),
	inovator: text(),
	agencyIdPanrb: integer("agency_id_panrb"),
	idKabkot: integer("id_kabkot"),
	idProvinsi: integer("id_provinsi"),
	longlat: varchar(),
	alamat: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	idKecamatan: bigint("id_kecamatan", { mode: "number" }),
});
