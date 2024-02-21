function typeText(element, text, speed) {
  return new Promise(resolve => {
    let i = 0;
    const intervalId = setInterval(() => {
      element.innerHTML += text.charAt(i);
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        resolve();
      }
    }, speed);
  });
}

async function showInfo() {
  const username = document.getElementById('username').value;
  const infoDiv = document.getElementById('info');
  const spinner = document.getElementById('spinner');

  // Show loading spinner
  spinner.style.display = 'block';

  // Clear existing content
  infoDiv.innerHTML = '';

  // Type greeting with username
  await typeText(infoDiv, `Hello, ${username}!`, 50);
  infoDiv.innerHTML += '<br>';

  // Fetch IP address, location, date, and time
  fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
      infoDiv.innerHTML += `<p>Your IP address is: ${ipAddress}</p>`;
      
      // Fetch location based on IP address
      fetch(`https://ipapi.co/${ipAddress}/json/`)
        .then(response => response.json())
        .then(data => {
          const location = `${data.city}, ${data.region}, ${data.country_name}`;
          infoDiv.innerHTML += `<p>Your location is: ${location}</p>`;

          // Hide loading spinner
          spinner.style.display = 'none';
        });
    });

  // Display current date and time with typing effect
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  await typeText(infoDiv, `Current date: ${currentDate}`, 50);
  infoDiv.innerHTML += '<br>';
  await typeText(infoDiv, `Current time: ${currentTime}`, 50);
}

function findLocation() {
            var ipAddress = document.getElementById('ipAddress').value;
            fetch(`https://ipapi.co/${ipAddress}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        document.getElementById('locationResult').innerHTML = `<p>Error: ${data.reason}</p>`;
                    } else {
                        var latitude = data.latitude;
                        var longitude = data.longitude;
                        document.getElementById('locationResult').innerHTML = `<p>Latitude: ${latitude}</p><p>Longitude: ${longitude}</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('locationResult').innerHTML = '<p>Error retrieving location. Please try again later.</p>';
                });
        }

        // Function to toggle between dark and light mode
function toggleDarkMode() {
  const html = document.getElementById('html');
  html.classList.toggle('dark-mode');
}

// Event listener to toggle mode on button click
document.getElementById('toggleModeButton').addEventListener('click', toggleDarkMode);
// Function to speak a text once
function speakOnce(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
  speechSynthesis.speak(msg);
}

// Call the function with the desired text
speakOnce("Welcome KingTracker  made by King kAshraf ");
