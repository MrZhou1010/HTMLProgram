/**
 * Created by mobiletek on 2017/12/27.
 */

app.config(['$routProvider'],function ($routProvider) {
    $routProvider.when('/reports',{
        templateUrl: 'reports.html',
        controller: 'reportsController',
    }).otherwise('/reports');
});
