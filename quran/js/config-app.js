/* AL-QUR'AN PRO - CONFIG & THEME ENGINE 
   Logika: Dark Mode, Sinkronisasi Mushaf, & Bookmark
*/

// --- 1. SINKRONISASI TEMA & MUSHAF ---
function sinkronTema() {
    const tipe = localStorage.getItem('tipeMushaf') || 'mushaf-1';
    const isDark = localStorage.getItem('userDark') === 'true' || localStorage.getItem('userDark') === true;

    document.body.className = tipe;

    if (isDark && tipe !== 'mushaf-2' && tipe !== 'mushaf-3') {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.backgroundColor = '#121212'; 
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.backgroundColor = '#ffffff';
    }
}

// --- 2. LOGIKA BOOKMARK (BACAAN TERAKHIR) ---
function cekBookmark() {
    const b = JSON.parse(localStorage.getItem('quran_bmark'));
    const wadahCard = document.getElementById('resume-home');
    const infoTeks = document.getElementById('resume-info-home');

    if (b && wadahCard && infoTeks) {
        wadahCard.style.display = 'block';
        infoTeks.innerHTML = `
            ${b.nama} (Ayat ${b.a})
            <div style="font-size: 11px; font-weight: normal; opacity: 0.8; margin-top: 4px;">
                🕒 Disimpan: ${b.waktu || 'Baru saja'}
            </div>
        `;
    }
}

function bukaTerakhir() {
    const b = JSON.parse(localStorage.getItem('quran_bmark'));
    if (b) {
        window.location.href = `quran.html?surah=${b.s}&ayat=${b.a}`;
    } else {
        if(typeof pesan === "function") pesan("Belum ada riwayat bacaan.");
        else alert("Belum ada riwayat bacaan.");
    }
}

// --- 3. HEADER & TANGGAL HIJRIYAH ---
async function muatTanggalHeader() {
    try {
        const tgl = new Date();
        const r = await fetch(`https://api.aladhan.com/v1/gToH?date=${tgl.getDate()}-${tgl.getMonth() + 1}-${tgl.getFullYear()}`);
        const res = await r.json();
        const d = res.data.hijri;
        const greetEl = document.getElementById('greeting');
        if(greetEl) {
            greetEl.innerHTML = `Assalamu'alaikum<br><small>${d.day} ${d.month.en} ${d.year} H</small>`;
        }
    } catch (e) { console.log("Gagal muat tanggal Hijriyah"); }
}

// Helper Pesan Toast (Jika Bossku pakai)
function pesan(teks) {
    alert(teks); // Bisa diganti dengan toast UI yang lebih keren
}