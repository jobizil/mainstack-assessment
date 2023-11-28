"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = void 0;
function generateSlug(name, length = 6) {
    const alphaNum = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const trimmedName = name.trim();
    const splitAndRandDigit = Array.from({ length }, () => alphaNum.charAt(Math.floor(Math.random() * alphaNum.length))).join("");
    const lowerCaseName = trimmedName.toLowerCase().replace(/\s+/g, '-');
    return `${lowerCaseName}-${splitAndRandDigit}`;
}
exports.generateSlug = generateSlug;
//# sourceMappingURL=slug-generator.js.map