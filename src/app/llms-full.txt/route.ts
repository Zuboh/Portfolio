import { getDictionary } from '@/app/[lang]/dictionaries'
import type { CaseStudySection } from '@/data/case-studies'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'
import { localizeProjects } from '@/lib/projects'
import { SITE_NAME, SITE_URL } from '@/lib/site'

// Built from static copy only; render once at build time.
export const dynamic = 'force-static'

// Full-text companion to /llms.txt: résumé, FAQ and every case study in one
// Markdown file, built from the same English copy the pages render.
export async function GET() {
  const dict = await getDictionary('en')
  const r = dict.resume
  const projects = localizeProjects(dict.projects)
  const studies = dict.caseStudies as Record<
    string,
    { sections: CaseStudySection[] }
  >

  const section = (s: CaseStudySection) => [
    `#### ${s.title}`,
    '',
    ...(s.paragraphs ?? []).flatMap((p) => [p, '']),
    ...(s.bullets ?? []).map(
      (b) => `- ${b.label ? `**${b.label}**: ` : ''}${b.text}`
    ),
    ...(s.flow ? [s.flow.join(' → ')] : []),
    '',
  ]

  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${dict.hire.lead}`,
    '',
    `${dict.meta.seeks} Contact: ${EMAIL}.`,
    '',
    `Site: ${SITE_URL}/en · Work with me: ${SITE_URL}/en/hire · Résumé (PDF): ${SITE_URL}${RESUME_PDF}`,
    `GitHub: ${GITHUB_URL} · LinkedIn: ${LINKEDIN_URL}`,
    '',
    '## Questions',
    '',
    ...dict.hire.faq.flatMap(({ q, a }) => [
      `### ${q}`,
      '',
      a.replace('{email}', EMAIL),
      '',
    ]),
    '## Experience',
    '',
    ...r.experienceItems.flatMap((e) => [
      `### ${e.role}, ${e.company} (${e.period})`,
      '',
      ...e.bullets.map((b) => `- ${b}`),
      '',
    ]),
    '## Education',
    '',
    ...r.educationItems.map(
      (e) => `- ${e.degree}, ${e.institution} (${e.period})`
    ),
    '',
    '## Skills',
    '',
    ...r.skillGroups.map((g) => `- ${g.category}: ${g.items.join(', ')}`),
    '',
    '## Languages',
    '',
    ...r.languageItems.map((l) => `- ${l}`),
    '',
    '## Projects',
    '',
    ...projects.flatMap((p) => [
      `### ${p.name}`,
      '',
      `${SITE_URL}/en/work/${p.slug} · Stack: ${p.stack.join(', ')}${p.github ? ` · Source: ${p.github}` : ''}`,
      '',
      p.longDescription ?? p.description,
      '',
      ...(studies[p.slug]?.sections ?? []).flatMap(section),
    ]),
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
