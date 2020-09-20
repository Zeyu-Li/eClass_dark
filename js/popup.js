let one = document.getElementById('x1')
let one5 = document.getElementById('x15')
let two = document.getElementById('x2')

one.addEventListener('click', event => {
    send_msg(1)
})
one5.addEventListener('click', event => {
    send_msg(1.5)
})
two.addEventListener('click', event => {
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