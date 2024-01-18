if (typeof chrome !== "undefined") {
  var port = chrome.runtime.connect();

  document.addEventListener(
    "__msg-from-injected-script__",
    function (response) {
      chrome.runtime.sendMessage(response);
    }
  );
}
