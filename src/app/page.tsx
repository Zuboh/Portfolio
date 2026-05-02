import Link           from "next/link";
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

export default function Home() {
  return (
    <>
      <div className="page">
        <Topbar />
        <main>
          <Hero />
          <Work />
          <div className="mb-14 -mt-12 text-center">
            <Link href="/works" className="nav-link-acc" style={{ fontSize: 12 }}>
              View all projects ↗
            </Link>
          </div>
          <Stack />
          <About />
          <Log />
          <Contact />
          <Footer />
        </main>
      </div>
      <SidebarNav />
      <ScrollToTop />
    </>
  );
}
