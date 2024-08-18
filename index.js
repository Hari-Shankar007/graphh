const express = require('express');
const app = express();
const port = 3000;

// Function to generate random price change
function getRandomPriceChange(price) {
  const maxChange = price * 0.6;
  const change = (Math.random() - 0.5) * 2 * maxChange; // Random change between -maxChange and +maxChange
  return price + change;
}

// Store prices for the last 5 hours
let prices = [];

// Initialize prices with the initial value for 5 hours ago
const initialPrice = 100; // Example initial price
for (let i = 0; i < 5; i++) {
  prices.push(initialPrice);
}

// Update prices every hour
setInterval(() => {
  const lastPrice = prices[prices.length - 1];
  const newPrice = getRandomPriceChange(lastPrice);
  prices.push(newPrice);
  if (prices.length > 5) {
    prices.shift(); // Keep only the last 5 hours
  }
}, 3600000); // 1 hour in milliseconds

// API endpoint to get current price and prices from the last 5 hours
app.get('/price', (req, res) => {
  const currentPrice = prices[prices.length - 1];
  res.json({
    currentPrice,
    last5Hours: prices.slice(0, -1) // Exclude current price from the last 5 hours
  });
});

app.listen(port, () => {
  console.log(`Price tracker API listening at http://localhost:${port}`);
});
