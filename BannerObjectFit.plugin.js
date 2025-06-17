/**
 * @name BannerObjectFit
 * @author Sheiylanie
 * @authorId 183948625368317952
 * @version 1.1.1
 * @description Add a panel to choose the object-fit mode of the server banner.
 * @invite hhACcDHCsc
 * @donate https://www.paypal.com/paypalme/Sheiylanie
 * @website https://novarise-studio.com
 * @source https://github.com/SheiylaDev/BannerObjectFit/blob/main/BannerObjectFit.plugin.js
 * @updateUrl https://raw.githubusercontent.com/SheiylaDev/BannerObjectFit/main/BannerObjectFit.plugin.js
 */

class BannerObjectFit { 
  constructor() {
    this.styleId = "banner-object-fit-style";
    this.settings = BdApi.loadData("BannerObjectFit", "settings") || { mode: "fill" };
  }

  start() {
    this.applyStyle();
  }

  stop() {
    const style = document.getElementById(this.styleId);
    if (style) style.remove();
  }

  applyStyle() {
    const style = document.getElementById(this.styleId) || document.createElement("style");
    style.id = this.styleId;
    let bg = this.settings.mode === "contain" ? "background: #23272a;" : "";
    style.textContent = `
      [class*="bannerImg"] {
        object-fit: ${this.settings.mode} !important;
        ${bg}
      }
    `;
    if (!document.getElementById(this.styleId)) document.head.appendChild(style);
  }

  getSettingsPanel() {
    const wrap = document.createElement("div");
    wrap.style.cssText = "padding: 16px; font-family: sans-serif; color: var(--header-primary);";

    const label = document.createElement("label");
    label.textContent = "Banner display mode:";
    label.style.cssText = "display:block;margin-bottom:4px;font-size:14px;font-weight:500;";

    const select = document.createElement("select");
    [
      { value: "cover", label: "cover (Discord default, crops the image)" },
      { value: "fill", label: "fill (fills all, may stretch)" },
      { value: "contain", label: "contain (shows all, may add borders)" }
    ].forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.label;
      if (this.settings.mode === opt.value) option.selected = true;
      select.appendChild(option);
    });
    select.style.cssText = "display:block;width:100%;padding:8px 10px;font-size:14px;border-radius:6px;background:var(--background-secondary);border:1px solid var(--background-modifier-border);color:var(--text-normal);margin-bottom:16px;box-sizing:border-box;";
    select.onchange = e => {
      this.settings.mode = e.target.value;
      BdApi.saveData("BannerObjectFit", "settings", this.settings);
      this.applyStyle();
    };

    const info = document.createElement("div");
    info.innerHTML = `💡 <b>Tip:</b> <br>
      <b>cover</b> = crops the image but keeps quality.<br>
      <b>fill</b> = fills all space but may stretch.<br>
      <b>contain</b> = shows all the image but adds borders.`;
    info.style.cssText = "font-size:13px;line-height:1.5;background:linear-gradient(90deg,#23272a 60%,#5865f2 100%);color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:22px;box-shadow:0 2px 8px 0 rgba(88,101,242,0.10);width:100%;text-align:left;box-sizing:border-box;margin-top:0;";

    wrap.append(label, select, info);
    return wrap;
  }
}

module.exports = BannerObjectFit; 