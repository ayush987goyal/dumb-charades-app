// Number of words the actor signals for a title.
// Splits on spaces and hyphens, and ignores text in brackets: South Indian titles carry the
// original name as "Makkhi (Eega)", and only "Makkhi" is acted.
export function countWords(title: string): number {
  return title
    .replace(/\([^)]*\)/g, " ")
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean).length
}
