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
    renderScheduleTable();
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
        document.querySelectorAll(".card").forEach(card => card.classList.add("show"));
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

            card.querySelector(".pagi").innerHTML = groupA.map(g => `<li>${g}</li>`).join("");
            card.querySelector(".malam").innerHTML = groupB.map(g => `<li>${g}</li>`).join("");

            renderScheduleTable();
        };
    });
}

// =======================
// TEMPLATE JAM PERMANEN
// =======================
// (isi jamTemplatePagi & jamTemplateMalam sesuai daftar jam yang sudah saya kasih)

function renderScheduleBlock(title, jamTemplate){
  let html = `
    <h2>🔥 SLOT GACOR HARI INI 🔥</h2>
    <p>💯${title} iya kakaku💯</p>
    <p>🏆BOBATOTO🏆</p>
    <p>🎰Selamat Kepada Pemenang Salam JP🎰</p>
  `;

  for(const [provider, games] of Object.entries(providers)){
    html += `<h3>${provider}</h3>`;
    const shuffled = shuffle(games);
    shuffled.forEach((g, idx) => {
      const jam = jamTemplate[provider] && jamTemplate[provider][idx];
      if(jam){
        if(jam.length > 1){
          html += `<p>🎰${g} ( ${jam[0]} ) ( ${jam[1]} )</p>`;
        } else {
          html += `<p>🎰${g} ( ${jam[0]} )</p>`;
        }
      }
    });
  }

  html += `
    <p style="text-align:center;margin-top:20px;">💥Salam jp iya kakak💥</p>
    <p style="text-align:center;">GAS Kakaku 🔥</p>
    <p style="text-align:center;">💥DITUNGGU WD NYA KAKAKKU💥</p>
    <p style="text-align:center;">🏆 TERIMA KASIH! SEMOGA HOKI YA kakakku 🏆</p>
  `;
  return html;
}

function renderScheduleTable(){
  const container = document.getElementById("schedule");
  container.innerHTML = `
    <div class="schedule-block pagi">
      ${renderScheduleBlock("TANGGAL ( 08-06-2026 )", jamTemplatePagi)}
    </div>
    <div class="schedule-block malam">
      ${renderScheduleBlock("TANGGAL ( 09-06-2026 )", jamTemplateMalam)}
    </div>
  `;
}

document.getElementById("refreshGlobal").onclick = () => {
    renderAll();
    renderScheduleTable();
};

// timestamp
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
