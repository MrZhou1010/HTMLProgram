/**
 * Created by mobiletek on 2017/12/27.
 */


app.directive('reportTable',function () {
    return {
        restrict : 'AE',
        template : '<table class="table">' +
        '<thead><tr>' +
        '<td></td>' +
        '</tr></thead>' +
        '<tbody></tbody>' +
        '</table>',
    }
});