# Maintenance

- Keep this delivery private unless the owner explicitly requests a change of audience.
- Canonical research and platform text: lib/content.ts and lib/platforms.ts. Shared skill workflow: skills/workflow.md. Generator: scripts/generate-content.mjs.
- After content or skill adapter changes, regenerate skills and embedded ZIPs, then rebuild the standalone HTML. See README.md.
- Do not add paid Gartner PDFs, extracted full text, proprietary figures, credentials or real enterprise inventory to the repository or releases.
- Keep source claims, engineering derivations, hypotheses and validation results distinct. Preserve documented G00830315 inconsistencies.
- Validate with typecheck, authored-source lint, unit tests and scripts/verify-delivery.mjs. Do not claim platform or browser tests were run unless actually executed.
- The intended output is dist/index.html as a self-contained offline file, not a publicly hosted server.
