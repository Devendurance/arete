# Arete Mainnet Product Requirements Document

**Product:** Arete  
**Pronunciation:** ah-REH-tay  
**Tagline:** Make today count.  
**Category:** Sponsor-funded daily skill challenge Mini App for Nimiq Pay  
**Document status:** Build-ready MVP specification  
**Version:** 1.0  
**Date:** 30 July 2026  
**Network:** Nimiq Mainnet only in production

---

## 1. Executive summary

Arete is a daily skill challenge inside Nimiq Pay. A user opens the Mini App, connects a Nimiq account, completes one deterministic five-question challenge, receives a server-verified score and current rank, grows a wallet-linked Daily Mark, and returns the next day to continue their practice.

Some challenges may include sponsor-funded NIM rewards. Players never pay to enter. Rewards come from a verified sponsor funding transaction, follow rules published before the challenge opens, and remain visibly pending until eligibility and anti-fraud review are complete.

The MVP is intentionally one excellent daily loop—not a collection of games:

> Open → understand today’s practice → complete five questions → see verified progress → optionally qualify for a funded reward → return tomorrow.

The product must use real challenge records, real wallet authorization, real attempts, real scoring, real leaderboard data, real streak calculations, and real mainnet NIM transactions. There is no demo mode and no mock production data.

### Core product promise

> Arete makes Nimiq Pay worth opening tomorrow.

### North-star metric

**Daily wallet-connected challenge completions.**

### Planning assumption

The official competition site lists Cycle I as 6–30 July 2026 and Cycle II as 10 August–7 September 2026. Because this PRD is dated 30 July, the safe build target is Cycle II unless Arete already has an eligible Cycle I submission and the submission portal is still open.

---

## 2. Problem

Wallets are easy to open once. They are harder to turn into a habit.

Most wallet interactions are occasional and transactional: receive funds, send funds, check a balance, then leave. Nimiq Pay needs useful experiences that create a reason to return without manufacturing financial risk or making every interaction feel like speculation.

At the same time, Nimiq merchants and ecosystem projects need qualified attention. Conventional sponsor placements interrupt the user and provide little evidence that the audience learned or acted.

Arete connects both needs:

- users get a short, useful daily practice and visible progress;
- sponsors fund transparent skill rewards and useful discovery;
- Nimiq Pay gains a repeat, wallet-native experience;
- NIM is used as real funding and reward infrastructure rather than decorative branding.

---

## 3. Product goals

### 3.1 MVP goals

1. Give a new user a complete first experience in under three minutes.
2. Make the next-day return cue clear immediately after completion.
3. Make score, rank, streak, eligibility, and reward status trustworthy and explainable.
4. Use the Nimiq Pay provider meaningfully for wallet identity and NIM transactions.
5. Let an operator publish one real challenge per day without editing code.
6. Support a real sponsor-funded reward campaign without paid entry, pooled player money, or chance.
7. Produce enough operational evidence to resolve disputes about attempts, ranks, eligibility, and payouts.
8. Feel polished and native on a mobile screen inside Nimiq Pay.

### 3.2 Non-goals for this scope

The MVP will not include:

- multiple game types;
- player deposits or paid entry;
- pooled prize funds;
- chance-based selection;
- referrals or referral rewards;
- team leagues;
- multiplayer;
- self-serve sponsor onboarding;
- automated high-value payouts;
- an app-controlled custodial treasury;
- tradable badges, tokens, or NFTs;
- AI-generated questions in the live request path;
- user-created challenges;
- a generic points currency;
- complex merchant action verification;
- EVM or USDT support;
- a web experience that pretends to be connected when opened outside Nimiq Pay.

---

## 4. Product principles

### 4.1 Earn the return visit

Every screen should support today’s practice or tomorrow’s return. Features that do neither should not enter the MVP.

### 4.2 Skill before luck

The correct answer is predetermined. Accuracy is the primary score. Verified completion duration is used only to break equal scores.

### 4.3 Never imply money that is not secured

A challenge cannot advertise a NIM reward until the sponsor funding transaction has been verified on Nimiq Mainnet and the campaign is marked funded.

### 4.4 Progress survives reward-free days

The Daily Mark and leaderboard loop must remain useful when no sponsor campaign is active. No sponsor is better than a fake sponsor.

### 4.5 Server decides; client presents

The browser may collect answers and display state, but it must not decide the authoritative score, rank, streak, eligibility, or payout status.

### 4.6 Real does not mean recklessly automated

Cycle-one payouts are approved and sent manually through an operator-controlled Nimiq wallet. The system verifies the transaction before changing a reward to `paid`. This is real mainnet settlement without placing a treasury private key in the application.

---

## 5. Target users

### 5.1 Primary: Nimiq Pay player

**Profile:** Existing Nimiq community member or crypto-curious user with Nimiq Pay.  
**Job:** Complete something useful in a spare two minutes and build visible progress.  
**Needs:** Fast onboarding, fair rules, immediate feedback, no deposit, trustworthy reward language, and a clear return cue.

### 5.2 Secondary: sponsor or ecosystem partner

**Profile:** Nimiq merchant, community initiative, or ecosystem project.  
**Job:** Fund a useful challenge and earn qualified attention without buying outcomes or personal wallet data.  
**Needs:** Clear campaign terms, verifiable funding, tasteful placement, and aggregate engagement reporting.

### 5.3 Internal: Arete operator

**Profile:** Product administrator and reward reviewer.  
**Job:** Prepare challenges, publish campaigns, review suspicious attempts, approve rewards, and record real payouts.  
**Needs:** Safe publishing controls, immutable rules after opening, explainable audit records, and no requirement to edit the application database by hand.

---

## 6. Scope and release boundary

### 6.1 P0: submission-ready product

P0 includes:

- Nimiq Pay environment detection;
- Nimiq provider initialization;
- Nimiq account request and signed wallet session;
- daily challenge loading from the production database;
- server-issued attempt start;
- deterministic five-question quiz;
- server-side submission and scoring;
- current leaderboard;
- wallet-linked Daily Mark and streak;
- result sharing;
- admin-created challenge and question records;
- optional sponsor campaign attached to a challenge;
- real NIM campaign-funding transaction;
- mainnet funding verification;
- reward allocation after challenge close;
- manual eligibility review;
- operator-initiated NIM payout;
- payout transaction verification;
- privacy, rules, terms, and reward disclosures;
- production analytics and error logging;
- loading, empty, denied, offline, expired, duplicate, and failure states.

### 6.2 P1: only after P0 works with real testers

- aggregate sponsor analytics dashboard;
- question review workflow;
- scheduled publishing interface;
- localized copy beyond the launch language;
- challenge archive and learning review;
- optional pseudonymous device identifier as an anti-abuse signal;
- richer badges derived from verified completion history;
- automatic low-value payouts from a hardened, capped treasury service.

### 6.3 Later

- merchant action verification;
- additional challenge formats;
- community or sponsor self-service;
- team practice;
- seasonal leagues;
- dual-chain features.

---

## 7. User experience architecture

The exact route names may follow the existing UI shell, but the product must expose these experiences.

| Experience | Purpose | Required real data |
|---|---|---|
| Today | Explain today’s practice and start the loop | Published challenge, player completion, Daily Mark, funded campaign |
| Challenge | Run the active five-question attempt | Server-created attempt and production questions |
| Result | Show verified outcome and return cue | Server score, current rank, streak, reward state |
| Leaderboard | Show fair current/final ranking | Verified ranked attempts only |
| Progress | Show wallet-linked practice history | Completed challenge history and Daily Mark |
| Rewards | Explain allocations and payout status | Reward allocations, review status, verified transaction |
| Rules | Explain scoring, tie-breaks, eligibility, review, and dates | Versioned published rules |
| Privacy | Explain wallet, analytics, device, and sponsor data use | Production policy |
| Admin | Operate challenges and rewards | Protected production records and audit log |

### Recommended route map

- `/` — Today
- `/challenge/[challengeId]`
- `/result/[attemptId]`
- `/leaderboard`
- `/progress`
- `/rewards`
- `/rules/[challengeId]`
- `/privacy`
- `/open-in-nimiq-pay`
- `/admin`
- `/admin/challenges`
- `/admin/campaigns`
- `/admin/rewards`

Admin routes may be a protected section of the same application or a separately deployed internal surface. They must never be exposed by merely hiding navigation.

---

## 8. Core user journeys

### 8.1 First visit and wallet session

1. The app checks whether it is running inside Nimiq Pay.
2. The app initializes `@nimiq/mini-app-sdk`.
3. It verifies Nimiq consensus is established.
4. The user taps **Continue with Nimiq Pay**.
5. Nimiq Pay asks the user to approve account access.
6. The server issues a short-lived, single-use nonce.
7. The app asks Nimiq Pay to sign a canonical Arete authentication message containing the nonce, origin, issued time, and expiry.
8. The server verifies the signature, public key, expected address, nonce, origin, and expiry.
9. The server creates a secure session.
10. The user returns to Today with their real Daily Mark and completion state.

If the app is opened in a normal browser, it shows an explanation and a Nimiq Pay deeplink. It must not fabricate an account or enter a demo session.

### 8.2 Complete today’s challenge

1. Today loads the currently published challenge for the UTC day.
2. The user sees:
   - `TODAY · ~2 MINUTES · SKILL ONLY`;
   - title and practical context;
   - five-question format;
   - scoring and tie-break summary;
   - `Free to play · Skill only · One ranked attempt`;
   - sponsor and reward rules only when a funded campaign exists;
   - current Daily Mark;
   - **Start today’s challenge**.
3. The client requests a new attempt.
4. The server checks the wallet session, challenge window, and existing ranked attempt.
5. The server creates the attempt and authoritative `started_at`.
6. The API returns ordered questions and options without correct-answer fields.
7. The user answers all five questions.
8. The client submits once with an idempotency key.
9. The server records `submitted_at`, validates the payload, scores the answers, calculates duration, applies flags, and finalizes the first verified attempt.
10. The result screen shows the verified score, current rank, Daily Mark, reward state, and tomorrow cue.

### 8.3 Returning after completion

The Today screen must not offer another ranked attempt. It shows:

- **Today’s practice is complete**;
- verified score;
- current or final rank;
- Daily Mark/streak;
- reward state if applicable;
- countdown or calendar wording for the next UTC challenge;
- share action;
- leaderboard action.

### 8.4 Fund a campaign with NIM

1. An operator creates a draft campaign and sets the treasury address, expected amount in Luna, reward allocations, eligibility, and attached challenge.
2. The system creates a short unique funding reference.
3. The authorized sponsor/operator opens the funding action inside Nimiq Pay.
4. The app calls `sendBasicTransactionWithData` with:
   - the configured treasury recipient;
   - an integer Luna value;
   - the funding reference as transaction data.
5. Nimiq Pay shows its native approval dialog.
6. The app receives a transaction hash and submits it to the server.
7. The server independently verifies network, transaction hash, recipient, minimum value, reference, and confirmation state through a configured Nimiq Mainnet RPC/indexer.
8. Only after verification does the campaign become `funded`.
9. Only a funded campaign may be published as reward-bearing.

### 8.5 Review and pay an eligible reward

1. The challenge closes.
2. The server freezes final ranks from verified first attempts.
3. It creates reward allocations from the already-published reward rules.
4. An operator reviews flags and eligibility evidence.
5. The allocation becomes `approved` or `ineligible`.
6. For an approved allocation, the operator opens the payout action inside an authorized Nimiq Pay wallet.
7. The app requests a real NIM transaction to the player’s verified wallet address.
8. The operator approves the native confirmation.
9. The returned transaction hash is sent to the server.
10. The server independently verifies mainnet, sender/treasury policy, recipient, value, and confirmation.
11. The allocation becomes `paid`.

The UI must never show `paid` based only on an entered hash or client success response.

---

## 9. Functional requirements

Requirement IDs are stable references for implementation prompts, tests, and QA.

### 9.1 Environment and Nimiq integration

| ID | Requirement | Acceptance criteria |
|---|---|---|
| NIM-001 | Initialize the injected Nimiq provider through the Mini App SDK. | Provider readiness is awaited; no direct assumption that injection is immediate. |
| NIM-002 | Detect non-Nimiq Pay environments. | Normal browsers see an open-in-Nimiq-Pay state, not a fake connected experience. |
| NIM-003 | Check consensus before wallet-sensitive operations. | Start, funding, and payout actions are disabled with a retryable error while consensus is unavailable. |
| NIM-004 | Request Nimiq accounts only after an intentional user action. | Native permission denial returns the user to a useful state without losing the page. |
| NIM-005 | Use signed nonces for wallet sessions. | Replayed, expired, wrong-origin, invalid, or previously consumed nonces fail. |
| NIM-006 | Use Nimiq Mainnet in production. | No production toggle silently falls back to testnet or fixtures. |
| NIM-007 | Store all NIM amounts as integer Luna. | Conversion uses `1 NIM = 100,000 Luna`; floats are rejected at storage and transaction boundaries. |
| NIM-008 | Use real NIM transactions for funding and payout. | Each paid/funded state references a server-verified mainnet transaction hash. |

### 9.2 Today

| ID | Requirement | Acceptance criteria |
|---|---|---|
| TODAY-001 | Load the active published challenge for the current UTC day. | Draft, cancelled, expired, and future challenges are never returned as active. |
| TODAY-002 | Explain the experience in under ten seconds. | Title, time estimate, skill-only disclosure, attempt rule, sponsor/reward status, and CTA appear without opening secondary screens. |
| TODAY-003 | Prioritize practice over sponsor placement. | Sponsor content never blocks the start action and appears after the practice value proposition. |
| TODAY-004 | Render truthful empty states. | No active challenge says when to check back; no funded sponsor means no sponsor or reward claim. |
| TODAY-005 | Reflect completion. | A wallet with a finalized attempt sees its result state and cannot start a second ranked attempt. |

### 9.3 Challenge engine

| ID | Requirement | Acceptance criteria |
|---|---|---|
| GAME-001 | Create the attempt on the server. | Attempt ID and `started_at` originate on the server. |
| GAME-002 | Return exactly five published questions for the MVP. | Correct answer, explanation, and scoring metadata are absent from the client payload before close. |
| GAME-003 | Preserve deterministic ordering. | The question and option order saved for the attempt is the order scored. |
| GAME-004 | Require one answer per question. | Incomplete or unknown question/option IDs are rejected without finalizing the attempt. |
| GAME-005 | Make submission idempotent. | Retrying the same submission cannot create a second result or alter the first finalized answer set. |
| GAME-006 | Enforce one ranked attempt per wallet per challenge. | A database uniqueness constraint—not only client logic—prevents duplicates. |
| GAME-007 | Handle expiry. | Attempts submitted after the permitted grace window become expired and cannot rank. |
| GAME-008 | Never trust client score or duration. | Client-submitted score, rank, correctness, or elapsed time fields are ignored or rejected. |

### 9.4 Scoring and leaderboard

| ID | Requirement | Acceptance criteria |
|---|---|---|
| SCORE-001 | Score accuracy first. | Score equals correct answers out of five. |
| SCORE-002 | Use server duration only as tie-breaker. | Ranking sorts score descending, duration ascending, then finalized timestamp ascending as the deterministic final fallback. |
| SCORE-003 | Show immediate current rank. | Result labels it `current rank` while the challenge is open. |
| SCORE-004 | Freeze final rank after close. | Final ranks are generated from eligible verified attempts and do not silently change afterward. |
| SCORE-005 | Exclude invalid states. | Started, expired, voided, and invalid attempts never appear in the ranked leaderboard. |
| SCORE-006 | Explain ranking. | The rules screen states accuracy-first scoring and all tie-breakers before play. |
| SCORE-007 | Protect privacy. | Public leaderboard shows a user-selected display name or truncated address, never hidden personal data. |

### 9.5 Daily Mark and progress

| ID | Requirement | Acceptance criteria |
|---|---|---|
| MARK-001 | Grow the Daily Mark once per completed challenge day. | Duplicate attempts or payout events cannot add segments. |
| MARK-002 | Calculate streak from verified completions. | Consecutive UTC challenge dates increase the current streak; skipped challenge dates break it. |
| MARK-003 | Preserve longest streak and total completions. | Values can be rebuilt from completion history and match the stored projection. |
| MARK-004 | Distinguish the Daily Mark visually from a generic flame. | The UI uses the approved segmented mark language across Today, Result, Progress, and share card. |
| MARK-005 | Keep reward and progress independent. | Ineligible or reward-free completions still count when the challenge attempt itself is valid. |

### 9.6 Campaigns and sponsor safeguards

| ID | Requirement | Acceptance criteria |
|---|---|---|
| CAMP-001 | Keep campaigns admin-seeded. | There is no public self-serve sponsor publishing route in P0. |
| CAMP-002 | Require verified funding before reward publication. | Unfunded or underfunded campaigns cannot expose reward amounts on Today. |
| CAMP-003 | Publish immutable challenge terms. | Scoring, allocations, eligibility, and campaign copy cannot be edited after the challenge opens; changes require cancellation/versioning. |
| CAMP-004 | Disclose funding and eligibility. | Sponsor name, `Sponsor-funded`, reward amounts, eligibility, review process, and geographic/age restrictions appear before play when applicable. |
| CAMP-005 | Separate sponsorship from scoring. | Sponsor records cannot alter answers, player score, or rank. |
| CAMP-006 | Protect player data. | Sponsors receive no player-level activity or wallet data without separate explicit consent. |
| CAMP-007 | Make sponsor action optional. | Sponsor CTA interaction is not required for ranking or normal progress unless a different future mechanic is separately designed and disclosed. |

### 9.7 Rewards

| ID | Requirement | Acceptance criteria |
|---|---|---|
| REWARD-001 | Use an explicit state machine. | Only valid transitions are possible; client labels map exactly to server states. |
| REWARD-002 | Allocate only after challenge close. | Open-challenge current rank cannot create a payable allocation. |
| REWARD-003 | Review suspicious attempts. | A flagged allocation cannot move to approved without a reviewer and recorded reason. |
| REWARD-004 | Prevent duplicate payment. | One allocation can reference at most one confirmed payout; retries do not send twice. |
| REWARD-005 | Verify the chain transaction. | Recipient, amount, network, and confirmation must match the allocation before `paid`. |
| REWARD-006 | Explain ineligibility. | The player receives a concise reason category and a support path; internal fraud rules need not be fully exposed. |
| REWARD-007 | Never say “won” early. | Before final allocation and review, UI uses `provisional`, `pending review`, or `not eligible`; never `won` or `paid`. |

### 9.8 Sharing and distribution

| ID | Requirement | Acceptance criteria |
|---|---|---|
| SHARE-001 | Generate a result card from verified data. | Card includes challenge date, score, Daily Mark, and optional sponsor—not an unverified reward claim. |
| SHARE-002 | Support mobile-native sharing with fallback. | Web Share API is used where available; downloadable image/copy-link fallback works. |
| SHARE-003 | Deep-link into Nimiq Pay. | Shared links have a normal landing fallback and a `nimiqpay://miniapp?url=...` open action. |
| SHARE-004 | Track distribution without invasive profiling. | Share and referral-source events are aggregate/product analytics; no sponsor-level wallet history is exposed. |

### 9.9 Admin

| ID | Requirement | Acceptance criteria |
|---|---|---|
| ADMIN-001 | Restrict admin access cryptographically. | Admin wallet allowlist plus signed session is enforced server-side. |
| ADMIN-002 | Create and validate challenges. | Publish is blocked unless there are exactly five valid questions, options, one correct answer each, explanations, rules, and open/close times. |
| ADMIN-003 | Preview before publish. | Operator can inspect the exact player-facing challenge and reward language. |
| ADMIN-004 | Protect published records. | Opened challenge questions and rules cannot be silently edited. |
| ADMIN-005 | Review attempts and allocations. | Operator sees reasoned flags, answer timing summary, wallet, rank impact, and audit history. |
| ADMIN-006 | Record every material action. | Publish, cancel, fund, approve, reject, pay, and void actions write append-only audit entries. |

---

## 10. Reward state machine

### 10.1 Campaign states

`draft → awaiting_funding → funding_submitted → funded → scheduled → live → closed`

Exceptional terminal states:

- `cancelled`
- `funding_invalid`
- `refunding`
- `refunded`

### 10.2 Player reward states

| Internal state | Player label | Meaning |
|---|---|---|
| `not_applicable` | No reward attached | Challenge has no funded reward campaign. |
| `provisional` | Provisional position | Challenge is still open; current rank is not final. |
| `pending_review` | Reward pending review | Final rank qualifies, but eligibility/fraud review is incomplete. |
| `approved` | Reward approved | Review passed; payout is queued for manual sending. |
| `payout_submitted` | Payment confirming | A transaction exists but has not passed server verification/confirmation. |
| `paid` | Paid | Matching Nimiq Mainnet transaction is confirmed. |
| `ineligible` | Ineligible | Published eligibility or integrity rules were not met. |
| `expired` | Reward expired | A published claim requirement expired. P0 should avoid claim steps where possible. |
| `voided` | Reward voided | Administrative correction with an auditable reason. |

No state may skip directly from `provisional` to `paid`.

---

## 11. Challenge and reward rules

Each challenge must publish a versioned rules snapshot before opening.

Required fields:

- challenge title and date;
- opening and closing timestamp in UTC;
- expected completion time;
- exactly five questions;
- one ranked attempt per wallet;
- score formula;
- complete tie-break order;
- attempt expiry/grace rule;
- answer publication timing;
- whether a funded reward exists;
- sponsor identity;
- allocations by final rank or score threshold;
- total funded reward in NIM and Luna;
- eligibility restrictions;
- anti-fraud and manual-review disclosure;
- estimated review/payout time;
- cancellation/refund policy;
- support contact.

Recommended launch reward mechanic:

- fixed NIM allocations for clearly named final ranks;
- no random draw;
- no player deposit;
- no variable pot;
- no outcome chosen by sponsor discretion;
- low values during early access;
- manual review before payment.

---

## 12. Fraud and fairness model

The MVP should be defensive enough to protect a small sponsor campaign without pretending to solve global Sybil resistance.

### 12.1 Authoritative controls

- signed wallet session;
- one finalized ranked attempt per `(challenge_id, wallet_address)`;
- single-use auth nonce;
- server-created start and submit timestamps;
- server-only correct answers;
- idempotent submission;
- immutable published rules;
- database constraints and transactions;
- final rank freeze;
- independent on-chain funding and payout verification.

### 12.2 Review signals

Signals may include:

- implausibly short perfect completion;
- repeated answer timing patterns across wallets;
- many wallets from one coarse abuse signal;
- malformed client sequence;
- repeated auth or submission failures;
- known compromised wallet/account pattern;
- evidence of answer leakage;
- operator conflict or campaign anomaly.

Signals create review flags. They must not automatically rewrite a valid score.

### 12.3 Optional device identifier

Nimiq Pay can provide a pseudonymous per-device identifier with user consent. It identifies a device, not a person, and must not be used as the primary user identity.

For P0:

- wallet address remains the user identity;
- device identifier is optional and deferred unless abuse during testing justifies it;
- refusal must not block the normal free challenge;
- any effect on reward review must be disclosed before play;
- raw device identifiers must never be shared with sponsors.

---

## 13. Data model

The table names may adapt to the chosen backend, but these entities and constraints are required.

### 13.1 Identity

#### `users`

- `id`
- `wallet_address` — unique, normalized Nimiq user-friendly address
- `public_key`
- `display_name` — optional, moderated
- `created_at`
- `last_seen_at`
- `terms_version`
- `terms_accepted_at`

#### `auth_nonces`

- `id`
- `wallet_address`
- `nonce_hash`
- `origin`
- `issued_at`
- `expires_at`
- `consumed_at`

#### `sessions`

- `id`
- `user_id`
- `token_hash`
- `expires_at`
- `revoked_at`
- `created_at`

### 13.2 Challenge content

#### `challenges`

- `id`
- `public_id`
- `challenge_date` — unique UTC date for active daily challenge
- `title`
- `context`
- `estimated_minutes`
- `status`
- `opens_at`
- `closes_at`
- `answer_release_at`
- `rules_version`
- `rules_snapshot`
- `published_at`
- `created_by`
- `created_at`

#### `questions`

- `id`
- `challenge_id`
- `position`
- `prompt`
- `explanation`
- `source_url` — required for factual ecosystem questions
- `created_at`

Unique constraint: `(challenge_id, position)`.

#### `question_options`

- `id`
- `question_id`
- `position`
- `label`
- `is_correct` — server-only

Exactly one correct option is required per question.

### 13.3 Attempts and scoring

#### `attempts`

- `id`
- `challenge_id`
- `user_id`
- `status`
- `started_at`
- `submitted_at`
- `duration_ms`
- `score`
- `current_rank`
- `final_rank`
- `submission_idempotency_key`
- `flag_status`
- `finalized_at`
- `voided_at`
- `void_reason`

Unique constraints:

- one ranked/finalized attempt per `(challenge_id, user_id)`;
- one `submission_idempotency_key` per user.

#### `attempt_question_order`

- `attempt_id`
- `question_id`
- `position`

#### `attempt_option_order`

- `attempt_id`
- `question_id`
- `option_id`
- `position`

#### `answers`

- `attempt_id`
- `question_id`
- `selected_option_id`
- `is_correct`
- `received_at`

### 13.4 Progress

#### `daily_completions`

- `user_id`
- `challenge_id`
- `challenge_date`
- `attempt_id`
- `completed_at`

Unique constraint: `(user_id, challenge_date)`.

#### `progress_projections`

- `user_id`
- `current_streak`
- `longest_streak`
- `total_completions`
- `last_completion_date`
- `updated_at`

This table is a rebuildable projection. `daily_completions` is the source of truth.

### 13.5 Campaign funding

#### `campaigns`

- `id`
- `public_id`
- `challenge_id`
- `sponsor_name`
- `sponsor_message`
- `sponsor_url`
- `status`
- `treasury_address`
- `expected_funding_luna`
- `funding_reference`
- `eligibility_snapshot`
- `allocation_snapshot`
- `created_by`
- `created_at`

#### `funding_transactions`

- `id`
- `campaign_id`
- `tx_hash` — unique
- `sender_address`
- `recipient_address`
- `value_luna`
- `data`
- `network`
- `block_height`
- `confirmation_status`
- `verified_at`
- `verification_payload`

### 13.6 Rewards and payouts

#### `reward_allocations`

- `id`
- `campaign_id`
- `challenge_id`
- `user_id`
- `attempt_id`
- `final_rank`
- `amount_luna`
- `status`
- `review_reason_code`
- `review_note`
- `reviewed_by`
- `reviewed_at`
- `created_at`

Unique constraint: one allocation per `(campaign_id, user_id)`.

#### `payout_transactions`

- `id`
- `reward_allocation_id` — unique
- `tx_hash` — unique
- `sender_address`
- `recipient_address`
- `value_luna`
- `network`
- `block_height`
- `confirmation_status`
- `submitted_at`
- `verified_at`
- `verification_payload`

### 13.7 Operations

#### `audit_events`

- `id`
- `actor_type`
- `actor_user_id`
- `action`
- `entity_type`
- `entity_id`
- `reason`
- `before_hash`
- `after_hash`
- `created_at`

#### `product_events`

- `id`
- `user_id` — nullable
- `anonymous_session_id` — nullable
- `event_name`
- `challenge_id` — nullable
- `campaign_id` — nullable
- `properties`
- `created_at`

Analytics must not contain correct answers, private authentication material, or unnecessary full wallet histories.

---

## 14. API contract

Exact paths may adapt to the existing stack. The trust boundary may not.

### 14.1 Public/read endpoints

- `GET /api/app/status`
- `GET /api/challenges/today`
- `GET /api/challenges/:id/rules`
- `GET /api/challenges/:id/leaderboard`
- `GET /api/challenges/:id/answers` — only after `answer_release_at`

### 14.2 Authentication

- `POST /api/auth/nonce`
- `POST /api/auth/verify`
- `POST /api/auth/logout`
- `GET /api/auth/session`

### 14.3 Player

- `POST /api/challenges/:id/attempts`
- `GET /api/attempts/:id`
- `POST /api/attempts/:id/submit`
- `GET /api/me/progress`
- `GET /api/me/rewards`
- `POST /api/share-events`
- `POST /api/sponsor-clicks`

### 14.4 Funding

- `POST /api/admin/campaigns/:id/funding-intent`
- `POST /api/admin/campaigns/:id/funding-transactions`
- `GET /api/admin/campaigns/:id/funding-status`

### 14.5 Admin

- `POST /api/admin/challenges`
- `PATCH /api/admin/challenges/:id`
- `POST /api/admin/challenges/:id/publish`
- `POST /api/admin/challenges/:id/cancel`
- `POST /api/admin/campaigns`
- `PATCH /api/admin/campaigns/:id`
- `POST /api/admin/rewards/allocate`
- `POST /api/admin/rewards/:id/review`
- `POST /api/admin/rewards/:id/payout-intent`
- `POST /api/admin/rewards/:id/payout-transactions`

### 14.6 Error contract

Every API error returns:

- stable error code;
- human-safe message;
- retryability boolean;
- request ID;
- field errors where applicable.

Required errors include:

- `NOT_IN_NIMIQ_PAY`
- `PROVIDER_UNAVAILABLE`
- `CONSENSUS_UNAVAILABLE`
- `WALLET_PERMISSION_DENIED`
- `AUTH_NONCE_EXPIRED`
- `AUTH_SIGNATURE_INVALID`
- `CHALLENGE_NOT_OPEN`
- `CHALLENGE_CLOSED`
- `ATTEMPT_ALREADY_EXISTS`
- `ATTEMPT_EXPIRED`
- `SUBMISSION_INVALID`
- `CAMPAIGN_NOT_FUNDED`
- `TRANSACTION_NOT_FOUND`
- `TRANSACTION_MISMATCH`
- `TRANSACTION_UNCONFIRMED`
- `REWARD_NOT_PAYABLE`
- `RATE_LIMITED`

---

## 15. Technical architecture

The PRD does not force a frontend framework change. The existing UI shell should be preserved unless its stack prevents the Nimiq SDK from running correctly in a mobile WebView.

### 15.1 Required components

1. **Mini App client**
   - existing mobile-first UI;
   - Nimiq Mini App SDK;
   - session-aware API client;
   - no embedded correct answers or service credentials.

2. **Application API**
   - authentication and session verification;
   - challenge publication;
   - attempt lifecycle;
   - scoring/ranking;
   - progress calculations;
   - campaign/reward workflows;
   - rate limits and audit logging.

3. **Production database**
   - relational transactions;
   - uniqueness constraints;
   - protected server-only writes;
   - migrations in source control;
   - backups and point-in-time recovery where available.

4. **Nimiq Mainnet verification adapter**
   - reads transactions from a configured official/compatible RPC or indexer;
   - verifies hash, network, addresses, Luna value, data, and confirmation;
   - stores normalized verification evidence;
   - retries safely.

5. **Operator console**
   - signed admin authentication;
   - challenge/campaign controls;
   - review and payout flow;
   - audit visibility.

### 15.2 Suggested deployment pattern

- frontend and same-origin API on the existing deployment platform;
- managed Postgres/Supabase for production data if not already selected;
- scheduled server job for challenge close, rank freeze, funding recheck, and payout confirmation;
- error monitoring with source maps protected;
- privacy-conscious product analytics;
- environment-specific secrets held by the platform, never committed.

### 15.3 No-mock production rule

The production application must not contain:

- hardcoded leaderboard rows;
- hardcoded wallet accounts;
- fabricated streaks;
- random scores;
- pretend transaction hashes;
- sponsor names presented as active without an authorized campaign;
- reward values without verified funding;
- `setTimeout`-based fake confirmations;
- testnet data mixed into mainnet views;
- fallback challenge objects that look live after an API failure.

Static production seed content is permitted when it is an intentionally published challenge stored in the production database. “Seeded” is not the same as “mock.”

---

## 16. Security, privacy, and compliance

### 16.1 Security requirements

- Never request, transmit, or store a user’s private key.
- Never commit admin credentials, database service keys, API secrets, or treasury material.
- Keep service-role database access server-only.
- Use secure, HTTP-only, same-site cookies for sessions where supported.
- Bind signed auth messages to the Arete origin and expiry.
- Consume nonces exactly once.
- Apply request-rate limits to nonce, attempt start, submit, share, and admin endpoints.
- Validate all identifiers and payload sizes server-side.
- Use transactions/row locks around first-attempt creation and final submission.
- Enforce admin authorization in every admin API route.
- Record security-sensitive admin actions in append-only audit events.
- Redact signatures, session tokens, and provider payload secrets from logs.
- Verify mainnet transactions independently; never trust client-parsed transaction data.
- Cap reward amounts in the application and require a second human check above a configured threshold.

### 16.2 Privacy requirements

The privacy notice must explain:

- that a Nimiq address is used as the account identifier;
- what challenge, score, rank, and progress records are stored;
- what appears publicly on the leaderboard;
- what analytics are collected;
- whether an optional device identifier is requested and why;
- that sponsors receive aggregate reporting only by default;
- how long records are retained;
- how a user requests deletion of off-chain profile data;
- which records must remain for fraud, payout, audit, or legal purposes.

No sponsor receives a list of player wallet addresses.

### 16.3 Contest-safety boundaries

Arete must maintain:

- no paid entry;
- no pooled player funds;
- no random reward selection;
- no misleading reward claim;
- published deterministic rules;
- sponsor-funded rewards;
- skill-based ranking;
- visible eligibility and review;
- clear disclosure of all user data collection;
- MIT-licensed public repository;
- properly attributed question sources and third-party assets.

Legal availability of the name, reward mechanic, and regional eligibility still requires appropriate review before scaling beyond a small contest release.

---

## 17. UX and content requirements

### 17.1 Voice

Use:

- practice;
- progress;
- complete;
- skill;
- mark;
- streak;
- sponsor-funded;
- eligible;
- verified;
- current rank;
- final rank.

Avoid:

- bet;
- wager;
- jackpot;
- prize pool;
- earn big;
- moon;
- alpha;
- grind;
- winner-take-all;
- “you won” before final review;
- “instant payout” unless it is consistently true.

### 17.2 Required core copy

| Moment | Copy |
|---|---|
| Hero | **Make today count.** |
| Support | One quick daily challenge. A stronger reason to open Nimiq Pay tomorrow. |
| Primary CTA | **Start today’s challenge** |
| Rules line | Free to play · Skill only · One ranked attempt |
| Sponsor label | Sponsor-funded · eligibility applies |
| Completion | Today’s practice is complete. |
| Daily Mark | Your Daily Mark is growing. |
| Review | Reward pending review |
| Return | Come back tomorrow to continue your mark. |

### 17.3 Mandatory interface states

Every data-bearing screen needs:

- initial loading;
- slow network;
- empty;
- retryable error;
- non-retryable error;
- offline;
- permission denied;
- session expired;
- stale-data refresh;
- success.

Challenge-specific states:

- not yet open;
- already completed;
- attempt in progress;
- submission processing;
- duplicate submission retry;
- attempt expired;
- challenge closed during attempt;
- result finalized.

Transaction-specific states:

- awaiting wallet approval;
- permission denied;
- submitted;
- not found yet;
- confirming;
- mismatch;
- confirmed;
- verification failed.

### 17.4 Accessibility

- touch targets at least 44×44 CSS pixels;
- readable at 320 CSS pixels width;
- no information conveyed by color alone;
- correct labels and field associations;
- visible focus state;
- screen-reader announcement for question changes, submission, score, and transaction state;
- reduced-motion support;
- contrast that meets WCAG AA;
- no timer animation that creates pressure when time is only a tie-breaker.

---

## 18. Analytics and success metrics

### 18.1 Core funnel events

- `miniapp_opened`
- `provider_ready`
- `wallet_connect_started`
- `wallet_connect_completed`
- `wallet_connect_denied`
- `today_viewed`
- `challenge_started`
- `question_answered`
- `challenge_submitted`
- `challenge_completed`
- `result_viewed`
- `leaderboard_viewed`
- `share_started`
- `share_completed`
- `sponsor_cta_clicked`
- `returned_next_day`
- `funding_started`
- `funding_verified`
- `reward_allocated`
- `reward_reviewed`
- `payout_verified`
- `product_error`

### 18.2 Product metrics

Primary:

- daily wallet-connected challenge completions.

Retention:

- Day-2 return rate;
- Day-7 active return rate when enough time exists;
- streak continuation rate.

Experience:

- Today-to-start conversion;
- start-to-completion rate;
- median completion time;
- wallet permission denial rate;
- submission error rate;
- provider initialization failure rate.

Trust and rewards:

- funded campaigns;
- provisional-to-approved allocation rate;
- review turnaround time;
- approved-to-paid time;
- suspicious attempt rate;
- transaction verification failure rate.

Distribution:

- share-card use;
- deeplink opens;
- community tester count;
- sponsor CTA interaction;
- source of first session.

### 18.3 MVP targets

Targets should be calibrated after early access, but the first operating goals are:

- at least 90% of started attempts complete;
- median challenge completion under two minutes;
- at least 95% of valid submissions finalize without manual intervention;
- zero false `paid` states;
- zero duplicate payouts;
- zero production mock records;
- at least 20 distinct real Nimiq Pay testers before final judging;
- qualitative feedback from at least five returning testers;
- measurable Day-2 return, not merely first-day opens.

---

## 19. Build order

This order is optimized for speed and dependency safety. Each milestone should be implemented and verified before the next prompt begins.

### B0 — Reality audit and scope lock

**Goal:** Map the existing UI shell to this PRD without rebuilding working design.

Deliver:

- route/component inventory;
- existing stack and deployment audit;
- current mock/static data inventory;
- mapping from each UI element to a real API field;
- confirmed production database choice;
- environment variable inventory;
- explicit list of P0 screens;
- installation of the official Nimiq Mini Apps AI skill:
  `npx skills add nimiq/developer-center --skill mini-apps`.

Exit criteria:

- no unknown mock source remains;
- no broad rewrite is planned;
- current lint/type/build commands pass before integration.

### B1 — Nimiq Pay foundation and signed session

**Goal:** Establish a real Nimiq Pay identity and mainnet-ready provider layer.

Deliver:

- SDK initialization;
- environment detection;
- consensus check;
- account permission flow;
- nonce/signature authentication;
- secure session;
- connected/disconnected/denied/expired UI;
- deeplink fallback outside Nimiq Pay.

Exit criteria:

- a real Nimiq Pay user can authorize and refresh without becoming a fake/demo user;
- replayed nonce and invalid signature tests fail;
- no private key enters the app.

### B2 — Production data foundation and admin challenge publishing

**Goal:** Replace challenge fixtures with real database content.

Deliver:

- migrations for identity, challenges, questions, options, and audit events;
- protected admin auth;
- challenge create/edit/preview/publish;
- exactly-five-question validation;
- immutable rules snapshot;
- Today API;
- one real published production challenge.

Exit criteria:

- deleting frontend constants does not remove the challenge;
- unpublished correct answers never appear in public API payloads;
- no active challenge produces a truthful empty state.

### B3 — Attempt engine and server scoring

**Goal:** Make the main daily loop fully real.

Deliver:

- server attempt creation;
- question/option order snapshot;
- attempt expiry;
- idempotent submit;
- server scoring and duration;
- one-ranked-attempt constraint;
- result API;
- full challenge state handling.

Exit criteria:

- two concurrent start/submit requests cannot create two ranked attempts;
- altering client score/time has no effect;
- refresh and network retry do not lose or duplicate a finalized result.

### B4 — Leaderboard, Daily Mark, and result sharing

**Goal:** Complete the repeat and distribution loop.

Deliver:

- current leaderboard;
- final rank freeze job;
- daily completions;
- streak projection;
- Progress screen;
- result card from verified data;
- Web Share/download/link fallback;
- Nimiq Pay deeplink.

Exit criteria:

- leaderboard rows reconcile with verified attempts;
- streak can be rebuilt from completion history;
- share card cannot claim an unverified reward.

### B5 — Campaign funding on Nimiq Mainnet

**Goal:** Make sponsor funding real before adding player reward promises.

Deliver:

- campaign/funding migrations;
- draft campaign admin flow;
- funding intent;
- `sendBasicTransactionWithData`;
- transaction hash submission;
- independent mainnet verification;
- funded/unfunded/mismatch/confirming states;
- publication gate.

Exit criteria:

- wrong recipient, value, data, network, or hash never funds a campaign;
- a verified real mainnet transaction can move a campaign to `funded`;
- reward copy is absent for unfunded campaigns.

### B6 — Reward allocation, review, and real payout

**Goal:** Close the financial loop safely.

Deliver:

- final allocation job;
- reward state machine;
- flag/review console;
- admin approval;
- operator payout intent;
- real NIM payout request;
- independent payout verification;
- player Rewards screen;
- duplicate payout protection.

Exit criteria:

- only final eligible attempts receive allocations;
- only verified matching transactions become `paid`;
- one allocation cannot be paid twice;
- all decisions have reviewer and audit evidence.

### B7 — Hardening, observability, and submission

**Goal:** Make the product dependable on a judge’s first attempt.

Deliver:

- rate limits;
- error monitoring;
- privacy-conscious analytics;
- mobile/WebView QA;
- offline and slow-network QA;
- accessibility pass;
- production smoke test;
- privacy/rules/terms;
- MIT license;
- setup and architecture README;
- environment example without secrets;
- 250-word submission copy;
- short demo video;
- build-in-public evidence and tester feedback.

Exit criteria:

- first-time tester completes the loop without assistance;
- all P0 acceptance tests pass;
- public repo has no secrets;
- live production uses no mock data;
- mainnet funding/payout evidence is documented without exposing sensitive material.

---

## 20. Test and acceptance plan

### 20.1 Unit tests

- Luna/NIM conversion;
- auth message serialization;
- nonce expiry and consumption;
- signature verification adapter;
- challenge publication validation;
- score calculation;
- tie-break order;
- streak calculation;
- reward state transitions;
- funding/payout transaction matching;
- public wallet truncation;
- rules snapshot hashing/versioning.

### 20.2 Integration tests

- connect → authenticate → refresh session;
- publish → load Today;
- start → answer → submit → result;
- concurrent duplicate attempt;
- repeated submit with same idempotency key;
- challenge closes during attempt;
- final rank freeze;
- Daily Mark rebuild;
- funding submitted → confirming → funded;
- wrong funding value/address/reference;
- allocation → review → payout submitted → paid;
- wrong payout recipient/value;
- admin authorization denial.

### 20.3 Nimiq Pay device tests

Test on supported iOS and Android Nimiq Pay versions:

- first account permission;
- permission denial and retry;
- native signature confirmation;
- app background/foreground during a challenge;
- wallet approval cancellation;
- slow consensus;
- slow network;
- deeplink open;
- share sheet;
- real low-value mainnet funding;
- real low-value mainnet payout.

### 20.4 Production smoke test

Use a low-value, clearly labeled production challenge and campaign:

1. publish the challenge;
2. fund it with a small real NIM transaction;
3. verify the campaign on-chain;
4. complete from a non-admin Nimiq Pay wallet;
5. close/finalize;
6. approve one low-value allocation;
7. pay it through the operator wallet;
8. verify the payout;
9. confirm `paid` on the player screen;
10. reconcile database records with both transaction hashes.

### 20.5 Definition of done

Arete is P0-complete only when:

- a real user opens it inside Nimiq Pay;
- authorizes a real Nimiq account;
- loads a real published challenge;
- completes exactly one ranked attempt;
- receives a server-verified score and rank;
- grows a database-backed Daily Mark;
- returns to a truthful completed state after refresh;
- sees no fabricated sponsor or reward;
- can view a verified funded campaign when one exists;
- can receive a real, independently verified NIM payout after approval;
- sees accurate reward status throughout;
- can share a result that contains no false financial claim;
- encounters useful error states instead of broken screens;
- passes mobile, security, accessibility, and production smoke checks;
- ships from a public MIT-licensed repository with no secrets or production mocks.

---

## 21. Manual actions required from the builder

These actions cannot be responsibly hidden inside an implementation prompt:

1. Confirm whether Arete targets Cycle I or Cycle II. The published Cycle I end date is 30 July 2026.
2. Install/update Nimiq Pay on a real phone and create or select:
   - one player wallet;
   - one separate operator/treasury wallet.
3. Fund the operator wallet with a small amount of real NIM for smoke testing and rewards.
4. Never paste a wallet recovery phrase or private key into chat, source code, `.env.example`, screenshots, or logs.
5. Install the official Nimiq Mini Apps skill in the actual project. The attached `SKILL.md` is a brand-naming guide and is not the framework skill.
6. Confirm the production hosting domain before final auth-message/origin locking.
7. Create the production database/project and provide secrets only through the hosting platform’s secure environment settings.
8. Write and approve the first seven daily challenges, including factual sources and explanations.
9. Decide the first real campaign:
   - sponsor name;
   - sponsor authorization;
   - funding amount;
   - allocations;
   - eligibility;
   - review and payout timing.
10. Review privacy, contest, trademark, reward, tax, and regional eligibility language appropriate to the release.
11. Recruit real testers and test inside Nimiq Pay—not only in a desktop browser.
12. Register/submit through the official competition process and maintain the public repository, MIT license, submission copy, demo, and community updates.

---

## 22. Contest alignment

### Design and UX

- existing full UI shell preserved and connected to real states;
- under-60-second onboarding;
- mobile-first Nimiq Pay experience;
- clear hierarchy and disclosures;
- complete loading/error/permission states;
- accessible touch and text behavior.

### Functionality

- real provider integration;
- signed wallet session;
- deterministic server scoring;
- real leaderboard and Daily Mark;
- real mainnet sponsor funding;
- real verified reward payout;
- dependable performance and error handling.

### Usefulness and originality

- gives Nimiq Pay a repeat-use daily habit;
- combines learning, wallet identity, progress, sponsor discovery, and NIM settlement;
- remains useful without a reward;
- avoids generic paid trivia and chance mechanics.

### Marketing and distribution

- built-in share card;
- Nimiq Pay deeplink;
- measurable tester acquisition;
- build-in-public progress;
- community testing and feedback;
- clear product story: wallets need a reason to be reopened.

### NIM bonus

NIM is integral to:

- sponsor campaign funding;
- reward payout;
- Nimiq wallet identity and signed sessions;
- verifiable settlement records.

---

## 23. Risks and decisions

| Risk | Decision |
|---|---|
| Rushed treasury automation exposes funds | Use manual operator-approved payouts for P0; verify on-chain afterward. |
| Trivia feels generic | Use one useful Nimiq/merchant practice with sources, explanation, Daily Mark, and ecosystem action. |
| Reward framing resembles gambling | No entry fee, pool, randomness, or chance; fixed published skill allocations only. |
| Sponsor money is promised before arrival | Publication gate requires verified funding. |
| Client manipulates score/time | Server owns start, submit, answers, score, duration, and ranking. |
| Multiple wallets bypass one-attempt rule | Accept that wallet uniqueness is not personhood; use low-value rewards, review signals, and optional consented device signal later. |
| Speed tie-break disadvantages poor networks | Accuracy dominates; server duration is only a tie-breaker and suspiciously close results can share non-financial recognition. |
| Daily UTC boundary confuses users | Display local-language date plus an explicit UTC closing time/countdown. |
| Mainnet testing costs real funds | Use very small disclosed smoke-test amounts and separate wallets. |
| No sponsor is ready | Launch a reward-free challenge; never fabricate a sponsor. |
| Cycle I deadline is immediate | Treat Cycle II as the safe target unless submission eligibility is already secured. |

---

## 24. Open decisions before B5

These do not block B0–B4:

1. First sponsor identity and written authorization.
2. Treasury wallet address.
3. Minimum confirmation policy for funding and payout.
4. Initial reward amount and allocation shape.
5. Countries/ages eligible for the first reward.
6. Review turnaround commitment.
7. Whether final equal score/duration ties split an allocation, share a rank, or use finalized timestamp.

Recommended P0 decision for item 7: use finalized timestamp as a deterministic third tie-breaker, disclose it before play, and keep reward amounts small.

---

## 25. Source references

Product sources:

- `arete-product-idea.md`
- `arete-PRD.md`
- `brand-messaging(1).md`
- `Nimiq Miniapps Build Contest Brief.pdf`

Official live references checked on 30 July 2026:

- [Nimiq Mini Apps overview](https://nimiq.dev/mini-apps/)
- [Nimiq Mini Apps API reference](https://nimiq.dev/mini-apps/api-reference/)
- [Nimiq Provider API](https://nimiq.dev/mini-apps/api-reference/nimiq-provider)
- [Nimiq Pay device identifier](https://nimiq.dev/mini-apps/features/device-identifier)
- [Official Nimiq Mini Apps AI skill installation](https://nimiq.dev/mini-apps/development/build-with-ai)
- [Competition rules](https://miniappscompetition.com/rules)
- [Competition scoring](https://miniappscompetition.com/scoring)

---

## Final product statement

> Arete is one useful daily practice, one visible mark of progress, and one real reason to return to Nimiq Pay tomorrow.
