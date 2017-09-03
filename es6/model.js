import Midprices from "./midprices.js"

/*
* A class to hold the Prices data.
* It exposes a method to add/update data items, and a method to retrieve the sorted data set.
* Data is automatically sorted by "lastChangeBid" value, descending.
*/
class Model {

    /*
    * Creates a new Model object, initialized with an empty array.
    */
    constructor ({ sortColumn = "lastChangeBid" } = {}) {
        this._data = []
        this._sortColumn = sortColumn
    }

    /*
    * Returns the current data as an array of objects, sorted descending by the sortColumn value.
    */
    getData () {
        return this._data.sort((a, b) => b[this._sortColumn] - a[this._sortColumn])
    }

    /*
    * Adds/updates the data array with the given price item.
    * If an item exists with the same 'name' property, it updates the values; otherwise,
    * a new element is added.
    *
    * @throws {Error} if the price item fails validation
    */
    setItem (item) {
        const missingProperties = this._validateItem(item)
        if (missingProperties) {
            throw new Error(`Item missing properties: ${missingProperties.join(", ")}`)
        }
        let idx = this._data.findIndex(i => i.name === item.name)
        if (Model.exists(idx)) {
            this._data[idx] = this._updateItem(item, this._data[idx])
        } else {
            this._data.push(this._createNewItem(item))
        }
    }

    /*
    * Checks that the item contains all the required properties.
    * 
    * @return [Array] an array of the missing properties, or null if the item is valid
    */
    _validateItem (item) {
        const required = new Set(["name", "bestBid", "bestAsk", this._sortColumn])
        const actual = [...required].filter(key => !item[key])
        return actual.length ? actual : null
    }

    _createNewItem (item) {
        return Object.assign(item, { midprices: new Midprices(item) })
    }

    _updateItem (newItem, oldItem) {
        return Object.assign(newItem, { midprices: oldItem.midprices.update(newItem) })
    }

    static exists (idx) {
        return idx !== -1
    }
}

export default Model