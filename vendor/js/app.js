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
let testThemeOption = document.getElementById('test');

const QUOTES_API_URL = "https://apiooo.quotable.io/random?tags='Wisdom|Happiness|Inspirational'";

// TODO
// Define the link variable
const dynamicLink = "https://www.biblegateway.com/";
const linkElement = document.getElementById("dynamic-link"); // Get the link element by its ID
linkElement.href = dynamicLink; // Set the href attribute to the value of the dynamicLink variable

document.addEventListener('DOMContentLoaded', function () {
  const datePicker = document.getElementById('datePicker');
  const pickDateButton = document.getElementById('pickDateButton');
  
  pickDateButton.addEventListener('click', function () {
      const selectedDate = datePicker.value; // This is a string in 'YYYY-MM-DD' format
      if (selectedDate) {
          // Create a date object from the selected date
          const dateObj = new Date(selectedDate);
          const formattedDate = formatDateForDisplay(dateObj); // Call the function to format date for display

          console.log('Selected Date:', formattedDate); // Use the formatted date as needed
          setQuoteAndChapter(formattedDate); // Call the function with the correct date
      } else {
          console.log('No date selected');
      }
  });
  shuffleAndLoadVideo();

  applyTheme();
  newQuote();
  checkStorageForTooltipInformation();
});

document.addEventListener('DOMContentLoaded', function () {
  const calendarLinks = document.querySelectorAll('.dropdown-content a');
  const calendarIframe = document.getElementById('calendarIframe');

  // Check if a calendar URL is saved in local storage
  const savedCalendarUrl = localStorage.getItem('selectedCalendarUrl');
  if (savedCalendarUrl) {
    calendarIframe.src = savedCalendarUrl;
  }
  
  calendarLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const calendarUrl = event.target.getAttribute('data-calendar-url');
      calendarIframe.src = calendarUrl;

      // Save the selected calendar URL to local storage
      localStorage.setItem('selectedCalendarUrl', calendarUrl);

    });
  });
});

// Function to shuffle the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const videoURLs = [
  "https://www.youtube.com/embed/njfuTvJCrAw?si=u8kW0t6vNxgTw1D6",
  "https://www.youtube.com/embed/tKf-FwIc2Us?si=swqCia-sCxGLd_-s",
  "https://www.youtube.com/embed/GQI72THyO5I?si=PkHNWb0WjmiWGpFW",
  "https://www.youtube.com/embed/Kzz8749TyJY?si=YfCl8s8DK_Ec5EYx",
"https://www.youtube.com/embed/MgCJyzFon84?si=O7vcBrvRsN77rl-K",
"https://www.youtube.com/embed/kE1xfuYh91s?si=-l-Js1MItULr977Z",
"https://www.youtube.com/embed/VdkFsmZZvb0?si=r3KtmNjxklzcgiZS",
"https://www.youtube.com/embed/v9fwTWfKihE?si=Z1A6AHoUpG6Slq9D",
"https://www.youtube.com/embed/xCSyrmvQbi8?si=wTVZ8GMFr7A2sXO5",
"https://www.youtube.com/embed/xzR0qi_hhuI?si=dslRqcusmqzA25MC",
"https://www.youtube.com/embed/GAhceK09aRY?si=NNPKZH6ZC-9HsO4B",
"https://www.youtube.com/embed/qn-hLHWwRYY?si=rHfh3h_e-5Tsl8Th",
"https://www.youtube.com/embed/j9phNEaPrv8?si=teQqH5VSSxiGm8DO", // Psalm
"https://www.youtube.com/embed/XIb_dCIxzr0?si=p-C17-yFrRahD5SL", // Luke p1
"https://www.youtube.com/embed/26z_KhwNdD8?si=zNj63cLaMFwgvtqA", // Luke p2
"https://www.youtube.com/embed/pXTXlDxQsvc?si=wHZz3LwAMLjzwZgx", // Colossians
"https://www.youtube.com/embed/Y30DanA5EhU?si=UYek68G2D035w2ed", // Nahum
"https://www.youtube.com/embed/G-2e9mMf7E8?si=hkEkxjs3kVfzJK41", // John
// "https://www.youtube.com/embed/",
];

// Function to shuffle the video URLs and load the first one
function shuffleAndLoadVideo() {
  shuffleArray(videoURLs); // Shuffle the video array
  const iframe = document.getElementById('videoIframe');
  iframe.src = videoURLs[0]; // Set the iframe's src to the first shuffled video
}

// Function to format the date correctly for display
function formatDateForDisplay(dateObj) {
  // Array of day names and month names
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const dayName = days[dateObj.getUTCDay()]; // Day name
  const monthName = months[dateObj.getUTCMonth()]; // Month name
  const day = dateObj.getUTCDate(); // Day of the month
  
  // Return formatted date string as "Mon, Sep 16"
  return `${dayName}, ${monthName} ${day}`;
}

/**
 * Returns the current date formatted in the same way.
 * @returns {string}
 */
function getCurrentFormattedDate() {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

// Function to fetch JSON data and set variables
async function setQuoteAndChapter(pickedDate) {
    try {
        const response = await fetch('./src/data/lift_devo_abbreviated_xReferenced_updated_no_dash_null_with_verses.json');
        const jsonData = await response.json();
        console.log('jsonData:', jsonData);

        // Use the passed date or get the current date if none is passed
        let currentDate = pickedDate || getCurrentFormattedDate();

        console.log('currentDate:', currentDate);

        let quote = '';
        let chapter = '';
        let xReference = '';
        let explaination = '';

        // Iterate through JSON data to find the matching date
        for (let entry of jsonData) {
            if (entry.Date === currentDate) {
                quote = entry.Tags;
                console.log('quote', quote);
                let parts = quote.split('\n\n');
                quote = parts[0];
                explaination = parts[1];
                if(explaination == null){
                  explaination = '';
                }
                console.log('explaination', explaination);
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

// Initial call to set quotes with the current date
setQuoteAndChapter();

function setQuote(quote, author, xReference, explaination) {
    console.log("setting quote :", quote);
    document.getElementById('quote').innerHTML = quote;
    document.getElementById('author').innerHTML = author;
    document.getElementById('xReference').innerHTML = xReference;
    document.getElementById('explaination').innerHTML = explaination;
}

function newQuote() {
    setQuoteAndChapter();
}

async function fetchQuote() {
    let response = await fetch(QUOTES_API_URL);
    let responseJson = await response.json();

    console.log("fetched quote");
    return { quote: responseJson["content"], author: responseJson["author"] };
}

//TODO
// https://developers.google.com/youtube/v3/determine_quota_cost

/* <div id="youtube-video"></div>

<script>
    const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube Data API key
    const playlistId = 'PLR62kll8fss6H3SPxny_X3drsOJSLMFMk'; // Replace with the Playlist ID

    async function getLatestVideo() {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].snippet.resourceId.videoId;
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            
            // Embed the video
            document.getElementById('youtube-video').innerHTML = `
                <iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        } else {
            document.getElementById('youtube-video').innerHTML = 'No videos found in playlist.';
        }
    }

    // Call the function on page load
    getLatestVideo();
</script> */

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
    } else if (theme === 'test') {
      settingGearColorInvert(false);
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

testThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('test');
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