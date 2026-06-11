# molhemat.org — Molecular Hematology Research Group

Website of the Molecular Hematology Research Group (Prof. Nikhil Patkar) at ACTREC, Tata Memorial Centre, Mumbai. Hosted on GitHub Pages at [molhemat.org](https://molhemat.org/).

## ✏️ Editing the website (no coding needed)

Open **[molhemat.org/admin.html](https://molhemat.org/admin.html)** — the built-in **Site Manager** lets you:

- **Team** — add / edit / remove / reorder members, upload their photos and CVs, rename or add sections (e.g. an *Alumni* section).
- **Publications** — add articles with a cover image and a PubMed/journal link or an uploaded PDF.
- **Tools & Links** — manage the research tools and the *Useful Links* list.
- **Lab Photos** — upload photos to the Social page gallery, with captions and dates.

Edit as much as you like, then press **Publish changes** — everything is committed to this repository and the live site updates within a minute or two.

### One-time setup: GitHub access token

1. Sign in to GitHub with an account that has write access to this repository.
2. Go to [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new).
3. Name it (e.g. `molhemat site manager`) and pick a long expiry.
4. **Repository access** → *Only select repositories* → `patkarlab/molhemat.github.io`.
5. **Permissions → Repository permissions → Contents** → *Read and write*.
6. Generate the token and paste it into the Site Manager login. Tick *Remember on this device* so you only do this once per computer.

The token is stored only in your browser and talks directly to GitHub.

## How the site is structured

| Path | Purpose |
|---|---|
| `index.html`, `team.html`, `research.html`, `publications.html`, `tools.html`, `social.html` | Public pages |
| `admin.html` | Site Manager (content editing GUI) |
| `data/*.json` | All editable content (team, publications, tools/links, social photos) |
| `photos/` | Images: `teams/`, `publications/`, `highlighted_papers/`, `invited_reviews/`, `social/` |
| `assets/css/site.css`, `assets/js/` | Shared design system, navigation and background animation |
| `easysurv.html`, `oncoplot.html`, `gene_coordinate_extractor.html` | Standalone research tools |

The public pages render their content from the JSON files in `data/`, which is what the Site Manager edits. You can also edit those JSON files by hand if you prefer.
