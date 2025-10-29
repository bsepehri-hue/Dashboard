ylet currentEditID = null;

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

const listingFeed = document.getElementById("listing-feed");
const currentUID = firebase.auth().currentUser.uid;

firebase.firestore().collection("listings")
  .where("owner", "==", currentUID)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "listing-card";

      card.innerHTML = `
        <h3 class="listing-title">${data.title}</h3>
        <p class="listing-price">$${data.price}</p>
        <p class="listing-description">${data.description}</p>
        <p class="listing-condition">Condition: ${data.condition}</p>
        <p class="listing-shipping">Shipping: ${data.shipping}</p>
        <div class="listing-controls">
          <button class="edit-btn" onclick="openEditModal('${doc.id}')">Edit</button>
          <button class="remove-btn" onclick="confirmRemove('${doc.id}')">Remove</button>
          <button class="history-btn" onclick="openHistoryModal('${doc.id}')">History</button>
        </div>
      `;

      listingFeed.appendChild(card);
    });
  

steward = {
  uid: "abc123",
  vaultieAccess: true,
  inaccurateCount: 2,
  lastReset: "2025-10-01"
}

listing = {
  owner: "abc123",
  isAccurate: true,
  flaggedByAdmin: false,
  flaggedAt: "2025-10-28"
}

firebase.firestore().collection("stewards").doc(uid).get()

function checkVaultieBlock(uid) {
  const stewardRef = firebase.firestore().collection("stewards").doc(uid);

  stewardRef.get().then(doc => {
    const data = doc.data();
    const now = new Date();
    const quarterStart = new Date(data.lastReset);

    // If we're in a new quarter, reset count
    if (now - quarterStart > 90 * 24 * 60 * 60 * 1000) {
      stewardRef.update({
        inaccurateCount: 1,
        lastReset: now.toISOString(),
        vaultieAccess: true
      });
    } else {
      const newCount = data.inaccurateCount + 1;
      const block = newCount >= 3;

      stewardRef.update({
        inaccurateCount: newCount,
        vaultieAccess: !block
      
  });
}

if (steward.vaultieAccess) {
  showVaulties();
} else {
  hideVaulties();
  showTrustWarning(); // Optional: “Vaulties are blocked due to listing accuracy.”
}
listing = {
  title: "Vintage Lamp",
  owner: "abc123",
  isAccurate: true,
  flaggedByAdmin: false,
  flaggedAt: null
}

function flagListing(listingID, ownerUID) {
  const listingRef = firebase.firestore().collection("listings").doc(listingID);
  const stewardRef = firebase.firestore().collection("stewards").doc(ownerUID);

  // Step 1: Flag the listing
  listingRef.update({
    flaggedByAdmin: true,
    isAccurate: false,
    flaggedAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    // Step 2: Update steward's inaccurate count
    stewardRef.get().then(doc => {
      const data = doc.data();
      const now = new Date();
      const lastReset = new Date(data.lastReset);
      const newQuarter = now - lastReset > 90 * 24 * 60 * 60 * 1000;

      let newCount = newQuarter ? 1 : (data.inaccurateCount || 0) + 1;
      let vaultieAccess = newCount < 3;

      stewardRef.update({
        inaccurateCount: newCount,
        lastReset: newQuarter ? now.toISOString() : data.lastReset,
        vaultieAccess: vaultieAccess
      });

listing = {
  title: "Vintage Lamp",
  owner: "abc123",
  echo: "Warm glow, brass base",
  createdAt: "2025-10-28T02:42:00Z",
  constellationGlyph: "🜁" // example glyph
}

function showBlessingScroll(listingID) {
  firebase.firestore().collection("listings").doc(listingID).get().then(doc => {
    const data = doc.data();
    document.getElementById("scroll-owner").textContent = data.owner;
    document.getElementById("scroll-echo").textContent = data.echo;
    document.getElementById("scroll-time").textContent = new Date(data.createdAt.toDate()).toLocaleString();
    document.getElementById("scroll-glyph").textContent = data.constellationGlyph;
    document.getElementById("blessing-scroll").style.display = "block";
  });

steward = {
  uid: "abc123",
  referredBy: "xyz789", // UID of referring steward
  referralEcho: 0.02 // 2% echo
}

listing = {
  owner: "abc123",
  price: 100,
  referralEchoPaid: false
}

function handleReferralEcho(listingID) {
  const listingRef = firebase.firestore().collection("listings").doc(listingID);

  listingRef.get().then(doc => {
    const listing = doc.data();
    if (listing.referralEchoPaid || !listing.owner) return;

    const stewardRef = firebase.firestore().collection("stewards").doc(listing.owner);
    stewardRef.get().then(stewardDoc => {
      const steward = stewardDoc.data();
      if (!steward.referredBy) return;

      const referrerRef = firebase.firestore().collection("stewards").doc(steward.referredBy);
      const echoAmount = listing.price * 0.02;

      // Pay echo to referrer
      referrerRef.update({
        referralEchoTotal: firebase.firestore.FieldValue.increment(echoAmount)
      });

      // Mark listing as echo-paid
      listingRef.update({
        referralEchoPaid: true
      });
    function selectGlyph(glyph) {
  const uid = firebase.auth().currentUser.uid;
  firebase.firestore().collection("stewards").doc(uid).update({
    constellationGlyph: glyph
  }).then(() => {
    alert("Glyph selected: " + glyph);
    closeGlyphSelector();
  });
}

function closeGlyphSelector() {
  document.getElementById("glyph-selector").style.display = "none";
}
steward = {
  uid: "abc123",
  referralCount: 4,
  inaccurateCount: 0,
  glyphTier: "Constellant",
  constellationGlyph: "☉"
}
function assignGlyphTier(uid) {
  const stewardRef = firebase.firestore().collection("stewards").doc(uid);

  stewardRef.get().then(doc => {
    const data = doc.data();
    const referrals = data.referralCount || 0;
    const inaccuracies = data.inaccurateCount || 0;
    const accuracy = 1 - (inaccuracies / Math.max(data.totalListings || 1, 1));

    let tier = "Initiate";
    let glyph = "🜁";

    if (referrals >= 10 && inaccuracies === 0) {
      tier = "Mythkeeper"; glyph = "🜂";
    } else if (referrals >= 6 && accuracy >= 0.9) {
      tier = "Luminary"; glyph = "☽";
    } else if (referrals >= 3 && accuracy >= 0.95) {
      tier = "Constellant"; glyph = "☉";
    } else if (referrals >= 1 && accuracy === 1) {
      tier = "Echoer"; glyph = "✦";
    }

    stewardRef.update({
      glyphTier: tier,
      constellationGlyph: glyph
    });
  
blessing = {
  listingID: "abc123",
  stewardUID: "xyz789",
  echo: "Warm glow, brass base",
  timestamp: "2025-10-28T02:42:00Z",
  constellationGlyph: "☉",
  referralEcho: 2,
  printed: true
}
}

const blessingFeed = document.getElementById("blessing-feed");
const uid = firebase.auth().currentUser.uid;

firebase.firestore().collection("blessings")
  .where("stewardUID", "==", uid)
  .orderBy("timestamp", "desc")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "blessing-card";

      card.innerHTML = `
        <p><strong>Echo:</strong> ${data.echo}</p>
        <p><strong>Time:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        <p><strong>Glyph:</strong> ${data.constellationGlyph}</p>
        <p><strong>Referral Echo:</strong> $${data.referralEcho.toFixed(2)}</p>
        <p><strong>Printed:</strong> ${data.printed ? "✅" : "❌"}</p>
      `;

      blessingFeed.appendChild(card);
    });

quarterlyBlessing = {
  stewardUID: "abc123",
  quarter: "2025-Q4",
  listingsCreated: 12,
  referralCount: 4,
  referralEchoTotal: 38.00,
  printedScrolls: 9,
  glyphTier: "Constellant",
  constellationGlyph: "☉",
  accuracyRate: 0.97
}
  
const summaryFeed = document.getElementById("summary-feed");
const uid = firebase.auth().currentUser.uid;

firebase.firestore().collection("quarterlyBlessings")
  .where("stewardUID", "==", uid)
  .orderBy("quarter", "desc")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "summary-card";

      card.innerHTML = `
        <h3>${data.quarter}</h3>
        <p><strong>Listings:</strong> ${data.listingsCreated}</p>
        <p><strong>Referrals:</strong> ${data.referralCount}</p>
        <p><strong>Echo Earned:</strong> $${data.referralEchoTotal.toFixed(2)}</p>
        <p><strong>Scrolls Printed:</strong> ${data.printedScrolls}</p>
        <p><strong>Glyph Tier:</strong> ${data.glyphTier} ${data.constellationGlyph}</p>
        <p><strong>Accuracy:</strong> ${(data.accuracyRate * 100).toFixed(1)}%</p>
      `;

      summaryFeed.appendChild(card);
    });
  
glyphHistory = {
  quarter: "2025-Q3",
  glyphTier: "Echoer",
  constellationGlyph: "✦",
  referralCount: 2,
  accuracyRate: 1.0
}
const glyphFeed = document.getElementById("glyph-feed");
const uid = firebase.auth().currentUser.uid;

firebase.firestore().collection("stewards").doc(uid)
  .collection("glyphHistory")
  .orderBy("quarter", "asc")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "glyph-card";

      card.innerHTML = `
        <h3>${data.quarter}</h3>
        <p><strong>Tier:</strong> ${data.glyphTier} ${data.constellationGlyph}</p>
        <p><strong>Referrals:</strong> ${data.referralCount}</p>
        <p><strong>Accuracy:</strong> ${(data.accuracyRate * 100).toFixed(1)}%</p>
      `;

      glyphFeed.appendChild(card);
    });
  });
const uid = "uid_ABC123"; // steward UID
const now = new Date();
const quarter = `Q${Math.floor((now.getMonth() + 3) / 3)}-${now.getFullYear()}`;

const accuracyRef = firebase.database().ref(`stewardAccuracy/${uid}/${quarter}`);

accuracyRef.transaction(current => {
  if (current === null) {
    return {
      inaccurateCount: 1,
      lastFlagged: now.toISOString()
    };
  } else {
    const newCount = current.inaccurateCount + 1;
    return {
      inaccurateCount: newCount,
      lastFlagged: now.toISOString()
    };

if (newCount >= 3) {
  firebase.database().ref(`stewards/${uid}/status`).set("deactivated");
}
if (newCount >= 3) {
  firebase.database().ref(`stewards/${uid}/status`).set("deactivated");
  // Optionally ripple a Pause Scroll or alert
}
function getGlyphClass(inaccurateCount) {
  if (inaccurateCount >= 3) return "glyph-echo-paused";
  if (inaccurateCount === 2) return "glyph-echo-warning";
  if (inaccurateCount === 1) return "glyph-echo-ripple";
  return "glyph-echo-clear";
{
  "steward": "Bo",
  "echo": "Vintage Oak Bench",
  "timestamp": "2025-10-29T16:20:00",
  "glyph": "🪵"
}
const echo = listing.title || "Unnamed Offering";
scrollHTML += `<p><strong>Echo:</strong> ${echo}</p>`;

});

if (!listing.title) echo = "A Whispered Offering";

if (listing.referral) {
  scrollHTML += `
    <div class="referral-shimmer">
      <p><strong>Referral Blessing:</strong> Offered via Willow’s invitation</p>
      <p><em>2% blessing shimmer will ripple to Willow upon sale</em></p>
    </div>
  `;
}

const stewardName = listing.stewardName || "Unnamed Steward";
scrollHTML += `<p><strong>Steward:</strong> ${stewardName}</p>`;

function printScroll(id) {
  const scroll = document.getElementById(`scroll-${id}`);
  const win = window.open('', '', 'width=800,height=600');
  win.document.write(scroll.outerHTML);
  win.print();
}

function downloadScroll(id) {
  const scroll = document.getElementById(`scroll-${id}`);
  html2pdf().from(scroll).save(`BlessingScroll-${id}.pdf`);
}