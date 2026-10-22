const monthInput = document.getElementById('timesheetMonth');
monthInput.value = new Date().toISOString().slice(0, 7);

function renderTimesheet() {
  const month = monthInput.value;
  const emps = getData('hr_employees').filter(e => e.status !== 'fired');
  const ts = getData('hr_timesheet');
  const tbody = document.getElementById('timesheetTable');
  const empty = document.getElementById('timesheetEmpty');

  if (!emps.length) { tbody.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  tbody.innerHTML = emps.map(e => {
    const rec = ts.find(t => t.employeeId === e.id && t.month === month) || { hours: 0, absences: 0 };
    return `<tr>
      <td class="td-name">${e.name}</td>
      <td>${rec.hours}</td>
      <td>${rec.absences}</td>
      <td><div class="row-actions">
        <button class="icon-btn" onclick="editTimesheet(${e.id})">✎</button>
      </div></td>
    </tr>`;
  }).join('');
}

function editTimesheet(empId) {
  const month = monthInput.value;
  const ts = getData('hr_timesheet');
  const rec = ts.find(t => t.employeeId === empId && t.month === month) || { hours: 0, absences: 0 };
  const emps = getData('hr_employees');
  const emp = emps.find(e => e.id === empId);

  openModal(`Табель: ${emp.name} (${month})`, `
    <div class="field"><label>Отработано часов</label><input id="f_hours" type="number" value="${rec.hours}"></div>
    <div class="field"><label>Дней отсутствия</label><input id="f_absences" type="number" value="${rec.absences}"></div>
    <div class="modal-actions">
      <button class="btn btn-primary" id="modalSave">Сохранить</button>
      <button class="btn btn-ghost" onclick="closeModal()">Отмена</button>
    </div>`, () => {
      const hours = +document.getElementById('f_hours').value;
      const absences = +document.getElementById('f_absences').value;
      const existing = ts.find(t => t.employeeId === empId && t.month === month);
      if (existing) { existing.hours = hours; existing.absences = absences; }
      else ts.push({ employeeId: empId, month, hours, absences });
      setData('hr_timesheet', ts);
      renderTimesheet();
      showToast('Табель сохранён');
      return true;
    });
}

monthInput.onchange = renderTimesheet;
renderTimesheet();