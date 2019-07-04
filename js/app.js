const userName = document.getElementById('name');
const userEmail = document.getElementById('mail');
const basicFieldset = document.querySelector('fieldset');
const selectTitle = document.getElementById('title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorDiv = document.getElementById('colors-js-puns');
const fieldActivities = document.querySelector('.activities');
const fieldsetInput = fieldActivities.querySelectorAll('input');
const label = fieldActivities.getElementsByTagName('label');
const creditCardDiv = document.getElementById('credit-card');
const paymentFieldset = document.getElementsByTagName('fieldset')[3];
const payPalDiv = paymentFieldset.children[4];
const bitcoinDiv = paymentFieldset.children[5];
const button = document.getElementsByTagName('button')[0];
const paymentDiv = document.getElementById('payment');
const paymentOptions = paymentDiv.getElementsByTagName('option');
const ccNum = document.getElementById('cc-num');
const cvvCodeNum = document.getElementById('cvv');
const zipCodeNum = document.getElementById('zip');
var activitiesLegend = fieldActivities.querySelector('legend');
const formElement = document.querySelector('form');
let total = 0;

//initially hiding the color options
colorDiv.style.display = 'none';
//initially setting the credit card as default option
paymentOptions[1].selected = 'selected';
//initially hiding the paypal div 
payPalDiv.style.display = 'none';
//initially hiding the bitcoin div
bitcoinDiv.style.display = 'none';
//initially hiding the div of 'other' option
const input = document.querySelector('[placeholder = "Your job role"]');
input.style.display = 'none';

//Creating and appending 'span' element
function createFirstSpan() {
    const spanElem1 = document.createElement('span');
    spanElem1.id = 'span1';
    basicFieldset.insertBefore(spanElem1, basicFieldset.children[3])
}

function createSecondSpan() {
    const spanElem2 = document.createElement('span');
    spanElem2.id = 'span2';
    basicFieldset.insertBefore(spanElem2, basicFieldset.children[6]);
}

function createThirdSpan() {
    const spanElem3 = document.createElement('span');
    spanElem3.id = 'span3';
    creditCardDiv.children[0].appendChild(spanElem3);
}

function createFourthSpan() {
    const spanElem4 = document.createElement('span');
    spanElem4.id = 'span4';
    creditCardDiv.children[1].appendChild(spanElem4);
}

function createFifthSpan() {
    const spanElem5 = document.createElement('span');
    spanElem5.id = 'span5';
    creditCardDiv.children[2].appendChild(spanElem5);
}
//Calling the function to append the 'span' element
createFirstSpan();
createSecondSpan();
createThirdSpan();
createFourthSpan();
createFifthSpan();

//automatically setting the focus in username input 
userName.focus();

// Displaying 'div' when user chooses the 'other' option and also
// hiding it if user changes his mind and chooses another option
selectTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        input.style.display = 'block';
    } else {
        if (input.style.display === 'block') {
            input.style.display = 'none';
        }
    }
});

// Displaying the color option as per the 'Design' chosen
selectDesign.addEventListener('change', (e) => {
    colorDiv.style.display = 'block';
    if (e.target.value === 'js puns') {

        for (i = 3; i < selectColor.options.length; i++) {
            selectColor.options[i].style.display = 'none';
        }
        for (i = 0; i < 3; i++) {
            selectColor.options[i].style.display = 'block';
        }
        selectColor.options[0].selected = 'selected';
    }

    if (e.target.value === 'heart js') {

        for (i = 0; i < 3; i++) {
            selectColor.options[i].style.display = 'none';
        }

        for (i = 3; i < selectColor.options.length; i++) {
            selectColor.options[i].style.display = 'block';
        }
        selectColor.options[3].selected = 'selected';
    }

    if (e.target.value === 'select theme') {
        colorDiv.style.display = 'none';
    }
});

// Calculating the total cost for registering
for (let i = 0; i < label.length; i++) {
    fieldsetInput[i].addEventListener('click', () => {
        const text = label[i].textContent;
        if (fieldsetInput[i].checked) {
            total += parseInt(text.substring(text.indexOf('$') + 1, text.length));
        } else {
            total -= parseInt(text.substring(text.indexOf('$') + 1, text.length));
        }
        const lastLabel = document.getElementById('totalamount');
        lastLabel.textContent = 'Your total cost is $' + total.toString();
    });
}

// Creating an extra 'label' element to display total cost when user starts checking for activities
function addTotalElement() {
    const label = document.createElement('label');
    label.id = "totalamount";
    fieldActivities.appendChild(label);
}
addTotalElement();

// Disabling activities on the same day and at the same time when user selects an activity
fieldActivities.addEventListener('change', (e) => {
    //Select the label text in a variable sString
    const sString = event.target.parentNode.textContent;
    //Then extract that specific part from the label which you want to match in other labels
    const partOfString = sString.substring(sString.indexOf('Tuesday'), sString.length - 6);
    //Now throug all the label and search if the extracted part found  in any label[i].textContent 
    //Make sure , it should not match to its own
    for (let i = 0; i < fieldsetInput.length; i++) {
        if (label[i].textContent.indexOf(partOfString) > -1 && label[i].textContent !== sString) {
            //if found, then check whether its checked or not
            if (e.target.checked) {
                fieldsetInput[i].disabled = true;
            } else {
                fieldsetInput[i].disabled = false;
            }
        }
    }
});

//Checking the mode of payment and showing the corresponding result as per mode
paymentFieldset.addEventListener('change', (e) => {

    if (e.target.value === 'credit card') {
        hidePayPal();
        hideBitCoin();
        creditCardDiv.style.display = 'block';
    }

    if (e.target.value === 'paypal') {
        hideCreditCard();
        hideBitCoin();
        payPalDiv.style.display = 'block';
    }

    if (e.target.value === 'bitcoin') {
        hideCreditCard();
        hidePayPal();
        bitcoinDiv.style.display = 'block';
    }
});

function hidePayPal() {
    payPalDiv.style.display = 'none';
}

function hideBitCoin() {
    bitcoinDiv.style.display = 'none';
}

function hideCreditCard() {
    creditCardDiv.style.display = 'none';
}

// Defining validation methods for email , cc number , cc zip code , cc cvv number
function valEmail() {
    return (/^[^@]+@[^@.]+\.([A-Za-z]{2,4})+$/.test(userEmail.value));
}

function valCcNumber() {
    return (/^\d{13,15}$/.test(ccNum.value));
}

function valZipCode() {
    return (/^\d{5}$/.test(zipCodeNum.value));
}

function valCvvNumber() {
    return (/^\d{3}$/.test(cvvCodeNum.value));
}

const spanFirst = document.getElementById('span1');
const spanSecond = document.getElementById('span2');
const spanThird = document.getElementById('span3');
const spanFourth = document.getElementById('span4');
const spanFifth = document.getElementById('span5');

// Using closure to make count variable local so that , when user uncheck the checkbox 
//after checking it , value of count resets to 0 and message will appear again.If we defined it globally , once we 
//checked the checkbox , message will never appear again even if uncheck all the checkboxes because value cannot be 0 again.
function checkBoxCount() {
    var count = 0;
    return function () {
        for (let i = 0; i < fieldsetInput.length; i++) {
            if (fieldsetInput[i].checked) {
                count += 1;
            }
        }
        return count;
    }
}

//function to check if input value is empty
function forEmptyValue( elementName , spanNumber , text){
        spanNumber.textContent = text;
        elementName.style.border = '1px #f00 solid'
        elementName.previousElementSibling.style.color = '#f00';
        elementName.style.boxShadow = '0 0 2px 0 #f00';
        spanNumber.style.display = 'block';
        event.preventDefault();
        elementName.focus();
}

//function to check if input value if not well formatted
function ifNotFormattedCorrectly( elementName , spanNumber , text){
    spanNumber.textContent = text;
    elementName.style.border = '1px #f00 solid';
    elementName.style.boxShadow = '0 0 2px 0 #f00';
    spanNumber.style.display = 'block';
    event.preventDefault();
    elementName.focus();
}

//function to check if input value is formatted well
function ifFormattedCorrectly( elementName , spanNumber){
    elementName.style.border = '2px solid #c1deeb';
    elementName.style.boxShadow = 'none';
    elementName.previousElementSibling.style.color = '#184f68';
    spanNumber.style.display = 'none';
}


function checkUserName() {
    if (userName.value === '') {
      forEmptyValue( userName, spanFirst , "User name required");
    } else {
       ifFormattedCorrectly( userName , spanFirst );
    }
}

function checkUserEmail() {
    if (userEmail.value === '') {
        forEmptyValue( userEmail , spanSecond , "*Email address required");
    } else {
        if (!valEmail()) {
            ifNotFormattedCorrectly( userEmail , spanSecond , "*Please enter a valid email address");
        } else {
            ifFormattedCorrectly( userEmail , spanSecond);
        }
    }
}

function checkCheckboxInfo() {
    var checkboxvalue2 = checkBoxCount();
    if (checkboxvalue2() === 0) {
        activitiesLegend.style.color = '#f00';
        event.preventDefault();
    } else {
        activitiesLegend.style.color = '#184f68';
    }
}

function checkCcNumber() {
    //checking validation of credit card only when value of payment div is "credit card"
    if (paymentDiv.value === 'credit card') {
        if (ccNum.value === '') {
            forEmptyValue( ccNum, spanThird, "Required");
        } else {
            if (!valCcNumber()) {
                ifNotFormattedCorrectly( ccNum , spanThird , "*Should be between 13-15 digit");
            } else {
                ifFormattedCorrectly( ccNum , spanThird);
            }
        }
    }
}

function checkZipCode() {
    if (paymentDiv.value === 'credit card') {
        if (zipCodeNum.value === '') {  
            forEmptyValue( zipCodeNum , spanFourth , "Required");
        } else {
            if (!valZipCode()) {
                ifNotFormattedCorrectly( zipCodeNum , spanFourth , "*Must be a 5 digit number");
            } else {
              
                ifFormattedCorrectly( zipCodeNum , spanFourth);
            }
        }
    }
}

function checkCvvNumber() {
    if (paymentDiv.value === 'credit card') {
        if (cvvCodeNum.value === '') {
            forEmptyValue( cvvCodeNum , spanFifth , "*Required");
        } else {
            if (!valCvvNumber()) {
              
                ifNotFormattedCorrectly( cvvCodeNum , spanFifth , "*Must be a 3 digit number");
            } else {
              
                ifFormattedCorrectly( cvvCodeNum , spanFifth );
            }
        }
    }
}

//calling all the functions on final submit "click" event to check whether the fields are well formatted or not
button.addEventListener('click', () => {
    checkUserName();
    checkUserEmail();
    checkCheckboxInfo();
    checkCcNumber();
    checkZipCode();
    checkCvvNumber();
});

//real time validation of all the input elements
userEmail.addEventListener('keyup', () => {
    checkUserEmail();
});

userName.addEventListener('keyup', () => {
    checkUserName();
});

ccNum.addEventListener('keyup', () => {
    checkCcNumber();
});

zipCodeNum.addEventListener('keyup', () => {
    checkZipCode();
});

cvvCodeNum.addEventListener('keyup', () => {
    checkCvvNumber();
});