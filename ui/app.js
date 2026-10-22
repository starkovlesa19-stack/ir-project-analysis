// Проверка авторизации
const currentUser = localStorage.getItem('hr_currentUser');
const isAuthPage = window.location.pathname.includes('index.html') || 
                   window.location.pathname.includes('register.html') || 
                   window.location.pathname === '/' || 
                   window.location.pathname.endsWith('/');

// Если мы НЕ на странице входа и юзера нет - перенаправляем на вход
if (!currentUser && !isAuthPage) {
  window.location.href = 'index.html';
} else if (currentUser && isAuthPage) {
  // Если мы на странице входа, но уже залогинены - кидаем на дашборд
  window.location.href = 'dashboard.html';
}

// Заполнение сайдбара
const users = JSON.parse(localStorage.getItem('hr_users') || '{}');
const user = users[currentUser];
if (user) {
  const companyEl = document.getElementById('companyName');
  const nameEl = document.getElementById('userName');
  const emailEl = document.getElementById('userEmail');
  const avatarEl = document.getElementById('userAvatar');
  if (companyEl) companyEl.textContent = user.company;
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = currentUser;
  if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();
} else if (!isAuthPage) {
  // Если каким-то чудом попали на внутреннюю страницу без юзера - создаем фейкового
  localStorage.setItem('hr_currentUser', 'admin@hr.ru');
  window.location.reload();
}

// Подсветка активного меню
const page = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
document.querySelectorAll('.nav-item').forEach(item => {
  if (item.dataset.view === page) item.classList.add('active');
  else item.classList.remove('active');
});

// Выход
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('hr_currentUser');
    window.location.href = 'index.html';
  });
}

// Вспомогательные функции
function showToast(message, isError = false) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function openModal(title, bodyHTML, onSave) {
  let overlay = document.getElementById('modalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2 id="modalTitle"></h2>
          <button class="modal-close" id="modalClose">✕</button>
        </div>
        <div class="modal-body" id="modalBody"></div>
      </div>`;
    document.body.appendChild(overlay);
  }
  overlay.classList.remove('hidden');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHTML;
  document.getElementById('modalClose').onclick = closeModal;

  const saveBtn = document.getElementById('modalSave');
  if (saveBtn) saveBtn.onclick = () => { if (onSave()) closeModal(); };
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.add('hidden');
}

function getData(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
function setData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function nextId(arr) { return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1; }