// after entering a key/value pair, add new line of input boxes
// select the last 2 inputs
// take values and generate a formatted JSON file
// Add option to generate mongo select, set, push etc...

const form = document.getElementById("json-form");
const additionalFields = document.getElementById("additionalFields");

const keyEl = document.getElementById("key");
const valueEl = document.getElementById("value");
const addBtn = document.getElementById("add-another");
const jsonResult = document.querySelector("#jsonResult");
const deleteBtn = document.querySelectorAll('.deleteBtn')
let finalJson;

function addKeyValue(event) {
    event.preventDefault();
    // console.log(additionalFields.childElementCount)

    const newFormGroup = document.createElement("div");
    const newKey = document.createElement("input");
    const newValue = document.createElement("input");
    const deleteBtn = document.createElement('button')

    newFormGroup.classList.add('kv-pair')
    newFormGroup.setAttribute('data-item-id', additionalFields.childElementCount + 1)
    deleteBtn.setAttribute('data-item-id', additionalFields.childElementCount + 1)

    deleteBtn.classList.add('deleteBtn')
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'

    newKey.classList.add("key");
    newValue.classList.add("value");

    newKey.setAttribute("placeholder", "key");
    newKey.setAttribute("type", "text");

    newValue.setAttribute("placeholder", "value");
    newValue.setAttribute("type", "text");

    newFormGroup.appendChild(newKey);
    newFormGroup.appendChild(newValue);
    newFormGroup.appendChild(deleteBtn);

    additionalFields.classList.add("form-group");
    additionalFields.appendChild(newFormGroup);

}

function generateJson(event) {
    event.preventDefault();

    const outputObj = {};
    const inputs = Array.prototype.slice.call(
        document.querySelectorAll("form input")
    );
    for (var i = 0; i < inputs.length; i += 2) {
        // gets values for key and value
        outputObj[inputs[i].value] = inputs[i + 1].value;
    }
    if (inputs.length === 0) {
        alert("You must add at least one key/value pair");
        return;
    }
    // console.log("inputs", inputs);
    // console.log(JSON.stringify(outputObj, null, 2));

    // create final json object
    let finalJson = JSON.stringify(outputObj, null, 2);

    // add to div
    jsonResult.textContent = finalJson;
    // show json object
    jsonResult.classList.remove("hide");
}

function deleteItem(itemId, formId) {
    event.preventDefault()
    console.log("item id: ", itemId);
    console.log("form-group id: ", formId);

    let deleteDiv = document.querySelector('.kv-pair')
    if (itemId === formId) {
        deleteDiv.remove()
    }
}


additionalFields.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("deleteBtn")) {
        let itemId = event.target.getAttribute("data-item-id");
        let formId = event.target.getAttribute("data-item-id");
        deleteItem(itemId, formId);

    }
});

form.addEventListener("submit", generateJson);
addBtn.addEventListener("click", addKeyValue);
