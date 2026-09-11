document.addEventListener('DOMContentLoaded', function () {
  const builderWrap = document.getElementById('builderWrap');
  const slipScreen = document.getElementById('slipScreen');

  const streamChips = document.querySelectorAll('.stream-chip');
  const subjectRows = document.getElementById('subjectRows');
  const addSubjectBtn = document.getElementById('addSubjectBtn');
  const generateBtn = document.getElementById('generateBtn');
  const editAgainBtn = document.getElementById('editAgainBtn');
  const printBtn = document.getElementById('printBtn');

  const inputName = document.getElementById('inputName');
  const inputExamNo = document.getElementById('inputExamNo');
  const inputSession = document.getElementById('inputSession');

  const errorName = document.getElementById('errorName');
  const errorExamNo = document.getElementById('errorExamNo');
  const errorSession = document.getElementById('errorSession');
  const errorSubjects = document.getElementById('errorSubjects');

  const outName = document.getElementById('outName');
  const outExamNo = document.getElementById('outExamNo');
  const outSession = document.getElementById('outSession');
  const outStream = document.getElementById('outStream');
  const outCount = document.getElementById('outCount');
  const outSubjectsBody = document.getElementById('outSubjectsBody');

  const GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];

  const STREAMS = {
    science: [
      ['English Language', 'B2'], ['Mathematics', 'A1'], ['Physics', 'B3'],
      ['Chemistry', 'C4'], ['Biology', 'B2']
    ],
    arts: [
      ['English Language', 'B2'], ['Mathematics', 'C5'], ['Literature in English', 'A1'],
      ['Government', 'B2'], ['History', 'B3']
    ],
    commercial: [
      ['English Language', 'B2'], ['Mathematics', 'B3'], ['Financial Accounting', 'A1'],
      ['Commerce', 'B2'], ['Economics', 'B3']
    ]
  };

  let activeStream = 'science';

  function buildGradeOptions() {
    return GRADES.map(function (g) {
      return '<option value="' + g + '">' + g + '</option>';
    }).join('');
  }

  function addSubjectRow(subjectValue, gradeValue) {
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML =
      '<input type="text" class="field-input" placeholder="Subject name" value="' + (subjectValue || '') + '">' +
      '<select class="field-input">' + buildGradeOptions() + '</select>' +
      '<button type="button" class="remove-row-btn">×</button>';

    if (gradeValue) row.querySelector('select').value = gradeValue;

    row.querySelector('.remove-row-btn').addEventListener('click', function () {
      row.remove();
    });

    subjectRows.appendChild(row);
  }

  function loadStream(streamKey) {
    subjectRows.innerHTML = '';
    STREAMS[streamKey].forEach(function (pair) {
      addSubjectRow(pair[0], pair[1]);
    });
  }

  loadStream(activeStream);

  streamChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      streamChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeStream = chip.dataset.stream;
      loadStream(activeStream);
    });
  });

  addSubjectBtn.addEventListener('click', function () {
    addSubjectRow('', 'B2');
  });

  function clearErrors() {
    [errorName, errorExamNo, errorSession, errorSubjects].forEach(function (el) {
      el.textContent = '';
    });
    [inputName, inputExamNo, inputSession].forEach(function (el) {
      el.classList.remove('invalid');
    });
  }

  function markInvalid(inputEl, errorEl, message) {
    inputEl.classList.add('invalid');
    errorEl.textContent = message;
  }

  generateBtn.addEventListener('click', function () {
    clearErrors();
    let valid = true;

    if (!inputName.value.trim()) {
      markInvalid(inputName, errorName, 'Candidate name is required.');
      valid = false;
    }
    if (!inputExamNo.value.trim()) {
      markInvalid(inputExamNo, errorExamNo, 'Examination number is required.');
      valid = false;
    }
    if (!inputSession.value.trim()) {
      markInvalid(inputSession, errorSession, 'Session is required.');
      valid = false;
    }

    const rows = subjectRows.querySelectorAll('.subject-row');
    const filledRows = Array.from(rows).filter(function (row) {
      return row.querySelector('input').value.trim();
    });
    if (filledRows.length === 0) {
      errorSubjects.textContent = 'Add at least one subject with a name.';
      valid = false;
    }

    if (!valid) return;

    // Populate the slip
    outName.textContent = inputName.value.trim();
    outExamNo.textContent = inputExamNo.value.trim();
    outSession.textContent = inputSession.value.trim();
    outStream.textContent = activeStream.charAt(0).toUpperCase() + activeStream.slice(1);
    outCount.textContent = filledRows.length;

    outSubjectsBody.innerHTML = '';
    filledRows.forEach(function (row, index) {
      const subjectName = row.querySelector('input').value.trim();
      const grade = row.querySelector('select').value;
      const tr = document.createElement('tr');
      tr.style.animationDelay = (0.1 + index * 0.06) + 's';
      tr.innerHTML =
        '<td>' + subjectName + '</td>' +
        '<td class="grade-cell">' + grade + '</td>';
      outSubjectsBody.appendChild(tr);
    });

    builderWrap.classList.add('hidden');
    slipScreen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'auto' });
  });

  editAgainBtn.addEventListener('click', function () {
    slipScreen.classList.add('hidden');
    builderWrap.classList.remove('hidden');
  });

  printBtn.addEventListener('click', function () {
    window.print();
  });
});