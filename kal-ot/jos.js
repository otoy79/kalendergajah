 $(window).load(function() {
  $( "html" ).toggle( "slide" );
});
// BG COLOR TEMA1 RED
$("body").css('background-color', localStorage.getItem("body")); 
$(".tema1").click(function () {
    $(this).css('background-color', '#590703');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema1").css('background-color');
    localStorage.setItem("body", status);
});
// BG COLOR TABLE
$("table").css('background-color', localStorage.getItem("table")); 
$(".tema1").click(function () {
    $(this).css('background-color', '#850a04');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema1").css('background-color');
    localStorage.setItem("table", status);
});
// BG COLOR SELECT
$("select").css('background-color', localStorage.getItem("select")); 
$(".tema1").click(function () {
    $(this).css('background-color', '#3d0704');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema1").css('background-color');
    localStorage.setItem("select", status);
});
// COLOR  FONT
$("select, table, body").css('color', localStorage.getItem("select, table, body"));
$(".tema1").click(function () {
    $(this).css('color', '#fff');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema1").css('color');
    localStorage.setItem("select, table, body", status);
});

// BG COLOR TEMA2 BLUE
$("body").css('background-color', localStorage.getItem("body")); 
$(".tema2").click(function () {
    $(this).css('background-color', '#060359');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema2").css('background-color');
    localStorage.setItem("body", status);
});
// BG COLOR TABLE
$("table").css('background-color', localStorage.getItem("table")); 
$(".tema2").click(function () {
    $(this).css('background-color', '#0c07a3');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema2").css('background-color');
    localStorage.setItem("table", status);
});
// BG COLOR SELECT
$("select").css('background-color', localStorage.getItem("select")); 
$(".tema2").click(function () {
    $(this).css('background-color', '#050342');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema2").css('background-color');
    localStorage.setItem("select", status);
});
// COLOR  FONT
$("select, table, body").css('color', localStorage.getItem("select, table, body"));
$(".tema2").click(function () {
    $(this).css('color', '#fff');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema2").css('color');
    localStorage.setItem("select, table, body", status);
});

// BG COLOR TEMA3 GREEN
$("body").css('background-color', localStorage.getItem("body")); 
$(".tema3").click(function () {
    $(this).css('background-color', '#183803');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema3").css('background-color');
    localStorage.setItem("body", status);
});
// BG COLOR TABLE
$("table").css('background-color', localStorage.getItem("table")); 
$(".tema3").click(function () {
    $(this).css('background-color', '#2c6903');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema3").css('background-color');
    localStorage.setItem("table", status);
});
// BG COLOR SELECT
$("select").css('background-color', localStorage.getItem("select")); 
$(".tema3").click(function () {
    $(this).css('background-color', '#142e03');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema3").css('background-color');
    localStorage.setItem("select", status);
});
// COLOR  FONT
$("select, table, body").css('color', localStorage.getItem("select, table, body"));
$(".tema3").click(function () {
    $(this).css('color', '#fff');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema3").css('color');
    localStorage.setItem("select, table, body", status);
});

// BG COLOR TEMA4 BLACK
$("body").css('background-color', localStorage.getItem("body")); 
$(".tema4").click(function () {
    $(this).css('background-color', '#000203');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema4").css('background-color');
    localStorage.setItem("body", status);
});
// BG COLOR TABLE
$("table").css('background-color', localStorage.getItem("table")); 
$(".tema4").click(function () {
    $(this).css('background-color', '#000203');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema4").css('background-color');
    localStorage.setItem("table", status);
});
// BG COLOR SELECT
$("select").css('background-color', localStorage.getItem("select")); 
$(".tema4").click(function () {
    $(this).css('background-color', '#000203');            
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema4").css('background-color');
    localStorage.setItem("select", status);
});
// COLOR  FONT
$("select, table, body").css('color', localStorage.getItem("select, table, body"));
$(".tema4").click(function () {
    $(this).css('color', '#fff');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema4").css('color');
    localStorage.setItem("select, table, body", status);
});
// CLEAR TEMA
$('.defauld').click( function() { 
localStorage.removeItem('body');
localStorage.removeItem('select');
localStorage.removeItem('table');
localStorage.removeItem('select, table, body');
setTimeout(function(){
                  location.reload(true);
                }, 10);      
});
// BG COLOR button tema1
$(".tema1").css('background-color', localStorage.getItem(".tema1"));
$(".tema1").click(function () {
    $(this).css('background-color', '#850a04');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema1").css('background-color');
    localStorage.setItem(".tema1", status);
});
// BG COLOR button tema2
$(".tema2").css('background-color', localStorage.getItem(".tema2"));
$(".tema2").click(function () {
    $(this).css('background-color', '#0c07a3');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema2").css('background-color');
    localStorage.setItem(".tema2", status);
});
// BG COLOR button tema3
$(".tema3").css('background-color', localStorage.getItem(".tema3"));
$(".tema3").click(function () {
    $(this).css('background-color', '#2c6903');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema3").css('background-color');
    localStorage.setItem(".tema3", status);
});
// BG COLOR button tema4
$(".tema4").css('background-color', localStorage.getItem(".tema4"));
$(".tema4").click(function () {
    $(this).css('background-color', '#000203');
  setTimeout(function(){
                  location.reload(true);
                }, 10);      
    var status = $(".tema4").css('background-color');
    localStorage.setItem(".tema4", status);
});
// CLEAR BG BOTON
$('.tema2').click( function() { 
localStorage.removeItem('.tema1');});
$('.tema2').click( function() { 
localStorage.removeItem('.tema3');});
$('.tema2').click( function() { 
localStorage.removeItem('.tema4');});

$('.tema3').click( function() { 
localStorage.removeItem('.tema1');});
$('.tema3').click( function() { 
localStorage.removeItem('.tema2');});
$('.tema3').click( function() { 
localStorage.removeItem('.tema4');});

$('.tema1').click( function() { 
localStorage.removeItem('.tema2');});
$('.tema1').click( function() { 
localStorage.removeItem('.tema3');});
$('.tema1').click( function() { 
localStorage.removeItem('.tema4');});

$('.tema4').click( function() { 
localStorage.removeItem('.tema1');});
$('.tema4').click( function() { 
localStorage.removeItem('.tema3');});
$('.tema4').click( function() { 
localStorage.removeItem('.tema2');});

$('.defauld').click( function() { 
localStorage.removeItem('.tema1');});
$('.defauld').click( function() { 
localStorage.removeItem('.tema2');});
$('.defauld').click( function() { 
localStorage.removeItem('.tema3');});
$('.defauld').click( function() { 
localStorage.removeItem('.tema4');});

$(".close").click(function(){
  $(".tooltip, .m-bulan").hide(350);});

$(function () {
    $('.linkk').on('mouseenter',

    function () {
        if ($('.tooltip').is(':visible')) {
            $('.tooltip').hide(250);
        }
        $(this).next().show(250);
    });
    $('.tooltip').on('mouseout',

    function () {
        $(this).hide(250);
    });
})
$(function () {
    $('.menu').on('mouseenter',

    function () {
        if ($('.m-bulan').is(':visible')) {
            $('.m-bulan').hide(250);
        }
        $(this).next().show();
    });
    $('.m-bulan').on('mouseout',

    function () {
        $(this).hide(250);
    });
})

$(document).ready(function(){
  $(".open-hapus").click(function(){
    $(".hapus").show(0);
  });
});

 $(".batal, .ok").click(function(){
  $(".hapus").hide(100);});
$(document).ready(function(){
        $(".ok").click(function(){
            setTimeout(function(){
                  location.reload(true);
                }, 10);       
        });
    });
//Textarea
 $(document).ready (function () {
      $("*[data-store]").each(function () {
 
        $(this).val(localStorage.getItem("item-" + $(this).attr("data-store")));
      });

      $("*[data-store]").on("keyup", function (itm) {
        localStorage.setItem ("item-" + $(this).attr("data-store"), $(this).val());
      })
    })

$(".menu").click(function(){
  $("p1").html(' <a onClick="return noHistory(this);" class="bdr-bulan" href="1.html"><span>Januari</span></a> <a onClick="return noHistory(this);" class="bdr-bulan" href="2.html"><span>Februari</span></a><a onClick="return noHistory(this);" class="bdr-bulan" href="3.html"><span>Maret</span></a> <a onClick="return noHistory(this);" class="bdr-bulan" href="4.html"><span>April</span></a> <a onClick="return noHistory(this);" class="bdr-bulan" href="5.html"><span>Mei</span></a> <a onClick="return noHistory(this);" class="bdr-bulan" href="6.html"><span>Juni</span></a> <a onClick="return noHistory(this);" class="bdr-bulan" href="7.html"><span>Juli</span></a> <a onClick="return noHistory(this);" class="bdr-bulan" href="8.html"><span>Agustus</span></a><a onClick="return noHistory(this);" class="bdr-bulan" href="9.html"><span>September</span></a><a onClick="return noHistory(this);" class="bdr-bulan" href="10.html"><span>Oktober</span></a><a onClick="return noHistory(this);" class="bdr-bulan" href="11.html"><span>November</span></a><a onClick="return noHistory(this);" class="bdr-bulan" href="12.html"><span>Desember</span></a> <hr></br> ');
});
 
function noHistory(aObj) { document.location.replace(aObj.href); return false; }

