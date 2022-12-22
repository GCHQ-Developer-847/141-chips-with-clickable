import { newSpecPage } from "@stencil/core/testing";
import { Chip } from "./ic-chip";

describe("ic-chip component renders label", () => {
  it("should render static", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<ic-chip label="Label">
            <svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z" fill="currentColor"/>
</svg>
            </ic-chip>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render dismissible", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<ic-chip label="Label" dismissible="true">
            <svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z" fill="currentColor"/>
</svg>
            </ic-chip>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render disabled", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<ic-chip label="Label" dismissible="true" clickable="true" disabled="true">
            <svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z" fill="currentColor"/>
</svg>
            </ic-chip>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render small", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<ic-chip label="Label" dismissible="true" clickable="true" size="small">
              <svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z" fill="currentColor"/>
  </svg>
              </ic-chip>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render clickable", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<ic-chip label="Label" clickable="true" dismissible="true" href="/">
            <svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z" fill="currentColor"/>
</svg>
            </ic-chip>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with a link parent", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<a href="/"><ic-chip label="Label" dismissible="true" clickable=true></ic-chip></a>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should apply 'focussed' style when parent is focussed", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<a href="/"><ic-chip id="test-id" label="Label" dismissible="true" clickable=true></ic-chip></a>`,
    });

    expect(page.root).not.toBeNull;

    const element = await document.getElementById("test-id");

    await expect(element.classList.contains("focussed")).toBeFalsy;

    await element.focus();

    await expect(element.classList.contains("focussed")).toBeTruthy;
  });

  it("should lose 'focussed' style when parent loses focus", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<a href="/"><ic-chip id="test-chip" label="Label" dismissible="true" clickable=true></ic-chip></a>`,
    });

    expect(page.root).not.toBeNull;

    const element = await document.getElementById("test-chip");

    await element.focus();

    await expect(element.classList.contains("focussed")).toBeTruthy;

    await element.blur();

    await expect(element.classList.contains("focussed")).toBeFalsy;

    await page.rootInstance.disconnectedCallback();
  });

  it("should stop immediate propagation of a click event when disabled", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<ic-chip id="test-chip" label="Label" dismissible="true" clickable=true disabled=true onclick="alert('test')"></ic-chip>`,
    });

    jest.spyOn(window, "alert").mockImplementation();

    const element = await document.getElementById("test-chip");

    element.click();

    await page.waitForChanges();

    await expect(window.alert).not.toHaveBeenCalled;
  });

  it("should close on dismiss icon click", async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<ic-chip label="This is dismissible" dismissible="true"></ic-chip>`,
    });

    let chip = await page.root.shadowRoot.querySelector("div.container");
    const dismissButton = await page.root.shadowRoot.querySelector("button");

    expect(chip).not.toBeNull();
    expect(dismissButton).not.toBeNull();

    await dismissButton.click();

    await page.waitForChanges();
    chip = await page.root.shadowRoot.querySelector("div.container");

    expect(chip).toBeNull();
  });
});
