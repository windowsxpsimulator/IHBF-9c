const authorities = [
  "My uncle",
  "My uncle who lives in Hamburg",
  "A guy I know from Germany",
  "A retired taxi driver",
  "Someone who worked briefly in government"
];

const numbers = ["#1", "#2", "#3", "#4", "#5", "#6.7", "#8"];

const credentials = [
  "was there",
  "knows how it really works",
  "explained it very clearly",
  "saw documents",
  "heard it directly",
  "doesn't lie about these things"
];

const topics = {
  Food: ["yogurt", "rakija", "burek", "coffee", "salad origins"],
  History: ["borders", "maps", "who invented what", "who was first", "what really happened"],
  Bureaucracy: ["paperwork", "permits", "visas", "stamps", "offices closing early"],
  Driving: ["traffic rules", "taxi driving", "speed limits", "parking", "roads"],
  General: ["everything else", "vibes", "common sense", "daily life", "everyone agrees"]
};

const claims = [
  "is actually the same everywhere",
  "was already solved years ago",
  "depends on the year",
  "only makes sense if you know the vibe",
  "is misunderstood by everyone",
  "was decided unofficially"
];

const finishers = [
  "Everyone knows this.",
  "This isn't controversial.",
  "People just don't like the truth.",
  "I thought this was common knowledge.",
  "I don't know why people argue."
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generate() {
  const numMode = document.getElementById("numMode").checked;
  const checkedCategories = Array.from(document.querySelectorAll(".categories input:checked"))
                                .map(c => c.value);
  
  let authority = random(authorities);
  if (numMode) authority += " " + random(numbers);

  let availableTopics = [];
  checkedCategories.forEach(cat => {
    if (topics[cat]) availableTopics = availableTopics.concat(topics[cat]);
  });
  if (availableTopics.length === 0) availableTopics = topics["General"];
  const topic = random(availableTopics);

  const sentence = `${authority} ${random(credentials)} and said ${topic} ${random(claims)}. ${random(finishers)}`;
  document.getElementById("output").innerText = sentence;
}

function toggleTheme() {
  document.body.className = document.body.className === "dark" ? "light" : "dark";
  updateToggleBoxes();
}

function toggleNumUncle() {
  const numUncleButton = document.getElementById("numMode");
  numUncleButton.checked = !numUncleButton.checked;
  updateToggleBoxes();
}

function updateToggleBoxes() {
  if (document.body.className === "dark") {
    document.getElementById("lightModeBox").style.backgroundColor = "black";
  } else {
    document.getElementById("lightModeBox").style.backgroundColor = "white";
  }

  if (document.getElementById("numMode").checked) {
    document.getElementById("numUncleBox").style.backgroundColor = "green";
  } else {
    document.getElementById("numUncleBox").style.backgroundColor = "red";
  }
}

function copyText() {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}
