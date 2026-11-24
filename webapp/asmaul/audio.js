console.clear();
var _data = JSON.parse(`{"lyrics":[
{"line":" * ",
"note":" Asmaul Husna",
"time":-1},

{"line":" يَاَ للّٰهُ ",
"note":" Ya Allah ",
"time":16000},

{"line":" يَاَ للّٰهُ ",
"note":" Ya Allah ",
"time":20000},

{"line":" يَاَ للّٰهُ ",
"note":" Ya Allah ",
"time":24000},

{"line":" لَا إِلَهَ إِلَّا اللَّهُ ",
"note":" Lailaha illah ",
"time":27500},

{"line":" يَاَ للّٰهُ ",
"note":" Ya Allah ",
"time":35200},

{"line":"   يَا الرَحْمَنُ  ",
"note":" Ar-Rohman ",
"time":38000},

{"line":" ِيَاالرَحِيْم ",
"note":" Ar-Rohiim ",
"time":39500},

{"line":" يَاالمَلِكُ ",
"note":" Al-Malik ",
"time":41500},

{"line":" يَاالقُدُّوْسُ",
"note":" Al-Quddus ",
"time":43000},

{"line":" يَاالسَلَا مُ",
"note":" As-Salaam ",
"time":44800},

{"line":" يَاالمُؤْمِنُ ",
"note":" Al-Mu'min ",
"time":46500},

{"line":" يَاالمُهَيْمِنُ ",
"note":" Al-Muhaimin ",
"time":48300},

{"line":" يَاالعَزِيْزُ ",
"note":" Al-Azis ",
"time":50500},

{"line":" يَاالجَبَّارُ ",
"note":" Al-Jabbar ",
"time":52000},

{"line":" يَاالمُتَكَبِّرُ ",
"note":" Al-Mutakabbir ",
"time":53500},

{"line":" يَاالخَالِقُ ",
"note":" Al-Khaliq ",
"time":55500},

{"line":" يَاالبَارِئُ ",
"note":" Al-Baari ",
"time":57000},

{"line":" يَاالمُصَوِّرُ ",
"note":" Al-Mushawwir ",
"time":59000},

{"line":" يَاالغَفَّارُ ",
"note":" Al-Ghaffaar ",
"time":61000},

{"line":" يَاالقَهَّارُ ",
"note":" Al-Qahhaar ",
"time":62500},

{"line":" يَاالوَهَّابُ ",
"note":" Al-Wahhaab ",
"time":64600},

{"line":" يَاالرَّاقُ ",
"note":" Al-Razzaaq ",
"time":66100},

{"line":" يَاالفَتَّاحُ ",
"note":" Al-Fattaah ",
"time":68000},

{"line":" يَاالعَلِيْمُ ",
"note":" Al-'Aliim ",
"time":69500},

{"line":" يَاالقَابِضُ ",
"note":" Al-Qaabidh ",
"time":71800},

{"line":" يَاالبَاسِطُ ",
"note":" Al-Baasith ",
"time":73400},

{"line":" يَاالخَافِضُ ",
"note":" Al-Khaafidh ",
"time":74900},

{"line":" يَاالرَافِعُ ",
"note":" Ar-Raafi ",
"time":77000},

{"line":" يَاالمُعِزُ ",
"note":" Al-Mu'izz ",
"time":78500},

{"line":" يَاالمُذِلُ ",
"note":" Al-Mudzil ",
"time":80000},

{"line":" يَاالسَمِيْعُ ",
"note":" Al-Samii ",
"time":82000},

{"line":" يَاالبَصِيْرُ ",
"note":" Al-Bashiir ",
"time":83800},

{"line":" يَاالحَكَمُ ",
"note":" Al-Hakam ",
"time":85500},

{"line":" يَاالعَدْلُ ",
"note":" Al-'Adl ",
"time":87500},

{"line":" يَااللَطِيْفُ ",
"note":" Al-Lathiif ",
"time":89200},

{"line":" يَاالخَبِيْرُ ",
"note":" Al-Khabiir ",
"time":91000},

{"line":" يَاالحَلِيْمُ ",
"note":" Al-Haliim ",
"time":92800},

{"line":" يَاالعَظِيْمُ ",
"note":" Al-'Azhiim ",
"time":94500},

{"line":" يَاالغَفُوْرُ ",
"note":" Al-Ghafuur ",
"time":96500},

{"line":" يَاالشَكُوْرُ ",
"note":" Asy-Syakuur ",
"time":98000},

{"line":" يَاالعَلِيُ ",
"note":" Al-'Aliy ",
"time":99500},

{"line":" يَاالكَبِيْرُ ",
"note":" Al-Kabiir ",
"time":101500},

{"line":" يَاالحَفِيْظُ ",
"note":" Al-Hafizh ",
"time":103500},

{"line":" يَاالمُقِيْتُ ",
"note":" Al-Muqiit ",
"time":105200},

{"line":" يَاالحَسِيْبُ ",
"note":" Al-Hasiib ",
"time":107200},

{"line":" يَاالجَلِيْلُ ",
"note":" Al-Jaliil ",
"time":108800},

{"line":" يَاالكَرِيْمُ ",
"note":" Al-Kariim ",
"time":110300},

{"line":" يَاالرَقِيْبُ ",
"note":" Ar-Raqiib ",
"time":112000},

{"line":" يَاالمُجِيْبُ ",
"note":" Al-Mujiib ",
"time":114000},

{"line":" يَاالوَاسِعُ ",
"note":" Al-Waas'i ",
"time":115800},

{"line":" يَاالحَكِيْمُ ",
"note":" Al-Hakiim ",
"time":117200},

{"line":" يَاالوَدُوْدُ ",
"note":" Al-Waduud ",
"time":119500},

{"line":" يَاالمَجِيْدُ ",
"note":" Al-Majiid ",
"time":125900},

{"line":" يَاالبَاعِثُ ",
"note":" Al-Baa 'its ",
"time":127700},

{"line":" يَاالشَهِيْدُ ",
"note":" Al-Syahiid ",
"time":129500},

{"line":" يَاالحَقُ ",
"note":" Al-Haqq ",
"time":131500},

{"line":" يَاالوَكِيْلُ ",
"note":" Al-Wakiil ",
"time":133500},

{"line":" يَاالقَوِىُّ ",
"note":" Al-Qawiyyu ",
"time":135000},

{"line":" يَاالمَتِيْنُ ",
"note":" Al-Matiin ",
"time":137000},

{"line":" يَاالوَلِيُّ ",
"note":" Al-Waliyy ",
"time":139000},

{"line":" يَاالحَمِيْدُ ",
"note":" Al-Hamiid ",
"time":140500},

{"line":" يَاالمُحْصِيْ ",
"note":" Al-Muhshii ",
"time":142100},

{"line":" يَاالمُبْدِئْ ",
"note":" Al-Mubdi ",
"time":144000},

{"line":" يَاالمُعِيْدُ ",
"note":" Al-Mu 'iid ",
"time":145700},

{"line":" يَاالمُحْيِیْ ",
"note":" Al-Muhyii ",
"time":147700},

{"line":" يَاالمُمِيْتُ ",
"note":" Al-Mumiitu ",
"time":149200},

{"line":" يَاالحَيُّ ",
"note":" Al-Hayyu ",
"time":151200},

{"line":" يَاالقَيُّوْمُ ",
"note":" Al-Qayyuum ",
"time":152500},

{"line":" يَاالوَاجِدُ ",
"note":" Al-Waajid ",
"time":154500},

{"line":" يَاالمَاجِدُ ",
"note":" Al-Maajid ",
"time":156600},

{"line":" يَاالوَاحِدُ ",
"note":" Al-Wahid ",
"time":157800},

{"line":" يَاالاَحَدُ ",
"note":" Al-Ahad ",
"time":159800},

{"line":" يَاالصَمَدُ ",
"note":" Ash-Shamad ",
"time":161700},

{"line":" يَاالقَادِرُ ",
"note":" Al-Qaadir ",
"time":163500},

{"line":" يَاالمُقْتَدِرُ ",
"note":" Al-Muqtadir ",
"time":165000},

{"line":" يَاالمُقَدِمُ ",
"note":" Al-Muqaddim ",
"time":166600},

{"line":" يَاالمُؤَخِرُ ",
"note":" Al-Mu'akkhir ",
"time":168000},

{"line":" يَاالأَوَلُ ",
"note":" Al-Awwal ",
"time":170000},

{"line":" يَاالأَخِرُ ",
"note":" Al-Aakhir ",
"time":172000},

{"line":" يَاالظَاهِرُ ",
"note":" Az-Zhaahir ",
"time":174000},

{"line":" يَاالبَاطِنُ ",
"note":" Al-Baathin ",
"time":175800},

{"line":" يَاالوَالِيُ ",
"note":" Al-Waali ",
"time":177400},

{"line":" يَاالمُتَعَالِيُ ",
"note":" Al-Muta 'aalii ",
"time":179200},

{"line":" يَاالبَرُ ",
"note":" Al-Barru ",
"time":181200},

{"line":" يَاالتَوَابُ ",
"note":" At-Tawwaab ",
"time":182200},

{"line":" يَاالمُنْتَقِمُ ",
"note":" Al-Muntaqim ",
"time":184200},

{"line":" يَاالعَفُوُّ ",
"note":" Al-Afuww ",
"time":186200},

{"line":" يَاالرَؤُوْفُ ",
"note":" Ar-Ra'uuf ",
"time":188100},

{"line":" يَامَالِكَ الْمُلْكِ ",
"note":" Malikul Mulk ",
"time":190000},

{"line":" يَاذُوْ الجَلَالِ وَ الِْإكْرَامِ ",
"note":" Dzul Jalaali Wal Ikraam ",
"time":193100},

{"line":" يَاالمُقْسِطُ ",
"note":" Al-Muqsith ",
"time":196800},

{"line":" يَاالجَامِعُ ",
"note":" Al-Jamii' ",
"time":198800},

{"line":" يَاالغَنِىُّ ",
"note":" Al-Ghaniyy ",
"time":200500},

{"line":" يَاالمُغْنِىُ ",
"note":" Al-Mughnii ",
"time":202200},

{"line":" يَاالمَانِعُ ",
"note":" Al-Maani ",
"time":204000},

{"line":" يَاالضَارُُ ",
"note":" Al-Dhaar ",
"time":205500},

{"line":" يَاالنَافِعُ ",
"note":" Al-Nafii' ",
"time":207400},

{"line":" يَاالنُوْرَ ",
"note":" Al-Nuur ",
"time":209000},

{"line":" يَاالهَادِئْ ",
"note":" Al-Haadii ",
"time":211200},

{"line":" يَاالبَدِيْعُ ",
"note":" Al-Badii’ ",
"time":212500},

{"line":" يَاالبَاقِيْ ",
"note":" Al-Baaqii ",
"time":214000},

{"line":" يَاالوَارِثُ ",
"note":" Al-Waarits ",
"time":216000},

{"line":" يَاالرَشِيْدُ ",
"note":" Ar-Rasyiid ",
"time":218000},

{"line":" يَاالصَبُوْرُ ",
"note":" Al-Shabuur ",
"time":220000},

{"line":" لَا إِلَهَ إِلَّا اللَّهُ ",
"note":" Lailaha illah ",
"time":221500},

{"line":" اسماعيل حسناء ",
"note":" 99 Nama Allah ",
"time":244500},

{"line":"",
"note":"  ",
"time":254000}
]}`);
var currentLine = "";

function align() {
   var a = $(".highlighted").height();
   var c = $(".content").height();
   var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
   var e = d + (a/2) - (c/2);
   $(".content").animate(
       {scrollTop: e + "px"}, {easing: "swing", duration: 250}
   );
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
   if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
      lyricHeight = $(".lyrics").height();
      align();
   }
});

$(document).ready(function(){
   $("video").on('timeupdate', function(e){
      var time = this.currentTime*1000;
      var past = _data["lyrics"].filter(function (item) {
         return item.time < time;
      });
      if (_data["lyrics"][past.length] != currentLine) {
         currentLine = _data["lyrics"][past.length];
         $(".lyrics div").removeClass("highlighted");
         $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
         align();
      }
   });
});

generate();

function generate() {
   var html = "";
   for(var i = 0; i < _data["lyrics"].length; i++) {
      html += "<div";
      if(i == 0) {
         html+=` class="highlighted"`;
         currentLine = 0;
      }
      if(_data["lyrics"][i]["note"]) {
         html += ` note="${_data["lyrics"][i]["note"]}"`;
      }
      html += ">";
      html += _data["lyrics"][i]["line"] == "" ? "•" : _data["lyrics"][i]["line"];
      html += "</div>"
   }
   $(".lyrics").html(html);
   align();
}



