// Miscellaneous utilities

/**
 * Sort an array of objects having the same string property
 * @param {Array} array - The array to be sorted
 * @param {string|string[]]} fields - The name or names of the attributes to be compared between array elements
 * @returns {Array} - The sorted array
 */
function sortObjectArrayBy(array, fields) {
  return typeof fields === 'string'
    ? array.sort((a, b) => a[fields].localeCompare(b[fields]))
    : array.sort((a, b) => fields.map(f => a[f]).join(' ').localeCompare(fields.map(f => b[f]).join(' ')));
}

module.exports = { sortObjectArrayBy };
