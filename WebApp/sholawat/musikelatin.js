var ap = new APlayer({
        element: document.getElementById('player3'),
    lrcType: 3,
        narrow: false,
        autoplay: true,
        showlrc: true,
     mode: 'random',                                                    // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
    preload: 'metadata',                                               // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
    listmaxheight: '913px',   
        music: [
    {
            title: 'Shollallahu `ala Muhammad',
            author: 'Sholawat Nabi',
            url:'https://dl.dropboxusercontent.com/s/4fg02bldfhk1fd5/shollallahu-ala-muhammad.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images1.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/9cwv2wjluarz5hd/shollallahu-ala-muhammad.js'
        },
    {
            title: 'Al-`Itirof',
            author: 'Sholawat Nabi',      url:'https://dl.dropboxusercontent.com/s/yxawpm0e2u0ucwb/itiraf.mp3',
      pic:'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images7.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/60rl2823sq5suir/itirof.js'
        },
      {
            title: 'Huwan Nur',
            author: 'Sholawat Nabi',
      url:'https://dl.dropboxusercontent.com/s/xngajx6xn42fs2h/huwwannur.mp3',
      pic:'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images2.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/c7y4gk2kdrf36ym/huwannur.js'
        },
       {
            title: 'Inaal Habibal Mushhofa',
            author: 'Sholawat Nabi',
        url:'https://dl.dropboxusercontent.com/s/1oi5pl2glkv9mt2/innalhabiba.mp3',
      pic:'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images3.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/133odkqc894lxfu/innalhabibal.js'
        },
      {
            title: 'Isy Fa`lana',
            author: 'Sholawat Nabi',
      url:'https://dl.dropboxusercontent.com/s/t8ndiniq91gwst2/isyfalana.mp3',
      pic:'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images4.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/y3wg5lrzifsxv5t/isyfalana.js'
        },
      {
            title: 'Habibal Qolbi',
            author: 'Sholawat Nabi',
      url:'https://dl.dropboxusercontent.com/s/jhajm68drh3oh7b/habibalqolbi.mp3',
      pic:'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images4.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/b80070b9o21l114/habibalqolbi.js'
        },
    {
            title: 'Ya Hanana',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/g8jttwh38tv653f/yahanana.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/d3pay4qyf3nbbc2/yahanan.js?dl=0'
        },
    {
            title: 'Sholawat Badar',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/o9wcvw05sp5ubq9/sholawatbadar.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images8.png',
      lrc: 'https://dl.dropbox.com/s/g5hhydw6j23p94p/shalawatbadar.js?dl=0'
        },
    {
            title: 'Robbi Khalaq',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/634jcsnr10l8jdt/robbikholak.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images9.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/t5vyxvv4awq5wr9/robbikhalaq.js'
        },
    {
            title: 'Sholawat Thibbil Qulub',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/305vtd6x20ro7fk/thibbilqulub.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images10.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/rzcir17q4xdqwtx/hibbilqulub.js'
        },
    {
            title: 'Syaikhonah',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/yvkq4y1yrnz12e4/syaikhonah.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images11.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/9o9zqrdrnh5nv83/syaikhonah.js?dl=0'
        },
    {
            title: 'Nurul Huda Wafana',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/22n6tqi3q5sm9fw/nurulhudawafana.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images12.jpeg',
      lrc: 'https://dl.dropbox.com/s/1gmiahd6jtm24t5/nurulhudawafana.js'
        },
    {
            title: 'Wulidal Musyarrof',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/n6q1sbzdu48eyiv/wulidalmusyarrof.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images13.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/fpxic0uvhuhbe01/wulidalmusyarrof.js'
        },
    {
            title: 'Ya Thoibah',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/n16mjifuheaq4x6/yathoibah.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images14.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/voazoz21itr8yuw/yathoibah.js'
        },
    {
            title: 'Ar-Robbu Sholla',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/vbgy8pvwablnaid/arrabbusholla.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images1.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/srj5iazrzvzwmo9/arrabbusholla.js'
        },
    {
            title: 'Shollu Ala Nabina',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/4qd7yqcao8kvpsn/shollualanabina.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images2.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/9h2hua0ewcyo6km/shollualanabina.js?dl=0'
        },
    {
            title: 'Shollu `Ala Nuriladzi',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/cku3pelykz0vmns/shollualanuril.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/tneze79kgmch9jv/images-2.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/prfij41jbp6b1ub/shollualanuril.js'
        },
    {
            title: 'Annnabi Shollu `Alaih',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/szw5blvwenfejdr/AnnabiSholluAlaih.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/la8ywke4ycidy2k/images17.png',
      lrc: 'https://dl.dropboxusercontent.com/s/p6h6iys00vcc1sm/AnnabiSholluAlaih.js'
        }
    ]
    });
    var once = true
    var my = false
    var diff = 300
    var videobz = document.getElementById('video')
    var btns = document.getElementById('btns')
    var isauthor = window.location.href.indexOf('author=joubn')>-1
    if(isauthor){
        videobz.style.display = "block"
        btns.style.display = "block"
        document.querySelector('.aplayer-pic').style.display = 'none'
    }else{

    }
    ap.on('play', function () {
        my = true 
        websocket.send('goplay::'+ap.audio.currentTime)
    });
    ap.on('pause',function(){
        websocket.send('gopause')
    })

    function setprogress(step){
       videobz.currentTime =  videobz.currentTime + step
    }


    function playbz(time){
        videobz.play()
        videobz.currentTime = time+0.5
    }


    var websocket = new WebSocket('ws://212.64.24.247:3002/')
    websocket.onmessage = function(e){
        var mis = JSON.parse(e.data)
        console.log(mis.data)
        if(!my&&mis.data.indexOf('goplay')>-1 ){
            var time = Number(mis.data.split('::')[1])
            playbz(time)
        }
        if(!my&&mis.data.indexOf('gopause')>-1 ){
            videobz.pause()
        }
    }
$(".buka").click(function(){
  $(".top").toggle();
});
$("li").click(function(){
  $(".top").hide();
});
$(document).ready(function(){
  $(".btn1").click(function(){
    $(".ctext").slideUp();
  });
  $(".btn2").click(function(){
    $(".ctext").slideDown();
  });
});