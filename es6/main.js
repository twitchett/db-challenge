import Controller from "./controller.js"
import Model from "./model.js"

const STOMP_SERVER_URL = "ws://localhost:8011/stomp"
const PRICES_ENDPOINT = "/fx/prices"
const PERIOD = 30

const client = Stomp.client(STOMP_SERVER_URL)

function connectHandler () {
    const controller = new Controller()
    const model = new Model(PERIOD)
    client.subscribe(PRICES_ENDPOINT, pricesResponseHandler.bind(null, model, controller))
    // TODO: unsubscribe
}

function pricesResponseHandler (model, controller, response) {
    const body = JSON.parse(response.body)
    model.addItem(body)
    controller.updateTable(model.getSortedData())
}

function errorHandler (error) {
  console.error('Stomp client error', error)
  alert(error)
}

client.connect({}, connectHandler, errorHandler)

client.debug = function (msg) {
    if (global.DEBUG) {
        console.info(msg)
    }
}

export { client }