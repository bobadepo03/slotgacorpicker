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
