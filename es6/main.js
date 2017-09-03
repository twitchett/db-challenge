/*
* This module serves as the entrypoint to the application.
*
* Usage: include this file on the same page as the HTML table to populate.
* To connect to the server, call start(), passing an object with a tableId property
*   e.g. { tableId: "prices_table" }
*/

import { Stomp } from "../site/stomp.js"
import Controller from "./controller.js"
import Model from "./model.js"

global.DEBUG === process.env.DEBUG || false

const STOMP_SERVER_URL = "ws://localhost:8011/stomp"
const PRICES_ENDPOINT = "/fx/prices"
const client = Stomp.client(STOMP_SERVER_URL)

function connectHandler ({ tableId }) {
    const COLUMNS = [     // data keys mapping to the table headers (note: order must match)
        "name",
        "bestBid",
        "bestAsk",
        "lastChangeBid",
        "lastChangeAsk",
        "openBid",
        "openAsk",
        "midprices"
    ]
    const model = new Model()
    const controller = new Controller({
        tableId: tableId,
        COLUMNS: COLUMNS
    })
    client.subscribe(PRICES_ENDPOINT, pricesResponseHandler.bind(null, model, controller))
    // TODO: unsubscribe
}

function pricesResponseHandler (model, controller, response) {
    const body = JSON.parse(response.body)
    model.setItem(body)
    controller.updateTable(model.getData())
}

function errorHandler (error) {
    console.error('Stomp client error', error)
    alert(error)
}

function start (opts) {
    client.debug = function (msg) {
        if (global.DEBUG) {
            console.info(msg)
        }
    }
    client.connect({}, connectHandler.bind(null, opts), errorHandler)
}

export { start }