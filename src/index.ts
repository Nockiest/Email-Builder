const TO_URL = "http://localhost:4000"; // <-- updated to use env variable

// https://pspen.psp.cz/chamber-members/members/?utm_source=chatgpt.com
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
     'Ivan Adamec':  `adameci@seznam.cz` , // SPOLU
 'Věra Adámková':  `adamkovav@seznam.cz` , // ANO
 'Hana Ančincová':  `ancincovah@seznam.cz` , // Piráti
 'Andrej Babiš':  `babisa@seznam.cz` , // ANO
 'Ondřej Babka':  `babkao@seznam.cz` , // ANO
 'Jana Bačíková':  `bacikovaj@seznam.cz` , // SPOLU
 'Jiří Barták':  `bartakj@seznam.cz` , // Motoristé
 'Pavel Bartoň':  `bartonp@seznam.cz` , // ANO
 'Ivan Bartoš':  `bartosi@seznam.cz` , // Piráti
 'Jan Bartošek':  `bartosekj@seznam.cz` , // SPOLU
 'Lucie Bartošová':  `bartosoval@seznam.cz` , // SPOLU
 'Jan Bauer':  `bauerj@seznam.cz` , // SPOLU
 'Martin Baxa':  `baxam@seznam.cz` , // SPOLU
 'Marek Benda':  `bendam@seznam.cz` , // SPOLU
 'Petr Bendl':  `bendlp@seznam.cz` , // SPOLU
 'Karel Beran':  `berank@seznam.cz` , // Motoristé
 'Jan Berki':  `berkij@seznam.cz` , // STAN
 'Jana Berkovcová':  `berkovcovaj@seznam.cz` , // ANO
 'Drahomír Blažej':  `blazejd@seznam.cz` , // ANO
 'Zdeňka Blišťanová':  `blistanovaz@seznam.cz` , // SPOLU
 'Jiří Bouška':  `bouskaj@seznam.cz` , // ANO
 'Richard Brabec[p 4]':  `4]r@seznam.cz` , // ANO
 'Milan Brázdil':  `brazdilm@seznam.cz` , // ANO
 'Monika Brzesková':  `brzeskovam@seznam.cz` , // SPOLU
 'František Bureš':  `buresf@seznam.cz` , // ANO
 'Jan Bureš':  `buresj@seznam.cz` , // SPOLU
 'Jana Černochová':  `cernochovaj@seznam.cz` , // SPOLU
 'Igor Červený':  `cervenyi@seznam.cz` , // Motoristé
 'Benjamin Činčila':  `cincilab@seznam.cz` , // SPOLU
 'Eva Decroix':  `decroixe@seznam.cz` , // SPOLU
 'Katerina Demetrashvili':  `demetrashvilik@seznam.cz` , // Piráti
 'Jana Demjanová[p 5]':  `5]j@seznam.cz` , // ANO
 'Denis Doksanský':  `doksanskyd@seznam.cz` , // ANO
 'Tomáš Doležal':  `dolezalt@seznam.cz` , // SPD
 'Lenka Dražilová':  `draziloval@seznam.cz` , // ANO
 'Karel Dvořák':  `dvorakk@seznam.cz` , // STAN
 'Jaroslav Faltýnek':  `faltynekj@seznam.cz` , // ANO
 'Kamal Farhan':  `farhank@seznam.cz` , // ANO
 'Irena Ferčíková Konečná':  `konecnai@seznam.cz` , // Piráti
 'Petr Fiala':  `fialap@seznam.cz` , // SPOLU
 'Radim Fiala':  `fialar@seznam.cz` , // SPD
 'Eva Fialová':  `fialovae@seznam.cz` , // ANO
 'Jana Filipovičová':  `filipovicovaj@seznam.cz` , // SPOLU
 'Josef Flek':  `flekj@seznam.cz` , // STAN
 'Jaroslav Foldyna':  `foldynaj@seznam.cz` , // SPD
 'Stanislav Fridrich':  `fridrichs@seznam.cz` , // ANO
 'Karin Gajdová':  `gajdovak@seznam.cz` , // ANO
 'Matěj Gregor':  `gregorm@seznam.cz` , // Motoristé
 'Karel Haas':  `haask@seznam.cz` , // SPOLU
 'Jana Hanzlíková':  `hanzlikovaj@seznam.cz` , // ANO
 'Matěj Ondřej Havel':  `havelm@seznam.cz` , // SPOLU
 'Karel Havlíček':  `havlicekk@seznam.cz` , // ANO
 'Jiří Havránek':  `havranekj@seznam.cz` , // SPOLU
 'Vlastimil Hebr[p 6]':  `6]v@seznam.cz` , // ANO
 'Tomáš Helebrant':  `helebrantt@seznam.cz` , // ANO
 'Igor Hendrych':  `hendrychi@seznam.cz` , // ANO
 'Petr Hladík':  `hladikp@seznam.cz` , // SPOLU
 'Matěj Hlavatý':  `hlavatym@seznam.cz` , // STAN
 'Andrea Hoffmannová':  `hoffmannovaa@seznam.cz` , // Piráti
 'Libor Hoppe':  `hoppel@seznam.cz` , // SPOLU
 'Jiří Horák':  `horakj@seznam.cz` , // SPOLU
 'Jan Hrnčíř':  `hrncirj@seznam.cz` , // SPD
 'Zdeněk Hřib':  `hribz@seznam.cz` , // Piráti
 'Monika Hubíková':  `hubikovam@seznam.cz` , // ANO
 'Adriana Chochelová':  `chochelovaa@seznam.cz` , // STAN
 'Jan Jakob':  `jakobj@seznam.cz` , // SPOLU
 'Jakub Janda':  `jandaj@seznam.cz` , // SPOLU
 'Miloslav Janulík':  `janulikm@seznam.cz` , // ANO
 'Aleš Juchelka':  `juchelkaa@seznam.cz` , // ANO
 'Marian Jurečka':  `jureckam@seznam.cz` , // SPOLU
 'Pavel Karpíšek':  `karpisekp@seznam.cz` , // SPOLU
 'David Kasal':  `kasald@seznam.cz` , // ANO
 'Zdena Kašparová':  `kasparovaz@seznam.cz` , // STAN
 'Jiřina Klčová':  `klcovaj@seznam.cz` , // ANO
 'Oto Klempíř':  `klempiro@seznam.cz` , // Motoristé
 'Tomáš Kohoutek':  `kohoutekt@seznam.cz` , // ANO
 'Vladimír Kolek':  `kolekv@seznam.cz` , // ANO
 'Martin Kolovratník':  `kolovratnikm@seznam.cz` , // ANO
 'Radek Koten':  `kotenr@seznam.cz` , // SPD
 'Josef Kott':  `kottj@seznam.cz` , // ANO
 'Věra Kovářová':  `kovarovav@seznam.cz` , // STAN
 'Veronika Kovářová':  `kovarovav@seznam.cz` , // Piráti
 'Petr Kowanda':  `kowandap@seznam.cz` , // ANO
 'Jakub Krainer':  `krainerj@seznam.cz` , // STAN
 'Robert Králíček':  `kralicekr@seznam.cz` , // ANO
 'Miroslav Krejčí':  `krejcim@seznam.cz` , // Motoristé
 'Vojtěch Krňanský':  `krnanskyv@seznam.cz` , // Motoristé
 'Marie Kršková':  `krskovam@seznam.cz` , // SPOLU
 'Jana Krutáková':  `krutakovaj@seznam.cz` , // STAN
 'Roman Kubíček':  `kubicekr@seznam.cz` , // ANO
 'Petr Kubis[p 7]':  `7]p@seznam.cz` , // ANO
 'Michal Kučera':  `kuceram@seznam.cz` , // SPOLU
 'Šárka Kučerová[p 8]':  `8]s@seznam.cz` , // Piráti
 'Martin Kupec':  `kupecm@seznam.cz` , // ANO
 'Martin Kupka':  `kupkam@seznam.cz` , // SPOLU
 'Hubert Lang':  `langh@seznam.cz` , // ANO
 'Helena Langšádlová':  `langsadlovah@seznam.cz` , // SPOLU
 'Jan Lipavský':  `lipavskyj@seznam.cz` , // SPOLU
 'Petr Macinka':  `macinkap@seznam.cz` , // Motoristé
 'Ivana Mádlová':  `madlovai@seznam.cz` , // ANO
 'Zuzana Majerová':  `majerovaz@seznam.cz` , // SPD
 'Taťána Malá':  `malat@seznam.cz` , // ANO
 'Lenka Martínková Španihelová':  `spaniheloval@seznam.cz` , // Piráti
 'Jiří Mašek':  `masekj@seznam.cz` , // ANO
 'Lubomír Metnar':  `metnarl@seznam.cz` , // ANO
 'Michaela Moricová':  `moricovam@seznam.cz` , // Piráti
 'Vojtěch Munzar':  `munzarv@seznam.cz` , // SPOLU
 'Jana Murová':  `murovaj@seznam.cz` , // ANO
 'Patrik Nacher':  `nacherp@seznam.cz` , // ANO
 'Anežka Nedomová':  `nedomovaa@seznam.cz` , // STAN
 'Irena Němcová':  `nemcovai@seznam.cz` , // SPD
 'Zdenka Němečková Crkvenjaš':  `crkvenjasz@seznam.cz` , // SPOLU
 'Bohuslav Niemiec':  `niemiecb@seznam.cz` , // SPOLU
 'Marek Novák':  `novakm@seznam.cz` , // ANO
 'Monika Oborná':  `obornam@seznam.cz` , // ANO
 'Hayato Okamura':  `okamurah@seznam.cz` , // SPOLU
 'Tomio Okamura':  `okamurat@seznam.cz` , // SPD
 'Ladislav Okleštěk':  `oklestekl@seznam.cz` , // ANO
 'Eliška Olšáková':  `olsakovae@seznam.cz` , // STAN
 'Michaela Opltová':  `opltovam@seznam.cz` , // STAN
 'Renata Oulehlová':  `oulehlovar@seznam.cz` , // ANO
 'Pavel Outrata':  `outratap@seznam.cz` , // ANO
 'Zuzana Ožanová':  `ozanovaz@seznam.cz` , // ANO
 'Jan Papajanovský':  `papajanovskyj@seznam.cz` , // STAN
 'Patrik Pařil':  `parilp@seznam.cz` , // ANO
 'Jana Pastuchová':  `pastuchovaj@seznam.cz` , // ANO
 'Jana Patková':  `patkovaj@seznam.cz` , // Piráti
 'Jiří Penc[p 9]':  `9]j@seznam.cz` , // ANO
 'Berenika Peštová':  `pestovab@seznam.cz` , // ANO
 'František Petrtýl':  `petrtylf@seznam.cz` , // ANO
 'Tom Philipp':  `philippt@seznam.cz` , // SPOLU
 'Vladimír Pikora':  `pikorav@seznam.cz` , // Motoristé
 'Barbora Pipášová':  `pipasovab@seznam.cz` , // Piráti
 'Pavla Pivoňka Vaňková':  `vankovap@seznam.cz` , // STAN
 'Robert Plaga':  `plagar@seznam.cz` , // ANO
 'Václav Pláteník':  `platenikv@seznam.cz` , // SPOLU
 'Jiří Pospíšil':  `pospisilj@seznam.cz` , // SPOLU
 'Marie Pošarová':  `posarovam@seznam.cz` , // SPD
 'David Pražák':  `prazakd@seznam.cz` , // ANO
 'Jindřich Rajchl':  `rajchlj@seznam.cz` , // SPD
 'Vít Rakušan':  `rakusanv@seznam.cz` , // STAN
 'Michal Ratiborský':  `ratiborskym@seznam.cz` , // ANO
 'Barbora Rázga':  `razgab@seznam.cz` , // ANO
 'Jan Richter':  `richterj@seznam.cz` , // ANO
 'Olga Richterová':  `richterovao@seznam.cz` , // Piráti
 'Pavel Růžička':  `ruzickap@seznam.cz` , // ANO
 'Drahoslav Ryba':  `rybad@seznam.cz` , // ANO
 'Petr Sadovský':  `sadovskyp@seznam.cz` , // ANO
 'Miroslav Samaš':  `samasm@seznam.cz` , // ANO
 'Gabriela Sedláčková':  `sedlackovag@seznam.cz` , // Motoristé
 'Lucie Sedmihradská':  `sedmihradskal@seznam.cz` , // STAN
 'Alena Schillerová':  `schillerovaa@seznam.cz` , // ANO
 'Vítězslav Schrek':  `schrekv@seznam.cz` , // SPOLU
 'Zuzana Schwarz Bařtipánová':  `bartipanovaz@seznam.cz` , // ANO
 'Jan Síla':  `silaj@seznam.cz` , // SPD
 'Jan Skopeček':  `skopecekj@seznam.cz` , // SPOLU
 'Štěpán Slovák':  `slovaks@seznam.cz` , // SPOLU
 'Julie Smejkalová':  `smejkalovaj@seznam.cz` , // STAN
 'Petr Sokol':  `sokolp@seznam.cz` , // SPOLU
 'Kateřina Stojanová':  `stojanovak@seznam.cz` , // Piráti
 'Jiří Strýček':  `strycekj@seznam.cz` , // ANO
 'Robert Stržínek':  `strzinekr@seznam.cz` , // ANO
 'Gabriela Svárovská':  `svarovskag@seznam.cz` , // Piráti
 'Jan Sviták':  `svitakj@seznam.cz` , // STAN
 'Jiří Svoboda':  `svobodaj@seznam.cz` , // ANO
 'Vendula Svobodová':  `svobodovav@seznam.cz` , // Piráti
 'Lucie Šafránková':  `safrankoval@seznam.cz` , // SPD
 'Michaela Šebelová':  `sebelovam@seznam.cz` , // STAN
 'Miroslav Ševčík':  `sevcikm@seznam.cz` , // SPD
 'Markéta Šichtařová':  `sichtarovam@seznam.cz` , // SPD
 'Martin Šmída[p 10]':  `10]m@seznam.cz` , // Piráti
 'Eva Šrámková':  `sramkovae@seznam.cz` , // Piráti
 'Boris Šťastný':  `stastnyb@seznam.cz` , // Motoristé
 'David Štolpa':  `stolpad@seznam.cz` , // ANO
 'František Talíř':  `talirf@seznam.cz` , // SPOLU
 'Róbert Teleky':  `telekyr@seznam.cz` , // SPOLU
 'Václav Trojan':  `trojanv@seznam.cz` , // ANO
 'Karel Tureček':  `turecekk@seznam.cz` , // ANO
 'Filip Turek':  `turekf@seznam.cz` , // Motoristé
 'Libor Turek':  `turekl@seznam.cz` , // SPOLU
 'Barbora Urbanová':  `urbanovab@seznam.cz` , // STAN
 'Vlastimil Válek':  `valekv@seznam.cz` , // SPOLU
 'Helena Válková':  `valkovah@seznam.cz` , // ANO
 'Josef Váňa':  `vanaj@seznam.cz` , // ANO
 'Renata Vesecká':  `veseckar@seznam.cz` , // Motoristé
 'Lukáš Vlček':  `vlcekl@seznam.cz` , // STAN
 'Jiří Vojáček':  `vojacekj@seznam.cz` , // SPOLU
 'Adam Vojtěch':  `vojtecha@seznam.cz` , // ANO
 'Jitka Volfová':  `volfovaj@seznam.cz` , // ANO
 'Samuel Volpe':  `volpes@seznam.cz` , // Piráti
 'Libor Vondráček':  `vondracekl@seznam.cz` , // SPD
 'Radek Vondráček':  `vondracekr@seznam.cz` , // ANO
 'Otto Vopěnka':  `vopenkao@seznam.cz` , // ANO
 'Petr Vrána':  `vranap@seznam.cz` , // ANO
 'Marek Výborný':  `vybornym@seznam.cz` , // SPOLU
 'Ester Weimerová':  `weimerovae@seznam.cz` , // STAN
 'Lubomír Wenzl':  `wenzll@seznam.cz` , // ANO
 'Martin Záhoř':  `zahorm@seznam.cz` , // ANO
 'Renáta Zajíčková':  `zajickovar@seznam.cz` , // SPOLU
 'Roman Zarzycký[p 11]':  `11]r@seznam.cz` , // ANO
 'Michal Zuna':  `zunam@seznam.cz` , // SPOLU
 'Pavel Žáček':  `zacekp@seznam.cz` , // SPOLU
 'Miroslav Žbánek':  `zbanekm@seznam.cz` , // ANO
 'Marek Ženíšek':  `zenisekm@seznam.cz` , // SPOLU

  },
  other: {
    // "Ondřej Lukeš": "ondralukes06@seznam.cz",
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
function typedEntries<T extends Record<string, any>, K extends keyof T>(
  obj: T
): [K, T[K]][] {
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

  // console.log("fetching-email");
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
          if (
            copyableChild instanceof HTMLInputElement ||
            copyableChild instanceof HTMLTextAreaElement
          ) {
            textToCopy = copyableChild.value.trim(); // Use the value property for input/textarea
          } else {
            textToCopy = copyableChild.innerHTML.trim(); // Use innerHTML for other elements
          }

          console.log("Text to copy:", textToCopy);

          if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
              alert("Text zkopírován do schránky!"); // Notify the user
              console.log("Copied text successfully!");
            });
          } else {
            alert("Nenalezen žádný obsah ke kopírování.");
          }
        } else {
          console.log("No copyable child found.");
          alert("Nenalezen žádný obsah ke kopírování.");
        }
      } else {
        console.log("No parent element found.");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const emailBody = document.getElementById(
    "email-body"
  ) as HTMLTextAreaElement | null;

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
