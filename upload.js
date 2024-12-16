document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You need to be logged in to upload an article.");
        window.location.href = "login.html";  // Redirect to login if not logged in
    }

    const stepsContainer = document.getElementById("stepsContainer");
    const addStepBtn = document.getElementById("addStepBtn");

    // Add more steps dynamically
    addStepBtn.addEventListener("click", () => {
        const stepDiv = document.createElement("div");
        stepDiv.classList.add("step");
        stepDiv.innerHTML = `
            <input type="text" name="stepText" placeholder="Step text" required />
            <input type="file" name="stepImage" />
        `;
        stepsContainer.appendChild(stepDiv);
    });

    document.getElementById("uploadForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData();
        const title = document.getElementById("title").value;
        formData.append("title", title);

        // Collect all steps and images
        const steps = [];
        document.querySelectorAll(".step").forEach((stepDiv, index) => {
            const stepText = stepDiv.querySelector('input[name="stepText"]').value;
            const stepImage = stepDiv.querySelector('input[name="stepImage"]').files[0];
            steps.push({ text: stepText });

            if (stepImage) {
                formData.append(`images`, stepImage);  // Append images separately
            }
        });

        formData.append("steps", JSON.stringify(steps));

        const response = await fetch("https://it-back.onrender.com/addpost", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },  // Add the token for authentication
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            alert("Article uploaded successfully!");
            window.location.href = "index.html";  // Redirect to homepage after success
        } else {
            alert(data.message);  // Show error message
        }
    });
});
