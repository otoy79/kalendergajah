/* AL-QUR'AN PRO - CORE ENGINE (ADZAN & COUNTDOWN) */

  /* AL-QUR'AN PRO - BAGIAN SUARA */

let jadwalSholatGlobal = {};
if (!window.suaraAsisten) {
    window.suaraAsisten = new Audio();
    window.suaraAsisten.preload = "auto";
}

  // --- FUNGSI KIRIM SEMUA JADWAL KE KODULAR ---
function kirimJadwalKeKodular() {
    if (window.AppInventor && jadwalSholatGlobal) {
        // Kita gabungkan jam sholat jadi satu teks panjang
        let dataJam = "SIMPAN_JADWAL|" + 
            jadwalSholatGlobal.Imsak.split(' ')[0] + "|" +
            jadwalSholatGlobal.Fajr.split(' ')[0] + "|" +
            jadwalSholatGlobal.Dhuhr.split(' ')[0] + "|" +
            jadwalSholatGlobal.Asr.split(' ')[0] + "|" +
            jadwalSholatGlobal.Maghrib.split(' ')[0] + "|" +
            jadwalSholatGlobal.Isha.split(' ')[0];
        
        // Kirim ke WebViewString
        window.AppInventor.setWebViewString(dataJam);
    }
}

// --- 1. FUNGSI ADZAN ---
function putarAdzan(nama) {
    const notif = document.getElementById('notif-sholat');
    if (notif) {
        document.getElementById('judul-notif').innerText = `Waktu ${nama} Tiba`;
        notif.classList.add('tampil');
    }
    if (window.AppInventor) {
        window.AppInventor.setWebViewString("ADZAN:" + nama);
    }
    window.suaraAsisten.pause();
    // LINK ADZAN MILIK BOSSKU
    window.suaraAsisten.src = "https://alquran-pro.pages.dev/audio/adzan.mp3";
    window.suaraAsisten.loop = false;
    
    window.suaraAsisten.play().catch(e => console.log("Gagal putar Adzan: " + e));
    
    // Notif hilang otomatis setelah 4 menit
    setTimeout(() => { tutupNotif(); }, 240000);
}

// --- 2. FUNGSI IMSAK / TARHIM ---
function putarSirineImsak() {
    const notif = document.getElementById('notif-sholat');
    if (notif) {
        document.getElementById('judul-notif').innerText = `Waktu Imsak`;
        notif.classList.add('tampil');
    }
    if (window.AppInventor) {
        window.AppInventor.setWebViewString("IMSAK");
    }
    
    window.suaraAsisten.pause();
    // LINK TARHIM MILIK BOSSKU
    window.suaraAsisten.src = "https://alquran-pro.pages.dev/audio/imsak_tahrim.mp3";
    window.suaraAsisten.loop = true; // Tarhim biasanya mutar terus sampai subuh
    
    window.suaraAsisten.play().catch(e => console.log("Gagal putar Tarhim: " + e));
}

// --- 3. FUNGSI NOTIF 10 MENIT (BELT) ---
function tampilkanNotif(judul, pesan) {
    const notif = document.getElementById('notif-sholat');
    if (notif) {
        document.getElementById('judul-notif').innerText = judul;
        document.getElementById('pesan-notif').innerText = pesan;
        notif.classList.add('tampil');
    }
    if (window.AppInventor) {
        window.AppInventor.setWebViewString("BELT");
    }

    window.suaraAsisten.pause();
    // LINK BELT MILIK BOSSKU
    window.suaraAsisten.src = "https://alquran-pro.pages.dev/audio/belt.mp3";
    window.suaraAsisten.loop = false;
    
    window.suaraAsisten.play().catch(e => console.log("Gagal putar Belt: " + e));
    
    // Tutup otomatis setelah 30 detik
    setTimeout(() => { tutupNotif(); }, 30000);
}

function tutupNotif() {
    const notif = document.getElementById('notif-sholat');
    if (notif) notif.classList.remove('tampil');
    if (window.suaraAsisten) { 
        window.suaraAsisten.pause(); 
        window.suaraAsisten.currentTime = 0; 
    }
}

// --- UPDATE FUNGSI AMBIL ALAMAT ---
async function dapatkanNamaAlamat(lat, lon) {
    const elStatus = document.getElementById('status-lokasi');
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        if (data && data.display_name) {
            if (elStatus) {
                elStatus.innerHTML = `<span class="dot-gps"></span> ${data.display_name}`;
            }
            // Simpan nama lokasi agar sinkron ke halaman jadwal
            localStorage.setItem('userAlamatLengkap', data.display_name);
            localStorage.setItem('userKota', data.address.city || data.address.town || data.address.suburb || "Jakarta");
        }
    } catch (e) {
        console.log("Gagal ambil nama jalan");
    }
}

async function ambilJadwal() {
    const elCountdown = document.getElementById('jkt-countdown-sholat');
    const elStatus = document.getElementById('status-lokasi');
    const sekarang = new Date();
    const tglHariIni = sekarang.getDate();
    const blnHariIni = sekarang.getMonth() + 1;
    const thnHariIni = sekarang.getFullYear();

    // --- 1. CEK CACHE LOCALSTORAGE DULU (Biar Langsung Jreng Pas Offline) ---
    const cacheLama = localStorage.getItem('jadwal_sholat_data');
    const alamatLama = localStorage.getItem('userAlamatLengkap');

    if (cacheLama) {
        const cache = JSON.parse(cacheLama);
        // Jika data cache bulan & tahunnya cocok, pakai itu dulu sambil nunggu GPS
        if (cache.bulan === blnHariIni && cache.tahun === thnHariIni) {
            const dataHariIni = cache.data.find(h => parseInt(h.date.gregorian.day) === tglHariIni);
            if (dataHariIni) {
                jadwalSholatGlobal = dataHariIni.timings;
                updateTampilanKecil();
                mulaiCountdown();
                if (elStatus && alamatLama) {
                    elStatus.innerHTML = `<span class="dot-gps" style="background:orange;"></span> ${alamatLama} (Offline)`;
                }
                console.log("Menggunakan data offline yang tersimpan.");
            }
        }
    }

    // --- 2. BARU JALANKAN GPS (Update data kalau ada internet/sinyal) ---
    const fetchJadwalGPS = async (lat, lon) => {
        try {
            const url = `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lon}&method=11&month=${blnHariIni}&year=${thnHariIni}&tune=2,2,2,4,3,3,2,2`;
            const r = await fetch(url);
            const res = await r.json();
            
            if (res.code === 200) {
                const dataHariIni = res.data.find(h => parseInt(h.date.gregorian.day) === tglHariIni);
                jadwalSholatGlobal = dataHariIni.timings;

                // SIMPAN KE LOCALSTORAGE
                localStorage.setItem('userLat', lat);
                localStorage.setItem('userLon', lon);
                localStorage.setItem('jadwal_sholat_data', JSON.stringify({
                    kota: "Lokasi GPS",
                    lat: lat,
                    lon: lon,
                    bulan: blnHariIni,
                    tahun: thnHariIni,
                    data: res.data
                }));

                updateTampilanKecil();
                mulaiCountdown();
                kirimJadwalKeKodular();
                dapatkanNamaAlamat(lat, lon);
            }
        } catch (e) {
            console.log("Sinyal lemah, tetap pakai data offline.");
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => { fetchJadwalGPS(pos.coords.latitude, pos.coords.longitude); },
            () => { console.log("GPS mati, biarkan pakai data offline."); },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }
}

// 2. UPDATE TULISAN JAM DI KARTU
function updateTampilanKecil() {
    const f = (w) => w ? w.split(' ')[0] : "--:--";
    const mapping = {
        's-imsak': 'Imsak', 's-subuh': 'Fajr', 's-dzuhur': 'Dhuhr',
        's-ashar': 'Asr', 's-maghrib': 'Maghrib', 's-isya': 'Isha'
    };
    for (let [id, key] of Object.entries(mapping)) {
        const el = document.getElementById(id);
        if(el) el.innerText = f(jadwalSholatGlobal[key]);
    }
}

// 3. MESIN COUNTDOWN (DAGINGNYA DI SINI)
function mulaiCountdown() {
    const listNama = {'Imsak':'Imsak','Fajr':'Subuh','Dhuhr':'Dzuhur','Asr':'Ashar','Maghrib':'Maghrib','Isha':'Isya'};
    
    // Bersihkan interval lama kalau ada
    if (window.intervalCountdownIndex) clearInterval(window.intervalCountdownIndex);

    window.intervalCountdownIndex = setInterval(() => {
        if (!jadwalSholatGlobal || Object.keys(jadwalSholatGlobal).length === 0) return;

        const sekarang = new Date();
        const f = (w) => w ? w.split(' ')[0] : "00:00";
        const jamSekarang = sekarang.getHours().toString().padStart(2,'0') + ":" + sekarang.getMinutes().toString().padStart(2,'0');
        
        let targetWaktu = null; 
        let namaSholat = "";

        // Cari jadwal berikutnya
        for (let key in listNama) {
            if (jadwalSholatGlobal[key] && f(jadwalSholatGlobal[key]) > jamSekarang) {
                targetWaktu = f(jadwalSholatGlobal[key]);
                namaSholat = listNama[key];
                break;
            }
        }

        // Jika sudah lewat Isya, ambil Imsak besok
        if (!targetWaktu) { 
            targetWaktu = f(jadwalSholatGlobal['Imsak']); 
            namaSholat = "Imsak"; 
        }

        const [h, m] = targetWaktu.split(':');
        const waktuTarget = new Date();
        waktuTarget.setHours(parseInt(h), parseInt(m), 0);
        if (waktuTarget < sekarang) waktuTarget.setDate(waktuTarget.getDate() + 1);

        const selisih = waktuTarget - sekarang;
        const sJam = Math.floor(selisih / 3600000);
        const sMenit = Math.floor((selisih % 3600000) / 60000);
        const sDetik = Math.floor((selisih % 60000) / 1000);

        const el = document.getElementById('jkt-countdown-sholat');
        if (el) {
            if (sJam === 0 && sMenit < 6) {
                el.innerHTML = `<div style="background:red; color:white; padding:5px; border-radius:8px; animation:pulse 0.8s infinite;">⚠️ ${sMenit}m ${sDetik}s LAGI KE ${namaSholat.toUpperCase()}!</div>`;
            } else {
                el.innerHTML = `⏳ <b>${sJam}j ${sMenit}m ${sDetik}s</b> lagi menuju <b>${namaSholat}</b>`;
            }
        }

        // Trigger Suara & Notif
        if (sJam === 0 && sMenit === 10 && sDetik === 0 && namaSholat !== 'Subuh') {
            tampilkanNotif(`10 Menit Lagi ${namaSholat}`, `Persiapan yuk!`);
        }
        if (sJam === 0 && sMenit === 00 && sDetik === 1) {
            if (namaSholat === 'Imsak') putarSirineImsak(); else putarAdzan(namaSholat);
        }
    }, 1000);
}