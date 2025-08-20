/**
 * Retrieves the value of a CSS custom property (variable) from the document root.
 *
 * @param {string} name - The name of the CSS variable to retrieve.
 *                        Must include the leading `--`, e.g., '--primary-color'.
 * @returns {string} The computed value of the CSS variable, with leading/trailing whitespace removed.
 *
 */
export function getCssVar(name: string) {
  const root = getComputedStyle(document.documentElement);
  const value = root.getPropertyValue(name).trim();
  return value;
}
