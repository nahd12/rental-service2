// ============================================
// OneTime - полная рабочая версия
// ============================================

let currentUser = null;
let items = [];
let bookings = [];
let users = [];

function initData() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        users = [{
            id: '1',
            name: 'Демо Пользователь',
            email: 'demo@example.com',
            password: '123456',
            phone: '+7 900 123-45-67',
            address: 'г. Москва',
            rating: 4.8,
            createdAt: new Date().toISOString()
        }];
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

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 12px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        z-index: 9999;
        font-weight: 500;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
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
    setTimeout(() => window.location.href = 'index.html', 500);
}

function renderItems(containerId, itemsToRender) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!itemsToRender || itemsToRender.length === 0) {
        container.innerHTML = '<div class="text-center">Ничего не найдено</div>';
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
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = { tools: 'Инструменты', clothing: 'Одежда', outdoor: 'Отдых', electronics: 'Электроника', sports: 'Спорт' };
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
    
    const imageInput = document.getElementById('itemImage');
    const imageFile = imageInput && imageInput.files.length > 0 ? imageInput.files[0] : null;
    
    function saveItem(imageData) {
        const newItem = {
            id: Date.now().toString(),
            title: title,
            category: category,
            priceDay: priceDay,
            deposit: deposit,
            description: description,
            image: imageData || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
            ownerId: currentUser.id,
            ownerName: currentUser.name,
            rating: null,
            available: true,
            createdAt: new Date().toISOString()
        };
        items.push(newItem);
        saveData();
        showNotification('Объявление опубликовано!', 'success');
        setTimeout(() => window.location.href = 'profile.html', 1500);
    }
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = e => saveItem(e.target.result);
        reader.onerror = () => saveItem(null);
        reader.readAsDataURL(imageFile);
    } else {
        saveItem(null);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateNav();
    
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
    
    document.getElementById('loginFormElement')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            saveData();
            showNotification('Вход выполнен!', 'success');
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            showNotification('Неверный email или пароль', 'error');
        }
    });
    
    document.getElementById('registerFormElement')?.addEventListener('submit', (e) => {
        e.preventDefault();
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
        showNotification('Регистрация успешна!', 'success');
        setTimeout(() => window.location.href = 'index.html', 1500);
    });
    
    if (document.getElementById('featuredItems')) loadFeaturedItems();
    if (document.getElementById('catalogItems')) loadCatalog();
    
    document.getElementById('createListingForm')?.addEventListener('submit', createListing);
});
