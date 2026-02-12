
    // =========================================
    // 1. VARIABEL GLOBAL & STATE
    // =========================================
    const container = document.getElementById('mushaf-container');
    const player = new Audio();
    
    let dataAyatAktif = [];
    let listSurah = [];
    let surahSekarang = 1;
    let indexBerjalan = 0;
    let fontSizeArab = parseInt(localStorage.getItem('userFontSize')) || 28;
    let qariAktif = localStorage.getItem('userQari') || 'Alafasy';
    let gudangSurah = {}; 
    let fontAktif = localStorage.getItem('fontArabPilihan') || 'font-qalam';

    function gantiFontArab(className) {
    fontAktif = className;
    localStorage.setItem('fontArabPilihan', className);

    const elemenArab = document.querySelectorAll('.teks-arab');
    elemenArab.forEach(el => {
        el.classList.remove('font-qalam', 'font-uthmani', 'font-lpmq');
        el.classList.add(className);
    });
}
  
    // =========================================
    // 2. FUNGSI UTILITY (TOAST & UI)
    // =========================================
    function tampilkanPesan(msg) {
        const toast = document.getElementById('toast');
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

  function toggleModeKitab(isOn) {
    // 1. Sinkronkan checkbox
    const chk = document.getElementById('hanya-arab');
    if (chk) chk.checked = isOn;

    // 2. Mainkan class di body
    if (isOn) {
        document.body.classList.add('mode-kitab');
    } else {
        document.body.classList.remove('mode-kitab');
    }
    
    // 3. Simpan ke permanen
    localStorage.setItem('userModeKitab', isOn);
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
            <span class="no-surah">${s.nomor}</span> 
            <span class="nama-surah">${s.namaLatin}</span>
            <span class="nama-arab">${s.nama}</span> 
             <span class="no-surahArab">${keAngkaArab(s.nomor)}</span>
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
            tampilkanPesan(`🚫 Ayat tidak tersedia (1 - ${dataAyatAktif.length})`);
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
            wadahAyat.innerHTML = `<div style="text-align:center; padding:20px;">🚫 File data Surah ${surahSekarang} tidak ditemukan.</div>`;
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
                   style="padding: 5px; border-radius: 4px; border: 1px solid var(--primary); width: 80px; text-align: center; background: var(--card-bg);
    color: var(--text);
    box-sizing: border-box;">
            <button onclick="lompatKeAyat()" 
                    style="padding: 5px 12px; border-radius: 4px; background: var(--primary); color: white; border: none; cursor:pointer;">GO</button>
        </div>
        
        <p class="teks-arab" style="margin: 15px; text-align: center; font-size:${fontSizeArab}px;">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p> 
   
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
            <div style="display:flex; justify-content:space-between; margin-bottom: 20px; align-items: center; font-size:12px;">
                  <span style="background:none; border:0.5px solid var(--text); color:var(--text);width:26px; height:26px; display:flex; align-items:center; justify-content:center; border-radius:50%; font-size:12px; font-weight: 800;">
                    ${item.nomorAyat}
                </span>
                <div style="display:flex; gap:8px;">
                    <button class="btn-kecil" onclick="simpanBmark(${surahSekarang}, ${item.nomorAyat}, '${namaAman}')">🔖 Simpan</button>
                    <button class="btn-kecil" onclick="prosesShare(${index}, '${namaAman}')">📤 Share</button>
                </div>
            </div>
            
            <div class="teks-arab ${fontAktif}" onclick="putarAudio(${index})" style="font-size:${fontSizeArab}px;">
        ${beriWarna(item.teksArab)}     <span class="nomor-ayat-arab">${keAngkaArab(item.nomorAyat)}</span>
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
    // 11. SISTEM AUDIO (PLAYER) - VERSI AUTO-ESTAFET
    // =========================================
    function putarAudio(index) {
        // 1. AMBIL DATA & VALIDASI
        const daftarAyat = dataAyatAktif;
        const noSurat = surahSekarang;

        if (!daftarAyat || !noSurat || daftarAyat.length === 0) return;

        // 2. LOGIKA PINDAH SURAH (ESTAFET)
        if (index >= daftarAyat.length) {
            let suratSelanjutnya = parseInt(noSurat) + 1;
            if (suratSelanjutnya <= 114) {
                tampilkanToast(`Surah Berikutnya: Surah ke-${suratSelanjutnya}...`);
                
                // Panggil gantiSurah (fungsi utama navigasi Anda)
                gantiSurah(suratSelanjutnya);

                // Tunggu data surah baru dimuat ke RAM, lalu putar ayat 1
                let cekDataBaru = setInterval(() => {
                    if (surahSekarang === suratSelanjutnya && dataAyatAktif.length > 0) {
                        clearInterval(cekDataBaru);
                        setTimeout(() => putarAudio(0), 1500); 
                    }
                }, 500);
                return;
            } else {
                tampilkanPesan("Khatam! Shadaqallahul 'adzim.");
                return;
            }
        }

        // 3. UPDATE STATE INDEX
        indexBerjalan = index;

        // 4. AMBIL DATA AYAT
        const ayatSekarang = daftarAyat[index];
        const nomorAyatReal = ayatSekarang.nomorAyat;

        // 5. SETUP QARI & URL
        const qariMap = {
            'Alafasy': 'Alafasy_128kbps',
            'Abdurrahmaan_As-Sudais': 'Abdurrahmaan_As-Sudais_192kbps',
            'Muhammad_Jibreel': 'Muhammad_Jibreel_128kbps',
            'Abdul_Basit_Murattal' : 'Abdul_Basit_Murattal_192kbps'
        };

        const folderQari = qariMap[qariAktif] || 'Alafasy_128kbps';
        const s = noSurat.toString().padStart(3, '0');
        const a = nomorAyatReal.toString().padStart(3, '0');

        // 6. EKSEKUSI PEMUTARAN
        player.src = `https://www.everyayah.com/data/${folderQari}/${s}${a}.mp3`;
        
        player.play().then(() => {
        // --- TAMBAHKAN INI ---
        const btnUtama = document.getElementById('btnPlay');
        if(btnUtama) btnUtama.innerText = "⏸️ Pause Audio";
            
            // 7. UI HIGHLIGHT & AUTO SCROLL
            // Bersihkan sisa highlight lama
            document.querySelectorAll('.ayat-card').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.teks-arab').forEach(el => el.classList.remove('sedang-dibaca'));

            const card = document.getElementById(`card-${index}`);
            if(card) {
                card.classList.add('active');
                const teksArab = card.querySelector('.teks-arab');
                if(teksArab) teksArab.classList.add('sedang-dibaca');

                // Scroll ke ayat yang sedang diputar
                const headerHeight = 83; 
                const offsetPosition = (card.getBoundingClientRect().top + window.pageYOffset) - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }).catch(e => {
            console.log("Audio play diblokir browser, menunggu interaksi user.");
            tampilkanPesan("Klik layar untuk memutar audio");
        });

        // 8. EVENT AUTO-NEXT & ERROR HANDLING
        player.onended = () => {
            setTimeout(() => putarAudio(index + 1), 800);
        };

        player.onerror = () => {
            // Jika qari pilihan error, coba switch ke Alafasy sebagai cadangan
            if (qariAktif !== 'Alafasy') {
                qariAktif = 'Alafasy';
                tampilkanPesan("Audio bermasalah, mencoba server cadangan...");
                setTimeout(() => putarAudio(index), 1000);
            } else {
                tampilkanPesan("Gagal memuat audio ayat ini.");
                setTimeout(() => putarAudio(index + 1), 2000); // Skip ke ayat depan
            }
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
    const btn = document.getElementById('btnPlay');
    if (!player.src) {
        // Jika belum ada yang diputar, mulai dari ayat pertama
        if (typeof dataAyatAktif !== 'undefined' && dataAyatAktif.length > 0) {
            return putarAudio(0);
        }
        return;
    }

    if (player.paused) {
        player.play();
        if(btn) btn.innerText = "⏸️ Pause Audio";
    } else {
        player.pause();
        if(btn) btn.innerText = "▶️ Lanjut Audio";
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
    const checkDark = document.getElementById('checkDark'); // Kita simpan di variabel dulu
    
    // 1. Jika user di Mushaf Madinah/Hafalan, dilarang pakai Dark Mode
    if (isDark && (tipeAktif === 'mushaf-2' || tipeAktif === 'mushaf-3')) {
        // Cek dulu: apa fungsi tampilkanPesan dan elemen checkDark sudah siap?
        if (typeof tampilkanPesan === "function") {
            tampilkanPesan("⚠️ Tema ini sudah punya warna khusus");
        }
        if (checkDark) checkDark.checked = false;
        return;
    }
    
    // 2. PENGAMAN UTAMA: Cek apakah document.body sudah ada?
    if (document.body) {
        document.body.classList.toggle('dark-mode', isDark);
    }

    // 3. Update status centang kalau elemennya sudah nongol
    if (checkDark) {
        checkDark.checked = isDark;
    }

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
        toast.style = "position:fixed; bottom:80px; left:50%; transform:translateX(-50%);  color:white; padding:10px 20px; min-width: 140px; background: var(--primary); border-radius:30px; font-size:12px; z-index:9999; transition:opacity 0.3s; pointer-events:none; text-align: center; font-family:sans-serif;";
        document.body.appendChild(toast);
    }
    toast.innerText = pesan;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
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
                      `via : https://kalendergajah.pages.dev/quran/ (Al-Qur'an Pro by ℴ𝓉ℴ𝓎) `;

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
        tampilkanPesan("🚫 Gagal memproses share");
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
    const ids = ['imsak', 'shubuh', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const keys = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
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
        { nama: 'Imsak', waktu: jamMenit(timings.Imsak) },
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
    // 1. Jalankan fungsi pendukung
    if (typeof muatJadwalSholat === "function") muatJadwalSholat();
    
    // 2. Ambil semua data dari Bagasi (LocalStorage)
    const isKitab = localStorage.getItem('userModeKitab') === 'true';
toggleModeKitab(isKitab);
    const isDark = localStorage.getItem('userDark') === 'true';
    const isTajwid = localStorage.getItem('userTajwid') !== 'false';
    const isLatin = localStorage.getItem('userLatin') !== 'false';
    const isIndo = localStorage.getItem('userIndo') !== 'false';
    const tipeSaved = localStorage.getItem('tipeMushaf') || 'mushaf-1';
    const savedFont = localStorage.getItem('pilihan_font_arab') || "'LPMQ', sans-serif";
    
    // 3. TERAPKAN LOGIKA (Ini yang bikin tampilan berubah)
    // Kita gunakan documentElement biar lebih aman jika body belum siap
    document.documentElement.style.setProperty('--font-arab', savedFont);
    
    // Panggil fungsi toggle dengan aman
    toggleDarkMode(isDark); 
    if (typeof toggleTajwid === "function") toggleTajwid(isTajwid); 
    if (typeof toggleLatin === "function") toggleLatin(isLatin); 
    if (typeof toggleIndo === "function") toggleIndo(isIndo); 
    if (typeof gantiTipeMushaf === "function") gantiTipeMushaf(tipeSaved);
    
    // 4. SINKRONKAN UI (Ini yang sering bikin eror kalau elemennya belum ada)
    const uiElements = {
        'pilihFontArab': savedFont,
        'checkDark': isDark,
        'checkTajwid': isTajwid,
        'checkLatin': isLatin,
        'checkIndo': isIndo,
        'pilihMushaf': tipeSaved,
        'pilihQari': typeof qariAktif !== 'undefined' ? qariAktif : '1',
    };

    // Kita looping biar kodenya rapi dan gak menuh-menuhin tempat
    for (let id in uiElements) {
        let el = document.getElementById(id);
        if (el) {
            if (el.type === 'checkbox') {
                el.checked = uiElements[id];
            } else {
                el.value = uiElements[id];
            }
        }
    }

    // Khusus Label Font Size
    const fontLabel = document.getElementById('fontLabel');
    if (fontLabel) {
        fontLabel.innerText = (typeof fontSizeArab !== 'undefined' ? fontSizeArab : '28') + 'px';
    }
    
    if (typeof updateTampilanBookmark === "function") updateTampilanBookmark();
}

// =========================================
// 20. EVENT LISTENERS (SWIPE & SCROLL)
// =========================================

   let xStart = null;

document.addEventListener('touchstart', e => {
    xStart = e.touches[0].clientX;
}, {passive: true});

document.addEventListener('touchend', e => {
    if (!xStart || typeof surahSekarang === 'undefined') return;

    let xUp = e.changedTouches[0].clientX;
    let xDiff = xStart - xUp; 

    // Syarat geser minimal 100 pixel biar nggak gampang kepencet
    if (Math.abs(xDiff) > 100) {
        let cur = parseInt(surahSekarang);

        if (xDiff < 0) {
            // TANGAN GESER KE KANAN (xDiff Negatif)
            // MAJU ke surah selanjutnya (Al-Fatihah -> Al-Baqarah)
            if (cur < 114) {
                gantiSurah(cur + 1);
            } else {
                gantiSurah(1); // Balik ke awal kalau sudah di ujung
            }
        } else if (xDiff > 0) {
            // TANGAN GESER KE KIRI (xDiff Positif)
            // MUNDUR ke surah sebelumnya (Al-Fatihah -> An-Nas)
            if (cur > 1) {
                gantiSurah(cur - 1);
            } else {
                gantiSurah(114); // Kalau di awal, lompat ke akhir
            }
        }
    }
    xStart = null; // Reset
}, {passive: true});
   

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

  function keAngkaArab(n) {
    if (!n) return '';
    const map = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return n.toString().split('').map(digit => map[digit] || digit).join('');
}
  // Clear cache data
     function resetAplikasi() {
    // Tutup panel settings dulu biar gak numpuk
    toggleSettings(); 
    // Tampilkan modal custom
    document.getElementById('modalReset').style.display = 'flex';
}

function tutupModalReset() {
    document.getElementById('modalReset').style.display = 'none';
}

function eksekusiReset() {
    // 1. Bersihkan semua
    localStorage.clear();
    
    // 2. Kasih efek visual dikit
    const content = document.querySelector('.modal-content');
    content.innerHTML = `
        <div class="spinner" style="margin: 20px auto;"></div>
        <p>Sedang membersihkan data...</p>
    `;
    
    // 3. Reload total
    setTimeout(() => {
        window.location.reload(true);
    }, 1500);
}
    window.addEventListener('DOMContentLoaded', () => {
    muatPengaturanPaten();
});

document.addEventListener("DOMContentLoaded", function() {
  const app = document.getElementById('app-container');
  if(app) {
      app.style.transform = "translateX(350px)";
      setTimeout(function() {
        app.style.transform = "translateX(0)";
      }, 500);
  }
});