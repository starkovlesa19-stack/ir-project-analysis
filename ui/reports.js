function renderReports() {
  const emps = getData('hr_employees').filter(e => e.status !== 'fired');
  const deps = getData('hr_departments');
  const poss = getData('hr_positions');

  const byDep = deps.map(d => ({ name: d.name, count: emps.filter(e => e.departmentId === d.id).length }));
  const byPos = poss.map(p => ({ name: p.title, count: emps.filter(e => e.positionId === p.id).length }));
  const maxDep = Math.max(...byDep.map(x => x.count), 1);
  const maxPos = Math.max(...byPos.map(x => x.count), 1);

  document.getElementById('reportDepartments').innerHTML = byDep.map(x => `
    <div class="report-row">
      <div class="report-label">${x.name}</div>
      <div class="report-bar-track"><div class="report-bar-fill" style="width:${(x.count / maxDep * 100)}%"></div></div>
      <div class="report-count">${x.count}</div>
    </div>`).join('');

  document.getElementById('reportPositions').innerHTML = byPos.map(x => `
    <div class="report-row">
      <div class="report-label">${x.name}</div>
      <div class="report-bar-track"><div class="report-bar-fill" style="width:${(x.count / maxPos * 100)}%"></div></div>
      <div class="report-count">${x.count}</div>
    </div>`).join('');
}

renderReports();