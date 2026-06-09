let providers = {};
let latestGroups = {};

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

function getPickCount(name){
    if(name === "★PRAGMATIC★") return 8;
    if(name === "★PGSOFT★") return 4;
    return 3;
}

function renderAll(){
    const container = document.getElementById("app");
    container.innerHTML = "";
    latestGroups = {};

    for(const [name, games] of Object.entries(providers)){
        const shuffled = shuffle(games);
        let pickCount = getPickCount(name);

        const groupA = shuffled.slice(0, pickCount);
        const groupB = shuffled.slice(pickCount, pickCount * 2);

        latestGroups[name] = { pagi: groupA, malam: groupB };

        container.innerHTML += `
          <div class="card fade">
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

            latestGroups[name] = { pagi: groupA, malam: groupB };

            card.querySelector(".pagi").innerHTML = groupA.map(g => `<li>${g}</li>`).join("");
            card.querySelector(".malam").innerHTML = groupB.map(g => `<li>${g}</li>`).join("");

            renderNotes();
        };
    });

    renderNotes();
}

document.getElementById("refreshGlobal").onclick = () => {
    renderAll();
};

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

function renderNotes(){
    const notePagi = document.getElementById("notePagi");
    const noteMalam = document.getElementById("noteMalam");
    notePagi.innerHTML = "";
    noteMalam.innerHTML = "";

    for(const [name, groups] of Object.entries(latestGroups)){
        const pagiDiv = document.createElement("div");
        pagiDiv.className = "provider";
        pagiDiv.innerHTML = `<strong>${name}</strong><br>` +
            groups.pagi.map(g => `${g}<br>`).join("");
        notePagi.appendChild(pagiDiv);

        const malamDiv = document.createElement("div");
        malamDiv.className = "provider";
        malamDiv.innerHTML = `<strong>${name}</strong><br>` +
            groups.malam.map(g => `${g}<br>`).join("");
        noteMalam.appendChild(malamDiv);
    }
}

// fungsi copy isi note
function copyNoteContent(noteId){
    const container = document.getElementById(noteId);
    let text = "";
    container.querySelectorAll(".provider").forEach(div => {
        text += div.innerText + "\n";
    });
    navigator.clipboard.writeText(text.trim()).then(() => {
        alert("Isi " + (noteId === "notePagi" ? "Grup Pagi" : "Grup Malam") + " berhasil dicopy!");
    });
}

// binding tombol copy
document.getElementById("copyPagi").onclick = () => copyNoteContent("notePagi");
document.getElementById("copyMalam").onclick = () => copyNoteContent("noteMalam");

loadData();
