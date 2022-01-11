const config = require(`./config.json`)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //importing node-fetch (updated)

fetch(`https://discloud.app/status/bot/882715660134797342/logs`, { // https://discloud.app/status/user or https://discloud.app/status/bot/:id_bot  
    headers: {
        "api-token": config.Discloud
    }
}).then(info => info.json()).then(json => console.log(json))

