const DEFAULT_PERIOD = 30 // in seconds

/*
* A class to calculate and store an item's midprices (average) values.
* Values are stored in an array, and removed after a default period of 30 seconds.
*/
class Midprices {
    
    constructor (item, { period = DEFAULT_PERIOD } = {}) {
        this._midprices = []
        this._period = period * 1000 // convert to ms
        if (item) {
            this.update(item)
        }
    }

    update ({ bestBid, bestAsk }) {
        this._midprices.push(Midprices.calculateMidprice(bestBid, bestAsk))
        setTimeout(() => this._midprices.shift(), this._period)
        return this
    }

    get () {
        return this._midprices
    }
    
    static calculateMidprice (bestBid, bestAsk) {
        return (bestBid + bestAsk) / 2
    }
}

export default Midprices