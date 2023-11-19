# Password-Generator


## Module 5 Challenge - Intermediate JavaScript: Password Generator

### Preliminary notes (15/11/2023) index.html and styles.css:


1.	The provided HTML (index.html) validated using the W3C Validator - https://validator.w3.org/ - no errors or alerts.


    In subsequent checks, validation showed several errors caused by incorrectly writing input type = “type”. Fixed by correcting the error – input type=”text”. This had not prevented the app from working for me but, of course, it could cause difficulties for other users. Validation is a helpful tool.


    18/11/2023 - with all my changes it still validates without errors or alerts. 


2.	The WebAim/WAVE https://wave.webaim.org/  tool passed the original HTML (index.html) with no errors or alerts 


    19/11/2023 – with my changes it gives two alerts (orphaned form labels). Label for = “” because the elements are not form elements (even if placed within <form></form> tags)  


3.	CSS Validation https://jigsaw.w3.org/css-validator/ throws one error for style.css -


        : .btn 	Too many values or values are not recognized : rgb(0, 0, 0, 0.1) 0 1px 6px 0 rgb(0, 0, 0, 0.2) 0 1px 1px 0 


    Is this error because the CSS validator has not been updated yet to accept the rgba extension of the rgb color model?


    19/11/2023 – A Google search found that the code was missing a comma separator between the rgba values of the two shadows https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow


	Once the code was changed, the validator showed no errors or alerts.


    CSS validation also gave warnings about the vendor expressions -webkit-appearance and -moz-appearance . But as CSS Tricks https://css-tricks.com/almanac/properties/a/appearance/ points out “This (appearance) is starting to be unprefixed, which is great because the cross-browser story here is very complicated.”


4.	I was curious. Why as it’s called a “secure password” is that there no “Hide password” password feature in the project requirements as an element of security

    18/11/2023 – I mentioned this in class, having viewed numerous online “Password Generator” apps that don’t do this. While our instructor, Husman, gave a good explanation, once I completed the required project tasks I thought I’d include a “hide password” feature – just in case someone would be looking over your shoulder while you were using the app and also I liked the eye open and shut icons. What the other Password Generators did inlclude was a copy feature. So, I thought, I'll have that too.

5.	Finally, the html page looked strange having a form element (button) but not the container tags <form></form> even though the code validated*. So to give the page more structure I added them. I also removed a extraneous <div></div> replacing it with <main></main> I then changed my mind and removed the form tags, as the form element (container) reduced the space available for the inline icons squeezing them out of shape.

---

### User Interaction Code First - script.js

1.	Early on in the project, I flattened four arrays into non-breaking strings. While VSCode allowed me to collapse them, they didn’t stay collapsed, and scrolling and scrolling past them was tedious.


2.	I changed the var variable to const for arrays and other variables that do not change, and let for those variables such as the string “password” that are expected to change. Const and let had their scope restrictions but I think it makes for more robust code.

---

3.	I began coding the user interaction, first for the length they wanted for the password, with a confirm and a prompt message(popups/modals), and validating their input using if statements, and error handling.


    When the user clicks the Generate Password button, The function GetPasswordOptions is called.


    A confirm modal (askUser) is presented to the user. 



4.	If the user presses cancel on the first confirm modal (askUser), an alert (bye) is triggered with the message: "Looks like you don't want to continue. Come back when you'd like to continue. Bye.". The app is then exited (returned from the function). 



5.	If the user selects ok, a prompt modal is then presented with the request "Select the password length you require - it must be from 8 to 128 characters." If the user selects cancel, they are given two more chances and then an alert (bye) is triggered with the message: "Looks like you don't want to continue. Come back when you'd like to continue. Bye.". The app is then exited (return from the function). 

---

6.	If the user selects a value, using an if statement their choice is validated. If the value is a letter(char) or string, or the number they give is less than 8 or greater than 128, they given two more changes to make the correct choice. If at the third option they don’t give the correct value or select cancel, then an alert (bye) is triggered with the message: "Looks like you don't want to continue. Come back when you'd like to continue. Bye.". The app is then exited (return from the function). 

---

7. A lot of toing and froing, of course I didn’t get it right. However, I had booked a edx tutor to help me with debugging. And he was very helpful. He also recommended using return false rather than simply return to get out of the function – “The 'return false' statement is often used in programming to indicate that a certain condition has not been met. It is a way of telling the program to stop executing the current code and return a false value.”


    It was a good boast for me to get into the debugging. I spent a lot of time in Chrome iterating through the functions following the variable changes (or not), setting up breakpoints and watches, thereby eventually identifying the problem. This was very helpful, along with a lot of Googling. I have a lengthy list of sources.

---

8.	It was complicated collecting the user preferences for the character sets to include in the password. I decided to create a separate temporary function to handle this with the length variable passed to it.

---

 9. My notes became rather cryptic as I proceeded. For example:

           Changed the variable declaration of generateBtn from let to const since the variable doesn't need to be reassigned.

           To do – fix the options loop
           Get the committed function from gitHub

           messages in variable form

           why the bye message 2x?

           avoid nested functions and multiple for loops

           added type=button

           form?

           Still getting rid of multiple byes

---

10. I determined that from the getPasswordOptions, I was calling getMoreOptions which had not yet been declared, and because function expression used a const variable, it could not could not be “hoisted”. I reworked the functions – refactoring the code to remove the call from passwordOptions to moreOptions. This resolved the no hoisting problem.


11. By incorporating the getMoreOptions into getPasswordOptions, as well as making variables reused in different functions global (my first inclination was to make them local), I was able to iron out some thorny issues. 

---

12. The creation of the optionsObj (object) offered another set of challenges, which were resolved by tenacious debugging and variable watch.
 

13. As with obtaining the user selected password length, after they have done so, the user is then presented with a series of confirm modals. If the user did not select any of these options, they were given another change. This time a while loop was used which would continue indefinitely. So the message was given in the confirm model which appeared when no choice was made, that they could select cancel (to break out of the loop) and the function/app with an alert message as before and return false.


14. I tried first to declare and initialise the object with the objLength variable (name changed from length to avoid confusion with the length property). I then changed tack and declared and initialized the object with the options specialChars, numbers, lowerCase and uppercase options. I used an “object literal” to create the object. That was the easy part. Trickier was moving it about throughout the function and to other functions. I tried to use local variables, but it just wasn’t happening so I opted for a global variable. 

---

15. The getRandom and generatePassword functions involved a set of different issues. In the second of these functions, the password string and charsToUse function are initialized as empty, again to ensure that previous options don’t reappear. Then the object is acted upon using the “for in” loop and a switch statement to pull out individually user selected character set(s) properties of the object. In turn, if the property value is true, the corresponding arrays are then pushed to the charsToUse array. 
    

---

16. Then with a function expression there is a call to the first function. In getRandom() the global variable is initialized as an empty array – (otherwise, in subsequent program starts, previously selected values reappear)*. The two local variables are declared and initialized as empty. In a for loop which iterates up to the selected length of the the password, random characters derived from the selected character sets are created using the Math.floor and Math.random construction - https://www.codecademy.com/forum_questions/50c386a4a122749bc1006ca6 A randomIndex is then created. The randomly selected character is then pushed into the randomChars array. Using the join method the randomChars is then returned to the generatePassword function where it is assigned to the password variable.

* Debugging in Chrome became ghost busting!

---

17. Having got the essentials working – a password taking into account the user-decided length and random characters derived from a the user-chosen character set(s) - I turned to that old bugaboo of a hide password feature with the open and shut eye icon. And I decided to add a copy icon to facilitate the user in getting the password - especially if it could be 228 characters long! These websites provided useful templates. - 

        https://www.w3schools.com/howto/howto_js_toggle_password.asp
        https://www.javascripttutorial.net/javascript-dom/javascript-toggle-password-visibility/
        https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
        https://stackoverflow.com/questions/36210862/select-and-copy-input-text-onclick


And the open eye, shut eye, and clipboard icons were pulled from https://www.jsdelivr.com/ a content delivery network (CDN).

  ![open eye, closed eye and clipbloard ](icons.png) 
     
 
>        “The HTML page has an  input element with the type password and an <i> element with the CSS classes provided by Bootstrap CSS.
>        "The Bootstrap CSS allows you to use the class bi-eye of the <i> element to show the eye icon. To change the icon from eye to eye slash, you just need to change the class of the <i> element to bi-eye-slash.” 


I added the following style sheet in the head of the html page – 
`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" /> `


I used an event listener, and a ternary operator to get the toggle (hide/show).


For the copy password feature I again used an event listener, a select function and the copy action of the Web API `document.execCommand('x')` to copy the selected password string.

In the html, to make these features accessible, I added a text description beside the icon. Including a label has allowed the accompanying text to be clicked as the icon - thereby extending the clickable area.

---

18. Here's a screenshopt of index.html and the link to the webpage - https://stephdavid.github.io/Password-Generator/
 
![Screenshot ](screenshot.png)

---

19.  References used include:

