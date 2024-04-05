/**
 * Example usage
 * var text = "Hello, World! 😀 123";
 * var shiftedText = caesarCipher(text, 3);
 * console.log(shiftedText); // Output: "Khoor, Zruog! 😀 456"
 * @param {String} str The input string to be encrypted
 * @param {Number} shift The amount of shift to be applied
 * @returns encrypted text
 */

function caesarCipher(str, shift) {
  // If shift is negative, convert it to a positive equivalent
  shift = (shift % 36 + 36) % 36;
  const library = "abcdefghijklmnopqrstuvwxyz0123456789"

  var cryptedMsg = '';
  for (let i = 0; i < str.length; i++) {
    var letter = str[i];
    // Check if the character is an alphabetic character
    if (/[a-zA-Z0-9]/.test(letter)) {
      var msg = library[(library.indexOf(letter.toLowerCase()) + shift) % 36]
      cryptedMsg += msg
    } 
    else {
      // If it's neither alphabetic nor numeric, leave it unchanged
      cryptedMsg += letter;
    }
  }
  return cryptedMsg;
}
/**
 *   // Example usage
  var encryptedText = "Khoor, Zruog! 😀 456";
  var decryptedText = caesarDecrypt(encryptedText, 3);
  console.log(decryptedText); // Output: "Hello, World! 😀 123"
 * @param {String} str The input string to be encrypted
 * @param {Number} shift The amount of negative shift to be applied
 * @returns decrypted text
 */
function caesarDecrypt(str, shift) {
  // To decrypt, just use a negative shift
  shift = (shift % 36 + 36) % 36;
  return caesarCipher(str, -shift);
}