const amount = document.querySelector('#amount');
const validateInputs = document.querySelector('#validateInputs');
const perLiter = 350;
amount.addEventListener('keyup', dailyPetrol);
function dailyPetrol() {
    const liter = (parseFloat(amount.value) / perLiter).toFixed(3);
    document.querySelector('#litre').value = isNaN(liter) ? 0 : liter;
}
// ///////////////////////model/////////////////////////////////////////////
validateInputs.addEventListener('click', e => {
    if (parseFloat(amount.value) > 100000) {
        e.preventDefault();
        document.querySelector('#model p').innerHTML = `Value too large!`;
        document.querySelector('#model').classList.add('active_error');
        document.querySelector('#model').classList.add('animateErrorOut');
        setTimeout(function () {
            document.querySelector('#model').classList.remove('active_error');
            document.querySelector('#model').classList.remove('animateErrorOut');
        }, 1000);
    } else if (amount.value === '' || parseFloat(amount.value) === 0) {
        e.preventDefault();
        document.querySelector('#model p').innerHTML = `Empty value!`;
        document.querySelector('#model').classList.add('active_error');
        document.querySelector('#model').classList.add('animateErrorOut');
        setTimeout(function () {
            document.querySelector('#model').classList.remove('active_error');
            document.querySelector('#model').classList.remove('animateErrorOut');
        }, 1000);
    }
});

// window.addEventListener('DOMContentLoaded', (event) => {
//    let i = 1;
//    const interval = setInterval(function () {
//       document.querySelector('#model').classList.add('active_error');
//       document.querySelector('#model').style.color = 'white';
//       if (i >= 2) {
//          setTimeout(function () {
//             document.querySelector('#model').classList.remove('active_error');
//             clearInterval(interval);
//          }, 1);
//       }
//       i++;
//    }, 2000);
// });
