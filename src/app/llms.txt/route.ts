import { getDictionary } from '@/app/[lang]/dictionaries'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'
import { localizeProjects } from '@/lib/projects'
import { SITE_NAME, SITE_URL } from '@/lib/site'

// Built from static copy only; render once at build time.
export const dynamic = 'force-static'

// Plain-text site summary for LLM tools (llmstxt.org), built from the English copy.
export async function GET() {
  const dict = await getDictionary('en')
  const projects = localizeProjects(dict.projects)
  const link = (name: string, url: string, note?: string) =>
    `- [${name}](${url})${note ? `: ${note}` : ''}`

  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${dict.hire.lead}`,
    '',
    `${dict.meta.seeks} Contact: ${EMAIL}.`,
    '',
    '## Pages',
    '',
    link('Home', `${SITE_URL}/en`, dict.meta.description),
    link('Work with me', `${SITE_URL}/en/hire`, dict.hire.metaDescription),
    link('Résumé', `${SITE_URL}/en/resume`, dict.meta.resumeDescription),
    link('Résumé (PDF)', `${SITE_URL}${RESUME_PDF}`),
    link(
      'Full text',
      `${SITE_URL}/llms-full.txt`,
      'résumé, FAQ and every case study in one file'
    ),
    '',
    '## Projects',
    '',
    ...projects.map((p) =>
      link(p.name, `${SITE_URL}/en/work/${p.slug}`, p.description)
    ),
    '',
    '## Profiles',
    '',
    link('GitHub', GITHUB_URL),
    link('LinkedIn', LINKEDIN_URL),
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
