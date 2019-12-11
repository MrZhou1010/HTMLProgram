/**
 * Created by mobiletek on 17/9/18.
 */

$.noConflict();

jQuery(function ($) {
    function ajax_get(url,param,callback) {
        $.get(url,param,callback);
    }
    function ajax_post(url,param,callback) {
        $.post(url,param,callback);
    }
    var param = {
        all:false,
    }

    var param_login = {
        email:"admin",
        password:"admin",
    }

    ajax_post("http://220.248.15.178:65084/api/session",param_login,function (response,stutas,xhr) {
        if (stutas === "success") {
            console.log(response);
        }
        else {
            console.log(response);
        }
    });

    ajax_get("http://220.248.15.178:65084/api/devices",param,function (response,stutas,xhr) {
        $.each(response,function (i,value) {
            var tr = document.createElement("tr");
            $.each(value,function (key,val) {

                //console.log(key,val);

                if (key == "name"||key == "lastUpdate") {
                    $(tr).append("<td>" + val + "</td>");
                }
            });
            $("#device_table_body").append(tr);
        })
    })
});