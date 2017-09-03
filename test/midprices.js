import test from "tape"
import Midprices from "../es6/midprices.js"

test("Creates a new empty Midprices object", (t) => {
    t.plan(1)
    t.deepEqual((new Midprices()).get(), [])
})

test("Creates a new Midprices object with an initial value", (t) => {
    t.plan(1)
    t.deepEqual((new Midprices({ bestBid: 6, bestAsk: 4 })).get(), [5])
})

test("update() returns the midprices object", (t) => {
    t.plan(1)
    const midprices = new Midprices()
    t.equal(midprices, midprices.update({ bestBid: 1, bestBid: 2 }))
})

test("update() adds computed averages to the midprices array, in the order the inputs were received", (t) => {
    t.plan(1)
    const midprices = new Midprices()
    const items = [{
        bestAsk: 10,
        bestBid: 6
    },
    { 
        bestAsk: 4,
        bestBid: 6
    },
    {
        bestAsk: 1,
        bestBid: 2
    }].forEach(item => midprices.update(item))

    t.deepEqual(midprices.get(), [8, 5, 1.5],
        "The array should contain the averages of the three items")
})

test("The midprices are removed from the array after a time period", (t) => {
    t.plan(4)
    const period = 1
    const period_ms = period * 1000
    const t2 = 400
    const offset = 100

    const midprices = new Midprices({ bestBid: 6, bestAsk: 4 }, { period: period }) // starts at 0 ms
    t.deepEqual(midprices.get(), [5], "There should be one value in the midprices array")

    setTimeout(() => {
        midprices.update({ bestBid: 10, bestAsk: 6 })
        t.deepEqual(midprices.get(), [5, 8], "There should be two values in the midprices array")
    }, t2)  // start at ~400 ms

    setTimeout(() => {
        t.deepEqual(midprices.get(), [8], "The first value should be removed from the array")
    }, period_ms + offset)  // removed after 1100 ms

    setTimeout(() => {
        t.deepEqual(midprices.get(), [], "The second value should be removed from the array")  
    }, period_ms + t2 + offset) // removed after 1500 ms
})