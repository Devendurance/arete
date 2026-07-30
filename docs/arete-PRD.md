# Arete Product Requirements Document

**Product:** Arete  
**Tagline:** Make today count.  
**Category:** Sponsor-funded daily skill challenge for Nimiq Pay.

## Strategic additions

This version sharpens the MVP around a single product promise: **give users a reason to return tomorrow.**

### Updated P0 definition

A real user can:

1. Open Arete inside Nimiq Pay.
2. Understand today’s challenge, rules, time estimate, sponsor and reward conditions in under ten seconds.
3. Complete one five-question deterministic quiz in under two minutes.
4. Receive a server-verified Earned Record: score, rank, elapsed time, archive count and shareable result.
5. Understand whether any sponsor-funded reward is pending review, approved, paid or ineligible.
6. Return the next day to add a new entry to the record.

## Product experience requirements

### Today’s Practice

The landing screen must prioritise today’s practice over leaderboard and reward content. Required hierarchy:

- `TODAY · ~2 MINUTES · SKILL ONLY` label;
- challenge title and useful learning/action context;
- concise published rules;
- sponsor-funded disclosure and eligibility link;
- current archive count / most recent record;
- **Start today’s challenge** primary CTA.

### The Earned Record

A proprietary, wallet-linked record generated after every verified challenge. It stores and displays daily index, subject, score, elapsed time, rank, archive count and reward state. The repeated **Record Strip** is the visual memory asset; it must not resemble generic streak, flame or progress-ring UI.

### Result and rewards

- Score and rank appear immediately after server validation.
- Reward state is always explicit: `pending review`, `approved`, `paid`, `ineligible`, or `expired`.
- The UI must never call a reward “won” before verification.
- Share cards include score, Record Strip data and optional sponsor context; they never imply monetary value not yet paid.

## Sponsor safeguards

- Sponsor card appears after the daily value proposition and before/after the practice—not as an interstitial.
- Every campaign includes sponsor name, message, sponsor-funded disclosure, reward rules and opt-in CTA.
- Sponsors cannot alter scoring rules after challenge publication.
- No sponsor receives player-level activity data without explicit consent.
- For Cycle 1, campaigns remain admin-seeded; self-serve sponsor tooling is deferred.

## Scoring and fraud

- Accuracy is the primary score; verified completion duration is tie-breaker only.
- Server creates start timestamp and calculates score/duration.
- First verified submission per wallet is the ranked attempt.
- Flag impossible duration, duplicate answer timing patterns and suspiciously fast perfect scores for review.
- Keep audit records sufficient to explain rank, reward and review decision.

## Cycle 1 exclusions

Do not add multiple game types, team leagues, referrals, paid entries, prize pools, automated high-value rewards, self-serve sponsors, or complex reward currencies before the core daily loop works with real testers.

## Design/voice requirements

Use the companion `DESIGN.md` and `brand-messaging.md`:

- visual territory: **The Earned Record**;
- brand essence: **Excellence leaves a record**;
- primary CTA: **Start today’s challenge**;
- prohibited language: bet, wager, jackpot, prize pool, winner-take-all, crypto grind;
- required disclosure: **Free to play · Skill only · Sponsor-funded**.

## Success metrics

North star: **daily wallet-connected challenge completions**.

Track Day-2 return, completion rate, median completion time, streak continuation, share-card use, sponsor CTA interaction, reward review rate, suspicious attempt rate and community tester feedback.

## Definition of done

Arete is submission-ready only when a real Nimiq Pay user can complete the full daily loop cleanly on mobile, understand sponsorship/reward conditions, trust the score, see progress, and have a clear reason to return tomorrow.