var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.font = '10px Arial';
        this.color = '#000000';
        this.text = 'HelloWorld';
    }
    TextField.prototype.render = function (context) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillText(this.text, 0, 20);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.width = 550;
rect.height = 400;
rect.color = '#5294d1';
var rect2 = new Rect();
rect2.width = 600;
rect2.height = 200;
rect2.color = '#4c9da0';
rect2.x = 10;
rect2.y = 450;
rect2.rotation = -Math.PI / 8;
//var rect2 = new Rect();
//rect2.width = 300;
//rect2.height = 50;
//rect2.x = 200;
//rect2.y = 200;
//rect2.rotation = Math.PI / 8;
//rect2.color = '#00FFFF'
var button1 = new Rect();
button1.width = 400;
button1.height = 40;
button1.x = 20;
button1.y = 150;
button1.color = '#306b29';
var button2 = new Rect();
button2.width = 400;
button2.height = 40;
button2.x = 20;
button2.y = 200;
button2.color = '#306b29';
var text = new TextField();
text.x = 200;
text.y = 160;
text.font = '25px Arial';
text.text = 'Play';
var text1 = new TextField();
text1.x = 155;
text1.y = 210;
text1.font = '30px Courier';
text1.text = 'Tutorial';
var tree = new Bitmap();
tree.x = 40;
tree.y = 20;
tree.source = 'tree.png';
var title = new Bitmap();
title.x = 100;
title.y = 50;
title.source = 'title.png';
var bitmap1 = new Bitmap();
bitmap1.x = 150;
bitmap1.y = 150;
bitmap1.source = 'first.png';
var bitmap2 = new Bitmap();
bitmap2.x = 120;
bitmap2.y = 205;
bitmap2.source = 'second.png';
//渲染队列
var renderQueue = [rect, rect2, tree, title, button1, button2, bitmap1, bitmap2, text, text1];
//资源加载列表
var imageList = ['tree.png', 'title.png', 'first.png', 'second.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
