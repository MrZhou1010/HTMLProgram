/**
 * Created by mobiletek on 2017/11/29.
 */

(function($) {
    var defaultOptions  = {
        listData: [], //直接设置原始数据
        url:"",//通过url动态获取数据
        keyword:"", //url只接受keyword参数
        placeholder:"点击选择"
    };

    var $options = defaultOptions;

    //全局变量,获取后面需要多次调用的dom对象
    $hintSearch = $("input[name='hint-search']");
    $hintSearchContainer = $(".hint-input-span-container");
    $msHintBlock = $(".ms-hint-block");
    $hintUl = $(".hint-ul");

    $.fn.multipleSearchDownList = function(){
        var options = {};

        this.css("position","relative");

        if(arguments.length == 1){//一个参数
            if(typeof(arguments[0]) == 'object'){//初始化options
                initDownList(this[0],arguments[0]);
            }else if(typeof(arguments[0]) == 'string'){
                if(arguments[0] == 'getSelectedText'){
                    return getMSSelectedText();
                }
            }
        }else if(arguments.length == 2){
            if(typeof(arguments[0]) == 'string' && typeof(arguments[1]) == 'object'){//调用方法
                if(arguments[0] == 'setData'){
                    setMSData(arguments[1]);
                }
            }
        }
    };

    //获取数据 返回工号字符串 多个工号间用逗号隔开
    function getMSSelectedText(){
        var numberStr = "";
        var spanArr = $(".hint-input-span-container").find('span');
        if(spanArr != undefined && spanArr.length>0){
            for(var i=0; i<spanArr.length; i++){
                var obj = spanArr[i];
                console.log(obj.firstChild.textContent);

                var temp = obj.firstChild.textContent;
                if(temp != undefined && temp != ""){
                    if(numberStr == ""){
                        numberStr = temp;
                    }else{
                        numberStr += "," + temp;
                    }
                }
            }
        }
        return numberStr;
    }

    function setMSData(dataarr){
        if(dataarr != undefined && dataarr.length != undefined && dataarr.length>0){
            $options.listData = dataarr;
            $options.url = "";
            addDictionary(dataarr,addUlListener);
        }
    }

    function initDownList(obj,options){
        //这里其实就是合并多个对象为一个。这里就是，如果你在调用的时候写了新的参数，就用你新的参数，如果没有写，就用默认的参数。
        $options = $.extend(defaultOptions,options);
        //console.log(obj);


        //插件中动态添加的DOM元素统统用类标识  不要用ID 元素之间的获取借助DOM树结构
        var htmlStr = "";


        //多选承接div 以后会动态添加span -->
        htmlStr += '<div class="hint-input-span-container">';
        // 表单元素 用来绑定监听事件以及接收用户输入 该层上方会动态添加span
        htmlStr += '<input type="text" name="hint-search" value="" placeholder="' + $options.placeholder + '">';
        htmlStr += '</div>';
        // 包含下拉列表列
        htmlStr += '<div class="ms-hint-block">';
        // 根据json数据包动态添加li
        htmlStr += '<ul class="hint-ul">';
        htmlStr += '</ul>';
        htmlStr += '</div>';

        obj.innerHTML = htmlStr;

        initCallback();

    }


    function initCallback(){

        //获取后面需要多次调用的dom对象
        $hintSearch = $("input[name='hint-search']");
        $hintSearchContainer = $(".hint-input-span-container");
        $msHintBlock = $(".ms-hint-block");
        $hintUl = $(".hint-ul");

        //初次调用添加词典
        var listData = $options.listData;
        var url = $options.url;
        if(url != ""){
            var keyword = $options.keyword;
            listData = getListDataByUrl(url,keyword);
        }
        addDictionary(listData,addUlListener);
        //设置词典列表宽度
        // setHintSearchContainerWidth();

        //实现响应式 监听resize事件
        // $(window).bind('resize', setHintSearchContainerWidth);

        //获得焦点
        $hintSearch.focus(function(){
            animteDown();
        });

        //失去焦点
        //设置延迟为了可以监听到click的响应
        $hintSearch.blur(function(){
            setTimeout(function(){
                animateUp();
            },200);
        });

        //TAB 与 enter事件
        //监听tab与enter两个键位 如果input内有输入的内容，则添加span
        //注意最后要阻止一下事件冒泡 防止跳转与切换焦点
        /* $hintSearch.keydown(function(e){
         //console.log("e.which: " + e.which + "; e.keyCode: " + e.keyCode);
         switch (e.which) {
         case 9:
         case 13:{

         var text = $hintSearch.val();

         if(!$.trim(text)) {
         $hintSearch.val("");
         e.preventDefault();
         return;
         }

         if( !checkContainerHas(text) ) {
         $hintSearch.before('<span class="tag label label-primary">'+ text +'<a class="customeSpanRemoveCls" data-role="remove">&times;</a></span>');
         addSpanListenr();
         }
         //console.log($hintSearch.val());
         $hintSearch.val("");
         $hintSearch.focus();
         e.preventDefault();
         break;
         }
         default: ;

         }
         });*/

        //检测输入配对
        //对输入内容在li中进行匹配 如果包含字符串可以找到并返回
        //搜索方法可以自行修改，只要保证返回一个搜索后的数组即可
        $hintSearch.keyup(function(e){

            //防止查找过于频繁
            if(e.keyCode != 13 && event.keyCode != 32){//不是回车键或空格键 不进行查找
                return;
            }

            var text = $hintSearch.val();

            var url = $options.url;
            var newValues = [];
            if(url == ""){
                var listData = $options.listData;
                $.each(listData,function(index,tempValue){
                    if(tempValue.indexOf(value) >= 0){
                        newValues.push(tempValue);
                    }
                });
            }else{
                keyword = text;
                newValues = getListDataByUrl(url,keyword);
            }

            /*if (newValues.length === 0) {
             newValues.push("无匹配条目");
             }*/

            updateDictionary(newValues,addUlListener);
        })

    }

    //函数库
    //添加用户常用字典库
    function addDictionary(data, callback) {
        for(var i = 0; i < data.length; i++) {
            var htmlStr = '<li class="ms-select-result">'
                + data[i]
                + '</li>';
            $hintUl.append(htmlStr);
        }

        if(data.length == 0){
            var htmlStr = '<li class="ms-select-no-result">无匹配条目</li>';
            $hintUl.append(htmlStr);
        }

        callback();
    }

    //更新搜索内容
    function updateDictionary(dataarr,callback) {
        $hintUl.empty();
        addDictionary(dataarr,callback);
    }

    //向下滑动动画
    //封装改变样式边框
    function animteDown()
    {
        $msHintBlock.slideDown('fast').css({'border':'1px solid #96C8DA','border-top' : '0px', 'box-shadow' : '0 2px 3px 0 rgba(34,36,38,.15)'});
        $hintSearchContainer.css({'border':'1px solid #96C8DA','border-bottom' : '0px', 'box-shadow' : '0 2px 3px 0 rgba(34,36,38,.15)'});

    }

    //向上滑动动画
    function animateUp()
    {

        $msHintBlock.slideUp('fast',function(){
            $hintSearchContainer.css({'border':'1px solid #ccc'});

        });
        $hintSearch.val("");
    }

    //检验是否与输入的重复
    function checkContainerHas(text)
    {
        text = text + '×';
        //console.log("$.trim(text): " + $.trim(text));
        var flag = 0;
        $(".hint-input-span-container span").each(function(){
            //console.log("$.trim($(this).text(): " + $.trim($(this).text()));
            //console.log(this.innerText);
            if ($.trim(text) == $.trim($(this).text())) {
                flag = 1;
                return;
            }
        });
        return flag ? true : false;
    }
    //设置hint-input-span-container宽度
    function setHintSearchContainerWidth()
    {
        var hint_width = $hintSearchContainer.width() + 2 * parseInt($hintSearchContainer.css('padding-left').match(/[0-9]+/)[0]) +  2 * parseInt($hintSearchContainer.css('border-left').match(/[0-9]+/)[0]) ;
        $msHintBlock.css({'width': hint_width});
    }


    //绑定click事件
    function addUlListener() {
        $hintUl.delegate('li.ms-select-result','click',function(){
            var text = $(this).text();

            if(!checkContainerHas(text)) {
                $hintSearch.before('<span class="tag label label-primary">'+ text +'<a class="customeSpanRemoveCls" data-role="remove">&times;</a></span>');
                addSpanListenr();
            }
            $hintSearch.val("");
            animateUp();
        })
    }

    //监听 span事件
    function addSpanListenr() {
        $(".hint-input-span-container span").delegate("a.customeSpanRemoveCls",'click',function(){
            $(this).parent().remove();
        })
    }

    //根据url动态获取数据
    function getListDataByUrl(url,keyword){
        var listData = [];
        $.ajax({
            async: false,//同步
            type:"POST",
            url:url,
            dataType:"json",
            data:{
                "keyword":keyword
            },
            error:function(){
                alert("列表数据获取失败");
            },
            success:function(responseInfo){

                if(responseInfo['status'] == 1){
                    alert("列表数据获取失败");
                }
                if(responseInfo["status"] == 0){
                    //console.log(responseInfo.data);
                    listData = responseInfo.data.listData;

                }
            }//end success
        });

        return listData;
    }
})(jQuery);