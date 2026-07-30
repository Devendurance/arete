---
version: alpha
name: Arete
description: "The Earned Record — a premium daily-practice Mini App for Nimiq Pay, built as an accumulating record of verified skill."
colors:
  primary: "#17191C"
  background: "#F7F3EA"
  surface: "#FFFDF8"
  ink: "#17191C"
  muted: "#68665E"
  action-cobalt: "#284B9B"
  action-cobalt-hover: "#1F3A78"
  record-slate: "#5A6A80"
  proof-green: "#3B6B55"
  review-bronze: "#A46E2A"
  correction-red: "#B64A42"
  edge: "#D8D3C8"
typography:
  display:
    fontFamily: "Bricolage Grotesque, General Sans, Inter, sans-serif"
    fontSize: 6.5rem
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "Bricolage Grotesque, General Sans, Inter, sans-serif"
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 450
    lineHeight: 1.5
  proof:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.45
rounded:
  control: 32px
  input: 32px
  card: 16px
  badge: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.action-cobalt}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    padding: 8px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.action-cobalt-hover}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    padding: 8px
    height: 40px
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: 8px
    height: 40px
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: 32px
  record-highlight:
    backgroundColor: "{colors.ink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.card}"
    padding: 40px
---

## Overview

Arete is a sponsor-funded daily skill challenge inside Nimiq Pay. It should not look like a crypto game, a generic learning app, or a dark DeFi dashboard. Its visual territory is **The Earned Record**:

> **Excellence leaves a record.**

A completed challenge becomes a precise, retained record of what the player demonstrated: edition, subject, score, time, rank, and verification state. The visual system is an editorial archive of skill—not a set of gamification widgets.

This adapts the supplied Injective system’s useful mechanics: generous whitespace, 12-column grid, pill controls, 16px cards, spacious 32px card padding, clear interaction states, scalable responsive cards, and high-focus feature containers. The source’s black DeFi shell, electric-blue/lime palette, ABC Marist/TT Commons type direction, glow-like futurism, and blockchain-infrastructure visual codes are replaced completely.

## Colors

### Palette

| Role | Name | HEX | Use |
|---|---|---:|---|
| Primary dark | Archive Ink | `#17191C` | Headline, navigation, high-focus surface, record frame |
| Background | Paper Field | `#F7F3EA` | Main application field; never gradient |
| Card surface | Clean Stock | `#FFFDF8` | Challenge, archive and detail surfaces |
| Primary signal | Practice Cobalt | `#284B9B` | Start action, selected answer, active Scoreline mark |
| Active signal | Deep Practice | `#1F3A78` | Hover, pressed and selected-action state |
| Information | Record Slate | `#5A6A80` | Rank context, time, archive metadata |
| Verified | Proof Green | `#3B6B55` | Confirmed score, completed record and paid reward only |
| Review | Review Bronze | `#A46E2A` | Sponsor reward eligibility or pending review |
| Error | Correction Red | `#B64A42` | Failed/invalid attempt or ineligible reward |
| Supporting text | Paper Grey | `#68665E` | Rules, descriptions and secondary labels |
| Border | Record Edge | `#D8D3C8` | Dividers, quiet boundaries and subtle containers |

### Colour rules

- Practice Cobalt means **do the practice now**. It is limited to the main CTA, selected-answer state and one Scoreline mark.
- Proof Green means something is verified—not merely positive.
- Review Bronze means an eligibility condition needs inspection. It is never a reward substitute.
- Sponsor colours remain contextual and must never take over the global application shell.
- Keep the interface 80% Paper Field, Clean Stock and Archive Ink. The expressive colour is deliberate, not wallpaper.
- Do not use electric purple, lime, neon, crypto-green, gradients, glow, token rain, multicolour answer choices, or dark glassmorphism.

## Typography

| Role | Typeface | Use |
|---|---|---|
| Display / earned outcome | **Bricolage Grotesque** | Daily challenge question, `05 / 05`, campaign headline and result rank |
| Interface / body | **Inter** | Inputs, answer options, rules, sponsor context and navigation |
| Proof / archive data | **IBM Plex Mono** | Edition, scoreline, elapsed time, rank, date, wallet fragment and review state |

### Hierarchy

| Role | Font | Desktop | Mobile | Behaviour |
|---|---|---:|---:|---|
| Display 1 | Bricolage Grotesque | 104px | 56px | Hero statement or decisive score only |
| Display 2 | Bricolage Grotesque | 64px | 40px | Section and result title |
| Heading 3 | Bricolage Grotesque | 24px | 20px | Challenge/card title |
| Body | Inter | 16px | 16px | UI and readable explanatory copy |
| Proof | IBM Plex Mono | 13px | 12px | All record data; tabular numbers preferred |
| Micro label | Inter | 12px | 11px | Tracked metadata only |

### Type rule

The most important proof must be the clearest element after a challenge:

```text
05 / 05
ARETE / 024 · NIMIQ SAFETY · 01:34 · RANK 012
```

The score is human. The Scoreline is evidence.

## Layout

Keep the Injective reference layout discipline:

- 12-column responsive grid;
- 1440px maximum desktop container;
- 24px side margins;
- 72px desktop hero rhythm, stepping down to 48px and 32px;
- 32px card padding and 24px grid gaps;
- three cards desktop, two tablet, one mobile where cards are genuinely required.

### Hero

The hero remains a two-part composition, but it is not a blockchain product claim.

**Left:** `↗ DAILY PRACTICE FOR NIMIQ PAY`, headline, concise explanation, Start / Explore Archive CTA pair, then one Scoreline.

**Right:** a single art-directed **Earned Record** object: an oversized, tactile paper score record with a cropped edge, Archive Ink frame, one Practice Cobalt answer/verification mark, and precise printed metadata. One compact overlay may state:

```text
TODAY / 024
5 QUESTIONS · ~2 MINUTES
```

No generic app mockup floating in 3D space. No tokens, charts, chains, or abstract network graphics.

### Main product surface: Today’s Record

The first screen is an unfinished record awaiting evidence:

1. Edition and date.
2. Challenge subject and question.
3. Time estimate and skill-only rules.
4. Sponsor support as a factual footnote.
5. Answer selection / start action.
6. On completion: score, time, rank and verified state are printed into the record.

### Core visual asset: The Scoreline

```text
ARETE / 024  →  NIMIQ SAFETY  →  05 / 05  →  01:34  →  RANK 012
```

It appears in the hero, result, archive, leaderboard, share-card and sponsor summary. It is a recording device, never a decorative chart or a generic progress bar.

## Elevation & Depth

Keep Injective’s disciplined elevation scale but switch to cream/ink context.

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow | Editorial text, Scoreline and rules |
| Subtle | `0 2px 4px rgba(23,25,28,.08)` | Inactive/secondary element |
| Base | `0 8px 24px rgba(23,25,28,.10)` | Standard archive card |
| Medium | `0 12px 32px rgba(23,25,28,.14)` | Featured result or current challenge surface |
| High | `0 16px 48px rgba(23,25,28,.18)` | Modal or floating record overlay |

No colour shadows, glow, glass blur, or exaggerated lift. A completed record has authority through contrast, typography, and structure—not animation.

## Shapes

Retain the Injective component geometry:

- 32px radius for buttons and inputs;
- 16px radius for cards and feature containers;
- full-round only for short state labels;
- no radius under 12px for contained elements.

The Earned Record may use one deliberate cut/cropped corner in hero artwork only. Do not repeat it across everyday UI.

## Components

### Primary button

Keep Injective’s 40px pill geometry and calm interaction timing. Replace primary blue with Practice Cobalt.

- Label: Inter 16px, medium weight.
- Examples: `Start today’s challenge`, `Submit record`.
- Hover: Deep Practice; subtle `translateY(-1px)` maximum.
- Never use reward language as a primary action.

### Secondary button

Keep the ghost-button role but place it on Paper Field with a 1.5px Record Edge outline and Archive Ink text.

- Examples: `Explore your archive`, `See today’s rules`.
- Hover: quiet Cobalt tint, never bright fill.

### Challenge answer

An answer is a full-width Clean Stock row, not a colourful quiz card.

- Left: answer index in Plex Mono.
- Middle: answer text in Inter.
- Right: empty/select state.
- Selected: one 3px Practice Cobalt rule and focused outline.
- Correctness remains hidden until the published reveal point when rules require it.

### Earned Record card

A 16px-radius Archive Ink or Clean Stock feature container with the score in Bricolage and the Scoreline in Plex Mono. Required elements:

- daily edition/date;
- subject;
- score;
- elapsed time;
- rank/provisional rank;
- verified/review state;
- optional share action.

### Sponsor context

Use a compact factual record line below the question—not a feature card:

```text
SUPPORTED BY [SPONSOR] · FREE TO PLAY · ELIGIBILITY APPLIES
```

Sponsor context cannot be more visually prominent than the daily challenge or score.

## Do's and Don'ts

### Do

- Make the result feel retained: a player should want to build an archive of records.
- Use score, time, rank, date and edition as visual texture.
- Keep the Scoreline consistent enough to become recognisable without a logo.
- Let the daily question and earned score dominate sponsor/reward content.
- Show sponsor-funded and reward-review conditions in precise language.
- Preserve strong responsive layout, obvious focus states and 44px minimum touch targets.

### Don't

- Do not use generic streak dots, progress rings, flames, trophies, coin piles, confetti, game HUDs, bright quizzes, or leaderboard-first layouts.
- Do not inherit Injective’s black DeFi shell, electric-purple/green palette, ABC Marist typography, crypto-infrastructure imagery or glow-like futurism.
- Do not use generic stock people, cartoon learning illustrations, abstract node meshes, blockchain charts, or floating coin imagery.
- Do not make sponsor rewards look guaranteed or make sponsorship visually dominate skill.
- Do not use opacity alone to convey an interactive, verified, failed, or reviewed state.
