window.addEventListener('load', function() {
  document.body.innerHTML = 'Loading...';
  chrome.runtime.sendMessage({type: 'get_items'}, function(items) {
    if (items.length === 0) {
      chrome.tabs.create({ url: 'https://frinkiac.com/' });
      return;
    }
    var loaded = 0;
    var checkLoaded = function() {
      if (loaded === items.length) {
        var gif = new GIF({
          width: 640,
          height: 480,
          workers: 2,
          quality: 10
        });
        images.forEach(function(image) {
          gif.addFrame(image);
        });
        gif.render();
        gif.on('finished', function(blob) {
          document.body.innerHTML = '<img width=640 height=480>';
          document.getElementsByTagName('img')[0].src = (URL.createObjectURL(blob));
        });
      }
    };
    var images = items.map(function(it, index) {
      var img = new Image();
      img.onload = function() {
        loaded++;
        checkLoaded();
      };
      img.src = it;
      return img;
    });
  });
});
