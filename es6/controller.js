const NUM_ITEMS = 12
const PRECISION = 6
const COLUMN_MAPPING = {
    0: "name",
    1: "bestBid",
    2: "bestAsk",
    3: "lastChangeBid",
    4: "lastChangeAsk",
    5: "openBid",
    6: "openAsk"
}

function initializeTable () {
    let table = document.getElementById("table")
    let rows = Array(NUM_ITEMS) 
        .fill()
        .forEach(item => table.append(createEmptyRow()))
}

function createEmptyRow () {
    let row = document
        .getElementById("row-template")
        .cloneNode(true) // true -> deep clone
    row.className = "row"
    row.id = ""
    return row
}

function updateValues (data) {
    let tableRows = table.getElementsByClassName("row")
    data.forEach((values, i) => {
        setValues(tableRows[i], values)
    })
}

function setValues (row, data) {
    let cells = row.getElementsByTagName('td')
    Array.from(cells)
        .forEach((cell, i) => {
            cells[i].innerHTML = getMappedValue(data, i)
        })

    // cells[0].innerHTML = data.name
    // cells[1].innerHTML = data.bestBid
    // cells[2].innerHTML = data.bestAsk
    // cells[3].innerHTML = data.lastChangeBid
    // cells[4].innerHTML = data.lastChangeAsk
    // cells[5].innerHTML = data.openBid
    // cells[6].innerHTML = data.openAsk
}

function getMappedValue(data, i) {
    let key = COLUMN_MAPPING[i]
    if (key !== "name") {
        return parseFloat(data[key]).toFixed(PRECISION)
    } else {
        return data[key]
    }
}

export default { initializeTable, updateValues }