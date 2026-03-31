// js/db-google.js
// ⚠️ ВСТАВЬТЕ ВАШ URL ИЗ GOOGLE APPS SCRIPT ⚠️
const GOOGLE_API_URL = 'https://script.google.com/macros/s/AKfycbweCBHNsTv3SMAunijB24YIpvUHKu6KtT0CeNjxpynwhMV3UUq4VdVWzct9OyL5o2iBFw/exec';

async function saveUserToGoogle(userData) {
    console.log('📤 Отправка в Google Таблицу:', userData);
    
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
        console.log('✅ Ответ Google:', result);
        return result;
        
    } catch(error) {
        console.error('❌ Ошибка отправки:', error);
        return { success: false, error: error.message };
    }
}
