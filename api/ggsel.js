const axios = require('axios');
const crypto = require('crypto');
const config = require('../config/config');

// Получение токена для API v1
async function getSellerToken() {
  const timestamp = Date.now().toString();
  const sign = crypto.createHash('sha256')
    .update(config.ggsel.apiKey + timestamp)
    .digest('hex');

  const url = 'https://seller.ggsel.com/api_sellers/api/apilogin';
  const payload = {
    seller_id: config.ggsel.sellerId,
    timestamp: timestamp,
    sign: sign,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Accept': 'application/json' },
      timeout: 10000,
    });
    return response.data.token;
  } catch (error) {
  console.error("=== LOGIN ERROR ===");
  console.error("Status:", error.response?.status);
  console.error("Data:", error.response?.data);
  console.error("Request:", payload);
  throw error;
}
}

// Получение последних заказов с использованием токена
async function getLastSales(top = 10) {
  try {
    const token = await getSellerToken();
    const response = await axios.get(`${config.ggsel.baseUrl}/seller-last-sales`, {
      params: {
        token: token,
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
