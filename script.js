// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

let message = "Do you want a strong unique password?"
let bye = "OK. Bye."
let length = 8,

// Collect all the individual arrays into an array of arrays
const allArrays = [specialCharacters, numericCharacters, lowerCasedCharacters, upperCasedCharacters];

/*
// Function to prompt user for password options
function getPasswordOptions() {
  return confirm(message);
}

if (getPasswordOptions()) {
  var length = parseInt(prompt("Great! Select your rquired length from 8 to 128 characters):"));
  // Validate the length input
  if (isNaN(length) || length < 8 || length > 128) {
    alert("Please enter a valid number from 8 to 128");
  } else {
    alert(bye);
  }
} else {
  alert(bye);
}
*/

// Function for getting a random element from an array
//function getRandom(arr, length) {
function getRandom(arr, length) {
  // Using the flat() method, concatenate the arrays in the array of arrays to make a one dimensional array
  const flatArray = allArrays.flat();

  // Declare and initialize an empty array to hold the randomly selected elements
  const randomChars = [];

  //using a for loop iterate through the flat array to randomize its index
  for (let i = 0; i < length; i++) {
    //randomize the flat array's index using JavaScript's random function "combo": Mathfloor(Math.random() - Math.random() returns a floating-point number greater than or equal to 0 and less than 1, and Math.floor() rounds that value down to the nearest whole number from any throughout all elements of the array
    const randomIndex = Math.floor(Math.random() * flatArray.length);

    //the indices with corresponding elements of the randomized index are then included in the empty randomChars array
    randomChars.push(flatArray[randomIndex]);
  }
  return randomChars;
}


//const randomSelection = getRandomSelection(arrayOfArrays, length);
const randoms = getRandom(allArrays, length);

// Log the result
console.log(randoms);

















/*



function renderItem() {
  let randArrIndex;
  do {
    randArrIndex = Math.floor(Math.random() * arr.length);
    //get another index if this array already have the minimum number
    //and there is another array that still didn't reach the minimum
  } while (arrCount[randArrIndex] >= minimum && arrCount.some((e) => e < minimum));

  //increase the count for the selected array index
  arrCount[randArrIndex]++;

  //now select a random Item from that array (we need its length to get a valid index)
  let randItemIndex = Math.floor(Math.random() * arr[randArrIndex].length);
  return arr[randArrIndex][randItemIndex];
}

function generateRandom() {
  let randomValue = "";
  //!! the string need to be at least equal to: minimum * arr.length
  // otherwise you will have an infinite loop
  for (let i = 0; i < 6; i++) {
    randomValue += renderItem();
  }
  return randomValue;
}
console.log(generateRandom());

// Function to prompt user for password options
function getPasswordOptions() {

}

// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {

}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
*/