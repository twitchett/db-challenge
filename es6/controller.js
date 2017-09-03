import Sparkline from "../site/sparkline.js"

/*
* A class to manage the HTML prices table.
*/
class Controller {

    /*
    * Creates the empty HTML table. After calling the constructor, data can be populated
    * using updateTable().
    * 
    * @param {string} tableId - the id of the HTML Table element on the page (must exist already)
    * @param {number} COLUMNS - data keys mapping to the table headers
    * @param {number} TOTAL_ROWS - the number of rows in the table
    * @param {number} PRECISION - the number of decimal places to display numerical values
    */
    constructor ({ tableId, COLUMNS, TOTAL_ROWS = 12, PRECISION = 5 } = {}) {
        const table = document.getElementById(tableId)
        if (!table || !COLUMNS) {
            throw new Error("Columns not provided, or Table element not found")
        }
        this.PRECISION = PRECISION
        this.TOTAL_ROWS = TOTAL_ROWS -1  // there's one already, so subtract 1
        this.COLUMNS = COLUMNS
        this._table = table
        this._initializeEmptyTable()
    }

    _initializeEmptyTable () {
        const [row] = this._table.getElementsByClassName("row")
        Array(this.TOTAL_ROWS)
            .fill()
            .forEach(_ => { row.insertAdjacentElement("afterend", row.cloneNode(true)) }) // true -> clone deep
    }

    /*
    * Populates the table with values. Data must be an array of objects; 
    * the object properties must correspond to the table columns.
    */
    updateTable (data) {
        const tableRows = this._table.getElementsByClassName("row")
        data.forEach((values, i) => {
            if (i >= tableRows.length) {
                throw new Error("Number of data elements exceeds number of table rows")
            }
            this._updateRowValues(tableRows[i], values)
        })
    }

    _updateRowValues (row, values) {
        // TODO: validate input
        const cells = row.getElementsByTagName("td")
        this.COLUMNS.forEach((col, i) => {
            this._setCellContent(cells[i], values[col], col)
        })
    }

    _setCellContent (cell, value, col) {
        if (col === "name") {
            cell.firstElementChild.innerHTML = value
        } else if (col === "midprices") {
            this._updateSparkline(cell, value)
        } else {
            cell.firstElementChild.innerHTML = parseFloat(value).toFixed(this.PRECISION)
        }
    }

    _updateSparkline (cell, midprices) {
        const [spark] = cell.getElementsByClassName("sparkline")
        Sparkline.draw(spark, midprices.get())
    }
}

export default Controller