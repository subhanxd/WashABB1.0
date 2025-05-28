function placeOrder() {
  const type = document.getElementById("type").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!type || !quantity) {
    alert("Please fill in all fields.");
    return;
  }

  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Not logged in");
    return;
  }

  db.collection("orders").add({
    uid: user.uid,
    type,
    quantity,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Order placed!");
    document.getElementById("quantity").value = '';
  }).catch(error => {
    console.error("Error placing order:", error);
    alert("Failed to place order");
  });
}
