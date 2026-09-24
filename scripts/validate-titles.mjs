// Checks the movie lists in lib/movies for duplicates and formatting problems.
// Usage: npm run validate:titles   (Node >= 22.18, which runs .ts imports natively)
// Exits 1 on errors. Warnings never fail the run.
import { readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const DIR = process.env.TITLES_DIR ?? join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "movies")

// Titles allowed in more than one category: the same film on purpose, or two different films
// that share a name. Keys are normalised (see norm below). Keep this list short.
const CROSS_CATEGORY_ALLOW = new Set([
  // e.g. "sarkar", if the Hindi (2005) and Tamil (2018) films were both listed
])

const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents: Amélie -> Amelie
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()

// Edit distance, capped: returns 3 for anything further than 2 edits apart.
function lev(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 3
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    prev = cur
  }
  return prev[b.length]
}

const errors = []
const warnings = []
const seenGlobal = new Map() // key -> [{ file, title }]

const files = readdirSync(DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts")
for (const file of files) {
  const mod = await import(pathToFileURL(join(DIR, file)).href)
  const lists = Object.values(mod).filter(Array.isArray)
  if (lists.length !== 1) {
    errors.push(`${file}: expected exactly one exported array`)
    continue
  }
  const seen = new Map()
  lists[0].forEach((t, i) => {
    const where = `${file}[${i}] "${t}"`
    if (typeof t !== "string" || t.trim() === "") return errors.push(`${where}: empty or non-string`)
    if (t !== t.trim()) errors.push(`${where}: leading/trailing whitespace`)
    if (/\s{2,}/.test(t)) errors.push(`${where}: double space`)
    if (/[^\x20-\x7E]/.test(t)) errors.push(`${where}: non-ASCII character (use plain ASCII spelling)`)
    // Same rule as lib/word-count.ts: bracketed original titles are not counted.
    const words = t.replace(/\([^)]*\)/g, " ").trim().split(/[\s-]+/).filter(Boolean).length
    if (words > 8) warnings.push(`${where}: ${words} words, consider the common short title`)
    const k = norm(t)
    if (seen.has(k)) errors.push(`${where}: duplicate of "${seen.get(k)}" in same file`)
    else seen.set(k, t)
    if (!seenGlobal.has(k)) seenGlobal.set(k, [])
    seenGlobal.get(k).push({ file, title: t })
  })
}

for (const [k, hits] of seenGlobal) {
  const fileSet = new Set(hits.map((h) => h.file))
  if (fileSet.size > 1 && !CROSS_CATEGORY_ALLOW.has(k))
    errors.push(`cross-category duplicate "${k}": ${[...fileSet].join(", ")}`)
}

// Near-duplicates (typos, alternate spellings). Warning only. Skips pairs that differ only by digits (sequels).
const keys = [...seenGlobal.keys()].filter((k) => k.length >= 8)
for (let i = 0; i < keys.length; i++)
  for (let j = i + 1; j < keys.length; j++) {
    const a = keys[i]
    const b = keys[j]
    if (a.replace(/\d/g, "") === b.replace(/\d/g, "")) continue
    if (lev(a, b) <= 2) warnings.push(`near-duplicate: "${a}" ~ "${b}"`)
  }

warnings.forEach((w) => console.warn("WARN ", w))
errors.forEach((e) => console.error("ERROR", e))
console.log(`\n${files.length} files, ${seenGlobal.size} unique titles, ${errors.length} errors, ${warnings.length} warnings`)
process.exit(errors.length ? 1 : 0)
