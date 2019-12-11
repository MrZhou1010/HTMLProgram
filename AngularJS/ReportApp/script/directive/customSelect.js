/**
 * Created by mobiletek on 2017/12/27.
 */

app.directive('customSelect',function ($filter) {
    return {
        restrict : 'AE',
        replace: true,
        scope: {

        },
        template : '<div class="select-wrapper">' +
        '<div class="select-input">' +
            '<input type="text" ng-model="value" ng-readonly="readonly" placeholder="{{ placeholder }}"/>' +
            '<span ng-bind="value"></span>' +
        '</div>' +
        '<ul ng-show="selectShow" class="select-list">' +
            '<li ng-repeat="item in items | filter: value">{{ item }}</li>' +
        '</ul>' +
        '</div>',
        link: function (scope,element,attrs) {
            element.bind('click',function () {
                scope.$apply(attrs.showlist);
            })
        },

    }
});
