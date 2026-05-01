import { Topbar }     from "@/components/Topbar";
import { Hero }       from "@/components/Hero";
import { Work }       from "@/components/Work";
import { Stack }      from "@/components/Stack";
import { About }      from "@/components/About";
import { Log }        from "@/components/Log";
import { Contact }    from "@/components/Contact";
import { SidebarNav } from "@/components/SidebarNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";

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
