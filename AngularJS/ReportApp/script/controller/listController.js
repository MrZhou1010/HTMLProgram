/**
 * Created by mobiletek on 2017/12/27.
 */

app.controller('listController',['$scope',function ($scope) {
    $scope.selectShow = false;
    $scope.items = [1,2,3,4,5,6];
    $scope.value = '';
    $scope.readonly = true;
    $scope.placeholder = "请输入...";
    $scope.showListHandle = function () {
        $scope.selectShow = !$scope.selectShow;
    }
}]);

