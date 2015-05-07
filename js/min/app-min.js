var glCards=[],boxid=0,loadInterval,app=angular.module("redLion",["ngRoute"]);app.config(["$routeProvider",function(t){t.when("/grid",{template:" ",controller:"GridControler"}).when("/work/:campaignID/:subSection",{templateUrl:"templates/work.html",controller:"WorkCtrl"}).when("/disciplines/:disciplineID",{templateUrl:"templates/discipline.html",controller:"DisciplineCtrl"}).when("/news/:newsID",{templateUrl:"templates/news.html",controller:"NewsCtrl"}).otherwise({redirectTo:"/grid"})}]),app.controller("CardTestController",function(t,e,i){t.cards=e.get(),init3D()}),app.factory("Cards",function(t){var e=[];return{get:function(){return 0===e.length&&t.get("http://redlioncanada.com/api/content/").success(function(t){for(var i=0,o=t.length;o>i;i++)e.push(t[i])}).error(function(t){alert("ERROR: "+t)}),glCards=e,e}}}),app.controller("GridControler",function(t){"block"==$("#blackout").css("display")&&$("#blackout").velocity({opacity:0,"padding-top":50},{duration:millisecs,easing:tweentype,complete:function(){$(this).css({display:"none"})}})}),app.controller("NewsCtrl",["$scope","$routeParams","$timeout","$sce",function(t,e,i,o){t.dslug=e.newsID,closeButtonStart(!0),t.outputHTML=function(t){return o.trustAsHtml(t)},t.parseMyDate=function(t){var e=t.split(/[- :]/),i=new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5]);return new Date(i)},0!==boxid?(t.newsitems=dataController.GetByType("news"),overlayFadeIn(),socialStart("News",titleCase(t.dslug))):i(function(){t.newsitems=dataController.GetByType("news"),overlayFadeIn(),socialStart("news",titleCase(t.dslug))},1500);var n=800;i(function(){$("#blackout").animate({scrollTop:$(".ncontainer."+t.dslug+" h1").offset().top},500,function(){$(".ncontainer."+t.dslug+" .title").addClass("selected"),$(".ncontainer."+t.dslug+" .title h1 span").html("-"),$(".ncontainer."+t.dslug+" .title .cover").velocity({height:"74px"},{duration:n}),$(".ncontainer."+t.dslug+" .newscontent").velocity("slideDown",{duration:n}),te("map-clicks","news-item-clicked",t.dslug)}),socialStart("Red Lion News",$(".ncontainer."+t.dslug+" .title").html().replace(/(<([^>]+)>)/gi,"")),$("#overlay").on("click",".ncontainer .title",function(){if(socialStart("Red Lion News",titleCase(t.dslug)),$(this).children(".ncontainer .title h1").hasClass("selected")){var e=$(this);e.removeClass("selected"),e.find("h1 span").html("+").css("padding",0),e.children(".cover").velocity({height:"74px"},{duration:n}),e.siblings(".newscontent").velocity("slideUp",{duration:n})}else{var e=$(this);$(".ncontainer .newscontent").velocity("slideUp",{duration:n}),$(".ncontainer .title").removeClass("selected"),$(".ncontainer .title h1 span").html("+").css("padding",0),$(".ncontainer .title .cover").velocity({height:"2px"},{duration:n}),e.addClass("selected"),e.find("h1 span").html("-").css({"padding-left":3,"padding-right":4}),e.children(".cover").velocity({height:"74px"},{duration:n}),e.siblings(".newscontent").velocity("slideDown",{duration:n}),te("overlay","news-item-clicked",e.attr("slug"))}})},1500)}]),app.controller("WorkCtrl",["$scope","$routeParams","$sce","$timeout","preloader",function(t,e,i,o,n){t.campaignID=e.campaignID,t.startSection=e.subSection,t.outputHTML=function(t){return i.trustAsHtml(t)},t.parseMyDate=function(t){var e=t.split(/[- :]/),i=new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5]);return new Date(i)},0!==boxid?getWorkData(t,i,o,n):o(function(){dataController.GetBySlug(t.campaignID)!==!1&&(getWorkData(t,i,o,n),clearInterval(loadInterval))},1e3)}]);var audioPlayerStart=function(){var t=document.getElementsByClassName("audio_file");$(".play-pause-btn").click(function(){var t=$(this).siblings("audio").get(0);t.paused?(t.play(),$(this).attr("src","img/pause-btn.gif")):(t.pause(),$(this).attr("src","img/play-btn.gif"))}),$(".rwd-btn").click(function(){var t=$(this).siblings("audio").get(0);t.currentTime=0}),$(".ffwd-btn").click(function(){var t=$(this).siblings("audio").get(0);t.currentTime+=5});for(var e=0;e<t.length;e++){var i=t[e];setTimeout(audioLoadTimeout,200,i),i.addEventListener("timeupdate",function(t){var e=$(i).siblings("div.meter")[0],o=$(e).children("span")[0],n=i.currentTime/i.duration*100;$(o).css("width",n+"%");var a=$(i).siblings(".time-readout")[0],r=$(a).children(".audioCurrent")[0];$(r).text(getMinSec(i.currentTime))},!1),i.addEventListener("ended",function(t){i.pause()},!1)}},audioLoadTimeout=function(t){var e=$(t).siblings(".time-readout")[0],i=$(e).children(".audioTotal")[0];$(i).text(getMinSec(t.duration))},getMinSec=function(t){var e=Math.floor(t/60),i=parseInt(t-60*e);return 10>i&&(i="0"+i),e+":"+i},getWorkData=function(t,e,i,o){t.work=dataController.GetBySlug(t.campaignID),socialStart(t.work.title,t.work.subtitle),te("map-clicks","work-item-clicked",t.work.slug),t.work.date_launched=t.parseMyDate(t.work.date_launched);for(var n=t.work.video_comsep,a=0;a<n.length;a++)""!==t.work.video_comsep[a]&&"string"==typeof t.work.video_comsep[a]&&(t.work.video_comsep[a]=e.trustAsResourceUrl(t.work.video_comsep[a]+"?title=0&byline=0&badge=0&color=e0280a&portrait=0"));var r={dots:!0,infinite:!0,speed:500,slidesToShow:1,adaptiveHeight:!0},l=[],s=!1,c=!1;""!==t.work.print_comsep[0]&&(l=l.concat(t.work.print_comsep),s=!0),""!==t.work.digital_comsep[0]&&(l=l.concat(t.work.digital_comsep),c=!0),void 0===t.work.preloadedImages&&l.length>0?o.preloadImages(l).then(function d(e){s&&$(".printwork").slick(r),c&&$(".digitalwork").slick(r),t.work.preloadedImages=!0},function u(t){console.error("Image Failed",t)},function p(t){}):i(function(){s&&$(".printwork").slick(r),c&&$(".digitalwork").slick(r)},200),setTimeout(audioPlayerStart,1e3),overlayFadeIn(),closeButtonStart()};app.factory("preloader",function(t,e){function i(e){this.imageLocations=e,this.imageCount=this.imageLocations.length,this.loadCount=0,this.errorCount=0,this.states={PENDING:1,LOADING:2,RESOLVED:3,REJECTED:4},this.state=this.states.PENDING,this.deferred=t.defer(),this.promise=this.deferred.promise}return i.preloadImages=function(t){var e=new i(t);return e.load()},i.prototype={constructor:i,isInitiated:function o(){return this.state!==this.states.PENDING},isRejected:function n(){return this.state===this.states.REJECTED},isResolved:function a(){return this.state===this.states.RESOLVED},load:function r(){if(this.isInitiated())return this.promise;this.state=this.states.LOADING;for(var t=0;t<this.imageCount;t++)this.loadImageLocation(this.imageLocations[t]);return this.promise},handleImageError:function l(t){this.errorCount++,this.isRejected()||(this.state=this.states.REJECTED,this.deferred.reject(t))},handleImageLoad:function s(t){this.loadCount++,this.isRejected()||(this.deferred.notify({percent:Math.ceil(this.loadCount/this.imageCount*100),imageLocation:t}),this.loadCount===this.imageCount&&(this.state=this.states.RESOLVED,this.deferred.resolve(this.imageLocations)))},loadImageLocation:function c(t){var i=this,o=$(new Image).load(function(t){e.$apply(function(){i.handleImageLoad(t.target.src),i=o=t=null})}).error(function(t){e.$apply(function(){i.handleImageError(t.target.src),i=o=t=null})}).prop("src",t)}},i}),app.controller("DisciplineCtrl",["$scope","$routeParams","$timeout","$sce",function(t,e,i,o){t.dslug=e.disciplineID,closeButtonStart(!0),$("#blackout").scrollTop(0),t.outputHTML=function(t){return o.trustAsHtml(t)},0!==boxid?(t.disciplines=dataController.GetByType("disciplines"),overlayFadeIn(),socialStart("Disciplines",titleCase(t.dslug))):i(function(){t.disciplines=dataController.GetByType("disciplines"),overlayFadeIn(),socialStart("Disciplines",titleCase(t.dslug))},1e3),i(function(){$("#blackout").animate({scrollTop:$(".dcontainer."+t.dslug+" h1").offset().top},500,function(){$(".dcontainer."+t.dslug+" h1").addClass("selected"),$(".dcontainer."+t.dslug+" h1 span").html("-"),$(".dcontainer."+t.dslug+" p").slideDown(),te("overlay","discipline-clicked",t.dslug)}),$("#overlay").on("click",".dcontainer h1",function(){$(this).hasClass("selected")?($(this).removeClass("selected"),$(this).children("span").html("+").css("padding",0),$(this).siblings("p").slideUp()):($(".dcontainer p").slideUp(),$(".dcontainer h1").removeClass("selected"),$(".dcontainer h1 span").html("+").css("padding",0),$(this).addClass("selected"),$(this).children("span").html("-").css({"padding-left":3,"padding-right":4}),$(this).siblings("p").slideDown(),te("overlay","discipline-clicked",$(this).attr("slug")))})},1500)}]);var overlayFadeIn=function(t,e){"undefined"==typeof t&&(t=1e3),"undefined"==typeof e&&(e="easeOutCubic");var i=0;$("#overlay header h1, #overlay header h2").css("left","-800px"),$("#overlay button.close, #overlay .social-btns").css("right","-30px"),$("#overlay #description, #overlay .overlay-content").css({"margin-top":"100px",opacity:0}),cameraController.AnimateBlur(.003,2),$("#blackout").css({display:"block"}),$("#blackout").velocity({opacity:1,"padding-top":0},{duration:overlaybuildtime,easing:e}),setTimeout(function(){$("#overlay header h2").velocity({left:"20px"},{duration:overlaybuildtime,easing:e})},i),i+=overlayanimationdelay,setTimeout(function(){$("#overlay button.close").velocity({right:"20px"},{duration:overlaybuildtime,easing:e})},i),i+=overlayanimationdelay,setTimeout(function(){$("#overlay .social-btns").velocity({right:"23px"},{duration:overlaybuildtime,easing:e})},i),i+=overlayanimationdelay,setTimeout(function(){$("#overlay header h1").velocity({left:"20px"},{duration:overlaybuildtime,easing:e})},i),i+=overlayanimationdelay,setTimeout(function(){$("#overlay #description").length&&$("#overlay #description").velocity({"margin-top":"0px",opacity:1},{duration:overlaybuildtime,easing:e})},i),i+=overlayanimationdelay,setTimeout(function(){$("#overlay .overlay-content").velocity({"margin-top":"0px",opacity:1},{duration:overlaybuildtime,easing:e})},i)},closeButtonStart=function(t,e,i){"undefined"==typeof e&&(e=1e3),"undefined"==typeof i&&(i="easeOutCubic"),"undefined"==typeof t&&(t=""),1==t&&$("#overlay").off("click"),$(".close").on("click",function(t){t.preventDefault(),te("overlay","close-clicked"),cameraController.AnimateBlur(0,1),$("#blackout").velocity({opacity:0,"padding-top":50},{duration:e,easing:i,complete:function(){$("#blackout").scrollTop(0),$(this).css({display:"none"}),window.location.href="#/grid"}})})},loc,newtitle,socialStart=function(t,e){loc=escape(window.location.href),newtitle=escape(t+" - "+e+" || Red Lion Canada #redlion #redefine"),$(".twitter, .facebook, .linkedin").off("click"),$(".twitter").on("click",function(i){i.preventDefault(),te("share","twitter",t+" - "+e),window.open("http://twitter.com/share?url="+loc+"&text="+newtitle,"twitterwindow","height=450, width=550, top="+($(window).height()/2-225)+", left="+$(window).width()/2+", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")}),$(".facebook").on("click",function(i){i.preventDefault(),te("share","facebook",t+" - "+e),FB.ui({method:"share",href:loc},function(t){})}),$(".linkedin").on("click",function(i){i.preventDefault(),te("share","linkedin",t+" - "+e),window.open("https://www.linkedin.com/shareArticle?mini=true&url="+loc+"&title="+newtitle,"linkedinwindow","height=450, width=550, top="+($(window).height()/2-225)+", left="+$(window).width()/2+", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")})},titleCase=function(t){return t.replace(/\w\S*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})};