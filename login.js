document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://it-back.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, password: password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.accessToken);  // Store the token
        window.location.href = "upload.html";  // Redirect to upload page
    } else {
        alert(data.message);  // Show error message
    }
});
