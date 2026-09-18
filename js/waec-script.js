
document.addEventListener('DOMContentLoaded', function () {
  const scratchPanel = document.getElementById('scratchPanel');
  const scratchTexture = document.getElementById('scratchTexture');
  const pinValue = document.getElementById('pinValue');
  const pinHidden = document.getElementById('pinHidden');

  const form = document.getElementById('checkForm');
  const examInput = document.getElementById('examNumber');
  const serialInput = document.getElementById('serialNumber');
  const checkBtn = document.getElementById('checkBtn');

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



  const FAKE_PIN = '223 891 730';

  
  scratchPanel.addEventListener('click', function () {
    const alreadyRevealed = scratchPanel.getAttribute('aria-pressed') === 'true';
    if (alreadyRevealed) return;



    scratchTexture.style.opacity = '0';
    pinValue.textContent = FAKE_PIN;
    pinHidden.value = FAKE_PIN;
    scratchPanel.setAttribute('aria-pressed', 'true');
    clearError(pinError);
  });

const stepCards = document.querySelectorAll('.step-card');
if (stepCards.length) {
  const stepObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  stepCards.forEach(function (card) {
    stepObserver.observe(card);
  });
}
  
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

    
checkBtn.disabled = true;
checkBtn.textContent = 'Checking…';


setTimeout(function () {
  const examValue = encodeURIComponent(examInput.value.trim());
  window.location.href = 'result-page.html?exam=' + examValue;
}, 1200);
  });

  

  function showError(el, message) {
    el.textContent = message;
  }

  function clearError(el) {
    el.textContent = '';
  }
});
