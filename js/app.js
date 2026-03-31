// ============================================
// АРЕНДА НА РАЗ - ЧИСТАЯ ВЕРСИЯ
// БЕЗ GOOGLE_API_URL (он только в db-google.js)
// ============================================

let currentUser = null;
let items = [];
let bookings = [];
let users = [];

// Инициализация данных из localStorage
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
                available: true
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
                available: true
            },
            {
                id: '3',
                title: 'Мангал складной',
                category: 'outdoor',
                priceDay: 500,
                deposit: 1500,
                description: 'Для пикника, в комплекте шампура',
                image: 'https://images.unsplash.com/photo-1558954138-06e851f0c4c6?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 4.7,
                available: true
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
                available: true
            }
        ];
        localStorage.setItem('items', JSON.stringify(items));
    }

    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
        bookings = JSON.parse(storedBookings);
    } else {
        bookings = [];
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
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

    if (currentUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            if (userNameSpan) userNameSpan.textContent = currentUser.name;
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNav();
    showNotification('Вы вышли из аккаунта', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 12px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        z-index: 1000;
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
        showNotification('Вход выполнен!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showNotification('Неверный email или пароль', 'error');
    }
}

async function register(event) {
    event.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('Пользователь уже существует', 'error');
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
    
    // Отправка в Google (если функция существует)
    if (typeof saveUserToGoogle === 'function') {
        try {
            await saveUserToGoogle({
                name: name,
                email: email,
                phone: phone || '',
                password: password
            });
            console.log('✅ Отправлено в Google');
        } catch(e) {
            console.log('⚠️ Ошибка Google:', e);
        }
    }
    
    showNotification('Регистрация успешна!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// ============================================
// ОСТАЛЬНЫЕ ФУНКЦИИ
// ============================================

function renderItems(containerId, itemsToRender) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!itemsToRender || itemsToRender.length === 0) {
        container.innerHTML = '<div class="text-center">Ничего не найдено</div>';
        return;
    }

    container.innerHTML = itemsToRender.map(item => `
        <div class="item-card" onclick="location.href='item-details.html?id=${item.id}'">
            <div class="item-image" style="background-image: url('${item.image}')">
                <span class="item-category">${getCategoryName(item.category)}</span>
            </div>
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-price">${item.priceDay} ₽ / день</div>
                <div class="item-deposit">Залог: ${item.deposit} ₽</div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        tools: 'Инструменты',
        clothing: 'Одежда',
        outdoor: 'Отдых',
        electronics: 'Электроника',
        sports: 'Спорт'
    };
    return categories[category] || category;
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
    const item = items.find(i => i.id === urlParams.get('id'));
    
    if (!item) {
        container.innerHTML = '<div class="text-center">Товар не найден</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="details-grid">
            <div class="details-image" style="background-image: url('${item.image}')"></div>
            <div class="details-info">
                <h1>${item.title}</h1>
                <p>${item.description}</p>
                <div class="details-price">
                    <div>Цена: ${item.priceDay} ₽/день</div>
                    <div>Залог: ${item.deposit} ₽</div>
                </div>
                <button onclick="bookItem('${item.id}')" class="btn btn-primary">
                    ${currentUser ? 'Забронировать' : 'Войдите, чтобы забронировать'}
                </button>
            </div>
        </div>
    `;
}

function bookItem(itemId) {
    if (!currentUser) {
        showNotification('Войдите в аккаунт', 'error');
        window.location.href = 'auth.html';
        return;
    }
    
    const item = items.find(i => i.id === itemId);
    const newBooking = {
        id: Date.now().toString(),
        itemId: item.id,
        itemTitle: item.title,
        renterId: currentUser.id,
        renterName: currentUser.name,
        ownerId: item.ownerId,
        ownerName: item.ownerName,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    saveData();
    showNotification('Заявка отправлена!', 'success');
    setTimeout(() => {
        window.location.href = 'bookings.html';
    }, 1500);
}

function loadBookings() {
    const container = document.getElementById('bookingsList');
    if (!container) return;
    
    if (!currentUser) {
        container.innerHTML = '<div class="text-center">Войдите в аккаунт</div>';
        return;
    }
    
    const userBookings = bookings.filter(b => b.renterId === currentUser.id);
    
    if (userBookings.length === 0) {
        container.innerHTML = '<div class="text-center">Нет бронирований</div>';
        return;
    }
    
    container.innerHTML = userBookings.map(booking => `
        <div class="booking-card">
            <h4>${booking.itemTitle}</h4>
            <p>Статус: ${booking.status}</p>
        </div>
    `).join('');
}

function loadProfile() {
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }
    
    const nameSpan = document.getElementById('profileName');
    const emailSpan = document.getElementById('profileEmail');
    if (nameSpan) nameSpan.textContent = currentUser.name;
    if (emailSpan) emailSpan.textContent = currentUser.email;
}

function createListing(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showNotification('Войдите в аккаунт', 'error');
        window.location.href = 'auth.html';
        return;
    }
    
    const newItem = {
        id: Date.now().toString(),
        title: document.getElementById('itemTitle').value,
        category: document.getElementById('itemCategory').value,
        priceDay: parseInt(document.getElementById('itemPriceDay').value),
        deposit: parseInt(document.getElementById('itemDeposit').value),
        description: document.getElementById('itemDescription').value,
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        rating: null,
        available: true
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
    initData();
    updateNav();
    
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
    
    if (document.getElementById('featuredItems')) loadFeaturedItems();
    if (document.getElementById('catalogItems')) loadCatalog();
    if (document.getElementById('itemDetails')) loadItemDetails();
    if (document.getElementById('bookingsList')) loadBookings();
    if (document.getElementById('profileName')) loadProfile();
    
    document.getElementById('createListingForm')?.addEventListener('submit', createListing);
    document.getElementById('loginFormElement')?.addEventListener('submit', login);
    document.getElementById('registerFormElement')?.addEventListener('submit', register);
});
