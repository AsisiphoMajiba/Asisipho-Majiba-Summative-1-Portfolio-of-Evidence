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
// ==========================================
// 1. DYNAMICALLY LOAD & INITIALIZE EMAILJS SDK
// ==========================================
(function () {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    document.head.appendChild(script);

    script.onload = function () {
        // Initialized natively using your real account key token
        emailjs.init("Epry5xKZBpmYVv5Z_");
    };
})();

// ==========================================
// 2. MAIN APPLICATION LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------
    // TOAST NOTIFICATION HELPER FUNCTION
    // ------------------------------------------
    const showToast = (message, type = "success") => {
        // Create toast container element dynamically
        const toast = document.createElement("div");
        toast.className = `custom-toast ${type}`;
        toast.textContent = message;

        // Apply visual toast styling
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.backgroundColor =
            type === "success" ? "#2ecc71" : "#e74c3c"; // Green for success, Red for error
        toast.style.color = "#ffffff";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
        toast.style.fontFamily = "sans-serif";
        toast.style.fontSize = "0.95rem";
        toast.style.fontWeight = "600";
        toast.style.zIndex = "3000";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";

        document.body.appendChild(toast);

        // Trigger presentation fade-in animation
        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        }, 10);

        // Gracefully remove toast after 4 seconds
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
            setTimeout(() => toast.remove(), 1000);
        }, 1000);
    };

    // ------------------------------------------
    // A. CONTACT FORM VALIDATION & EMAILJS DELIVERY
    // ------------------------------------------
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Stop page from refreshing

            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const messageField = document.getElementById("message");
            const submitBtn = contactForm.querySelector(".submit-btn");

            const nameValue = nameField.value.trim();
            const emailValue = emailField.value.trim();
            const messageValue = messageField.value.trim();

            // Clear any lingering error messages
            document
                .querySelectorAll(".inline-error-msg")
                .forEach((msg) => msg.remove());

            let hasErrors = false;

            // Error display helper
            const showError = (field, message) => {
                hasErrors = true;
                const errorElement = document.createElement("span");
                errorElement.className = "inline-error-msg";
                errorElement.textContent = message;
                errorElement.style.color = "#e74c3c";
                errorElement.style.fontSize = "0.8rem";
                errorElement.style.display = "block";
                errorElement.style.marginTop = "5px";
                errorElement.style.textAlign = "left";
                field.parentNode.appendChild(errorElement);
            };

            // Run validation rules
            if (nameValue === "") showError(nameField, "Name is required.");

            if (emailValue === "") {
                showError(emailField, "Email address is required.");
            } else {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(emailValue)) {
                    showError(
                        emailField,
                        "Please provide a valid email format."
                    );
                }
            }

            if (messageValue === "")
                showError(messageField, "Message cannot be left empty.");

            // Halt if form has errors
            if (hasErrors) {
                if (nameValue === "") nameField.focus();
                else if (emailValue === "") emailField.focus();
                else messageField.focus();
                return;
            }

            // Update button text to give user immediate feedback
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            // Create a local timestamp string for your template's {{time}}
            const currentTimestamp = new Date().toLocaleString();

            // Map values exactly to your EmailJS template parameters
            const templateParams = {
                name: nameValue,
                email: emailValue,
                time: currentTimestamp,
                message: messageValue
            };

            // Dispatched using your exact service ID and template ID variables
            emailjs
                .send("service_abc123xyz", "template_ce17aqp", templateParams)
                .then(
                    () => {
                        submitBtn.textContent = "Send Message";
                        submitBtn.disabled = false;

                        // 🌟 SUCCESS TOAST (Replaces old alert popup) 🌟
                        showToast(
                            `Thank you, ${nameValue}! Message sent successfully.`,
                            "success"
                        );
                        contactForm.reset();
                    },
                    (error) => {
                        submitBtn.textContent = "Send Message";
                        submitBtn.disabled = false;

                        // 🌟 ERROR TOAST (Replaces old alert popup) 🌟
                        showToast(
                            "Failed to send message. Please check connection and try again.",
                            "error"
                        );
                        console.error("EmailJS Error: ", error);
                    }
                );
        });
    }

    // ------------------------------------------
    // B. HOME PAGE: CARD POPUPS WITH LINKED IMAGES
    // ------------------------------------------
    const homeCards = document.querySelectorAll(".home-card");

    if (homeCards.length > 0) {
        const imageMapping = {
            Skincare: "./Images/Facila scrub.jpg",
            "Hair Installation": "./Images/Basic Installation.jpg",
            "Other Services": "./Images/Short French nails.jpg"
        };

        homeCards.forEach((card) => {
            card.style.cursor = "pointer";
            card.addEventListener("click", () => {
                const serviceTitle = card.querySelector("h3").innerText.trim();
                const serviceDescription = card
                    .querySelector("p")
                    .innerText.trim();
                const imageSrc =
                    imageMapping[serviceTitle] || "./Images/Business logo.png";

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

                document.body.appendChild(modalOverlay);
                modalOverlay.style.display = "flex";

                const closeModal = () => modalOverlay.remove();
                modalOverlay
                    .querySelector(".home-modal-close")
                    .addEventListener("click", closeModal);
                modalOverlay.addEventListener("click", (e) => {
                    if (e.target === modalOverlay) closeModal();
                });
            });
        });
    }

    // ------------------------------------------
    // C. SERVICES PAGE: CATALOGUE LIGHTBOX MODAL
    // ------------------------------------------
    const serviceImages = document.querySelectorAll(".service-card img");
    const catalogModal = document.getElementById("image-modal");
    const catalogModalImg = document.getElementById("popup-img");
    const catalogCloseBtn = document.querySelector(".close-btn");

    if (serviceImages.length > 0 && catalogModal) {
        serviceImages.forEach((image) => {
            image.style.cursor = "pointer";
            image.addEventListener("click", () => {
                catalogModal.style.display = "block";
                catalogModalImg.src = image.src;
                catalogModalImg.alt = image.alt;
            });
        });

        if (catalogCloseBtn) {
            catalogCloseBtn.addEventListener("click", () => {
                catalogModal.style.display = "none";
            });
        }
        catalogModal.addEventListener("click", (e) => {
            if (e.target === catalogModal) catalogModal.style.display = "none";
        });
    }
});
