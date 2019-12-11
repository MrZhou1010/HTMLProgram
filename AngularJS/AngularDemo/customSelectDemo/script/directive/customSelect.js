/**
 * Created by mobiletek on 2018/1/17.
 */

var app = angular.module('customSelectApp',[]);

app.directive('customSelect',function (filterFilter) {
    return {
        restrict : 'AE',
        replace: true,
        scope: {
            allData: '=items',
            isReadonly: '=readonly',
            placeholder: '=placeholder',
            selectShow: '@selectShow',
        },
        template : '<div class="select-wrapper">' +
        '<div class="select-input" ng-click="showListHandle()">' +
        '<input type="text" ng-model="value" ng-readonly="isReadonly" placeholder="{{ placeholder }}"/>' +
        '<span>v</span>' +
        '</div>' +
        '<ul ng-show="selectShow" class="select-list">' +
        '<li ng-repeat="item in items track by $index" ng-click="chooseType(item)">{{ item }}</li>' +
        '</ul>' +
        '</div>',
        link: function (scope,element,attrs) {
            scope.showListHandle = function () {
                scope.selectShow = !scope.selectShow;
                scope.items = scope.allData;
            }

            scope.chooseType = function (value) {
                scope.value = value;
                scope.selectShow = false;
            }

            if (!scope.isReadonly) {
                scope.$watch('value',function (value) {
                    scope.items = filterFilter(scope.allData,value);
                })
            }
        },
    }
});
