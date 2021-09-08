let dark_mode

// Load the rules and execute after the DOM loads
let rule

const lightGrey = "#303030"
const darkGrey = "#242424"

function load() {
    if (dark_mode) {
        // dark mode
        rule = `
        h1, h2, h3, h4, h5, h6, p, li, .header-button-title, .anonforumnodiscuss, pre, .generaltable {
            color: #D6D8DA; // white-gray
        }
        
        .breadcrumb-item, .mb-3, .no-overflow, .groupselector, .author, .author-info, 
        .discussion span, table, .contentafterlink li span, .contentafterlink span, .forumnodiscuss {
            color: #D6D8DA; // white-gray
        }

        body {
            background-color: ${darkGrey}!important; // dark-gray
        }
        .card {
            margin-bottom: 0px!important;
        }
        #region-main, .card, .list-group-item {
            background-color: ${lightGrey}; // light-gray
        }
        .info {
            background-color: ${lightGrey}!important; // light-gray
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
            background-color: ${lightGrey}!important;
        }
        .no-overflow span {
            background-color: rgba(255, 207, 53, .235)!important
        }
        .popover-region-container, .notification {
            background-color: ${lightGrey}; // light-gray
        }
        .unread {
            background-color: #575757!important; // lighter-gray
        }
        /* increase video size */
        .mediaplugin > div {
            max-width: 75%!important;
        }
        .currentcourse {
            background-color: ${lightGrey}!important;
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
        #nav-drawer {
            background-color: ${lightGrey}!important;
        }
        .content .d-flex, .content .prompt, .content input[type="radio"] {
            color: #000;
        }
        .que .formulation {
            background-color: #f5feff;
        }
        .table-hover tbody tr:hover, table.grading-report tbody tr:hover, .forumheaderlist tbody tr:hover, .generaltable tbody tr:hover, table.flexible tbody tr:hover, .category_subcategories tbody tr:hover, table#modules tbody tr:hover, table#permissions tbody tr:hover {
            color: #262626!important;
        }
        .breadcrumb-item, .mb-3, .no-overflow, .groupselector, .author, .author-info, .discussion span, table, .contentafterlink li span, .contentafterlink span, .forumnodiscuss {
            color: #fff;
        }
        `
        // TODO: no horizontal scroll
    } else {
        // light mode
        rule = `
        a {
            color: #00c466;
            transition: .5s;
        }
        a:visited {
            color: #00753b;
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
}


// from https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript
function cssInjector() {
    let css = document.createElement('style');
    css.type = 'text/css'
    if (css.styleSheet) css.styleSheet.cssText = rule // Support for IE
    else css.appendChild(document.createTextNode(rule)) // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css)
}

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
    // console.log(result)
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
chrome.storage.sync.get('mode', function(result) {
    // console.log(result)
    if (Object.keys(result).length === 0 && result.constructor === Object) {
        dark_mode = true
        chrome.storage.sync.set({'mode': dark_mode})
    } else {
        dark_mode = result.mode
        // console.log(speed)
    }
    load()
    // console.log(rule)
    cssInjector()
})

function change_speed(speed) {
    if (document.querySelector('video')) {
        document.querySelector('video').playbackRate = speed
    }
}

// event listener for option changes
chrome.runtime.onMessage.addListener((msg, sender) => {
    if (typeof msg.speed !== 'undefined') {
        let speed = msg.speed

        // changes current video
        if (document.querySelector('video')) {
            document.querySelector('video').playbackRate = msg.speed
        }

        // saves changes
        chrome.storage.sync.set({'vid_speed': speed})
    } else {
        dark_mode = msg.mode
        // set dark or light
        chrome.storage.sync.set({'mode': dark_mode})
    }
})
