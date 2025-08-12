// Nav tab switch
function switchTool(id) {
  document.querySelectorAll(".tool-section").forEach((el) => {
    el.classList.remove("active");
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
  });

  setTimeout(() => {
    const newTool = document.getElementById(id);
    newTool.classList.add("active");
    newTool.style.opacity = 1;
    newTool.style.transform = "translateY(0)";
  }, 150);

  document
    .querySelectorAll(".navbar li")
    .forEach((li) => li.classList.remove("active-tab"));
  event.target.classList.add("active-tab");
}

// Unit converter logic
const categorySelect = document.getElementById("category");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const resultDiv = document.getElementById("result");

const units = {
  length: { meter: 1, kilometer: 0.001, mile: 0.000621371, inch: 39.3701 },
  weight: { kilogram: 1, gram: 1000, pound: 2.20462, ounce: 35.274 },
  volume: { liter: 1, milliliter: 1000, gallon: 0.264172 },
  temperature: { Celsius: "C", Fahrenheit: "F", Kelvin: "K" },
};

function populateUnits(category) {
  const opts = Object.keys(units[category])
    .map((u) => `<option value="${u}">${u}</option>`)
    .join("");
  fromUnitSelect.innerHTML = toUnitSelect.innerHTML = opts;
}

function convert() {
  const category = categorySelect.value;
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;
  const value = parseFloat(inputValue.value);
  if (isNaN(value)) return (resultDiv.textContent = "Please enter a number.");

  if (category === "temperature") {
    resultDiv.textContent = convertTemperature(value, from, to);
  } else {
    const base = value / units[category][from];
    const converted = base * units[category][to];
    resultDiv.textContent = `${converted.toFixed(4)} ${to}`;
  }
}

function convertTemperature(val, from, to) {
  if (from === to) return `${val} °${to[0]}`;
  let c =
    from === "Fahrenheit"
      ? ((val - 32) * 5) / 9
      : from === "Kelvin"
      ? val - 273.15
      : val;
  let result =
    to === "Fahrenheit" ? (c * 9) / 5 + 32 : to === "Kelvin" ? c + 273.15 : c;
  return `${result.toFixed(2)} °${to[0]}`;
}

categorySelect.addEventListener("change", () => {
  populateUnits(categorySelect.value);
  convert();
});
[inputValue, fromUnitSelect, toUnitSelect].forEach((el) =>
  el.addEventListener("input", convert)
);
populateUnits(categorySelect.value);

// BMI
function calcBMI() {
  const h = parseFloat(document.getElementById("height").value) / 100;
  const w = parseFloat(document.getElementById("weight").value);
  if (!h || !w)
    return (document.getElementById("bmiResult").textContent =
      "Enter valid values");
  const bmi = w / (h * h);
  document.getElementById("bmiResult").textContent = `Your BMI is ${bmi.toFixed(
    2
  )}`;
}

// Age
function calcAge() {
  const dob = new Date(document.getElementById("dob").value);
  if (!dob) return;
  const ageDate = new Date(Date.now() - dob.getTime());
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  document.getElementById("ageResult").textContent = `You are ${age} years old`;
}

// Percent
function calcPercentage() {
  const part = parseFloat(document.getElementById("part").value);
  const total = parseFloat(document.getElementById("total").value);
  if (!part || !total) return;
  const percent = (part / total) * 100;
  document.getElementById("percentResult").textContent = `${percent.toFixed(
    2
  )}%`;
}

// Discount
function calcDiscount() {
  const price = parseFloat(document.getElementById("originalPrice").value);
  const discount = parseFloat(document.getElementById("discountPercent").value);
  if (!price || !discount) return;
  const final = price - (price * discount) / 100;
  document.getElementById(
    "discountResult"
  ).textContent = `Final Price: ₹${final.toFixed(2)}`;
}

// EMI
function calcEMI() {
  const p = parseFloat(document.getElementById("loanAmount").value);
  const r =
    parseFloat(document.getElementById("interestRate").value) / 12 / 100;
  const n = parseFloat(document.getElementById("loanTerm").value) * 12;
  if (!p || !r || !n) return;
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  document.getElementById(
    "emiResult"
  ).textContent = `Monthly EMI: ₹${emi.toFixed(2)}`;
}
