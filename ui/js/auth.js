function seedDemo() {
  const users = JSON.parse(localStorage.getItem('hr_users') || '{}');
  if (!users['admin@hr.ru']) {
    users['admin@hr.ru'] = {
      name: 'Администратор',
      company: 'ООО «Демо-Предприятие»',
      password: 'admin123'
    };
    localStorage.setItem('hr_users', JSON.stringify(users));
  }
  if (!localStorage.getItem('hr_departments')) {
    localStorage.setItem('hr_departments', JSON.stringify([
      { id: 1, name: 'Отдел разработки', manager: 'Иванов И.И.' },
      { id: 2, name: 'Отдел кадров', manager: 'Петрова А.С.' },
      { id: 3, name: 'Бухгалтерия', manager: 'Сидорова М.В.' }
    ]));
  }
  if (!localStorage.getItem('hr_positions')) {
    localStorage.setItem('hr_positions', JSON.stringify([
      { id: 1, title: 'Frontend-разработчик', salary: 120000 },
      { id: 2, title: 'HR-специалист', salary: 80000 },
      { id: 3, title: 'Бухгалтер', salary: 90000 }
    ]));
  }
  if (!localStorage.getItem('hr_employees')) {
    localStorage.setItem('hr_employees', JSON.stringify([
      { id: 1, name: 'Иван Иванов', email: 'ivan@hr.ru', departmentId: 1, positionId: 1, hireDate: '2024-01-15', status: 'active' },
      { id: 2, name: 'Анна Петрова', email: 'anna@hr.ru', departmentId: 2, positionId: 2, hireDate: '2023-06-01', status: 'active' },
      { id: 3, name: 'Мария Сидорова', email: 'maria@hr.ru', departmentId: 3, positionId: 3, hireDate: '2022-03-10', status: 'leave' }
    ]));
  }
  if (!localStorage.getItem('hr_timesheet')) {
    localStorage.setItem('hr_timesheet', JSON.stringify([
      { employeeId: 1, month: new Date().toISOString().slice(0,7), hours: 160, absences: 0 },
      { employeeId: 2, month: new Date().toISOString().slice(0,7), hours: 152, absences: 1 },
      { employeeId: 3, month: new Date().toISOString().slice(0,7), hours: 80, absences: 10 }
    ]));
  }
}
seedDemo();

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const error = document.getElementById('loginError');
    const users = JSON.parse(localStorage.getItem('hr_users') || '{}');
    if (!users[email]) { error.textContent = 'Пользователь не найден'; return; }
    if (users[email].password !== password) { error.textContent = 'Неверный пароль'; return; }
    localStorage.setItem('hr_currentUser', email);
    window.location.href = 'dashboard.html';
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const company = document.getElementById('regCompany').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const password2 = document.getElementById('regPassword2').value;
    const error = document.getElementById('regError');

    if (password !== password2) { error.textContent = 'Пароли не совпадают'; return; }
    if (password.length < 6) { error.textContent = 'Пароль должен быть минимум 6 символов'; return; }

    const users = JSON.parse(localStorage.getItem('hr_users') || '{}');
    if (users[email]) { error.textContent = 'Этот email уже зарегистрирован'; return; }

    users[email] = { name, company, password };
    localStorage.setItem('hr_users', JSON.stringify(users));
    localStorage.setItem('hr_currentUser', email);
    window.location.href = 'dashboard.html';
  });
}