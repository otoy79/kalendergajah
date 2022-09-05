
var now = new Date();
var hours = now.getHours();
//Keep in code - Written by Computerhope.com
//Place this script in your HTML heading section
//3-4 sore
if (hours > 14 && hours < 17){
 document.write (' <p>Selamat sore - "Dan peringatkan mereka (hai Muhammad), tentang Hari Penyesalan, ketika masalah itu akan selesai; dan (namun), mereka dalam (keadaan) lalai, dan mereka tidak beriman - Quran 19:39.</p> ');
}
//5-6 sore
else if (hours > 16 && hours < 19){
 document.write (' <p>Senja - Jelang Malam - "Dan akhirat lebih baik bagimu daripada (kehidupan) yang pertama. Dan Tuhanmu akan memberimu, dan kamu akan dipuaskan - Quran 93:4-5."</p> ');
}
//7- 9 malam
else if (hours > 18 && hours < 22){
 document.write (' <p>Selamat Malam - "Kekayaan bukanlah dengan banyaknya harta, namun kekayaan adalah hati yang selalu merasa cukup."</p> ');
}
//10-01 night
else if (hours > 21 || hours < 2){
 document.write (' <p>Selamat Malam - "Percayalah kepada Allah ketika segala sesuatunya tidak berjalan seperti yang Anda inginkan. Allah punya rencana yang lebih baik untukmu."</p> ');
}
//02-04 pagi
else if (hours > 1 && hours < 5){
 document.write (' <p>Tengah Malam -  Kerjakanlah urusan duniamu seakan-akankamu hidup selamanya. Dan laksanakan urusan akhiratmu seakan-akan kamu akan mati besok."</p> ');
}
//5 pagi
else if (hours > 4 && hours < 6){
 document.write (' <p>Jelang Fajar - "Jangan memperlakukan orang lain dengan buruk karena mungkin suatu hari nanti kamu membutuhkan pertolongan mereka. Jangan meremehkan siapa pun karena Allah dapat membangkitkan mereka berada di atasmu suatu hari nanti." (Dr. Bilal Philips)</p> ');
}
//6-8 day
else if (hours > 5 && hours < 9){
 document.write (' <p>Selamat Pagi - "Seseorang takkan pernah kehabisan rezeki asalkan ia mau mencarinya dengan niat baik dan sungguh-sungguh." - Selamat beraktifitas</p> ');
}
//9-2 sore 
else if (hours > 8 && hours < 15){
 document.write (' <p>Selamat Siang - "Rezeki itu adalah ujian. Dimewahkan bukan berarti dimuliakan, disempitkan bukan berarti dihinakan. Dua kunci yang meluluskan kita adalah syukur dan sabar"</p> ');
}
else {
 document.write ('<body style="background-color: white">');
}
