document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       MOBILE NAVIGATION
    ====================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }


    /* =====================================
       CURRENT YEAR
    ====================================== */

    const yearElements = document.querySelectorAll("#currentYear");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================
       HOME PAGE IMAGE SLIDER
    ====================================== */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    const nextButton = document.getElementById("nextSlide");
    const previousButton = document.getElementById("previousSlide");

    let currentSlide = 0;
    let sliderTimer;


    function showSlide(index) {

        if (slides.length === 0) {
            return;
        }

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }


        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }


    function startSlider() {

        if (slides.length > 1) {

            sliderTimer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 5000);

        }
    }


    function restartSlider() {

        clearInterval(sliderTimer);
        startSlider();

    }


    if (nextButton) {

        nextButton.addEventListener("click", function () {

            showSlide(currentSlide + 1);
            restartSlider();

        });

    }


    if (previousButton) {

        previousButton.addEventListener("click", function () {

            showSlide(currentSlide - 1);
            restartSlider();

        });

    }


    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const index = Number(dot.dataset.slide);

            showSlide(index);
            restartSlider();

        });

    });


    startSlider();


    /* =====================================
       SCROLL ANIMATION
    ====================================== */

    const revealItems = document.querySelectorAll(".reveal");


    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealItems.forEach(function (item) {

        observer.observe(item);

    });


    /* =====================================
       TRIP COST CALCULATOR
    ====================================== */

    const calculator = document.getElementById("tripCalculator");


    const destinationRates = {

        Bali: 170,
        Paris: 260,
        Maldives: 320,
        Japan: 240,
        Sydney: 210

    };


    const styleMultipliers = {

        Budget: 0.8,
        Standard: 1,
        Luxury: 1.6

    };


    const baseTransport = {

        Bali: 500,
        Paris: 1000,
        Maldives: 850,
        Japan: 900,
        Sydney: 350

    };


    if (calculator) {

        calculator.addEventListener("submit", function (event) {

            event.preventDefault();


            const destination =
                document.getElementById("destination").value;

            const travellers =
                Number(document.getElementById("travellers").value);

            const days =
                Number(document.getElementById("days").value);

            const travelStyle =
                document.getElementById("travelStyle").value;


            if (
                destination === "" ||
                travelStyle === "" ||
                travellers < 1 ||
                days < 1
            ) {

                alert("Please complete all trip details correctly.");

                return;
            }


            const dailyRate = destinationRates[destination];

            const multiplier = styleMultipliers[travelStyle];

            const transportCost =
                baseTransport[destination] * travellers;


            const dailyTripCost =
                dailyRate *
                travellers *
                days;


            const totalCost =
                Math.round(
                    (dailyTripCost * multiplier) +
                    transportCost
                );


            document.getElementById("estimatedPrice")
                .textContent =
                "$" + totalCost.toLocaleString();


            document.getElementById("estimateMessage")
                .textContent =
                `Estimated cost for ${travellers} traveller${travellers > 1 ? "s" : ""}
                to ${destination} for ${days} day${days > 1 ? "s" : ""}:
                $${totalCost.toLocaleString()} – ${travelStyle} Travel Package.`;


            document.getElementById("resultDestination")
                .textContent = destination;

            document.getElementById("resultTravellers")
                .textContent = travellers;

            document.getElementById("resultDays")
                .textContent =
                days + (days === 1 ? " day" : " days");

            document.getElementById("resultStyle")
                .textContent = travelStyle;

        });

    }


    /* =====================================
       APPOINTMENT FORM VALIDATION
    ====================================== */

    const appointmentForm =
        document.getElementById("appointmentForm");


    if (appointmentForm) {

        const dateField =
            document.getElementById("appointmentDate");


        const today = new Date();

        const minimumDate =
            today.toISOString().split("T")[0];

        dateField.min = minimumDate;


        appointmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("appointmentName")
                    .value.trim();

                const email =
                    document.getElementById("appointmentEmail")
                    .value.trim();

                const phone =
                    document.getElementById("appointmentPhone")
                    .value.trim();

                const date =
                    document.getElementById("appointmentDate")
                    .value;

                const status =
                    document.getElementById("appointmentStatus");


                if (name.length < 2) {

                    showFormMessage(
                        status,
                        "Please enter a valid name.",
                        false
                    );

                    return;
                }


                if (!validateEmail(email)) {

                    showFormMessage(
                        status,
                        "Please enter a valid email address.",
                        false
                    );

                    return;
                }


                if (phone.length < 8) {

                    showFormMessage(
                        status,
                        "Please enter a valid phone number.",
                        false
                    );

                    return;
                }


                if (!date) {

                    showFormMessage(
                        status,
                        "Please select your preferred appointment date.",
                        false
                    );

                    return;
                }


                showFormMessage(
                    status,
                    "Thank you! Your appointment request has been submitted.",
                    true
                );


                appointmentForm.reset();

            }
        );

    }


    /* =====================================
       CONTACT FORM
    ====================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("contactName")
                    .value.trim();

                const email =
                    document.getElementById("contactEmail")
                    .value.trim();

                const subject =
                    document.getElementById("contactSubject")
                    .value.trim();

                const message =
                    document.getElementById("contactMessage")
                    .value.trim();

                const status =
                    document.getElementById("contactStatus");


                if (name.length < 2) {

                    showFormMessage(
                        status,
                        "Please enter your full name.",
                        false
                    );

                    return;
                }


                if (!validateEmail(email)) {

                    showFormMessage(
                        status,
                        "Please enter a valid email address.",
                        false
                    );

                    return;
                }


                if (subject.length < 3) {

                    showFormMessage(
                        status,
                        "Please enter a subject.",
                        false
                    );

                    return;
                }


                if (message.length < 10) {

                    showFormMessage(
                        status,
                        "Your message must contain at least 10 characters.",
                        false
                    );

                    return;
                }


                /*
                Opens the user's default email application.
                Replace the destination email with the real
                WanderLux business email if required.
                */

                const mailtoLink =
                    `mailto:hello@wanderlux.com.au?subject=${encodeURIComponent(subject)}
                    &body=${encodeURIComponent(
                    "Name: " + name +
                    "\nEmail: " + email +
                    "\n\n" + message
                    )}`;


                window.location.href = mailtoLink;


                showFormMessage(
                    status,
                    "Your email application is opening.",
                    true
                );

            }
        );

    }


    /* =====================================
       REUSABLE VALIDATION FUNCTIONS
    ====================================== */

    function validateEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    function showFormMessage(
        element,
        message,
        success
    ) {

        element.textContent = message;

        element.className =
            success
                ? "form-status success"
                : "form-status error";

    }

});