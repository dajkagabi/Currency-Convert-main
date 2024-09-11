//Inicializálás
const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const num = document.getElementById("num");
const ans = document.getElementById("ans");

//API meghívása
fetch("https://api.frankfurter.app/currencies")
  .then((data) => data.json())
  .then((data) => {
    display(data);
  })
  .catch((error) => console.error("Error fetching currenies: ", error));
  

  //
  function display(data) {
    const entries = Object.entries(data);
    entries.forEach(([currency]) => {
      select[0].innerHTML += `<option value="${currency}">${currency}</option>`;
      select[1].innerHTML += `<option value="${currency}">${currency}</option>`;
    });
  }

//Convert megnyomása
btn.addEventListener("click", () => {
  let currency1 = select[0].value;
  let currency2 = select[1].value;
  let value = num.value;

  if (currency1 != currency2) {
    convert(currency1, currency2, value);
  } else {
    alert("Choose Different Currencies!");
  }
});

//Api meghívása és a valuták kiválasztása
function convert(currency1, currency2, value) {
  const host = "api.frankfurter.app";
  fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
    .then((val) => val.json())
    .then((val) => {
      console.log(Object.values(val.rates)[0]);
      ans.value = Object.values(val.rates)[0];
    })
    .catch((error) => console.error("Error converting currencies:", error));
}