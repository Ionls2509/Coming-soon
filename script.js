const launchDate = new Date('2025-09-01T00:00:00+02:00').getTime();

function animateNumber(id, newValue) {
  const el = document.getElementById(id);
  if (el.textContent != newValue) {
    el.classList.add('fade');
    setTimeout(() => {
      el.textContent = newValue;
      el.classList.remove('fade');
    }, 150);
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML = '<span style="color:#5a0000;font-size:1.2rem;">Lanciato!</span>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  animateNumber('days', days);
  animateNumber('hours', hours);
  animateNumber('minutes', minutes);
  animateNumber('seconds', seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Email form handling
document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const emailError = document.getElementById('emailError');
  emailError.style.display = 'none';
  emailError.textContent = '';

  if (form.website && form.website.value) {
    return;
  }

  const data = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      document.getElementById('emailSuccess').style.display = 'block';
      form.querySelector('button').style.display = 'none';
      form.querySelector('input[type="email"]').style.display = 'none';
      form.reset();
    } else {
      response.json().then(data => {
        emailError.style.display = 'block';
        emailError.textContent = data.error || "Errore nell'invio.";
      });
    }
  }).catch(() => {
    emailError.style.display = 'block';
    emailError.textContent = 'Errore di connessione.';
  });
});
