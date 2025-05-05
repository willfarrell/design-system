/* eslint-env browser */

customElements.define(
  "form-submit",
  class extends HTMLFormElement {
    $submitted = false;
    $loader = null;
    $onChange = false;
    constructor() {
      super();

      this.$loader = this.querySelectorAll('[data-loader="false"]');
      this.$loader = this.$loader[this.$loader.length - 1];
      this.$onChange = this.getAttribute("data-onchange") === "true";
      if (this.$onChange) {
        // remove primary submit button, skip search
        const submitButtons = this.querySelectorAll('[type="submit"]');
        submitButtons[submitButtons.length - 1].remove();
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      if (!this.$submitted) {
        this.$submitted = true;
        this.submit();
        this.$loader?.setAttribute("data-loader", "true");
      }
    }

    connectedCallback() {
      this.addEventListener("submit", this.handleSubmit);
      if (this.$onChange) {
        this.addEventListener("change", this.handleSubmit);
      }
    }

    disconnectedCallback() {
      this.removeEventListener("submit", this.handleSubmit);
      if (this.$onChange) {
        this.removeEventListener("change", this.handleSubmit);
      }
    }
  },
  { extends: "form" },
);
