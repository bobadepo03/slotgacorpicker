let providers = {};
let latestGroups = {};

function shuffle(arr){
    const copy = [...arr];
    for(let i=copy.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
}

function getPickCount(name){
    if(name==="★PRAGMATIC★") return 8;
    if(name==="★PGSOFT★") return 4;
    return 3;
}

function buildGroups(name,games){

    const pickCount=getPickCount(name);

    let lockSeparate=[];
    let pool=[];

    for(const item of games){

        if(typeof item==="string" && item.startsWith("__LOCKSEPARATE__:")){

            lockSeparate=item
                .replace("__LOCKSEPARATE__:","")
                .split("|")
                .map(x=>x.trim());

        }else{

            pool.push(item);

        }

    }

    pool=shuffle(pool);

    let groupA=[];
    let groupB=[];

    if(lockSeparate.length===2){

        const g1=lockSeparate[0];
        const g2=lockSeparate[1];

        pool=pool.filter(x=>x!==g1 && x!==g2);

        if(Math.random()<0.5){

            groupA.push(g1);
            groupB.push(g2);

        }else{

            groupA.push(g2);
            groupB.push(g1);

        }

    }

    while(groupA.length<pickCount && pool.length){

        groupA.push(pool.shift());

    }

    while(groupB.length<pickCount && pool.length){

        groupB.push(pool.shift());

    }

    return{

        groupA:shuffle(groupA),
        groupB:shuffle(groupB)

    };

}

async function loadData(){

    const res=await fetch("providers.json");
    providers=await res.json();

    renderAll();

}

function renderAll(){

    const container=document.getElementById("app");

    container.innerHTML="";

    latestGroups={};

    for(const [name,games] of Object.entries(providers)){

        const {groupA,groupB}=buildGroups(name,games);

        latestGroups[name]={
            pagi:[...groupA],
            malam:[...groupB]
        };

        container.innerHTML+=`
        <div class="card fade">

            <h2>${name}</h2>

            <h3>Grup Pagi</h3>
            <ul class="pagi">
                ${groupA.map(g=>`<li>${g}</li>`).join("")}
            </ul>

            <h3>Grup Malam</h3>
            <ul class="malam">
                ${groupB.map(g=>`<li>${g}</li>`).join("")}
            </ul>

            <button class="refreshBtn">🔄 Refresh</button>

        </div>
        `;

    }

    requestAnimationFrame(()=>{

        document.querySelectorAll(".card").forEach(card=>{

            card.classList.add("show");

        });

    });

    document.querySelectorAll(".refreshBtn").forEach(btn=>{

        btn.onclick=()=>{

            const card=btn.parentElement;

            const name=card.querySelector("h2").textContent;

            const {groupA,groupB}=buildGroups(name,providers[name]);

            latestGroups[name]={
                pagi:[...groupA],
                malam:[...groupB]
            };

            const pagi=card.querySelector(".pagi");
            const malam=card.querySelector(".malam");

            pagi.classList.add("fade");
            malam.classList.add("fade");

            pagi.innerHTML=groupA.map(x=>`<li>${x}</li>`).join("");
            malam.innerHTML=groupB.map(x=>`<li>${x}</li>`).join("");

            requestAnimationFrame(()=>{

                pagi.classList.add("show");
                malam.classList.add("show");

            });

            setTimeout(()=>{

                pagi.classList.remove("fade","show");
                malam.classList.remove("fade","show");

            },600);

            renderNotes();

        };

    });

    renderNotes();

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

// ===============================
// ADDONS NOTE
// ===============================

function renderNotes(){

    const notePagi=document.getElementById("notePagi");
    const noteMalam=document.getElementById("noteMalam");

    if(!notePagi || !noteMalam) return;

    notePagi.innerHTML="";
    noteMalam.innerHTML="";

    Object.entries(latestGroups).forEach(([provider,groups])=>{

        notePagi.innerHTML+=`
        <div class="provider">
            <strong>${provider}</strong><br>
            ${groups.pagi.join("<br>")}
        </div>
        `;

        noteMalam.innerHTML+=`
        <div class="provider">
            <strong>${provider}</strong><br>
            ${groups.malam.join("<br>")}
        </div>
        `;

    });

}


// ===============================
// COPY NOTE
// ===============================

function copyNoteContent(target){

    const box=document.getElementById(target);

    if(!box) return;

    let text="";

    box.querySelectorAll(".provider").forEach(item=>{

        text+=item.innerText.trim()+"\n\n";

    });

    navigator.clipboard.writeText(text.trim())
    .then(()=>{

        alert(
            target==="notePagi"
            ? "Grup Pagi berhasil dicopy"
            : "Grup Malam berhasil dicopy"
        );

    });

}


// ===============================
// COPY BUTTON
// ===============================

const copyPagi=document.getElementById("copyPagi");

if(copyPagi){

    copyPagi.onclick=()=>{

        copyNoteContent("notePagi");

    };

}

const copyMalam=document.getElementById("copyMalam");

if(copyMalam){

    copyMalam.onclick=()=>{

        copyNoteContent("noteMalam");

    };

}


// ===============================
// START
// ===============================

loadData();
