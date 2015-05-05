function boxClicked(e){var o=!0,a=dataController.GetByID(parseInt(e.name));a.js_trigger&&(te("map-clicks","client-clicked",a.js_trigger),o=!1,o||keywordReturn(a.js_trigger)),boxid=parseInt(e.name),(o||a.js_trigger)&&(window.location.href="#/"+a.overlay+"/"+a.slug+"/"+a.type)}function mouseCursor(e){var o=$("canvas");switch(e){case"grab":o.css({cursor:"grab",cursor:"-webkit-grab"});break;case"grabbing":o.css({cursor:"grabbing",cursor:"-webkit-grabbing"});break;case"point":o.css({cursor:"pointer"});break;case"normal":default:o.css({cursor:"default"})}}function renderMouseListener(){if(!mTouchDown&&!overlay&&!cameraController.animating){raycaster.setFromCamera(mouse,camera);var e=raycaster.intersectObjects(scene.children);e.length>0&&"undefined"!=typeof e[0]&&"undefined"!=typeof e[0].face&&mouseCursor(5==e[0].face.a&&7==e[0].face.b||7==e[0].face.a&&2==e[0].face.b?"point":"grab")}}function fingerMouseDown(e){if(e.preventDefault(),cameraController.xSpeed=0,cameraController.ySpeed=0,mTouchDown=!0,didSingleClick=!0,isMobile&&e.touches.length<2){var o=e.touches[0];oldTouchX=o.pageX,oldTouchY=o.pageY,mouseMove(e)}else isMobile||(oldTouchX=e.clientX,oldTouchY=e.clientY);canvas.addEventListener("mousemove",fingerMouseDrag),mouseDownTimeout=setTimeout(function(){didSingleClick=!1},1e3*singleClickTimeout)}function fingerMouseDrag(e){e.preventDefault(),mouseMove(e);var o,a,t,n,c,r;if(isMobile){var i=e.touches[0];c=i.pageX,r=i.pageY}else c=e.clientX,r=e.clientY;o=c-oldTouchX,t=c,a=r-oldTouchY,n=r,xMove!=o&&(xMove=o,oldTouchX=t),yMove!=a&&(yMove=a,oldTouchY=n);var l=cameraController.camera.position.z/12;if(mouseCursor("grabbing"),a=0===a?void 0:a/75,o=0===o?void 0:-o/75,3==e.which){var m=10*a;cameraController.HitTestZ(cameraController.camera.position.z+m)&&(cameraController.Move(void 0,void 0,m,!1),cameraController.zSpeed=m)}else cameraController.Move(o*l,a*l,void 0,!1),cameraController.xSpeed=o*l,cameraController.ySpeed=a*l}function fingerMouseUp(e){if(e.preventDefault(),mTouchDown=!1,clearTimeout(mouseDownTimeout),canvas.removeEventListener("mousemove",fingerMouseDrag),xMove<1&&xMove>-1&&yMove<1&&yMove>-1&&!pinched&&didSingleClick){raycaster.setFromCamera(mouse,camera);var o=raycaster.intersectObjects(scene.children);o.length>0&&"undefined"!=typeof o[0]&&"undefined"!=typeof o[0].face&&(5==o[0].face.a&&7==o[0].face.b||7==o[0].face.a&&2==o[0].face.b)&&boxClicked(o[0].object)}mouseCursor(),xMove=0,yMove=0,didSingleClick=!1,mUP=!1,mDOWN=!1,mRIGHT=!1,mDOWN=!1,oldScale=0,pinched=!1,touchFinish=!0}function rightClick(e){}function mouseMove(e){e.preventDefault();var o=$("header").height();isMobile?(mouse.x=e.touches[0].pageX/$(canvasDiv).width()*2-1,mouse.y=2*-((e.touches[0].pageY-o)/$(canvasDiv).height())+1):(mouse.x=e.clientX/$(canvasDiv).width()*2-1,mouse.y=2*-((e.clientY-o)/$(canvasDiv).height())+1)}function zoomHandler(e){if(e.preventDefault(),e.shiftKey){var o=Math.max(-.02,Math.min(.02,e.wheelDelta||-e.detail));cameraController.Rotate(o,void 0,void 0,!1)}else if(e.ctrlKey){var o=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));cameraController.HitTestZ(cameraController.camera.position.z-o)&&(cameraController.Zoom(-o),cameraController.zSpeed=-o)}else{var a=Math.max(-10,Math.min(10,e.wheelDeltaX||-e.detail)),t=Math.max(-10,Math.min(10,e.wheelDeltaY||-e.detail));cameraController.Move(-a/25,t/25,void 0,!1)}}function resetPinches(){var e=[],o=0,a=0;$(document).on("pinchstart",function(e){pinched=!0,o=e.scale}),$(document).on("pinchmove",function(e){a=-10*(e.scale-o),o=e.scale,cameraController.HitTestZ(cameraController.camera.position.z+a)&&cameraController.Move(void 0,void 0,a,!1),cameraController.zSpeed=a}),$(document).on("pinchend",function(e){pinched=!1,$(document).off("pinchstart pinchmove pinchend"),resetPinches()})}function setupEventListeners(){canvas.addEventListener("touchstart",fingerMouseDown),canvas.addEventListener("mousedown",fingerMouseDown),canvas.addEventListener("touchend",fingerMouseUp),canvas.addEventListener("mouseup",fingerMouseUp),canvas.addEventListener("touchmove",fingerMouseDrag),canvas.addEventListener("mousewheel",zoomHandler),canvas.addEventListener("DOMMouseScroll",zoomHandler),canvas.addEventListener("mousemove",mouseMove),enableOnScreenController(),window.DeviceMotionEvent&&window.addEventListener("devicemotion",devMoveHandler,!1),onMouseLeftBrowserWindow(function(e){didSingleClick=!1,clearTimeout(mouseDownTimeout),fingerMouseUp(e)})}function onMouseLeftBrowserWindow(e){addEvent(document,"mouseout",function(o){o=o?o:window.event;var a=o.relatedTarget||o.toElement;a&&"HTML"!=a.nodeName||e(o)})}function addEvent(e,o,a){e.addEventListener?e.addEventListener(o,a,!1):e.attachEvent&&e.attachEvent("on"+o,a)}function enableOnScreenController(){isMobile?$("#controls").css("display","none"):($("#controls img").on("dragstart",function(e){e.preventDefault()}),$("#mapctrl-left").mousedown(function(){mLEFT=!0,te("on-screen-controls","move-left-clicked"),$(this).mousemove(function(e){e.preventDefault(),mLEFT=!1})}).mouseup(function(){mLEFT=!1,cameraController.xSpeed=-.5}),$("#mapctrl-right").mousedown(function(){mRIGHT=!0,te("on-screen-controls","move-right-clicked"),$(this).mousemove(function(e){e.preventDefault(),mRIGHT=!1})}).mouseup(function(){mRIGHT=!1,cameraController.xSpeed=.5}),$("#mapctrl-up").mousedown(function(){mUP=!0,te("on-screen-controls","move-up-clicked"),$(this).mousemove(function(e){e.preventDefault(),mUP=!1})}).mouseup(function(){mUP=!1,cameraController.ySpeed=.5}),$("#mapctrl-down").mousedown(function(){mDOWN=!0,te("on-screen-controls","move-down-clicked"),$(this).mousemove(function(e){e.preventDefault(),mDOWN=!1})}).mouseup(function(){mDOWN=!1,cameraController.ySpeed=-.5}),$("#mapctrl-zoomin").mousedown(function(){mGOOUT=!0,te("on-screen-controls","zoom-in-clicked"),$(this).mousemove(function(e){e.preventDefault(),mGOOUT=!1})}).mouseup(function(){mGOOUT=!1,cameraController.HitTestZ(cameraController.camera.position.z-.4)&&(cameraController.zSpeed=-.4)}),$("#mapctrl-zoomout").mousedown(function(){mGOIN=!0,te("on-screen-controls","zoom-out-clicked"),$(this).mousemove(function(e){e.preventDefault(),mGOIN=!1})}).mouseup(function(){mGOIN=!1,cameraController.zSpeed=.4}),$("#mapctrl-tilt").click(function(e){te("on-screen-controls","tilt-clicked"),e.preventDefault();var o=cameraController.rotation.x,a=cameraController.constraints.R1,t=(cameraController.constraints.R1+cameraController.constraints.R2)/2,n=cameraController.constraints.R2;o>=a&&t>o?cameraController.Rotate(t,void 0,void 0,!0,!0):o>=t&&n>o?cameraController.Rotate(n,void 0,void 0,!0,!0):cameraController.Rotate(a,void 0,void 0,!0,!0)}))}$(document).keydown(function(e){38==e.which&&(e.preventDefault(),mUP=!0),40==e.which&&(e.preventDefault(),mDOWN=!0),37==e.which&&(e.preventDefault(),mLEFT=!0),39==e.which&&(e.preventDefault(),mRIGHT=!0),34==e.which&&(e.preventDefault(),mGOIN=!0),33==e.which&&(e.preventDefault(),mGOOUT=!0),36==e.which&&(e.preventDefault(),mROTUP=!0),35==e.which&&(e.preventDefault(),mROTDOWN=!0),closeMenu()}),$(document).keyup(function(e){38==e.which&&(e.preventDefault(),mUP=!1,cameraController.ySpeed=.5),40==e.which&&(e.preventDefault(),mDOWN=!1,cameraController.ySpeed=-.5),37==e.which&&(e.preventDefault(),mLEFT=!1,cameraController.xSpeed=-.5),39==e.which&&(e.preventDefault(),mRIGHT=!1,cameraController.xSpeed=.5),34==e.which&&(e.preventDefault(),mGOIN=!1),33==e.which&&(e.preventDefault(),mGOOUT=!1),36==e.which&&(e.preventDefault(),mROTUP=!1),35==e.which&&(e.preventDefault(),mROTDOWN=!1)}),resetPinches();var devMoveHandler=function(e){null===acc_fromx&&(acc_fromx=cameraController.camera.position.x),null===acc_tox&&(acc_tox=cameraController.camera.position.x),null===acc_fromy&&(acc_fromy=cameraController.camera.position.y),null===acc_toy&&(acc_toy=cameraController.camera.position.y),null===acc_totilt&&(acc_totilt=cameraController.camera.rotation.x),null===acc_fromtilt&&(acc_fromtilt=cameraController.camera.rotation.x);var o=e.rotationRate;if(null!==o&&(acc_arAlpha=o.alpha,isiOS||(acc_arAlpha=40*acc_arAlpha),acc_arBeta=o.beta,isiOS||(acc_arBeta=40*acc_arBeta)),mTouchDown||cameraController.animating||touchFinish)acc_toy=acc_fromy=cameraController.camera.position.y,acc_tox=acc_fromx=cameraController.camera.position.x;else{if(acc_fromx=camera.position.x,Math.abs(acc_arBeta)>10){var a=-acc_arBeta/45;acc_tox=acc_fromx+a}if(acc_fromy=camera.position.y,Math.abs(acc_arAlpha)>10){var t=acc_arAlpha/25;acc_toy=acc_fromy+t}cameraController.Move((acc_tox-acc_fromx)/acc_speed,(acc_toy-acc_fromy)/acc_speed,void 0,!1)}acc_az=Math.abs(1*e.accelerationIncludingGravity.z),null===acc_oldaz&&(acc_oldaz=acc_az),acc_fromtilt=camera.rotation.x,(acc_az>acc_oldaz+.5||acc_az<acc_oldaz-.5)&&(acc_totilt=.09*(acc_az-3),acc_oldaz=acc_az),cameraController.Rotate((acc_totilt-acc_fromtilt)/(2*acc_speed),void 0,void 0,!1)};