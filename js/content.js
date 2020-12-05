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
    .breadcrumb-item, .mb-3, .no-overflow, .groupselector, .author, .author-info, 
    .discussion span, table, .contentafterlink li span, .contentafterlink span, .forumnodiscuss {
        color: #D6D8DA; // white-gray
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
    .no-overflow span {
        background-color: rgba(255, 207, 53, .135)!important
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
    /* hovered tables */
    .table-hover tbody tr:hover, table.grading-report tbody tr:hover, .forumheaderlist tbody tr:hover, 
    .generaltable tbody tr:hover, table.flexible tbody tr:hover, .category_subcategories tbody tr:hover, 
    table#modules tbody tr:hover, table#permissions tbody tr:hover  {
        color: #e8e8e8!important;
    }
    .sectionhidden .section-title {
        color: #284E36!important;
        padding-left: 10px;
    }
    .outcome .feedback p {
        color: #31708f!important;
    }
    .criteria tbody, .quizreviewsummary {
        color: #000!important;
        background-color: #fff;
    }
    .criteria tbody tr:hover, .criteria tbody td:hover, .quizreviewsummary tr:hover, .quizreviewsummary td:hover {
        color: #333333!important;
    }
    .calendar_event_course {
        background-color: rgba(255, 211, 189, .5);
    }
    `
    // TODO: no horizontal scroll
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
    .no-overflow span, .forumpost.unread .row.header {
        background-color: rgba(255, 207, 53, .4)!important
    }
    `
}

cssInjector(rule)

// click -> target new tab

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

// vid speed
chrome.storage.sync.get('vid_speed', function(result) {
    let speed
    if (Object.keys(result).length === 0 && result.constructor === Object) {
        speed = 2
        chrome.storage.sync.set({'vid_speed': speed})
        // console.log(speed)
    } else {
        speed = result.vid_speed
        // console.log(speed)
    }
    change_speed(speed)
})

function change_speed(speed) {
    if (document.querySelector('video')) {
        document.querySelector('video').playbackRate = speed
    }
}

// event listener for option changes
chrome.runtime.onMessage.addListener((msg, sender) => {
    let speed = msg.speed

    // changes current video
    if (document.querySelector('video')) {
        document.querySelector('video').playbackRate = msg.speed
    }

    // saves changes
    chrome.storage.sync.set({'vid_speed': speed})
})
