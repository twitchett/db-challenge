class Model {

    constructor (period) {
        this.data = []
        this.shift = false
        setTimeout(_ => { this.shift = true }, period * 1000)
    }

    getSortedData () {
        return this.data.sort((a, b) => b.lastChangeBid - a.lastChangeBid)
    }

    addItem (item) {
        // console.log('adding item',item)
        let idx = this.data.findIndex(i => i.name === item.name)
        if (Model.exists(idx)) {
            this.data[idx] = this._updateItem(item, this.data[idx])
        } else {
            this.data.push(this._createNewItem(item))
        }
    }

    _createNewItem (item) {
        item.midprices = [Model.calculateMidprice(item)]
        return item
    }

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