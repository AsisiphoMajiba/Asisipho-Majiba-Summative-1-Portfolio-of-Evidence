document.addEventListener("DOMContentLoaded", () => {
    // 1. Map the text inside your <h3> headings to your existing image files
    const imageMapping = {
        "Skincare": "./Images/Facila scrub.jpg",
        "Hair Installation": "./Images/Basic Installation.jpg",
        "Other Services": "./Images/Short French nails.jpg" // Links to your nail service image
    };

    // 2. Select all the home cards
    const homeCards = document.querySelectorAll(".home-card");

    homeCards.forEach(card => {
        // Style cursor to let the user know it is interactive
        card.style.cursor = "pointer";

        card.addEventListener("click", () => {
            const serviceTitle = card.querySelector("h3").innerText.trim();
            const serviceDescription = card.querySelector("p").innerText.trim();
            const imageSrc = imageMapping[serviceTitle] || "./Images/Business logo.png";

            // 3. Create the Modal elements dynamically
            const modalOverlay = document.createElement("div");
            modalOverlay.className = "home-modal-overlay";

            modalOverlay.innerHTML = `
                <div class="home-modal-content">
                    <span class="home-modal-close">&times;</span>
                    <h3>${serviceTitle}</h3>
                    <img src="${imageSrc}" alt="${serviceTitle}" class="home-modal-img">
                    <p>${serviceDescription}</p>
                    <a href="enquiry.html" class="home-modal-btn">Book This Service</a>
                </div>
            `;

            // Append modal to body
            document.body.appendChild(modalOverlay);
            modalOverlay.style.display = "flex";

            // 4. Close functions
            const closeBtn = modalOverlay.querySelector(".home-modal-close");
            
            const closeModal = () => {
                modalOverlay.remove();
            };

            closeBtn.addEventListener("click", closeModal);
            
            // Close when clicking outside the modal content box
            modalOverlay.addEventListener("click", (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
        });
    });
});
// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Select all images inside the service cards
    const serviceImages = document.querySelectorAll(".service-card img");

    serviceImages.forEach(image => {
        // Change cursor to a pointer to show it's clickable
        image.style.cursor = "pointer";

    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Grab the elements from the DOM
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("popup-img");
    const closeBtn = document.querySelector(".close-btn");
    const serviceImages = document.querySelectorAll(".service-card img");

    // Loop through all images and attach click event listener
    serviceImages.forEach(image => {
        image.addEventListener("click", () => {
            modal.style.display = "block"; // Show the modal overlay
            modalImg.src = image.src;      // Set the popup source to matching image
            modalImg.alt = image.alt;      // Set matching alt text
        });
    });

    // Close the popup when clicking the (X) button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the popup dynamically if the user clicks anywhere outside the image
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".form-container form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            // Get your existing form elements
            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const messageField = document.getElementById("message");

            const nameValue = nameField.value.trim();
            const emailValue = emailField.value.trim();
            const messageValue = messageField.value.trim();

            // Clear out any previous error messages before validating again
            document
                .querySelectorAll(".inline-error-msg")
                .forEach((msg) => msg.remove());

            // Track if the form has any errors
            let hasErrors = false;

            // Helper function to insert error messages directly under the target field's element wrapper
            const showError = (field, message) => {
                hasErrors = true;

                // Create error message element
                const errorElement = document.createElement("span");
                errorElement.className = "inline-error-msg";
                errorElement.textContent = message;

                // Set style variables cleanly directly via JS
                errorElement.style.color = "#e74c3c";
                errorElement.style.fontSize = "0.8rem";
                errorElement.style.display = "block";
                errorElement.style.marginTop = "5px";
                errorElement.style.textAlign = "left";

                // Append it directly under the input field container
                field.parentNode.appendChild(errorElement);
            };

            // 1. Check Name field
            if (nameValue === "") {
                showError(nameField, "Name is required.");
            }

            // 2. Check Email field
            if (emailValue === "") {
                showError(emailField, "Email address is required.");
            } else {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(emailValue)) {
                    showError(
                        emailField,
                        "Please provide a valid email structure (e.g., name@example.com)."
                    );
                }
            }

            // 3. Check Message field
            if (messageValue === "") {
                showError(messageField, "Message cannot be left empty.");
            }

            // --- Evaluation Strategy ---
            if (hasErrors) {
                // Halt form submission if any of the rules failed
                event.preventDefault();

                // Gracefully focus the first invalid field
                if (nameValue === "") {
                    nameField.focus();
                } else if (
                    emailValue === "" ||
                    !emailPattern.test(emailValue)
                ) {
                    emailField.focus();
                } else {
                    messageField.focus();
                }
            }
            // If hasErrors remains false, the form passes validation natively and submits!
        });
    }
});
