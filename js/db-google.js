// js/db-google.js - подключение к Google Sheets

const GOOGLE_API_URL = 'ВАШ_URL_ИЗ_APPS_SCRIPT'; // Вставьте сюда ваш URL

// Регистрация пользователя
async function registerUserGoogle(userData) {
    try {
        const response = await fetch(GOOGLE_API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        return result;
    } catch(error) {
        console.error('Ошибка регистрации:', error);
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
