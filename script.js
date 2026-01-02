let currentCategory = "general";
let numericalUncle = false;
let currentLang = "en";
let langData = {
  general: [
    "This is wrong, my uncle says so.",
    "Source: my uncle #{{uncle}}"
  ],
  food: [
    "This food was invented by my uncle #{{uncle}}."
  ],
  history: [
    "History books are fake."
  ],
  bureaucracy: [
    "You need one more paper."
  ],
  driving: [
    "You drive like a tourist."
  ]
};

async function loadLanguage(lang) {
  try {
    const res = await fetch(`lang/${lang}.json`);
    langData = await res.json();
    currentLang = lang;
    document.getElementById("languageButton").innerText =
      `${langData.meta.flag} ${langData.meta.native}`;
  } catch {
    console.warn("Language file not found, using fallback.");
  }
}

function generateRagebait() {
  const list = langData[currentCategory] || langData.general;
  let sentence = list[Math.floor(Math.random() * list.length)];

  if (numericalUncle) {
    const num = (Math.random() * 10).toFixed(1);
    sentence = sentence.replace("{{uncle}}", num);
  } else {
    sentence = sentence.replace(" #{{uncle}}", "");
  }

  document.getElementById("output").innerText = sentence;
}

function copyToClipboard() {
  navigator.clipboard.writeText(
    document.getElementById("output").innerText
  );
}

function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".cat").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

document.getElementById("themeToggle").addEventListener("change", e => {
  document.body.className = e.target.checked ? "light" : "dark";
});

document.getElementById("uncleToggle").addEventListener("change", e => {
  numericalUncle = e.target.checked;
});

document.getElementById("languageButton").addEventListener("click", () => {
  document.getElementById("languageMenu").classList.toggle("hidden");
});

loadLanguage("en");

