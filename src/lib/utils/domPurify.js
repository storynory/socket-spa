import DOMPurify from 'dompurify';
// nb there is an isomorphic version we might use later if we go server side
/**
 * Cleans the provided HTML string by sanitizing it and applying specific rules.
 * @param {string} dirtyHtml - The HTML string to sanitize.
 * @returns {string} - The sanitized and cleaned HTML string.
 */
const cleanHtml = (dirtyHtml) => {
	// Check if running in a browser or Node.js environment
	const windowOrJSDOM = typeof window !== 'undefined' ? window : global;

	// Initialize DOMPurify
	const purifier = DOMPurify(windowOrJSDOM);

	// Sanitize the input HTML and explicitly return a string
	const sanitizedHtml = purifier.sanitize(dirtyHtml, {
		ALLOWED_TAGS: [
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6', // Headings
			'ul',
			'ol',
			'li', // Lists
			'img',
			'table',
			'thead',
			'tbody',
			'tr',
			'td',
			'th', // Tables & Images
			'strong',
			'em',
			'u',
			's',
			'blockquote',
			'pre', // Formatting
			'p',
			'a',
			'br', // Basic tags
			'figure',
			'figcaption'
		],
		ALLOWED_ATTR: [
			'href',
			'name',
			'target',
			'rel', // Link attributes
			'src',
			'alt',
			'width',
			'height',
			'title',
			'loading', // Image attributes
			'border', // Table attributes
			'class',
			'style' // General attributes
		],
		ALLOWED_URI_REGEXP: /^(https?|mailto|ftp):/i, // Allow only safe URL schemes
		RETURN_DOM: false // Ensure the return is a string
	});

	// Step 1: Remove empty paragraphs (with only <br> or whitespace/newlines)
	let cleanedHtml = sanitizedHtml.replace(/<p>(\s|<br\s*\/?>)*<\/p>/g, '');

	// Step 2: Remove <p> tags inside <li> and keep their inner content
	cleanedHtml = cleanedHtml.replace(/<li>\s*<p>(.*?)<\/p>\s*<\/li>/g, '<li>$1</li>');

	return cleanedHtml;
};

export { cleanHtml };
