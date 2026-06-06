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

        const groupA = shuffled.slice(0, 3);
        const groupB = shuffled.slice(3, 6);

        container.innerHTML += `
        <div class="card">
            <h2>${name}</h2>

            <h3>Grup A</h3>
            <ul>${groupA.map(g => `<li>${g}</li>`).join("")}</ul>

            <h3>Grup B</h3>
            <ul>${groupB.map(g => `<li>${g}</li>`).join("")}</ul>
        </div>
        `;
    }
}

loadData();