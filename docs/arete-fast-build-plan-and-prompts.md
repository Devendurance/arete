# Arete Fast Build Plan and Implementation Prompts

**Product:** Arete  
**Target:** Nimiq Mini Apps Competition Cycle II  
**Production network:** Nimiq Mainnet  
**Source of truth:** `arete-mainnet-product-prd.md`  
**Working rule:** Real data and real product states only. Test fixtures may exist inside automated tests, but production code must contain no demo fallback, fabricated result, mock transaction, or hardcoded live-looking record.

---

## 1. The build strategy

Arete should be built as one vertical trust chain:

1. A real Nimiq Pay wallet proves who is using the app.
2. A real database supplies the published daily challenge.
3. The server creates and scores one ranked attempt.
4. Verified completions produce rank, progress, and the Daily Mark.
5. A sponsor campaign becomes visible only after real NIM funding is independently verified.
6. An allocation becomes `paid` only after review and independent verification of the real payout transaction.

Do not build the financial layer before the challenge loop is trustworthy. Do not rebuild the existing UI shell unless the audit proves a specific part blocks the Mini App SDK or the required product states.

### Recommended speed stack

Preserve the current application framework and deployment setup where possible. If the existing repo has no production database, use managed Supabase Postgres for speed, migrations, relational constraints, and operational visibility. Keep privileged database access server-only.

The B0 audit has final authority over exact packages and commands. Later prompts must follow the discovered stack rather than forcing a second architecture into the repo.

### Non-negotiable boundaries

- Never ask for, store, log, or paste a recovery phrase or private key.
- Nimiq Pay performs user and operator transaction approval.
- Production uses Nimiq Mainnet only.
- Store NIM amounts as integer Luna: `1 NIM = 100,000 Luna`.
- Correct answers, score calculation, rank, streak, eligibility, and payment state are server-authoritative.
- A normal browser gets an open-in-Nimiq-Pay experience, never a demo identity.
- Reward copy stays absent until campaign funding is verified.
- Client success or a submitted transaction hash alone never means `funded` or `paid`.
- Admin authorization is enforced server-side, not by hidden navigation.
- Do not begin the next prompt until the current prompt's exit gate passes.

---

## 2. Fast execution plan

This is an intensive sequence, not a promise that every milestone takes exactly one day. Mainnet testing and mobile WebView debugging can create real-world delays.

| Order | Prompt | Outcome | Depends on | Suggested focused time |
|---|---|---|---|---|
| 0 | B0 | Reality audit and locked implementation map | Existing repo + PRD | Half day |
| 1 | B1A | Nimiq Pay SDK/provider foundation | B0 | Half day |
| 2 | B1B | Signed nonce session and admin identity | B1A | 1 day |
| 3 | B2A | Production database schema and server data layer | B1B | 1 day |
| 4 | B2B | Admin challenge publishing and real Today API | B2A | 1 day |
| 5 | B3A | Authoritative attempt start and challenge delivery | B2B | Half to 1 day |
| 6 | B3B | Idempotent submission, scoring, and result | B3A | 1 day |
| 7 | B4A | Leaderboard, rank freeze, Daily Mark, progress | B3B | 1 day |
| 8 | B4B | Verified result sharing and return loop | B4A | Half day |
| 9 | B5A | Campaign schema, admin setup, publication gate | B4B | Half to 1 day |
| 10 | B5B | Real mainnet funding and independent verification | B5A | 1 day |
| 11 | B6A | Final allocation and manual review | B5B | 1 day |
| 12 | B6B | Real payout flow and independent verification | B6A | 1 day |
| 13 | B7A | Security, reliability, accessibility, observability | B6B | 1 day |
| 14 | B7B | Production smoke test and submission package | B7A | 1 day |

### Critical path

`B0 → B1A → B1B → B2A → B2B → B3A → B3B → B4A → B4B`

This produces the complete daily habit loop. It should be deployed and tested by real Nimiq Pay users before reward work begins.

Then:

`B5A → B5B → B6A → B6B → B7A → B7B`

### Human actions that should happen alongside the build

These aren't coding-agent tasks:

- Create/select a normal player wallet and a separate operator wallet in Nimiq Pay.
- Put only a small, acceptable amount of real NIM in the operator wallet.
- Create the production database project and hosting project when B0 confirms the stack.
- Confirm the final production domain before auth origin locking.
- Prepare seven sourced five-question challenges.
- Secure written sponsor authorization before displaying a real sponsor.
- Decide the first campaign's amount, allocations, eligibility, countries/ages, and review timing before B5.
- Recruit at least 20 real Nimiq Pay testers, with five asked to return the next day.

---

## 3. How to use the prompts

1. Put `arete-mainnet-product-prd.md` in the project root.
2. Run one prompt at a time from the actual project directory.
3. Give the agent the previous milestone's completion report when starting a new session.
4. If a prompt uncovers a blocker, fix the blocker within that milestone. Do not let the agent silently substitute mock data.
5. Keep commits milestone-scoped. Commit only after the milestone gate passes.
6. Never paste secrets into a prompt. Add secret values through local/hosting environment controls yourself.

Every implementation prompt ends with the same discipline:

- inspect before editing;
- preserve the UI shell and unrelated work;
- implement only the named scope;
- run the real repo commands;
- report evidence;
- stop before the next milestone.

---

## 4. Prompt pack

## Prompt B0 — Reality Audit and Scope Lock

```text
You are working inside the existing Arete repository.

Read `arete-mainnet-product-prd.md` completely before taking any action. It is the product source of truth. Arete already has a full UI shell. Your task is B0 only: audit reality, lock the implementation map, and prepare the repo for safe incremental work. Do not implement wallet auth, database migrations, challenge logic, or reward flows yet.

First install the official Nimiq Mini Apps skill from the project root:

`npx skills add nimiq/developer-center --skill mini-apps`

Read the installed Mini Apps skill and its directly relevant references completely. If installation fails, report the exact failure and continue the read-only audit without inventing SDK behavior.

Inspect before editing:
- repository status and any uncommitted work;
- package manager, framework, router, TypeScript setup, styling system, state/data libraries, test tools, deployment config, and existing environment handling;
- all routes, layouts, major components, forms, and existing API/server code;
- every source of mock, sample, fixture, fallback, hardcoded, random, timeout-simulated, local-storage, or static live-looking product data;
- existing wallet/Nimiq code and dependencies;
- existing database/auth integration, if any;
- exact lint, typecheck, test, and production-build commands;
- whether the application is mobile/WebView-safe;
- whether an `AGENTS.md` or equivalent repository instruction file exists and applies.

Run the current verification commands before changing product code. Do not “fix” unrelated pre-existing problems in B0.

Create `docs/implementation/B0-reality-audit.md` containing:
1. Current architecture and versions.
2. Route/component inventory mapped to the PRD experiences: Today, Challenge, Result, Leaderboard, Progress, Rewards, Rules, Privacy, and Admin.
3. A mock/static-data inventory with exact file paths and symbols. Classify each item as:
   - production mock that must be removed;
   - legitimate static presentation copy;
   - test-only fixture that may remain;
   - uncertain and requiring a decision.
4. A UI-to-real-data map. For each live-looking field, name its future API response field and server source.
5. Existing API/database/auth capability.
6. Confirmed production database decision. Prefer the existing relational database if suitable; otherwise recommend Supabase Postgres for speed and explain the minimum reason.
7. Environment-variable inventory with names and purpose only, never values.
8. Exact implementation file map for B1A through B7B, adapted to this repo.
9. Risks/blockers and manual actions required from the builder.
10. Baseline verification results.

Also create or update `.env.example` with variable names and safe comments only if an environment example already exists or the required names are now certain. Do not add secrets or fake production values.

Constraints:
- Preserve the existing UI and brand system.
- Do not perform a broad rewrite.
- Do not delete mocks yet; identify them precisely.
- Do not add a demo mode.
- Do not guess Nimiq SDK methods where the installed official skill can answer.
- Do not make deployment, git commit, push, or external write actions.

Exit gate:
- every live-looking mock source is accounted for;
- the selected data/auth architecture is explicit;
- all existing routes are mapped;
- baseline lint/type/test/build status is known;
- the next milestone has an exact, repo-specific file plan.

Return a concise completion report with:
- audit file created;
- important findings;
- exact baseline command results;
- blockers/manual actions;
- files changed;
- confirmation that no product integration was started.

Stop after B0. Do not begin B1A.
```

## Prompt B1A — Nimiq Pay SDK and Provider Foundation

```text
Implement Arete milestone B1A only: the Nimiq Pay SDK/provider foundation.

Read completely:
- `arete-mainnet-product-prd.md`;
- `docs/implementation/B0-reality-audit.md`;
- the installed official Nimiq Mini Apps skill and only the references relevant to provider initialization, Nimiq accounts, consensus, errors, mobile/WebView use, and deeplinks.

Inspect the current git diff and preserve unrelated user work. Follow the existing framework and file plan from B0.

Implement:
1. Install `@nimiq/mini-app-sdk` using the repo’s package manager if it is not already installed.
2. Add one client-only Nimiq adapter/provider boundary using the official SDK `init()` pattern. Do not access an injected global directly when the SDK provides the supported path.
3. Model explicit states:
   - initializing;
   - ready;
   - not inside Nimiq Pay;
   - consensus unavailable;
   - permission denied;
   - provider failure.
4. Add a consensus check using the official provider method before wallet-sensitive actions.
5. Add intentional account authorization using `listAccounts()` only after the user presses the existing connect/continue CTA.
6. Preserve the selected address in in-memory client state only for now. Do not treat it as an authenticated server session yet.
7. Wire the existing UI shell to truthful connected, disconnected, denied, initializing, unavailable, and outside-Nimiq-Pay states.
8. Implement the existing `/open-in-nimiq-pay` experience or its B0-mapped equivalent with a production-origin-aware Nimiq Pay deeplink. A normal browser must never receive a demo wallet or bypass.
9. Add a typed error-normalization layer with stable client categories; do not leak raw provider payloads to users or logs.
10. Add focused tests for adapter state transitions and permission denial using test doubles only inside tests.

Do not implement:
- nonce/signature server auth;
- database user records;
- attempt start;
- campaign funding;
- any fake account, balance, score, challenge, or transaction.

Requirements covered: NIM-001, NIM-002, NIM-003, NIM-004, NIM-006.

Verification:
- run the repo’s typecheck, lint, relevant tests, and production build;
- search production source for newly introduced demo/fake wallet fallbacks;
- if the SDK cannot initialize in desktop development, show the honest outside-Nimiq-Pay state and document how to verify on a real device.

Update `docs/implementation/B1A-handoff.md` with architecture, state model, files, manual device-test steps, command results, and known limitations.

Return:
- what now works;
- files changed;
- packages added;
- command results;
- exact manual Nimiq Pay test required;
- anything blocked.

Stop after B1A. Do not begin signed authentication.
```

## Prompt B1B — Signed Wallet Session and Admin Identity

```text
Implement Arete milestone B1B only: server-verified signed wallet sessions and admin wallet authorization.

Read the PRD, B0 audit, B1A handoff, and the installed official Mini Apps skill references for signing. Preserve the existing SDK adapter and UI shell.

Implement the PRD auth contract:
- `POST /api/auth/nonce`
- `POST /api/auth/verify`
- `GET /api/auth/session`
- `POST /api/auth/logout`

Required behavior:
1. Normalize and validate Nimiq user-friendly addresses through an approved Nimiq library or the installed official skill’s recommended method.
2. Generate a cryptographically random nonce. Store only its hash with wallet address, exact production origin, issued time, short expiry, and consumed time.
3. Define one canonical, versioned Arete authentication message. It must include app/domain, normalized wallet address, nonce, issued-at, expiry, and an explicit login purpose. Serialize it identically on client and server.
4. After `listAccounts()`, request the nonce, call the official Nimiq provider `sign(...)` after an intentional user action, and send the returned public key/signature plus the exact message fields to the server.
5. Independently verify public key, signature, derived/expected address, nonce hash, origin, expiry, and unused status on the server. Use the official skill’s compatible verification library/pattern; do not invent cryptography.
6. Consume the nonce and create/update the user/session atomically.
7. Use an opaque, high-entropy session token stored as a secure HTTP-only same-site cookie where the deployment supports it. Store only its hash server-side.
8. Rotate or renew sessions safely and make refresh restore the real session.
9. Add logout/revocation and truthful expired-session handling.
10. Enforce admin access server-side using a normalized wallet allowlist environment variable plus a valid signed session. Hiding navigation is not authorization.
11. Never log the raw signature, nonce, session token, or full auth payload.
12. Add request validation, stable PRD error codes, and basic rate limiting for nonce/verify.

Use the B0-selected production relational database. If the identity tables are scheduled for B2A, create the minimum identity/auth migrations now and make B2A build on them; do not use temporary local storage or an in-memory production session store.

Tests must prove rejection of:
- replayed nonce;
- expired nonce;
- wrong origin;
- changed message;
- invalid signature;
- public-key/address mismatch;
- consumed nonce;
- revoked/expired session;
- non-admin wallet on admin API.

Do not implement challenges, scores, campaigns, or transactions.

Requirements covered: NIM-005, ADMIN-001, auth portions of the API and security requirements.

Run migration checks, focused tests, typecheck, lint, and production build. Update `.env.example` with names only and create `docs/implementation/B1B-handoff.md`.

Return the schema/API summary, exact verification results, required environment names, manual real-wallet auth steps, files changed, and blockers.

Stop after B1B.
```

## Prompt B2A — Production Data Foundation

```text
Implement Arete milestone B2A only: the production relational schema and server data foundation.

Read the PRD sections for the data model, API contract, security, no-mock rule, B0 audit, and B1 handoffs. Use the database selected in B0 and preserve all working auth code.

Create version-controlled migrations for:
- users, auth_nonces, sessions if not already complete;
- challenges;
- questions;
- question_options;
- audit_events.

Implement the PRD fields and constraints, adapting naming only when required by the existing stack. At minimum enforce:
- unique challenge public ID;
- one active challenge date per UTC day;
- unique question position per challenge;
- valid status values;
- server-side timestamps;
- foreign keys and appropriate delete restrictions;
- exactly one correct option per question at publication time;
- rules snapshot/version fields;
- append-only audit-event behavior at the application boundary.

Add:
1. A server-only data-access/repository layer. Privileged database credentials must never enter client bundles.
2. Runtime validation schemas for database writes and public response DTOs.
3. A public challenge serializer that can never expose `is_correct`, correct option IDs, unreleased explanations, private audit fields, or unpublished records.
4. UTC challenge-window helpers with unit tests.
5. Rules-snapshot serialization/versioning with stable output.
6. Transaction-safe audit-event helpers for material admin actions.
7. Safe development/production migration commands documented in the repo.

Do not:
- create hardcoded production challenges in frontend code;
- insert fake sponsor, leaderboard, score, streak, or transaction records;
- use the client-side database key for privileged writes;
- build admin screens yet;
- expose correct answers before `answer_release_at`.

Test:
- constraints and invalid status rejection;
- draft/future/closed challenge exclusion from Today selection;
- public serializer leakage;
- UTC boundary behavior;
- rules snapshot stability;
- unauthorized direct admin mutations through application endpoints.

Run database/migration validation, tests, typecheck, lint, and build. Create `docs/implementation/B2A-handoff.md` and update `.env.example` with variable names only.

Return schema created, constraints, commands, verification results, manual database setup required, and files changed.

Stop after B2A.
```

## Prompt B2B — Admin Challenge Publishing and Real Today API

```text
Implement Arete milestone B2B only: protected challenge authoring/publishing plus the real Today data path.

Read the PRD, B0 audit, and B1/B2A handoffs. Preserve the existing UI shell. Use the signed admin wallet authorization from B1B for every admin API action.

Implement:
- `POST /api/admin/challenges`
- `PATCH /api/admin/challenges/:id`
- `POST /api/admin/challenges/:id/publish`
- `POST /api/admin/challenges/:id/cancel`
- `GET /api/challenges/today`
- `GET /api/challenges/:id/rules`
- `GET /api/challenges/:id/answers` only after `answer_release_at`

Admin experience:
1. Create/edit a draft challenge with title, context, date, open/close/answer-release timestamps, estimated time, exactly five questions, options, one correct answer per question, explanation, factual source URL, and full versioned rules.
2. Preview the exact player-facing content before publication.
3. Block publication unless every PRD validation passes.
4. On publish, persist an immutable rules snapshot and audit event.
5. Prevent silent editing after opening. Require cancellation/versioning for material changes and record the reason.
6. Enforce authorization in APIs, not just routes or UI.

Player experience:
1. Replace the Today screen’s challenge mock/static live data with `GET /api/challenges/today`.
2. Return only the active published UTC challenge.
3. Include sponsor/reward data only through a nullable, already-safe contract; for now it should be absent because campaigns are not implemented.
4. Implement truthful loading, slow, empty, offline, retryable error, non-retryable error, stale refresh, and success states using the existing design system.
5. Keep the Start CTA session-aware, but do not create an attempt yet.
6. No active challenge must render “check back” guidance, never a fallback challenge.

Create one explicit operator procedure for publishing the first real production challenge. Do not automatically seed a live production record during app startup. A version-controlled seed script may be provided only if it requires an explicit operator command and inserts clearly authored, sourced real challenge content.

Requirements covered: TODAY-001 through TODAY-004, ADMIN-002 through ADMIN-004 and ADMIN-006.

Test public data leakage, all publish validations, post-open immutability, admin denial, active UTC selection, empty state, and answer-release gating.

Run tests, typecheck, lint, and build. Create `docs/implementation/B2B-handoff.md`.

Return what works, endpoint/schema notes, files changed, command results, and the exact manual step needed to publish the first real challenge.

Stop after B2B. Do not create attempts.
```

## Prompt B3A — Authoritative Attempt Start

```text
Implement Arete milestone B3A only: server-authoritative attempt creation and delivery of the five-question challenge.

Read the PRD and all prior handoffs. Use the real signed wallet session and real published challenge records.

Add migrations/models for:
- attempts;
- attempt_question_order;
- attempt_option_order;
- answers if needed now for the lifecycle.

Enforce the PRD constraints and statuses. Implement:
- `POST /api/challenges/:id/attempts`
- `GET /api/attempts/:id`

Required start behavior:
1. Require a valid server session.
2. Confirm the challenge is published and currently open.
3. Check for an existing finalized/ranked attempt and an unexpired in-progress attempt.
4. Use a transaction/lock plus a database uniqueness strategy so concurrent requests cannot create two ranked attempt paths.
5. Create the authoritative server `started_at` and expiry/grace boundary.
6. Snapshot deterministic question and option ordering for this attempt.
7. Return exactly five questions/options in that stored order.
8. Never return correct-answer fields, explanations before release, scoring metadata, other users, or admin data.
9. Make refresh resume the same valid in-progress attempt instead of creating another.
10. Return stable PRD error codes for not open, closed, already completed, expired, unauthenticated, and invalid challenge.

Wire the existing Challenge UI to the real attempt payload:
- start only from a deliberate user action;
- show loading, start failure, in-progress, session expired, attempt expired, and offline states;
- preserve selected answers locally during the active screen only;
- do not calculate authoritative score or rank in the client;
- do not submit yet.

Requirements covered: GAME-001, GAME-002, GAME-003, GAME-006 start enforcement, GAME-007 start/expiry behavior.

Test concurrent starts, resume, unauthorized access to another user’s attempt, payload leakage, question count, deterministic stored order, closed challenge, and expiry.

Run migration validation, tests, typecheck, lint, and build. Create `docs/implementation/B3A-handoff.md`.

Return implementation summary, concurrency strategy, files changed, command results, and manual flow to verify.

Stop after B3A. Do not implement scoring.
```

## Prompt B3B — Idempotent Submission, Server Scoring, and Result

```text
Implement Arete milestone B3B only: authoritative answer submission, scoring, finalization, and the real Result screen.

Read the PRD and prior handoffs. Do not trust any client-computed result.

Implement:
- `POST /api/attempts/:id/submit`
- complete `GET /api/attempts/:id` result behavior after finalization.

Submission contract:
1. Accept attempt ID, exactly one selected option ID for each of the five stored question IDs, and a client-generated idempotency key.
2. Reject or ignore client score, correctness, rank, duration, submitted time, reward, or wallet fields.
3. Validate ownership, attempt status, question IDs, option membership, completeness, challenge close/grace rules, and payload size.
4. Finalize inside one database transaction/lock.
5. Record authoritative `submitted_at`.
6. Score accuracy from server-only correct answers.
7. Calculate duration from server timestamps.
8. Persist immutable answers, correctness, score, duration, status, finalized time, and initial flag signals.
9. Create one `daily_completions` source-of-truth row for a valid completion.
10. Return the same finalized result for safe retries with the same idempotency key.
11. Prevent a changed retry or concurrent submission from altering the first finalized answer set.
12. Compute and return an immediate `current rank` from finalized valid attempts only.

Wire the Result UI to the server result:
- verified score out of five;
- `current rank` while open;
- completion language from the PRD;
- real reward state, currently `not_applicable`;
- truthful retry/processing/duplicate/expired/finalized states;
- no “won” language;
- refresh restores the same result.

Do not implement the full leaderboard, streak projection, share card, campaign, or payout yet.

Requirements covered: GAME-004 through GAME-008, SCORE-001 through SCORE-003 and SCORE-005, TODAY-005.

Test:
- incomplete and unknown IDs;
- option from another question;
- altered client score/time;
- repeated same idempotency key;
- repeated key with changed payload;
- concurrent submits;
- submit after expiry;
- challenge closing during attempt according to the published grace rule;
- only one daily completion;
- result authorization and refresh.

Run migrations, tests, typecheck, lint, and build. Create `docs/implementation/B3B-handoff.md`.

Return exact scoring/finalization behavior, concurrency/idempotency evidence, files changed, command results, and manual end-to-end test.

Stop after B3B.
```

## Prompt B4A — Leaderboard, Rank Freeze, Daily Mark, and Progress

```text
Implement Arete milestone B4A only: the real leaderboard, final rank freeze, Daily Mark, streak, and Progress experience.

Read the PRD and prior handoffs. Build all derived state from verified finalized attempts and `daily_completions`.

Add/complete:
- `GET /api/challenges/:id/leaderboard`
- `GET /api/me/progress`
- progress_projections migration/model;
- scheduled/idempotent challenge-close and final-rank-freeze job.

Leaderboard rules:
1. Include finalized, valid, ranked attempts only.
2. Sort score descending, server duration ascending, finalized timestamp ascending.
3. Label open-challenge positions `current rank`.
4. After close, freeze deterministic final ranks in an idempotent operation.
5. Exclude started, expired, invalid, and voided attempts.
6. Show moderated display name or truncated wallet address only.
7. Never expose full wallet addresses, answer sets, internal flags, or device signals publicly.

Progress rules:
1. `daily_completions` is the source of truth.
2. One verified completion grows the Daily Mark once for that UTC challenge date.
3. Consecutive published challenge dates grow current streak; a missed published challenge date breaks it. Do not punish users for a date on which no challenge was published.
4. Preserve current streak, longest streak, total completions, and last completion date.
5. Make the projection rebuildable and add a repair/rebuild command.
6. Reward-free or later-ineligible reward outcomes still count when the challenge attempt itself is valid.

Wire real data into Today, Result, Leaderboard, and Progress using the existing visual language. Remove their production mock/static live-looking rows, ranks, streaks, and completion counts. Implement all required loading, empty, offline, stale, retry, session-expired, and success states.

Requirements covered: SCORE-002 through SCORE-007, MARK-001 through MARK-005.

Test ranking ties, exclusion states, rank freeze idempotency, privacy serializer, consecutive/missed/no-challenge dates, duplicate completion, projection rebuild, and consistency across screens.

Run migrations/jobs locally in a safe test environment, then tests, typecheck, lint, and build. Create `docs/implementation/B4A-handoff.md`.

Return real-data sources removed/replaced, rank/streak algorithms, files changed, command results, scheduler/manual production setup, and end-to-end verification.

Stop after B4A.
```

## Prompt B4B — Verified Sharing and Return Loop

```text
Implement Arete milestone B4B only: verified result sharing, the completed Today return state, and distribution/deeplink behavior.

Read the PRD and B4A handoff. Preserve the approved visual system.

Implement:
1. A result-card renderer driven only by the authorized finalized result API.
2. Card fields: Arete branding, challenge date/title, verified score, Daily Mark/progress, and optional verified sponsor identity. Do not include a provisional or unverified reward claim.
3. Mobile Web Share API where available.
4. Download-image and copy-link fallbacks.
5. A share URL with a normal web landing state and an open-in-Nimiq-Pay action using the official deeplink format.
6. `POST /api/share-events` and privacy-conscious aggregate events. Do not place full wallet addresses, answers, session data, or reward review data in analytics.
7. Completed Today state with verified score, current/final rank, Daily Mark, next UTC challenge cue, Share, and Leaderboard actions.
8. Clear local-language date plus explicit UTC closing/next-challenge wording.
9. Screen-reader announcements and reduced-motion behavior for result/share feedback.

Requirements covered: SHARE-001 through SHARE-004 and the complete Today return journey.

Test share-data authorization, card output with/without sponsor, absence of reward claims, fallback behavior, deeplink construction, analytics payload privacy, and completed-state refresh.

Run tests, typecheck, lint, and build. Manually inspect the card at 320px mobile width. Create `docs/implementation/B4B-handoff.md`.

Return what works, files changed, command results, generated/share test evidence, and real-device checks still needed.

Stop after B4B. Do not start campaign funding.
```

## Prompt B5A — Campaign Data, Admin Setup, and Publication Gate

```text
Implement Arete milestone B5A only: campaign/reward-rule data, protected admin setup, and the publication gate. Do not send or verify a transaction yet.

Read the PRD campaign state machine, data model, rules, security boundaries, open B5 decisions, and all prior handoffs.

Before editing, check whether the builder has supplied:
- authorized sponsor name/message/URL;
- treasury wallet address;
- expected amount in integer Luna;
- fixed allocation rules;
- eligibility restrictions;
- review/payout timing;
- cancellation/refund terms;
- required confirmation policy.

If these values are absent, implement the generic validated workflow and leave the first campaign in `draft`; do not invent sponsor or financial values.

Add migrations/models for:
- campaigns;
- funding_transactions;
- reward_allocations if needed for validating allocation snapshots.

Implement:
- `POST /api/admin/campaigns`
- `PATCH /api/admin/campaigns/:id`
- campaign preview;
- transitions from `draft` to `awaiting_funding`;
- unique short funding reference generation;
- immutable eligibility and allocation snapshots before funding;
- complete campaign audit events.

Publication gate:
1. A reward-bearing challenge cannot expose sponsor/reward amounts unless the campaign is independently `funded`.
2. Expected funding must cover the published allocation total and any explicit policy reserve.
3. Challenge/campaign terms become immutable after the challenge opens.
4. Sponsor content cannot alter questions, answers, scores, ranks, or normal progress.
5. Sponsor CTA remains optional.
6. Public serializers never expose treasury operations, player wallets, or internal review data.

Wire admin campaign creation/preview into the existing shell. Player surfaces should continue showing no sponsor/reward claim until B5B verifies funding.

Requirements covered: CAMP-001 through CAMP-007 except actual chain verification.

Test state transitions, underfunded allocation plan rejection, admin denial, immutability, serializer privacy, and publication gate.

Run migrations, tests, typecheck, lint, and build. Create `docs/implementation/B5A-handoff.md`.

Return schema/state machine, manual campaign inputs still needed, files changed, command results, and confirmation that no transaction was sent and no unverified reward copy is visible.

Stop after B5A.
```

## Prompt B5B — Real Nimiq Mainnet Funding and Independent Verification

```text
Implement Arete milestone B5B only: real sponsor/operator funding through Nimiq Pay and independent Nimiq Mainnet verification.

This milestone moves real money. Read the PRD, B5A handoff, installed official Nimiq Mini Apps skill, and the current official Nimiq transaction/provider references before editing. Do not guess an RPC/indexer API or confirmation rule.

Implement:
- `POST /api/admin/campaigns/:id/funding-intent`
- `POST /api/admin/campaigns/:id/funding-transactions`
- `GET /api/admin/campaigns/:id/funding-status`
- a server-only Nimiq Mainnet transaction verification adapter.

Funding flow:
1. Require valid signed admin/operator session and server-side campaign checks.
2. Return a short-lived funding intent containing exact treasury recipient, integer Luna value, funding reference data, campaign ID, and expiry. The server remains authoritative.
3. Confirm provider readiness and Nimiq consensus.
4. On deliberate operator action, call the official provider:
   `sendBasicTransactionWithData({ recipient, value, data })`
   using the server intent exactly.
5. Capture only the returned transaction hash and submit it to the server.
6. Set `funding_submitted`/confirming, never `funded` from client success.
7. Independently fetch and verify:
   - Nimiq Mainnet;
   - exact transaction hash;
   - expected recipient;
   - expected/minimum integer Luna value according to the published policy;
   - exact funding reference data;
   - allowed sender policy if configured;
   - confirmation/finality policy.
8. Store normalized evidence and safe raw verification metadata server-side.
9. Make verification retryable and idempotent.
10. Reject not-found, wrong-network, wrong-recipient, wrong-value, wrong-data, duplicate-hash, and unconfirmed transactions with stable states/errors.
11. Only a verified match changes the campaign to `funded`.
12. Only then may Today/Rules show the approved sponsor identity, amount/allocation, `Sponsor-funded`, eligibility, and review timing.

Safety:
- never accept a pasted private key;
- never put treasury signing material in the app;
- never use floats for Luna;
- never fabricate a transaction in production;
- use a very small builder-approved real amount for the first smoke test;
- do not log provider secrets or sensitive raw payloads.

Requirements covered: NIM-003, NIM-007, NIM-008 funding half, CAMP-002 and CAMP-004.

Tests:
- matching confirmed transaction;
- not found then later confirmed;
- wrong recipient/value/data/network;
- duplicate hash;
- stale intent;
- unauthorized operator;
- client claims success without matching chain record;
- publication remains gated until verified.

Run tests, typecheck, lint, and build. Do not claim the mainnet acceptance test passed unless a real low-value transaction was performed and independently reconciled. Create `docs/implementation/B5B-handoff.md` separating automated results from manual mainnet evidence.

Return implementation summary, verification source/policy, files changed, command results, exact manual approval steps, transaction state observed, and any blocker.

Stop after B5B. Do not allocate rewards.
```

## Prompt B6A — Final Rank Allocation and Manual Review

```text
Implement Arete milestone B6A only: final reward allocation and operator eligibility/integrity review. Do not send a payout yet.

Read the PRD reward state machine, published campaign snapshots, fairness model, B5 handoffs, and prior rank-freeze implementation.

Implement:
- idempotent final allocation job after challenge close and final-rank freeze;
- `POST /api/admin/rewards/allocate`;
- `POST /api/admin/rewards/:id/review`;
- `GET /api/me/rewards`;
- protected review console.

Rules:
1. Allocate only for a verified funded campaign attached to a closed challenge with frozen final ranks.
2. Use only the immutable published allocation and eligibility snapshots.
3. Never allocate from current/open rank.
4. Create at most one allocation per campaign/user.
5. Map valid qualifiers to `pending_review`; use `provisional` only while the challenge is open and never make it payable.
6. Surface reasoned review flags without automatically rewriting a valid score.
7. A flagged allocation requires a reviewer and recorded reason before approval.
8. Review transitions must be explicit and validated: pending_review → approved or ineligible; corrections require auditable admin action.
9. Record reviewer, time, reason code, note, before/after state, and append-only audit event.
10. Player Rewards shows truthful state labels from the PRD and a concise ineligibility reason category/support path.
11. Never say `won`, `paid`, or “instant payout” before the relevant verified state.
12. Sponsors receive no player-level wallet or review data.

Implement useful review evidence from existing authoritative data only: final rank, score, duration, timing summary, attempt flags, wallet identity, and audit history. Do not add invasive device fingerprinting in this milestone.

Requirements covered: REWARD-001, REWARD-002, REWARD-003, REWARD-006, REWARD-007, ADMIN-005, ADMIN-006.

Test allocation idempotency, open/unfunded campaign rejection, snapshot use, non-qualifier behavior, flagged approval requirements, invalid transitions, admin denial, audit evidence, and player serializer privacy.

Run migrations if needed, tests, typecheck, lint, and build. Create `docs/implementation/B6A-handoff.md`.

Return allocations/review behavior, state mapping, files changed, command results, and a manual review walkthrough.

Stop after B6A. Do not send NIM.
```

## Prompt B6B — Real Reward Payout and Independent Verification

```text
Implement Arete milestone B6B only: operator-approved real NIM payout through Nimiq Pay plus independent server verification.

This milestone moves real money. Read the PRD, B6A/B5B handoffs, installed official Nimiq skill, and current official provider/transaction references. Reuse the hardened verification adapter rather than creating a conflicting path.

Implement:
- `POST /api/admin/rewards/:id/payout-intent`
- `POST /api/admin/rewards/:id/payout-transactions`
- payout status retrieval/polling;
- payout_transactions migration/model if not already present.

Flow:
1. Require signed authorized operator session.
2. Lock/read an `approved` allocation and return a short-lived exact payout intent: allocation ID, player’s verified wallet recipient, integer Luna amount, optional approved reference data if the selected transaction type supports it, expiry, and expected treasury sender policy.
3. Confirm provider readiness and consensus.
4. On deliberate operator action, request the real NIM transaction through Nimiq Pay using the official supported method.
5. Submit the returned transaction hash to the server.
6. Atomically reserve/link the allocation so retries cannot initiate or confirm a second payout.
7. Move to `payout_submitted`/Payment confirming, never directly to `paid`.
8. Independently verify Nimiq Mainnet, transaction hash, approved sender/treasury policy, exact player recipient, exact integer Luna amount, and confirmation policy.
9. Only a verified match changes the allocation to `paid`.
10. Verification must be idempotent and retryable for not-found/unconfirmed states.
11. Wrong recipient, amount, sender, network, duplicate hash, stale intent, or transaction mismatch must never become paid.
12. Store audit evidence for intent creation, submission, verification, mismatch, and paid transition.
13. Update Player Rewards with accurate confirming/paid/failed-to-verify states and a safe explorer link if the current official source supports it.

Safety:
- no treasury key in code/server/env;
- operator approves in Nimiq Pay;
- no float NIM values;
- no “paid” from a client callback;
- one payout transaction per allocation and one allocation per confirmed hash;
- use the smallest builder-approved real payout for the production smoke test.

Requirements covered: NIM-008 payout half, REWARD-004, REWARD-005.

Test concurrent payout intents, repeat submission, same hash on two allocations, wrong sender/recipient/value/network, unconfirmed then confirmed, unauthorized operator, and client-only success.

Run tests, typecheck, lint, and build. Do not claim real mainnet completion without independently reconciling an actual low-value payout. Create `docs/implementation/B6B-handoff.md` separating automated tests from real transaction evidence.

Return payout behavior, duplicate-prevention mechanism, verification source/policy, files changed, command results, exact manual approval steps, and real-chain status.

Stop after B6B.
```

## Prompt B7A — Security, Reliability, Accessibility, and Observability

```text
Implement Arete milestone B7A only: production hardening across the complete P0 product.

Read the PRD security, privacy, interface states, accessibility, analytics, tests, Definition of Done, and every milestone handoff. Audit the actual code; do not trust completion summaries without evidence.

Perform a scoped hardening pass:
1. Rate-limit nonce, auth verify, attempt start, submit, share, sponsor-click, funding, payout, and admin mutation endpoints with sensible per-wallet/IP/coarse controls for the current platform.
2. Validate every API identifier, payload shape, size, and state transition server-side.
3. Confirm secure cookie flags, origin checks, CSRF posture for same-origin mutations, session rotation/revocation, nonce single use, and admin authorization.
4. Confirm database transactions/locks and uniqueness constraints protect attempts, submissions, allocations, and payouts.
5. Redact signatures, session tokens, provider payload secrets, database secrets, and unnecessary full wallet addresses from logs/errors/analytics.
6. Add privacy-conscious product events from the PRD without correct answers or wallet history.
7. Integrate the repo’s existing error monitoring or add the lightest production-compatible option, with secrets supplied only through environment settings.
8. Implement every missing required data, challenge, and transaction UI state from PRD section 17.3.
9. Add offline/online recovery, slow-network handling, stale-data refresh, safe retries, and no fake fallback data.
10. Accessibility pass: 44px targets, 320px width, labels, focus, screen-reader announcements, reduced motion, non-color state cues, and WCAG AA contrast.
11. Check mobile/WebView behavior, background/foreground during challenge, native permission cancellation, share sheet, and deeplink.
12. Add/update Privacy, Rules, and Terms content consistent with actual data collection and reward process. Do not invent legal guarantees; mark builder/legal-review decisions clearly.
13. Search production source and built output for committed secrets, demo wallets, fake transactions, random scores, hardcoded leaderboard rows, fabricated streaks, sponsor placeholders, and timeout-based fake confirmations.

Do not expand P0 with referrals, multiplayer, device fingerprinting, automated treasury signing, new game types, or cosmetic redesign.

Run the complete unit/integration suite, migration checks, typecheck, lint, production build, and any repository secret scan. Fix failures caused by this implementation; report unrelated blockers precisely.

Create:
- `docs/implementation/B7A-hardening-report.md`;
- `docs/qa/device-test-checklist.md`;
- updated `.env.example` with names/comments only.

The report must map every P0 requirement ID to implemented evidence, test evidence, manual-device-only verification, or a clear blocker.

Return high-risk findings fixed, remaining manual checks, files changed, every command result, and confirmation of the production no-mock scan.

Stop after B7A. Do not manufacture submission evidence.
```

## Prompt B7B — Production Smoke Test and Submission Package

```text
Complete Arete milestone B7B only: final production verification and submission materials.

Read the PRD Definition of Done, B7A report, device checklist, all handoffs, official competition requirements supplied in the repo, and current README/license/deployment configuration.

First run a release-readiness audit. Do not claim a manual or mainnet step passed unless there is real evidence. Split work into:
A. agent-executable checks;
B. builder/device/operator actions;
C. final documentation after the builder supplies results.

Agent-executable work:
1. Run the full migrations check, unit/integration tests, typecheck, lint, production build, secret scan, and route/API inventory.
2. Verify production has no mock/demo fallback or testnet/mainnet mixing.
3. Confirm all PRD P0 routes and interface states exist.
4. Confirm no private key/recovery phrase/secret is committed.
5. Confirm public repository has an MIT `LICENSE`.
6. Update README with:
   - product promise and daily loop;
   - architecture/trust boundaries;
   - local setup;
   - environment variable names only;
   - database migration procedure;
   - Nimiq Pay testing instructions;
   - mainnet funding/payout explanation;
   - operator workflow;
   - scheduled jobs;
   - security/no-custody statement;
   - deployment procedure;
   - known P0 limitations.
7. Create a concise architecture diagram in Mermaid if README rendering supports it.
8. Create `docs/submission/arete-submission-copy.md` with a polished maximum-250-word submission description grounded only in shipped functionality.
9. Create `docs/submission/demo-script.md` for a 90–150 second direct demo: problem → Today → real wallet auth → challenge → verified result/progress → funded reward evidence → reviewed real payout → why it belongs in Nimiq Pay.
10. Create `docs/submission/evidence-checklist.md` for repository, live URL, Mini App/deeplink, real mainnet hashes, tester count, Day-2 returns, build-in-public posts, screenshots, and demo video.

Builder-required production smoke test:
1. Publish one real sourced challenge.
2. Fund a small campaign using a real mainnet NIM transaction.
3. Independently verify it becomes funded.
4. Complete from a separate non-admin Nimiq Pay wallet.
5. Close/finalize and freeze ranks.
6. Allocate and approve one low-value reward.
7. Pay it through the operator wallet.
8. Independently verify it becomes paid.
9. Reconcile database records with both transaction hashes.
10. Test first permission, denial/retry, background/foreground, slow consensus/network, offline recovery, share sheet, and deeplink on supported mobile devices.

If the builder has not supplied evidence for a manual step, mark it `NOT YET VERIFIED`; never replace it with a simulated pass.

Create `docs/submission/final-release-report.md` containing:
- requirement-by-requirement status;
- automated command results;
- device results;
- production smoke evidence with safe transaction hashes/links only;
- unresolved blockers;
- explicit launch/no-launch recommendation.

Return the launch verdict first, then command results, files changed, manual evidence still required, and the shortest next action list.

Stop after B7B. Do not publish, push, deploy, submit, or send external messages unless the builder separately asks.
```

---

## 5. Standard recovery prompt

Use this if Codex/Grok crashes or stops during any milestone:

```text
Recover the current Arete milestone safely.

Do not assume the previous agent completed its work. Read:
- `arete-mainnet-product-prd.md`;
- `docs/implementation/B0-reality-audit.md`;
- the latest completed milestone handoff;
- the active milestone prompt;
- repository instructions;
- current `git status` and full diff.

Then:
1. Identify exactly what the interrupted run changed.
2. Compare the changed files against the active milestone’s required deliverables and exit gate.
3. Preserve correct work and unrelated user changes.
4. Do not revert, overwrite, or restart broadly.
5. Finish only the missing active-milestone scope.
6. Run the milestone’s required verification commands.
7. Update or create that milestone’s handoff with truthful results.
8. Report incomplete/manual items clearly.

The production app must not gain mock data, fake transaction states, demo wallets, client-authoritative scores, or unverified reward claims during recovery.

Stop when the active milestone passes or when a concrete blocker requires builder action. Do not begin the next milestone.
```

---

## 6. Standard completion-report contract

If an agent starts giving vague “done” summaries, append this to the milestone prompt:

```text
Your final response must include:
1. Outcome: what a real user/operator can now do.
2. Scope: exact files created, changed, or deleted.
3. Data: migrations, constraints, API contracts, state transitions, and environment variable names added.
4. Verification: every command run with pass/fail/skip and test counts.
5. Manual verification: exact Nimiq Pay/device/mainnet actions still required.
6. No-mock evidence: production mock/static live-data sources removed or confirmed absent.
7. Security: confirmation that no secret/private key/recovery phrase was added or logged.
8. Deferred work and blockers.

Do not say “all tests pass” without listing the commands. Do not claim a mainnet or device test passed without real evidence. Do not begin the next milestone.
```

---

## 7. Go/no-go gates

### Daily-loop beta gate — after B4B

Go only when a real Nimiq Pay user can:

- authorize a wallet and refresh the session;
- load a database-backed published challenge;
- complete exactly one ranked attempt;
- receive a server-verified score/current rank;
- see the result again after refresh;
- see real leaderboard/progress/Daily Mark data;
- share a result with no false financial claim.

### Reward beta gate — after B6B

Go only when:

- an unfunded campaign exposes no reward promise;
- a real matching mainnet funding transaction produces `funded`;
- final rank creates allocations only after close;
- review transitions are auditable;
- a real matching payout becomes `paid`;
- mismatched/unconfirmed hashes never do;
- duplicate payout protection is proven.

### Submission gate — after B7B

Go only when:

- automated P0 checks pass;
- mobile Nimiq Pay testing passes;
- the production smoke test is reconciled;
- no secret or production mock exists;
- the public repository, MIT license, README, live app, demo, copy, evidence, and tester feedback are ready.

---

## 8. Immediate next move

Run **Prompt B0** in the actual Arete repository first.

Do not start B1A from assumptions. B0 will reveal the real framework, package manager, routes, database state, and mock locations. Once its report passes, B1A can be implemented without tearing through the finished UI shell.

