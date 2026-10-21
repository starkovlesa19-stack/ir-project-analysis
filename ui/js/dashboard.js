const emps = getData('hr_employees');
const deps = getData('hr_departments');
const poss = getData('hr_positions');
document.getElementById('kpiEmployees').textContent = emps.length;
document.getElementById('kpiDepartments').textContent = deps.length;
document.getElementById('kpiPositions').textContent = poss.length;
document.getElementById('kpiOnLeave').textContent = emps.filter(e => e.status === 'leave').length;

const recent = document.getElementById('recentEmployees');
if (!emps.length) {
  recent.innerHTML = '<div class="empty-state">Сотрудников пока нет</div>';
} else {
  recent.innerHTML = emps.slice(-5).reverse().map(e => {
    const dep = deps.find(d => d.id === e.departmentId);
    const pos = poss.find(p => p.id === e.positionId);
    return `<div class="recent-item">
      <div class="avatar">${e.name.charAt(0).toUpperCase()}</div>
      <div>
        <div class="name">${e.name}</div>
        <div class="role">${pos ? pos.title : '—'} • ${dep ? dep.name : '—'}</div>
      </div>
    </div>`;
  }).join('');
}