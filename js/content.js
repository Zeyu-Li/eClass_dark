let dark_mode = true

// from https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript

function cssInjector(rule) {
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
    h1, h2, h3, h4, h5, p, li{
        color: #D6D8DA;
    }
    .breadcrumb-item {
        
        color: #D6D8DA!important;
    }

    body {
        background-color: #242424!important;
    }
    .card {
        background-color: #303030;
        margin-bottom: 0px!important;
    }
    #region-main {
        background-color: #303030;
    }
    a {
        color: #0ec76f;
        transition: .5s;
    }
    a:visited {
        color: #007c41;
        transition: .5s;
    }
    a:hover {
        color: #28e089;
        transition: .5s;
    }
    .no-overflow span {
        background-color: rgba(255, 207, 53, .4)!important
    }
    .breadcrumb .breadcrumb-item a:hover {
        color: #28e089;
        transition: .5s;
    }
    .forumnodiscuss {
        margin-bottom: 10px!important;
        
    }
    .welcome_area {
        color: #D6D8DA!important;
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

cssInjector(rule)

// TODO: click -> target new tab

function newTabs() {
    let links = document.querySelectorAll('.activityinstance a')
    console.log(links)
    links.forEach(element => {
        element.target = "_blank"
    })

}

newTabs()

// old

/* 
let all_a = document.querySelectorAll('a')

all_a.forEach(element => {
    element.style.color = '#4287f5'
})
*/
