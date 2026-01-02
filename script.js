const authorities = [
  "My uncle",
  "My uncle who lives in Hamburg",
  "A guy I know from Germany",
  "A retired taxi driver",
  "Someone who worked briefly in government",
  "Uncle #6.7"
];

const credentials = [
  "was there",
  "knows how it really works",
  "explained it very clearly",
  "saw documents",
  "heard it directly",
  "doesn't lie about these things"
];

const topics = [
  "borders",
  "yogurt",
  "rakija",
  "burek",
  "paperwork",
  "traffic rules",
  "history",
  "maps"
];

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
  const sentence = `${random(authorities)} ${random(credentials)} and said ${random(topics)} ${random(claims)}. ${random(finishers)}`;
  document.getElementById("output").innerText = sentence;
}
