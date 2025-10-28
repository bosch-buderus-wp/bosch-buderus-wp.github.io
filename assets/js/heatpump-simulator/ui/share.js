// Share UI for Heatpump Simulator
// Exposes window.HeatpumpShare = { initShare }
(function () {
  if (typeof d3 === "undefined") {
    console.error("d3 not found for HeatpumpShare");
    return;
  }

  function initShare(containerSel, getShareUrl) {
    const container = d3.select(containerSel);
    if (container.empty()) {
      console.warn("Share container not found");
      return { update: () => {} };
    }

    // Ensure wrapper exists and is positioned
    const diagramWrap = container
      .select(".sim-diagram-wrap")
      .style("position", "relative");

    // Share icon container
    const shareBtnWrap = diagramWrap
      .append("div")
      .attr("class", "sim-sharebar");

    // Share button SVG
    const shareBtn = shareBtnWrap
      .append("svg")
      .attr("id", "sim-share")
      .attr("viewBox", "0 0 24 24")
      .attr("width", 24)
      .attr("height", 24)
      .attr("role", "button")
      .attr("aria-label", "Link teilen")
      .attr("title", "Link mit den aktuellen Einstellungen teilen");

    // Build icon (Feather share-2 like)
    shareBtn.selectAll("*").remove();
    shareBtn.append("circle").attr("cx", 18).attr("cy", 5).attr("r", 3);
    shareBtn.append("circle").attr("cx", 6).attr("cy", 12).attr("r", 3);
    shareBtn.append("circle").attr("cx", 18).attr("cy", 19).attr("r", 3);
    shareBtn
      .append("line")
      .attr("x1", 8.59)
      .attr("y1", 13.51)
      .attr("x2", 15.42)
      .attr("y2", 17.49);
    shareBtn
      .append("line")
      .attr("x1", 15.41)
      .attr("y1", 6.51)
      .attr("x2", 8.59)
      .attr("y2", 10.49);

    // Click handler opens popup and attempts to copy URL
    shareBtn.on("click", async () => {
      const url = typeof getShareUrl === "function" ? getShareUrl() : "";
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
        }
      } catch (_) {}

      const overlay = container.append("div").attr("class", "sim-share-overlay");
      const box = overlay.append("div").attr("class", "sim-share-popup");

      const heading = box.append("div").attr("class", "sim-share-header");
      heading.append("div").attr("class", "sim-share-title").text("Link teilen");
      heading
        .append("button")
        .attr("type", "button")
        .attr("class", "sim-share-close")
        .attr("aria-label", "Schließen")
        .text("×")
        .on("click", () => overlay.remove());

      box
        .append("p")
        .text(
          "Der Link wurde in die Zwischenablage kopiert (falls möglich). Du kannst ihn hier auch manuell kopieren:"
        );

      const fieldWrap = box.append("div").attr("class", "sim-share-fields");
      const input = fieldWrap
        .append("input")
        .attr("class", "sim-share-copy-input")
        .attr("type", "text")
        .attr("readonly", true)
        .attr("value", url)
        .on("focus", function () {
          this.select();
        });

      fieldWrap
        .append("button")
        .attr("class", "sim-share-copy-btn")
        .attr("type", "button")
        .text("Kopieren")
        .on("click", async () => {
          try {
            if (navigator.clipboard && window.isSecureContext) {
              await navigator.clipboard.writeText(url);
            } else {
              input.node().select();
              document.execCommand("copy");
            }
          } catch (_) {}
        });

      overlay.on("click", (ev) => {
        if (ev.target === overlay.node()) overlay.remove();
      });
    });

    // Provide an updater to refresh the tooltip with the latest share URL
    function update() {
      try {
        const url = typeof getShareUrl === "function" ? getShareUrl() : "";
        shareBtn.attr("title", url || "Link mit den aktuellen Einstellungen teilen");
      } catch (_) {}
    }

    // Initial update
    update();

    return { update };
  }

  window.HeatpumpShare = { initShare };
})();
