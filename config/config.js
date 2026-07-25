require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  ggsel: {
    apiKey: process.env.GGSEL_API_KEY,
    sellerId: process.env.GGSEL_SELLER_ID,
    baseUrl: 'https://seller.ggsel.com/api_sellers/api',
  },
  checkInterval: 30000, // 30 секунд
};
