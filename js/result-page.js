document.addEventListener('DOMContentLoaded', function () {
  const subjectRows = document.getElementById('subjectRows');
  const addSubjectBtn = document.getElementById('addSubjectBtn');
  const generateBtn = document.getElementById('generateBtn');
  const editAgainBtn = document.getElementById('editAgainBtn');

  const inputPanel = document.getElementById('inputPanel');
  const generatedSlip = document.getElementById('generatedSlip');

  const inputName = document.getElementById('inputName');
  const inputExamNo = document.getElementById('inputExamNo');
  const inputSession = document.getElementById('inputSession');

  const outName = document.getElementById('outName');
  const outExamNo = document.getElementById('outExamNo');
  const outSession = document.getElementById('outSession');
  const outSubjectsBody = document.getElementById('outSubjectsBody');

  const streamChips = document.querySelectorAll('.stream-chip');

  const GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];

  const STREAMS = {
    science: [
      ['English Language', 'B2'], ['Mathematics', 'A1'], ['Physics', 'B3'],
      ['Chemistry', 'C4'], ['Biology', 'B2'], ['Further Mathematics', 'C5'],
      ['Agricultural Science', 'B3']
    ],
    arts: [
      ['English Language', 'B2'], ['Mathematics', 'C5'], ['Literature in English', 'A1'],
      ['Government', 'B2'], ['History', 'B3'], ['CRS', 'B2'], ['Fine Arts', 'A1']
    ],
    commercial: [
      ['English Language', 'B2'], ['Mathematics', 'B3'], ['Financial Accounting', 'A1'],
      ['Commerce', 'B2'], ['Economics', 'B3'], ['Book Keeping', 'C4'], ['Office Practice', 'B2']
    ]
  };

  function buildGradeOptions() {
    return GRADES.map(function (g) { return '<option value="' + g + '">' + g + '</option>'; }).join('');
  }

  function addSubjectRow(subjectValue, gradeValue) {
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML =
      '<input type="text" class="field-light" placeholder="Subject name" value="' + (subjectValue || '') + '">' +
      '<select class="field-light">' + buildGradeOptions() + '</select>' +
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

  // Default starting stream
  loadStream('science');

  streamChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      streamChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      loadStream(chip.dataset.stream);
    });
  });
  streamChips[0].classList.add('active');

  addSubjectBtn.addEventListener('click', function () {
    addSubjectRow('', 'B2');
  });

  generateBtn.addEventListener('click', function () {
    outName.textContent = inputName.value.trim() || '—';
    outExamNo.textContent = inputExamNo.value.trim() || '—';
    outSession.textContent = inputSession.value.trim() || '—';

    outSubjectsBody.innerHTML = '';
    subjectRows.querySelectorAll('.subject-row').forEach(function (row) {
      const subjectName = row.querySelector('input').value.trim();
      const grade = row.querySelector('select').value;
      if (!subjectName) return;

      const tr = document.createElement('tr');
      tr.innerHTML = '<td>' + subjectName + '</td><td>' + grade + '</td>';
      outSubjectsBody.appendChild(tr);
    });

    inputPanel.classList.add('hidden');
    generatedSlip.classList.remove('hidden');
  });

  editAgainBtn.addEventListener('click', function () {
    generatedSlip.classList.add('hidden');
    inputPanel.classList.remove('hidden');
  });
});