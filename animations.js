(function () {
  "use strict";

  var reduce = window.matchMedia &&
               window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var DEFAULT_CONFIG = {
    timing: { cycleMs: 2800 },
    stages: [
      { label: "Plan & Design",    icon: "fa-pencil-square-o" },
      { label: "Automate Tests",   icon: "fa-cogs" },
      { label: "Execute & Verify", icon: "fa-check-circle" },
      { label: "Deploy",           icon: "fa-rocket" },
      { label: "Monitor",          icon: "fa-line-chart" }
    ],
    floatingTags: [
      { text: "Selenium",    icon: "fa-search",     position: "tl", tagStage: 0 },
      { text: "Playwright",  icon: "fa-cogs",       position: "l",  tagStage: 1 },
      { text: "API Testing", icon: "fa-plug",       position: "bl", tagStage: 2 },
      { text: "JMeter",      icon: "fa-tachometer", position: "br", tagStage: 3 },
      { text: "Appium",      icon: "fa-android",    position: "r",  tagStage: 4 },
      { text: "CI / CD",     icon: "fa-code-fork",  position: "tr", tagStage: 0 }
    ],
    statusMessages: [
      "Designing test plan...",
      "Automating test suite...",
      "Executing & verifying...",
      "Deploying to pipeline...",
      "Monitoring in production..."
    ]
  };

  function getConfig() {
    var cfg = window.PIPELINE_CONFIG;
    if (!cfg || typeof cfg !== "object") {
      console.warn("[pipeline] PIPELINE_CONFIG not found, using defaults.");
      return DEFAULT_CONFIG;
    }
    if (!Array.isArray(cfg.stages) || !cfg.stages.length) {
      console.warn("[pipeline] config.stages missing or empty, using defaults.");
      cfg.stages = DEFAULT_CONFIG.stages;
    }
    if (!Array.isArray(cfg.floatingTags)) {
      cfg.floatingTags = DEFAULT_CONFIG.floatingTags;
    }
    if (!Array.isArray(cfg.statusMessages)) {
      cfg.statusMessages = DEFAULT_CONFIG.statusMessages;
    }
    if (!cfg.timing || typeof cfg.timing.cycleMs !== "number") {
      cfg.timing = { cycleMs: DEFAULT_CONFIG.timing.cycleMs };
    }
    if (cfg.stages.length !== cfg.statusMessages.length) {
      console.warn(
        "[pipeline] stages (" + cfg.stages.length + ") and statusMessages (" +
        cfg.statusMessages.length + ") length mismatch — auto-padded."
      );
      while (cfg.statusMessages.length < cfg.stages.length) cfg.statusMessages.push("...");
      while (cfg.stages.length < cfg.statusMessages.length) cfg.stages.push({ label: "...", icon: "fa-circle" });
    }
    return cfg;
  }

  function el(tag, cls, attrs, html) {
    var node = document.createElement(tag);
    if (cls)   node.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (html != null) node.innerHTML = html;
    return node;
  }

  function buildPipeline(config) {
    var host = document.querySelector(".hero-pipeline");
    if (!host) return null;
    while (host.firstChild) host.removeChild(host.firstChild);

    config.floatingTags.forEach(function (t) {
      var pos = ["tl","tr","l","r","bl","br"].indexOf(t.position) >= 0 ? t.position : "tl";
      host.appendChild(el("span", "float-tag tag-" + pos, { "data-tag": String(t.tagStage || 0) },
        '<i class="fa ' + t.icon + '"></i> ' + t.text));
    });

    var panel = el("div", "pipeline-panel");
    panel.style.setProperty("--cycle", (config.timing.cycleMs || 2800) + "ms");
    panel.appendChild(el("div", "pipeline-grid"));

    var stagesWrap = el("div", "stages");
    config.stages.forEach(function (s, i) {
      var stage = el("div", "stage", { "data-stage": String(i) });
      stage.appendChild(el("span", "stage-icon stage-icon-" + (i % 5),
        null, '<i class="fa ' + s.icon + '"></i>'));
      stage.appendChild(el("span", "stage-label", null, s.label));
      stagesWrap.appendChild(stage);
    });
    panel.appendChild(stagesWrap);

    var status = el("div", "pipeline-status");
    status.appendChild(el("span", "status-icon", null, '<i class="fa fa-terminal"></i>'));
    var statusText = el("div", "status-text");
    statusText.appendChild(el("span", "status-label", null, "STATUS"));
    statusText.appendChild(el("span", "status-message",
      { "data-status-msg": "" }, config.statusMessages[0]));
    status.appendChild(statusText);
    status.appendChild(el("div", "status-progress", null, "<span></span>"));
    panel.appendChild(status);

    host.appendChild(panel);
    return host;
  }

  function cyclePipeline(config) {
    var widget = document.querySelector(".hero-pipeline");
    if (!widget) return;
    var stages = widget.querySelectorAll(".stage");
    var tags   = widget.querySelectorAll(".float-tag");
    var msgEl  = widget.querySelector(".status-message");
    if (!stages.length || !msgEl) return;

    var CYCLE_MS = config.timing.cycleMs;
    var MSGS = config.statusMessages;
    var N = stages.length;
    var idx = 0;

    stages.forEach(function (s, i) {
      s.style.transition = "none";
      s.classList.toggle("stage-active", i === 0);
    });
    tags.forEach(function (t) {
      t.style.transition = "none";
      var tStage = parseInt(t.getAttribute("data-tag"), 10);
      t.classList.toggle("is-active", (isNaN(tStage) ? 0 : tStage) === 0);
    });
    msgEl.textContent = MSGS[0];
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        stages.forEach(function (s) { s.style.transition = ""; });
        tags.forEach(function (t) { t.style.transition = ""; });
      });
    });

    setInterval(function () {
      idx = (idx + 1) % N;
      stages.forEach(function (s, i) {
        s.classList.toggle("stage-active", i === idx);
      });
      tags.forEach(function (t) {
        var tStage = parseInt(t.getAttribute("data-tag"), 10);
        t.classList.toggle("is-active",
          (isNaN(tStage) ? 0 : tStage) === idx);
      });
      msgEl.classList.add("is-switching");
      setTimeout(function () {
        msgEl.textContent = MSGS[idx];
        msgEl.classList.remove("is-switching");
      }, 220);
    }, CYCLE_MS);
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {

    var heroHosts = document.querySelectorAll(".hero-stagger");
    heroHosts.forEach(function (el) {
      if (reduce) {
        el.classList.add("is-reduced");
        el.querySelectorAll("*").forEach(function (c) {
          c.style.opacity = "1";
          c.style.transform = "none";
          c.style.animation = "none";
        });
      } else {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            el.classList.add("is-loaded");
          });
        });
      }
    });

    var revealEls = document.querySelectorAll(
      "[data-reveal], [data-reveal-children]"
    );

    if (!("IntersectionObserver" in window) || reduce) {
      revealEls.forEach(function (el) {
        el.classList.add("in-view");
        if (el.hasAttribute("data-reveal-children")) {
          Array.prototype.forEach.call(el.children, function (c, i) {
            c.style.setProperty("--i", (i * 0.08) + "s");
            c.classList.add("in-view");
          });
        }
      });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          el.classList.add("in-view");
          if (el.hasAttribute("data-reveal-children")) {
            var step = parseFloat(el.getAttribute("data-stagger")) || 0.08;
            Array.prototype.forEach.call(el.children, function (c, i) {
              c.style.setProperty("--i", (i * step) + "s");
              c.classList.add("in-view");
            });
          }
          io.unobserve(el);
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

      revealEls.forEach(function (el) { io.observe(el); });
    }

    var config = getConfig();
    buildPipeline(config);
    if (!reduce) cyclePipeline(config);
  });
})();