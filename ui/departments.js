function renderDepartments() {
  const deps = getData('hr_departments');
  const emps = getData('hr_employees');
  const tbody = document.getElementById('departmentsTable');
  const empty = document.getElementById('departmentsEmpty');

  if (!deps.length) { tbody.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  tbody.innerHTML = deps.map(d => {
    const count = emps.filter(e => e.departmentId === d.id).length;
    return `<tr>
      <td class="td-name">${d.name}</td>
      <td>${d.manager || '—'}</td>
      <td>${count}</td>
      <td><div class="row-actions">
        <button class="icon-btn" onclick="editDepartment(${d.id})">✎</button>
        <button class="icon-btn danger" onclick="deleteDepartment(${d.id})">🗑</button>
      </div></td>
    </tr>`;
  }).join('');
}

function departmentForm(d = {}) {
  return `
    <div class="field"><label>Название</label><input id="f_dep_name" value="${d.name || ''}" required></div>
    <div class="field"><label>Руководитель</label><input id="f_dep_manager" value="${d.manager || ''}"></div>
    <div class="modal-actions">
      <button class="btn btn-primary" id="modalSave">Сохранить</button>
      <button class="btn btn-ghost" onclick="closeModal()">Отмена</button>
    </div>`;
}

document.getElementById('addDepartmentBtn').onclick = () => {
  openModal('Новое подразделение', departmentForm(), () => {
    const name = document.getElementById('f_dep_name').value.trim();
    if (!name) { showToast('Введите название', true); return false; }
    const deps = getData('hr_departments');
    deps.push({ id: nextId(deps), name, manager: document.getElementById('f_dep_manager').value.trim() });
    setData('hr_departments', deps);
    renderDepartments();
    showToast('Подразделение добавлено');
    return true;
  });
};

function editDepartment(id) {
  const deps = getData('hr_departments');
  const dep = deps.find(d => d.id === id);
  openModal('Редактировать подразделение', departmentForm(dep), () => {
    dep.name = document.getElementById('f_dep_name').value.trim();
    dep.manager = document.getElementById('f_dep_manager').value.trim();
    setData('hr_departments', deps);
    renderDepartments();
    showToast('Сохранено');
    return true;
  });
}

function deleteDepartment(id) {
  if (!confirm('Удалить подразделение?')) return;
  let deps = getData('hr_departments');
  deps = deps.filter(d => d.id !== id);
  setData('hr_departments', deps);
  renderDepartments();
  showToast('Подразделение удалено');
}

renderDepartments();