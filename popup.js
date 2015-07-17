/**
 * Created by chris on 7/14/15.
 */
function showHideViewAllButton() {
    if(VietnamWorksJobAlert.settings.get('numberMatchingJobs') > 0) {
        document.getElementById('viewAllJobsButton').href =  getVietnamWorksUrl() + '?' + VietnamWorksJobAlert.settings.get('utm');
        document.getElementById('viewAllJobsButton').text =  VietnamWorksJobAlert.settings.get('numberMatchingJobs') + ' jobs found, click here to review them.';
        document.getElementById('viewJobsDiv').style.visibility = "visible";
    } else {
        document.getElementById('viewJobsDiv').style.visibility = "hidden";
    }
}

function reset() {
    VietnamWorksJobAlert.settings.set('numberMatchingJobs', 0);
    showHideViewAllButton();
}

function setupJobAlert() {
    reset();

    var keyword = document.getElementById('ja-title').value;
    var category = document.getElementById('ja-category').value;
    var jobLevel = document.getElementById('ja-joblevel').value;
    var location = document.getElementById('ja-location').value;
    var salary = document.getElementById('ja-salary').value;

    VietnamWorksJobAlert.settings.set('keyword', keyword);
    VietnamWorksJobAlert.settings.set('category', category);
    VietnamWorksJobAlert.settings.set('jobLevel', jobLevel);
    VietnamWorksJobAlert.settings.set('location', location);

    if(salary) {
        VietnamWorksJobAlert.settings.set('salary', salary);
    } else {
        VietnamWorksJobAlert.settings.set('salary', 0);
    }

    fetchJobs();
    showHideViewAllButton();

    setTimeout(function () {
        window.close();
    }, 3000);
}

function viewAllJobs() {
    var url = getVietnamWorksUrl();
    chrome.tabs.create({url: getVietnamWorksUrl() + '/?' + VietnamWorksJobAlert.settings.get('utm') });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('setupJobAlertButton').addEventListener('click', setupJobAlert );
    document.getElementById('viewAllJobsButton').addEventListener('click', viewAllJobs );

    document.getElementById('ja-title').value = VietnamWorksJobAlert.settings.get('keyword');
    document.getElementById('ja-category').value = VietnamWorksJobAlert.settings.get('category');
    document.getElementById('ja-joblevel').value = VietnamWorksJobAlert.settings.get('jobLevel');
    document.getElementById('ja-location').value = VietnamWorksJobAlert.settings.get('location');
    if (VietnamWorksJobAlert.settings.get('salary') != 0) {
        document.getElementById('ja-salary').value = VietnamWorksJobAlert.settings.get('salary');
    }

    showHideViewAllButton();
}, false);