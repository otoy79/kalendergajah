/* AL-QUR'AN PRO - AGENDA PUASA ENGINE 
   Logika: Pengingat Senin-Kamis, Ayyamul Bidh, & Notif Floating
*/

// --- 1. CSS DINAMIS UNTUK ANIMASI (Biar gak nyampah di HTML) ---
const styleAgenda = document.createElement('style');
styleAgenda.innerHTML = `
    #notif-agenda-floating {
        position: fixed;
        bottom: -120px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 350px;
        background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
        border: 1px solid #d4af37;
        border-radius: 15px;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 9999;
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: white;
    }
    #notif-agenda-floating.muncul {
        bottom: 20px;
    }
    .btn-tutup-agenda {
        background: none;
        border: none;
        color: #888;
        font-size: 20px;
        cursor: pointer;
        padding: 0 5px;
    }
`;
document.head.appendChild(styleAgenda);

// --- 2. FUNGSI UTAMA CEK AGENDA ---
function cekAgendaHariIni() {
    const mskr = new Date();
    const jamSekarang = mskr.getHours();

    // Muncul jam 18:00 sore sampai 05:00 pagi
    if (!(jamSekarang >= 18 || jamSekarang < 5)) return;

    let targetDina; 
    if (jamSekarang >= 18) {
        targetDina = (mskr.getDay() + 1) % 7; // Target BESOK
    } else {
        targetDina = mskr.getDay(); // Target HARI INI
    }

    const cacheKey = `kalender_${mskr.getMonth() + 1}_${mskr.getFullYear()}`;
    const dataKalender = JSON.parse(localStorage.getItem(cacheKey));

    if (dataKalender) {
        const tglCari = (jamSekarang >= 18) ? mskr.getDate() + 1 : mskr.getDate();
        const infoHari = dataKalender.find(d => parseInt(d.gregorian.day) === tglCari);
        
        if (infoHari) {
            let infoPuasa = "";
            const tglH = parseInt(infoHari.hijri.day);

            if (targetDina === 1) infoPuasa = "Besok Puasa Sunah Senin, jangan lupa sahur!";
            else if (targetDina === 4) infoPuasa = "Besok Puasa Sunah Kamis, jangan lupa sahur!";
            
            if (tglH === 13 || tglH === 14 || tglH === 15) {
                infoPuasa = `Besok Puasa Ayyamul Bidh Tanggal ${tglH} Hijriyah.`;
            }

            if (infoPuasa) {
                tampilkanNotifFloating(infoPuasa);
                
                // Suara Sapaan (Cek agar tidak spam)
                const keySapa = `sapa_pengingat_${tglCari}`;
                if (localStorage.getItem(keySapa) !== 'true') {
                    if(typeof asistenNgomong === "function") {
                        asistenNgomong("Assalamu'alaikum... " + infoPuasa);
                    }
                    localStorage.setItem(keySapa, 'true');
                }
            }
        }
    }
}

// --- 3. UI NOTIFIKASI FLOATING ---
function tampilkanNotifFloating(pesan) {
    let divNotif = document.getElementById('notif-agenda-floating');
    
    if (!divNotif) {
        divNotif = document.createElement('div');
        divNotif.id = "notif-agenda-floating";
        document.body.appendChild(divNotif);
    }

    divNotif.innerHTML = `
        <div style="font-size:24px;">🌙</div>
        <div style="flex:1; text-align:left;">
            <b style="color:#ffcb8e; display:block; font-size:14px; margin-bottom:2px;">Agenda Puasa</b>
            <span style="font-size:13px; line-height:1.4; opacity:0.9;">${pesan}</span>
        </div>
        <button class="btn-tutup-agenda" onclick="tutupAgenda()">×</button>
    `;

    setTimeout(() => {
        divNotif.classList.add('muncul');
    }, 1000);
}

function tutupAgenda() {
    const el = document.getElementById('notif-agenda-floating');
    if (el) {
        el.classList.remove('muncul');
        setTimeout(() => { el.remove(); }, 600);
    }
}

// Tambahkan asistenNgomong fallback jika belum ada
if (typeof asistenNgomong !== "function") {
    window.asistenNgomong = function(teks) {
        console.log("Asisten berbicara: " + teks);
        // Bossku bisa tambah ganti suara TTS di sini nanti
    };
}