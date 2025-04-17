// ✅ Menu Toggle Function (Fixes "toggleMenu is not defined")
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

// ✅ Contact Form Submission (Sends Email Without Redirecting)
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!");

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload

            const formData = new FormData(contactForm);

            fetch("/send-email", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("confirmationMessage").style.display = "block";
                    contactForm.reset(); // Clear the form
                } else {
                    alert("Error sending message. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong.");
            });
        });
    }
});
