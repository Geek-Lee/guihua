/**
 * @name: Vote.js
 * @version: 0.0.1
 * @author: wnlee
 * @description: 用于网上展览馆网上调查模块，依赖 jQuery、百度地图API
 */

(function (window, BMap, $) {

    var _ = {};
    _.tpl = {};

    _.tpl.getBtn = function(ops) {

        var htm = '<div class="map-btn-container"><ol class="vote-select-btn">';
        for (var i=0; i<ops.length; i++) {
            htm += '<li class="vote-select-btn-item" title="'+
                    ops[i].proName + '"><h3 class="proTitle">方案'+(i+1)+
                    '</h3><img class="proImg" src="' + ops[i].imgUrl[0].url + 
                    '"/>' + ops[i].proName +
                    '</li>';
        }
        htm += '</ol><span id="closed">X</span></div>';
        return htm;
        
    };

    _.tpl.getCon = function(ops) {

        var htm = '<div class="project-demo-container" style="position:relative"><ul class="proCon">';
        for (var i=0; i<ops.length; i++) {
            htm += '<li class="vote-select-demo-item" title="'+
                    ops[i].proName + '"><div class="map" id="map'+i+'" style="height:640px">'+
                    '</div></li>';
        }
        htm += '</ul></div>';
        return htm;

    };

    _.tpl.getProCon = function(ops) {

        var htm = '<div class="proItemConBg"><div class="proItemCon"><h3>' +
                   ops.proName +
                   '</h3><div><span id="pic-prev"></span><ul>';
        for (var i=0,len=ops.imgUrl.length;i<len;i++) {
            htm += '<li class="proItem"><img src="' + 
                   ops.imgUrl[i].url + 
                   '"/></li>';
        }
        htm += '</ul><span id="pic-next"></span></div><p class="aboutPro">' + 
               ops.proCon + '</p><span class="pro-closed">X</span></div></div>';
        return htm;

    };

    _.cssStyle = function(obj) {

        var sStyle = "";
        sStyle += 'div.map-btn-container {position: absolute;' +
                  'top: 0px;z-index: 9999;width: 100%;height: 100%;' +
                  'background-color: rgba(0,0,0,.5);display: none;}';
        sStyle += 'div.map-btn-container ol {background-color:#2dcc70;}';
        sStyle += 'div.map-btn-container ol li {float:left;width:'+
                  obj.$el.width()/(obj.proInfo.proLen+0.01) +
                  'px;background-color:#2dcc70;text-align:center;cursor:pointer;}';
        sStyle += 'div.map-btn-container ol li img { max-width:100%;border:1px solid #fff;}';
        sStyle += 'div.map-btn-container #closed{position: absolute;width:24px;' +
                  'height:24px;top:4px;right:4px;color:#fff;text-align:center;line-height:24px;' +
                  'cursor:pointer;border-radius:50%;background-color:rgba(0,0,0,.5);}';
        sStyle += 'div.map-btn-container ol {position: absolute;top:50%;margin:'+ 
                  -($('div.map-btn-container ol li').eq(0).height()+20) +
                  'px 0 0 0;}';
        sStyle += 'div.map-btn-container ol li h3 {padding:4px 0;color:#fff;'+
                  '}';
        sStyle += 'div.map-btn-container ol li {padding:0 0 8px 0;color:#fff;}';
        sStyle += '.proItemConBg {display:none;position:fixed;top:0px;left:0px;width:100%;min-width:960px;'+
                  'height:100%;background-color:rgba(0,0,0,.8);z-index:9999;}';
        sStyle += '.proItemConBg .proItemCon {position:relative;display:block;margin:-320px 0 0 -480px;width:960px;height:640px;'+
                  'position:absolute;top:50%;left:50%;' +
                  'background-color:#fff;}';
        sStyle += '.proItemCon h3 {line-height:100px;font-size:24px;text-align:center;'+
                  'color:#fff;background-color:#2dcc70;}';
        sStyle += '.proItemCon div {position:relative;width:960px;height:400px;overflow:hidden;}';
        sStyle += '.proItemCon ul {position:absolute;left:0px;min-width:2880px;}';
        sStyle += '.proItemCon ul li {float:left;width:960px;line-height:400px;text-align:center;}';
        sStyle += '.proItemCon ul li img {display:inline-blick;max-height:400px;vertical-align:middle;}';
        sStyle += '.proItemCon p {padding:10px 20px;height:120px;color:#fff;background-color:#2dcc70;clear:both;}';
        sStyle += '.proItemCon span.pro-closed {position:absolute;display:block;width:28px;height:28px;'+
                  'text-align:center;line-height:28px;border:2px solid #000;border-radius:50%;'+
                  'top:-14px;right:-14px;background-color:#fff;cursor:pointer;}';
        sStyle += '#pic-prev,#pic-next {position:absolute;top: 180px;display:block;width:45px;height:42px;background-image:url(images/icon-left-right.png);cursor:pointer;z-index:99;}';
        sStyle += '#pic-prev {left:64px; background-position:0 0;}';
        sStyle += '#pic-next {right:64px; background-position:45px 0;}';
        return sStyle;

    };

    _.setStyle = function(style) {
        
        var css = document.createElement('style');
        css.type = "text/css";
        css.innerText += style;
        $('body').append(css);

    };

    function oVote(obj, proInfo) {

        this.el = obj.el;
        this.$el = $(document.getElementById(obj.el));
        this.map = {};
        this.city = obj.city;
        this.map3d = obj.map3d;
        this.mapPointX = obj.mapPointX;
        this.mapPointY = obj.mapPointY;
        this.mapZoom = obj.mapZoom;
        this.poly = obj.polygon;
        this.proInfo = proInfo;

    };

    // 暴露全局变量
    window.Vote = oVote;

    oVote.initMap = function(obj, Mel) {

        if (!obj.map3d) {
            obj.map = new BMap.Map(Mel);
            obj.map.setCurrentCity(obj.city);
        } else if (obj.map3d) {
            obj.map = new BMap.Map(Mel, {mapType: BMAP_PERSPECTIVE_MAP});
        }
        obj.point = new BMap.Point(obj.mapPointX, obj.mapPointY);  
        obj.map.setCurrentCity(obj.city);
        obj.map.centerAndZoom(obj.point, obj.mapZoom); 
        obj.map.enableScrollWheelZoom(true);

    };

    oVote.getPolygon = function(obj, str, cb) {

        str = str ? str : 'click';
        cb = cb ? cb : function() {};
        if (obj.poly) {
            var arry = [];
            for (var i=0;i<obj.poly.length;i++) {
                arry[i] = new BMap.Point(obj.poly[i].x, obj.poly[i].y);
            }
        }
        obj.polygon = new BMap.Polygon(arry, 
            {strokeColor:"#fbb01f", strokeWeight:6, strokeOpacity:0.5});
        obj.map.addOverlay(obj.polygon);
        obj.polygon.addEventListener("click", function() {
            cb();
        });

    };

    oVote.prototype.addBtnEvent = function(eStr, cb) {

        eStr = eStr?eStr:'click';
        cb = cb?cb:function() {};
        $('.vote-select-btn-item').on(eStr, function(e) {
            cb(e);
        });

    };

    oVote.prototype.initElem = function() {

        var that = this;
        this.$el.append(_.tpl.getCon(this.proInfo.content));
        this.$el.append(_.tpl.getBtn(this.proInfo.content));
        _.setStyle(_.cssStyle(this));
        $('.vote-select-btn-item').on('click', function() {
            var ind = $(this).index();
            $('body').append(_.tpl.getProCon(that.proInfo.content[ind]));
            $('.proItemConBg').fadeIn();
            $('.pro-closed').on('click', function() {
                $('.proItemConBg').fadeOut(function() {
                    $(this).remove();
                });
            });
            var iW = ($('.proItemCon ul li').length-1)*960;
            $('.proItemCon ul').css({width:iW+960});
            $("#pic-prev").click(function(e) {
                if (parseInt($('.proItemCon ul').css('left'))<0) {
                    $('.proItemCon ul').stop().animate({left:'+=960'});
                }
            });
            $("#pic-next").click(function(e) {
                if (parseInt($('.proItemCon ul').css('left'))>-iW) {
                    $('.proItemCon ul').stop().animate({left:'+=-960'});
                } else {
                    $('.proItemCon ul').stop().animate({left:'0'});
                }
            });
        });
        for (var i=0;i<this.proInfo.proLen;i++) {
            oVote.initMap(this, "map"+i);
            oVote.getPolygon(this, 'click', function() {
                $('div.map-btn-container').fadeIn();
            });
            $('div.map-btn-container #closed').on('click', function() {
                $('div.map-btn-container').fadeOut();
            });
        }
    };

    Vote.result = 123;

    return oVote;

})( window, BMap, jQuery );