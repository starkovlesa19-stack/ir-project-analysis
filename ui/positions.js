function renderPositions() {
  const poss = getData('hr_positions');
  const emps = getData('hr_employees');
  const tbody = document.getElementById('positionsTable');
  const empty = document.getElementById('positionsEmpty');

  if (!poss.length) { tbody.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  tbody.innerHTML = poss.map(p => {
    const count = emps.filter(e => e.positionId === p.id).length;
    return `<tr>
      <td class="td-name">${p.title}</td>
      <td>${p.salary.toLocaleString('ru-RU')} ₽</td>
      <td>${count}</td>
      <td><div class="row-actions">
        <button class="icon-btn" onclick="editPosition(${p.id})">✎</button>
        <button class="icon-btn danger" onclick="deletePosition(${p.id})">🗑</button>
      </div></td>
    </tr>`;
  }).join('');
}

function positionForm(p = {}) {
  return `
    <div class="field"><label>Название</label><input id="f_pos_title" value="${p.title || ''}" required></div>
    <div class="field"><label>Оклад, ₽</label><input id="f_pos_salary" type="number" value="${p.salary || ''}" required></div>
    <div class="modal-actions">
      <button class="btn btn-primary" id="modalSave">Сохранить</button>
      <button class="btn btn-ghost" onclick="closeModal()">Отмена</button>
    </div>`;
}

document.getElementById('addPositionBtn').onclick = () => {
  openModal('Новая должность', positionForm(), () => {
    const title = document.getElementById('f_pos_title').value.trim();
    const salary = +document.getElementById('f_pos_salary').value;
    if (!title || !salary) { showToast('Заполните все поля', true); return false; }
    const poss = getData('hr_positions');
    poss.push({ id: nextId(poss), title, salary });
    setData('hr_positions', poss);
    renderPositions();
    showToast('Должность добавлена');
    return true;
  });
};

function editPosition(id) {
  const poss = getData('hr_positions');
  const p = poss.find(x => x.id === id);
  openModal('Редактировать должность', positionForm(p), () => {
    p.title = document.getElementById('f_pos_title').value.trim();
    p.salary = +document.getElementById('f_pos_salary').value;
    setData('hr_positions', poss);
    renderPositions();
    showToast('Сохранено');
    return true;
  });
}

function deletePosition(id) {
  if (!confirm('Удалить должность?')) return;
  let poss = getData('hr_positions');
  poss = poss.filter(p => p.id !== id);
  setData('hr_positions', poss);
  renderPositions();
  showToast('Должность удалена');
}

renderPositions();