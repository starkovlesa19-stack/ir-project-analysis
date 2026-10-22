const statusLabels = { active: 'Работает', leave: 'В отпуске', fired: 'Уволен' };
const statusClasses = { active: 'badge-active', leave: 'badge-leave', fired: 'badge-fired' };

function renderEmployees(filter = '') {
  const emps = getData('hr_employees');
  const deps = getData('hr_departments');
  const poss = getData('hr_positions');
  const tbody = document.getElementById('employeesTable');
  const empty = document.getElementById('employeesEmpty');

  const filtered = emps.filter(e =>
    e.name.toLowerCase().includes(filter.toLowerCase()) ||
    e.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filtered.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = filtered.map(e => {
    const dep = deps.find(d => d.id === e.departmentId);
    const pos = poss.find(p => p.id === e.positionId);
    return `<tr>
      <td class="td-name">${e.name}<br><span style="font-size:0.78rem;color:var(--muted)">${e.email}</span></td>
      <td>${pos ? pos.title : '—'}</td>
      <td>${dep ? dep.name : '—'}</td>
      <td>${e.hireDate || '—'}</td>
      <td><span class="badge ${statusClasses[e.status] || 'badge-active'}">${statusLabels[e.status] || 'Работает'}</span></td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" onclick="editEmployee(${e.id})">✎</button>
          <button class="icon-btn danger" onclick="deleteEmployee(${e.id})">🗑</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function employeeForm(e = {}) {
  const deps = getData('hr_departments');
  const poss = getData('hr_positions');
  return `
    <div class="field"><label>ФИО</label><input id="f_name" value="${e.name || ''}" required></div>
    <div class="field"><label>Email</label><input id="f_email" type="email" value="${e.email || ''}" required></div>
    <div class="field"><label>Подразделение</label>
      <select id="f_department" class="search-input" style="max-width:100%">
        ${deps.map(d => `<option value="${d.id}" ${e.departmentId === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
      </select>
    </div>
    <div class="field"><label>Должность</label>
      <select id="f_position" class="search-input" style="max-width:100%">
        ${poss.map(p => `<option value="${p.id}" ${e.positionId === p.id ? 'selected' : ''}>${p.title}</option>`).join('')}
      </select>
    </div>
    <div class="field"><label>Дата приёма</label><input id="f_date" type="date" value="${e.hireDate || ''}"></div>
    <div class="field"><label>Статус</label>
      <select id="f_status" class="search-input" style="max-width:100%">
        <option value="active" ${e.status === 'active' ? 'selected' : ''}>Работает</option>
        <option value="leave" ${e.status === 'leave' ? 'selected' : ''}>В отпуске</option>
        <option value="fired" ${e.status === 'fired' ? 'selected' : ''}>Уволен</option>
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" id="modalSave">Сохранить</button>
      <button class="btn btn-ghost" onclick="closeModal()">Отмена</button>
    </div>`;
}

function addEmployee() {
  openModal('Новый сотрудник', employeeForm(), () => {
    const name = document.getElementById('f_name').value.trim();
    const email = document.getElementById('f_email').value.trim();
    if (!name || !email) { showToast('Заполните ФИО и email', true); return false; }
    const emps = getData('hr_employees');
    emps.push({
      id: nextId(emps),
      name, email,
      departmentId: +document.getElementById('f_department').value,
      positionId: +document.getElementById('f_position').value,
      hireDate: document.getElementById('f_date').value,
      status: document.getElementById('f_status').value
    });
    setData('hr_employees', emps);
    renderEmployees(document.getElementById('searchEmployees').value);
    showToast('Сотрудник добавлен');
    return true;
  });
}

function editEmployee(id) {
  const emps = getData('hr_employees');
  const emp = emps.find(e => e.id === id);
  if (!emp) return;
  openModal('Редактировать сотрудника', employeeForm(emp), () => {
    emp.name = document.getElementById('f_name').value.trim();
    emp.email = document.getElementById('f_email').value.trim();
    emp.departmentId = +document.getElementById('f_department').value;
    emp.positionId = +document.getElementById('f_position').value;
    emp.hireDate = document.getElementById('f_date').value;
    emp.status = document.getElementById('f_status').value;
    setData('hr_employees', emps);
    renderEmployees(document.getElementById('searchEmployees').value);
    showToast('Сохранено');
    return true;
  });
}

function deleteEmployee(id) {
  if (!confirm('Удалить сотрудника?')) return;
  let emps = getData('hr_employees');
  emps = emps.filter(e => e.id !== id);
  setData('hr_employees', emps);
  renderEmployees(document.getElementById('searchEmployees').value);
  showToast('Сотрудник удалён');
}

document.getElementById('addEmployeeBtn').onclick = addEmployee;
document.getElementById('searchEmployees').oninput = (e) => renderEmployees(e.target.value);
renderEmployees();