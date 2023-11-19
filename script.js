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
// Not needed in the end but a nice expression
//const flatArray = allArrays.flat();

// Declare and initialize global values that are used in and shared among multiple functions
let optionsObj = {};
let pwdLength = "";
let randomChars = [];
let charsToUse = [];
let password = "";

/* -------------------------------------------------------------------------------------------------------------------- */

// Function to prompt user for password options

function getPasswordOptions() {
  const message = "Do you want a strong unique password?"

  const bye = "Looks like you don't want to continue. Come back when you'd like to continue. Bye."

  //Ensure that the optionsObj is empty
  optionsObj = {};

  // A prompt asking the user whether they want a password. If they click ok, the process starts
  const askUser = confirm(message);

  if (askUser) {
    // Ask/prompt the user to select a length from 8 to 128 for their password
    pwdLength = parseInt(prompt("Select the password length you require - it must be from 8 to 128 characters."));
    // Give the user 2 chances and use a for loop to count them
    for (var i = 0; i < 2; i++) {
      // Validate the length - if too long or too short repeat the question twice
      if (isNaN(pwdLength) || pwdLength < 8 || pwdLength > 128) {
        pwdLength = parseInt(prompt("Please provide a number from 8 to 128)."));
      }
    }
    // If the user cancels more than twice they are given an alert modal with a goodbye message, to which they must click ok and the program stops
    if (!pwdLength) {
      alert(bye);
      return false;
    }
    // If the user cancels this message, they are given an alert modal with a goodbye message, to which they must click ok and the program stops
  } else {
    alert(bye);
    return false;
  }
  // With the while loop, there is no limit on the number of chances the user might have, so tell the user how they can leave the loop by selecting cancel
  while (true) {
    // The following booleans will become object (optionsObj) properties. At least one of these four must be sectioned i.e. at least one value of true
    let specialChars = confirm("Do you want special characters?");
    // Confirm whether to include numbers
    let numbers = confirm("Do you want numbers?");
    // Confirm whether to include lowercase characters
    let lowerCase = confirm("Do you want lower case letters?");
    // Confirm whether to include uppercase characters
    let upperCase = confirm("Do you want upper case letters?");
    if (specialChars || numbers || lowerCase || upperCase) {
      // if at least one of the options is selected add them to the optionsObj object - the pwdLength numeric entry/property will be added afterwards
      optionsObj = {
        specialChars: specialChars,
        numbers: numbers,
        lowerCase: lowerCase,
        upperCase: upperCase
      }
      // Add an additional property to (pwdLength) the object
      optionsObj.pwdLength = pwdLength;
      return;
    } else {
      // If no option is selected then the confirm modal appears - it will continue until at least one option is selected or cancel is selected.
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

// I would normally keep this out of production code, but it was part of my tutor assisted foray into debugging
//debugger;

function getRandom() {

  // Clear any previous values in randomChars and selectedOptions otherwise they persist in subsequent progrom starts
  randomChars = [];
  // Declare and initialize these arrays as empty
  let selectedOptions = [];
  let randomIndex = [];

  // Iterate through the selected character sets and add corresponding characters to the randomChars array
  for (let i = 0; i < optionsObj.pwdLength; i++) {
    // Get random characters (selectedOptions) from the charsToUse array (declared and initialized in the calling function generatePassword()) which were derived from the user-selected character set options
    selectedOptions = charsToUse[Math.floor(Math.random() * charsToUse.length)];
    // Then randomly selects one character from the selected character set(s) and add it to the randomIndex array up to the user-selected password length
    randomIndex = Math.floor(Math.random() * selectedOptions.length);
    // Inditialize the randomChars array with the randomly selected character
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
  
  // Using a "for in" loop iterate through the object to collect the user-selected preferences from the optionsObj
  for (const option in optionsObj) {
    if (optionsObj.hasOwnProperty(option) && optionsObj[option] === true) {
      // Using a swich statement, append the selected character set to charsToUse based on user's choices
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

  // Return the generated password no longer required - as the password is now a global variable 
  return;
}

/* -------------------------------------------------------------------------------------------------------------------- */

// Function to add interactive toggle password and copy password feature which works even when the password is hidden 
function togglePwd() {
  const togglePassword = document.querySelector("#togglePassword"); // I've used querySelector here rather than getElementById as it is used in the provided code
  const password2 = document.querySelector("#password"); // There is already a variable called "password"
  const passwordText = document.querySelector("#passwordText");
  const copyButton = document.querySelector("#copy");

  togglePassword.addEventListener("click", function(){
    // The default is that the password characters are displayed. Toggle the input element's type attribute "text" (characters are displayed) to "password" (characters are hidden from prying eyes). Then the reverse - "password"(hidden) to text (displayed) .
    const type = password2.getAttribute("type") === "password" ? "text" : "password";
    password2.setAttribute("type", type);

    // Toggle the icon from an open eye to a closed one - just because I like it - in both statements the "this" keyword refers here to the "togglePassword" element
    this.querySelector("i").classList.toggle("bi-eye");
    this.querySelector("i").classList.toggle("bi-eye-slash");

    // This is a "ternary operator" in which a condition is followed by a question mark (?), an expression if the condition is true, then the expression if the condition is false  
    const newText = type === "password" ? "View password" : "Hide password";
    passwordText.textContent = newText;
  });

  // Especially helpful if the text extends beyond the screen display
  copyButton.addEventListener("click", function(){
    // copy the generated password
    password2.select();
    document.execCommand('copy');
    alert("Copied!");
  });

}

/* -------------------------------------------------------------------------------------------------------------------- */

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  generatePassword();
  togglePwd();
  let passwordText = document.querySelector('#password');
  passwordText.value = password;
}

/* -------------------------------------------------------------------------------------------------------------------- */

// Get references to the #generate element
const generateBtn = document.querySelector('#generate'); // I've used getElementById for css but querySelector works for any valid CSS selecter not just id


// Add event listener to generate button
generateBtn.addEventListener('click', function() {
  writePassword();
});
