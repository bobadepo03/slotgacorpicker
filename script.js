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
}

function renderAll(){
    const container = document.getElementById("app");
    container.innerHTML = "";

    for(const [name, games] of Object.entries(providers)){
        const shuffled = shuffle(games);

        let pickCount = (name === "PRAGMATIC") ? 8 : 3;
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

            let pickCount = (name === "PRAGMATIC") ? 8 : 3;
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
        };
    });
}

document.getElementById("refreshGlobal").onclick = () => {
    renderAll();
};

// fungsi timestamp
function updateTimestamp(){
    const now = new Date();
    const options = { 
        weekday: 'short',   // nama hari lengkap
        day: '2-digit', 
        month: 'long',     // nama bulan lengkap
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
    };
    const formatted = now.toLocaleString('en-GB', options).replace(',', '');
    document.getElementById("timestamp").textContent = formatted;
}
setInterval(updateTimestamp, 1000);
updateTimestamp();

loadData();
