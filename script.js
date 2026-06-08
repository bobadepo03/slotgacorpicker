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

function renderScheduleTable(){
    const container = document.getElementById("schedule");
    container.innerHTML = `
      <h2>🔥 SLOT GACOR HARI INI 🔥</h2>
      <div class="schedule-grid">
        <div class="col pagi">
          <h3>🌞 Grup Pagi</h3>
        </div>
        <div class="col malam">
          <h3>🌙 Grup Malam</h3>
        </div>
      </div>
    `;

    const pagiCol = container.querySelector(".pagi");
    const malamCol = container.querySelector(".malam");

    for(const [name, games] of Object.entries(providers)){
        const shuffled = shuffle(games);
        let pickCount = getPickCount(name);

        const groupA = shuffled.slice(0, pickCount);
        const groupB = shuffled.slice(pickCount, pickCount * 2);

        pagiCol.innerHTML += `
          <h4>${name}</h4>
          ${groupA.map(g => `<p>💎 ${g}</p>`).join("")}
        `;
        malamCol.innerHTML += `
          <h4>${name}</h4>
          ${groupB.map(g => `<p>💎 ${g}</p>`).join("")}
        `;
    }
}

document.getElementById("refreshGlobal").onclick = () => {
    renderAll();
    renderScheduleTable();
};

// fungsi timestamp
function updateTimestamp(){
    const now = new Date();
    const options = { 
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const formatted = now.toLocaleString('en-GB', options).replace(',', '');
    document.getElementById("timestamp").textContent = formatted;
}
setInterval(updateTimestamp, 1000);
updateTimestamp();

loadData();
