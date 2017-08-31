import Sparkline from "../site/sparkline.js"

class Controller {

    constructor ({ TOTAL_ROWS = 12, PRECISION = 6 } = {}) {
        this.TOTAL_ROWS = TOTAL_ROWS    // number of rows to generate
        this.PRECISION = PRECISION      // number of decimal places to display for value cells
        this.COLUMNS = [                // data keys mapping to the table headers (note order must match)
            "name",
            "bestBid",
            "bestAsk",
            "lastChangeBid",
            "lastChangeAsk",
            "openBid",
            "openAsk",
            "midprices"
        ]
        this.table = document.getElementById("table")
        this._initializeEmptyTable()
    }

    _initializeEmptyTable () {
        const [row] = this.table.getElementsByClassName("row")
        Array(this.TOTAL_ROWS)
            .fill()
            .forEach(_ => { row.insertAdjacentElement("afterend", row.cloneNode(true)) }) // true -> clone deep
    }

    updateTable (data) {
        const tableRows = this.table.getElementsByClassName("row")
        data.forEach((values, i) => {
            this._updateRowValues(tableRows[i], values)
        })
    }

    _updateRowValues (row, values) {
        let cells = row.getElementsByTagName("td")
        this.COLUMNS.forEach((col, i) => {
            this._setCellContent(cells[i], values[col], col)
        })
    }

    _setCellContent (cell, value, col) {
        if (col === "name") {
            cell.innerHTML = value
        } else if (col === "midprices") {
            this._updateSpark(cell, value)
        } else {
            // everything else is a float, return in a readable format
            cell.innerHTML = parseFloat(value).toFixed(this.PRECISION)
        }
    }

    _updateSpark (cell, midprices) {
        const [spark] = cell.getElementsByClassName("sparkline")
        Sparkline.draw(spark, midprices)
    }
}


export default Controller