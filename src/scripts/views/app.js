/* eslint-disable no-promise-executor-return */
/* eslint-disable class-methods-use-this */
import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";
import DrawerInitiator from "../utils/drawer-initiator";

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (page) {
      this._showLoading();
      try {
        await this._wait(500);

        this._content.innerHTML = await page.render();
        await page.afterRender();
      } catch (error) {
        console.log("Failed to render page", error);
      }
      this._hideLoading();
    }

    const skipLinkElem = document.querySelector(".skip-to-content");
    skipLinkElem.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#mainContent").focus();
    });
  }

  _wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  _showLoading() {
    this._content.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-indicator-circle"></div>
        <span class="loading-indicator-text">Loading...</span>
      </div>
    `;
  }

  _hideLoading() {
    const loadingIndicator = this._content.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
}

export default App;
