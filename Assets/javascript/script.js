// Function to get user's location based on IP address
async function getUserLocation() {
  try {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    return {
      city: data.city,
      country: data.country,
    };
  } catch (error) {
    console.error("Error fetching user location:", error);
    return null;
  }
}

// Function to fetch prayer timings using the user's location
async function fetchPrayerTimings() {
  const userLocation = await getUserLocation();

  if (userLocation) {
    const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${userLocation.city}&country=${userLocation.country}&method=8`;

    // Now you can use the apiUrl to fetch prayer timings
    // Example: fetch(apiUrl).then(response => response.json()).then(data => console.log(data));
  } else {
    console.error("Unable to determine user location.");
  }
}

// Call the function to fetch prayer timings
fetchPrayerTimings();
