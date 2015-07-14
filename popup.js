/**
 * Created by chris on 7/14/15.
 */
document.addEventListener('DOMContentLoaded', function() {
    var setupJobAlertButton = document.getElementById('setupJobAlertButton');


    setupJobAlertButton.addEventListener('click', function() {
        var keyword = document.getElementById('keyword').value;
        VietnamWorksJobAlert.settings.set('keyword', keyword);
        alert(VietnamWorksJobAlert.settings.get('keyword'));

        fetchJobs();
    });
}, false);