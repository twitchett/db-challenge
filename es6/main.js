import controller from "./controller.js"
import model from "./model.js"

const STOMP_SERVER_URL = "ws://localhost:8011/stomp"
const PRICES_ENDPOINT = "/fx/prices"


const client = Stomp.client(STOMP_SERVER_URL)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}



function connectHandler() {
    controller.initializeTable()

    let subscription = client.subscribe(PRICES_ENDPOINT, function (response) {
        let body = JSON.parse(response.body)
        // console.log(body)
        // let row = document.getElementById(body.name)

        model.addItem(body)

        controller.refreshTable(model.getData())
    })
}

function errorHandler(error) {
  alert(error.headers.message)
}

client.connect({}, connectHandler, errorHandler)

export { client }