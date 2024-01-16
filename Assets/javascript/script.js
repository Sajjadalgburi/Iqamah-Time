document.addEventListener("DOMContentLoaded", function (event) {
  const ApiKey = "b41fb0ef272b35"; // Replace with your actual API key
  const TimeDisplayEl = document.querySelector(".current-Time");
  const userLocationElement = document.querySelector(".user-Location");
  const HijraDate = document.querySelector(".hijra-Date");

  // Function to get user's location based on IP address
  async function getUserLocation(data) {
    try {
      const response = await fetch(`https://ipinfo.io/json?token=${ApiKey}`);
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

  // function to get user's location and print it to screen
  const updateUserLocation = async () => {
    const userLocationData = await getUserLocation();

    if (userLocationData) {
      // checking if userLocationData exists, then proceed

      if (userLocationElement) {
        // checking if userLocationElement exists

        // updating the DOM with the newly acquired location
        userLocationElement.innerHTML =
          userLocationData.city + ", " + userLocationData.country;
      } else {
        console.error("Element with id 'userLocation' not found");
      }
    }
  };

  // function to print the Hijra date
  const updateHijraDate = async () => {
    try {
      const HijraDateData = await fetchPrayerTimings();

      if (HijraDateData && HijraDateData.data) {
        // Updating the DOM with the newly acquired Hijra date
        HijraDate.innerHTML =
          HijraDateData.data.date.hijri.month.number +
          " " +
          HijraDateData.data.date.hijri.month.en +
          ", " +
          HijraDateData.data.date.hijri.year;
      }
    } catch (error) {
      console.error("Error updating Hijra date:", error);
    }
  };

  // Function to fetch prayer timings using the user's location
  async function fetchPrayerTimings() {
    const userLocation = await getUserLocation();

    if (userLocation) {
      const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${userLocation.city}&country=${userLocation.country}`;

      console.log(apiUrl);

      try {
        // Make fetch request using async/await
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data);

        return data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching prayer timings:", error);
        return null;
      }
    } else {
      console.error("Unable to determine user location.");
      return null;
    }
  }
  // Function to display current time
  function displayTime() {
    const rightNow = dayjs().format("hh:mm:ss A");
    TimeDisplayEl.innerHTML = rightNow;
  }

  // Update time every second
  setInterval(displayTime, 1000);

  // calling functions
  fetchPrayerTimings();
  updateUserLocation();
  updateHijraDate();
});
