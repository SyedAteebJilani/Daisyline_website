/* LocalStorage Persistence Wrapper */
const Storage = {
    get: (key, fallback = []) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.warn(`Storage read error [${key}]:`, e);
            return fallback;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn(`Storage write error [${key}]:`, e);
        }
    }
};
