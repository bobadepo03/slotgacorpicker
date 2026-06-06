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

        // DEFAULT untuk semua provider
        let pickCount = 3;

        // KHUSUS PRAGMATIC PLAY
        if(name === "Pragmatic Play"){
            pickCount = 8;
        }

        const groupA = shuffled.slice(0, pickCount);
        const groupB = shuffled.slice(pickCount, pickCount * 2);

        container.innerHTML += `
        <div class="card">
            <h2>${name}</h2>

            <h3>Grup Pagi</h3>
            <ul>${groupA.map(g => `<li>${g}</li>`).join("")}</ul>

            <h3>Grup Malam</h3>
            <ul>${groupB.map(g => `<li>${g}</li>`).join("")}</ul>
        </div>
        `;
    }
}

loadData();
