/**
 * Created by mobiletek on 2017/12/27.
 */

app.controller('reportsController',['$scope','$filter','reportsData',function ($scope,$filter,reportsData) {

    $scope.isShowReportTypeList = false;
    $scope.isShowReportDeviceList = false;
    $scope.isShowReportGroupList = false;

    $scope.isShowReportDateFromList = false;
    $scope.isShowReportTimeFromList = false;
    $scope.isShowReportDateToList = false;
    $scope.isShowReportTimeToList = false;

    $scope.startdate = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.starttime = $filter('date')(new Date(),'HH:mm');
    $scope.enddate = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.endtime = $filter('date')(new Date(),'HH:mm');

    $scope.typeItems = reportsData.types;
    $scope.deviceItems = reportsData.devices;
    $scope.groups = reportsData.groups;
    $scope.timeItems = reportsData.times;

    $scope.showReportTypeList = function () {
        $scope.isShowReportTypeList = !$scope.isShowReportTypeList;
    }
    $scope.selectTypeHandle = function (value) {
        $scope.type = value;
        $scope.isShowReportTypeList = false;
    }

    $scope.showReportDeviceList = function () {
        $scope.isShowReportDeviceList = !$scope.isShowReportDeviceList;
    }
    var deviceArr = [];
    $scope.selectDeviceHandle = function (value) {
        if (deviceArr.length == 0) {
            deviceArr.push(value);
        } else {
             if (deviceArr.indexOf(value) == -1) {
                 deviceArr.push(value);
             }
             else {
                 deviceArr.splice(deviceArr.indexOf(value),1);
             }
        }
        console.log(deviceArr);
        $scope.device = deviceArr.join(',');
        //$scope.isShowReportDeviceList = false;
    }

    $scope.showReportGroupList = function () {
        $scope.isShowReportGroupList = !$scope.isShowReportGroupList;
    };

    $scope.showReportDateFromList = function () {
        $scope.isShowReportDateFromList = !$scope.isShowReportDateFromList;
    };
    $scope.showReportTimeFromList = function () {
        $scope.isShowReportTimeFromList = !$scope.isShowReportTimeFromList;
    };
    $scope.showReportDateToList = function () {
        $scope.isShowReportDateToList = !$scope.isShowReportDateToList;
    };
    $scope.showReportTimeToList = function () {
        $scope.isShowReportTimeToList = !$scope.isShowReportTimeToList;
    };
    /*
    $scope.products = products;
    $scope.order = "-"; //默认是升序,-表示降序
    $scope.orderType = "id"; //以id来排序,不能直接在页面以id这个字段排序
    $scope.changeOrder = function (type) {
        $scope.orderType = type;
        //如果本来是降序，就变为升序，如果是升序，就变为降序
        if ($scope.order === '') {
            $scope.order = '-';
        } else {
            $scope.order = '';
        }
    }
    */
}]).service("reportsData", function() {
    return {
        types: ['路线','事件','往返一次','概要','图表','原始数据'],
        devices: ['tt','ddd','dd','string','uuu'],
        groups: [1,2,2,3,4],
        times: ['00:00','00:15','00:30','01:00','01:15','01:30','02:00'],
    }
});