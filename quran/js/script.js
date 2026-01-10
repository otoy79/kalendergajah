
    // =========================================
    // 1. VARIABEL GLOBAL & STATE
    // =========================================
    const container = document.getElementById('mushaf-container');
    const player = new Audio();
    
    let dataAyatAktif = [];
    let listSurah = [];
    let surahSekarang = 1;
    let indexBerjalan = 0;
    let fontSizeArab = parseInt(localStorage.getItem('userFontSize')) || 30;
    let qariAktif = localStorage.getItem('userQari') || 'Alafasy';
    let gudangSurah = {}; 

    // =========================================
    // 2. FUNGSI UTILITY (TOAST & UI)
    // =========================================
    function tampilkanPesan(msg) {
        const toast = document.getElementById('toast');
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // =========================================
    // 3. INISIALISASI DATA (OFFLINE FIRST)
    // =========================================
    const listOffline = localStorage.getItem('list_surah');

    // Jika ada di memori HP, langsung pakai
    if (listOffline) {
        listSurah = JSON.parse(listOffline);
        muatPengaturanPaten();
        filterSurah('');
    }

    // Tetap ambil data terbaru dari API untuk update
    fetch('https://equran.id/api/v2/surat')
        .then(r => r.json())
        .then(res => {
            listSurah = res.data;
            localStorage.setItem('list_surah', JSON.stringify(res.data));
            
            // Jika memori tadi kosong, baru jalankan inisialisasi di sini
            if (!listOffline) {
                muatPengaturanPaten();
                filterSurah('');
            }
        })
        .catch(err => {
            if (!listOffline) tampilkanPesan("⚠️ Gagal memuat data. Periksa internet.");
        });

    // =========================================
    // 4. FUNGSI NAVIGASI & SEARCH
    // =========================================
    
    function filterSurah(keyword) {
    const hasilCari = document.getElementById('hasilCari');
    hasilCari.innerHTML = ''; 
    
    const filtered = listSurah.filter(s => 
        s.namaLatin.toLowerCase().includes(keyword.toLowerCase())
    );
    
    filtered.forEach(s => {
        const btn = document.createElement('button');
        // s.nama adalah kolom dari JSON yang isinya tulisan Arab surah
        btn.innerHTML = `
            <span class="no-surah">${s.nomor}.</span> 
            <span class="nama-surah">${s.namaLatin}</span>
            <span class="nama-arab">${s.nama}</span>
        `;
        
        btn.onclick = () => gantiSurah(s.nomor);
        hasilCari.appendChild(btn);
    });
}

    function lompatKeAyat() {
        const input = document.getElementById('inputAyat');
        if (!input) return;

        const noAyat = parseInt(input.value);

        if (!noAyat || noAyat < 1 || noAyat > dataAyatAktif.length) {
            tampilkanPesan(`❌ Ayat tidak tersedia (1 - ${dataAyatAktif.length})`);
            return;
        }

        scrollKeAyat(noAyat);
        input.value = '';
        tampilkanPesan(`🚀 Menuju Ayat ${noAyat}`);
    }

    // =========================================
    // 5. PENGATURAN & PENAMPILAN
    // =========================================
    
    function gantiFontArab(fontName) {
        // Terapkan variabel CSS
        document.documentElement.style.setProperty('--font-arab', fontName);
        
        // Simpan ke memori HP
        localStorage.setItem('pilihan_font_arab', fontName);
        
        console.log("Font Arab diubah ke:", fontName);
    }
  
   // =========================================
// 6. FUNGSI NAVIGASI (KEMBALI KE HOME)
// =========================================
function kembaliKeHome() {
    // 1. Tampilkan Dashboard, Sembunyikan Mushaf
    const dashboard = document.getElementById('dashboard-awal');
    if (dashboard) dashboard.style.display = 'block';
    
    // 2. Bersihkan container mushaf agar RAM ringan
    const wadah = document.getElementById('daftar-ayat') || document.getElementById('mushaf-container');
    if (wadah) wadah.innerHTML = ''; 

    // 3. Reset Header
    const judulApp = document.getElementById('judul-app');
    if (judulApp) judulApp.innerText = "Al-Qur'an Pro";
    
    const subInfo = document.getElementById('sub-judul'); // Sesuaikan ID dengan header tadi
    if (subInfo) subInfo.innerText = "Memuat...";

    // 4. Sembunyikan UI yang tidak diperlukan
    const cariBox = document.getElementById('pencarian-ayat-box');
    if (cariBox) cariBox.style.display = 'none';

    // 5. Update Bookmark terbaru di Dashboard
    if (typeof updateTampilanBookmark === "function") {
        updateTampilanBookmark();
    }

    // 6. Reset Scroll ke paling atas (Instant)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// =========================================
// 7. FUNGSI LOAD SURAH (GANTI SURAH)
// =========================================
     function gantiSurah(nomor, targetAyat = null) {
    const dashboard = document.getElementById('dashboard-awal');
    if(dashboard) dashboard.style.display = 'none';

    const wadahAyat = document.getElementById('daftar-ayat') || document.getElementById('mushaf-container');
    surahSekarang = parseInt(nomor);

    // 1. Cek kalau surah sudah pernah dibuka (ada di RAM)
    if (gudangSurah[surahSekarang]) {
        tampilkanKeLayar(gudangSurah[surahSekarang], targetAyat);
        return;
    }

    // 2. Tampilkan loading
    if(wadahAyat) {
        wadahAyat.innerHTML = '<div style="text-align:center; padding:50px;">🌿 Membuka Surah...</div>';
    }

    // 3. Panggil file .js secara dinamis
    const scriptSurah = document.createElement('script');
    scriptSurah.src = `data/${surahSekarang}.js`; // Memanggil file .js
    
    scriptSurah.onload = () => {
        // dataSurah adalah variabel global yang ada di dalam file .js tadi
        if (typeof dataSurah !== 'undefined') {
            gudangSurah[surahSekarang] = dataSurah;
            tampilkanKeLayar(dataSurah, targetAyat);
            
            // Bersihkan variabel agar tidak tabrakan saat buka surah lain
            dataSurah = undefined; 
            // Hapus tag script dari header biar gak menuh-menuhin RAM
            scriptSurah.remove();
        }
    };

    scriptSurah.onerror = () => {
        if(wadahAyat) {
            wadahAyat.innerHTML = `<div style="text-align:center; padding:20px;">❌ File data/${surahSekarang}.js tidak ditemukan.</div>`;
        }
    };

    document.head.appendChild(scriptSurah);
}
// =========================================
// 8. FUNGSI RENDER LAYOUT MUSHAF
// =========================================
    function tampilkanKeLayar(data, targetAyat) {
    dataAyatAktif = data.ayat || data.ayats;
    const wadah = document.getElementById('daftar-ayat') || document.getElementById('mushaf-container');
    
    // 1. Update Judul Header
    document.getElementById('judul-app').innerText = `${data.nomor}. ${data.namaLatin}`;

    // 2. Siapkan Struktur Area Info & List
    wadah.innerHTML = `
        <div id="area-info-surah" style="padding: 10px; text-align: center; border-bottom: 1px dashed var(--primary); margin-top: 1px;"></div>
        <div id="area-list-ayat"></div>
    `;

    // 3. Isi Area Info Surah
    const areaInfo = document.getElementById('area-info-surah');
    const arti = data.arti || data.deskripsi || "";
    const jml = data.jumlahAyat || dataAyatAktif.length;
    const tempat = data.tempatTurun || "";

    areaInfo.innerHTML = `
        <p style="font-size: 16px; font-style: italic; color: var(--primary); margin: 0;">"${arti}"</p>
        <small style="opacity:0.7; font-size: 11px; display:block; margin-bottom:10px;">${jml} Ayat • ${tempat}</small>
        
        <div style="display: flex; font-size: 10px; justify-content: center; gap: 5px; margin-bottom: 10px;">
            <input type="number" id="inputAyat" placeholder="Ke Ayat..." 
                   style="padding: 5px; border-radius: 4px; border: 1px solid var(--primary); width: 80px; text-align: center;">
            <button onclick="lompatKeAyat()" 
                    style="padding: 5px 12px; border-radius: 4px; background: var(--primary); color: white; border: none; cursor:pointer;">GO</button>
        </div>
        
        <p style="font-size: 24px; font-family: 'LPMQ', serif; margin: 15px;">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
    `;

    // 4. Jalankan Render List Ayat
    if (typeof renderAyat === "function") {
        renderAyat(data.namaLatin); 
    }

    // 5. Logika Navigasi: Scroll ke Ayat atau ke Atas
    if (targetAyat) {
        // Kasih jeda sedikit biar render selesai, baru scroll meluncur ke ayat target
        setTimeout(() => {
            scrollKeAyat(targetAyat);
            
            // Opsional: Kasih efek highlight warna biar user tahu itu ayatnya
            const el = document.getElementById(`card-${targetAyat - 1}`);
            if(el) {
                el.style.transition = "background 1s";
                el.style.background = "rgba(var(--primary-rgb), 0.2)";
                setTimeout(() => { el.style.background = "transparent"; }, 2000);
            }
        }, 600); 
    } else {
        // Kalau cuma buka surah biasa (bukan dari bookmark), scroll ke paling atas
        window.scrollTo(0, 0);
    }

    // 6. Sinkronisasi Header & Dashboard (Tanpa Menimpa Bookmark Baru)
    try {
        // Cek apakah ada bookmark lama di memori
        const b = JSON.parse(localStorage.getItem('quran_bmark'));
        const subJudul = document.getElementById('sub-judul');
        
        if (b && subJudul) {
            subJudul.innerHTML = `Lanjut: <b style="text-decoration:underline; cursor:pointer;" onclick="gantiSurah(${b.s}, ${b.a})">${b.nama}</b>`;
        }

        // Update tampilan resume-card di Dashboard
        if (typeof updateTampilanBookmark === "function") {
            updateTampilanBookmark();
        }
    } catch (e) {
        console.error("Gagal sinkronisasi tampilan:", e);
    }

    // Pasang ulang Event Enter pada input
    setTimeout(() => {
        const input = document.getElementById('inputAyat');
        if (input) input.addEventListener('keypress', e => { if (e.key === 'Enter') lompatKeAyat(); });
    }, 500);
}
      
     // =========================================
// 9. LOGIKA TAJWID WARNA (REGEX)
// =========================================
function beriWarna(teks) {
    if (!teks) return "";
    
    // Ghunnah
    teks = teks.replace(/([نم]ّ)/g, '<span class="ghunnah">$1</span>');
    
    // Iqlab
    teks = teks.replace(/([ۢ۬])/g, '<span class="iqlab">$1</span>');
    
    // Ikhfa (Mim & Nun Sukun/Tanwin ketemu huruf ikhfa)
    teks = teks.replace(/(م)(?=\s*[ب])/g, '<span class="ikhfa">$1</span>');
    teks = teks.replace(/(نْ|[ًٌٍ])(?![^<]*>)(?=\s*[ تثدذرزسشصضطظ])/g, '<span class="ikhfa">$1</span>');
    
    // Idgham
    teks = teks.replace(/(نْ|[ًٌٍ])(?=\s*[يمنو])/g, '<span class="idgham">$1</span>');
    teks = teks.replace(/(مْ)(?=\s*م)/g, '<span class="idgham">$1</span>');
    
    // Qalqalah
    teks = teks.replace(/([بجدطق]ْ)/g, '<span class="qalqalah">$1</span>');
    
    return teks;
}

// =========================================
// 10. FUNGSI RENDER DAFTAR AYAT
// =========================================
function renderAyat(namaSurah) {
    // Gunakan area khusus list agar tidak menimpa info surah
    const wadahAyat = document.getElementById('area-list-ayat') || document.getElementById('mushaf-container');
    if (!wadahAyat) return;
    
    wadahAyat.innerHTML = ''; // Bersihkan list sebelumnya
    const namaAman = namaSurah.replace(/'/g, "\\'");

    dataAyatAktif.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'ayat-card';
        card.id = `card-${index}`;
        
        // Membuat string data untuk fitur Share (Base64)
        let dataString = "";
        try {
            const dataShare = {
                surah: namaSurah,
                ayat: item.nomorAyat,
                arab: item.teksArab,
                latin: item.teksLatin,
                indo: item.teksIndonesia
            };
            dataString = btoa(encodeURIComponent(JSON.stringify(dataShare)));
        } catch (e) { 
            dataString = ""; 
        }

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom: 15px; align-items: center; font-size:12px;">
                <span style="background:var(--primary); text-align: center; color:white; padding:5px 12px; border-radius:10px; font-weight:bold;">
                    Ayat ${item.nomorAyat}
                </span>
                <div style="display:flex; gap:8px;">
                    <button class="btn-kecil" onclick="simpanBmark(${surahSekarang}, ${item.nomorAyat}, '${namaAman}')">🔖 Simpan</button>
                    <button class="btn-kecil" onclick="prosesShare(${index}, '${namaAman}')">📤 Share</button>
                </div>
            </div>
            
            <div class="teks-arab" onclick="putarAudio(${index})" style="font-size:${fontSizeArab}px;">
                ${beriWarna(item.teksArab)}
            </div>
            
            <div class="teks-latin" style="color:var(--primary); margin-top:15px; font-style:italic; font-size:14px;">
                ${item.teksLatin}
            </div>
            
            <div class="teks-indo" style="margin-top:10px; line-height:1.6; font-size:15px; opacity:0.9;">
                ${item.teksIndonesia}
            </div>
        `;
        wadahAyat.appendChild(card);
    });
}

// =========================================
// 11. SISTEM AUDIO (PLAYER)
// =========================================
function putarAudio(index) {
    if (index >= dataAyatAktif.length) {
        document.getElementById('btnPlay').innerText = "Selesai ✨";
        return;
    }
    
    indexBerjalan = index;
    const item = dataAyatAktif[index];
    
    // 1. Highlight Ayat Aktif & Auto Scroll
    document.querySelectorAll('.ayat-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById(`card-${index}`);
    
    if (activeCard) {
        activeCard.classList.add('active');
        const headerHeight = 80; // Sesuaikan dengan tinggi header sticky
        const offsetPosition = (activeCard.getBoundingClientRect().top + window.pageYOffset) - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }

    // 2. Setup ID Audio (Format 3 digit)
    const s = surahSekarang.toString().padStart(3, '0');
    const a = item.nomorAyat.toString().padStart(3, '0');

    const qariMap = {
        'Alafasy': 'Alafasy_128kbps',
        'Abdurrahmaan_As-Sudais': 'Abdurrahmaan_As-Sudais_192kbps',
        'Muhammad_Jibreel': 'Muhammad_Jibreel_128kbps',
        'Abdul_Basit_Murattal' : 'Abdul_Basit_Murattal_192kbps'
    };

    const folderQari = qariMap[qariAktif] || 'Alafasy_128kbps';
    
    // 3. Playback & Optimasi
    player.src = `https://www.everyayah.com/data/${folderQari}/${s}${a}.mp3`;
    player.preload = "auto";

    player.play().then(() => {
        document.getElementById('btnPlay').innerText = "Pause Audio";
        
        // TRICK: Pre-load ayat berikutnya saat ayat sekarang diputar
        if (index + 1 < dataAyatAktif.length) {
            const nextNo = dataAyatAktif[index + 1].nomorAyat.toString().padStart(3, '0');
            const prefetch = new Image(); // Trik ringan untuk trigger cache browser
            prefetch.src = `https://www.everyayah.com/data/${folderQari}/${s}${nextNo}.mp3`;
        }
    }).catch(e => {
        tampilkanPesan("Gagal memutar audio. Cek koneksi.");
    });

    // Handle Error (Auto switch ke Alafasy jika qari lain error)
    player.onerror = function() {
        tampilkanPesan("Audio bermasalah, mencoba server Alafasy...");
        if (qariAktif !== 'Alafasy') {
            qariAktif = 'Alafasy';
            setTimeout(() => putarAudio(index), 1000);
        }
    };

    // Otomatis lanjut ke ayat berikutnya
    player.onended = () => {
        setTimeout(() => putarAudio(index + 1), 600); // Jeda 0.6 detik biar natural
    };
}

    // =========================================
// 12. KONTROL AUDIO (QARI & PLAYBACK)
// =========================================
function gantiQari(nama) {
    qariAktif = nama;
    localStorage.setItem('userQari', nama);
    
    // Jika audio lagi mutar, langsung ganti suaranya di ayat yang sama
    if (!player.paused) {
        putarAudio(indexBerjalan);
    }
    tampilkanPesan(`🎙️ Qari diganti ke: ${nama}`);
}

function handlePlayPause() {
    // Jika belum ada lagu yang disetel tapi sudah klik play
    if (!player.src && dataAyatAktif.length > 0) {
        return putarAudio(0);
    }

    const btn = document.getElementById('btnPlay');
    if (player.paused) {
        player.play();
        btn.innerText = "⏸️ Pause Audio";
    } else {
        player.pause();
        btn.innerText = "▶️ Lanjut Audio";
    }
}

// =========================================
// 13. PENGATURAN TEMA & TAMPILAN
// =========================================
function gantiTipeMushaf(tipe) {
    // Bersihkan kelas tema lama
    document.body.classList.remove('mushaf-1', 'mushaf-2', 'mushaf-3', 'mushaf-4');
    document.body.classList.add(tipe);
    localStorage.setItem('tipeMushaf', tipe);

    // Otomatis matikan Dark Mode jika pindah ke Madinah atau Hafalan (biar gak kontras)
    if (tipe === 'mushaf-2' || tipe === 'mushaf-3') {
        document.body.classList.remove('dark-mode');
        const checkDark = document.getElementById('checkDark');
        if (checkDark) checkDark.checked = false;
        localStorage.setItem('userDark', false);
    }
    
    // Reset warna teks jika variabel warna berubah
    document.querySelectorAll('.teks-arab').forEach(el => el.style.color = 'var(--text)');
    tampilkanPesan("Tema Mushaf diterapkan");
}

function toggleDarkMode(isDark) {
    const tipeAktif = localStorage.getItem('tipeMushaf') || 'mushaf-1';
    
    // Jika user di Mushaf Madinah/Hafalan, dilarang pakai Dark Mode (karena warnanya paten)
    if (isDark && (tipeAktif === 'mushaf-2' || tipeAktif === 'mushaf-3')) {
        tampilkanPesan("⚠️ Tema ini sudah punya warna khusus (Mode Gelap tidak tersedia)");
        document.getElementById('checkDark').checked = false;
        return;
    }
    
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('userDark', isDark);
}

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    const overlay = document.getElementById('overlay');
    if (!panel || !overlay) return;

    panel.classList.toggle('open');
    overlay.style.display = panel.classList.contains('open') ? 'block' : 'none';
}

// =========================================
// 14. TOGGLE FITUR & UKURAN FONT
// =========================================
function toggleTajwid(isOn) { 
    document.body.classList.toggle('tajwid-on', isOn); 
    localStorage.setItem('userTajwid', isOn); 
}

function toggleLatin(show) { 
    document.body.classList.toggle('hide-latin', !show); 
    localStorage.setItem('userLatin', show); 
}

function toggleIndo(show) { 
    document.body.classList.toggle('hide-indo', !show); 
    localStorage.setItem('userIndo', show); 
}

function ubahFont(n) {
    fontSizeArab += n;
    // Batas minimal font agar tidak hilang
    if (fontSizeArab < 16) fontSizeArab = 16; 
    
    document.querySelectorAll('.teks-arab').forEach(el => el.style.fontSize = fontSizeArab + 'px');
    document.getElementById('fontLabel').innerText = fontSizeArab + 'px';
    localStorage.setItem('userFontSize', fontSizeArab);
}

// =========================================
// 15. SISTEM BOOKMARK MANUAL
// =========================================
    function simpanBmark(s, a, nama) {
    const skrg = new Date();
    const opsi = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    const waktuString = skrg.toLocaleString('id-ID', opsi);

    // Data yang disimpan: Surah, Ayat, Nama Surah, dan Waktu klik
    const dataSimpan = { 
        s: s, 
        a: a, 
        nama: nama, 
        waktu: waktuString 
    };
    
    // Simpan ke KTP permanen
    localStorage.setItem('quran_bmark', JSON.stringify(dataSimpan));
    
    // Update tampilan kartu di dashboard saat itu juga
    updateTampilanBookmark();
    
    // Kasih notifikasi biar mantap
    tampilkanPesan(`🔖 Bookmark disimpan: ${nama} ayat ${a}`);
}
        
    // =========================================
// 16. UI UTILITY (TOAST & SCROLL)
// =========================================
function tampilkanToast(pesan) {
    let toast = document.getElementById('toast-notif');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notif';
        toast.style = "position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.85); color:white; padding:10px 20px; border-radius:30px; font-size:12px; z-index:9999; transition:opacity 0.3s; pointer-events:none; font-family:sans-serif;";
        document.body.appendChild(toast);
    }
    toast.innerText = pesan;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

function scrollKeAyat(no) {
    setTimeout(() => {
        const el = document.getElementById(`card-${no - 1}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

function keAtas() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================
// 17. SISTEM SHARE & BOOKMARK
// =========================================
function updateTampilanBookmark() {
    const b = JSON.parse(localStorage.getItem('quran_bmark'));
    const resumeInfo = document.getElementById('resume-info');
    const resumeCard = document.getElementById('resume-card');
    
    if (b && resumeInfo) {
        resumeInfo.innerHTML = `
            ${b.nama} (Ayat ${b.a})
            <div style="font-size: 10px; font-weight: normal; opacity: 0.7; margin-top: 2px;">
                🕒 Disimpan: ${b.waktu}
            </div>
        `;
        if (resumeCard) resumeCard.style.display = 'block';
    } else {
        if (resumeCard) resumeCard.style.display = 'none';
    }
}

function bukaTerakhir() {
    const b = JSON.parse(localStorage.getItem('quran_bmark'));
    if (b) gantiSurah(b.s, b.a);
    else tampilkanPesan("Belum ada riwayat bacaan");
}

function prosesShare(index, namaSurah) {
    try {
        const item = dataAyatAktif[index];
        const pesan = `*${namaSurah} : Ayat ${item.nomorAyat}*\n\n` +
                      `${item.teksArab}\n\n` +
                      `_(${item.teksLatin})_\n\n` +
                      `Artinya: "${item.teksIndonesia}"\n\n` +
                      `via : https://alquran.pages.dev/quran/ (Al-Qur'an Pro by ℴ𝓉ℴ𝓎) `;

        if (navigator.share) {
            navigator.share({
                title: `Al-Qur'an - ${namaSurah}:${item.nomorAyat}`,
                text: pesan
            }).catch(() => console.log("Batal Share"));
        } else {
            navigator.clipboard.writeText(pesan).then(() => {
                tampilkanPesan("📋 Teks berhasil disalin!");
            });
        }
    } catch (e) {
        tampilkanPesan("❌ Gagal memproses share");
    }
}

// =========================================
// 18. JADWAL SHOLAT & GPS
// =========================================
function muatJadwalSholat() {
    const displayCountdown = document.getElementById('countdown-sholat');
    const jktLat = -6.2088, jktLng = 106.8456; // Default Jakarta

    const eksekusiAmbil = (lat, lng) => {
        fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=11`)
            .then(r => r.json())
            .then(res => { if (res.data) updateTabelJadwal(res.data.timings); })
            .catch(() => { if (displayCountdown) displayCountdown.innerText = "Mode Offline"; });
    };

    eksekusiAmbil(jktLat, jktLng); // Jalankan default dulu

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => eksekusiAmbil(pos.coords.latitude, pos.coords.longitude),
            null, { timeout: 3000 }
        );
    }
}

function updateTabelJadwal(timings) {
    const ids = ['shubuh', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    ids.forEach((id, i) => {
        const el = document.getElementById(`${id}-val`);
        if (el) el.innerText = timings[keys[i]];
    });

    const sekarang = new Date();
    const jamMenit = (t) => {
        const [h, m] = t.split(':');
        const d = new Date();
        d.setHours(parseInt(h), parseInt(m), 0);
        return d;
    };

    const daftarWaktu = [
        { nama: 'Subuh', waktu: jamMenit(timings.Fajr) },
        { nama: 'Dzuhur', waktu: jamMenit(timings.Dhuhr) },
        { nama: 'Ashar', waktu: jamMenit(timings.Asr) },
        { nama: 'Maghrib', waktu: jamMenit(timings.Maghrib) },
        { nama: 'Isya', waktu: jamMenit(timings.Isha) }
    ];

    let berikut = daftarWaktu.find(s => s.waktu > sekarang);
    const textCountdown = document.getElementById('countdown-sholat');
    
    if (!berikut) {
        if (textCountdown) textCountdown.innerText = "Waktunya Istirahat / Tahajud";
    } else {
        const selisih = berikut.waktu - sekarang;
        const jam = Math.floor(selisih / 3600000);
        const menit = Math.floor((selisih % 3600000) / 60000);
        if (textCountdown) textCountdown.innerText = `${berikut.nama} dalam ${jam > 0 ? jam + ' jam ' : ''}${menit} menit lagi`;
    }
}

// =========================================
// 19. INISIALISASI PENGATURAN (PATEN)
// =========================================
function muatPengaturanPaten() {
    muatJadwalSholat();
    
    const isDark = localStorage.getItem('userDark') === 'true';
    const isTajwid = localStorage.getItem('userTajwid') !== 'false';
    const isLatin = localStorage.getItem('userLatin') !== 'false';
    const isIndo = localStorage.getItem('userIndo') !== 'false';
    const tipeSaved = localStorage.getItem('tipeMushaf') || 'mushaf-1';
    const savedFont = localStorage.getItem('pilihan_font_arab') || "'LPMQ', sans-serif";

    // Terapkan semua setting
    document.documentElement.style.setProperty('--font-arab', savedFont);
    toggleDarkMode(isDark); 
    toggleTajwid(isTajwid); 
    toggleLatin(isLatin); 
    toggleIndo(isIndo); 
    gantiTipeMushaf(tipeSaved);

    // Sinkronkan UI Form
    if (document.getElementById('pilihFontArab')) document.getElementById('pilihFontArab').value = savedFont;
    if (document.getElementById('checkDark')) document.getElementById('checkDark').checked = isDark;
    if (document.getElementById('checkTajwid')) document.getElementById('checkTajwid').checked = isTajwid;
    if (document.getElementById('checkLatin')) document.getElementById('checkLatin').checked = isLatin;
    if (document.getElementById('checkIndo')) document.getElementById('checkIndo').checked = isIndo;
    if (document.getElementById('pilihMushaf')) document.getElementById('pilihMushaf').value = tipeSaved;
    if (document.getElementById('pilihQari')) document.getElementById('pilihQari').value = qariAktif;
    if (document.getElementById('fontLabel')) document.getElementById('fontLabel').innerText = fontSizeArab + 'px';
    
    updateTampilanBookmark();
}

// =========================================
// 20. EVENT LISTENERS (SWIPE & SCROLL)
// =========================================
let xStart = null;
document.addEventListener('touchstart', e => xStart = e.touches[0].clientX, {passive:true});
document.addEventListener('touchend', e => {
    if (!xStart) return;
    let xDiff = xStart - e.changedTouches[0].clientX;
    if (Math.abs(xDiff) > 120) {
        let cur = parseInt(surahSekarang);
        if (xDiff > 0 && cur < 114) gantiSurah(cur + 1);
        else if (xDiff < 0 && cur > 1) gantiSurah(cur - 1);
    }
    xStart = null;
}, {passive:true});

window.onscroll = function() {
    const btn = document.getElementById("btnBackToTop");
    if (btn) btn.style.display = (window.scrollY > 400) ? "block" : "none";
};

// Pastikan Input Enter bekerja
document.addEventListener('DOMContentLoaded', () => {
    const inputA = document.getElementById('inputAyat');
    if (inputA) inputA.addEventListener('keypress', e => { if (e.key === 'Enter') lompatKeAyat(); });
});
 
   
   window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const surahId = params.get('surah');
    const ayatId = params.get('ayat'); // Ambil nomor ayat dari URL
    if (surahId) {
        setTimeout(() => {
            // Panggil gantiSurah dengan tambahan parameter ayatId
            gantiSurah(surahId, ayatId); 
        }, 500);
    }
});