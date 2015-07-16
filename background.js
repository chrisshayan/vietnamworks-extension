/**
 * Created by chris on 7/14/15.
 */
// omnibox
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
        {content: text + " one", description: "java"},
        {content: text + " number two", description: "the second entry"}
    ]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.browserAction.setBadgeText({text: window.VietnamWorksJobAlert.settings.get('keyword')});

});