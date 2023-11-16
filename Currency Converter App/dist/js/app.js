/**
 * @author Muhammad Dev
 * @version 1.0.0
 * @license MIT
 */

// Vars
const textInputUI = document.getElementById('text-input');
const fromCurrencyEL = document.getElementById('from-currency');
const toCurrencyEL = document.getElementById('to-currency');
const swapBtn = document.getElementById('swap');
const exchangeBtn = document.getElementById('exchange');
const resultEl = document.getElementById('result');
const signEl = document.getElementById('money-sign');

// Functions
// Format money
function formatMoney(num, sign) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: sign,
  }).format(num);
}

// Calculate the exchange rate
async function calculate() {
  resultEl.innerHTML = '';
  resultEl.innerHTML = `<div class="loader" id="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>`;

  const response = await fetch(`https://v6.exchangerate-api.com/v6/5ea3657d28af8e4d1a147d02/latest/${fromCurrencyEL.value}`);
  const data = await response.json();
  
  if (data.result === 'success') {
    setTimeout(() => {
      resultEl.innerHTML = `<h2>${formatMoney(data.conversion_rates[toCurrencyEL.value] * +textInputUI.value, toCurrencyEL.value)}</h2>
        <p>1 ${fromCurrencyEL.value} = ${data.conversion_rates[toCurrencyEL.value]} ${toCurrencyEL.value}</p>`;
    }, 1500)
  }
}

// Change the money sign of the source currency
function moneyInputSign(sign) {
  const s = formatMoney('0', sign).split('').filter(item => /[^\d\s\.]/.test(item)).join('').trim();
  signEl.innerText = s;
}

// Swap the values of the source currency and destination currency
function swap() {
  const temp = fromCurrencyEL.value;
  fromCurrencyEL.value = toCurrencyEL.value;
  toCurrencyEL.value = temp;
  document.querySelector('.btn-swap i').style.transform = 'rotate(180deg)';
  setTimeout(() => (document.querySelector('.btn-swap i').style.transform = 'rotate(0deg)'), 500);
  moneyInputSign(fromCurrencyEL.value);
  calculate();
}

// Events
// * Calculate the exchange rate event
exchangeBtn.addEventListener('click', calculate);

// * Swap the values of the source and destination event
swapBtn.addEventListener('click', swap); 

// * Change the money sign of the source event
fromCurrencyEL.addEventListener('change', (e) => {
  moneyInputSign(e.target.value)
});