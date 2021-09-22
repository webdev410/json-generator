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
const deleteBtn = document.querySelectorAll(".deleteBtn");
const generateBtn = document.getElementById("generateBtn");

let finalJson;

function addKeyValue(event) {
    event.preventDefault();
    // console.log(additionalFields.childElementCount)

    const newFormGroup = document.createElement("div");
    const newKey = document.createElement("input");
    const newValue = document.createElement("input");
    const deleteBtn = document.createElement("button");

    newFormGroup.classList.add("kv-pair");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt deleteBtn"></i>';

    newKey.classList.add("key");
    newValue.classList.add("value");

    newFormGroup.setAttribute(
        "data-item-id",
        additionalFields.childElementCount + 1
    );
    deleteBtn.setAttribute(
        "data-item-id",
        additionalFields.childElementCount + 1
    );
    newKey.setAttribute("placeholder", "key");
    newKey.setAttribute("type", "text");

    newValue.setAttribute("placeholder", "value");
    newValue.setAttribute("type", "text");

    newFormGroup.appendChild(newKey);
    newFormGroup.appendChild(newValue);
    newFormGroup.appendChild(deleteBtn);

    additionalFields.classList.add("form-group");
    additionalFields.appendChild(newFormGroup);

    if (additionalFields.childElementCount > 0) {
        generateBtn.classList.remove("hide");
    }
}

function generateJson(event) {
    event.preventDefault();

    // if key is empty, throw error
    let key = document.querySelectorAll(".key");
    // console.log("Key Length: ", key.length)

    for (var i = 0; i < key.length; i++) {
        // console.log("Value: ", key[i].value)
        if (!key[i].value) {
            console.log("key-value is empty");
            alert("please remove unused inputs");
            return;
        }
    }
    // create copy button
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("justify-content-end");

    let copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.classList.add("copyBtn");
    copyBtn.classList.add("btn-light");
    copyBtn.classList.add("btn-sm");
    copyBtn.innerHTML = '<i class="fal fa-copy"></i>';
    copyBtn.setAttribute("onClick", "copyText()");

    row.appendChild(copyBtn);

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
    jsonResult.appendChild(row);
    // show json object
    jsonResult.classList.remove("hide");
    copyBtn.classList.remove("hide");
}

function deleteItem(itemId, formId) {
    event.preventDefault();

    let deleteDiv = document.querySelector(".kv-pair");
    if (itemId === formId) {
        deleteDiv.remove();
    }
}

function copyText() {
    let range = document.createRange();
    range.selectNode(jsonResult);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text

    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect

    alert("Copied!");
}

additionalFields.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("deleteBtn")) {
        let itemId = event.target.getAttribute("data-item-id");
        let formId = event.target.getAttribute("data-item-id");
        deleteItem(itemId, formId);
    }
});
// Enter Key = click addBtn
window.addEventListener(
    "keydown",
    function (e) {
        if (
            e.keyIdentifier == "U+000A" ||
            e.keyIdentifier == "Enter" ||
            e.keyCode == 13
        ) {
            if (e.target.nodeName == "INPUT" && e.target.type == "text") {
                e.preventDefault();
                addBtn.click()
                // return false;
            }
        }
    },
    true
);

form.addEventListener("submit", generateJson);
addBtn.addEventListener("click", addKeyValue);
