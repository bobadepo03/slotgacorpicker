let providers = {};

function shuffle(arr){
    let copy = [...arr];
    for(let i = copy.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

async function loadData(){
    const res = await fetch("providers.json");
    providers = await res.json();
    renderAll();
    renderScheduleTable(); // panggil jadwal setelah card
}

function getPickCount(name){
    if(name === "★PRAGMATIC★") return 8;
    if(name === "★PGSOFT★") return 4;
    return 3;
}

function renderAll(){
    const container = document.getElementById("app");
    container.innerHTML = "";

    for(const [name, games] of Object.entries(providers)){
        const shuffled = shuffle(games);

        let pickCount = getPickCount(name);
        const groupA = shuffled.slice(0, pickCount);
        const groupB = shuffled.slice(pickCount, pickCount * 2);

        const cardId = `card-${name}`;

        container.innerHTML += `
          <div class="card fade" id="${cardId}">
            <h2>${name}</h2>

            <h3>Grup Pagi</h3>
            <ul class="pagi">${groupA.map(g => `<li>${g}</li>`).join("")}</ul>

            <h3>Grup Malam</h3>
            <ul class="malam">${groupB.map(g => `<li>${g}</li>`).join("")}</ul>

            <button class="refreshBtn">🔄 Refresh</button>
          </div>
        `;
    }

    requestAnimationFrame(() => {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.add("show");
        });
    });

    document.querySelectorAll(".refreshBtn").forEach(btn => {
        btn.onclick = () => {
            const card = btn.parentElement;
            const name = card.querySelector("h2").textContent;
            const games = providers[name];
            const shuffled = shuffle(games);

            let pickCount = getPickCount(name);
            const groupA = shuffled.slice(0, pickCount);
            const groupB = shuffled.slice(pickCount, pickCount * 2);

            const pagiList = card.querySelector(".pagi");
            const malamList = card.querySelector(".malam");

            pagiList.classList.add("fade");
            malamList.classList.add("fade");

            pagiList.innerHTML = groupA.map(g => `<li>${g}</li>`).join("");
            malamList.innerHTML = groupB.map(g => `<li>${g}</li>`).join("");

            requestAnimationFrame(() => {
                pagiList.classList.add("show");
                malamList.classList.add("show");
            });

            setTimeout(() => {
                pagiList.classList.remove("fade", "show");
                malamList.classList.remove("fade", "show");
            }, 600);

            // update jadwal bawah juga
            renderScheduleTable();
        };
    });
}

// =======================
// TEMPLATE JAM PERMANEN
// =======================

// Pagi
const jamTemplatePagi = {
  "★PRAGMATIC★": [
    ["07.00 - 10.35","11.00 - 14.35"],
    ["10.00 - 12.55","15.00 - 17.23"],
    ["13.25 - 16.45","17.19 - 20.55"],
    ["14.16 - 16.55","18.40 - 20.30"],
    ["18.00 - 20.00","21.00 - 00.00"],
    ["15.16 - 18.55","05.20 - 11.45"],
    ["01.40 - 04.20","17.40 - 23.55"],
    ["14.05 - 18.45"]
  ],
  "★PGSOFT★": [
    ["07.10 - 17.30","19.20 - 23.40"],
    ["15.01 - 18.45","19.22 - 21.30"],
    ["17.14 - 20.55","21.29 - 23.50"],
    ["19.00 - 22.00","23.00 - 01.00"]
  ],
  "★PLAYSTAR★": [
    ["09.00 - 12.00"],
    ["12.35 - 15.25"],
    ["08.45 - 11.55"]
  ],
  "★FASTSPIN★": [
    ["12.45 - 15.00"],
    ["15.15 - 17.45"],
    ["10.50 - 15.15"]
  ],
  "★5G GAMES★": [
    ["13.45 - 16.45"],
    ["16.55 - 20.35"],
    ["20.15 - 22.50"]
  ],
  "★RED TIGER★": [
    ["09.55 - 12.35"],
    ["13.20 - 16.00"],
    ["17.00 - 21.00"]
  ],
  "★IDN SLOT★": [
    ["08.10 - 18.30","19.20 - 23.40"],
    ["12.25 - 17.30"],
    ["15.03 - 18.25"]
  ],
  "★HABANERO★": [
    ["18.10 - 17.56"],
    ["08.45 - 17.25","18.50 - 23.40"],
    ["09.00 - 11.36"]
  ],
  "★MICROGAMING★": [
    ["08.05 - 12.25"],
    ["12.08 - 15.22"],
    ["19.14 - 23.39"]
  ],
  "★NO LIMIT CITY★": [
    ["13.25 - 17.45"],
    ["15.16 - 18.55"],
    ["09.10 - 16.30"]
  ]
};

// Malam
const jamTemplateMalam = {
  "★PRAGMATIC★": [
    ["23.25 - 02.00","04.20 - 08.30"],
    ["23.50 - 02.55","04.15 - 06.45"],
    ["01.30 - 03.52","04.24 - 06.35"],
    ["02.15 - 04.27","05.11 - 07.40"],
    ["03.10 - 04.22","05.14 - 07.00"],
    ["05.50 - 08.30","07.20 - 09.55"],
    ["08.05 - 10.44","01.06 - 05.10"],
    ["02.05 - 05.45"]
  ],
  "★PGSOFT★": [
    ["23.10 - 00.55"],
    ["02.15 - 03.55"],
    ["03.00 - 05.00","07.00 - 09.00"],
    ["05.15 - 04.53","08.20 - 06.45"]
  ],
  "★PLAYSTAR★": [
    ["01.45 - 03.50"],
    ["03.35 - 06.30"],
    ["05.45 - 09.30"]
  ],
  "★FASTSPIN★": [
    ["23.25 - 02.45"],
    ["00.35 - 03.35"],
    ["23.45 - 04.00"]
  ],
  "★5G GAMES★": [
    ["22.45 - 01.30"],
    ["21.00 - 02.55"],
    ["23.45 - 04.55"]
  ],
  "★RED TIGER★": [
    ["00.00 - 04.35"],
    ["01.35 - 04.00"],
    ["03.26 - 07.40"]
  ],
  "★IDN SLOT★": [
    ["00.20 - 03.55"],
    ["02.25 - 04.26"],
    ["03.26 - 05.40"]
  ],
  "★HABANERO★": [
    ["00.01 - 05.55"],
    ["01.15 - 04.38"],
    ["00.25 - 03.30"]
  ],
  "★MICROGAMING★": [
    ["02.25 - 08.44"],
    ["02.17 - 04.15"],
    ["04.19 - 06.14"]
  ],
  "★NO LIMIT CITY★": [
    ["03.25 - 07.45"],
    ["05.16 - 08.55"],
    ["01.10 - 03.30"]
  ]
};

// =======================
// RENDER JADWAL
// =======================

function renderScheduleBlock(title, jamTemplate){
  let html = `
    <h2>🔥 SLOT GACOR HARI INI 🔥</h2>
    <p>💯${title} iya kakaku💯</
