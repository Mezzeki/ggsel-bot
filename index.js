const express = require('express');
const config = require('./config/config');
const { processOrders } = require('./services/orders');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('OK');
});

app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  res.send('OK');
});

// Запускаем проверку заказов сразу при старте
processOrders();

// И каждые 30 секунд
setInterval(processOrders, config.checkInterval);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
