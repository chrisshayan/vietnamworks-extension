/**
 * Created by chris on 7/14/15.
 */
document.addEventListener('DOMContentLoaded', function() {
    var setupJobAlertButton = document.getElementById('setupJobAlertButton');

    setupJobAlertButton.addEventListener('click', function() {
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
    });

    document.getElementById('ja-title').value = VietnamWorksJobAlert.settings.get('keyword');
    document.getElementById('ja-category').value = VietnamWorksJobAlert.settings.get('category');
    document.getElementById('ja-joblevel').value = VietnamWorksJobAlert.settings.get('jobLevel');
    document.getElementById('ja-location').value = VietnamWorksJobAlert.settings.get('location');

    if(VietnamWorksJobAlert.settings.get('salary') != 0) {
        document.getElementById('ja-salary').value = VietnamWorksJobAlert.settings.get('salary');
    }


}, false);