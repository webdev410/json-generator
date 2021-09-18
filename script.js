// after entering a key/value pair, add new line of input boxes
// select the last 2 inputs 
// take values and generate a formatted JSON file
// Add option to generate mongo select, set, push etc...

const form = document.getElementById('json-form')
const additionalFields = document.getElementById('additionalFields')

const keyEl = document.getElementById('key')
const valueEl = document.getElementById('value')
const addBtn = document.getElementById('add-another')

function addKeyValue(e) {
    e.preventDefault()
    // create new inputs
    // assign IDs incrementing by 1
    // create add another button
    // 
    console.log('you did it')
    const newFormGroup = document.createElement('div')
    const newKey = document.createElement('input')
    const newValue = document.createElement('input')

    newKey.classList.add('key')
    newValue.classList.add('value')
    newKey.setAttribute('placeholder', 'key')
    newKey.setAttribute('type', 'text')
    newValue.setAttribute('placeholder', 'value')
    newValue.setAttribute('type', 'text')

    newFormGroup.appendChild(newKey)
    newFormGroup.appendChild(newValue)
    additionalFields.classList.add('form-group')

    additionalFields.appendChild(newFormGroup)
}

function generateJson(event) {
    event.preventDefault()
    const outputObj = {}
    const inputs = Array.prototype.slice.call(document.querySelectorAll("form input"))
    for (var i = 0; i < inputs.length; i += 2) {
        // gets values for key and value
        outputObj[inputs[i].value] = inputs[i + 1].value
    }

    if (inputs.value === '') {
        console.log('null fields')
    }
    console.log(JSON.stringify(outputObj, null, 2))


    // create final json object
    let finalJson = (JSON.stringify(outputObj, null, 2))
    // add to div
    document.querySelector("#jsonResult").textContent = finalJson



}

form.addEventListener('submit', generateJson)



addBtn.addEventListener('click', addKeyValue)