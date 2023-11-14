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
let bye = "Looks like you don't want to continue. Come back when you'd like to continue. Bye."

// Collect all the individual arrays into an array of arrays
const allArrays = [specialCharacters, numericCharacters, lowerCasedCharacters, upperCasedCharacters];

// Flatten the array of arrays into a single array
const flatArray = allArrays.flat();

const randomChars = [];

const optionsObj = {};

let password = '';

// Function to prompt user for password options
function getPasswordOptions() {
  let askUser = confirm("Do you want a strong password?");

  if (askUser) {
    // Ask/prompt the user to select a length from 8 to 128 for their password
    let length = parseInt(prompt("Select the password length you require - it must be from 8 to 128 characters):"));
    for (var i = 0; i < 3; i++) {
      // Validate the length given by the user 3 chances
      if (!isNaN(length) && length >= 8 && length < 128) {
        // tutor assistance to get out of the loop and function
        if (getMoreOptions() === false) {
          return;
        }
      } else {
        length = parseInt(prompt("Please provide a number from 8 to 128):"));
      }
    } alert(bye);
    return;

    function getMoreOptions() {
      for (var i = 0; i < 1; i++) {
        // Confirm whether to include special characters
        let specialChars = confirm("Do you want special characters?");
        // Confirm whether to include numbers
        let numbers = confirm("Do you want numbers?");
        // Confirm whether to include lowercase characters
        let lowerCase = confirm("Do you want lower case letters?");
        // Confirm whether to include uppercase characters
        let upperCase = confirm("Do you want upper case letters?");
        if (specialChars || numbers || lowerCase || upperCase) {
          // if at least one of the options is selected return an object
          optionsObj = {
            length: length,
            specialChars: specialChars,
            numbers: numbers,
            lowerCase: lowerCase,
            upperCase: upperCase
          }
          return optionsObj;
        } else {
          selectRqd = confirm("You need to select at least one of the following options:")
          if (!selectRqd) {
            alert(bye);
            return false; // tutor recommendation
          }
        }
      }
    }
  } else {
    alert(bye);
    return;
} 
}

// Function for getting a random element from an array
debugger;
function getRandom(arr, count) {
  randomChars = []; // may need const
  // Using a for loop, initialize randomChars array, generate a random index, and add corresponding characters to the randomChars array
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * flatArray.length);
    randomChars.push(arr[randomIndex]);
  }
  return randomChars; // may not be necessary
}

// Function to generate password with user input
function generatePassword(arr, obj) {
  password = ''; //may need let
  // using a for loop interate through the object to collect user selected preferences
  for (const option in obj) {
    if (obj[option]) {
      const charsToUse =
        option === 'specialChars' ? specialCharacters :
        option === 'numbers' ? numericCharacters :
        option === 'lowerCase' ? lowerCasedCharacters :
        option === 'upperCase' ? upperCasedCharacters : [];

      // Get a random character from the selected character set
      const aRandomChar = getRandom(charsToUse, 1)[0];
      password += aRandomChar;
    }
  }
}

getPasswordOptions();

generatePassword(randomChars, optionsObj);




/*

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
