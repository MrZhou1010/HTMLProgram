/**
 * Created by mobiletek on 2018/1/17.
 */

app.controller('customSelectController',['$scope',function ($scope) {
    $scope.typeData = ['路线','事件','往返一次','概要','图表','原始数据'];
    $scope.readonly = true;
    $scope.typePlaceholder = '选择类型';
    $scope.selectShow = false;

    $scope.devices = ['tt','abddad','marker','tom','west','ttimy','qurafaq'];
    $scope.groups = ['1','group1','manstord','name','require'];
}])