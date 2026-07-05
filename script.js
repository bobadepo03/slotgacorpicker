let providers = {};

function shuffle(arr){
    let copy = [...arr];
    for(let i = copy.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function buildGroups(name, games){
    const pickCount = getPickCount(name);

    let lockSeparate = null;
    const pool = [];

    // Pisahkan rule dan game
    for(const game of games){
        if(typeof game === "string" && game.startsWith("__LOCKSEPARATE__:")){
            lockSeparate = game.replace("__LOCKSEPARATE__:", "").split("|");
        }else{
            pool.push(game);
        }
    }

    // Acak pool
    const shuffledPool = shuffle(pool);

    let groupA = [];
    let groupB = [];

    // Paksa game wajib muncul dan dipisah
    if(lockSeparate && lockSeparate.length === 2){
        const [g1, g2] = lockSeparate;

        const idx1 = shuffledPool.indexOf(g1);
        if(idx1 > -1) shuffledPool.splice(idx1, 1);

        const idx2 = shuffledPool.indexOf(g2);
        if(idx2 > -1) shuffledPool.splice(idx2, 1);

        if(Math.random() < 0.5){
            groupA.push(g1);
            groupB.push(g2);
        }else{
            groupA.push(g2);
            groupB.push(g1);
        }
    }

    while(groupA.length < pickCount && shuffledPool.length){
        groupA.push(shuffledPool.shift());
    }

    while(groupB.length < pickCount && shuffledPool.length){
        groupB.push(shuffledPool.shift());
    }

    return {
        groupA: shuffle(groupA),
        groupB: shuffle(groupB)
    };
}

async function loadData(){
    const res = await fetch("providers.json");
    providers = await res.json();
    renderAll();
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
       const { groupA, groupB } = buildGroups(name, games);

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
            const { groupA, groupB } = buildGroups(name, games);

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
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const formatted = now.toLocaleString('en-GB', options).replace(',', '');
    document.getElementById("timestamp").textContent = formatted;
}
setInterval(updateTimestamp, 1000);
updateTimestamp();

loadData();
