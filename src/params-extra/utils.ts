/**
 * Check if a value is a FormData instance
 *
 * This utility function safely checks if a value is a FormData object,
 * which is only available in browser environments.
 *
 * @param value - The value to check
 * @returns True if the value is a FormData instance, false otherwise
 */
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export const isFormData = (value: any): value is FormData => typeof value === 'object' && typeof window !== 'undefined' && value instanceof FormData
