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
    h1, h2, h3, h4, h5, p, li, .header-button-title, .anonforumnodiscuss, pre {
        color: #D6D8DA; // white-gray
    }
    .breadcrumb-item, .mb-3, .no-overflow, .groupselector, .author, .author-info, .discussion span, table {
        color: #D6D8DA!important; // white-gray
    }

    body {
        background-color: #242424!important; // dark-gray
    }
    .card {
        margin-bottom: 0px!important;
    }
    #region-main, .card {
        background-color: #303030; // light-gray
    }
    .info {
        background-color: #303030!important; // light-gray
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
    .no-overflow span, .forumpost.unread .row.header {
        background-color: rgba(255, 207, 53, .4)!important
    }
    .breadcrumb .breadcrumb-item a:hover {
        color: #28e089;
        transition: .5s;
    }
    .forumnodiscuss, .anonforumnodiscuss {
        margin-bottom: 10px!important;
        
    }
    .welcome_area {
        color: #D6D8DA!important;
    }
    .node_category, .profile_tree section {
        background-color: #303030!important;

    }
    .content li {
        color: #284E36
    }
    .popover-region-container, .notification {
        background-color: #303030; // light-gray
    }
    .unread {
        background-color: #575757!important; // lighter-gray
    }
    /* increase video size */
    .mediaplugin > div {
        max-width: 75%!important;
    }
    .currentcourse {
        background-color: #303030!important;

    }
    `
} else {
    // light mode
    rule = `
    a {
        color: #007c41;
        transition: .5s;
    }
    a:visited {
        color: #00361b;
        transition: .5s;
    }
    a:hover {
        color: #28e089;
        transition: .5s;
    }
    `
}

cssInjector(rule)

// TODO: click -> target new tab

function newTabs() {
    let links = document.querySelectorAll('.activityinstance a')
    links.forEach(element => {
        element.target = "_blank"
    })
    let main_pg = document.querySelectorAll('.title a')
    main_pg.forEach(element => {
        element.target = "_blank"
    })
}

newTabs()

function videoSpeed() {
    // check if video exists
    if (document.querySelector('video')) {
        document.querySelector('video').playbackRate = 2
    }
}

videoSpeed()
