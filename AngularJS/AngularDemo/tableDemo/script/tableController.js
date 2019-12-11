/**
 * Created by mobiletek on 2018/1/15.
 */

var app = angular.module('tableApp',[]);

app.controller('tableController',['$scope','$filter',function ($scope,$filter) {

    $scope.allData = [
        {'id':1,'name':'adad','phone':57707587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':2,'name':'addaaead','phone':67977587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':3,'name':'adqead','phone':67275874564,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':4,'name':'dadad','phone':17375871454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':5,'name':'adaeqd','phone':67275876454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':6,'name':'a1dad','phone':67875874514,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':7,'name':'eqedad','phone':63775857454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':8,'name':'adad','phone':27745874534,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':9,'name':'adad','phone':67765874554,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':10,'name':'adad','phone':97773587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':11,'name':'adad','phone':61775187454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':12,'name':'adad','phone':67775871454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':13,'name':'adad','phone':37775087454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':14,'name':'gagadad','phone':67727587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':15,'name':'adad','phone':67775837454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':16,'name':'zadad','phone':67775877454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':17,'name':'adad','phone':61775876454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':18,'name':'gsadad','phone':67717587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':19,'name':'asfdad','phone':67727587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':20,'name':'adad','phone':67331787454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':21,'name':'nndad','phone':67772587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':22,'name':'nfdad','phone':69977587454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
        {'id':23,'name':'sdad','phone':671775987454,'email':'kdad@sd.com','birthdate':'1997-01-15'},
    ];


    $scope.currentRow = 10;
    $scope.rows = [5,10,20,50,100];

    function reset() {
        $scope.currentPage = 1;

        $scope.currentFirstItem = 1;

        if ($scope.allData.length%($scope.currentRow) == 0) {
            $scope.totalPage = parseInt($scope.allData.length/$scope.currentRow);
        } else {
            $scope.totalPage = parseInt($scope.allData.length/$scope.currentRow) + 1;
        }

        if ($scope.totalPage > 1) {
            $scope.currentLastItem = $scope.currentRow;
        } else {
            $scope.currentLastItem = $scope.allData.length;
        }
    }

    function renderData() {
        $scope.currentData = [];
        for (var index = $scope.currentFirstItem - 1; index < $scope.currentLastItem; index ++) {
            $scope.currentData.push($scope.allData[index]);
        }
    }
    reset();
    renderData();

    $scope.rowChangeHandle = function () {
        reset();
        renderData();
    }

    $scope.firstHandle = function () {
        if ($scope.currentPage !== 1) {
            reset();
            renderData();
        } else {
            //不可点击
        }
    }

    $scope.lastHandle = function () {
        if ($scope.currentPage !== $scope.totalPage) {
            $scope.currentPage = $scope.totalPage;
            $scope.currentFirstItem = ($scope.currentPage -1) * $scope.currentRow + 1;
            $scope.currentLastItem = $scope.allData.length;

            renderData();
        } else {
            //不可点击
        }
    }

    $scope.previousHandle = function () {
        if ($scope.currentPage !== 1) {
            $scope.currentPage = $scope.currentPage - 1;
            $scope.currentFirstItem = ($scope.currentPage -1) * $scope.currentRow + 1;
            $scope.currentLastItem = $scope.currentPage * $scope.currentRow;

            renderData();
        } else {
            //不可点击
        }
    }

    $scope.nextHandle = function () {
        if ($scope.currentPage !== $scope.totalPage) {
            $scope.currentPage = $scope.currentPage + 1;
            $scope.currentFirstItem = ($scope.currentPage -1) * $scope.currentRow + 1;
            if ($scope.currentPage * $scope.currentRow > $scope.allData.length) {
                $scope.currentLastItem = $scope.allData.length;
            } else {
                $scope.currentLastItem = $scope.currentPage * $scope.currentRow;
            }

            renderData();
        } else {
            //不可点击
        }
    }

    $scope.isAsc = false;
    $scope.sortByKeyOfValue = function (key,isAsc) {
        var tempData = [];
        tempData = $filter('orderBy')($scope.allData, key,isAsc);
        $scope.allData = tempData;
        renderData();
    }
}])