// functions/price.js

const getRandomPriceChange = (price) => {
  const maxChange = price * 0.6;
  const change = (Math.random() - 0.5) * 2 * maxChange;
  return price + change;
};

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

exports.handler = async (event, context) => {
  const currentPrice = prices[prices.length - 1];
  return {
    statusCode: 200,
    body: JSON.stringify({
      currentPrice,
      last5Hours: prices, // Include the current price in the last 5 hours
    }),
  };
};

