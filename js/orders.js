auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("orders").where("uid", "==", user.uid).orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        const list = document.getElementById("order-list");
        list.innerHTML = "";
        snapshot.forEach(doc => {
          const data = doc.data();
          const li = document.createElement("li");
          li.textContent = `${data.type} - ${data.quantity}`;
          list.appendChild(li);
        });
      });
  }
});
