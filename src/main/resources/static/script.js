// Tom array for billet liste
let billettListe = [];
const mainUrl = 'http://localhost:8080/';


function GetBiletts() {

    const apiUrl = mainUrl + 'tickets';
    const requestOptions = {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data);
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++){
                    var obj = data[i];
                    //console.log(obj);
                    let billett = {
                        film: obj['filmname'],
                        antall: obj['quantity'],
                        fornavn: obj['firstname'],
                        etternavn: obj['lastname'],
                        telefonnr: obj['phonenumber'],
                        epost: obj['email'],
                    };
                    //console.log(billett);
                    billettListe.push(billett);
                }

            }
            listBilletter();
        })
        .catch(error => {
            console.error

            ('Error:', error);
        });
}

// Funksjon for å legge til billetter
function addBillett() {
    if (checkInput()) {
        let billett = {
            film: document.getElementById('filmNames').value,
            antall: document.getElementById('antall').value,
            fornavn: document.getElementById('fornavn').value,
            etternavn: document.getElementById('etternavn').value,
            telefonnr: document.getElementById('telefonnr').value,
            epost: document.getElementById('epost').value
        };
        const apiUrl = mainUrl + 'newticket';

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                filmname: document.getElementById('filmNames').value,
                quantity: document.getElementById('antall').value,
                firstname: document.getElementById('fornavn').value,
                lastname: document.getElementById('etternavn').value,
                phonenumber: document.getElementById('telefonnr').value,
                email: document.getElementById('epost').value
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error

                ('Error:', error);
            });

        billettListe.push(billett);
        listBilletter();
        resetForm();
    }
}

// Input valideringer
function checkInput() {
    let isValid = true;


    // validering for filmutvalg
    let film = document.getElementById("filmNames").value;
    let filmAdv = document.getElementById("filmAdv");
    if (film === "") {
        filmAdv.innerText = "Vennligst velg en film";
        filmAdv.style.display = "inline-block";
        isValid = false;
    } else {
        filmAdv.style.display = "none";
    }


    // Antall validation
    let antall = document.getElementById('antall').value;
    let antallAdv = document.getElementById("antallAdv");
    if (parseInt(antall) < 1 || isNaN(parseInt(antall))) {
        antallAdv.innerText = "Må skrive noe inn i antall";
        antallAdv.style.display = "inline-block"; // vis feilmelding
        isValid = false;
    } else {
        antallAdv.style.display = "none"; // skjul feilmelding
    }

    // Fornavn validation
    let fornavn = document.getElementById("fornavn").value;
    let fornavnAdv = document.getElementById("fornavnAdv");
    if (!/^[a-zA-ZæøåÆØÅ\s]+$/.test(fornavn) || fornavn.length < 2) {
        fornavnAdv.innerText = "Dette feltet kan ikke stå tomt.";
        fornavnAdv.style.display = "inline-block";
        isValid = false;
    } else {
        fornavnAdv.style.display = "none";
    }

    // Etternavn validation
    let etternavn = document.getElementById("etternavn").value;
    let etternavnAdv = document.getElementById("etternavnAdv");
    if (!/^[a-zA-ZæøåÆØÅ\s]+$/.test(etternavn) || etternavn.length < 2) {
        etternavnAdv.innerText = "Dette feltet kan ikke stå tomt.";
        etternavnAdv.style.display = "inline-block";
        isValid = false;
    } else {
        etternavnAdv.style.display = "none";
    }

    // Telefonnr validation
    let telefonnr = document.getElementById("telefonnr").value;
    let telAdv = document.getElementById("telAdv");

    if (!/^\d{8}$/.test(telefonnr)) {
        telAdv.innerText = "Vennligst skriv inn i gyldig telefonnummer med 8 siffer";  // Telefonnumre i Norge består av 8 sifre.

        telAdv.style.display = "inline-block"; // Vis feilmelding
        isValid = false;
    } else {
        telAdv.style.display = "none"; // Skjul feilmelding
    }


    // Epost validation
    let epost = document.getElementById("epost").value;
    let epostAdv = document.getElementById("epostAdv");
// regex for e post validering
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(epost)) {
        epostAdv.innerText = "Vennligst skriv inn gyldig epost som feks.(bruker@gmail.no)";
        epostAdv.style.display = "inline-block"; // Vis feilmelding
        isValid = false;
    } else {
        epostAdv.style.display = "none"; // Skjul feilmelding
    }

    return isValid;

}


// Funksjon for tilbakestilling av skjema
function resetForm() {
    document.getElementById('billettForm').reset();
    // Skjul alle advarselsmeldinger
    let warnings = document.querySelectorAll('.validation-error');
    //warnings.forEach(function(warning) {
    //    warning.style.display = 'none';
    //});
}

// Funksjon for å oppdatere og vise billettliste
function listBilletter() {
    let alleBilletterDiv = document.getElementById('alleBilletter');
    alleBilletterDiv.innerHTML = ''; // Slett gjeldende liste
    billettListe.forEach(function(billett) {
        alleBilletterDiv.innerHTML += `<p>${billett.film} ${billett.antall} ${billett.fornavn} ${billett.etternavn} ${billett.telefonnr} ${billett.epost}</p>`;
    });
}

// Funksjon for å slette alle billetter
function slettAlleBilletter() {
    billettListe = [];
    listBilletter();
}