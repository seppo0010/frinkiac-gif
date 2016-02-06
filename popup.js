var process_items = function(items) {
  document.getElementById('preview').innerHTML = '';
  document.getElementById('clear-all').style.display = items.length === 0 ? 'none' : 'block';
  if (items.length === 0) {
    document.getElementById('loading').innerHTML = '<p>Select frames and come back<br /><a href="https://frinkiac.com/" target="_blank">Frinkiac</a></p>';
    return;
  }
  var loaded = 0;
  var checkLoaded = function() {
    if (loaded === items.length) {
      var gif = new GIF({
        width: items[0].width,
        height: items[0].height,
        workers: 2,
        quality: 10
      });
      images.forEach(function(image) {
        gif.addFrame(image);
      });
      gif.render();
      gif.on('finished', function(blob) {
        document.getElementById('loading').innerHTML = '';
        document.getElementById('preview').innerHTML = '<img>';
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
};

window.addEventListener('load', function() {
  document.getElementById('clear-all').addEventListener('click', function() {
    chrome.runtime.sendMessage({type: 'clear_items'});
    process_items([]);
  });

  document.getElementById('loading').innerHTML = 'Loading...';
  chrome.runtime.sendMessage({type: 'get_items'}, process_items);
});
