let slider = document.querySelector('#slider');
let numberOutput = document.querySelector('.character-amount');

const passwordArea = document.querySelector('.password-text');
const copyGraphic = document.querySelector('.copy');
const copiedText = document.querySelector('.copied-text');

const input = document.querySelector("input");
const form = document.querySelector('.form-section');

const uppercaseCheckbox = document.querySelector('#uppercase');
const lowercaseCheckbox = document.querySelector('#lowercase');
const numbersCheckbox = document.querySelector('#numbers');
const symbolsCheckbox = document.querySelector('#symbols');
const checkboxContainer = document.querySelector('.checkbox-container:nth-of-type(4)');

const error = document.querySelector('.error');

const strengthWord = document.querySelector('.strength-word');
const tooWeak = document.querySelector('#too-weak');
const weak = document.querySelector('#weak');
const medium = document.querySelector('#medium');
const strong = document.querySelector('#strong');


const uppercaseArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercaseArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '/', '-', '+'];


// --SLIDER FUNCTIONALITY--

numberOutput.innerText = slider.value;

slider.oninput = function () {
    numberOutput.textContent = this.value;
}

setBackgroundSize(input);

function setBackgroundSize(input) {
    input.style.setProperty("--background-size", `${getBackgroundSize(input)}%`);
}

input.addEventListener("input", () => setBackgroundSize(input));

function getBackgroundSize(input) {
    const min = +input.min || 1;
    const max = +input.max || 20;
    const value = +input.value;

    const size = (value - min) / (max - min) * 100;

    return size;
}

// -- SLIDER FUNCTIONALITY--

function getMasterArray() {
    masterArray = [];

    if (uppercaseCheckbox.checked === true) {
        masterArray.push(...uppercaseArray);
    }
    if (lowercaseCheckbox.checked === true) {
        masterArray.push(...lowercaseArray);
    }
    if (numbersCheckbox.checked === true) {
        masterArray.push(...numbersArray);
    }
    if (symbolsCheckbox.checked === true) {
        masterArray.push(...symbolsArray);
    }
    return masterArray;
}

const chooseRandom = (masterArray, num) => {

    const password = [];
    for (let i = 0; i < num;) {
        const random = Math.floor(Math.random() * masterArray.length);
        if (password.indexOf(masterArray[random]) !== -1) {
            continue;
        };
        password.push(masterArray[random]);
        i++;
    };

    return password;
};


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (uppercaseCheckbox.checked !== true && lowercaseCheckbox.checked !== true && numbersCheckbox.checked !== true && symbolsCheckbox.checked !== true) {
        error.style.display = 'block';
        checkboxContainer.style.marginBottom = '1rem';
        return error.innerText = 'Please select a checkbox above';
    } else {
        error.style.display = 'none';
        checkboxContainer.style.marginBottom = '2rem';
    }

    password = chooseRandom(getMasterArray(), slider.value);
    const passwordString = password.join('');
    const passwordStrength = zxcvbn(passwordString).score;

    checkPasswordStrength(passwordStrength);

    passwordArea.innerText = passwordString;
    passwordArea.style.opacity = '1';
})

copyGraphic.addEventListener('click', () => {
    const copyPassword = passwordArea.innerText;

    navigator.clipboard.writeText(copyPassword);
    copiedText.innerText = 'copied';
    passwordArea.innerText = 'P4$5W0rD!';
    passwordArea.style.opacity = '0.25';

    setTimeout(() => {
        copiedText.innerText = '';
    }, 3000)

    form.reset();
    setBackgroundSize(input);
    numberOutput.textContent = '10';
    resetBars();
})

function checkPasswordStrength(passwordStrength) {

    resetBars();

    switch (passwordStrength) {
        case 0:
            strengthWord.innerText = 'too weak!';
            tooWeak.style.border = 'none';
            tooWeak.style.backgroundColor = 'hsl(0, 91%, 63%)';
            break;
        case 1:
            strengthWord.innerText = 'too weak!';
            tooWeak.style.border = 'none';
            tooWeak.style.backgroundColor = 'hsl(0, 91%, 63%)';
            break;
        case 2:
            strengthWord.innerText = 'weak';
            tooWeak.style.border = 'none';
            weak.style.border = 'none';
            tooWeak.style.backgroundColor = 'hsl(13, 95%, 66%)';
            weak.style.backgroundColor = 'hsl(13, 95%, 66%)';
            break;
        case 3:
            strengthWord.innerText = 'medium';
            tooWeak.style.border = 'none';
            weak.style.border = 'none';
            medium.style.border = 'none';
            tooWeak.style.backgroundColor = 'hsl(42, 91%, 68%)';
            weak.style.backgroundColor = 'hsl(42, 91%, 68%)';
            medium.style.backgroundColor = 'hsl(42, 91%, 68%)';
            break;
        case 4:
            strengthWord.innerText = 'strong';
            tooWeak.style.border = 'none';
            weak.style.border = 'none';
            medium.style.border = 'none';
            strong.style.border = 'none';
            tooWeak.style.backgroundColor = 'hsl(127, 100%, 82%)';
            weak.style.backgroundColor = 'hsl(127, 100%, 82%)';
            medium.style.backgroundColor = 'hsl(127, 100%, 82%)';
            strong.style.backgroundColor = 'hsl(127, 100%, 82%)'
            break;
        default:
            error.style.display = 'block';
            checkboxContainer.style.marginBottom = '1rem';
            error.innerText = 'Something horrific has happened';
    }
}

function resetBars() {
    strengthWord.innerText = '';

    tooWeak.style.border = '2px solid hsl(252, 11%, 91%)';
    tooWeak.style.backgroundColor = 'transparent';

    weak.style.border = '2px solid hsl(252, 11%, 91%)';
    weak.style.backgroundColor = 'transparent';

    medium.style.border = '2px solid hsl(252, 11%, 91%)';
    medium.style.backgroundColor = 'transparent';

    strong.style.border = '2px solid hsl(252, 11%, 91%)';
    strong.style.backgroundColor = 'transparent';
}