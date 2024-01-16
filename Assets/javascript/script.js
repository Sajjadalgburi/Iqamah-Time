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
