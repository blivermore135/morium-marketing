import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// The blog. Empty on purpose until the first real post (see src/content/blog/README.md.txt and BLOG-OUTLINES.md).
const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string().min(10),
		description: z.string().min(50).max(170),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		author: z.string().default("Brock Livermore"),
	}),
});

export const collections = { blog };
