
// for each of the speed settings
let _1 = document.getElementById('x1')
let _15 = document.getElementById('x15')
let _2 = document.getElementById('x2')

let dark_switch = document.getElementById('dark')
let light_switch = document.getElementById('light')

// send the right msg to content.js
_1.addEventListener('click', event => {
    send_msg(1)
})
_15.addEventListener('click', event => {
    send_msg(1.5)
})
_2.addEventListener('click', event => {
    send_msg(2)
})

dark_switch.addEventListener('click', event => {
    send_mode(true)
})
light_switch.addEventListener('click', event => {
    send_mode(false)
})

window.onload = function(e) {
    // get speed setting from chrome storage
    chrome.storage.sync.get('vid_speed', function(result) {
        let speed
        // console.log(result)
        // let radio_speed = document.getElementById("_1")
        if (Object.keys(result).length === 0 && result.constructor === Object) {
            speed = 2
            chrome.storage.sync.set({'vid_speed': speed})
            // console.log(speed)
            // set radio check
            _2.checked = true
        } else {
            speed = result.vid_speed
            // console.log(speed)
            if (speed == 2) {
                _2.checked = true
            } else if (speed == 1) {
                _1.checked = true
            } else {
                _15.checked = true
            }
        }
    })
    // get mode (dark/light)
    chrome.storage.sync.get('mode', function(result) {
        let mode
        // console.log(result)
        if (Object.keys(result).length === 0 && result.constructor === Object) {
            mode = true
            chrome.storage.sync.set({'mode': mode})
            dark_switch.checked = true
        } else {
            mode = result.mode
            if (mode == true) {
                dark_switch.checked = true
            } else {
                light_switch.checked = true
            }
        }
    })
}

function send_msg(vid_speed) {
    // chrome.tabs.sendMessage("1")
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {speed: vid_speed}
        );
    });
}
function send_mode(mode) {
    // chrome.tabs.sendMessage("1")
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {mode: mode}
        );
    });
}