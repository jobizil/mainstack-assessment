// Converts a string to a slug (e.g. "Product 1" to "product-1")
export function generateSlug(name: string, length: number = 6): string {
    const alphaNum = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const trimmedName = name.trim();

    const splitAndRandDigit = Array.from({ length }, () => alphaNum.charAt(Math.floor(Math.random() * alphaNum.length))).join("");
    const lowerCaseName = trimmedName.toLowerCase().replace(/\s+/g, '-');
    return `${lowerCaseName}-${splitAndRandDigit}`;
}
