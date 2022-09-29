/**
 * This function receives a word to convert the first character too capitalize word
 */

const capitalizeWord = (word = '') => {
  // Split the word (string) into an array of strings
  const arr = word.split(" ");
  // Loop through each element of the new array and capitalize the first letter
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  // Join all the elements of the array into a string (using a separator = blankspace)
  const finalStr = arr.join(" ");
  return finalStr;
};

module.exports = capitalizeWord;