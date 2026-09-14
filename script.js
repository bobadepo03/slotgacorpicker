let providers = {};
let latestGroups = {};


/* =========================================================
   TIME LIST - GRUP PAGI
========================================================= */

const pagiTimes = [
    "( 17.14 - 20.55 ) ( 21.29 - 23.50 )",
    "( 13.45 - 16.45 )",
    "( 08.05 - 12.25 )",
    "( 14.16 - 16.55 ) ( 18.40 - 20.30 )",
    "( 17.00 - 21.00 )",
    "( 19.00 - 22.00 ) ( 23.00 - 01.00 )",
    "( 08.45 - 17.25 ) ( 18.50 - 23. 40 )",
    "( 13.20 - 16.00 )",
    "( 12.08 - 15.22 )",
    "( 14.05 - 18.45 )",
    "( 07.00 - 10.35 ) ( 11.00 - 14.35  )",
    "( 16.55 - 20.35 )",
    "( 10.00 - 12.55 ) (15.00 - 17.23  )",
    "( 09.00 - 12.00 )",
    "( 12.45 - 15.00 )",
    "( 15.15 - 17.45 )",
    "( 12.25 - 17.30 )",
    "( 01.40 - 04.20 ) ( 17.40 - 23.55 )",
    "( 15.03 - 18.25 )",
    "( 13.25 - 17.45 )",
    "( 15.01 - 18.45 ) ( 19.22 - 21.30 )",
    "( 15.16 - 18.55 ) ( 05.20 - 11.45 )",
    "( 12.35 - 15.25 )",
    "( 09.10 - 16.30 )",
    "( 08.10 - 18.30 ) ( 19.20 - 23.40 )",
    "( 18.10 - 17.56 )",
    "( 15.16 - 18.55 )",
    "( 09.55 - 12.35 )",
    "( 10.50 - 15.15 )",
    "( 13.25 - 16.45 ) ( 17.19 - 20.55 )",
    "( 09.00 - 11.36 )",
    "( 07.10 - 17.30 ) ( 19.20 - 23.40 )",
    "( 20.15 - 22.50 )",
    "( 19.14 - 23.39 )",
    "( 08.45 - 11.55 )",
    "( 18.00 - 20.00 ) ( 21.00 - 00.00 )"
];


/* =========================================================
   TIME LIST - GRUP MALAM
========================================================= */

const malamTimes = [
    "( 08.05 - 10.44 ) ( 01.06 - 05.10 )",
    "( 05.45 - 09.30 )",
    "( 01.35 - 04.00)",
    "( 01.30 - 03.52 ) ( 04.24 - 06.35 )",
    "( 02.05 - 05.45 )",
    "( 00.35 - 03.35 )",
    "( 00.25 - 03.30 )",
    "( 01.10 - 03.30 )",
    "( 23.45 - 04.00 )",
    "( 03.10 - 04.22 ) ( 05.14 - 07.00 )",
    "( 03.35 - 06.30 )",
    "( 04.19 - 06.14 )",
    "( 22.45 - 01.30 )",
    "( 01.15 - 04.38 )",
    "( 00.20 - 03.55 )",
    "( 05.15 - 04.53 ) ( 08.20 - 06.45 )",
    "( 01.45 - 03.50 )",
    "( 23.25 - 02.45 )",
    "( 02.17 - 04.15 )",
    "( 23.25 - 02.00 ) ( 04.20 - 08.30 )",
    "( 03.26 - 07.40 )",
    "( 00.01 - 05.55 )",
    "( 21.00 - 02.55 )",
    "( 02.25 - 08.44 )",
    "( 03.00 - 05.00 ) ( 07.00 - 09.00 )",
    "( 03.25 - 07.45 )",
    "( 23.45 - 04.55 )",
    "( 02.15 - 04.27 ) ( 05.11 - 07.40 )",
    "( 23.10 - 00.55 )",
    "( 05.50 - 08.30 ) ( 07.20 - 09.55 )",
    "( 00.00 - 04.35 )",
    "( 05.16 - 08.55 )",
    "( 02.15 - 03.55 )",
    "( 03.26 - 05.40 )",
    "( 02.25 - 04.26 )",
    "( 23.50 - 02.55 ) ( 04.15 - 06.45 )"
];


/* =========================================================
   ACAK ARRAY
========================================================= */

function shuffle(arr) {

    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}


/* =========================================================
   JUMLAH GAME PER PROVIDER
========================================================= */

function getPickCount(name) {

    if (name === "★PRAGMATIC★") return 8;

    if (name === "★PGSOFT★") return 4;

    return 3;

}


/* =========================================================
   BUILD GRUP GAME
   __LOCKSEPARATE__ TETAP DIPISAH
========================================================= */

function buildGroups(name, games) {

    const pickCount = getPickCount(name);

    let lockSeparate = [];
    let pool = [];

    for (const item of games) {

        if (
            typeof item === "string" &&
            item.startsWith("__LOCKSEPARATE__:")
        ) {

            lockSeparate = item
                .replace("__LOCKSEPARATE__:", "")
                .split("|")
                .map(item => item.trim());

        } else {

            pool.push(item);

        }

    }

    pool = shuffle(pool);

    let groupA = [];
    let groupB = [];


    /*
       Dua game LOCKSEPARATE wajib masuk
       ke grup yang berbeda.
    */

    if (lockSeparate.length === 2) {

        const gameA = lockSeparate[0];
        const gameB = lockSeparate[1];

        pool = pool.filter(
            game => game !== gameA && game !== gameB
        );

        if (Math.random() < 0.5) {

            groupA.push(gameA);
            groupB.push(gameB);

        } else {

            groupA.push(gameB);
            groupB.push(gameA);

        }

    }


    while (groupA.length < pickCount && pool.length) {

        groupA.push(pool.shift());

    }

    while (groupB.length < pickCount && pool.length) {

        groupB.push(pool.shift());

    }


    return {

        groupA: shuffle(groupA),
        groupB: shuffle(groupB)

    };

}


/* =========================================================
   FORMAT TANGGAL
========================================================= */

function getDateString(offsetDays = 0) {

    const date = new Date();

    date.setDate(date.getDate() + offsetDays);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;

}


/* =========================================================
   FORMAT GAME + JAM
========================================================= */

function renderGameList(games, times) {

    return games.map((game, index) => {

        const time = times[index] || "";

        return `
            <li>
                🎰 ${game}
                <span class="game-time">${time}</span>
            </li>
        `;

    }).join("");

}


/* =========================================================
   LOAD DATA
========================================================= */

async function loadData() {

    try {

        const response = await fetch("providers.json");

        if (!response.ok) {
            throw new Error("providers.json tidak ditemukan");
        }

        providers = await response.json();

        renderAll();

    } catch (error) {

        console.error("Gagal memuat data:", error);

        document.getElementById("app").innerHTML = `
            <div class="card">
                <h2>Gagal memuat data</h2>
                <p>Pastikan file providers.json berada di folder yang sama.</p>
            </div>
        `;

    }

}


/* =========================================================
   RENDER SEMUA PROVIDER
========================================================= */

function renderAll() {

    const container = document.getElementById("app");

    if (!container) return;

    container.innerHTML = "";

    latestGroups = {};


    /*
       Semua jam Pagi diacak menjadi satu pool.
       Semua jam Malam diacak menjadi satu pool.
    */

    const shuffledPagiTimes = shuffle(pagiTimes);
    const shuffledMalamTimes = shuffle(malamTimes);

    let pagiTimeIndex = 0;
    let malamTimeIndex = 0;


    for (const [name, games] of Object.entries(providers)) {

        const { groupA, groupB } = buildGroups(
            name,
            games
        );


        /*
           Pembagian jam berdasarkan jumlah game.
           Total seluruh provider = 36 game Pagi
           dan 36 game Malam.
        */

        const groupATimes = shuffledPagiTimes.slice(
            pagiTimeIndex,
            pagiTimeIndex + groupA.length
        );

        const groupBTimes = shuffledMalamTimes.slice(
            malamTimeIndex,
            malamTimeIndex + groupB.length
        );

        pagiTimeIndex += groupA.length;
        malamTimeIndex += groupB.length;


        latestGroups[name] = {

            pagi: [...groupA],
            malam: [...groupB],

            pagiTimes: [...groupATimes],
            malamTimes: [...groupBTimes]

        };


        container.innerHTML += `

            <div class="card fade">

                <h2>${name}</h2>

                <h3>Grup Pagi</h3>

                <ul class="pagi">
                    ${renderGameList(
                        groupA,
                        groupATimes
                    )}
                </ul>

                <h3>Grup Malam</h3>

                <ul class="malam">
                    ${renderGameList(
                        groupB,
                        groupBTimes
                    )}
                </ul>

                <button class="refreshBtn">
                    🔄 Refresh
                </button>

            </div>

        `;

    }


    requestAnimationFrame(() => {

        document
            .querySelectorAll(".card")
            .forEach(card => {

                card.classList.add("show");

            });

    });


    /* =====================================================
       REFRESH PER PROVIDER
    ===================================================== */

    document
        .querySelectorAll(".refreshBtn")
        .forEach(button => {

            button.onclick = () => {

                const card = button.parentElement;

                const name =
                    card.querySelector("h2").textContent;


                /*
                   Acak game provider tersebut.
                */

                const { groupA, groupB } =
                    buildGroups(
                        name,
                        providers[name]
                    );


                /*
                   Ambil semua jam yang sedang digunakan
                   oleh provider lain.
                */

                const usedPagiTimes = [];
                const usedMalamTimes = [];


                Object.entries(latestGroups)
                    .forEach(([provider, groups]) => {

                        if (provider === name) return;

                        usedPagiTimes.push(
                            ...groups.pagiTimes
                        );

                        usedMalamTimes.push(
                            ...groups.malamTimes
                        );

                    });


                /*
                   Jam milik provider yang di-refresh
                   otomatis tersedia kembali.
                */

                const availablePagiTimes =
                    pagiTimes.filter(
                        time => !usedPagiTimes.includes(time)
                    );

                const availableMalamTimes =
                    malamTimes.filter(
                        time => !usedMalamTimes.includes(time)
                    );


                const newPagiTimes =
                    shuffle(availablePagiTimes)
                        .slice(0, groupA.length);

                const newMalamTimes =
                    shuffle(availableMalamTimes)
                        .slice(0, groupB.length);


                latestGroups[name] = {

                    pagi: [...groupA],
                    malam: [...groupB],

                    pagiTimes: [...newPagiTimes],
                    malamTimes: [...newMalamTimes]

                };


                const pagi =
                    card.querySelector(".pagi");

                const malam =
                    card.querySelector(".malam");


                pagi.classList.add("fade");
                malam.classList.add("fade");


                pagi.innerHTML =
                    renderGameList(
                        groupA,
                        newPagiTimes
                    );

                malam.innerHTML =
                    renderGameList(
                        groupB,
                        newMalamTimes
                    );


                requestAnimationFrame(() => {

                    pagi.classList.add("show");
                    malam.classList.add("show");

                });


                setTimeout(() => {

                    pagi.classList.remove(
                        "fade",
                        "show"
                    );

                    malam.classList.remove(
                        "fade",
                        "show"
                    );

                }, 600);


                renderNotes();

            };

        });


    renderNotes();

}


/* =========================================================
   REFRESH ALL
========================================================= */

const refreshGlobal =
    document.getElementById("refreshGlobal");

if (refreshGlobal) {

    refreshGlobal.onclick = () => {

        renderAll();

    };

}


/* =========================================================
   TIMESTAMP
========================================================= */

function updateTimestamp() {

    const now = new Date();

    const options = {

        day: "2-digit",
        month: "short",
        year: "numeric",

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"

    };

    const formatted =
        now
            .toLocaleString("en-GB", options)
            .replace(",", "");

    const timestamp =
        document.getElementById("timestamp");

    if (timestamp) {

        timestamp.textContent = formatted;

    }

}

setInterval(updateTimestamp, 1000);

updateTimestamp();


/* =========================================================
   ADDONS NOTE DI HALAMAN
========================================================= */

function renderNotes() {

    const notePagi =
        document.getElementById("notePagi");

    const noteMalam =
        document.getElementById("noteMalam");

    if (!notePagi || !noteMalam) return;

    notePagi.innerHTML = "";
    noteMalam.innerHTML = "";

    /* =====================================================
       HEADER NOTE PAGI
    ===================================================== */

    notePagi.innerHTML += `
        <div class="note-copy-header">
            🔥SLOT GACOR HARI INI🔥<br>
            💯TANGGAL ( ${getDateString(0)} ) iya kakaku💯<br>
            🏆BOBATOTO🏆<br>
            🎰Selamat Kepada Pemenang Salam JP🎰
        </div>
        <br>
    `;

    /* =====================================================
       HEADER NOTE MALAM
    ===================================================== */

    noteMalam.innerHTML += `
        <div class="note-copy-header">
            🔥SLOT GACOR HARI INI🔥<br>
            💯TANGGAL ( ${getDateString(1)} ) iya kakaku💯<br>
            🏆BOBATOTO🏆<br>
            🎰Selamat Kepada Pemenang Salam JP🎰
        </div>
        <br>
    `;

    /* =====================================================
       ISI PROVIDER
    ===================================================== */

    Object.entries(latestGroups)
        .forEach(([provider, groups]) => {

            notePagi.innerHTML += `
                <div class="provider">
                    <strong>${provider}</strong><br>

                    ${groups.pagi.map((game, index) => {

                        const time =
                            groups.pagiTimes[index] || "";

                        return `
                            🎰 ${game} ${time}
                        `;

                    }).join("<br>")}
                </div>
            `;

            noteMalam.innerHTML += `
                <div class="provider">
                    <strong>${provider}</strong><br>

                    ${groups.malam.map((game, index) => {

                        const time =
                            groups.malamTimes[index] || "";

                        return `
                            🎰 ${game} ${time}
                        `;

                    }).join("<br>")}
                </div>
            `;

        });

    /* =====================================================
       FOOTER NOTE PAGI
    ===================================================== */

    notePagi.innerHTML += `
        <br>
        <div class="note-copy-footer">
            💥Salam  jp iya kakak💥<br>
            🔥GAS Kakaku 🔥<br>
            💥DITUNGGU WD NYA KAKAKKU💥<br>
            🏆 TERIMA KASIH! SEMOGA HOKI YA kakakku 🏆
        </div>
    `;

    /* =====================================================
       FOOTER NOTE MALAM
    ===================================================== */

    noteMalam.innerHTML += `
        <br>
        <div class="note-copy-footer">
            💥Salam  jp iya kakak💥<br>
            🔥GAS Kakaku 🔥<br>
            💥DITUNGGU WD NYA KAKAKKU💥<br>
            🏆 TERIMA KASIH! SEMOGA HOKI YA kakakku 🏆
        </div>
    `;
}

/* =========================================================
   TOMBOL COPY
========================================================= */

const copyPagi =
    document.getElementById("copyPagi");

if (copyPagi) {

    copyPagi.onclick = () => {

        copyNoteContent("notePagi");

    };

}


const copyMalam =
    document.getElementById("copyMalam");

if (copyMalam) {

    copyMalam.onclick = () => {

        copyNoteContent("noteMalam");

    };

}


/* =========================================================
   START APP
========================================================= */

loadData();