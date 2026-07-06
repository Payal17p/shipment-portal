const API = window.location.origin + "/api/shipments";

// ================= Token =================
const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "/backend/frontend/login.html";
}

// ================= Create Shipment =================
async function createShipment() {

    const shipmentNo = document.getElementById("shipmentNo").value;
    const customerName = document.getElementById("customerName").value;
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const status = document.getElementById("status").value;

    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            shipmentNo,
            customerName,
            origin,
            destination,
            status
        })
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {

        document.getElementById("shipmentNo").value = "";
        document.getElementById("customerName").value = "";
        document.getElementById("origin").value = "";
        document.getElementById("destination").value = "";
        document.getElementById("status").value = "Pending";

        loadShipments();
    }
}

// ================= Load Shipments =================
async function loadShipments() {

    const response = await fetch(API, {
        headers: {
            "Authorization": token
        }
    });

    const shipments = await response.json();

    // ===== Summary Cards =====
    document.getElementById("totalCount").innerText = shipments.length;

    document.getElementById("pendingCount").innerText =
        shipments.filter(s => s.status === "Pending").length;

    document.getElementById("transitCount").innerText =
        shipments.filter(s => s.status === "In Transit").length;

    document.getElementById("deliveredCount").innerText =
        shipments.filter(s => s.status === "Delivered").length;

    // ===== Search =====
    const search = document.getElementById("search").value.toLowerCase();

    // ===== Status Filter =====
    const selectedStatus = document.getElementById("filterStatus").value;

    // ===== Search + Status Filter =====
    const filteredShipments = shipments.filter((shipment) => {

        const matchSearch =
            shipment.shipmentNo.toLowerCase().includes(search) ||
            shipment.customerName.toLowerCase().includes(search);

        const matchStatus =
            selectedStatus === "All" ||
            shipment.status === selectedStatus;

        return matchSearch && matchStatus;

    });

    const table = document.getElementById("shipmentTable");

    table.innerHTML = "";

    filteredShipments.forEach((shipment) => {

        table.innerHTML += `
        <tr>
            <td>${shipment.shipmentNo}</td>
            <td>${shipment.customerName}</td>
            <td>${shipment.origin}</td>
            <td>${shipment.destination}</td>
            <td>${shipment.status}</td>
            <td>
                <button onclick="editShipment('${shipment._id}')">Edit</button>
                <button onclick="deleteShipment('${shipment._id}')">Delete</button>
            </td>
        </tr>
        `;

    });

}

// ================= Edit Shipment =================
async function editShipment(id) {

    const shipmentNo = prompt("Enter Shipment Number");
    if (shipmentNo === null) return;

    const customerName = prompt("Enter Customer Name");
    if (customerName === null) return;

    const origin = prompt("Enter Origin");
    if (origin === null) return;

    const destination = prompt("Enter Destination");
    if (destination === null) return;

    const status = prompt("Enter Status (Pending / In Transit / Delivered)");
    if (status === null) return;

    const response = await fetch(API + "/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },

        body: JSON.stringify({
            shipmentNo,
            customerName,
            origin,
            destination,
            status
        })

    });

    const data = await response.json();

    alert(data.message);

    loadShipments();

}

// ================= Delete Shipment =================
async function deleteShipment(id) {

    if (!confirm("Delete this shipment?")) return;

    const response = await fetch(API + "/" + id, {

        method: "DELETE",

        headers: {
            "Authorization": token
        }

    });

    const data = await response.json();

    alert(data.message);

    loadShipments();

}

// ================= Logout =================
function logout() {

    localStorage.removeItem("token");

    window.location.href = "/backend/frontend/login.html";

}

// ================= Auto Load =================
loadShipments();