/**
 * Retrieves the value of a CSS custom property (variable) from the document root.
 *
 * @param {string} name - The name of the CSS variable to retrieve.
 *                        Must include the leading `--`, e.g., '--primary-color'.
 * @returns {string | number} The computed value of the CSS variable, with leading/trailing whitespace removed.
 *
 */
export const getCssVar = (name: string): string | number => {
  const rootStyle = getComputedStyle(document.documentElement);
  const value = rootStyle.getPropertyValue(name)?.trim() || '';

  // Try to convert px, rem, em, % values to number
  const numericMatch = value.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  if (numericMatch) {
    const num = parseFloat(numericMatch[1]);
    return num;
  }

  return value;
};
