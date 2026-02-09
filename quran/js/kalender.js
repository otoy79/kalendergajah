let offsetBulan = 0; // 0 = Bulan sekarang, 1 = Bulan depan, dst.
let xDown = null;

async function muatKalender(offset = 0) {
    const listAgendaEl = document.getElementById('list-agenda');
    
    try {
        let tglSkrg = new Date();
        
        // 1. LOGIKA MAGHRIB (Hijriah lompat duluan)
        if (offset === 0 && tglSkrg.getHours() >= 18) {
            tglSkrg.setDate(tglSkrg.getDate() + 1);
        }

        // Hitung pindah bulan berdasarkan offset
        tglSkrg.setMonth(tglSkrg.getMonth() + offset);
        const dFokus = tglSkrg.getDate();
        const mFokus = tglSkrg.getMonth() + 1;
        const yFokus = tglSkrg.getFullYear();

        const cacheKey = `kalender_${mFokus}_${yFokus}`;
        let days = [];

        // 2. CEK LOCAL STORAGE
        const cacheData = localStorage.getItem(cacheKey);
        if (cacheData) {
            console.log("Pakai Cache Kalender (Hemat Kuota)");
            days = JSON.parse(cacheData);
        } else {
            console.log("Ambil Data Kalender Baru...");
            const r = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${mFokus}/${yFokus}`);
            const res = await r.json();
            days = res.data;
            
            // Simpan ke LocalStorage agar bulan ini gak download lagi
            localStorage.setItem(cacheKey, JSON.stringify(days));
        }

        // 3. JALANKAN RENDER TAMPILAN
        renderTampilanKalender(days, dFokus, offset);

    } catch (e) {
        console.error("Gagal muat kalender:", e);
    }
}

// FUNGSI UNTUK MENGGAMBAR (RENDER) KALENDER
     function renderTampilanKalender(days, dFokus, offset) {
    // Cari data hari yang difokuskan (berdasarkan tanggal masehi)
    const dataFokus = days.find(day => parseInt(day.gregorian.day) === dFokus) || days[0];

    // 1. UPDATE CARD UTAMA
    document.getElementById('display-bulan').innerText = dataFokus.hijri.month.en + " " + dataFokus.hijri.year + " H";
    document.getElementById('h-tgl').innerText = dataFokus.hijri.day;
    document.getElementById('h-bln').innerText = dataFokus.hijri.month.en;
    document.getElementById('hari-ini').innerText = dataFokus.hijri.weekday.en;
    
    let teksMasehi = dataFokus.gregorian.day + " " + dataFokus.gregorian.month.en + " " + dataFokus.gregorian.year + " M";
    if (offset === 0 && new Date().getHours() >= 18) teksMasehi += " (Malam)";
    document.getElementById('h-masehi').innerText = teksMasehi;

    // 2. GENERATE GRID
    let htmlGrid = `
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; margin-top: 20px; background: var(--card-bg); padding: 10px; border-radius: 15px; border: 1px solid var(--border);">
            <div class="hari-nama">Min</div><div class="hari-nama">Sen</div><div class="hari-nama">Sel</div>
            <div class="hari-nama">Rab</div><div class="hari-nama">Kam</div><div class="hari-nama">Jum</div>
            <div class="hari-nama">Sab</div>
    `;

    // Tentukan start day tanggal 1
    const tgl1Masehi = days[0].gregorian;
    const startDay = new Date(tgl1Masehi.year, tgl1Masehi.month.number - 1, tgl1Masehi.day).getDay();

    for (let i = 0; i < startDay; i++) { 
        htmlGrid += `<div></div>`; 
    }

    days.forEach(day => {
        const dMasehi = new Date(day.gregorian.year, day.gregorian.month.number - 1, day.gregorian.day);
        const hariApa = dMasehi.getDay(); 

        let warnaTeks = 'color: var(--primary);'; 
        if (hariApa === 0) warnaTeks = 'color: #e74c3c !important;'; 
        if (hariApa === 5) warnaTeks = 'color: #27ae60 !important;'; 

        const skrg = new Date();
        const isToday = (skrg.getDate() == day.gregorian.day && (skrg.getMonth() + 1) == day.gregorian.month.number && skrg.getFullYear() == day.gregorian.year);
        const styleToday = isToday ? 'border: 1.2px solid var(--primary); background: rgba(242, 169, 114, 0.1);' : 'border: 1px solid var(--border);';

        htmlGrid += `
            <div style="aspect-ratio: 1/1; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; border-radius: 6px; ${styleToday}">
                <b style="font-size: 17px; ${warnaTeks} margin-top: -5px;">${day.hijri.day}</b>
                <div style="position: absolute; bottom: 0px; right: 4px; font-size: 9px; font-weight: bold; opacity: 0.7; color: var(--text);">${day.gregorian.day}</div>
            </div>
        `;
    });
    htmlGrid += `</div>`;

        if (typeof generateAgenda === "function") {
        generateAgenda(dataFokus.hijri);
    }

    // 3. TAMPILKAN AGENDA
    // Pastikan fungsi generateAgenda(dataFokus.hijri) sudah ada di script Boss sebelumnya
    if (typeof generateAgenda === "function") {
        generateAgenda(dataFokus.hijri);
    }
    
  const isiAgenda = document.getElementById('list-agenda').innerHTML;
    
    // 3. GABUNGKAN: Grid di atas, Agenda di bawah
    document.getElementById('list-agenda').innerHTML = `
        ${htmlGrid}
        <h3 style="margin-top:25px; margin-bottom:15px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            ✨ Agenda Bulan Ini
        </h3>
        <div id="container-agenda-asli">
            ${isiAgenda}
        </div>
    `;
}
    
function gantiBulan(n) {
    offsetBulan += n;
    // Efek visual loading sebentar
    document.getElementById('area-kalender').style.opacity = '0.5';
    muatKalender(offsetBulan).then(() => {
        document.getElementById('area-kalender').style.opacity = '1';
    });
}

// JURUS SWIPE UNTUK KALENDER
document.addEventListener('touchstart', e => xDown = e.touches[0].clientX, false);
document.addEventListener('touchend', e => {
    if (!xDown) return;
    let xUp = e.changedTouches[0].clientX;
    let xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 100) {
        if (xDiff > 0) gantiBulan(1);  // Swipe Kiri -> Bulan Depan
        else gantiBulan(-1);           // Swipe Kanan -> Bulan Lalu
    }
    xDown = null;
}, false);

  
                // Tampilkan ke layar
                function generateAgenda(hijri) {
    // 1. AMBIL DATA BULAN & TAHUN
    const blnEn = hijri.month.en;
    const blnNo = parseInt(hijri.month.number); 
    let html = '';

    // 2. LOGIKA PUASA AYYAMUL BIDH
    // Jangan munculkan kalau sedang bulan Ramadan (karena sudah puasa wajib)
    if (blnEn !== "Ramadan") {
        const tglBidh = [13, 14, 15];
        tglBidh.forEach(t => {
            let labelNya = "Sunnah";
            let infoNya = "Puasa Sunnah Pertengahan Bulan";

            // Jika bulan Dzulhijjah, tanggal 13 adalah Hari Tasyrik (Haram Puasa)
            if (blnNo === 12 && t === 13) {
                labelNya = "Haram";
                infoNya = "Hari Tasyrik (Dilarang Puasa)";
            }
            html += itemAgenda(`Puasa Ayyamul Bidh (${t} ${blnEn})`, infoNya, labelNya);
        });        
    }

    // 3. DAFTAR AGENDA BESAR ISLAM
    const dataAgenda = [
        { bln: 1, tgl: 1, judul: "Tahun Baru Islam", info: "1 Muharram", tipe: "Penting" },
        { bln: 1, tgl: 10, judul: "Puasa Asyura", info: "Menghapus dosa setahun lalu", tipe: "Sunnah" },
        { bln: 3, tgl: 12, judul: "Maulid Nabi", info: "Kelahiran Nabi Muhammad SAW", tipe: "Penting" },
        { bln: 7, tgl: 27, judul: "Isra Mi'raj", info: "Perjalanan menjemput Shalat", tipe: "Penting" },
        { bln: 9, tgl: 1, judul: "Awal Ramadan", info: "Wajib Puasa Sebulan Penuh", tipe: "Wajib" },
        { bln: 10, tgl: 1, judul: "Idul Fitri", info: "1 Syawal (Haram Berpuasa)", tipe: "Haram" },
        { bln: 12, tgl: 9, judul: "Puasa Arafah", info: "9 Dzul Hijjah", tipe: "Sunnah" },
        { bln: 12, tgl: 10, judul: "Idul Adha", info: "Hari Raya Qurban", tipe: "Haram" },
        { bln: 12, tgl: 11, judul: "Hari Tasyrik", info: "Haram Berpuasa", tipe: "Haram" },
        { bln: 12, tgl: 12, judul: "Hari Tasyrik", info: "Haram Berpuasa", tipe: "Haram" },
        { bln: 12, tgl: 13, judul: "Hari Tasyrik", info: "Haram Berpuasa", tipe: "Haram" }
    ];

    // 4. FILTER AGENDA (Pastikan tipe data sama-sama Integer)
    const agendaBulanIni = dataAgenda.filter(a => parseInt(a.bln) === blnNo);
    
    agendaBulanIni.forEach(a => {
        html += itemAgenda(a.judul, a.info, a.tipe);
    });

    // 5. RENDER KE LAYAR
    const listEl = document.getElementById('list-agenda');
    if (listEl) {
        listEl.innerHTML = html || '<div class="puasa-item" style="padding:20px; opacity:0.6;">Tidak ada agenda khusus bulan ini.</div>';
    }
}

// Fungsi pembantu (Versi Upgrade: Bisa ganti warna otomatis)
    function itemAgenda(judul, info, label, warnaCustom = "") {
    let bgLabel = "var(--primary)"; 
    if (label === 'Wajib') bgLabel = "#e74c3c";    
    if (label === 'Haram') bgLabel = "#2c3e50";    
    if (label === 'Penting') bgLabel = "#f39c12";  
    if (label === 'Sunnah') bgLabel = "#27ae60";   
    
    const styleFinal = warnaCustom ? warnaCustom : `background:${bgLabel}`;

    // Ditambah padding & border-bottom biar gak dempet
    return `
    <div class="puasa-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px dashed var(--border); width: 100%;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <b style="font-size: 14px; color: var(--text);">${judul}</b>
            <small style="opacity: 0.7; color: var(--text);">${info}</small>
        </div>
        <span class="tag-puasa" style="${styleFinal}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; min-width: 60px; text-align: center;">
            ${label}
        </span>
    </div>`;
}

        
  function resetKalender() {
    offsetBulan = 0;
    muatKalender(0);
}

// Inisialisasi awal
window.onload = () => muatKalender(0);