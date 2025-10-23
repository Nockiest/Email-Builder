
const TO_URL = "http://localhost:4000"; // <-- updated to use env variable

/**
 * Odešle e-mail pomocí mailto odkazu.
 * @param to - E-mailová adresa příjemce.
 * @param subject - Předmět e-mailu.
 * @param body - Text e-mailu.
 */
function sendEmail(to: string, subject: string, body: string): void {
  const TO_URL = (window as any).TO_URL || "http://localhost:4000";
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
    .then((result: { success: boolean; error?: string }) => {
      if (result.success) {
        alert("E-mail byl odeslán.");
      } else {
        alert(
          "Chyba při odesílání e-mailu: " + (result.error || "Neznámá chyba.")
        );
      }
    })
    .catch((error: Error) => {
      alert("Chyba při odesílání e-mailu: " + error.message);
    });
}

 
// Group politicians by public office
const politiciansByOffice: Record<string, Record<string, string>> = {
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
    "Jaroslava Pokorná Jermanová":
      "jaroslava.pokornajermanova@europarl.europa.eu",
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

function getEmailByName(name: string): string | undefined {
  for (const office of Object.keys(politiciansByOffice)) {
    const list = politiciansByOffice[office];
    if (Object.prototype.hasOwnProperty.call(list, name)) {
      return list[name];
    }
  }
  return undefined;
}

// helper to produce readable office label
function officeLabel(key: string): string {
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
function typedEntries<T extends Record<string, any>, K extends keyof T>(obj: T): [K, T[K]][] {
  return Object.keys(obj).map((k) => [k as K, obj[k as K]] as [K, T[K]]);
}

// Load politician names into the select box and add event listener for send button
document.addEventListener("DOMContentLoaded", () => {
  // fetch email contents
  const emailBody = document.getElementById(
    "email-body"
  ) as HTMLTextAreaElement | null;
  const select = document.getElementById(
    "politician"
  ) as HTMLSelectElement | null;
  const subjectInput = document.getElementById(
    "subject"
  ) as HTMLInputElement | null;
 
  console.log("fetching-email");
  // fetch email text from backend
  fetch(`${TO_URL}/email-template`)
    .then((response) => response.text())
    .then((text) => {
      if (emailBody) {
        emailBody.value = text;
      }
    });

  const selectedPoliticianSpan = document.getElementById(
    "selected-politician-email"
  );

  // Add values from politiciansByOffice to select as optgroups
  if (select) {
    // clear except placeholder
    while (select.options.length > 1) select.remove(1);

    // Iterate over the keys of politiciansByOffice to populate optgroups
    for (const officeKey of Object.keys(politiciansByOffice)) {
      const list = politiciansByOffice[officeKey];
      const names = Object.keys(list);
      if (names.length === 0) continue; // skip empty groups
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

  const sendButton = document.getElementById(
    "send-button"
  ) as HTMLButtonElement | null;


  if (sendButton) {
    sendButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();

      console.log("body input is:" + emailBody, emailBody?.value);

      const selectedName = select?.value ?? "";
      const subject = subjectInput?.value ?? "";
      const body = emailBody?.value ?? "";
      const email = getEmailByName(selectedName); // <-- use getEmailByName

      // check if user really wants to send the email
      if (!confirm("Opravdu chcete odeslat tento e-mail?")) {
        return;
      }
      if (email) {
        sendEmail(email, subject, body);
      } else {
        alert("Vyberte prosím politika.");
      }
    });
  }
});

const emailRow = document.getElementById("selected-politician-row");
const emailSpan = document.getElementById("selected-politician-email");
const select = document.getElementById(
  "politician"
) as HTMLSelectElement | null;

 