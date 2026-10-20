type Term = { id: string; name: string };
const tags = Object.values(import.meta.glob<Term>('../data/tags/*.json', { eager: true, import: 'default' }));
const categories = Object.values(import.meta.glob<Term>('../data/categories/*.json', { eager: true, import: 'default' }));
export function tagName(id: string): string | undefined { return tags.find(term => term.id === id)?.name; }
export function categoryName(id: string | null): string { return categories.find(term => term.id === id)?.name || '未分类'; }
