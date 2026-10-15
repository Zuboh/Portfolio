// Case-study copy lives in src/dictionaries/{en,it}.json under `caseStudies.<slug>`.
// It is drawn from each project's own README and docs. Nothing there goes beyond them.

export interface CaseStudySection {
  /** Stable, language-neutral id used for heading anchors. */
  id: string
  title: string
  paragraphs?: string[]
  bullets?: { label?: string; text: string }[]
  flow?: string[]
}
