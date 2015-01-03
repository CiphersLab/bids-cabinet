chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
        'bounds': {
            'width': 400,
            'height': 500
        }
    });
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null,
        {file:"https://connect.facebook.net/en_US/all.js"});
});