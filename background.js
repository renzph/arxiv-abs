// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains  'arxiv.org/pdf' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'arxiv.org/pdf'},
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});


function pdfToAbs(pdf_link) {
  var patt = /arxiv.org\/pdf\/(.*).pdf/;
  var res = pdf_link.match(patt);
  if (res) {
    var arxiv_id = res[1];
    return "https://arxiv.org/abs/" + arxiv_id;
  }
};


function goToAbstract(tab, link) {
  chrome.tabs.update(tab.id, {url: pdfToAbs(link)});
};

// Setup extension click action
chrome.pageAction.onClicked.addListener(function(tab) {
  console.log('asoenuth')
  goToAbstract(tab, tab.url);
});