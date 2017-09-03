import test from "tape"
import Model from "../es6/model.js"

test("Creates a new model", (t) => {
    t.plan(1)
    t.ok((new Model()))
})

test("setItem() saves data on the model, which is returned by getData()", (t) => {
    const model = new Model()
    const data = {
        "name": "test1",
        "amount": 1000.00,
        "bestBid": 123.456,
        "bestAsk": 22.33,
        "lastChangeBid": 0.1234
    }
   
    model.setItem(data)

    const modelData = model.getData()[0]
    for (let key in data) {
        t.equal(data[key], modelData[key],
            `The ${key} property on the model should match that of the input data`)
    }
    t.end()
})

test("setItem() creates an additional midprices property on the model", (t) => {
    t.plan(1)
    const model = new Model()
    const data = {
        "name": "test1",
        "amount": 1000.00,
        "bestBid": 123.456,
        "bestAsk": 22.33,
        "lastChangeBid": 0.1234
    }
    model.setItem(data)
    t.ok(model.getData()[0].midprices)
})

test("setItem() throws an error if the data is invalid", (t) => {
    t.plan(1)
    const model = new Model()
    const data = {
        "name": "test2",
        "amount": 1000.00,
        "lastChangeBid": -4.321
    }
    t.throws(model.setItem.bind(model, data),
        /Item missing properties: bestBid, bestAsk/,
        "The call to setItem should throw, with a message detailing the missing properties.")
})

test("getData() returns an empty array if no data has been set", (t) => {
    t.plan(1)
    t.deepEqual((new Model()).getData(), [])
})

test("getData() always returns sorted data (defaulting to descending by lastChangeBid)", (t) => {
    t.plan(2)
    const model = new Model()
    const high = {
        "name": "high",
        "amount": 1000.00,
        "bestBid": 123.456,
        "bestAsk": 22.33,
        "lastChangeBid": 9.998
    }
    const middle = Object.assign({}, high, {
        name: "middle",
        lastChangeBid: 0.101
    })
    const low = Object.assign({}, high, {
        name: "low",
        lastChangeBid: -4.321
    })

    model.setItem(low)
    model.setItem(high)
    t.deepEqual(["high", "low"], model.getData().map(item => item.name),
        "The item with the highest lastChangeBid value should be first in the array")

    model.setItem(middle)
    t.deepEqual(["high", "middle", "low"], model.getData().map(item => item.name), 
        "The item should be positioned in between the higher and the lower items")
})