{"source":"webpackJsonp([1],{109:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var i=a(5),n=a.n(i),l=a(6),r=a.n(l),s=a(4),o=a.n(s),c=a(1),f=(a.n(c),a(0),a(2)),w=(a.n(f),a(3),a(112)),p=(a(33),a(7)),d=a(9);$(function(){var e=$(\".mapbox\");$(\".map-close\").on(\"click\",function(){e.fadeOut()}),new w.a(\".map\",{center:\"114.075160,22.544400\",zoom:14,markIconSrc:\"./assets/image/map_marker.png\",marker:{point:\"114.075160,22.544400\",tips:\"\",title:\"\",summary:\"深圳GreatFilm大影视文化传媒\",tel:\"telephone : 18018732016\"}});var n=\"active\",l=$(\"#username\"),r=$(\"#email\"),s=$(\"#msg\"),o=$(\"#submit\"),i=$(\".fbalert\"),t=i.find(\".closer\"),c=i.find(\"img\"),f=i.find(\"h1\"),p=i.find(\"span\"),d=i.find(\".autocounter\"),m=i.find(\".btn-ok\"),a=3,u=null,y=[{src:\"./assets/image/icons/icon_ok.png\",alt:\"ok\",title:\"发送成功，感谢您的留言！\"},{src:\"./assets/image/icons/icon_fail.png\",alt:\"fail\",title:\"发送失败，请稍后再试！\"},{src:\"./assets/image/icons/icon_warn.png\",alt:\"warn\",title:\"请输入正确的邮箱地址！\"},{src:\"./assets/image/icons/icon_warn.png\",alt:\"warn\",title:\"不能为空!\"},{src:\"./assets/image/icons/icon_warn.png\",alt:\"warn\",title:\"请输入正确的手机/座机号码！\"}];function h(e,t,a){c.attr({src:y[e].src,alt:y[e].alt}),f.html((a||\"\")+y[e].title),t?(d.hide(),m.show()):(d.show(),m.hide()),i.fadeIn(300)}function b(){a<0?(i.fadeOut(300),clearInterval(u),a=3):(p.html(a),a--)}function T(e){return/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/g.test(e)}l.add(r).add(s).on(\"input\",function(){var e=l.val().trim(),t=r.val().trim(),a=s.val().trim();e&&T(t)&&a?o.addClass(n):o.removeClass(n)}),r.on(\"blur\",function(){this.value&&!T(this.value)&&h(2,1)}),o.on(\"click\",function(){var e=l.val().trim(),t=r.val().trim(),a=s.val().trim(),i=$(this).hasClass(n);e?t?T(t)?a?i&&api.postMsg({txtName:e,txtEmail:t,content:a}).then(function(e){var t=1==e.status?0:1;l.add(r).add(s).val(\"\"),o.removeClass(n),p.html(3),h(t,0),clearInterval(u),u=setInterval(b,1e3)}):h(3,1,\"留言内容\"):h(2,1):h(3,1,\"邮箱\"):h(3,1,\"姓名\")}),m.add(t).on(\"click\",function(){i.fadeOut(300)})}),$(function(){var t=this,a=function(){function e(e){var t=$(e).offset().top;t<=$(window).height()+$(document).scrollTop()&&Object(d.a)(e),$(window).on(\"scroll\",function(){t<=$(window).height()+$(document).scrollTop()&&Object(d.a)(e)})}e(\".an1\"),e(\".an2\")};r()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new o.a(function(a){api.getRow(192).then(function(e){var t={imgUrl:e.data[0].img_url};Object(p.e)(\"headbannerTmp\",\"headbanner\",t),a()})});case 2:loading.hide(),a();case 4:case\"end\":return e.stop()}},e,t)}))()})},112:function(e,t,a){\"use strict\";var i=a(32),o=a.n(i),l='<img src=\"{src}\" alt=\"\" style=\"display: block;width: 120px;height: auto;margin: 0 10px 0 0;padding: 0;\">',r=['<div class=\"tinfow-wp\" style=\"box-sizing: border-box;\">','<div class=\"tinfow-tb\" style=\"display: table; table-layout: fixed;height: auto;\">','<div class=\"tinfow-img\" style=\"display: table-cell;height: auto;vertical-align: middle;\">I</div>','<div class=\"tinfow-ct\" style=\"display: table-cell;box-sizing:border-box;height: auto;vertical-align: top;\">','<h3 class=\"tinfow-tit\" style=\"font-size: 16px;color: #000;font-weight: 500;text-align: left;margin: 0;padding: 0;\">T</h3>','<p class=\"tinfow-sum\" style=\"font-size: 14px;color: #666;text-align: left;margin: 5px 0;padding: 0;line-height: 1.5;max-width: 260px;\">S</p>','<span class=\"tinfow-tel\" style=\"display: block;font-size: 14px;color: #666;text-align: left;margin: 0;padding: 0;\">E</span>',\"</div></div></div>\"].join(\"\"),n=[{featureType:\"poi\",elementType:\"labels\",stylers:{visibility:\"off\"}},{featureType:\"subway\",elementType:\"all\",stylers:{visibility:\"off\"}},{featureType:\"local\",elementType:\"all\",stylers:{color:\"#ffffff\",weight:\"0.3\"}},{featureType:\"green\",elementType:\"all\",stylers:{color:\"#e6e6e6\"}},{featureType:\"water\",elementType:\"all\",stylers:{color:\"#ededed\"}},{featureType:\"land\",elementType:\"all\",stylers:{color:\"#f7f7f7\"}},{featureType:\"manmade\",elementType:\"all\",stylers:{color:\"#f7f7f7\",visibility:\"off\"}},{featureType:\"building\",elementType:\"all\",stylers:{color:\"#f2f2f2\"}},{featureType:\"highway\",elementType:\"geometry\",stylers:{color:\"#ffffff\",weight:\"0.5\"}},{featureType:\"arterial\",elementType:\"all\",stylers:{color:\"#ffffff\",weight:\"0.3\"}},{featureType:\"railway\",elementType:\"all\",stylers:{visibility:\"off\"}},{featureType:\"highway\",elementType:\"labels.text.fill\",stylers:{color:\"#9f9f9f\"}},{featureType:\"arterial\",elementType:\"labels.text.fill\",stylers:{color:\"#b4b4b4\",weight:\"0.1\"}},{featureType:\"label\",elementType:\"labels.text.fill\",stylers:{color:\"#666666\"}},{featureType:\"administrative\",elementType:\"all\",stylers:{}},{featureType:\"local\",elementType:\"labels.text.fill\",stylers:{color:\"#dfdfdf\"}},{featureType:\"highway\",elementType:\"labels.text.stroke\",stylers:{color:\"#ffffff\"}},{featureType:\"highway\",elementType:\"labels.icon\",stylers:{visibility:\"off\"}},{featureType:\"label\",elementType:\"labels.text.stroke\",stylers:{color:\"#ffffff\"}},{featureType:\"boundary\",elementType:\"all\",stylers:{}}],c=\"function\",s=function(e,t){var a={center:\"114.081685,22.550677\",zoom:16,bindList:!0,addressSelector:\".tmaddritem\",mPointAttr:\"data-location\",mTitleSeletor:\".tmtitle\",mSummarySeletor:\".tmsummary\",mTelSeletor:\".tmtel\",markIconSrc:\"marker.png\",marker:[{point:\"114.081685,22.550677\",tips:\"tesla\",title:\"Tesla215\",summary:\"Tesla is a man...\",tel:\"1234567\"},{point:\"114.081685,21.550677\",tips:\"tesla\",title:\"Tesla215\",summary:\"Tesla is a man...\",tel:\"1234567\"},{point:\"114.081685,20.550677\",tips:\"tesla\",title:\"Tesla215\",summary:\"Tesla is a man...\",tel:\"1234567\"},{point:\"114.081685,22.550677\",tips:\"tesla\",title:\"Tesla215\",summary:\"Tesla is a man...\",tel:\"1234567\"}],style:n,controler:[1,1],wheelZoom:!0,drawable:!0,dbClickZoom:!0,enableKeyboard:!1};this.wrap=$(e).first(),this.ops=$.extend(a,t||{}),this.bMap=new BMap.Map(this.wrap.get(0)),this.markers={},this.init()};function f(n,l){if(n){var r=new Image;r.addEventListener(\"load\",function(){var e=r.naturalWidth,t=r.naturalHeight,a=new BMap.Size(e,t),i=new BMap.Icon(n,a);(void 0===l?\"undefined\":o()(l))===c&&l(i)},!1),r.src=n}else(void 0===l?\"undefined\":o()(l))===c&&l(void 0)}function p(e,t){var a={offset:new BMap.Size(t?t.size.width/2:10,0)},i=new BMap.Label(e||\"\",a);return i.setStyle({padding:\"2px 5px\",border:\"1px solid #999\",color:\"#666\",fontSize:\"12px\",height:\"auto\",lineHeight:1,fontFamily:\"micorsoft yahei\",transform:\"translate(-50%, -100%)\"}),i}function d(t,a,i,n){var e=r.replace(/[I|T|S|E]/g,function(e){switch(e){case\"I\":return n?l.replace(\"{src}\",n):\"\";case\"T\":return t||\"\";case\"S\":return a||\"\";case\"E\":return i||\"\"}});return new BMap.InfoWindow(e)}s.prototype=$.extend({},s.prototype,{init:function(){var e,t,o,a=this.ops;return a.style&&this.bMap.setMapStyle({styleJson:a.style}),a.wheelZoom?this.bMap.enableScrollWheelZoom():this.bMap.disableScrollWheelZoom(),a.drawable?this.bMap.enableDragging():this.bMap.disableDragging(),a.dbClickZoom?this.bMap.enableDoubleClickZoom():this.bMap.disableDoubleClickZoom(),a.enableKeyboard?this.bMap.enableKeyboard():this.bMap.disableKeyboard(),a.controler&&this.addControl(a.controler[0],a.controler[1]),this.setCenter(this.ops.center),this.addMarkers(this.ops.marker),this.ops.bindList&&(t=(e=this).ops.addressSelector,o=e,$(document).off(\"click.tm\").on(\"click.tm\",t,function(){var e=$(this),t=o.ops,a=e.attr(t.mPointAttr),i=e.find(t.mTitleSeletor).text(),n=e.find(t.mSummarySeletor).text(),l=e.find(t.mTelSeletor).text(),r={point:a,tips:\"\",title:i,summary:n,tel:l},s=o.bMap.getOverlays();s.forEach(function(e){e.hide()}),o.addMarkers(r,function(e){var t=e[a];t.marker.openInfoWindow(t.infoWindow)}),setTimeout(function(){o.setCenter(a,t.zoom)},500),o.initMarkers(o.ops.markers)})),this},initMarkers:function(e){var t=this,r=this;e.forEach(function(l,e){f(t.ops.markIconSrc,function(e){var t=l.point.split(\",\"),a=new BMap.Point(t[0],t[1]),i=new BMap.Marker(a,{icon:e}),n=d(l.title,l.summary,l.tel);r.bMap.addOverlay(i),l.tips&&i.setLabel(p(l.tips,e)),i.addEventListener(\"click\",function(){this.openInfoWindow(n)},!1),r.markers[l.point]={point:a,item:i,infoWindow:n},(\"undefined\"==typeof callback?\"undefined\":o()(callback))===c&&callback.call(r,r.markers)})})},addMarkers:function(l,r){if(l&&-1!==l.point.indexOf(\",\")){var s=this;return f(this.ops.markIconSrc,function(e){var t=l.point.split(\",\"),a=new BMap.Point(t[0],t[1]),i=new BMap.Marker(a,{icon:e}),n=d(l.title,l.summary,l.tel);s.bMap.addOverlay(i),l.tips&&i.setLabel(p(l.tips,e)),i.addEventListener(\"click\",function(){this.openInfoWindow(n)},!1),s.markers[l.point]={point:a,marker:i,infoWindow:n},(void 0===r?\"undefined\":o()(r))===c&&r.call(s,s.markers)}),this}},removeMarker:function(e){return this.bMap.removeOverlay(this.markers[e].marker),this.markers[e]=void 0,this},update:function(e,t){return this.setCenter(e,t),this},setCenter:function(e,t){if(-1!==e.indexOf(\",\")){var a=e.split(\",\"),i=new BMap.Point(a[0],a[1]),n=+t?t:this.ops.zoom;return this.bMap.centerAndZoom(i,n),this}},unBindList:function(){return $(document).off(\"click.tm\"),this},addControl:function(e,t){var a,i,n;switch(e){case 2:a=BMAP_ANCHOR_TOP_RIGHT;break;case 3:a=BMAP_ANCHOR_BOTTOM_LEFT;break;case 4:a=BMAP_ANCHOR_BOTTOM_RIGHT;break;default:a=BMAP_ANCHOR_TOP_LEFT}switch(t){case 2:i=BMAP_NAVIGATION_CONTROL_SMALL;break;case 3:i=BMAP_NAVIGATION_CONTROL_PAN;break;case 4:i=BMAP_NAVIGATION_CONTROL_ZOOM;break;default:i=BMAP_NAVIGATION_CONTROL_LARGE}n=new BMap.NavigationControl({anchor:a,type:i}),this.bMap.addControl(n)},destroy:function(){return this.unBindList(),this.wrap.html(\"\"),this.bMap=null,this.markers=null,this}}),t.a=s}},[109]);"}