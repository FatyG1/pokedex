document.addEventListener("DOMContentLoaded", function(event) {
    var btQr = document.getElementById("btQr");
    var result = document.getElementById("result");
    var container = document.getElementById('.containerTxt')
    btQr.addEventListener("click", function() {
      
      // Acceder al video de la cámara
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
          // Mostrar la vista previa de la cámara
         
          video.setAttribute("autoplay", true);
          video.setAttribute("playsinline", true);
          video.srcObject = stream;
                    
          // Configurar el escaneo continuo
          var canvas = document.getElementById("canvas");
          var context = canvas.getContext("2d");
          var qrWorker = new Worker("jsqr.js");
          
          function scanVideoFrame() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              var code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
              });
              
              if (code) {
                // Se encontró un código QR
                result.innerHTML =  `
                <a href='${code.data}'>${code.data}<a> 
                `         
                stream.getTracks()[0].stop();  // Detener la cámara
                document.body.removeChild(video);  // Eliminar el elemento de video              
              } else {
                requestAnimationFrame(scanVideoFrame);
              }
            } else {
              requestAnimationFrame(scanVideoFrame);
            }
          }
          
          requestAnimationFrame(scanVideoFrame);
        })
        .catch(function(error) {
          console.error("Error al acceder a la cámara: ", error);
        });
    });
  });

  function clean(){
    document.querySelector('.containerTxt').innerHTML =  ``
  }