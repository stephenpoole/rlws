var glCards=[],boxid=0,loadInterval,app=angular.module("redLion",["ngRoute"]);app.config(["$routeProvider",function(t){t.when("/grid",{template:" ",controller:"GridControler"}).when("/work/:campaignID/:subSection",{templateUrl:"templates/work.html",controller:"WorkCtrl"}).when("/disciplines/:disciplineID",{templateUrl:"templates/discipline.html",controller:"DisciplineCtrl"}).when("/news/:newsID",{templateUrl:"templates/news.html",controller:"NewsCtrl"}).otherwise({redirectTo:"/grid"})}]),app.controller("CardTestController",function(t,e,i){t.cards=e.get(),init3D()}),app.factory("Cards",function(t){var e=[];return{get:function(){return 0===e.length&&t.get("http://redlioncanada.com/api/content/").success(function(t){for(var i=0,n=t.length;n>i;i++)e.push(t[i])}).error(function(t){alert("ERROR: "+t)}),glCards=e,e}}}),app.controller("GridControler",function(t){}),app.controller("NewsCtrl",["$scope","$routeParams","$timeout","$sce",function(t,e,i,n){t.dslug=e.newsID,t.outputHTML=function(t){return n.trustAsHtml(t)},0!==boxid?(t.newsitem=dataController.GetBySlug(t.dslug),t.newsitem.date_launched=Date.parse(t.newsitem.date_launched),overlayFadeIn(),closeButtonStart(),socialStart("News",t.newsitem)):i(function(){t.newsitem=dataController.GetBySlug(t.dslug),t.newsitem.date_launched=Date.parse(t.newsitem.date_launched),overlayFadeIn(),closeButtonStart(),socialStart("News",t.newsitem)},1e3)}]),app.controller("WorkCtrl",["$scope","$routeParams","$sce","$timeout","preloader",function(t,e,i,n,o){t.campaignID=e.campaignID,t.startSection=e.subSection,t.outputHTML=function(t){return i.trustAsHtml(t)},0!==boxid?getWorkData(t,i,n,o):n(function(){dataController.GetBySlug(t.campaignID)!==!1&&(getWorkData(t,i,n,o),clearInterval(loadInterval))},1e3)}]);var audioPlayerStart=function(){var t=document.getElementsByClassName("audio_file");$(".play-pause-btn").click(function(){var t=$(this).siblings("audio").get(0);t.paused?(t.play(),$(this).attr("src","img/pause-btn.gif")):(t.pause(),$(this).attr("src","img/play-btn.gif"))}),$(".rwd-btn").click(function(){var t=$(this).siblings("audio").get(0);t.currentTime=0}),$(".ffwd-btn").click(function(){var t=$(this).siblings("audio").get(0);t.currentTime+=5});for(var e=0;e<t.length;e++){var i=t[e];setTimeout(audioLoadTimeout,200,i),i.addEventListener("timeupdate",function(t){var e=$(i).siblings("div.meter")[0],n=$(e).children("span")[0],o=i.currentTime/i.duration*100;$(n).css("width",o+"%");var a=$(i).siblings(".time-readout")[0],r=$(a).children(".audioCurrent")[0];$(r).text(getMinSec(i.currentTime))},!1),i.addEventListener("ended",function(t){i.pause()},!1)}},audioLoadTimeout=function(t){var e=$(t).siblings(".time-readout")[0],i=$(e).children(".audioTotal")[0];$(i).text(getMinSec(t.duration))},getMinSec=function(t){var e=Math.floor(t/60),i=parseInt(t-60*e);return 10>i&&(i="0"+i),e+":"+i},getWorkData=function(t,e,i,n){t.work=dataController.GetBySlug(t.campaignID),socialStart(t.work.title,t.work.subtitle),t.work.date_launched=Date.parse(t.work.date_launched);for(var o=t.work.video_comsep,a=0;a<o.length;a++)""!==t.work.video_comsep[a]&&"string"==typeof t.work.video_comsep[a]&&(t.work.video_comsep[a]=e.trustAsResourceUrl(t.work.video_comsep[a]));var r={dots:!0,infinite:!0,speed:500,slidesToShow:1,adaptiveHeight:!0},s=[],l=!1,c=!1;""!==t.work.print_comsep[0]&&(s=s.concat(t.work.print_comsep),l=!0),""!==t.work.digital_comsep[0]&&(s=s.concat(t.work.digital_comsep),c=!0),s.length>0&&n.preloadImages(s).then(function d(t){l&&$(".printwork").slick(r),c&&$(".digitalwork").slick(r)},function u(t){console.error("Image Failed",t)},function p(t){}),audioPlayerStart(),overlayFadeIn(),closeButtonStart()};app.factory("preloader",function(t,e){function i(e){this.imageLocations=e,this.imageCount=this.imageLocations.length,this.loadCount=0,this.errorCount=0,this.states={PENDING:1,LOADING:2,RESOLVED:3,REJECTED:4},this.state=this.states.PENDING,this.deferred=t.defer(),this.promise=this.deferred.promise}return i.preloadImages=function(t){var e=new i(t);return e.load()},i.prototype={constructor:i,isInitiated:function n(){return this.state!==this.states.PENDING},isRejected:function o(){return this.state===this.states.REJECTED},isResolved:function a(){return this.state===this.states.RESOLVED},load:function r(){if(this.isInitiated())return this.promise;this.state=this.states.LOADING;for(var t=0;t<this.imageCount;t++)this.loadImageLocation(this.imageLocations[t]);return this.promise},handleImageError:function s(t){this.errorCount++,this.isRejected()||(this.state=this.states.REJECTED,this.deferred.reject(t))},handleImageLoad:function l(t){this.loadCount++,this.isRejected()||(this.deferred.notify({percent:Math.ceil(this.loadCount/this.imageCount*100),imageLocation:t}),this.loadCount===this.imageCount&&(this.state=this.states.RESOLVED,this.deferred.resolve(this.imageLocations)))},loadImageLocation:function c(t){var i=this,n=$(new Image).load(function(t){e.$apply(function(){i.handleImageLoad(t.target.src),i=n=t=null})}).error(function(t){e.$apply(function(){i.handleImageError(t.target.src),i=n=t=null})}).prop("src",t)}},i}),app.controller("DisciplineCtrl",["$scope","$routeParams","$timeout",function(t,e,i){t.dslug=e.disciplineID,closeButtonStart(),0!==boxid?(t.disciplines=dataController.GetByType("disciplines"),overlayFadeIn(),socialStart("Disciplines",titleCase(t.dslug))):i(function(){t.disciplines=dataController.GetByType("disciplines"),overlayFadeIn(),socialStart("Disciplines",titleCase(t.dslug))},1e3),i(function(){$(".dcontainer."+t.dslug+" p").slideDown(),$(".dcontainer."+t.dslug+" h1").addClass("selected"),$(".dcontainer."+t.dslug+" h1 span").html("-"),$(".dcontainer h1").click(function(){$(this).hasClass("selected")||($(".dcontainer p").slideUp(),$(".dcontainer h1").removeClass("selected"),$(".dcontainer h1 span").html("+"),$(this).addClass("selected"),$(this).children("span").html("-"),$(this).siblings("p").slideDown())})},1200)}]);var overlayFadeIn=function(t,e){"undefined"==typeof t&&(t=1e3),"undefined"==typeof e&&(e="easeOutCubic"),$("#blackout").css({display:"block"}),$("#blackout").velocity({opacity:1,"padding-top":0},{duration:t,easing:e})},closeButtonStart=function(t,e){"undefined"==typeof t&&(t=1e3),"undefined"==typeof e&&(e="easeOutCubic"),$(".close").on("click",function(i){i.preventDefault(),$("#blackout").velocity({opacity:0,"padding-top":50},{duration:t,easing:e,complete:function(){$(this).css({display:"none"}),window.location.href="#/grid"}})})},loc,newtitle,socialStart=function(t,e){loc=window.location.href,newtitle=escape(t+" - "+e+" || Red Lion Canada"),$("img.twitter").click(function(t){t.preventDefault(),window.open("http://twitter.com/share?url="+loc+"&text="+newtitle,"twitterwindow","height=450, width=550, top="+($(window).height()/2-225)+", left="+$(window).width()/2+", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")}),$("img.facebook").click(function(t){t.preventDefault(),FB.ui({method:"share",href:loc},function(t){})}),$("img.linkedin").click(function(t){t.preventDefault(),window.open("https://www.linkedin.com/shareArticle?mini=true&url="+loc+"&title="+newtitle,"linkedinwindow","height=450, width=550, top="+($(window).height()/2-225)+", left="+$(window).width()/2+", toolbar=0, menubar=0, directories=0, scrollbars=0")})},titleCase=function(t){return t.replace(/\w\S*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})};