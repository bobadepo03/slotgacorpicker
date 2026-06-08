// Data provider + game
const providers = {
  "★PRAGMATIC★": [
    "Aztec Gems Deluxe",
    "Mahjong Wins 3",
    "Sweet Bonanza Xmas",
    "Mahjong Wins - Gong Xi Fa Cai",
    "Aztec Gems Megaways",
    "Zombie School Megaways",
    "Steamin' Reels",
    "Starlight Princess"
  ],
  "★PGSOFT★": [
    "Funky Fortunes",
    "The Great Icescape",
    "Gemstones Gold",
    "Speed Winner"
  ],
  "★PLAYSTAR★": [
    "Pyramid Of Flames",
    "WHO'S THE BOSS",
    "SUPER GEMS 2"
  ],
  "★FASTSPIN★": [
    "Triple Happiness",
    "Wild Wet Win",
    "Fruits Mania"
  ],
  "★5G GAMES★": [
    "G KONG",
    "Sugar High 5",
    "GOD OF FORTUNE 2"
  ]
};

// Fungsi shuffle
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Render card utama
function renderAll() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  for (const [name, games] of Object.entries(providers)) {
    const shuffled = shuffle(games);

    let pickCount = (name === "★PRAGMATIC★") ? 8 : 
                    (name === "★PGSOFT★") ? 4 : 3;

    const groupA = shuffled.slice(0, pickCount);     // pagi
    const groupB = shuffled.slice(pickCount, pickCount * 2); // malam

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${name}</h2>
      <div class="section">
        <h3>Pagi</h3>
        ${groupA.map(g => `<div>${g}</div>`).join("")}
      </div>
      <div class="section">
        <h3>Malam</h3>
        ${groupB.map(g => `<div>${g}</div>`).join("")}
      </div>
    `;
    output.appendChild(card);
  }

  // Update timestamp
  document.getElementById("timestamp").textContent =
    "Last refresh: " + new Date().toLocaleString();

  // Render notes sinkron
  renderNotes();
}

// Render note tambahan
function renderNotes() {
  const notePagi = document.getElementById("notePagi");
  const noteMalam = document.getElementById("noteMalam");
  notePagi.innerHTML = "";
  noteMalam.innerHTML = "";

  for (const [name, games] of Object.entries(providers)) {
    const shuffled = shuffle(games);

    let pickCount = (name === "★PRAGMATIC★") ? 8 : 
                    (name === "★PGSOFT★") ? 4 : 3;

    const groupA = shuffled.slice(0, pickCount);     // pagi
    const groupB = shuffled.slice(pickCount, pickCount * 2); // malam

    const pagiDiv = document.createElement("div");
    pagiDiv.className = "provider";
    pagiDiv.innerHTML = `<strong>${name}</strong><br>` +
      groupA.map(g => `${g}<br>`).join("");
    notePagi.appendChild(pagiDiv);

    const malamDiv = document.createElement("div");
    malamDiv.className = "provider";
    malamDiv.innerHTML = `<strong>${name}</strong><br>` +
      groupB.map(g => `${g}<br>`).join("");
    noteMalam.appendChild(malamDiv);
  }
}

// Panggil render pertama kali
renderAll();
