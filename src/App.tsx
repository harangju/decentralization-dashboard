import { FileText, GitHub, GraduationCap, Instagram, LinkedIn, X } from "./icons";

function Footer() {
  return (
    <footer className="flex justify-center w-full z-20 py-2 border-t">
      <div className="flex text-slate-900 space-x-3 transition-all duration-100">
        <a
          className="link-hover hover-scale-95"
          href="https://livejohnshopkins-my.sharepoint.com/:b:/g/personal/hju7_jh_edu/EbLwp2DavixGtxZVEA9WzCgBVKrlM1egzPWAWj_UdFwraw?e=f7miUq"
          target="_blank"
          rel="noreferrer"
          aria-label="View resume"
        >
          <FileText className="w-5 h-5" />
        </a>
        <a
          className="link-hover hover-scale-95"
          href="https://scholar.google.com/citations?user=dDNw63AAAAAJ&hl=en"
          target="_blank"
          rel="noreferrer"
          aria-label="Google Scholar profile"
        >
          <GraduationCap className="w-5 h-5" />
        </a>
        <a
          className="link-hover hover-scale-95"
          href="https://github.com/harangju/homepage"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
        >
          <GitHub className="w-5 h-5" />
        </a>
        <a
          className="link-hover hover-scale-95"
          href="https://www.instagram.com/harangju/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram profile"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          className="link-hover hover-scale-95"
          href="https://x.com/harangju/"
          target="_blank"
          rel="noreferrer"
          aria-label="X profile"
        >
          <X className="w-5 h-5" />
        </a>
        <a
          className="link-hover hover-scale-95"
          href="https://www.linkedin.com/in/harangju/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <LinkedIn className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main>
      <div className="prose py-6 text-xl max-w-none leading-relaxed">
        <p className="mb-6" role="heading" aria-level={1}>
          Hey, I'm Harang Ju.
        </p>

        <p className="mb-6">
          I'm an assistant professor at <a href="https://carey.jhu.edu/faculty/harang-ju-phd/" className="link">Johns Hopkins</a>, a co-director of the <a href="https://cdhai.carey.jhu.edu/" className="link">AI Agent Lab</a>, a digital fellow at <a href="https://ide.mit.edu" className="link">MIT</a>, and an advisor at <a href="https://twitter.com/Moku_HQ" className="link">Moku</a>.
        </p>

        <p className="mb-6">
          Previously, I was a postdoc at <a href="https://ide.mit.edu" className="link">MIT</a> and received my PhD in neuroscience at <a href="https://www.upenn.edu/" className="link">UPenn</a>.
        </p>

        <p className="mb-6">
          Outside of work, I enjoy taking <a href="https://www.instagram.com/harangju/" className="link">photos</a>. As my personal belief, I affirm the <a href="https://www.ccel.org/creeds/nicene.creed.html" className="link">Nicene Creed</a>.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="flex flex-col h-screen justify-between max-w-2xl mx-auto pt-6 px-4">
      <Home />
      <Footer />
    </div>
  );
}
