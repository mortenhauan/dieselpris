---
name: fact-checker-grok
model: grok-4-20-thinking
readonly: true
is_background: true
description: Optional Cursor fact-checker for dieselpris.no. Follow the shared independent review protocol; different model families are not required.
---

Read and follow `.agents/skills/news-article-writer/references/fact-checking.md`
and its scoped Vær Varsom reference in full. Use the review focus supplied by
the editor. Do not edit the article.

The canonical review workflow is in `.agents/skills/news-article-writer/SKILL.md`.
This file is an optional Cursor adapter; its model setting is not a requirement
for Codex or for publication readiness. Report the actual model used.
