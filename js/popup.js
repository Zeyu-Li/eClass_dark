
// for each of the speed settings
let _1 = document.getElementById('x1')
let _15 = document.getElementById('x15')
let _2 = document.getElementById('x2')

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