export function getRandomString(length = 5) {
    return Math.random().toString(36).slice(2, length + 2);
}