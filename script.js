// Array of special characters to be included in password
let specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
let numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
let lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of uppercase characters to be included in password
let upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Collect all the individual arrays into an array of arrays
const allArrays = [specialCharacters, numericCharacters, lowerCasedCharacters, upperCasedCharacters];

// Flatten the array of arrays into a single array
const flatArray = allArrays.flat();

//declare and initialize global values that are used in multiple functions - will work on making them local, returning and accepting
let optionsObj = {};
let pwdLength = "";
let randomChars = [];
let charsToUse = [];
let password = "";

/* -------------------------------------------------------------------------------------------------------------------- */

// Function to prompt user for password options
function getPasswordOptions() {
  const message = "Do you want a strong unique password?"
  const askUser = confirm(message);
  const bye = "Looks like you don't want to continue. Come back when you'd like to continue. Bye."

  //Ensure that the optionsObj is empty
  optionsObj = {};

  if (askUser) {
    // Ask/prompt the user to select a length from 8 to 128 for their password
    pwdLength = parseInt(prompt("Select the password length you require - it must be from 8 to 128 characters)."));
    // Give the user 2 chances
    for (var i = 0; i < 2; i++) {
      // Validate the length
      if (isNaN(pwdLength) || pwdLength < 8 || pwdLength > 128) {
        pwdLength = parseInt(prompt("Please provide a number from 8 to 128)."));
      }
    }
    if (!pwdLength) {
      alert(bye);
      return false;
    }
  } else {
    alert(bye);
    return false;
  }
  // With the while loop, there is no limit on the number of chances the user might have, so tell them how they can leave the loop by selecting cancel
  while (true) {
    let specialChars = confirm("Do you want special characters?");
    // Confirm whether to include numbers
    let numbers = confirm("Do you want numbers?");
    // Confirm whether to include lowercase characters
    let lowerCase = confirm("Do you want lower case letters?");
    // Confirm whether to include uppercase characters
    let upperCase = confirm("Do you want upper case letters?");
    if (specialChars || numbers || lowerCase || upperCase) {
      // if at least one of the options is selected add them to the optionsObj object - the length entry/property has already been added
      optionsObj = {
        specialChars: specialChars,
        numbers: numbers,
        lowerCase: lowerCase,
        upperCase: upperCase
      }
      // add an additional property to (pwdLength) the object
      optionsObj.pwdLength = pwdLength;
      return;
    } else {
      // If no option is selected
      selectRqd = confirm("You need to select at least one of the following options. Select cancel if you don't wish to proceed.");
      if (!selectRqd) {
        alert(bye);
        return false; // tutor recommendation
      }
    }
  }
}

// the function is a bit long i.e. too many things to do, and not portable - will try to split it again but the object does not seem to travel well

/* -------------------------------------------------------------------------------------------------------------------- */

// Function for getting a random element from an array
//debugger;
function getRandom() {

  // Clear any previous values in randomChars and selectedOptions
  randomChars = [];
  // Declare and initialize these arrays as empty
  let selectedOptions = [];
  let randomIndex = [];

  // Iterate through the selected character sets and add corresponding characters to the randomChars array
  for (let i = 0; i < optionsObj.pwdLength; i++) {
    // Get a random character from the selected character set
    selectedOptions = charsToUse[Math.floor(Math.random() * charsToUse.length)];
    randomIndex = Math.floor(Math.random() * selectedOptions.length);
    randomChars.push(selectedOptions[randomIndex]);
  }

  // Join the random characters array into a string and return it
  return randomChars.join('');
}

/* -------------------------------------------------------------------------------------------------------------------- */

// Function to generate password with user input
function generatePassword() {

  // Clear any previous values in the password string and the charsToUse array
  password = '';
  charsToUse = [];
  
  // Iterate through the object to collect user-selected preferences
  for (const option in optionsObj) {
    if (optionsObj.hasOwnProperty(option) && optionsObj[option] === true) {
      // Append the selected character set to charsToUse based on user's choices
      switch (option) {
        case "specialChars":
          charsToUse.push(...specialCharacters);
          break;
        case "numbers":
          charsToUse.push(...numericCharacters);
          break;
        case "lowerCase":
          charsToUse.push(...lowerCasedCharacters);
          break;
        case "upperCase":
          charsToUse.push(...upperCasedCharacters);
          break;
      }
    }
  }

  // Using the getRandom function, generate a password based on the selected character sets
  password = getRandom();

  // Return the generated password
  return password;
}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate'); // I've used getElementById for css but querySelector works for any valid CSS selecter not just id

/* -------------------------------------------------------------------------------------------------------------------- */

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  generatePassword();

  let passwordText = document.querySelector('#password');
  passwordText.value = password;
}

/* -------------------------------------------------------------------------------------------------------------------- */

// Add event listener to generate button
generateBtn.addEventListener('click', function () {
  writePassword();
});
