// ==========================
// JavaScript Connection Test
// ==========================

console.log("Portfolio website JavaScript is working!");


// ==========================
// Get Hire Me Button
// ==========================

let hireButton = document.getElementById("hire-btn");

console.log(hireButton);


// ==========================
// Hire Me Button Click
// ==========================

hireButton.addEventListener("click", function() {

    let contactSection = document.getElementById("contact");

    contactSection.scrollIntoView();

});


// ==========================
// Get Email Button
// ==========================

let emailButton = document.getElementById("email-btn");


// ==========================
// Email Button Click
// ==========================

emailButton.addEventListener("click", function() {

    window.location.href = "mailto:koushikpamulapati123@gmail.com";

});


// ==========================
// Get Resume Button
// ==========================

let resumeButton = document.getElementById("resume-btn");


// ==========================
// Resume Button Click
// ==========================

resumeButton.addEventListener("click", function() {

    let resumeLink = document.createElement("a");

    resumeLink.href = "/static/assets/resume.pdf";

    resumeLink.download = "Koushik_Reddy_Resume.pdf";

    resumeLink.click();

});


// ==========================
// Get Contact Form
// ==========================

let contactForm = document.getElementById("contact-form");


// ==========================
// Contact Form Submit
// ==========================

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();

    let email = document.getElementById("email").value.trim();

    let message = document.getElementById("message").value.trim();


    // ==========================
    // Check Name
    // ==========================

    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    // ==========================
    // Check Email
    // ==========================

    if (email === "") {

        alert("Please enter your email.");

        return;

    }

    if (!email.includes("@") || !email.includes(".")) {

    alert("Please enter a valid email address.");

    return;

}


    // ==========================
    // Check Message
    // ==========================

    if (message === "") {

        alert("Please enter your message.");

        return;

    }


    // ==========================
    // Form Successfully Filled
    // ==========================

let response = await fetch("/api/contact", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        name: name,
        email: email,
        message: message
    })

});

let result = await response.json();

alert(result.message);
contactForm.reset();
});