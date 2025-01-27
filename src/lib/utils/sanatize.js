import sanitizeHtml from 'sanitize-html';
// this thorws some messages if used in browser but should be good on server side
/**
 * Cleans the provided HTML string by sanitizing it and applying specific rules.
 * @param {string} dirtyHtml - The HTML string to sanitize.
 * @returns {string} - The sanitized and cleaned HTML string.
 */
const cleanHtml = (dirtyHtml) => {
	const sanitizedHtml = sanitizeHtml(dirtyHtml, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat([
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6', // Headings
			'ul',
			'ol',
			'li', // Lists (unordered and ordered)
			'img',
			'table',
			'thead',
			'tbody',
			'tr',
			'td',
			'th', // Images & Tables
			'strong',
			'em',
			'u',
			's',
			'blockquote',
			'pre' // Formatting tags
		]),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			a: ['href', 'name', 'target', 'rel'], // Links
			img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'], // Images
			table: ['border'] // Optional table attributes
		},
		allowedSchemes: ['http', 'https', 'mailto', 'ftp'], // Allow only safe URL schemes
		selfClosing: ['img', 'br', 'hr'], // Self-closing tags
		allowedSchemesAppliedToAttributes: ['href', 'src'], // Ensure only safe URLs in href and src
		allowProtocolRelative: true // Allow protocol-relative URLs (e.g., //example.com)
	});

	// Step 1: Remove empty paragraphs (with only <br> or whitespace/newlines)
	let cleanedHtml = sanitizedHtml.replace(/<p>(\s|<br\s*\/?>)*<\/p>/g, '');

	// Step 2: Remove <p> tags inside <li> and keep their inner content
	cleanedHtml = cleanedHtml.replace(/<li>\s*<p>(.*?)<\/p>\s*<\/li>/g, '<li>$1</li>');

	return cleanedHtml;
};

export { cleanHtml };
