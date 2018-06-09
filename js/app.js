/*if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function (error) {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }*/

  (function(){
      if(!('serviceWorker' in navigator)){
          console.log('Service worker not supported');
          return;
      }
      navigator.serviceWorker.register('/serviceWorker.js')
      .then(function(registration){
          console.log('Registered at scope:', registration.scope);
      })
      .catch(function(error){
          console.log('Registration failed:', error);
      });
  })();