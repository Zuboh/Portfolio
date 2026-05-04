import { Topbar }     from "@/components/Topbar";
import { Hero }       from "@/components/sections/Hero";
import { Work }       from "@/components/sections/Work";
import { Stack }      from "@/components/sections/Stack";
import { About }      from "@/components/sections/About";
import { Log }        from "@/components/sections/Log";
import { Contact }    from "@/components/sections/Contact";
import { Footer }     from "@/components/sections/Footer";
import { SidebarNav } from "@/components/SidebarNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { fetchGitHubActivity, fetchLastCommitDate } from "@/lib/github";

export const revalidate = 3600; // refresh GitHub activity every hour

export default async function Home() {
  const [githubEntries, lastUpdated] = await Promise.all([
    fetchGitHubActivity('zuboh', 10),
    fetchLastCommitDate('Zuboh', 'Portfolio'),
  ]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_68px] max-w-[800px] mx-auto pl-6 pr-4 md:pl-14 md:pr-3 pb-[140px] overflow-x-hidden">
        <Topbar />
        <main className="min-w-0">
          <Hero />
          <Work />
          <Stack />
          <About />
          <Log entries={githubEntries.length > 0 ? githubEntries : undefined} />
          <Contact />
          <Footer lastUpdated={lastUpdated} />
        </main>
      </div>
      <SidebarNav />
      <ScrollToTop />
    </>
  );
}
