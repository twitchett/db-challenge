const NUM_ITEMS = 12

function initializeTable () {
    let table = document.getElementById("table")
    let rows = Array(NUM_ITEMS)
        .fill()
        .forEach(item => {
            console.log('item blah')
            let row = document
                .getElementById("row-template")
                .cloneNode(true)
            row.id = ""
            row.className = "row"
            // return row
        table.append(row) // try and do this only once
    })
}

function refreshTable (data) {
    let tableRows = table.getElementsByClassName("row")
    data.forEach((values, i) => {
        fillValues(tableRows[i], values)
    })
}

function createNewRow (data) {
    let row = document
        .getElementById("row-template")
        .cloneNode(true) // true -> deep clone
    row.id = data.name
    return row
}

function fillValues (row, data) {
    let cells = row.getElementsByTagName('td')
    cells[0].innerHTML = data.name
    cells[1].innerHTML = data.bestBid
    cells[2].innerHTML = data.bestAsk
    cells[3].innerHTML = data.lastChangeBid
    cells[4].innerHTML = data.lastChangeAsk
    cells[5].innerHTML = data.openBid
    cells[6].innerHTML = data.openAsk
}

export default { initializeTable, refreshTable }