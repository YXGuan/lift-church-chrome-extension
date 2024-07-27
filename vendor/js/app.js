// json file needs to follow Mon, Jun 17
// Xreference remove all [] ''
// more than one verse
let settingsGear = document.getElementsByClassName('settings')[0];
let closeButton = document.getElementsByClassName('close')[0];
let closeButtonTooltip = document.getElementsByClassName('tooltip-close')[0];
let connectedThemeOption = document.getElementById('connected');
let connectedBlueThemeOption = document.getElementById('connectedBlue');
let clearThemeOption = document.getElementById('clear');
let connectedDarkBlueThemeOption = document.getElementById('connectedDarkBlue');

const QUOTES_API_URL = "https://apiooo.quotable.io/random?tags='Wisdom|Happiness|Inspirational'";

// TODO
// Define the link variable
const dynamicLink = "https://www.biblegateway.com/";

// Get the link element by its ID
const linkElement = document.getElementById("dynamic-link");

// Set the href attribute to the value of the dynamicLink variable
linkElement.href = dynamicLink;


function loadJSON(callback) {

  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './src/data/quotes.json', true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

async function fetchQuote() {

  let response = await fetch(QUOTES_API_URL);
  let responseJson = await response.json();

  console.log("fetched quote");
  return { quote: responseJson["content"], author: responseJson["author"] };
}


    // Function to get current date in "Day Mon DD" format
function getCurrentFormattedDate() {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
}

  // Function to fetch JSON data and set variables
async function setQuoteAndChapter() {
  try {
      const response = await fetch('./src/data/lift_devo_abbreviated_xReferenced_updated_no_dash_null_with_verses.json');
      const jsonData = await response.json();
      console.log('jsonData:', jsonData);

      // Get the current date
      const currentDate = getCurrentFormattedDate();
      console.log('currentDate:', currentDate);

      let quote = '';
      let chapter = '';

      let xReference = '';
      // Iterate through JSON data to find the matching date
      for (let entry of jsonData) {
          if (entry.Date === currentDate) {
              quote = entry.Tags;
              let parts = quote.split('\n\n');
              quote = parts[0]
              explaination = parts[1]
              console.log('explaination', explaination)
              chapter = entry.Title;
              xReference = entry.Xreference;

              break;
          }
      }

      // Log the results (or use the variables as needed)
      console.log('Quote:', quote);
      console.log('Chapter:', chapter);
      console.log('xReference:', xReference);

      setQuote(quote, chapter, xReference, explaination);

  } catch (error) {
      console.error('Error fetching or processing the JSON file:', error);
  }
}


function newQuote() {

  setQuoteAndChapter();


}

function setQuote(quote, author, xReference, explaination) {
  console.log("setting quote :", quote);
  document.getElementById('quote').innerHTML = quote;
  document.getElementById('author').innerHTML = author;
  document.getElementById('xReference').innerHTML = xReference;
  document.getElementById('explaination').innerHTML = explaination;


}

let applyTheme = () => {
  let theme = localStorage.getItem('theme');

  if (theme === 'bubbles') {
    colorfulBubbles();
  } else if (theme === 'clear') {
    settingGearColorInvert(false);
    clear();
  } else if (theme === 'connected' || !theme) {
    settingGearColorInvert(false);
    canvasDots();
  } else if (theme === 'connectedBlue') {
    settingGearColorInvert(true);
    canvasDots('#fff', '#2196F3', '#fff');
  } else if (theme === 'connectedDarkBlue') {
    settingGearColorInvert(true);
    canvasDots('#5cdb95', '#05386b', '#edf5e1');
  }
};

let setTheme = function (theme) {
  localStorage.setItem('theme', theme);
  applyTheme();
};

/* ADD ONLOAD EVENTS */

window.onload = applyTheme();
window.onload = newQuote();

/* ADD ALL THE ON CLICK EVENT LISTERNERS */
settingsGear.addEventListener('click', () => {
  openNav();
  turnTooltipOff();
});

closeButton.addEventListener('click', () => {
  closeNav();
});

closeButtonTooltip.addEventListener('click', () => {
  turnTooltipOff();
});

connectedThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connected');
  closeNav();
});

connectedBlueThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connectedBlue');
  closeNav();
});

connectedDarkBlueThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connectedDarkBlue');
  closeNav();
});

clearThemeOption.addEventListener('click', () => {
  setTheme('clear');
  closeNav();
});

function checkStorageForTooltipInformation() {
  let hide = localStorage.getItem('hideTooltip');

  if (hide) {
    let tooltipElement = document.getElementsByClassName('tooltip')[0];
    let parent = tooltipElement.parentElement;

    // Remove the element
    parent.removeChild(tooltipElement);
  }
}

/* CHECK TO SEE IF TOOLTIP HAS ALREADY BEEN SHOW */
checkStorageForTooltipInformation();

function turnTooltipOff() {
  let show = localStorage.setItem('hideTooltip', true);

  checkStorageForTooltipInformation();
}

function settingGearColorInvert(invert) {
  if (invert) {
    // Create the <style> tag
    let style = document.createElement('style');
    style.id = 'style';

    // WebKit hack :(
    style.appendChild(document.createTextNode(''));

    // Add the <style> element to the page
    document.head.appendChild(style);

    let sheet = style.sheet;

    sheet.insertRule("img.settings { filter: invert(100%); }");
  } else {
    let headElement = document.getElementsByTagName('head')[0];
    let styleElement = document.getElementById('style');

    // Remove the style element if it exists
    if (styleElement) {
      headElement.removeChild(styleElement);
    }
  }
}