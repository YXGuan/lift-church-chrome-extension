/** SCRIPT TO REDIRECT USER TO FORM AT UNINSTALLATION **/
/* Check whether new version is installed */

chrome.runtime.onStartup.addListener(() => {
  checkForUpdates();
});

chrome.runtime.onInstalled.addListener(() => {
  checkForUpdates();
});

function checkForUpdates() {
  chrome.runtime.requestUpdateCheck((status, details) => {
    if (status === "update_available") {
      console.log("Update available. Details:", details);
      chrome.runtime.reload();
    } else if (status === "no_update") {
      console.log("No update available.");
    } else if (status === "throttled") {
      console.log("Update check throttled. Try again later.");
    }
  });
}


// chrome.runtime.onInstalled.addListener(function(details) {
//   console.log("this is still executed")
//   /* other 'reason's include 'update' */
//   if (details.reason == "install") {
//       /* If first install, set uninstall URL */
//       var uninstallGoogleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfym2cRHxdZZCzKVn0eWVobWGjnrRLu64QPw19x7GR77tCWfQ/viewform?usp=pp_url&entry.1591633300=Comments&entry.326955045&entry.1696159737';
//       /* If Chrome version supports it... */
//       if (chrome.runtime.setUninstallURL) {
//           chrome.runtime.setUninstallURL(uninstallGoogleFormLink);
//       }
//   }
// });
