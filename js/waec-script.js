// This is a front-end demo only — it doesn't check a real result.
// It fakes a PIN (like the one printed under a real scratch card) and
// simulates a short "checking" delay before showing the sample slip.
// Swap the setTimeout block for a real fetch() call to your backend/API
// once you have one.

document.addEventListener('DOMContentLoaded', function () {
  const scratchPanel = document.getElementById('scratchPanel');
  const scratchTexture = document.getElementById('scratchTexture');
  const pinValue = document.getElementById('pinValue');
  const pinHidden = document.getElementById('pinHidden');

  const form = document.getElementById('checkForm');
  const examInput = document.getElementById('examNumber');
  const serialInput = document.getElementById('serialNumber');
  const checkBtn = document.getElementById('checkBtn');
  const resultSlip = document.getElementById('resultSlip');
  const slipExamNumber = document.getElementById('slipExamNumber');

  const examError = document.getElementById('examNumberError');
  const serialError = document.getElementById('serialNumberError');
  const pinError = document.getElementById('pinError');
  const scratchCard = document.getElementById('scratchCard');
  const showCardBtn = document.getElementById('showCardBtn');

  showCardBtn.addEventListener('click', function () {
    scratchCard.classList.remove('hidden');
    showCardBtn.classList.add('hidden');
    scratchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');
  // ----- Mobile nav: toggle the hamburger menu -----
  navToggle.addEventListener('click', function () {
    const isOpen = navPanel.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });


  // The "real" PIN under the card — in a real product this comes from
  // whatever card the user bought, not from the front end.
  const FAKE_PIN = '223 891 730';

  // ----- Scratch panel: click/tap to reveal the PIN -----
  scratchPanel.addEventListener('click', function () {
    const alreadyRevealed = scratchPanel.getAttribute('aria-pressed') === 'true';
    if (alreadyRevealed) return;



    scratchTexture.style.opacity = '0';
    pinValue.textContent = FAKE_PIN;
    pinHidden.value = FAKE_PIN;
    scratchPanel.setAttribute('aria-pressed', 'true');
    clearError(pinError);
  });

  const hideResultBtn = document.getElementById('hideResultBtn');
  // ----- Hide the result slip again -----
hideResultBtn.addEventListener('click', function () {
  resultSlip.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

  // ----- Form submit: validate, show loading, reveal result -----
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    if (!examInput.value.trim()) {
      showError(examError, 'Enter your examination number.');
      valid = false;
    } else {
      clearError(examError);
    }

    if (!serialInput.value.trim()) {
      showError(serialError, 'Enter your serial number.');
      valid = false;
    } else {
      clearError(serialError);
    }

    if (!pinHidden.value) {
      showError(pinError, 'Scratch the panel to reveal your PIN first.');
      valid = false;
    } else {
      clearError(pinError);
    }

    if (!valid) return;

    // Loading state
    checkBtn.disabled = true;
    const originalLabel = checkBtn.textContent;
    checkBtn.textContent = 'Checking…';

    // Simulated network delay — replace this whole block with a real
    // fetch('/api/check-result', { method: 'POST', body: ... }) call.
    setTimeout(function () {
      checkBtn.disabled = false;
      checkBtn.textContent = originalLabel;

      slipExamNumber.textContent = examInput.value.trim();

      resultSlip.classList.remove('hidden');
      resultSlip.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1200);
  });

  function showError(el, message) {
    el.textContent = message;
  }

  function clearError(el) {
    el.textContent = '';
  }
});
