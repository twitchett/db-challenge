/**
* A class to hold the data backing the table.
* Exposes a method to add/update data items, and a method to retrieve the full data set.
*/
class Model {

    /**
    * Creates a new Model object, initialized with an empty array.
    * 
    */
    constructor ({ period = 30, sortColumn = "lastChangeBid" } = {}) {
        this.data = []
        this.shift = false
        this.sortColumn = sortColumn
        setTimeout(_ => { this.shift = true }, period * 1000)
    }

    /**
    * Returns the current data, sorted ascending by the sortColumn.
    *
    * @return {Array} the sorted data
    */
    getData () {
        return this.data.sort((a, b) => b[this.sortColumn] - a[this.sortColumn])
    }

    /**
    * Adds/updates the data array with the given item.
    * If an item exists with the same 'name' property, it updates the data; otherwise,
    * a new element is added.
    *
    * @throws {Error} if the item fails validation
    */
    setItem (item) {
        const missingProperties = this._validateItem(item)
        if (missingProperties) {
            throw new Error('Item missing properties: ' + missingProperties.join(", "))
        }
        let idx = this.data.findIndex(i => i.name === item.name)
        if (Model.exists(idx)) {
            this.data[idx] = this._updateItem(item, this.data[idx])
        } else {
            this.data.push(this._createNewItem(item))
        }
    }

    /**
    * Checks that the item contains all the required properties.
    * 
    * @return [Array] an array of the missing properties, or null if the item is valid
    */
    _validateItem (item) {
        const required = new Set(["name", "bestBid", "bestAsk", this.sortColumn])
        const actual = [...required].filter(key => !item[key])
        return actual.length ? actual : null
    }

    /**
    * Augments the item with the `midprices` property
    */
    _createNewItem (item) {
        item.midprices = [Model.calculateMidprice(item)]
        return item
    }

    /**
    * Updates the item's `midprices` array with a new value.
    * If the time period has elapsed, also removes the oldest value from the array.
    *
    * @param {Object} newItem
    * @param {Object} oldItem
    * @return {Object} the newItem with the updated midprices
    */
    _updateItem (newItem, oldItem) {
        newItem.midprices = oldItem.midprices
        newItem.midprices.push(Model.calculateMidprice(newItem))
        if (this.shift) {
            newItem.midprices.shift()
        }
        return newItem
    }

    static calculateMidprice (item) {
        return (item.bestBid + item.bestAsk) / 2
    }

    static exists (idx) {
        return idx !== -1
    }
}

export default Model