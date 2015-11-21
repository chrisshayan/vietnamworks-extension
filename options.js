/**
 * Created by chris on 11/21/15.
 */

/**
 * the function to save the changes of settings by user
 */
function saveOptions() {
    var browserNotification = document.getElementById('browser-notification').checked;
    VietnamWorksJobAlert.settings.set('browserNotification', browserNotification);

    document.getElementById('status').innerHTML = '<br/> Your changes have been saved as your preference.';
    setTimeout(function(){ document.getElementById('status').innerText =''; }, 3000); // wait then clear the message
}

/**
 * restoring the last state of settings
 */
function restoreOptions() {

    if(VietnamWorksJobAlert.settings.get('browserNotification')) {
        document.getElementById('browser-notification').setAttribute('checked', 'checked');
    } else {
        document.getElementById('browser-notification').setAttribute('checked', 'unchecked');
    }
}



// binding the functions to document
document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('save').addEventListener('click', saveOptions);
