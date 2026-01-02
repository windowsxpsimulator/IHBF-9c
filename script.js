// script.js - multilingual Balkan Ragebait Generator
// Expects language JSON files at `lang/{code}.json`
// Available codes: en, bg, sr_cyrl, hr, bs, mk, sq, ro, el

let langData = null;
let currentLang = "en";
const availableLangs = [
  { code: "en", flag: "🇬🇧", nameNative: "English" },
  { code: "bg", flag: "🇧🇬", nameNative: "България / Български" },
  { code: "sr_cyrl", flag: "🇷🇸", nameNative: "Република Србија / Српски (ћирилица)" },
  { code: "hr", flag: "🇭🇷", nameNative: "Republika Hrvatska / Hrvatski" },
  { code: "bs", flag: "🇧🇦", nameNative: "Bosna i Hercegovina / Bosanski" },
  { code: "mk", flag: "🇲🇰", nameNative: "Република Северна Македонија / Македонски" },
  { code: "sq", flag: "🇦🇱", nameNative: "Republika e Shqipërisë / Shqip" },
  { code: "ro", flag: "🇷🇴", nameNative: "România / Română" },
  { code: "el", flag: "🇬🇷", nameNative: "Ελλάδα / Ελληνικά" }
];

function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

async function loadLanguage(code) {
  try {
    const res = await fetch(`lang/${code}.json`);
    if (!res.ok) throw new Error("Language file not found");
    langData = await res.json();
    currentLang = code;
    applyLanguageToUI();
  } catch (e) {
    console.error("Failed to load language", code, e);
    // fallback to English if load fails
    if (code !== "en") loadLanguage("en");
  }
}

function applyLanguageToUI() {
  if (!langData) return;
  // UI strings
  $("h1").innerText = langData.ui.title || "Balkan Ragebait Generator";
  $("p").innerText = langData.ui.subtitle || "";
  $("#output").innerText = langData.ui.clickGenerate || "Click generate 👀";
  // Buttons
  $("#generateBtn") && ($("#generateBtn").innerText = langData.ui.generate || "Generate");
  $("#copyBtn") && ($("#copyBtn").innerText = langData.ui.copy || "Copy");

  // Category labels
  $all(".categories label").forEach(label => {
    const input = label.querySelector("input");
    const val = input.value;
    const catKey = val.toLowerCase();
    if (langData.categories && langData.categories[catKey]) {
      // put text content after checkbox
      label.childNodes.forEach(n => { if (n.nodeType === Node.TEXT_NODE) n.nodeValue = " " + langData.categories[catKey]; });
    }
  });

  // Theme and toggles text (we keep the switch visual, but can set aria-labels)
  $("#themeToggle").title = langData.ui.light || "Light";
  $("#numMode").title = langData.ui.uncleMode || "Numerical Uncle Mode";
}

// utility random
function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// generator using langData
function generate() {
  if (!langData) { loadLanguage("en"); return; }
  const numMode = document.getElementById("numMode").checked;
  const checkedCategories = Array.from(document.querySelectorAll(".categories input:checked"))
                                .map(c => c.value);

  // authority
  let authority = random(langData.phrases.authority);
  if (numMode) {
    // attach a number or decimal variant
    const num = ["#1","#2","#3","#4","#5","#6.7","#8","#9.1","#10"][Math.floor(Math.random()*9)];
    authority = `${authority} ${num}`;
  }

  // choose topics from selected categories (language-specific)
  let topicsPool = [];
  checkedCategories.forEach(cat => {
    const key = cat.toLowerCase();
    if (langData.phrases.topics && langData.phrases.topics[key]) {
      topicsPool = topicsPool.concat(langData.phrases.topics[key]);
    }
  });
  if (topicsPool.length === 0) topicsPool = langData.phrases.topics.general;

  const topic = random(topicsPool);
  const credibility = random(langData.phrases.credibility);
  const claim = random(langData.phrases.claims);
  const finisher = random(langData.phrases.finishers);

  const sentence = `${authority} ${credibility} ${langData.ui.connector || "and said"} ${topic} ${claim}. ${finisher}`;
  $("#output").innerText = sentence;
}

// copy to clipboard
function copyText() {
  const text = $("#output").innerText;
  navigator.clipboard.writeText(text).then(() => {
    // show a transient small toast or alert
    const prev = $("#copyToast");
    if (prev) prev.remove();
    const toast = document.createElement("div");
    toast.id = "copyToast";
    toast.style.position = "fixed";
    toast.style.bottom = "18px";
    toast.style.right = "18px";
    toast.style.background = "#333";
    toast.style.color = "white";
    toast.style.padding = "8px 12px";
    toast.style.borderRadius = "6px";
    toast.style.zIndex = 9999;
    toast.innerText = (langData && langData.ui && langData.ui.copied) ? langData.ui.copied : "Copied!";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1200);
  });
}

// render language buttons list (below toggles)
function renderLanguageButtons() {
  const container = document.getElementById("languageList");
  container.innerHTML = "";
  availableLangs.forEach(l => {
    const btn = document.createElement("button");
    btn.className = "langBtn";
    btn.innerHTML = `${l.flag} <span class="langName">${l.nameNative}</span>`;
    btn.dataset.code = l.code;
    btn.addEventListener("click", () => {
      loadLanguage(l.code);
      // add active class
      document.querySelectorAll(".langBtn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
    container.appendChild(btn);
  });
}

// theme toggle handling
document.addEventListener("DOMContentLoaded", () => {
  // wire buttons that may be in DOM
  const gen = document.getElementById("generateBtn");
  if (gen) gen.addEventListener("click", generate);
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) copyBtn.addEventListener("click", copyText);

  // theme switch
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("change", function() {
      document.body.className = this.checked ? "dark" : "light";
    });
  }

  // ensure numMode exists
  const numMode = document.getElementById("numMode");
  if (numMode) {
    // no extra handler needed; generate reads it
  }

  // prepare language buttons area
  renderLanguageButtons();

  // load default language
  loadLanguage("en");
});
