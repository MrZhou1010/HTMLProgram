var EventUtil = {
    //检测绑定事件,兼容模式
    addHandler:function (element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        } else if (element.attachEvent) {
            element.attachEvent('on'+type,handler);
        } else {
            element['on'+type] = handler;
        }
    },
    //移除事件,兼容模式
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        } else if (element.detachEvent) {
            element.detachEvent('on'+type,handler);
        } else {
            element['on'+type] = null;
        }
    },
    //使用这个方法跨浏览器取得event对象
    getEvent:function (event) {
        return event?event:window.event;
    },
    //返回事件的实际目标
    getTarget:function (event) {
        return event.target||event.srcElement;
    },
    //阻止事件默认行为
    preventDefault:function (event) {
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //取消事件流冒泡
    stopPropagation:function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //获取mouseover和mouseout相关元素
    getRelatedTarget:function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) { //兼容IE8
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
    getButton:function (event) {
        if (document.implementation.hasFeature("MouseEvents","2.0")) {
            return event.button;
        } else {
            switch(event.button) {   //将IE模型下的button属性映射为DOM模型下的button属性
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;  //按下的是鼠标主按钮（一般是左键）
                case 2:
                case 6:
                    return 2;  //按下的是中间的鼠标按钮
                case 4:
                    return 1;  //按下的是鼠标次按钮（一般是右键）
            }
        }
    },
    //获取表示鼠标滚轮滚动方向的数值
    getWheelDelta:function (event) {
        if (event.wheelDelta) {
            return event.wheelDelta;
        } else {
            return -event.detail*40;
        }
    },
    //以跨浏览器取得相同的字符编码，需在keypress事件中使用
    getCharCode:function (event) {
        if (typeof event.charCode=="number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    //获取剪切板中的值
    getClipboardText:function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    //设置剪切板中的值
    setClipboardText:function (event,value) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain",value);
        } else if (window.clipboardData){
            window.clipboardData.setData("text",value);
        }
    }
};
