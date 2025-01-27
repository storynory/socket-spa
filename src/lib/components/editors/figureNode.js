import { Node } from '@tiptap/core';

export const FigureNode = Node.create({
	name: 'figure',

	group: 'block',

	content: 'image figcaption?',

	parseHTML() {
		return [{ tag: 'figure' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['figure', HTMLAttributes, 0];
	}
});

export const FigcaptionNode = Node.create({
	name: 'figcaption',

	group: 'block',

	content: 'inline*',

	parseHTML() {
		return [{ tag: 'figcaption' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['figcaption', HTMLAttributes, 0];
	}
});
