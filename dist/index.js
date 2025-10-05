"use strict";
/**
 * Odešle e-mail pomocí mailto odkazu.
 * @param to - E-mailová adresa příjemce.
 * @param subject - Předmět e-mailu.
 * @param body - Text e-mailu.
 */
const TO_URL = "http://localhost:4000"; // <-- updated to use env variable
function sendEmail(to, subject, body) {
    const TO_URL = window.TO_URL || "http://localhost:4000";
    fetch(`${TO_URL}/send-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to_email: to,
            from_email: "from_email",
            subject: subject,
            message: body,
        }),
    })
        .then((response) => response.json())
        .then((result) => {
        if (result.success) {
            alert("E-mail byl odeslán.");
        }
        else {
            alert("Chyba při odesílání e-mailu: " + (result.error || "Neznámá chyba."));
        }
    })
        .catch((error) => {
        alert("Chyba při odesílání e-mailu: " + error.message);
    });
}
// Map of politician names to emails
const politicianEmails = {
    "Ondřej Lukeš": "ondralukes06@seznam.cz",
    "Nikola Bartůšek": "nikola.bartusek@europarl.europa.eu",
    "Jaroslav Bžoch": "jaroslav.bzoch@europarl.euro",
    "Ivan David": "ivan.david@europarl.europa.eu",
    "Klára Dostálová": "klara.dostalova@europarl.europa.eu",
    "Ondřej Dostál": "ondrej.dostal@europarl.europa.eu",
    "Jan Farský": "jan.farsky@europarl.europa.eu",
    "Markéta Gregorová": "marketa.gregorova@europarl.europa.eu",
    "Jaroslav Knot": "ondrej.knotek@europarl.europa.eu",
    "Kateřina Konečná": "katerina.konecna@europarl.europa.eu",
    "Ondřej Knotek": "ondrej.knotek@europarl.europa.eu",
    "Ondřej Kolář": "ondrej.kolar@europarl.europa.eu",
    "Ondřej Krutílek": "ondrej.krutilek@europarl.europa.eu",
    "Tomáš Kubín": "tomas.kubin@europarl.europa.eu",
    "Jana Nagyová": "jana.nagyova@europarl.europa.eu",
    "Danuše Nerudová": "danuse.nerudova@europarl.europa.eu",
    "Luděk Niedermayer": "ludek.niedermayer@europarl.europa.eu",
    "Jaroslava Pokorná Jermanová": "jaroslava.pokornajermanova@europarl.europa.eu",
    "Filip Turek": "filip.turek@europarl.europa.eu",
    "Alexandr Vondra": "alexandr.vondra@europarl.europa.eu",
    "Veronika Vrecionová": "veronika.vrecionova@europarl.europa.eu",
    "Tomáš Zdechovský": "tomas.zdechovsky@europarl.europa.eu",
};
// Load politician names into the select box and add event listener for send button
document.addEventListener("DOMContentLoaded", () => {
    // fetch email contents
    console.log("fetching-email");
    fetch(`${TO_URL}/email-template`)
        .then((response) => response.text())
        .then((text) => {
        const bodyInput = document.getElementById("email-body");
        console.log("fetched-email", text);
        if (bodyInput) {
            bodyInput.value = text;
        }
    });
    const select = document.getElementById("politician");
    const selectedPoliticianSpan = document.getElementById("selected-politician-email");
    if (select) {
        // Remove existing options except the first (placeholder)
        while (select.options.length > 1) {
            select.remove(1);
        }
        Object.keys(politicianEmails).forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        // Show selected politician name in the span
        select.addEventListener("change", function () {
            if (selectedPoliticianSpan) {
                const email = politicianEmails[select.value] || "";
                selectedPoliticianSpan.textContent = email;
            }
        });
    }
    const sendButton = document.getElementById("send-button");
    if (sendButton) {
        sendButton.addEventListener("click", (e) => {
            var _a, _b, _c;
            e.preventDefault();
            const select = document.getElementById("politician");
            const subjectInput = document.getElementById("subject");
            const bodyInput = document.getElementById("body");
            const selectedName = (_a = select === null || select === void 0 ? void 0 : select.value) !== null && _a !== void 0 ? _a : "";
            const subject = (_b = subjectInput === null || subjectInput === void 0 ? void 0 : subjectInput.value) !== null && _b !== void 0 ? _b : "";
            const body = (_c = bodyInput === null || bodyInput === void 0 ? void 0 : bodyInput.value) !== null && _c !== void 0 ? _c : "";
            const email = politicianEmails[selectedName];
            if (email) {
                sendEmail(email, subject, body);
            }
            else {
                alert("Vyberte prosím politika.");
            }
        });
    }
});

const emailSpan = document.getElementById("selected-politician-email");
select.addEventListener("change", function () {
    const email = politicianEmails[select.value] || "";
    if (emailSpan) {
        emailSpan.textContent = email;
        emailSpan.style.display = email ? "inline-block" : "none";
    }
});
// // Event listener for form submission
// document.addEventListener('DOMContentLoaded', function() {
//     const sendButton = document.getElementById('send-button');
//     if (sendButton) {
//         sendButton.addEventListener('click', function(e) {
//             e.preventDefault();
//             const select = document.getElementById('politician');
//             const subject = document.getElementById('subject').value;
//             const body = document.getElementById('body').value;
//             const selectedId = select.value;
//             const email = politicianEmails[selectedId];
//             if (email) {
//                 sendEmail(email, subject, body);
//             } else {
//                 alert('Vyberte prosím politika.');
//             }
//         });
//     }
// });
