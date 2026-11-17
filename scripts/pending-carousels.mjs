import fs from 'fs'

const singles = JSON.parse(
  fs.readFileSync('_media_extract/instagram/single-slide-posts.json', 'utf8'),
)
const profile = JSON.parse(
  fs.readFileSync('_media_extract/instagram/profile-posts.json', 'utf8'),
)

// Restore original shortcodes (case-sensitive) from profile list
const map = new Map(profile.map((p) => [p.toLowerCase(), p]))
const pending = singles
  .map((s) => map.get(s) || s)
  .filter((p) => p.length <= 15)

// Prioritize recent (D*) then older
pending.sort((a, b) => {
  const sa = a.startsWith('D') || a.startsWith('d') ? 0 : 1
  const sb = b.startsWith('D') || b.startsWith('d') ? 0 : 1
  return sa - sb
})

fs.writeFileSync(
  '_media_extract/instagram/pending-carousels.json',
  JSON.stringify(pending, null, 2),
)
console.log('pending', pending.length)
console.log(pending.slice(0, 30).join('\n'))
