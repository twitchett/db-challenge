class Controller {

    constructor ({ TOTAL_ROWS = 12, PRECISION = 6 } = {}) {
        this.sparklines = {}
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
        this.initializeEmptyTable()
    }

    initializeEmptyTable () {
        const [row] = this.table.getElementsByClassName("row")
        Array(this.TOTAL_ROWS)
            .fill()
            .forEach(_ => { row.insertAdjacentElement("afterend", row.cloneNode(true)) }) // true -> clone deep
    }

    updateTable (data) {
        const tableRows = this.table.getElementsByClassName("row")
        data.forEach((values, i) => {
            let { name, midprices } = values
            this.updateRowValues(tableRows[i], values) // TODO: don't set spark cell
            // this.updateSparkline(tableRows[i], name, midprices)
        })
    }

    updateRowValues (row, values) {
        // const c1 = row.querySelectorAll('.name, .value')
        let cells = row.getElementsByTagName("td")
        this.COLUMNS.forEach((col, i) => {
            // if (col !== "midprices") {
                this.setCellContent(cells[i], values[col], col)
                // cells[i].innerHTML = this.getValueForColumn(col, values[col])
            // }
        })
    }

    setCellContent (cell, value, col) {
        if (col === "name") {
            cell.innerHTML = value
        } else if (col === "midprices") {
            this.updateSpark(cell, value)
        } else {
            // everything else is a float, return in a readable format
            cell.innerHTML = parseFloat(value).toFixed(this.PRECISION)
        }
    }

    updateSpark (cell, midprices) {
        // let { name, midprices } = values
        // let sparkline = this.sparklines[name]
        // if (!sparkline) {
        //     let [el] = cell.getElementsByClassName("sparkline")
        //     sparkline = new Sparkline(el)
        //     this.sparklines[name] = sparkline
        // }
        // sparkline.draw(midprices)
        const [spark] = cell.getElementsByClassName("sparkline")
        Sparkline.draw(spark, midprices)
    }

    getValueForColumn (col, value) {
        if (col === "name") {
            return value
        }
        // everything else is a float, return in a readable format
        return parseFloat(value).toFixed(this.PRECISION)
    }

    updateSparkline (row, name, midprices) {
        const [spark] = cell.getElementsByClassName("sparkline")
        Sparkline.draw(spark, values)
        // console.log('row',row)
        // console.log(name, midprices)
        // let sparkline = this.sparklines[name]
        // if (!sparkline) {
        //     // TODO it would be nice to have a single condition for checking
        //     //
        //     let el = row.querySelector(".sparkline")
        //     // console.log('el', el)
        //     sparkline = new Sparkline(el)
        // }
        // sparkline.draw(midprices)
        // this.sparklines[name] = sparkline
    }
}


export default Controller