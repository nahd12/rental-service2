// js/db-google.js
const GOOGLE_API_URL = 'https://script.google.com/macros/s/AKfycbwguH0ofpvGuPJ2vhrjlJlxf4XAs7tg3_moJDhB1oUsNYzxcsCOMLX6uLNkbMTUoqUThA/exec';

async function saveUserToGoogle(userData) {
    console.log('📤 Отправка в Google:', userData);
    try {
        const response = await fetch(GOOGLE_API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        console.log('✅ Ответ:', result);
        return result;
    } catch(error) {
        console.error('❌ Ошибка:', error);
        return { success: false, error: error.message };
    }
}

// Вход пользователя
async function loginUserGoogle(email, password) {
    try {
        const response = await fetch(GOOGLE_API_URL + '?action=login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const result = await response.json();
        return result;
    } catch(error) {
        console.error('Ошибка входа:', error);
        return { success: false, error: error.message };
    }
}

// Получение всех пользователей (для администрирования)
async function getAllUsers() {
    try {
        const response = await fetch(GOOGLE_API_URL, {
            method: 'GET',
            mode: 'cors'
        });
        
        const result = await response.json();
        return result;
    } catch(error) {
        console.error('Ошибка получения пользователей:', error);
        return { success: false, error: error.message };
    }
}
