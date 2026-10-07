// Pages that are built and ready but not on the live site yet. They are left out of the build (so they are not
// served, not linked, and not in the sitemap) until the owner says to publish them. The compare pages were approved
// and published on 2026-10-07. Still waiting:
//
//   about    /about. Waiting for the founder story and photos.
//
// To publish one, change its value to true. To look at them locally before then, build with
// PUBLIC_SHOW_DRAFTS=1 (for example: PUBLIC_SHOW_DRAFTS=1 npm run dev).
const showDrafts = import.meta.env.PUBLIC_SHOW_DRAFTS === "1";

export const published = {
	compare: true,
	about: showDrafts || false,
};
