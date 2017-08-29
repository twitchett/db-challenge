const data = []

function addItem (item) {
    let idx = data.findIndex(i => i.name === item.name)
    if (idx === -1) {
        data.push(item)
    } else {
        data[idx] = item
    }
}

function sortData () {
    data.sort((a, b) =>  b.lastChangeBid - a.lastChangeBid)
}

function getData () {
    return data
}

export default { addItem, sortData, getData }