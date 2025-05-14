const countdownDate = new Date("2025-09-01T00:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// Email handling
document.getElementById("subscribe-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  console.log("Email ricevuta:", email);  // sostituibile con salvataggio reale
  const msg = document.getElementById("confirmation-message");
  msg.innerText = translations[currentLang].thanks;
  document.getElementById("email").value = "";
});

// Traduzioni
const translations = {
  it: {
    coming: "Sta Arrivando",
    launch: "Preparati al lancio ufficiale il <strong>1 Settembre 2025</strong>",
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    seconds: "Secondi",
    subscribe: "Iscriviti",
    thanks: "Grazie per esserti iscritto!"
  },
  en: {
    coming: "Coming Soon",
    launch: "Get ready for the official launch on <strong>September 1st, 2025</strong>",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    subscribe: "Subscribe",
    thanks: "Thanks for subscribing!"
  },
  fr: {
    coming: "Bientôt Disponible",
    launch: "Préparez-vous au lancement officiel le <strong>1er septembre 2025</strong>",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    subscribe: "S'inscrire",
    thanks: "Merci pour votre inscription !"
  }
};

let currentLang = "it";

function updateLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = translations[lang][key];
  });
}

document.getElementById("lang").addEventListener("change", (e) => {
  updateLanguage(e.target.value);
});

// Applica lingua iniziale
updateLanguage(currentLang);
