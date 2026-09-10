document.addEventListener('DOMContentLoaded', function () {
  const slipExamNumber = document.getElementById('slipExamNumber');
  const params = new URLSearchParams(window.location.search);
  const examFromUrl = params.get('exam');

  if (examFromUrl) {
    slipExamNumber.textContent = decodeURIComponent(examFromUrl);
  }
});