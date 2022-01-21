const vorname = document.querySelector("#vorname");
const nachname = document.getElementById("nachname");
const email = document.getElementById("email");
const telefonnummer = document.getElementById("telefonnummer");
const submitButton = document.querySelector("button");
let errorMsgVorname = "darf nicht leer sein";

// document.querySelector, nicht querySelector

const auswahlListe = document.querySelector("#auswahlListe select");
const radioButtonMännlich = document.querySelector("#männlich");
const radioButtonWeiblich = document.querySelector("#weiblich");
const radioButtonDivers = document.querySelector("#divers");
const checkAGB = document.querySelector("#checkAGB");

//Variablen fürs finale checken
let vornameCheck = false;
let nachnameCheck = false;
let geschlechtCheck = false;
let emailCheck = false;
let telefonnummerCheck = false;
let zimmerCheck = false;
let agbsCheck = false;

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Alte Errors wieder entfernen
  document
    .querySelectorAll(".error")
    .forEach((errorElement) => errorElement.classList.remove("error"));

  checkInputs();
});

function checkInputs() {
  const vornameValue = vorname.value.trim();
  const nachnameValue = nachname.value.trim();
  const emailValue = email.value.trim();
  const telefonnummerValue = telefonnummer.value.trim();

  //VORNAME
  if (vornameValue === "") {
    //error
    setError(vorname, errorMsgVorname);
  } else {
    //sucess
    setSucces(vorname);
    vornameCheck = true;
  }
  //NACHNAME
  if (nachnameValue === "") {
    setError(nachname, " Dieses Feld darf nicht leer sein");
  } else if (nachnameValue !== "") {
    setSucces(nachname);
    nachnameCheck = true;
  }
  //RADIOBUTTONS
  if (
    radioButtonMännlich.checked ||
    radioButtonWeiblich.checked ||
    radioButtonDivers.checked
  ) {
    setSucces(radioButtonMännlich);
    geschlechtCheck = true;
  } else {
    setError(radioButtonMännlich, "Bitte wählen sie ein Geschlecht aus");
  }
  //EMAIL
  if (emailValue === "") {
    setError(email, "Dieses Feld darf nicht leer sein");
  } else if (emailValue !== "") {
    if (!emailValidation(emailValue)) {
      setError(email, "Dies ist keine gültige Email Adresse");
    } else {
      setSucces(email);
      emailCheck = true;
    }
  }

  //TELEFONNUMMER
  if (telefonnummerValue === "") {
    setError(telefonnummer, "Dieses Feld darf nicht leer sein");
  } else if (telefonnummerValue !== "") {
    if (!telefonnummerValidation(telefonnummerValue)) {
      setError(telefonnummer, "Dies ist keine gültige Telefonummer");
    } else {
      setSucces(telefonnummer);
      telefonnummerCheck = true;
    }
  }

  //AUSWAHLLISTE
  if (auswahlListe.value === "auswählen") {
    setError(auswahlListe, "Bitte wählen sie ein Zimmer aus");
  } else if (auswahlListe.value !== "auswählen") {
    setSucces(auswahlListe);
    zimmerCheck = true;
  }

  //AGBS

  if (checkAGB.checked) {
    setSucces(checkAGB);
    agbsCheck = true;
  } else {
    setError(checkAGB, "Bitte ankreuzen");
  }

  //FINALCHECK
  if (
    vornameCheck &&
    nachnameCheck &&
    geschlechtCheck &&
    emailCheck &&
    telefonnummerCheck &&
    zimmerCheck &&
    agbsCheck
  ) {
    everythingSuccesfull(
      submitButton,
      " Formular wurde erfolgreich abgesendet"
    );
  } else {
    setError(submitButton, " Nicht erfolgreich");
  }
  function setError(input, errormsg) {
    const inputParent = input.closest(".formularInhalt");
    const smallMsg = inputParent.querySelector("small.errormsg");

    smallMsg.innerText = errormsg;
    inputParent.classList.add("error");
    inputParent.classList.remove("succes");
  }

  function setSucces(input) {
    const inputParent = input.closest(".formularInhalt");

    inputParent.classList.remove("error");
    inputParent.classList.add("succes");

    console.log("Succesfunktion wird ausgeführt");
  }
  function emailValidation(email) {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email
    );
  }
  function telefonnummerValidation(telefonnummer) {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
      telefonnummer
    );
  }

  function everythingSuccesfull(input, finalMessage) {
    const inputParent = input.closest(".formularInhalt");

    const smallMsg = inputParent.querySelector("small.succesmsg");

    smallMsg.innerText = finalMessage;
    inputParent.classList.remove("error");
    inputParent.classList.add("succes");
  }
}

/**
 *
 * Issues:
 * - document.querySelector statt querySelector
 * - nicht auf input.parentElement verlassen, input.closest besser
 * - nicht das generische Small-Element selektieren, sondern das mit der jeweiligen Klasse (.error/.success)
 * - Error- bzw. Success-Messages auf display: none
 * - E-Mail-Validierung wertet richtige Adressen als falsch
 * - Bei Auswahlliste das Select-Element selektieren, nicht den Wrapper rundherum
 *
 *
 */
