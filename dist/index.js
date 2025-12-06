"use strict";
const TO_URL = "http://localhost:4000"; // <-- updated to use env variable
/**
 * Odešle e-mail pomocí mailto odkazu.
 * @param to - E-mailová adresa příjemce.
 * @param subject - Předmět e-mailu.
 * @param body - Text e-mailu.
 */
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
// Group politicians by public office
const politiciansByOffice = {
    europoslanec: {
        "Nikola Bartůšek": "nikola.bartusek@europarl.europa.eu",
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
    },
    senator: {
    // add senators here
    },
    prezident: {
    // add presidents here
    },
    poslanec: {
    // add MPs here
    },
    other: {
        "Ondřej Lukeš": "ondralukes06@seznam.cz",
        "Jaroslav Bžoch": "jaroslav.bzoch@europarl.euro", // keep as-is or correct domain if known
    },
};
function getEmailByName(name) {
    for (const office of Object.keys(politiciansByOffice)) {
        const list = politiciansByOffice[office];
        if (Object.prototype.hasOwnProperty.call(list, name)) {
            return list[name];
        }
    }
    return undefined;
}
// helper to produce readable office label
function officeLabel(key) {
    switch (key) {
        case "europoslanec":
            return "Europoslanec";
        case "senator":
            return "Senátor";
        case "prezident":
            return "Prezident";
        case "poslanec":
            return "Poslanec";
        case "other":
            return "Ostatní";
        default:
            return key;
    }
}
// Helper to get typed entries without relying on newer lib defs (avoids Object.entries TS lib error)
function typedEntries(obj) {
    return Object.keys(obj).map((k) => [k, obj[k]]);
}
// Load politician names into the select box and add event listener for send button
document.addEventListener("DOMContentLoaded", () => {
    // fetch email contents
    const emailBody = document.getElementById("email-body");
    const select = document.getElementById("politician");
    const subjectInput = document.getElementById("subject");
    // console.log("fetching-email");
    // fetch email text from backend
    fetch(`${TO_URL}/email-template`)
        .then((response) => response.text())
        .then((text) => {
        if (emailBody) {
            emailBody.value = text;
        }
    });
    const selectedPoliticianSpan = document.getElementById("selected-politician-email");
    // Add values from politiciansByOffice to select as optgroups
    if (select) {
        // clear except placeholder
        while (select.options.length > 1)
            select.remove(1);
        // Iterate over the keys of politiciansByOffice to populate optgroups
        for (const officeKey of Object.keys(politiciansByOffice)) {
            const list = politiciansByOffice[officeKey];
            const names = Object.keys(list);
            if (names.length === 0)
                continue; // skip empty groups
            const optgroup = document.createElement("optgroup");
            optgroup.label = officeLabel(officeKey);
            names.forEach((name) => {
                const option = document.createElement("option");
                option.value = name;
                option.textContent = name;
                optgroup.appendChild(option);
            });
            select.appendChild(optgroup);
        }
        // adds event listener to update email display on selection change
        select.addEventListener("change", function () {
            const selectedName = select.value; // Get the selected politician's name
            const email = getEmailByName(selectedName) || ""; // Get the email using the name
            if (emailSpan) {
                emailSpan.textContent = email; // Set the email in the span
            }
            if (emailRow) {
                emailRow.style.display = email ? "flex" : "none"; // Show or hide the row based on email presence
            }
        });
    }
    const sendButton = document.getElementById("send-button");
    if (sendButton) {
        sendButton.addEventListener("click", (e) => {
            var _a, _b, _c;
            e.preventDefault();
            console.log("body input is:" + emailBody, emailBody === null || emailBody === void 0 ? void 0 : emailBody.value);
            const selectedName = (_a = select === null || select === void 0 ? void 0 : select.value) !== null && _a !== void 0 ? _a : "";
            const subject = (_b = subjectInput === null || subjectInput === void 0 ? void 0 : subjectInput.value) !== null && _b !== void 0 ? _b : "";
            const body = (_c = emailBody === null || emailBody === void 0 ? void 0 : emailBody.value) !== null && _c !== void 0 ? _c : "";
            const email = getEmailByName(selectedName); // <-- use getEmailByName
            // check if user really wants to send the email
            if (!confirm("Opravdu chcete odeslat tento e-mail?")) {
                return;
            }
            if (email) {
                sendEmail(email, subject, body);
            }
            else {
                alert("Vyberte prosím politika.");
            }
        });
    }
});
const emailRow = document.getElementById("selected-politician-row");
const emailSpan = document.getElementById("selected-politician-email");
const select = document.getElementById("politician");
document.addEventListener("DOMContentLoaded", () => {
    const copyButtons = document.querySelectorAll(".copy-btn");
    console.log("Found copy buttons:", copyButtons);
    copyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Find the parent of the button
            const parent = button.parentElement;
            console.log("Parent element:", parent);
            if (parent) {
                // Find the child with the class "copyable"
                const copyableChild = parent.querySelector(".copyable");
                console.log("Copyable child element:", copyableChild);
                if (copyableChild) {
                    let textToCopy = "";
                    // Check if the copyable child is an input or textarea
                    if (copyableChild instanceof HTMLInputElement ||
                        copyableChild instanceof HTMLTextAreaElement) {
                        textToCopy = copyableChild.value.trim(); // Use the value property for input/textarea
                    }
                    else {
                        textToCopy = copyableChild.innerHTML.trim(); // Use innerHTML for other elements
                    }
                    console.log("Text to copy:", textToCopy);
                    if (textToCopy) {
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            alert("Text zkopírován do schránky!"); // Notify the user
                            console.log("Copied text successfully!");
                        });
                    }
                    else {
                        alert("Nenalezen žádný obsah ke kopírování.");
                    }
                }
                else {
                    console.log("No copyable child found.");
                    alert("Nenalezen žádný obsah ke kopírování.");
                }
            }
            else {
                console.log("No parent element found.");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const emailBody = document.getElementById("email-body");
    if (emailBody) {
        emailBody.value = `Vážený pane poslanče / Vážená paní poslankyně,
Píšu Vám, abych vyjádřil své obavy ohledně vývoje umělé inteligence a jejího potenciálního dopadu na naši společnost. Dozvěděl jsem se, že vedoucí představitelé předních společností zabývajících se umělou inteligencí a přední odborníci v této oblasti v současné době varují před rizikem vyhynutí v důsledku umělé inteligence. 
Konkrétně toto riziko vyplývá z vývoje toho, co odborníci v této oblasti označují jako „superinteligenci“.
Jedním z příkladů je otevřené prohlášení CAIS o rizicích umělé inteligence, ve kterém se uvádí: „Snížení rizika vyhynutí v důsledku umělé inteligence by mělo být globální prioritou vedle jiných rizik 
společenského rozsahu, jako jsou pandemie a jaderná válka.“ Toto prohlášení podporují jak generální ředitelé 
předních společností zabývajících se umělou inteligencí, tak i nejvýznamnější odborníci v této oblasti, včetně nositelů Nobelovy ceny a Turingovy ceny.
Vzhledem k těmto informacím považuji za velmi znepokojivé, že několik největších společností zabývajících se umělou inteligencí se výslovně zaměřuje na vývoj superinteligence, a to navzdory jasným varováním předních odborníků v této oblasti.
I když si uvědomuji transformativní přínosy, které mohou pokročilé technologie umělé inteligence přinést, vytvoření systémů s inteligencí daleko přesahující lidské schopnosti s sebou nese nevratná a potenciálně katastrofická rizika, která nelze ignorovat. K tomuto vývoji musíme přistupovat s opatrností a odpovědností.
Vyzývám vás, abyste veřejně požadovali přijetí nových zákonů, které nás ochrání před hrozbou, kterou představuje vývoj superinteligentních systémů umělé inteligence. Je zásadně důležité, aby náš zákonodárný sbor zaujal proaktivní přístup při vytváření koalice zaměřené na zákaz superinteligence a zajištění toho, že si udržíme kontrolu nad svou budoucností.

Rád bych vám poskytl jakékoli další informace, které by mohly být užitečné při zvažování této záležitosti, a to buď vám osobně, nebo vaší kanceláři.

Děkuji vám za váš čas a pozornost věnovanou této důležité záležitosti.

S pozdravem,

[Vaše jméno]

[Váš volební obvod/místo]`;
    }
});
