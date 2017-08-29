const TOTAL_ROWS = 12
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
    Array(TOTAL_ROWS)
        .fill()
        .forEach(item => table.append(createEmptyRow()))
}

function createEmptyRow () {
    let row = document.createElement("tr")
    row.className = "row"
    Object.keys(COLUMN_MAPPING).forEach(_ => {
        row.append(document.createElement("td"))
    })
    return row
}

function updateValues (data) {
    let tableRows = table.getElementsByClassName("row")
    data.forEach((values, i) => {
        setValues(tableRows[i], values)
    })
}

function setValues (row, data) {
    let cells = row.getElementsByTagName("td")
    Array.from(cells)
        .forEach((cell, i) => {
            cells[i].innerHTML = getValueForColumn(i, data)
        })
}

function getValueForColumn (col, data) {
    let key = COLUMN_MAPPING[col]
    if (key !== "name") {
        return parseFloat(data[key]).toFixed(PRECISION)
    } else {
        return data[key]
    }
}

export default { initializeTable, updateValues }