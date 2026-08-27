window.PIPELINE_CONFIG = {
  timing: {
    cycleMs: 2800
  },
  stages: [
    { label: "Test Planning",    icon: "fa-pencil-square-o" },
    { label: "Monitoring and Control",   icon: "fa-cogs" },
    { label: "Test Analysis", icon: "fa-check-circle" },
    { label: "Test Design",           icon: "fa-rocket" },
    { label: "Test Implementation",           icon: "fa-search" },
    { label: "Test Completion",          icon: "fa-line-chart" }
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
    "Monitoring and controlling...",
    "Analysing test requirements...",
    "Designing test cases...",
    "Implementing automated tests...",
    "Completing test cycle..."
  ]
};