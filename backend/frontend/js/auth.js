const FRONTEND = window.location.origin;
const API = FRONTEND + "/api/auth";

// ================= Register =================
async function register() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(API + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            window.location.href = FRONTEND + "/login.html";
        }

    } catch (err) {
        alert(err.message);
    }

}

// ================= Login =================
async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(API + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            // Save JWT Token
            localStorage.setItem("token", data.token);

            alert(data.message);

            window.location.href = FRONTEND + "/dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        alert(err.message);

    }

}
