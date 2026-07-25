const { getLastSales } = require('../api/ggsel');

// Хранилище обработанных заказов (в памяти)
const processedOrders = new Set();

async function processOrders() {
  try {
    console.log('Checking new orders...');
    const data = await getLastSales(10);
    const sales = data.sales || [];

    if (sales.length === 0) {
      console.log('No new orders');
      return;
    }

    for (const order of sales) {
      const orderId = order.id || order.inv;
      if (processedOrders.has(orderId)) {
        continue;
      }

      console.log(`New order: ${orderId}`, order);
      // Пока только логируем, FZR не подключаем
      processedOrders.add(orderId);
    }
  } catch (error) {
    console.error('Error processing orders:', error.message);
  }
}

module.exports = { processOrders };
