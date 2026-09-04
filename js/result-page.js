document.addEventListener('DOMContentLoaded', function () {
  const printBtn = document.getElementById('printBtn');
  const closeWindowBtn = document.getElementById('closeWindowBtn');

  printBtn.addEventListener('click', function () {
    window.print();
  });

  closeWindowBtn.addEventListener('click', function () {
    // Browsers only allow window.close() on tabs/windows that were
    // opened by script (e.g. window.open() from another page).
    // If this page was opened by typing the URL directly, closing
    // is blocked by the browser, so send the user back instead.
    window.close();
    setTimeout(function () {
      window.location.href = 'waec-design-1-working.html';
    }, 150);
  });
});
