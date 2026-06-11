/* Shared chrome: navigation, footer, scroll reveal, data helpers */
(function () {
  const PAGES = [
    ["index.html", "Home"],
    ["team.html", "Team"],
    ["research.html", "Research"],
    ["publications.html", "Publications"],
    ["tools.html", "Tools"],
    ["social.html", "Social"],
  ];

  const current = (location.pathname.split("/").pop() || "index.html");

  const navHost = document.getElementById("site-nav");
  if (navHost) {
    navHost.innerHTML = `
      <div class="nav-wrap">
        <nav class="nav" aria-label="Main navigation">
          <a class="brand" href="index.html"><span class="dot">M</span><span>MolHemat</span></a>
          ${PAGES.map(([href, label]) =>
            `<a class="link${href === current ? " active" : ""}" href="${href}">${label}</a>`
          ).join("")}
        </nav>
      </div>`;
  }

  const footHost = document.getElementById("site-footer");
  if (footHost) {
    footHost.innerHTML = `
      <footer class="footer">
        <div class="f-name">Molecular Hematology Research Group</div>
        <div class="f-sub">
          ACTREC · Tata Memorial Centre · Mumbai, India ·
          <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Patkar+Nikhil&sort=date" target="_blank" rel="noopener">PubMed</a> ·
          <a href="https://github.com/patkarlab" target="_blank" rel="noopener">GitHub</a>
          <br>© ${new Date().getFullYear()} · molhemat.org
        </div>
      </footer>`;
  }

  // Scroll-reveal
  const io = ("IntersectionObserver" in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
        });
      }, { threshold: 0.08 })
    : null;

  window.observeReveals = function (root) {
    (root || document).querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      if (io) io.observe(el); else el.classList.add("visible");
    });
  };
  window.observeReveals();

  // Cache-busted JSON loader for the data/ files
  window.loadData = async function (file) {
    const res = await fetch(`data/${file}?v=${Date.now()}`);
    if (!res.ok) throw new Error(`Failed to load data/${file}`);
    return res.json();
  };

  window.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
})();
