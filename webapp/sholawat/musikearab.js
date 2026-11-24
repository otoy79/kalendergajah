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
            url: 'https://dl.dropboxusercontent.com/s/4fg02bldfhk1fd5/shollallahu-ala-muhammad.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/mptcljtjvoysb3l/images1.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/xpt5dyi3lxvhu3o/shollahu-ala-muhammad.js'
        },
    {
            title: 'Al-`Itirof',
            author: 'Sholawat Nabi',      url:'https://dl.dropboxusercontent.com/s/yxawpm0e2u0ucwb/itiraf.mp3',
      pic:'https://dl.dropboxusercontent.com/s/k5mhdknlnqs7nrd/images7.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/1xxhsejf5fo76ah/alihtirof.js'
        },
      {
            title: 'Huwan Nur',
            author: 'Sholawat Nabi',
      url:'https://dl.dropboxusercontent.com/s/xngajx6xn42fs2h/huwwannur.mp3',
      pic:'https://dl.dropboxusercontent.com/s/lcx7jcvxwmihpb6/images2.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/mmioens3vzfr9h5/huwannur.js'
        },
       {
            title: 'Inaal Habibal Mushhofa',
            author: 'Sholawat Nabi',
        url:'https://dl.dropboxusercontent.com/s/1oi5pl2glkv9mt2/innalhabiba.mp3',
      pic:'https://dl.dropboxusercontent.com/s/uswkrzpvfppajiy/images3.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/obaair895661kik/innalhabibal.js'
        },
      {
            title: 'Isy Fa`lana',
            author: 'Sholawat Nabi',
      url:'https://dl.dropboxusercontent.com/s/t8ndiniq91gwst2/isyfalana.mp3',
      pic:'https://dl.dropboxusercontent.com/s/bgfyz1bjhfsivi9/images4.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/bikjhvrmgs8ht8q/isyfalana.js'
        },
      {
            title: 'Habibal Qolbi',
            author: 'Sholawat Nabi',
      url:'https://dl.dropboxusercontent.com/s/jhajm68drh3oh7b/habibalqolbi.mp3',
      pic:'https://dl.dropboxusercontent.com/s/bgfyz1bjhfsivi9/images4.jpeg',
      lrc:'https://dl.dropboxusercontent.com/s/fe3tekykhu7ix43/habibalqolbi.js'
        },
    {
            title: 'Ya Hanana',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/g8jttwh38tv653f/yahanana.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/y02omhkly3368b7/images.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/okua7seoft57p6w/yahanana.js'
        },
    {
            title: 'Sholawat Badar',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/o9wcvw05sp5ubq9/sholawatbadar.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/d9tlkckz6bdl6ku/images8.png',
      lrc: 'https://dl.dropbox.com/s/dj5c0yt37at951k/sholawatbadar.js'
        },
    {
            title: 'Robbi Khalaq',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/634jcsnr10l8jdt/robbikholak.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/to49ymccfikyju6/images9.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/lr3v4imi2losd2b/robbikholaq.js'
        },
    {
            title: 'Sholawat Thibbil Qulub',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/305vtd6x20ro7fk/thibbilqulub.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/32n9bued0ef01is/images10.jpeg',
      lrc: 'https://dl.dropbox.com/s/gdxylpb28xoejwq/hibbilqulub.js'
        },
    {
            title: 'Syaikhonah',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/yvkq4y1yrnz12e4/syaikhonah.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/ogf3qzmdsq7h0t7/images11.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/qus2oi6aw02pggo/syaikhonah.js'
        },
    {
            title: 'Nurul Huda Wafana',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/22n6tqi3q5sm9fw/nurulhudawafana.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/ep6hpf2tbe5fz0x/images12.jpeg',
      lrc: 'https://dl.dropbox.com/s/y0z7lgyrme7b7de/nurulhudawafana.js'
        },
    {
            title: 'Wulidal Musyarrof',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/n6q1sbzdu48eyiv/wulidalmusyarrof.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/itapfg3kfc7q2dt/images13.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/7ux750s8jxrkxei/wulidalmusyarrof.js'
        },
    {
            title: 'Ya Thoibah',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/n16mjifuheaq4x6/yathoibah.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/0fwcxiyb3kci0l5/images14.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/lpu9yns2exat2i8/yathoibah.js'
        },
    {
            title: 'Ar-Robbu Sholla',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/vbgy8pvwablnaid/arrabbusholla.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/mptcljtjvoysb3l/images1.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/ceyy4pa2epmjofq/arrabbusholla.js'
        },
{
            title: 'Shollu Ala Nabina',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/4qd7yqcao8kvpsn/shollualanabina.mp3',
            pic: 'https://g9lxddfgytkvz1tmdiewcw-on.drv.tw/sholawat-nabi-lirik/img/images2.jpeg',
      lrc: 'https://dl.dropbox.com/s/fief5tjuu4z76bi/SholuAlanaBina.js'
        },
    {
            title: 'Shollu `Ala Nurilladzi',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/cku3pelykz0vmns/shollualanuril.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/tneze79kgmch9jv/images-2.jpeg',
      lrc: 'https://dl.dropboxusercontent.com/s/0lv2d7tqjq0ppvz/SholluAlaNurilladzi.js'
        },
    {
            title: 'Annnabi Shollu `Alaih',
            author: 'Sholawat Nabi',
            url: 'https://dl.dropboxusercontent.com/s/szw5blvwenfejdr/AnnabiSholluAlaih.mp3',
            pic: 'https://dl.dropboxusercontent.com/s/la8ywke4ycidy2k/images17.png',
      lrc: 'https://dl.dropboxusercontent.com/s/ihld6u5h05ynicw/AnnabiSholluAlaih.js'
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

