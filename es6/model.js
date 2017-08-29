const data = []

function addItem (item, shift) {
    let idx = data.findIndex(i => i.name === item.name)
    if (exists(idx)) {
        data[idx] = updateItem(item, data[idx], shift)
    } else {
        data.push(createNewItem(item))
    }
}

function createNewItem (item) {
    item.midprices = [calculateMidprice(item)]
    return item
}

function updateItem (newItem, oldItem, shift) {
    newItem.midprices = oldItem.midprices
    newItem.midprices.push(calculateMidprice(newItem))
    if (shift) {
        console.log('shift is true!')
        newItem.midprices.shift()
    }
    return newItem
}

function calculateMidprice (item) {
    return (item.bestBid + item.bestAsk) / 2
}

function getSortedData () {
    return data.sort((a, b) => b.lastChangeBid - a.lastChangeBid)
}

function exists (idx) {
    return idx !== -1
}

export default { addItem, getSortedData }