let dark_mode = true

// from https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript

function links(rule) {
    let css = document.createElement('style');
    css.type = 'text/css'
    if (css.styleSheet) css.styleSheet.cssText = rule // Support for IE
    else css.appendChild(document.createTextNode(rule)) // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css)
    }

// Load the rules and execute after the DOM loads
let rule

if (dark_mode) {
    // dark mode
    rule = `
    h1, h2, h3, h4, h5, p {
        color: #D6D8DA;
    }

    body {
        background-color: #242424;
    }
    .card {
        background-color: #303030;
        margin-bottom: 0px!important;
    }
    #region-main {
        background-color: #303030;
    }
    a {
        color: #007c41;
    }
    a:visited {
        color: #0ec76f;
    }
    a:hover {
        color: #28e089;
    }
    `
} else {
    // light mode
    rule = `
    a {
        color: #007c41;
    }
    a:visited {
        color: #00361b;
    }
    `
}

links(rule)

// TODO: click -> target new tab

// old

/* 
let all_a = document.querySelectorAll('a')

all_a.forEach(element => {
    element.style.color = '#4287f5'
})
*/
