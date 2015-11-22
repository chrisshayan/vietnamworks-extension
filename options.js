/**
 * Created by chris on 11/21/15.
 */

/**
 * the function to save the changes of settings by user
 */
function saveOptions() {
    var browserNotification = document.getElementById('browser-notification').checked;
    VietnamWorksJobAlert.settings.set('browserNotification', browserNotification);

    var minutesOption = document.getElementById('minutes');
    var selectedMinutes = minutesOption.options[minutesOption.selectedIndex].value;
    VietnamWorksJobAlert.settings.set('interval', parseInt(selectedMinutes));

    document.getElementById('status').innerHTML = '<br/> Your changes have been saved as your preference.';
    setTimeout(function(){ document.getElementById('status').innerText =''; }, 3000); // wait then clear the message
}

/**
 * restoring the last state of settings
 */
function restoreOptions() {

    if(VietnamWorksJobAlert.settings.get('browserNotification')) {
        document.getElementById('browser-notification').checked = true;
    } else {
        document.getElementById('browser-notification').checked = false;
    }

    var minutesOption = document.getElementById('minutes');
    switch (parseInt(VietnamWorksJobAlert.settings.get('interval'))) {
        case 60:
            minutesOption.options[0].selected = true;
            break;
        case 90:
            minutesOption.options[1].selected = true;
            break;
        case 120:
            minutesOption.options[2].selected = true;
            break;
        case 240:
            minutesOption.options[3].selected = true;
            break;
        default:
            minutesOption.options[0].selected = true;
    }
}



// binding the functions to document
document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('save').addEventListener('click', saveOptions);
