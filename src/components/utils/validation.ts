const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email.trim().toLowerCase());
