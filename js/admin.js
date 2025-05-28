// js/admin.js
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    alert("You must be logged in to view this page.");
    window.location.href = "index.html"; // redirect to login
    return;
  }

  const list = document.getElementById("all-orders");
  list.innerHTML = "<li>Loading orders...</li>";

  db.collection("orders")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      list.innerHTML = "";

      if (snapshot.empty) {
        list.innerHTML = "<li>No orders found</li>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `User: ${data.uid || "Unknown"} | ${data.type || "?"} - ${data.quantity || 0}`;
        list.appendChild(li);
      });
    }, err => {
      list.innerHTML = `<li>Error loading orders: ${err.message}</li>`;
      console.error("Snapshot error:", err);
    });
});
