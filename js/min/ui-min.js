function keywordReturn(e){$("#search-back-text span").html(e),$("#search-back-img, #search-back-text").css("display","block").velocity({opacity:"1"},{duration:400,delay:4500})}function _webGLResizeAnon(){$(e).css("padding-top",$("#loading").height()/2-$(e).height()/2-60+"px")}function closeMenu(){$("#menu a").removeClass("active"),$(".menu-item").each(function(){$(this).css("z-index",250).velocity({top:headerHeight-$(this).height()},{duration:300})}),lastMenuItem=""}function scrollTop(){$("html, body").velocity({scrollTop:0},{duration:500})}function initGoogleMap(){var e=document.getElementById("map-canvas"),t=new google.maps.Map(e,{center:new google.maps.LatLng(43.6533998,-79.3742563),zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP,backgroundColor:"#fffdf2",disableDefaultUI:!0}),i=new google.maps.Marker({position:new google.maps.LatLng(43.6533998,-79.3742563),map:t,icon:"img/map-marker.png"});t.set("styles",[{stylers:[{visibility:"simplified"},{saturation:-100},{weight:4.2}]},{elementType:"labels.icon",stylers:[{saturation:-95},{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"transit",stylers:[{visibility:"off"}]}]);var a=setInterval(function(){var e=$(".gm-style");$(e).length&&($(e).css("opacity",1),googleMapLoaded=!0,clearInterval(a))},100)}function loadGoogleMap(){var e=document.createElement("script");e.type="text/javascript",e.src="https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initGoogleMap",document.body.appendChild(e)}if(window.fbAsyncInit=function(){FB.init({appId:"738219399610044",xfbml:!0,version:"v2.2"})},function(e,t,i){var a,o=e.getElementsByTagName(t)[0];e.getElementById(i)||(a=e.createElement(t),a.id=i,a.src="//connect.facebook.net/en_US/sdk.js",o.parentNode.insertBefore(a,o))}(document,"script","facebook-jssdk"),$("#searchCancel, #search-back-img").on("click",function(e){cameraController.animating||($("#searchTerm").val(""),$("#cachedTerm").val(""),SpawnAndGoToCity(),$("#searchCancel, #search-back-img, #search-back-text").velocity({opacity:"0"},{duration:400,complete:function(){$("#search-back-text span").html(""),$(this).css("display","none")}}))}),$("#searchTerm").on("keydown",function(e){var t=$(this).val(),i=$("#cachedTerm").val();if($(this).val().length>32){var a=t;a=a.substring(0,a.length-1),$(this).val(a)}if(13==e.keyCode&&$(this).val().length){if(cameraController.animating)return;if($("#cachedTerm").val().length||$(this).val()==homeKeyword){var o=SpawnAndGoToCity(i);return o&&t!=homeKeyword?keywordReturn(i):o&&t==homeKeyword&&$("#search-back-img, #search-back-text").velocity({opacity:"0"},{duration:400,complete:function(){$(this).css("display","none")}}),$(this).val("").blur(),void $("#cachedTerm").val("")}return void $(this).val(cityController.city.tag)}if(9==e.keyCode&&t.length>0||39==e.keyCode){e.preventDefault();var n=$("#cachedTerm").val();$(this).val(n)}else 8==e.keyCode&&$("#cachedTerm").val("")}),$("#searchTerm").on("input",function(e){var t=$(this).val(),i=dataController.GetIdsWithTag(t);if(0==i.length)return void $("#cachedTerm").val("");if("undefined"==typeof i[0])return void $("#cachedTerm").val("");for(var a in i){var o=i[a].split(", ");for(var n in o)if(o[n].substring(0,t.length)==t)return void $("#cachedTerm").val(o[n])}$("#cachedTerm").val("")}).on("focus",closeMenu),Detector.webgl)$(canvasDiv).append(renderer.domElement);else{$("#loading").css({"background-image":'url("./img/rl_wordmark_transparent.png")',"background-repeat":"no-repeat","background-position":"center center","background-attachment":"fixed"});var e=Detector.addGetWebGLMessage({parent:$("#loading")});$(window).on("resize",_webGLResizeAnon),_webGLResizeAnon(),$(e).css("display","block").velocity({opacity:"1"},{duration:1e3})}var headerHeight=$("#main-header").outerHeight()-2,lastMenuItem,mapInterval=!1;$(".menu-item").each(function(){$(this).css("top",headerHeight-$(this).height())}),$("#menu a").click(function(){function e(){$("#menu a").removeClass("active"),$(".menu-item").not("."+i).each(function(){$(this).css("z-index",250).velocity({top:headerHeight-$(this).height()},{duration:300})}),lastMenuItem!=i?($(t).addClass("active"),$(".menu-item."+i).css("z-index",251).velocity({top:headerHeight+1},{duration:300}),lastMenuItem=i):closeMenu()}var t=this,i=$(this).attr("class").replace(" active","");if(googleMapLoaded||"contact"!=i)e();else if(!mapInterval){loadGoogleMap();var a=0;mapInterval=setInterval(function(){(googleMapLoaded||++a>10)&&(clearInterval(mapInterval),mapInterval=!1,e())},300)}}),$(".menu-item-footer,.mobile-menu-item-footer").click(function(){closeMenu(),scrollTop()}),$("#canvas").on("mousedown",closeMenu),dataController.on("loaded",function(){$("#loadinglogo").velocity({opacity:0},{duration:800,complete:function(){clearInterval(brentSpinner),$("#loadinglogo").css("display","none"),$("#loading").velocity({opacity:"0"},{duration:1200,complete:function(){$("#loading").css("display","none")}})}})},"overlay"),$("#mobile-menu").click(function(){$(".mobile").click()}),$(".mobile-menu-item-header").click(function(){var e=$(this).attr("class").replace("mobile-menu-item-header ","");closeMenu(),$("#menu ."+e).click()}),$("#content").css("height",window.innerHeight-headerHeight),$(window).on("resize",function(){$("#content").css("height",window.innerHeight-headerHeight)});var googleMapLoaded=!1;indicator.on("show",function(){var e=$("#indicator");$(e).hasClass("velocity-animating")||1===$(e).css("opacity")||$(e).velocity({opacity:1},{duration:200,queue:!1})}),indicator.on("hide",function(){var e=$("#indicator");$("#indicator").hasClass("velocity-animating")||0===$(e).css("opacity")||$("#indicator").velocity({opacity:0},{duration:200,queue:!1})}),indicator.on("update",function(){function e(e,t,i){d.fillStyle=i||"black",d.beginPath(),d.arc(e,t,10,0,2*Math.PI,!0),d.fill()}function t(e,t){t=t||"black",d.strokeStyle=t,d.beginPath(),d.moveTo(e.X1,e.Y1),d.lineTo(e.X2,e.Y2),d.lineWidth=5,d.stroke()}var i=$("#canvas"),a=parseInt($(i).width()),o=parseInt($(i).height()),n=parseInt($(i).position().top),r=parseInt($(i).position().left),c=this.GetPosition({left:0,width:a,top:0,height:o});if(cityController.city&&cityController.defaultCity){if(c&&!cityController.CityIsInView(homeKeyword,10)&&cityController.city.tag==cityController.defaultCity.tag){this.Show();var s=$("#indicator");$(s).css({left:0==c.X?c.X+r:c.X-$(s).width()+r,top:0==c.Y?c.Y+n:c.Y-$(s).height()+n,"-webkit-transform":"rotate("+c.rotation+"deg)","-moz-transform":"rotate("+c.rotation+"deg)","-ms-transform":"rotate("+c.rotation+"deg)","-o-transform":"rotate("+c.rotation+"deg)",transform:"rotate("+c.rotation+"deg)"})}else this.Hide();if(debugIndicator){$("#test").length||$("#content").append('<canvas id="test" style="position:absolute;"></canvas>'),$("#test").css({left:$(i).position().left,width:a,top:$(i).position().top,height:o});var l=document.getElementById("test"),d=l.getContext("2d");l.width=a,l.height=o,d.clearRect(0,0,a,o),t(this.colliderLine,"red"),t(this.raycastLine,"blue"),c&&e(c.X,c.Y,"green")}}}),$("#indicator").click(function(){SpawnAndGoToCity(cityController.city)}),$("#culture-inner").slick(),$("#blackout").on("click",function(e){e.stopPropagation(),"blackout"==$($(e.target).context).attr("id")&&(cameraController.AnimateBlur(0,1),$(this).velocity({opacity:0,"padding-top":50},{duration:1e3,easing:"easeOutCubic",complete:function(){$(this).css({display:"none"}),window.location.href="#/grid"}}))});var w=[83,65,82,67,65,83,77],cw=0;$(document).on("keydown",function(e){$("#discipline-overlay").length&&!$(".sarcasm").length&&e.keyCode==w[cw++]?cw==w.length&&(cw=0,$("#discipline-overlay header").after('<div class="dcontainer sarcasm" ng-repeat="disc in disciplines"><h1 class="ng-binding"><span>+</span> &nbsp;Sarcasm</h1><p style="display:none;" class="ng-binding">We never use sarcasm in any way, shape or form. There is no room for humour in a professional environment, and sarcasm is the lowest form of humour. Sarcasm is basically lying. If you work with Red Lion, you can rest assured that this disgusting practice will not be employed.<br/>#stopsarcasm</p></div>'),$("#blackout").animate({scrollTop:0},500)):cw=0});