# B0 Reality Audit

Source of truth: `docs/arete-mainnet-product-prd.md` version 1.0, read completely before this audit.

Official Mini Apps skill: installed from the project root. The exact requested command `npx skills add nimiq/developer-center --skill mini-apps` reached an interactive agent-selection prompt and did not complete. Re-run with the CLI's documented non-interactive flag completed successfully: `npx skills add nimiq/developer-center --skill mini-apps --yes`.

## 1. Current Architecture And Versions

- Repository status: `git status --short` failed because `C:\Users\USER\Documents\ideas\nimiq-contest` is not a Git repository or inside one.
- Repository instructions: `AGENTS.md` exists at the project root and applies. It requires concise responses, sub-agent use for planning/change work, verification after changes, and `DESIGN.md` for UI work. `DESIGN.md` is not present in this workspace.
- Package manager: npm, confirmed by `package-lock.json` lockfile version 3.
- Framework/router: Next.js App Router, `next` 16.2.12.
- React: `react` 19.2.4, `react-dom` 19.2.4.
- TypeScript: `typescript` 5.x, `strict: true`, `noEmit: true`, path alias `@/*` to `./src/*`.
- Styling: Tailwind CSS v4 through `@tailwindcss/postcss`; design tokens and component classes live in `src/app/globals.css`.
- UI dependencies: `lucide-react` 1.28.0, `gsap` 3.15.0, `@gsap/react` 2.1.2, `lenis` 1.3.25. These are installed but not used in current `src` code.
- State/data libraries: none found. No React Query, SWR, Zustand, Redux, server data layer, or API client exists.
- Test tools: none configured in `package.json`; no project test files outside `node_modules`.
- Deployment config: default `next.config.ts` placeholder only; no `vercel.json`, Netlify, Wrangler, Docker, or CI config found.
- Environment handling: no `.env`, `.env.local`, `.env.example`, or `process.env` usage found.
- Fonts: `next/font/google` with Bricolage Grotesque, Inter, and IBM Plex Mono in `src/app/layout.tsx`.
- Mini App status: static web app shell only. No `@nimiq/mini-app-sdk` dependency, no provider initialization, no wallet session, no consensus check, and no open-in-Nimiq-Pay route yet.

## 2. Route And Component Inventory Mapped To PRD Experiences

| PRD experience | Existing route/component | Current reality | B0 mapping |
|---|---|---|---|
| Today | `/`, `src/app/page.tsx` | Static landing/Today shell with PRD hero copy and placeholder scoreline/record object. | Keep route as Today. Replace live-looking fields with `GET /api/challenges/today`, session state, progress, completion state, and campaign nullable data in later milestones. |
| Challenge | `/challenge`, `src/app/challenge/page.tsx` | Static disabled challenge shell. No dynamic `[challengeId]`; no form submission. | Keep existing route initially or add `/challenge/[challengeId]` in B3A. Wire to attempt start and attempt payload later. |
| Result | `/result`, `src/app/result/page.tsx` | Static pending result shell. No dynamic `[attemptId]`. | Add `/result/[attemptId]` or adapt existing route to require attempt ID by B3B. |
| Leaderboard | `/leaderboard`, `src/app/leaderboard/page.tsx` | Static empty archive state. | Keep route. Wire to `GET /api/challenges/:id/leaderboard` by B4A. |
| Progress | `/profile`, `src/app/profile/page.tsx` | Wallet-linked archive/profile shell. | Treat as PRD Progress for now. Rename/add `/progress` later only if navigation semantics require it. |
| Rewards | none; partial copy in `/result` and `/sponsor` | No player rewards route. Static reward-pending language exists in result. | Add `/rewards` by B6A. |
| Rules | none; partial static rules in `/challenge` and `/sponsor` | No versioned rules route. | Add `/rules/[challengeId]` by B2B. |
| Privacy | none | No privacy route. | Add `/privacy` by B7A. |
| Admin | none | No admin routes or APIs. | Add `/admin`, `/admin/challenges`, `/admin/campaigns`, `/admin/rewards` across B1B-B6A. |
| Open in Nimiq Pay | none | No fallback/deeplink route. | Add `/open-in-nimiq-pay` by B1A. |
| Sponsor info | `/sponsor`, `src/app/sponsor/page.tsx` | Static sponsor safeguards route not listed as a PRD route. | Keep as static support copy or fold into Rules/Rewards later; must not imply active funded sponsor unless campaign data verifies it. |

Major components in `src/components/arete-ui.tsx`:

- `SiteShell`: global header, nav, footer, skip link, and disclosure.
- `Eyebrow`: small uppercase label.
- `ButtonLink`: styled Next link button.
- `PlaceholderButton`: disabled placeholder action.
- `Card`: section wrapper.
- `Scoreline`: hardcoded score/status strip.
- `EarnedRecordObject`: hardcoded pending record card.
- `SponsorLine`: static sponsor-funded disclosure.

Layouts and forms:

- `src/app/layout.tsx`: root HTML/body, metadata, fonts.
- `src/app/challenge/page.tsx`: one disabled `fieldset` with three hardcoded `Answer pending` radio options. This is the only form-like UI.
- No API routes, route handlers, server actions, middleware/proxy, or backend code exist.

## 3. Mock And Static Data Inventory

No `Math.random`, `crypto.randomUUID`, `localStorage`, `sessionStorage`, `setTimeout`, `setInterval`, `fetch`, fixtures, sample files, or timeout-simulated confirmations were found in `src`.

### Production Mock That Must Be Removed Or Converted To Real Data

| File | Symbol/source | Data | Reason |
|---|---|---|---|
| `src/components/arete-ui.tsx` | `Scoreline` | `Arete / pending`, `Subject pending`, `Score pending`, `Time pending`, `Rank pending` | Live-looking challenge/result fields must come from server APIs or explicit empty/loading states. |
| `src/components/arete-ui.tsx` | `Scoreline` | `Arete / -`, `Score -`, `Time -`, `Rank -` | Looks like real scoreboard structure; must be API-backed when data-bearing. |
| `src/components/arete-ui.tsx` | `Scoreline` sponsor branch | `Sponsor / pending`, `Campaign pending`, `Eligibility applies` | Sponsor campaign state must be hidden or API-backed until verified funded campaign exists. |
| `src/components/arete-ui.tsx` | `EarnedRecordObject` | `Edition pending`, `Details pending`, `Record pending`, `Awaiting publication` | Record/challenge/progress shell must become real Today/progress data or honest empty state. |
| `src/components/arete-ui.tsx` | `SiteShell` footer disclosure | `Free to play · Skill only · Sponsor-funded` | Always-visible `Sponsor-funded` can imply a funded campaign. Convert to neutral global disclosure or conditional funded-campaign copy. |
| `src/components/arete-ui.tsx` | `SponsorLine` | `Sponsor-funded · eligibility applies` | Must only render for verified funded campaigns or become neutral rules copy. |
| `src/app/challenge/page.tsx` | page copy and fields | `Edition pending · Date pending`, `Subject to be published`, `Not connected`, `Answer pending` x3 | Challenge payload must come from a server-created attempt with exactly five production questions/options. |
| `src/app/result/page.tsx` | page stats | `Score: Pending`, `Rank: Pending`, `Reward: Review`, `Reward pending review` | Result, rank, and reward state must come from server result/reward APIs; review state must not appear without allocation. |
| `src/app/sponsor/page.tsx` | page sponsor status | `Sponsor-funded · eligibility applies · no paid entry`, `Scoreline state="sponsor"` | Must not imply active sponsor funding without campaign verification. |

### Legitimate Static Presentation Copy

| File | Symbol/source | Data | Reason |
|---|---|---|---|
| `src/app/page.tsx` | `Home` | `Make today count.`, `One quick daily challenge...`, `Free to play · Skill only · One ranked attempt` | PRD-required product copy. |
| `src/app/page.tsx` | `Home` | process cards `01 / Practice`, `02 / Verify`, `03 / Return` | Marketing/explanatory copy, not live data. |
| `src/app/challenge/page.tsx` | static rules list | free-to-play, five deterministic questions, accuracy-first, first verified submission | Rules summary is valid static framing until replaced by versioned rules snapshots. |
| `src/app/leaderboard/page.tsx` | empty-state copy | `No verified records yet.`, `Published records will appear only after server verification.` | Honest empty-state copy may remain, but must be rendered from real API empty state later. |
| `src/app/profile/page.tsx` | disconnected copy | `Connect to open your record.`, `No wallet is connected in this preview.` | Honest unauthenticated/disconnected state. |
| `src/app/sponsor/page.tsx` | safeguards bullets | no entry fee, no chance, sponsor cannot alter scoring, no player-level data | Legitimate policy/disclosure copy, provided it does not claim an active campaign. |
| `src/app/layout.tsx` | metadata | title and description | Static metadata. |
| `src/app/globals.css` | CSS variables/classes | colors, typography, layout classes | Brand/presentation system, not data. |

### Test-Only Fixture That May Remain

- None found in project source. Test files shown by glob are inside `node_modules` only and are irrelevant to app behavior.

### Uncertain And Requiring A Decision

| File | Source | Decision needed |
|---|---|---|
| `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` | Default create-next-app assets | Remove later if unused before submission, but they are not product data. |
| `src/app/profile/page.tsx` route name | `/profile` as progress/archive | Decide whether to preserve `/profile` or add canonical `/progress` route for PRD alignment. |
| `src/app/sponsor/page.tsx` route | sponsor safeguards page | Decide whether this remains a standalone educational page, becomes `/rules` content, or becomes `/rewards` support content. |

## 4. UI-To-Real-Data Map

| UI field/location | Future API response field | Server source |
|---|---|---|
| Today hero challenge title/context in `src/app/page.tsx` | `challenge.title`, `challenge.context`, `challenge.estimatedMinutes` from `GET /api/challenges/today` | `challenges` published active UTC row. |
| Today rules line | `challenge.rulesSummary`, `challenge.attemptPolicy` | `challenges.rules_snapshot`. |
| Today start availability | `viewer.sessionState`, `viewer.hasCompletedToday`, `challenge.status`, `attempt.existingAttemptId` | `sessions`, `attempts`, active challenge window. |
| Today Daily Mark/record object | `progress.currentStreak`, `progress.totalCompletions`, `progress.lastCompletionDate`, `dailyMark.segments` | `daily_completions` source plus `progress_projections`. |
| Today sponsor line | `campaign.status`, `campaign.sponsorName`, `campaign.rewardSummary`, `campaign.eligibilitySummary` | `campaigns` joined only when verified `funded`/published; `funding_transactions` verification evidence. |
| Challenge edition/date | `challenge.publicId`, `challenge.challengeDate`, `challenge.opensAt`, `challenge.closesAt` | `challenges`. |
| Challenge question prompt/options | `attempt.id`, `attempt.startedAt`, `questions[].id`, `questions[].prompt`, `questions[].options[]` from `POST /api/challenges/:id/attempts` or `GET /api/attempts/:id` | `attempts`, `attempt_question_order`, `attempt_option_order`, `questions`, `question_options` with no `is_correct`. |
| Challenge connection badge | `session.user.walletAddress`, `session.expiresAt`, `provider.consensusState` | `sessions`, `users`; client Nimiq provider consensus state. |
| Result score/rank/time | `attempt.score`, `attempt.currentRank`, `attempt.finalRank`, `attempt.durationMs`, `attempt.submittedAt` | `attempts`, `answers`, ranking query over finalized attempts. |
| Result reward state | `reward.status`, `reward.label`, `reward.amountLuna`, `reward.reviewReasonCode` | `reward_allocations` and verified `payout_transactions`; `not_applicable` until campaign/reward exists. |
| Leaderboard rows | `entries[].rank`, `entries[].displayName`, `entries[].truncatedWallet`, `entries[].score`, `entries[].durationMs`, `entries[].finalizedAt` | `attempts`, `users`, final rank freeze data; privacy serializer. |
| Progress/profile wallet | `user.walletAddress`, `user.displayName`, `user.createdAt` | `users` through signed session. |
| Progress history | `completions[].challengeDate`, `completions[].score`, `completions[].rank`, `completions[].rewardState` | `daily_completions`, `attempts`, optional `reward_allocations`. |
| Rewards route | `allocations[].status`, `allocations[].amountLuna`, `allocations[].txHash`, `allocations[].verifiedAt` | `reward_allocations`, `payout_transactions`. |
| Rules route | `rules.version`, `rules.snapshot`, `rules.publishedAt` | immutable `challenges.rules_snapshot` and optional campaign snapshots. |
| Admin challenge forms | draft challenge/question/option fields and validation errors | protected admin APIs writing `challenges`, `questions`, `question_options`, `audit_events`. |
| Admin campaign/funding | funding intent, transaction state, verification result | `campaigns`, `funding_transactions`, Nimiq Mainnet verification adapter. |
| Admin reward review/payout | allocation review state and payout intent | `reward_allocations`, `payout_transactions`, audit events. |

## 5. Existing API, Database, And Auth Capability

- API: none. No `src/app/**/route.ts`, `pages/api`, server actions, or middleware/proxy were found.
- Database: none. No Prisma, Drizzle, Supabase, migrations, schemas, or database client exists.
- Auth/session: none. No nonce flow, signature verification, cookie session, user table, admin allowlist, or wallet auth exists.
- Wallet/Nimiq: none in app code or dependencies. Official skill confirms future Nimiq provider access must use `init()` from `@nimiq/mini-app-sdk`; available methods include `listAccounts()`, `sign(...)`, `isConsensusEstablished()`, `getBlockNumber()`, `sendBasicTransaction(...)`, and `sendBasicTransactionWithData(...)`, with NIM values in Luna where `1 NIM = 100,000 Luna`.
- Mobile/WebView safety: current static UI is mobile-oriented with 44px button/nav targets and responsive CSS. Missing Mini App requirements include provider detection, outside-Nimiq-Pay fallback, deeplink route, safe-area review, real-device testing, consensus handling, and native approval cancellation handling.

## 6. Confirmed Production Database Decision

Confirmed decision: use Supabase Postgres as the production relational database unless the builder has an undisclosed existing production relational database outside this workspace.

Minimum reason: this repo currently has no database at all, while the PRD requires relational transactions, uniqueness constraints, migrations in source control, server-only privileged writes, and operational visibility. Supabase Postgres is the fastest suitable managed Postgres option for this Next.js app and preserves the PRD's relational trust boundary.

Auth architecture decision: use custom Nimiq signed wallet sessions, not Supabase Auth as the primary identity provider. The server should verify Nimiq signatures/nonces, store `users`, `auth_nonces`, and `sessions` in Postgres, and issue secure HTTP-only same-site cookies. Admin authorization should be a server-side normalized wallet allowlist plus a valid signed session.

## 7. Environment Variable Inventory

Existing environment variables in implementation: none found.

Existing environment files: none found. `.env.example` was not created in B0 because no environment example exists and exact implementation names are not yet present in code. Add names-only comments when B1B/B2A introduces auth/database code.

Expected future categories, with final names to be locked by the milestone that introduces them:

- Public application origin for auth-message origin binding and deeplink generation.
- Supabase/Postgres database URL for server-only database access.
- Supabase project URL and anonymous key only if a browser-safe Supabase client is intentionally used.
- Server-only Supabase service role key only if needed for privileged server operations.
- Session cookie name/secret or token hashing secret.
- Admin wallet allowlist.
- Nimiq Mainnet RPC/indexer endpoint and confirmation policy.
- Error monitoring DSN and analytics configuration after B7A.

## 8. Exact Implementation File Map For B1A Through B7B

This map preserves the existing UI shell and adds the smallest missing surfaces incrementally.

### B1A - Nimiq Pay SDK/provider foundation

- Add package: `@nimiq/mini-app-sdk` via npm.
- Create `src/lib/nimiq/client-provider.tsx` for client-only provider state using official `init()`.
- Create `src/lib/nimiq/errors.ts` for stable client error categories.
- Create `src/lib/nimiq/deeplink.ts` for open-in-Nimiq-Pay URL construction.
- Create `src/app/open-in-nimiq-pay/page.tsx`.
- Update `src/app/layout.tsx` to wrap children in the client provider if needed.
- Update `src/components/arete-ui.tsx`, `src/app/page.tsx`, `src/app/challenge/page.tsx`, and `src/app/profile/page.tsx` to show truthful provider/session UI states only.
- Add tests only after selecting a test runner in this milestone.
- Create `docs/implementation/B1A-handoff.md`.

### B1B - Signed nonce session and admin identity

- Create `src/lib/auth/message.ts`, `src/lib/auth/nonce.ts`, `src/lib/auth/session.ts`, `src/lib/auth/admin.ts`, and `src/lib/auth/cookies.ts`.
- Create `src/app/api/auth/nonce/route.ts`, `src/app/api/auth/verify/route.ts`, `src/app/api/auth/session/route.ts`, and `src/app/api/auth/logout/route.ts`.
- Create initial database/auth schema files in the B2A-selected location if B1B needs persistence immediately.
- Create `src/app/admin/page.tsx` as protected shell only.
- Update `.env.example` with names only once exact names are introduced.
- Create `docs/implementation/B1B-handoff.md`.

### B2A - Production database schema and server data layer

- Add database tooling/package selected for Supabase Postgres migrations.
- Create `src/server/db/client.ts`, `src/server/db/schema/*`, `src/server/db/migrations/*`, and `src/server/db/repositories/*` or equivalent migration layout.
- Create `src/server/challenges/repository.ts`, `src/server/challenges/serializers.ts`, `src/server/rules/snapshot.ts`, `src/server/audit/events.ts`, and `src/server/time/utc.ts`.
- Add schema for `users`, `auth_nonces`, `sessions`, `challenges`, `questions`, `question_options`, and `audit_events`.
- Add validation schemas under `src/server/validation/*` or `src/lib/validation/*`.
- Update README or docs with safe migration commands.
- Create `docs/implementation/B2A-handoff.md`.

### B2B - Admin challenge publishing and real Today API

- Create `src/app/api/admin/challenges/route.ts`, `src/app/api/admin/challenges/[id]/route.ts`, `src/app/api/admin/challenges/[id]/publish/route.ts`, and `src/app/api/admin/challenges/[id]/cancel/route.ts`.
- Create `src/app/api/challenges/today/route.ts`, `src/app/api/challenges/[id]/rules/route.ts`, and `src/app/api/challenges/[id]/answers/route.ts`.
- Create `src/app/admin/challenges/page.tsx` and supporting admin form components under `src/components/admin/*`.
- Create `src/lib/api/client.ts` or use server components/fetching pattern consistently.
- Update `src/app/page.tsx` to use real Today data and honest loading/empty/error states.
- Create explicit operator challenge-publishing procedure in docs.
- Create `docs/implementation/B2B-handoff.md`.

### B3A - Authoritative attempt start and challenge delivery

- Add migrations/schema for `attempts`, `attempt_question_order`, `attempt_option_order`, and possibly `answers`.
- Create `src/server/attempts/repository.ts`, `src/server/attempts/start.ts`, and attempt serializers.
- Create `src/app/api/challenges/[id]/attempts/route.ts` and `src/app/api/attempts/[id]/route.ts`.
- Update `src/app/challenge/page.tsx` or add `src/app/challenge/[challengeId]/page.tsx` for real attempt start/resume UI.
- Add client-only answer selection state for the active screen only.
- Create `docs/implementation/B3A-handoff.md`.

### B3B - Idempotent submission, scoring, and result

- Complete `answers` schema if not completed in B3A.
- Create `src/server/attempts/submit.ts`, `src/server/scoring/score.ts`, and `src/server/scoring/rank.ts`.
- Create `src/app/api/attempts/[id]/submit/route.ts`.
- Add `daily_completions` schema if required by finalization.
- Update `src/app/result/page.tsx` or add `src/app/result/[attemptId]/page.tsx` for verified result UI.
- Update Today completed-state data contract minimally without full share/progress.
- Create `docs/implementation/B3B-handoff.md`.

### B4A - Leaderboard, rank freeze, Daily Mark, and Progress

- Add schema for `daily_completions` and `progress_projections` if not complete.
- Create `src/server/leaderboard/repository.ts`, `src/server/progress/rebuild.ts`, and `src/server/jobs/freeze-ranks.ts`.
- Create `src/app/api/challenges/[id]/leaderboard/route.ts` and `src/app/api/me/progress/route.ts`.
- Update `src/app/leaderboard/page.tsx` with real rows/empty states.
- Add `src/app/progress/page.tsx` or adapt `src/app/profile/page.tsx` and navigation.
- Update `src/components/arete-ui.tsx` `Scoreline`/record components to accept real fields instead of internal hardcoded live-looking values.
- Create `docs/implementation/B4A-handoff.md`.

### B4B - Verified sharing and return loop

- Create `src/server/share/events.ts` and `src/app/api/share-events/route.ts`.
- Create `src/components/share/result-card.tsx` and any image/download helper needed.
- Update `src/app/result/[attemptId]/page.tsx` and Today completed state with share actions.
- Add deeplink/copy-link fallback UI using B1A deeplink helper.
- Add privacy-safe analytics payload validation.
- Create `docs/implementation/B4B-handoff.md`.

### B5A - Campaign schema, admin setup, and publication gate

- Add schema for `campaigns`, `funding_transactions`, and preliminary `reward_allocations` if needed.
- Create `src/server/campaigns/repository.ts`, `src/server/campaigns/state-machine.ts`, and public serializers.
- Create `src/app/api/admin/campaigns/route.ts` and `src/app/api/admin/campaigns/[id]/route.ts`.
- Create `src/app/admin/campaigns/page.tsx`.
- Update challenge publishing serializers/gates so reward-bearing copy requires verified `funded` campaign.
- Update `/sponsor` copy if it remains, so it is clearly educational and not an active campaign claim.
- Create `docs/implementation/B5A-handoff.md`.

### B5B - Real mainnet funding and independent verification

- Create `src/server/nimiq/transactions.ts` and `src/server/nimiq/verification.ts` for server-only Mainnet verification.
- Create `src/app/api/admin/campaigns/[id]/funding-intent/route.ts`, `src/app/api/admin/campaigns/[id]/funding-transactions/route.ts`, and `src/app/api/admin/campaigns/[id]/funding-status/route.ts`.
- Add client funding action component under `src/components/admin/funding-action.tsx` that calls official `sendBasicTransactionWithData({ recipient, value, data })` only after operator action.
- Update Today/Rules serializers to expose sponsor/reward copy only after verified funding.
- Create `docs/implementation/B5B-handoff.md`.

### B6A - Final allocation and manual review

- Complete `reward_allocations` schema/state machine.
- Create `src/server/rewards/allocation.ts`, `src/server/rewards/review.ts`, and reward serializers.
- Create `src/app/api/admin/rewards/allocate/route.ts`, `src/app/api/admin/rewards/[id]/review/route.ts`, and `src/app/api/me/rewards/route.ts`.
- Create `src/app/rewards/page.tsx` and `src/app/admin/rewards/page.tsx`.
- Update `src/app/result/[attemptId]/page.tsx` to show real reward state labels only.
- Create `docs/implementation/B6A-handoff.md`.

### B6B - Real payout flow and independent verification

- Add schema for `payout_transactions`.
- Create `src/server/rewards/payout.ts` and reuse `src/server/nimiq/verification.ts`.
- Create `src/app/api/admin/rewards/[id]/payout-intent/route.ts` and `src/app/api/admin/rewards/[id]/payout-transactions/route.ts`.
- Add operator payout action component using official Nimiq transaction method after deliberate operator action.
- Update `src/app/rewards/page.tsx` and admin rewards UI with confirming/paid/mismatch states.
- Create `docs/implementation/B6B-handoff.md`.

### B7A - Security, reliability, accessibility, observability

- Create or update `src/server/security/rate-limit.ts`, request validation, logging redaction, CSRF/origin helpers, and error contracts.
- Add error monitoring/analytics configuration behind env names only.
- Add `/privacy`, `/rules/[challengeId]` final content, and terms content if required.
- Create `docs/implementation/B7A-hardening-report.md` and `docs/qa/device-test-checklist.md`.
- Update `.env.example` with all final names/comments only.
- Audit and update CSS/components for safe-area, reduced motion, 320px, focus, labels, and screen-reader announcements.

### B7B - Production smoke test and submission package

- Update `README.md` with product, architecture, setup, migrations, Nimiq Pay testing, operator flow, and deployment notes.
- Add `LICENSE` if MIT is the confirmed release license.
- Create `docs/submission/arete-submission-copy.md`, `docs/submission/demo-script.md`, `docs/submission/evidence-checklist.md`, and `docs/submission/final-release-report.md`.
- Run final route/API/no-mock/secret inventory and record real manual evidence supplied by builder only.

## 9. Risks, Blockers, And Manual Actions

- Git blocker: workspace is not a Git repository, so uncommitted work/diff cannot be inspected or protected through Git until the builder initializes or opens the actual repo root.
- Missing design-system file: `AGENTS.md` references `DESIGN.md`, but it is absent. Current brand system is only in `src/app/globals.css` and the existing UI components.
- No database exists. Builder must create/provide Supabase project and set secrets through local/hosting environment controls, not chat.
- No Nimiq SDK is installed in app dependencies yet. B1A must add it and verify on a real Nimiq Pay device.
- No test runner exists. B1A or B1B must choose and add the lightest suitable test setup before claiming automated tests.
- No production domain is known. Auth origin locking and deeplink generation need the final domain.
- No real Nimiq Pay device test has been run. Provider, consensus, approval denial, WebView, share sheet, and deeplink behavior remain manual blockers.
- No Nimiq Mainnet RPC/indexer verification source is selected. B5B must use current official docs and not guess transaction APIs.
- No challenge content exists. Builder must write and approve real sourced five-question challenges before B2B production publication.
- No sponsor/treasury/reward policy exists. Builder must decide sponsor authorization, treasury wallet, integer Luna amount, allocations, eligibility, review timing, and confirmation policy before B5.
- Current UI contains always-visible sponsor-funded language. It must be made neutral or conditional before production with no funded campaign.
- Default public create-next-app SVGs and README remain. Clean up before submission if unused.

Manual builder actions from the PRD that still apply:

- Confirm contest Cycle I vs Cycle II target.
- Install/update Nimiq Pay on a real phone.
- Create/select separate player and operator wallets.
- Fund only a small operator amount for smoke testing.
- Never share private keys or recovery phrases.
- Confirm production hosting domain.
- Create production database/project and provide secrets only through secure environment settings.
- Prepare first real challenges with sources and explanations.
- Review legal/privacy/reward/regional language.
- Recruit real Nimiq Pay testers.

## 10. Baseline Verification Results

Commands were run before changing product code. No product code was changed in B0.

| Command | Result |
|---|---|
| `git status --short` | Failed: `fatal: not a git repository (or any of the parent directories): .git` |
| `npm run lint` | Passed. ESLint completed with no output after the script banner. |
| `npx tsc --noEmit` | Passed with no output. |
| `npm run build` | Passed. Next.js 16.2.12 compiled successfully, TypeScript completed, and static routes generated for `/`, `/_not-found`, `/challenge`, `/leaderboard`, `/profile`, `/result`, and `/sponsor`. |
| Test command | Not available. `package.json` has no `test` script and no project test runner/files were found. |

Baseline production routes from build:

- `/`
- `/_not-found`
- `/challenge`
- `/leaderboard`
- `/profile`
- `/result`
- `/sponsor`

B0 exit gate status:

- Every live-looking mock/static source in `src` is accounted for above.
- Selected data/auth architecture is explicit: Supabase Postgres plus custom Nimiq signed wallet sessions.
- All existing routes are mapped.
- Baseline lint, typecheck, test availability, and build status are known.
- B1A through B7B have a repo-specific file plan.
- No wallet auth, database migrations, challenge logic, reward flow, deployment, commit, push, or external write action was started.
