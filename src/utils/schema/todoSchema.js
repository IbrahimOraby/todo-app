import { z } from "zod";

const todoSchema = z.object({
	taskName: z.string().min(3).max(20),
	description: z.string().optional()
});

export default todoSchema;
