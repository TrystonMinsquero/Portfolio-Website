emailjs.init("user_EmFO3M1Ku7DNPpEATz0kU");

function sendMail() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const successOutput = document.getElementById("success");

    const params = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    }

    emailjs.send('portfolio-website', 'portfolio-website', params)
    .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    successOutput.appendChild(document.createElement("p").appendChild(document.createTextNode("Your message was sent!")));
    successOutput.appendChild(document.createElement("br"));
    successOutput.appendChild(document.createElement("p").appendChild(document.createTextNode("Thank you for reaching out, I will respond as soon as I can.")));

    }, function(error) {
    console.log('FAILED...', error);
    successOutput.appendChild(document.createElement("p").appendChild(document.createTextNode("Sorry there was a issue sending your message.")));
    successOutput.appendChild(document.createElement("br"));
    successOutput.appendChild(document.createElement("p").appendChild(document.createTextNode("Please directly contact me at trystonminsquero@gmail.com,")));
    successOutput.appendChild(document.createElement("br"));
    successOutput.appendChild(document.createElement("p").appendChild(document.createTextNode("thank you for your patience.")));
    });

    document.getElementById("submit").remove();
}


