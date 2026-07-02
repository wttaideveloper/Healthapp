const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_REGEX = /^[\p{L}][\p{L}\p{M}0-9 .'-]*$/u;

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email.trim().toLowerCase());

export const isValidName = (name: string): boolean => {
  const normalized = name.trim().replace(/\s+/g, " ");
  return NAME_REGEX.test(normalized);
};
