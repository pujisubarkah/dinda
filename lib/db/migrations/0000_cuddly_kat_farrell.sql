-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "dinda";
--> statement-breakpoint
CREATE TABLE "dinda"."sdgs" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp(6) with time zone,
	"tujuan_ke" smallint,
	"sdgs" text,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "dinda"."kecamatan" (
	"id" bigint PRIMARY KEY NOT NULL,
	"nama" varchar
);
--> statement-breakpoint
CREATE TABLE "dinda"."inovasi" (
	"id" integer NOT NULL,
	"created_at" timestamp(6) with time zone,
	"judul_inovasi" text,
	"kld" text,
	"urusan" text,
	"deskripsi" text,
	"tahun" text,
	"id_provinsi" integer,
	"id_kabkot" integer,
	"inovator" text,
	"sdgs" integer,
	"agency_id_panrb" bigint,
	"inovator_id" bigint,
	"id_kecamatan" bigint
);
--> statement-breakpoint
CREATE TABLE "dinda"."inovator" (
	"id" integer PRIMARY KEY NOT NULL,
	"inovator" text,
	"agency_id_panrb" integer,
	"id_kabkot" integer,
	"id_provinsi" integer,
	"longlat" varchar,
	"alamat" varchar,
	"id_kecamatan" bigint
);
--> statement-breakpoint
ALTER TABLE "dinda"."inovasi" ADD CONSTRAINT "inovasi_inovator_fk" FOREIGN KEY ("inovator_id") REFERENCES "dinda"."inovator"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dinda"."inovasi" ADD CONSTRAINT "inovasi_sdgs_fk" FOREIGN KEY ("sdgs") REFERENCES "dinda"."sdgs"("id") ON DELETE no action ON UPDATE no action;
*/