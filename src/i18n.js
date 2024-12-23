// src/i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        message: {
            hello: 'Hello!',
            welcome: 'Welcome to our application!'
        }
    },
    uz: {
        message: {
            hello: 'Salom!',
            welcome: 'Bizning ilovaga xush kelibsiz!'
        }
    },
    ru: {
        message: {
            hello: 'Привет!',
            welcome: 'Добро пожаловать в наше приложение!'
        }
    }
};

// Create the Vue I18n instance
const i18n = createI18n({
    locale: 'en', // default language
    messages,     // translations object
});

export default i18n;
