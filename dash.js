let currentEditID = null;

function openEditModal(listingID) {
  currentEditID = listingID;
  // Fetch listing data from Firebase
  firebase.firestore().collection("listings").doc(listingID).get().then(doc => {
    const data = doc.data();
    document.getElementById("edit-title").value = data.title;
    document.getElementById("edit-price").value = data.price;
    document.getElementById("edit-description").value = data.description;
    document.getElementById("edit-condition").value = data.condition;
    document.getElementById("edit-shipping").value = data.shipping;
    document.getElementById("edit-modal").style.display = "flex";
  });
}

function closeEditModal() {
  document.getElementById("edit-modal").style.display = "none";
}

document.getElementById("edit-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const updatedData = {
    title: document.getElementById("edit-title").value,
    price: document.getElementById("edit-price").value,
    description: document.getElementById("edit-description").value,
    condition: document.getElementById("edit-condition").value,
    shipping: document.getElementById("edit-shipping").value
  };
  firebase.firestore().collection("listings").doc(currentEditID).update(updatedData).then(() => {
    closeEditModal();
    location.reload(); // Optional: refresh to show updated listing
  });
});

if (doc.data().owner === firebase.auth().currentUser.uid) {
  // Allow edit
} else {
  alert("You can only edit your own listings.");
}
let listingToRemove = null;

function confirmRemove(listingID) {
  listingToRemove = listingID;
  document.getElementById("remove-modal").style.display = "flex";
}

function closeRemoveModal() {
  document.getElementById("remove-modal").style.display = "none";
  listingToRemove = null;
}

function removeListing() {
  if (!listingToRemove) return;

  firebase.firestore().collection("listings").doc(listingToRemove).delete().then(() => {
    closeRemoveModal();
    location.reload(); // Optional: refresh to reflect removal
  }).catch(error => {
    alert("Error removing listing: " + error.message);
    closeRemoveModal();
  });
}

firebase.firestore().collection("listings").doc(listingToRemove).get().then(doc => {
  if (doc.data().owner === firebase.auth().currentUser.uid) {
    // Proceed with delete
  } else {
    alert("You can only remove your own listings.");
  }
});

function openHistoryModal(listingID) {
  const log = document.getElementById("history-log");
  log.innerHTML = ""; // Clear previous

  firebase.firestore().collection("listings").doc(listingID).get().then(doc => {
    const data = doc.data();
    const history = [];

    if (data.createdAt) {
      history.push(`Created: ${new Date(data.createdAt.toDate()).toLocaleString()}`);
    }
    if (data.updatedAt) {
      history.push(`Last Updated: ${new Date(data.updatedAt.toDate()).toLocaleString()}`);
    }
    if (data.removedAt) {
      history.push(`Removed: ${new Date(data.removedAt.toDate()).toLocaleString()}`);
    }
    if (data.echoCount) {
      history.push(`Echoed ${data.echoCount} times`);
    }

    if (history.length === 0) {
      history.push("No history available.");
    }

    history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      log.appendChild(li);
    });

    document.getElementById("history-modal").style.display = "flex";
  });
}

function closeHistoryModal() {
  document.getElementById("history-modal").style.display = "none";
}
firebase.firestore.FieldValue.serverTimestamp()