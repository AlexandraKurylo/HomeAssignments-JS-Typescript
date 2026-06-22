"use strict";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 1. Клас для отримання даних з API
 */
class EmojiAPI {
    static async fetchAll() {
        const res = await fetch('https://emojihub.yurace.pro/api/all');
        if (!res.ok) throw new Error("Error loading data from API");
        return await res.json();
    }
}

/**
 * 2. Клас для побудови розмітки однієї картки
 */
class EmojiCard {
    constructor(item) {
        this.data = item;
        this.isVisible = false;
    }

    create() {
        const card = document.createElement('div');
        card.className = 'gallery__card card';

        const name = document.createElement('div');
        name.className = 'gallery__name name';
        name.textContent = this.data.name;

        const emoji = document.createElement('div');
        emoji.className = 'gallery__emoji emoji';
        emoji.style.visibility = 'hidden'; 
        
        const code = this.data.unicode?.[0] ? parseInt(this.data.unicode[0].replace('U+', ''), 16) : 0;
        emoji.textContent = code ? String.fromCodePoint(code) : '?';

        const btn = document.createElement('button');
        btn.className = 'toggleBtn';
        btn.textContent = 'Show emoji';

        btn.addEventListener('click', () => {
            this.isVisible = !this.isVisible;
            emoji.style.visibility = this.isVisible ? 'visible' : 'hidden';
            btn.textContent = this.isVisible ? 'Hide emoji' : 'Show emoji';
        });

        card.append(name, emoji, btn);
        return card;
    }
}

/**
 * 3. Клас для керування галереєю та пагінацією
 */
class EmojiManager {
    constructor(data) {
        this.data = data;
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.container = getElement('galleryContainer');
        this.pageInfo = getElement('pageInfo');
        this.prevBtn = getElement('prevBtn');
        this.nextBtn = getElement('nextBtn');

        const pagination = getElement('pagination'); 
        pagination.addEventListener('click', (event) => {
            if (event.target.id === 'prevBtn') this.changePage(-1);
            if (event.target.id === 'nextBtn') this.changePage(1);
        });
    }

    render() {
        this.container.innerHTML = '';
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const pageItems = this.data.slice(start, start + this.itemsPerPage);
        const totalPages = Math.ceil(this.data.length / this.itemsPerPage);

        pageItems.forEach(item => {
            const cardInstance = new EmojiCard(item);
            this.container.appendChild(cardInstance.create());
        });
        
        this.pageInfo.textContent = `Page ${this.currentPage}`;

        // Логіка активності кнопок
        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === totalPages;
    }

    changePage(direction) {
        const totalPages = Math.ceil(this.data.length / this.itemsPerPage);
        const newPage = this.currentPage + direction;
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.render();
        }
    }
}


/**
 * Клас для обробки та відображення помилок
 */
class ErrorHandler {
    static display(err) {
        console.error("Critical error:", err.message);
        
        const container = document.getElementById('galleryContainer');
        if (container) {
            const errorBox = document.createElement('div');
            errorBox.className = 'error-box';
            errorBox.textContent = `Sorry, an error occurred: ${err.message}`;
            
            container.innerHTML = '';
            container.appendChild(errorBox);
        }
    }
}

/**
 * Клас Loader
 */
class Loader {
    static element = document.getElementById('loader');

    static show() {
        if (this.element) this.element.style.display = 'flex';
    }

    static hide() {
        if (this.element) this.element.style.display = 'none';
    }
}

/**
 * Допоміжна функція безпечного пошуку елементів
 */
function getElement(selector) {
    const el = document.getElementById(selector);
    if (!el) throw new Error(`Element with id="${selector}" not found in DOM!`);
    return el;
}


/**
 * Ініціалізація додатку
 */
async function initializeApp() {
    Loader.show();
    try {
        const [data] = await Promise.all([
            EmojiAPI.fetchAll(),
            delay(2000) 
        ]);
        
        const manager = new EmojiManager(data);
        manager.render();
    } catch (err) {
        ErrorHandler.display(err);
    } finally {
        Loader.hide();
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);