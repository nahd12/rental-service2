// ============================================
// OneTime - РАБОЧАЯ ВЕРСИЯ (без Supabase)
// ============================================

let currentUser = null;
let items = [];
let bookings = [];
let users = [];

// Инициализация данных
function initData() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        users = [
            {
                id: '1',
                name: 'Демо Пользователь',
                email: 'demo@example.com',
                password: '123456',
                phone: '+7 900 123-45-67',
                address: 'г. Москва',
                rating: 4.8,
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Администратор',
                email: 'admin@onetime.ru',
                password: 'admin123',
                phone: '+7 900 000-00-00',
                address: 'г. Москва',
                rating: 5.0,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }

    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
    } else {
        items = [
            {
                id: '1',
                title: 'Перфоратор Makita',
                category: 'tools',
                priceDay: 800,
                deposit: 3000,
                description: 'Мощный перфоратор для ремонта',
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 4.9,
                available: true,
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'Костюм для фотосессии',
                category: 'clothing',
                priceDay: 1200,
                deposit: 5000,
                description: 'Стильный классический костюм',
                image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 5.0,
                available: true,
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                title: 'Мангал складной',
                category: 'outdoor',
                priceDay: 500,
                deposit: 1500,
                description: 'Для пикника, шампура в комплекте',
                image: 'https://images.unsplash.com/photo-1558954138-06e851f0c4c6?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 4.7,
                available: true,
                createdAt: new Date().toISOString()
            },
            {
                id: '4',
                title: 'Проектор XGIMI',
                category: 'electronics',
                priceDay: 1000,
                deposit: 15000,
                description: 'Для домашнего кинотеатра',
                image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 5.0,
                available: true,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('items', JSON.stringify(items));
    }

    const storedBookings = localStorage.getItem('bookings');
    bookings = storedBookings ? JSON.parse(storedBookings) : [];
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) currentUser = JSON.parse(savedUser);
}

function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('bookings', JSON.stringify(bookings));
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('currentUser');
    }
}

function updateNav() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userNameSpan = document.getElementById('userName');
    const adminLink = document.querySelector('.admin-link');
    
    if (currentUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            if (userNameSpan) userNameSpan.textContent = currentUser.name;
        }
        // Показываем админ-панель для администратора
        if (currentUser.email === 'admin@onetime.ru' && !adminLink) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                const link = document.createElement('a');
                link.href = 'admin.html';
                link.className = 'admin-link';
                link.style.color = 'var(--primary)';
                link.innerHTML = '👑 Админ-панель';
                navLinks.appendChild(link);
            }
        } else if (currentUser.email !== 'admin@onetime.ru' && adminLink) {
            adminLink.remove();
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
        if (adminLink) adminLink.remove();
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNav();
    showNotification('Вы вышли из аккаунта', 'info');
    setTimeout(() => window.location.href = 'index.html', 500);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 12px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ============================================
// АВТОРИЗАЦИЯ
// ============================================

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        saveData();
        updateNav();
        showNotification('Вход выполнен!', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
        showNotification('Неверный email или пароль', 'error');
    }
}

function register(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirm) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }
    if (users.find(u => u.email === email)) {
        showNotification('Email уже используется', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        phone: phone || '',
        address: '',
        rating: null,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    currentUser = newUser;
    saveData();
    updateNav();
    showNotification('Регистрация успешна!', 'success');
    setTimeout(() => window.location.href = 'index.html', 1500);
}

// ============================================
// ОТОБРАЖЕНИЕ ТОВАРОВ
// ============================================

function getCategoryName(category) {
    const categories = { tools: 'Инструменты', clothing: 'Одежда', outdoor: 'Отдых', electronics: 'Электроника', sports: 'Спорт' };
    return categories[category] || category;
}

function renderItems(containerId, itemsToRender) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!itemsToRender || itemsToRender.length === 0) {
        container.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 60px;">Ничего не найдено</div>';
        return;
    }
    
    container.innerHTML = itemsToRender.map(item => `
        <div class="item-card" onclick="location.href='item-details.html?id=${item.id}'">
            <div class="item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center; height: 180px;">
                <span class="item-category">${getCategoryName(item.category)}</span>
            </div>
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-price">${item.priceDay} ₽ / день</div>
                <div class="item-deposit">Залог: ${item.deposit} ₽</div>
                <div class="item-rating">
                    <i class="fas fa-star"></i>
                    <span>${item.rating || 'Новый'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadFeaturedItems() {
    if (document.getElementById('featuredItems')) {
        renderItems('featuredItems', items.slice(0, 4));
    }
}

function loadCatalog() {
    if (document.getElementById('catalogItems')) {
        renderItems('catalogItems', items);
    }
}

function loadItemDetails() {
    const container = document.getElementById('itemDetails');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const item = items.find(i => i.id === itemId);
    
    if (!item) {
        container.innerHTML = '<div style="text-align: center; padding: 60px;"><h2>Товар не найден</h2><a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a></div>';
        return;
    }
    
    const isOwner = currentUser && item.ownerId === currentUser.id;
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 48px 0;">
            <div>
                <img src="${item.image}" alt="${item.title}" style="width: 100%; border-radius: 24px;">
            </div>
            <div>
                <h1 style="font-size: 2rem; margin-bottom: 16px;">${item.title}</h1>
                <div style="margin-bottom: 16px;">
                    <i class="fas fa-star" style="color: #f59e0b;"></i>
                    <span>${item.rating || 'Новый'}</span>
                </div>
                <p style="color: var(--text-muted); margin-bottom: 24px;">${item.description}</p>
                <div style="background: var(--card-bg); padding: 24px; border-radius: 20px; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span>Аренда на день:</span>
                        <span style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${item.priceDay} ₽</span>
                    </div>
                    <div style="color: var(--text-muted);">
                        <span>Залог: ${item.deposit} ₽ (возвращается после аренды)</span>
                    </div>
                </div>
                ${isOwner ? `
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 20px; text-align: center;">
                        <p style="color: var(--primary); margin-bottom: 16px;">Это ваш товар</p>
                        <button onclick="location.href='edit-item.html?id=${item.id}'" class="btn btn-primary" style="margin-right: 12px;">Редактировать</button>
                        <button onclick="deleteItem('${item.id}')" class="btn btn-outline" style="background: #ef4444; color: white;">Удалить</button>
                    </div>
                ` : `
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 20px;">
                        <h3 style="margin-bottom: 16px;">Забронировать</h3>
                        <div style="margin-bottom: 16px;">
                            <label>Дата начала:</label>
                            <input type="date" id="startDate" class="form-control" style="width: 100%; padding: 12px; background: var(--gray); border: 1px solid var(--border); border-radius: 12px; color: var(--text);">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label>Дата окончания:</label>
                            <input type="date" id="endDate" class="form-control" style="width: 100%; padding: 12px; background: var(--gray); border: 1px solid var(--border); border-radius: 12px; color: var(--text);">
                        </div>
                        <div id="totalPrice" style="margin-bottom: 16px;"></div>
                        <button onclick="bookItem('${item.id}')" class="btn btn-primary btn-full" style="width: 100%;">
                            ${currentUser ? 'Забронировать' : 'Войдите, чтобы забронировать'}
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
    
    if (!isOwner) {
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        const totalSpan = document.getElementById('totalPrice');
        
        function calculateTotal() {
            if (startDate.value && endDate.value) {
                const start = new Date(startDate.value);
                const end = new Date(endDate.value);
                const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                if (days > 0) {
                    totalSpan.innerHTML = `<strong>Итого: ${days * item.priceDay} ₽ + залог ${item.deposit} ₽</strong>`;
                } else {
                    totalSpan.innerHTML = '<strong>Выберите корректные даты</strong>';
                }
            }
        }
        if (startDate) startDate.addEventListener('change', calculateTotal);
        if (endDate) endDate.addEventListener('change', calculateTotal);
    }
}

function deleteItem(itemId) {
    if (confirm('Удалить этот товар?')) {
        items = items.filter(i => i.id !== itemId);
        saveData();
        showNotification('Товар удален', 'success');
        setTimeout(() => window.location.href = 'catalog.html', 1000);
    }
}

function bookItem(itemId) {
    if (!currentUser) {
        showNotification('Войдите в аккаунт', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const item = items.find(i => i.id === itemId);
    
    if (!startDate || !endDate) {
        showNotification('Выберите даты аренды', 'error');
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
        showNotification('Дата окончания должна быть позже даты начала', 'error');
        return;
    }
    
    const newBooking = {
        id: Date.now().toString(),
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.image,
        renterId: currentUser.id,
        renterName: currentUser.name,
        ownerId: item.ownerId,
        ownerName: item.ownerName,
        startDate: startDate,
        endDate: endDate,
        days: days,
        totalPrice: days * item.priceDay,
        deposit: item.deposit,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    saveData();
    showNotification('Заявка на бронирование отправлена!', 'success');
    setTimeout(() => {
        window.location.href = 'bookings.html';
    }, 1500);
}

function createListing(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showNotification('Войдите в аккаунт', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    const title = document.getElementById('itemTitle').value;
    const category = document.getElementById('itemCategory').value;
    const priceDay = parseInt(document.getElementById('itemPriceDay').value);
    const deposit = parseInt(document.getElementById('itemDeposit').value);
    const description = document.getElementById('itemDescription').value;
    
    if (!title || !category || !priceDay || !deposit || !description) {
        showNotification('Заполните все поля', 'error');
        return;
    }
    
    const newItem = {
        id: Date.now().toString(),
        title: title,
        category: category,
        priceDay: priceDay,
        deposit: deposit,
        description: description,
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        rating: null,
        available: true,
        createdAt: new Date().toISOString()
    };
    
    items.push(newItem);
    saveData();
    showNotification('Объявление опубликовано!', 'success');
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
}

// ============================================
// ЗАПУСК
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔵 Сайт загружен, инициализация...');
    
    initData();
    updateNav();
    
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
    
    document.getElementById('loginFormElement')?.addEventListener('submit', login);
    document.getElementById('registerFormElement')?.addEventListener('submit', register);
    document.getElementById('createListingForm')?.addEventListener('submit', createListing);
    
    if (document.getElementById('featuredItems')) loadFeaturedItems();
    if (document.getElementById('catalogItems')) loadCatalog();
    if (document.getElementById('itemDetails')) loadItemDetails();
    
    console.log('✅ Инициализация завершена');
});
