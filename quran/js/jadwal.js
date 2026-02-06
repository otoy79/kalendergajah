let kotaAktif = localStorage.getItem('userKota') || 'Jakarta';
        let suaraAktif = false;
        let wakeLock = null;
        let adzanSudahBunyi = false; 
        
    function aktifkanSuara() {
        const adzanPlayer = document.getElementById('audioAdzan');
        
        if (!adzanPlayer) {
            alert("Error: Elemen audio tidak ditemukan!");
            return;
        }

        adzanPlayer.play().then(() => {
            adzanPlayer.pause();
            adzanPlayer.currentTime = 0;
            suaraAktif = true;
            document.getElementById('btn-suara').innerText = "✅ Adzan Aktif";
            document.getElementById('btn-suara').style.background = "#bdc3c7";
            alert("Suara Adzan sudah diaktifkan, Bossku!");
        }).catch(e => alert("Gagal aktifkan suara. Pastikan HP tidak mode senyap!"));
    }

        function terapkanTema() {
            const tipe = localStorage.getItem('tipeMushaf') || 'mushaf-1';
            const isDark = localStorage.getItem('userDark') === 'true';
            document.body.className = tipe;
            if (isDark) document.body.classList.add('dark-mode');
        }
  
        // 3. Fungsi Cari Kota
        function cariKotaManual() {
            const val = document.getElementById('input-kota').value;
            if (val) {
                kotaAktif = val;
                localStorage.setItem('userKota', val);
                muatJadwal();
            }
        }

        function pakeGPS() {
            if (navigator.geolocation) {
                document.getElementById('nama-kota').innerText = "Mencari Lokasi...";
                navigator.geolocation.getCurrentPosition(async (pos) => {
                    try {
                        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
                        const d = await r.json();
                        const kota = d.address.city || d.address.town || d.address.suburb || "Jakarta";
                        kotaAktif = kota;
                        localStorage.setItem('userKota', kota);
                        muatJadwal();
                    } catch (e) { alert("GPS Berhasil, tapi gagal ambil nama kota."); }
                });
            }
        }

        // 3. Load Data dari API
       async function muatJadwal() {
    const wadahTabel = document.getElementById('isi-jadwal');
    const namaKotaTampil = document.getElementById('nama-kota');
    
    namaKotaTampil.innerText = kotaAktif;

    const skr = new Date();
    const bulan = skr.getMonth() + 1;
    const tahun = skr.getFullYear();
    const tglSkr = skr.getDate();

    // --- 1. CEK DATA DI LOCALSTORAGE ---
    const dataLama = localStorage.getItem('jadwal_sholat_data');
    if (dataLama) {
        const cache = JSON.parse(dataLama);
        // Jika kota, bulan, dan tahun masih sama, pakai data yang ada
        if (cache.kota === kotaAktif && cache.bulan === bulan && cache.tahun === tahun) {
            console.log("Mengambil data dari LocalStorage...");
            renderTabel(cache.data, tglSkr, tahun);
            return; // Keluar dari fungsi, tidak perlu download lagi
        }
    }

    // --- 2. JIKA DATA TIDAK ADA / GANTI BULAN -> AMBIL DARI API ---
    wadahTabel.innerHTML = '<tr><td colspan="7" class="loading">Sedang mencari jadwal di ' + kotaAktif + '...</td></tr>';

    try {
        // Menggunakan URL dengan parameter tune pilihan Bossku
        const url = `https://api.aladhan.com/v1/calendarByAddress?address=${kotaAktif},Indonesia&method=11&month=${bulan}&year=${tahun}&tune=1,1,0,2,2,3,4,2`;
        
        const r = await fetch(url);
        const res = await r.json();
        
        if (res.code !== 200 || !res.data) {
            throw new Error("Kota tidak ditemukan");
        }

        const data = res.data;

        // --- 3. SIMPAN KE LOCALSTORAGE ---
        const dataKeSimpan = {
            kota: kotaAktif,
            bulan: bulan,
            tahun: tahun,
            data: data
        };
        localStorage.setItem('jadwal_sholat_data', JSON.stringify(dataKeSimpan));

        // --- 4. TAMPILKAN KE TABEL ---
        renderTabel(data, tglSkr, tahun);

    } catch (e) {
        console.error(e);
        wadahTabel.innerHTML = `<tr><td colspan="7" style="color:red; padding:20px;">
            Maaf, jadwal untuk "<b>${kotaAktif}</b>" gagal dimuat. Cek koneksi internet!
        </td></tr>`;
    }
}

// Fungsi terpisah untuk menggambar tabel (biar rapi)
function renderTabel(data, tglSkr, tahun) {
    const wadahTabel = document.getElementById('isi-jadwal');
    let html = '';

    // Jalankan countdown untuk hari ini
    const hariIniData = data.find(h => parseInt(h.date.gregorian.day) === tglSkr);
    if (hariIniData) {
        updateCountdown(hariIniData.timings);
    }

    data.forEach(hari => {
        const tgl = parseInt(hari.date.gregorian.day);
        const isToday = (tgl === tglSkr) ? 'class="hari-ini"' : '';
        const f = (waktu) => waktu.split(' ')[0]; // Ambil jam murni

        html += `<tr ${isToday}>
            <td>${tgl}</td>
            <td style="font-weight:bold; color:#e67e22">${f(hari.timings.Imsak)}</td>
            <td>${f(hari.timings.Fajr)}</td>
            <td>${f(hari.timings.Dhuhr)}</td>
            <td>${f(hari.timings.Asr)}</td>
            <td>${f(hari.timings.Maghrib)}</td>
            <td>${f(hari.timings.Isha)}</td>
        </tr>`;
    });

    wadahTabel.innerHTML = html;
    document.getElementById('bln-tahun').innerText = data[0].date.gregorian.month.en + " " + tahun;

    // Scroll otomatis ke hari ini
    setTimeout(() => {
        const el = document.querySelector('.hari-ini');
        if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

        // Jalankan saat startup
        window.onload = () => {
            terapkanTema();
            muatJadwal();
        };

    function updateCountdown(timings) {
    const timerEl = document.getElementById('timer-sholat');
     const adzanPlayer = document.getElementById('audioAdzan');
    const labelEl = document.getElementById('nama-sholat-next');
    const labelUtama = document.getElementById('label-next');

    // Fungsi kecil untuk buang (WIB) atau (GMT)
    const bersihkanJam = (jamApi) => jamApi.split(' ')[0];

    setInterval(() => {
        const sekarang = new Date();
        // Format jam sekarang ke HH:mm
        const jamSkr = sekarang.getHours().toString().padStart(2, '0') + ":" + 
                       sekarang.getMinutes().toString().padStart(2, '0');

        const daftarSholat = [
            { nama: 'Imsak', jam: bersihkanJam(timings.Imsak) },
            { nama: 'Subuh', jam: bersihkanJam(timings.Fajr) },
            { nama: 'Dzuhur', jam: bersihkanJam(timings.Dhuhr) },
            { nama: 'Ashar', jam: bersihkanJam(timings.Asr) },
            { nama: 'Maghrib', jam: bersihkanJam(timings.Maghrib) },
            { nama: 'Isya', jam: bersihkanJam(timings.Isha) }
        ];

        // Cari sholat yang jam-nya lebih besar dari jam sekarang
        let sholatNext = daftarSholat.find(s => s.jam > jamSkr);
        
        // Kalau sudah lewat Isya, berarti sholat berikutnya Imsak besok pagi
        let besok = false;
        if (!sholatNext) {
            sholatNext = daftarSholat[0];
            besok = true;
        }

        const [h, m] = sholatNext.jam.split(':');
        let target = new Date();
        target.setHours(parseInt(h), parseInt(m), 0);

        if (besok) target.setDate(target.getDate() + 1);

        const selisih = target - sekarang;
        
        // Pastikan selisih tidak negatif
        if (selisih > 0) {
            const jam = Math.floor(selisih / 3600000);
            const menit = Math.floor((selisih % 3600000) / 60000);
            const detik = Math.floor((selisih % 60000) / 1000);

            labelUtama.innerText = "Menuju Waktu " + sholatNext.nama;
            labelEl.innerText = "Pukul " + sholatNext.jam;
            timerEl.innerText = `${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;

            // Tambahkan LOGIKA ADZAN di sini (sebelum penutup selisih > 08 detik)
           if (jam === 00 && menit === 00 && detik === 00) {
    if (suaraAktif && !adzanSudahBunyi && sholatNext.nama !== 'Imsak') {
        adzanPlayer.play();
        adzanSudahBunyi = true; 
        
        // Reset 2 detik aja biar bisa test lagi tiap menit
        setTimeout(() => { adzanSudahBunyi = false; }, 60000);
    }
}

        } 
    }, 1000); 
} 

   function testSuara() {
    const adzanPlayer = document.getElementById('audioAdzan');
    
    if (adzanPlayer) {
        // Balikin ke detik 0
        adzanPlayer.currentTime = 0;
        
        // Putar
        adzanPlayer.play().then(() => {
            alert("Suara Adzan sedang diputar... (Klik OK untuk hentikan test)");
            adzanPlayer.pause(); // Berhenti setelah user klik OK
            adzanPlayer.currentTime = 0;
        }).catch(e => {
            alert("Waduh, audionya gak mau jalan! Pastikan sudah klik 'Aktifkan Suara Adzan' dulu ya.");
        });
    } else {
        alert("Elemen audio tidak ditemukan!");
    }
}
   
  // Fungsi simpan pengaturan ke memori HP
function simpanPengaturanAdzan() {
    const isChecked = document.getElementById('checkAdzan').checked;
    localStorage.setItem('autoAdzan', isChecked);
    if (isChecked) {
        document.getElementById('modalAudio').style.display = 'flex';
    } else {
        suaraAktif = false;
    }
}

   function tutupModal() {
    document.getElementById('modalAudio').style.display = 'none';
    // Balikin checklist ke posisi OFF karena user nolak
    document.getElementById('checkAdzan').checked = false;
    localStorage.setItem('autoAdzan', false);
    suaraAktif = false;
}

// Fungsi Pancingan (Wajib ada klik user)
   function pancingAudio() {
    const adzanPlayer = document.getElementById('audioAdzan');
    
    // 1. Langsung eksekusi PLAY tanpa ba-bi-bu
    adzanPlayer.play().then(() => {
        // Kalau berhasil play, baru kita atur sisanya
        adzanPlayer.pause();
        adzanPlayer.currentTime = 0;
        suaraAktif = true;
        
        document.getElementById('modalAudio').style.display = 'none';
        console.log("Audio Adzan Ready, Bossku!");

        // 2. Kunci Layar (Wake Lock) taruh belakangan, jangan ganggu audio
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').then((lock) => {
                wakeLock = lock;
                console.log("Layar dikunci! 🛡️");
            }).catch(err => console.log("WakeLock gagal, tapi audio aman."));
        }
    }).catch(e => {
        console.error(e);
        alert("Gagal pancing audio! Cek volume HP atau koneksi internet, Bossku!");
    });
  }
        
   function simpanPengaturanAdzan() {
    const isChecked = document.getElementById('checkAdzan').checked;
    if (isChecked) {
        document.getElementById('modalAudio').style.display = 'flex';
    } else {
        localStorage.setItem('autoAdzan', false);
        suaraAktif = false;
    }
}

// Cek status saat halaman pertama kali dibuka
window.addEventListener('load', () => {
    const statusTerakhir = localStorage.getItem('autoAdzan') === 'true';
    document.getElementById('checkAdzan').checked = statusTerakhir;
    
    // Kalau di pengaturan ON, minta pancingan audio
    if (statusTerakhir) {
        document.getElementById('modalAudio').style.display = 'flex';
    }
});
