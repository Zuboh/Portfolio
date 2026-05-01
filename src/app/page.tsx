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
