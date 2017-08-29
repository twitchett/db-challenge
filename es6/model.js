const data = []


function addItem (item) {
    let idx = data.findIndex(i => i.name === item.name)
    if (idx === -1) {
        data.push(item)
    } else {
        data[idx] = item
    }

    data.sort((a, b) =>  a.lastChangeBid < b.lastChangeBid)
}

function getData () {
    return data
}

export default { addItem, getData }