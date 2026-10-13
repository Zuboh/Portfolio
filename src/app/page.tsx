import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { Stack } from '@/components/sections/Stack'
import { Activity } from '@/components/sections/Activity'
import { Contact } from '@/components/sections/Contact'
import { fetchRecentCommits } from '@/lib/github'

export const revalidate = 60

export default async function Home() {
  const entries = await fetchRecentCommits(6)

  return (
    <main id="main">
      <Hero />
      <Work />
      <Stack />
      <Activity entries={entries} />
      <Contact />
    </main>
  )
}
