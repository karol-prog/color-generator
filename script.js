const getBtn = document.getElementById("get-color-btn");
const colorInput = document.getElementById("input-color");
const colorSelect = document.getElementById("color-select");

const colorContainer = document.getElementById("color-container");

getBtn.addEventListener("click", getColor);

function getColor() {
  //get color from input color
  const colorInputValue = colorInput.value;
  //get the color from selections
  const colorSelectValue = colorSelect.value;

  //encode the values because of # in hex codes for usecase in URL api
  const encodeColorInput = encodeURIComponent(colorInputValue);
  const encodeColorSelect = encodeURIComponent(colorSelectValue);

  //fetch the API
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${encodeColorInput}&mode=${encodeColorSelect}&count=5`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .then((data) => {
      //call the function for render colors from api
      renderColor(data.colors);
    });
}

//render colors to grid colors
function renderColor(data) {
  colorContainer.innerHTML = "";

  let colorHtml = "";
  data.forEach((color) => {
    colorHtml = `
      <div class="grid-colors-inner">
        <div class="color" style="background-color:${color.hex.value};"></div>
        <div class="hex-code">${color.hex.value}</div>
      </div>`;
    colorContainer.innerHTML += colorHtml;
  });

  //copy to clipboard
  //target all created divs
  const hexCodeCopy = document.querySelectorAll(".grid-colors-inner");
  //iterate over them and add the event listener
  hexCodeCopy.forEach((copy) => {
    copy.addEventListener("click", copyHexText);
  });
}

//function for copyHexText
function copyHexText(e) {
  //target the textcontent of the div
  const hexText = e.target.textContent;
  // Copy the text inside the text field
  navigator.clipboard.writeText(hexText);
  //alert msg
  alert(`You copy ${hexText} to clipboard`);
}
