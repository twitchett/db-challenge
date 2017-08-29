import controller from "./controller.js"
import model from "./model.js"

const STOMP_SERVER_URL = "ws://localhost:8011/stomp"
const PRICES_ENDPOINT = "/fx/prices"

const client = Stomp.client(STOMP_SERVER_URL)

function connectHandler () {
    controller.initializeTable()
    let subscription = client.subscribe(PRICES_ENDPOINT, pricesResponseHandler)
    // TODO: unsubscribe
}

function pricesResponseHandler (response) {
    let body = JSON.parse(response.body)
    model.addItem(body)
    model.sortData()
    controller.updateValues(model.getData())
}

function errorHandler (error) {
  alert(error.headers.message)
}

client.connect({}, connectHandler, errorHandler)

client.debug = function (msg) {
    if (global.DEBUG) {
        console.info(msg)
    }
}

export { client }