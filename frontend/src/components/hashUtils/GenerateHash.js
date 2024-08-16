/**
 * Generates a SHA-256 hash for a given file.
 * @param {File} file - The file to hash.
 * @returns {Promise<string>} - The hexadecimal hash of the file.
 */
export async function generateHash(file) {
    if (!(file instanceof File)) {
      throw new TypeError('The provided object is not a valid File.');
    }
    
    const fileArrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', fileArrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  