const axios = require('axios');
const config = require('../config/config');

async function getLastSales(top = 10) {
  try {
    const response = await axios.get(`${config.ggsel.baseUrl}/seller-last-sales`, {
      params: {
        token: config.ggsel.apiKey,
        seller_id: config.ggsel.sellerId,
        top: Math.min(top, 50),
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    console.error('GGSEL API error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getLastSales };
