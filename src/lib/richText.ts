// Turns the small bit of markup used in the Help Center text into safe HTML.
//   **bold**   becomes <strong>
//   [label](/help/x) or [label](https://...) becomes a link (outside links open in a new tab)
// Everything else is escaped first, so nothing typed in the data files can add a tag.
const escapeHtml = (s: string) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function richText(text: string): string {
	return escapeHtml(text)
		.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>')
		.replace(/\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g, (_m, label: string, href: string) =>
			href.startsWith("/")
				? `<a href="${href}" class="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">${label}</a>`
				: `<a href="${href}" target="_blank" rel="noopener" class="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">${label}</a>`
		);
}
