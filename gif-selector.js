document.addEventListener("mousedown", function(event) {
  var node = event.target;
  if (node.classList.contains('caption-nav-item')) {
    var src = node.getElementsByTagName('img')[0].src.replace('/small', '');
    if (node.classList.contains('caption-nav-item--gif')) {
      node.classList.remove('caption-nav-item--gif');
      chrome.runtime.sendMessage({type: 'remove_item', src: src});
    } else {
      node.classList.add('caption-nav-item--gif');
      chrome.runtime.sendMessage({type: 'add_item', src: src});
    }

    event.preventDefault();
    event.stopPropagation();
  }
});
