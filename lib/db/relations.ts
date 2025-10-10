import { relations } from "drizzle-orm/relations";
import { inovatorInDinda, inovasiInDinda, sdgsInDinda } from "./schema";

export const inovasiInDindaRelations = relations(inovasiInDinda, ({one}) => ({
	inovatorInDinda: one(inovatorInDinda, {
		fields: [inovasiInDinda.inovatorId],
		references: [inovatorInDinda.id]
	}),
	sdgsInDinda: one(sdgsInDinda, {
		fields: [inovasiInDinda.sdgs],
		references: [sdgsInDinda.id]
	}),
}));

export const inovatorInDindaRelations = relations(inovatorInDinda, ({many}) => ({
	inovasiInDindas: many(inovasiInDinda),
}));

export const sdgsInDindaRelations = relations(sdgsInDinda, ({many}) => ({
	inovasiInDindas: many(inovasiInDinda),
}));