// ============================================
// ДАННЫЕ
// ============================================

let currentUser = null;
let items = [];
let bookings = [];
let users = [];

// Инициализация данных из localStorage
function initData() {
    // Загружаем пользователей
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
                address: 'г. Москва, ул. Примерная, д. 1',
                rating: 4.8,
                reviewsCount: 12,
                listingsCount: 3,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Загружаем товары
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
    } else {
        items = [
            {
                id: '1',
                title: 'Перфоратор Makita HR2470',
                category: 'tools',
                condition: 'good',
                priceHour: 150,
                priceDay: 800,
                deposit: 3000,
                description: 'Мощный перфоратор для сверления бетона, кирпича. В комплекте 3 бура. Идеален для ремонта на один день.',
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 4.9,
                reviews: [
                    { user: 'Алексей', rating: 5, text: 'Отличный инструмент, всё работает как надо!' }
                ],
                pickupAvailable: true,
                deliveryAvailable: false,
                address: 'г. Москва, ул. Примерная, д. 1',
                available: true,
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'Костюм для фотосессии (мужской)',
                category: 'clothing',
                condition: 'new',
                priceHour: 300,
                priceDay: 1200,
                deposit: 5000,
                description: 'Стильный классический костюм для фотосессии. Размер M (48). Идеален для выпускных, свадеб, деловых фото.',
                image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 5.0,
                reviews: [
                    { user: 'Мария', rating: 5, text: 'Костюм супер, фотографии получились отличные!' }
                ],
                pickupAvailable: true,
                deliveryAvailable: true,
                address: 'г. Москва, ул. Примерная, д. 1',
                available: true,
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                title: 'Мангал складной большой',
                category: 'outdoor',
                condition: 'good',
                priceHour: 100,
                priceDay: 500,
                deposit: 1500,
                description: 'Складной мангал для пикника. Размер 80x40 см. В комплекте шампура 6 шт. Легко помещается в багажник.',
                image: 'https://images.unsplash.com/photo-1558954138-06e851f0c4c6?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 4.7,
                reviews: [
                    { user: 'Дмитрий', rating: 5, text: 'Отличный мангал, шашлык получился на славу!' }
                ],
                pickupAvailable: true,
                deliveryAvailable: true,
                address: 'г. Москва, ул. Примерная, д. 1',
                available: true,
                createdAt: new Date().toISOString()
            },
            {
                id: '4',
                title: 'Проектор XGIMI Halo+',
                category: 'electronics',
                condition: 'new',
                priceHour: 200,
                priceDay: 1000,
                deposit: 15000,
                description: 'Портативный проектор для домашнего кинотеатра. Поддержка 4K, встроенный Android TV. Отличное качество картинки.',
                image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 5.0,
                reviews: [
                    { user: 'Елена', rating: 5, text: 'Кино на стене - это невероятно! Спасибо!' }
                ],
                pickupAvailable: true,
                deliveryAvailable: false,
                address: 'г. Москва, ул. Примерная, д. 1',
                available: true,
                createdAt: new Date().toISOString()
            },
            {
                id: '5',
                title: 'Набор для пикника (посуда, плед)',
                category: 'outdoor',
                condition: 'new',
                priceHour: 80,
                priceDay: 400,
                deposit: 1000,
                description: 'Полный набор для пикника: плед, тарелки, стаканы, столовые приборы на 4 персоны, термос.',
                image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
                ownerId: '1',
                ownerName: 'Демо Пользователь',
                rating: 4.8,
                reviews: [],
                pickupAvailable: true,
                deliveryAvailable: true,
                address: 'г. Москва, ул. Примерная, д. 1',
                available: true,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('items', JSON.stringify(items));
    }

    // Загружаем бронирования
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
        bookings = JSON.parse(storedBookings);
    } else {
        bookings = [];
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    // Проверяем авторизацию
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// Сохранение данных
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

// ============================================
// UI ФУНКЦИИ
// ============================================

// Обновление навигации в зависимости от авторизации
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

// Выход из аккаунта
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNav();
    showNotification('Вы вышли из аккаунта', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
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
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Рендер карточек товаров
function renderItems(containerId, itemsToRender, showLink = true) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!itemsToRender || itemsToRender.length === 0) {
        container.innerHTML = '<div class="text-center" style="grid-column: 1/-1;">Ничего не найдено</div>';
        return;
    }

    container.innerHTML = itemsToRender.map(item => `
        <div class="item-card" onclick="${showLink ? `location.href='item-details.html?id=${item.id}'` : ''}">
            <div class="item-image" style="background-image: url('${item.image}')">
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

// Загрузка популярных товаров на главную
function loadFeaturedItems() {
    if (document.getElementById('featuredItems')) {
        const featured = items.slice(0, 4);
        renderItems('featuredItems', featured);
    }
}

// Загрузка каталога с фильтрами
function loadCatalog() {
    const container = document.getElementById('catalogItems');
    if (!container) return;

    let filteredItems = [...items];
    
    // Категория
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    if (selectedCategory && selectedCategory.value) {
        filteredItems = filteredItems.filter(item => item.category === selectedCategory.value);
    }
    
    // Цена
    const maxPrice = parseInt(document.getElementById('priceRange')?.value || 5000);
    if (maxPrice) {
        filteredItems = filteredItems.filter(item => item.priceDay <= maxPrice);
    }
    
    // Рейтинг
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating && selectedRating.value > 0) {
        filteredItems = filteredItems.filter(item => (item.rating || 0) >= parseFloat(selectedRating.value));
    }
    
    // Сортировка
    const sortBy = document.getElementById('sortBy')?.value;
    if (sortBy === 'price_asc') {
        filteredItems.sort((a, b) => a.priceDay - b.priceDay);
    } else if (sortBy === 'price_desc') {
        filteredItems.sort((a, b) => b.priceDay - a.priceDay);
    } else if (sortBy === 'rating') {
        filteredItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    renderItems('catalogItems', filteredItems, true);
    
    const countSpan = document.getElementById('itemsCount');
    if (countSpan) {
        countSpan.textContent = `${filteredItems.length} товаров`;
    }
}

// Загрузка детальной страницы товара
function loadItemDetails() {
    const container = document.getElementById('itemDetails');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const item = items.find(i => i.id === itemId);
    
    if (!item) {
        container.innerHTML = '<div class="text-center">Товар не найден</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="details-grid">
            <div class="details-image" style="background-image: url('${item.image}')"></div>
            <div class="details-info">
                <h1>${item.title}</h1>
                <div class="item-rating">
                    <i class="fas fa-star"></i>
                    <span>${item.rating || 'Новый'} (${item.reviews?.length || 0} отзывов)</span>
                </div>
                <p style="margin: 16px 0; color: var(--text-muted);">${item.description}</p>
                <div class="details-price">
                    <div class="price-row">
                        <span>Почасовая аренда:</span>
                        <span class="price">${item.priceHour} ₽/час</span>
                    </div>
                    <div class="price-row">
                        <span>Аренда на день:</span>
                        <span class="price">${item.priceDay} ₽/день</span>
                    </div>
                    <div class="deposit-row">
                        <span>Залог: ${item.deposit} ₽ (возвращается после аренды)</span>
                    </div>
                </div>
                <div class="booking-card">
                    <h3>Забронировать</h3>
                    <input type="date" id="startDate" class="date-picker" placeholder="Дата начала">
                    <input type="date" id="endDate" class="date-picker" placeholder="Дата окончания">
                    <div id="totalPrice" class="total-price"></div>
                    <button onclick="bookItem('${item.id}')" class="btn btn-primary btn-full" ${!currentUser ? 'disabled' : ''}>
                        ${currentUser ? 'Забронировать' : 'Войдите, чтобы забронировать'}
                    </button>
                </div>
            </div>
        </div>
        <div class="reviews-section">
            <h3>Отзывы (${item.reviews?.length || 0})</h3>
            ${item.reviews && item.reviews.length > 0 ? item.reviews.map(review => `
                <div class="review-card">
                    <div class="review-header">
                        <span class="reviewer-name">${review.user}</span>
                        <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                    </div>
                    <div class="review-text">${review.text}</div>
                </div>
            `).join('') : '<p>Пока нет отзывов</p>'}
        </div>
    `;
    
    // Расчет цены
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const totalSpan = document.getElementById('totalPrice');
    
    function calculateTotal() {
        if (startDateInput.value && endDateInput.value) {
            const start = new Date(startDateInput.value);
            const end = new Date(endDateInput.value);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            if (days > 0) {
                const total = days * item.priceDay;
                totalSpan.innerHTML = `<strong>Итого: ${total} ₽ + залог ${item.deposit} ₽</strong>`;
            } else {
                totalSpan.innerHTML = '';
            }
        }
    }
    
    if (startDateInput) startDateInput.addEventListener('change', calculateTotal);
    if (endDateInput) endDateInput.addEventListener('change', calculateTotal);
}

// Бронирование товара
function bookItem(itemId) {
    if (!currentUser) {
        showNotification('Войдите в аккаунт', 'error');
        window.location.href = 'auth.html';
        return;
    }
    
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) {
        showNotification('Выберите даты аренды', 'error');
        return;
    }
    
    const item = items.find(i => i.id === itemId);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * item.priceDay;
    
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
        totalPrice: totalPrice,
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

// Загрузка бронирований
function loadBookings() {
    const container = document.getElementById('bookingsList');
    if (!container) return;
    
    if (!currentUser) {
        container.innerHTML = '<div class="text-center">Войдите, чтобы просмотреть бронирования</div>';
        return;
    }
    
    const activeTab = document.querySelector('.booking-tab.active')?.dataset.status || 'active';
    let userBookings = bookings.filter(b => b.renterId === currentUser.id || b.ownerId === currentUser.id);
    
    if (activeTab === 'active') {
        userBookings = userBookings.filter(b => b.status === 'confirmed');
    } else if (activeTab === 'pending') {
        userBookings = userBookings.filter(b => b.status === 'pending');
    } else if (activeTab === 'completed') {
        userBookings = userBookings.filter(b => b.status === 'completed');
    } else if (activeTab === 'cancelled') {
        userBookings = userBookings.filter(b => b.status === 'cancelled');
    }
    
    if (userBookings.length === 0) {
        container.innerHTML = '<div class="text-center">Нет бронирований</div>';
        return;
    }
    
    container.innerHTML = userBookings.map(booking => `
        <div class="booking-card">
            <div class="booking-info">
                <h4>${booking.itemTitle}</h4>
                <p>${formatDate(booking.startDate)} - ${formatDate(booking.endDate)} (${booking.days} дн.)</p>
                <p>Сумма: ${booking.totalPrice} ₽ | Залог: ${booking.deposit} ₽</p>
                <span class="booking-status status-${booking.status}">${getStatusText(booking.status)}</span>
            </div>
            <div class="booking-actions">
                ${booking.status === 'pending' && booking.ownerId === currentUser.id ? `
                    <button onclick="updateBookingStatus('${booking.id}', 'confirmed')" class="btn-confirm">Подтвердить</button>
                    <button onclick="updateBookingStatus('${booking.id}', 'cancelled')" class="btn-cancel">Отклонить</button>
                ` : ''}
                ${booking.status === 'confirmed' && booking.renterId === currentUser.id ? `
                    <button onclick="updateBookingStatus('${booking.id}', 'completed')" class="btn-confirm">Завершить</button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function updateBookingStatus(bookingId, status) {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = status;
        saveData();
        showNotification(`Статус бронирования обновлен: ${getStatusText(status)}`, 'success');
        loadBookings();
    }
}

function getStatusText(status) {
    const statuses = {
        pending: 'Ожидает подтверждения',
        confirmed: 'Активна',
        completed: 'Завершена',
        cancelled: 'Отменена'
    };
    return statuses[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Загрузка профиля
function loadProfile() {
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }
    
    const nameSpan = document.getElementById('profileName');
    const emailSpan = document.getElementById('profileEmail');
    const listingsCountSpan = document.getElementById('listingsCount');
    const reviewsCountSpan = document.getElementById('reviewsCount');
    const ratingSpan = document.getElementById('ratingValue');
    
    if (nameSpan) nameSpan.textContent = currentUser.name;
    if (emailSpan) emailSpan.textContent = currentUser.email;
    if (listingsCountSpan) listingsCountSpan.textContent = items.filter(i => i.ownerId === currentUser.id).length;
    if (reviewsCountSpan) reviewsCountSpan.textContent = currentUser.reviewsCount || 0;
    if (ratingSpan) ratingSpan.textContent = currentUser.rating || 'Нет';
    
    // Загружаем объявления пользователя
    const userListings = items.filter(i => i.ownerId === currentUser.id);
    const listingsContainer = document.getElementById('userListings');
    if (listingsContainer) {
        if (userListings.length === 0) {
            listingsContainer.innerHTML = '<div class="text-center">У вас пока нет объявлений. <a href="create-listing.html">Создать объявление</a></div>';
        } else {
            listingsContainer.innerHTML = userListings.map(item => `
                <div class="listing-item">
                    <div class="listing-info">
                        <h4>${item.title}</h4>
                        <p>${item.priceDay} ₽/день | Залог: ${item.deposit} ₽</p>
                    </div>
                    <div class="listing-actions">
                        <button onclick="deleteListing('${item.id}')" style="color: var(--danger);"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Настройки профиля
    const editName = document.getElementById('editName');
    const editPhone = document.getElementById('editPhone');
    const editAddress = document.getElementById('editAddress');
    if (editName) editName.value = currentUser.name || '';
    if (editPhone) editPhone.value = currentUser.phone || '';
    if (editAddress) editAddress.value = currentUser.address || '';
}

function deleteListing(itemId) {
    if (confirm('Удалить объявление?')) {
        items = items.filter(i => i.id !== itemId);
        saveData();
        showNotification('Объявление удалено', 'success');
        loadProfile();
    }
}

// Создание объявления
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
        condition: document.getElementById('itemCondition').value,
        priceHour: parseInt(document.getElementById('itemPriceHour').value) || 0,
        priceDay: parseInt(document.getElementById('itemPriceDay').value),
        deposit: parseInt(document.getElementById('itemDeposit').value),
        description: document.getElementById('itemDescription').value,
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        rating: null,
        reviews: [],
        pickupAvailable: document.getElementById('pickupAvailable').checked,
        deliveryAvailable: document.getElementById('deliveryAvailable').checked,
        address: document.getElementById('itemAddress').value,
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

// Авторизация
// Вход в аккаунт (рабочая версия)
function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Ищем пользователя в массиве users
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

// Регистрация нового пользователя (рабочая версия)
function register(event) {
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
    
    // Проверяем, существует ли пользователь
    if (users.find(u => u.email === email)) {
        showNotification('Пользователь с таким email уже существует', 'error');
        return;
    }
    
    // Создаем нового пользователя
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        phone: phone || '',
        address: '',
        rating: null,
        reviewsCount: 0,
        listingsCount: 0,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    currentUser = newUser;
    saveData();
    
    showNotification('Регистрация успешна!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Поиск на главной
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            const category = categoryFilter?.value || '';
            let filtered = items;
            
            if (query) {
                filtered = filtered.filter(item => item.title.toLowerCase().includes(query));
            }
            if (category) {
                filtered = filtered.filter(item => item.category === category);
            }
            
            localStorage.setItem('searchResults', JSON.stringify(filtered));
            window.location.href = 'catalog.html';
        });
    }
}

// Обработка поиска на каталоге
function handleCatalogSearch() {
    const savedResults = localStorage.getItem('searchResults');
    if (savedResults && document.getElementById('catalogItems')) {
        const results = JSON.parse(savedResults);
        if (results.length > 0) {
            renderItems('catalogItems', results, true);
            const countSpan = document.getElementById('itemsCount');
            if (countSpan) countSpan.textContent = `${results.length} товаров`;
        }
        localStorage.removeItem('searchResults');
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateNav();
    
    // Настройка кнопки выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    // Загрузка компонентов в зависимости от страницы
    if (document.getElementById('featuredItems')) loadFeaturedItems();
    if (document.getElementById('catalogItems')) {
        loadCatalog();
        handleCatalogSearch();
        
        // Фильтры на каталоге
        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                document.getElementById('priceValue').textContent = e.target.value + ' ₽';
                loadCatalog();
            });
        }
        
        const filterInputs = document.querySelectorAll('input[name="category"], input[name="rating"], #sortBy');
        filterInputs.forEach(input => {
            input.addEventListener('change', () => loadCatalog());
        });
        
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                document.querySelectorAll('input[name="category"]').forEach(i => i.checked = false);
                document.querySelectorAll('input[name="rating"]').forEach(i => i.checked = false);
                if (priceRange) priceRange.value = 5000;
                document.getElementById('priceValue').textContent = '5000 ₽';
                document.getElementById('sortBy').value = 'default';
                loadCatalog();
            });
        }
    }
    
    if (document.getElementById('itemDetails')) loadItemDetails();
    if (document.getElementById('bookingsList')) loadBookings();
    if (document.getElementById('profileName')) loadProfile();
    
    // Форма создания объявления
    const createForm = document.getElementById('createListingForm');
    if (createForm) {
        createForm.addEventListener('submit', createListing);
    }
    
    // Формы авторизации
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
    
    const registerForm = document.getElementById('registerFormElement');
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }
    
    // Переключение табов авторизации
    const authTabs = document.querySelectorAll('.auth-tab');
    if (authTabs.length) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
                document.getElementById(tab.dataset.auth + 'Form').classList.add('active');
            });
        });
    }
    
    // Переключение табов профиля
    const profileTabs = document.querySelectorAll('.tab-btn');
    if (profileTabs.length) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                profileTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
            });
        });
    }
    
    // Переключение табов бронирований
    const bookingTabs = document.querySelectorAll('.booking-tab');
    if (bookingTabs.length) {
        bookingTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                bookingTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                loadBookings();
            });
        });
    }
    
    // Категории на главной
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                localStorage.setItem('searchCategory', category);
                window.location.href = 'catalog.html';
            });
        });
    }
    
    // Поиск на главной
    setupSearch();
    
    // Загрузка категории из localStorage на каталог
    const savedCategory = localStorage.getItem('searchCategory');
    if (savedCategory && document.getElementById('catalogItems')) {
        const categoryRadio = document.querySelector(`input[name="category"][value="${savedCategory}"]`);
        if (categoryRadio) {
            categoryRadio.checked = true;
            loadCatalog();
        }
        localStorage.removeItem('searchCategory');
    }
    
    // Обработка загрузки фото
    const imageUpload = document.querySelector('.image-upload');
    if (imageUpload) {
        imageUpload.addEventListener('click', () => {
            document.getElementById('itemImage').click();
        });
        
        const imageInput = document.getElementById('itemImage');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const preview = document.getElementById('imagePreview');
                        preview.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; max-height: 150px; border-radius: 8px;">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    // Сохранение настроек профиля
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentUser) {
                currentUser.name = document.getElementById('editName').value;
                currentUser.phone = document.getElementById('editPhone').value;
                currentUser.address = document.getElementById('editAddress').value;
                
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    users[userIndex] = currentUser;
                }
                saveData();
                showNotification('Профиль обновлен', 'success');
                loadProfile();
            }
        });
    }
});
