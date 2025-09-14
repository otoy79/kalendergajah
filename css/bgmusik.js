var analyzer, canvas, ctx, btn, audio, audioContext

window.onload = function() {
   audioContext = new AudioContext();
   canvas = document.getElementById('canvas')
   canvas.width = window.innerWidth
   canvas.height = window.innerHeight
   ctx = canvas.getContext('2d')
   
   audio = document.getElementById('player')
analyzer = audioContext.createAnalyser()
analyzer.fftSize = 2048
var source = audioContext.createMediaElementSource(audio)
source.connect(analyzer)
analyzer.connect(audioContext.destination)

   
   btn1 = document.getElementById('btnspec1')
btn2 = document.getElementById('btnspec2')

btn1.addEventListener('click', function(e) {
  audioContext.resume().then(() => {
    if(!audio.paused) {
      btn1.firstChild.classList.add('ion-play')
      btn1.firstChild.classList.remove('ion-pause')
      btn2.firstChild.classList.add('play')
      btn2.firstChild.classList.remove('pause')
      audio.pause()
    } else {
      btn1.firstChild.classList.remove('ion-play')
      btn1.firstChild.classList.add('ion-pause')
      btn2.firstChild.classList.remove('play')
      btn2.firstChild.classList.add('pause')
      audio.play()
    }
  })
})

btn2.addEventListener('click', function(e) {
  audioContext.resume().then(() => {
    if(!audio.paused) {
      btn1.firstChild.classList.add('ion-play')
      btn1.firstChild.classList.remove('ion-pause')
      btn2.firstChild.classList.add('play')
      btn2.firstChild.classList.remove('pause')
      audio.pause()
    } else {
      btn1.firstChild.classList.remove('ion-play')
      btn1.firstChild.classList.add('ion-pause')
      btn2.firstChild.classList.remove('play')
      btn2.firstChild.classList.add('pause')
      audio.play()
    }
  })
})

draw()
}

function draw() {
   requestAnimationFrame(draw)
   var spectrum = new Uint8Array(analyzer.frequencyBinCount)
   analyzer.getByteFrequencyData(spectrum)
   ctx.clearRect(0,0,canvas.width, canvas.height)
   
   var prev = {
      x: 0,
      y: 0
   }
   
   var w = 30
   
   ctx.beginPath()
   ctx.moveTo(0, canvas.height)
   ctx.lineTo(0,canvas.height - spectrum[0])
   
   for(var i = 0; i < spectrum.length; i += w) {
      
      var curr = {
         x: i,
         y: canvas.height - spectrum[i]
      }
      
      var next = {
         x: i + w,
         y: canvas.height - spectrum[i + w]
      }
      
      var xc = (curr.x + next.x) / 2;
      var yc = (curr.y + next.y) / 2;
      ctx.quadraticCurveTo(curr.x, curr.y, xc, yc)
      
      prev = {
         x: curr.x,
         y: curr.y
      }
      
   }
   
   ctx.quadraticCurveTo(prev.x, prev.y, canvas.width, canvas.height)
   ctx.fillStyle = 'rgba(237, 114, 38, 0.3)';
   ctx.closePath();  //draw to first point
   ctx.shadowColor = 'rgba(45, 237, 38, 0.1)';
   ctx.shadowBlur = 10;
   ctx.shadowOffsetX = 1;
   ctx.shadowOffsetY = -9;
   ctx.fill();
}