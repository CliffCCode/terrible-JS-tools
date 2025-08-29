
function guessAge() {
    let age = document.getElementById('ageInput').value;
    document.querySelector('#result').innerHTML = `You are ${age} years old!`;
    console.log(age);
    return;
}

document.getElementById('submit').addEventListener('click', guessAge);