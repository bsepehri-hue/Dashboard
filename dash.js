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