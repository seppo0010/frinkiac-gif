var items = [];
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case 'clear_items':
      items = [];
      break;
    case 'add_item':
      items.push(request.src);
      break;
    case 'remove_item':
      var index = items.indexOf(request.src);
      if (index >= 0) {
        items.splice(index, 1);
      }
      break;
    case 'get_items':
      sendResponse(items);
      break;
  }
});
