class TypeWriter {
  static get _quotes() {
    return [
     ` 1. Ringkas (Seiri): | Memilah dan menyingkirkan barang-barang yang tidak perlu dari area kerja. `,
    ` 2. Rapi (Seiton): | Menata barang-barang yang masih diperlukan di tempatnya yang sudah ditentukan agar mudah dicari, digunakan `,
    ` 3. Resik (Seiso): | Membersihkan tempat kerja dari kotoran, debu, dan benda asing yang dapat mengganggu pekerjaan.`,
    ` 4. Rawat (Seiketsu): | Merawat dan menjaga kebersihan serta keteraturan tempat kerja agar tetap dalam kondisi baik secara berkelanjutan. `,
    ` 5. Rajin (Shitsuke): | Membentuk kebiasaan dan disiplin agar semua prinsip 5R menjadi bagian dari budaya kerja sehari-hari. `,
    ` 5R Adalah Budaya Kerja | Ciptakan lingkungan kerja yang tertib, bersih, nyaman, dan efisien. `
    ];
  }

  static get _quotes2() {
    return [
       ` SERVICE (Melayani) | Melakukan sesuatu yang diharapkan untuk memberikan kepuasan kepada pelanggan baik internal / eksternal. `,
    ` PASSION (Semangat) | Meraih keunggulan terlibat secara emosional dan intelektual, dengan hasil luar biasa dan membangun martabat. `,
    ` INTEGRITY (Integritas) | Hubungan membangun atas dasar kepercayaan, kejujuran, dan akuntabilitas. `,
    ` RESPECT (Menghormati) | Peduli dan mendukung masyarakat lokal tempat beroperasi. `,
    ` INNOVATION (Inovasi) | Inovasi adalah kunci untuk mempertahankan pertumbuhan dan profitabilitas GT. `,
    ` 6. TEAMWORK (Kerja sama) | Menjalin lingkungan kerja kolaboratif yang mendorong komunikasi terbuka, pembelajaran, dan berbagi ide, pendapat, dan sudut pandang. `,
    ` GT SPIRIT Tugas Kita Bersama | Mari terus tumbuh bersama melalui semangat nilai GT SPIRIT `
    ];
  }

  static get _quotes3() {
    return [
       ` 🔻1. Have you heard the rumor going around about butter? | Nevermind. I shouldn't spread it`,
    ` 🔻2. What did the ocean say to the shore? | Nothing. It just waved`,
    ` 🔻3. Why did the picture go to the jail? | Because it was framed`,
    ` 🔻4. Why do bananas need sunscreen? | Because they peel`,
    ` 5. What do you call a man who never toots in public? | A private tooter`,
    ` 6. What time did the man go to the dentist? | Tooth hurty`,
    ` 7. What's brown and sticky? | A stick`,
    ` 8. What did the buffalo say to his son when he left for college? | Bison`,
    ` 9. Why shouldn't you write with a broken pencil? | Because it's pointless`,
    ` 10. What do you call a fake noodle? | An Impasta`,
    ` 11. What kind of shoes do ninjas wear? | Sneakers`,
    ` 12. Why did the scarecrow get promoted? | He was out standing in his field`,
    ` 13. What do you call an alligator wearing a vest? | An Investigator`
    ];
  }

    static _write(quoteIndex, quoteCharacterIndex, isClearing, isAnswer, quotes, question, answer) {
    let quote = quotes[quoteIndex];

    if (!isClearing) {
      if (quoteCharacterIndex < quote.length) {
        if (quote.charAt(quoteCharacterIndex) === '|') {
          isAnswer = true;
          quoteCharacterIndex++;
          setTimeout(() => TypeWriter._write(quoteIndex, quoteCharacterIndex, isClearing, isAnswer, quotes, question, answer), 2000);
        } else {
        if (isAnswer) {
            question.classList.remove('caret');
            answer.classList.add('caret');
            answer.innerHTML = answer.textContent + quote.charAt(quoteCharacterIndex);
          } else {
            answer.classList.remove('caret');
            question.classList.add('caret');
            question.innerHTML = question.textContent + quote.charAt(quoteCharacterIndex);
          }

          quoteCharacterIndex++;
          setTimeout(() => TypeWriter._write(quoteIndex, quoteCharacterIndex, isClearing, isAnswer, quotes, question, answer), 150);
        }
      } else if (quoteCharacterIndex === quote.length) {
        isClearing = true;
        setTimeout(() => TypeWriter._write(quoteIndex, quoteCharacterIndex, isClearing, isAnswer, quotes, question, answer), 2000);
      }
    } else {
       if (question.textContent.length > 0 || answer.textContent.length > 0) {
        if (answer.textContent.length > 0) {
          answer.innerHTML = answer.textContent.substring(0, answer.textContent.length - 1);
        } else if (question.textContent.length > 0) {
          answer.classList.remove('caret');
          question.classList.add('caret');
          question.innerHTML = question.textContent.substring(0, question.textContent.length - 1);
        }
        setTimeout(() => TypeWriter._write(quoteIndex, quoteCharacterIndex, isClearing, isAnswer, quotes, question, answer), 18);
      } else {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteCharacterIndex = 0;
        isClearing = false;
        isAnswer = false;
        setTimeout(() => TypeWriter._write(quoteIndex, quoteCharacterIndex, isClearing, isAnswer, quotes, question, answer), 2000);
      }
    }
  }

  static initialize() {
    let question = document.querySelector('.question');
    let answer = document.querySelector('.answer');
    let question2 = document.querySelector('.question2');
    let answer2 = document.querySelector('.answer2');
    let question3 = document.querySelector('.question3');
    let answer3 = document.querySelector('.answer3');

    setTimeout(() => TypeWriter._write(0, 0, false, false, TypeWriter._quotes, question, answer), 3500);
    setTimeout(() => TypeWriter._write(0, 0, false, false, TypeWriter._quotes2, question2, answer2), 3500);
     setTimeout(() => TypeWriter._write(0, 0, false, false, TypeWriter._quotes3, question3, answer3), 3500);
  }
}

TypeWriter.initialize();