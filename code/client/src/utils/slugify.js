/**
 * Slugify a string.
 * @param {string} title - The title to slugify.
 * @returns {string} The slugified title.
 */

// function to convert a string into a URL-friendly slug (e.g., "Purpose Limitation" → "purpose_limitation"):
export default function slugify(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");
}
