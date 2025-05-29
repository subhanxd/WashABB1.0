// Define item prices
const prices = {
  "250ml": 20,
  "1liter": 40,
  "18liter": 250,
  "refill-18liter": 100
};

// Calculate and update total price
function calculateTotal() {
  let total = 0;

  total += (parseInt(document.getElementById("qty-250ml").value) || 0) * prices["250ml"];
  total += (parseInt(document.getElementById("qty-1liter").value) || 0) * prices["1liter"];
  total += (parseInt(document.getElementById("qty-18liter").value) || 0) * prices["18liter"];
  total += (parseInt(document.getElementById("qty-refill-18liter").value) || 0) * prices["refill-18liter"];

  document.getElementById("total-price").textContent = total;
}

// Place order with multiple items
function placeOrder() {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Not logged in");
    return;
  }

  const orderItems = [];

  const addItem = (type, qtyId) => {
    const quantity = parseInt(document.getElementById(qtyId).value) || 0;
    if (quantity > 0) {
      orderItems.push({
        type,
        quantity,
        total: prices[type] * quantity
      });
    }
  };

  addItem("250ml", "qty-250ml");
  addItem("1liter", "qty-1liter");
  addItem("18liter", "qty-18liter");
  addItem("refill-18liter", "qty-refill-18liter");

  if (orderItems.length === 0) {
    alert("Please enter quantity for at least one item.");
    return;
  }

  const totalPrice = orderItems.reduce((sum, item) => sum + item.total, 0);

  db.collection("orders").add({
    uid: user.uid,
    items: orderItems,
    totalPrice,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert(`Order placed!\nTotal: Rs ${totalPrice}`);

    // Reset fields
    document.getElementById("qty-250ml").value = 0;
    document.getElementById("qty-1liter").value = 0;
    document.getElementById("qty-18liter").value = 0;
    document.getElementById("qty-refill-18liter").value = 0;
    document.getElementById("total-price").textContent = "0";
  }).catch(error => {
    console.error("Error placing order:", error);
    alert("Failed to place order");
  });
}

// Set up event listeners for quantity inputs
["qty-250ml", "qty-1liter", "qty-18liter", "qty-refill-18liter"].forEach(id => {
  document.getElementById(id).addEventListener("input", calculateTotal);
});
