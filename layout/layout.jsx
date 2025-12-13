const { Component } = require("inferno");
const Head = require("./common/head");
const Navbar = require("./common/navbar");
const Toc = require("./common/widgets");
const Footer = require("./common/footer");
const Scripts = require("./common/scripts");
const Search = require("./common/search");
const ThemeSelector = require("./common/theme_selector");

module.exports = class extends Component {
  render() {
    const { site, config, page, helper, body } = this.props;

    const language = page.lang || page.language || config.language || "en";

    return (
      <html lang={language ? language : ""}>
        <Head site={site} config={config} helper={helper} page={page} />
        <body>
          <Navbar config={config} helper={helper} page={page} />
          <ThemeSelector />
          <section class="section">
            <div
              class="main-content"
              dangerouslySetInnerHTML={{ __html: body }}
            ></div>
            <Toc site={site} config={config} helper={helper} page={page} />
          </section>
          <div _ngcontent-gid-c24="" class="squiggle">
            <svg _ngcontent-gid-c24="" aria-hidden="true" width="100%" height="8" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <pattern _ngcontent-gid-c24="" id="a" width="91" height="8" patternUnits="userSpaceOnUse" >
                <g _ngcontent-gid-c24="" clip-path="url(#clip0_2426_11367)">
                  <path _ngcontent-gid-c24="" d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0" stroke="var(--lavender)" stroke-linecap="square" ></path>
                </g>
              </pattern>
              <rect _ngcontent-gid-c24="" width="100%" height="100%" fill="url(#a)" ></rect>
            </svg>
          </div>
          <Footer site={site} config={config} helper={helper} />
          <Scripts site={site} config={config} helper={helper} page={page} />
          <Search config={config} helper={helper} />
        </body>
      </html>
    );
  }
};
