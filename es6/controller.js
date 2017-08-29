const TOTAL_ROWS = 12
const PRECISION = 6
const COLUMNS = [
    "name",
    "bestBid",
    "bestAsk",
    "lastChangeBid",
    "lastChangeAsk",
    "openBid",
    "openAsk",
    "midprices"
]

function initializeTable () {
    const table = document.getElementById("table")
    Array(TOTAL_ROWS)
        .fill()
        .forEach(item => table.append(createEmptyRow()))
}

function createEmptyRow () {
    const row = document.createElement("tr")
    const spark = document.createElement("span")
    spark.className = "spark"
    row.className = "row"
    COLUMNS.forEach(col => {
        const cell = document.createElement("td")
        if (col === "midprices") {
            cell.append(spark.cloneNode())
        }
        row.append(cell)
    })
    return row
}

function updateTable (data) {
    const tableRows = table.getElementsByClassName("row")
    data.forEach((values, i) => {
        setRowValues(tableRows[i], values)
    })
}

function setRowValues (row, values) {
    let cells = row.getElementsByTagName("td")
    COLUMNS.forEach((col, i) => {
        setCellContent(cells[i], values[col], col)
        // cells[i].innerHTML = getValueForColumn(col, values)
    })
}

function setCellContent (cell, value, col) {
    if (col === "name") {
        cell.innerHTML = value
    } else if (col === "midprices") {
        updateSpark(cell, value)
    } else {
        // everything else is a float, return in a readable format
        cell.innerHTML = parseFloat(value).toFixed(PRECISION)
    }
}

function updateSpark (cell, value) {
    const [spark] = cell.getElementsByClassName("spark")
    Sparkline.draw(spark, value)
}

// function getValueForColumn (col, value) {
//     if (col === "name") {
//         return value
//     }
//     if (col === "midprices") {
//         const sparkElement = document.createElement('span')
//         // const sparkline = new Sparkline(sparkElement)
//         // sparkline.draw([1,2,3,4,5,6])
//         Sparkline.draw(sparkElement, [1,2,3,4,5])
//         return sparkElement.outerHTML
//     }
//     // everything else is a float, return in a readable format
//     return parseFloat(value).toFixed(PRECISION)
// }

export default { initializeTable, updateTable }