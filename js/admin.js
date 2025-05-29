const allOrdersList = document.getElementById("all-orders");
const salesSummaryList = document.getElementById("sales-summary");

// Format timestamp to readable string
function formatTimestamp(timestamp) {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate();
  return date.toLocaleString();
}

// Load all orders from Firestore and display (real-time)
function loadOrders() {
  db.collection("orders").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    allOrdersList.innerHTML = "";
    if (snapshot.empty) {
      allOrdersList.innerHTML = "<li>No orders found.</li>";
      return;
    }

    snapshot.forEach(doc => {
      const order = doc.data();

      // Defensive defaults in case properties missing
      const type = order.type || "N/A";
      const quantity = order.quantity !== undefined ? order.quantity : "N/A";
      const totalPrice = order.totalPrice !== undefined ? order.totalPrice : "N/A";
      const time = formatTimestamp(order.timestamp);

      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Type:</strong> ${type} <br>
        <strong>Quantity:</strong> ${quantity} <br>
        <strong>Total Price:</strong> Rs ${totalPrice} <br>
        <strong>Time:</strong> ${time}
      `;
      allOrdersList.appendChild(li);
    });
  }, error => {
    allOrdersList.innerHTML = "<li>Error loading orders.</li>";
    console.error("Error fetching orders:", error);
  });
}

// Load sales summary grouped by type (not real-time, but can be)
function loadSalesSummary() {
  db.collection("orders").get().then(snapshot => {
    if (snapshot.empty) {
      salesSummaryList.innerHTML = "<li>No sales data.</li>";
      return;
    }

    // Calculate total sales per type
    const sales = {};

    snapshot.forEach(doc => {
      const order = doc.data();
      if (!order.type || order.totalPrice === undefined) return;

      if (!sales[order.type]) {
        sales[order.type] = {
          quantity: 0,
          totalSales: 0,
        };
      }
      sales[order.type].quantity += order.quantity || 0;
      sales[order.type].totalSales += order.totalPrice || 0;
    });

    salesSummaryList.innerHTML = "";
    for (const [type, data] of Object.entries(sales)) {
      const li = document.createElement("li");
      li.textContent = `${type}: ${data.quantity} items sold, Rs ${data.totalSales} total`;
      salesSummaryList.appendChild(li);
    }
  }).catch(error => {
    salesSummaryList.innerHTML = "<li>Error loading sales summary.</li>";
    console.error("Error fetching sales summary:", error);
  });
}

// Initialize dashboard
loadOrders();
loadSalesSummary();
