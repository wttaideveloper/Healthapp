export type ValidationError = {
  key: string;
  values?: Record<string, string | number>;
  fieldKey?: string;
};

/**
 * Local validation stays as a translation identity until it reaches the UI.
 * Server/API errors remain strings so their original messages are preserved.
 */
export type DisplayError = ValidationError | string;

export const isValidationError = (
  error: DisplayError | null | undefined
): error is ValidationError => typeof error === "object" && error !== null && "key" in error;
