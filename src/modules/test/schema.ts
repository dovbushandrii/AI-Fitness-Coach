import { z } from 'zod';

export const testSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),

	// ID of the user who created the gift
	createdBy: z.string(),

	// Santa has rights to deliver the gift
	delivered: z.boolean()
});

export type TestEntity = z.infer<typeof testSchema>;
