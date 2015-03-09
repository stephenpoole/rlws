function boxClicked(e){var a=dataController.GetByID(parseInt(e.name)),c=a.title+" - "+a.description+" || "+pageTitle;document.title=c,window.location.href="#/"+a.overlay+"/"+a.slug+"/"+a.type}function fingerMouseDown(e){if(e.preventDefault(),isMobile)if(2==e.touches.length)console.log(e.touches);else{var a=e.touches[0];oldTouchX=a.pageX,oldTouchY=a.pageY}else oldTouchX=e.clientX,oldTouchY=e.clientY;mTouchDown=!0,didSingleClick=!0,mouseDownTimeout=setTimeout(function(){didSingleClick=!1},1e3*singleClickTimeout),canvas.addEventListener("mousemove",fingerMouseDrag)}function fingerMouseDrag(e){e.preventDefault(),mouseMove(e);var a,c,o,t;if(isMobile){var n=e.touches[0];a=n.pageX-oldTouchX,o=n.pageX,c=n.pageY-oldTouchY,t=n.pageY}else mTouchDown&&(a=e.clientX-oldTouchX,o=e.clientX,c=e.clientY-oldTouchY,t=e.clientY);xMove!=a&&(xMove=a,oldTouchX=o),yMove!=c&&(yMove=c,oldTouchY=t),c=0===c?void 0:c/250,a=0===a?void 0:-a/250,cameraController.Move(a,c,void 0,!1)}function fingerMouseUp(e){e.preventDefault(),mTouchDown=!1,clearTimeout(mouseDownTimeout),canvas.removeEventListener("mousemove",fingerMouseDrag);var a,c,o;if(xMove<1&&xMove>-1&&yMove<1&&yMove>-1&&!pinched&&didSingleClick){isMobile?(a=e.pageX/window.innerWidth*2-1,c=2*-(e.pageY/window.innerHeight)+1,o=new THREE.Vector3(a,c,.5)):(a=e.clientX/window.innerWidth*2-1,c=2*-(e.clientY/window.innerHeight)+1,o=new THREE.Vector3(a,c,.5)),raycaster.setFromCamera(mouse,camera);var t=raycaster.intersectObjects(scene.children);t.length>0&&"undefined"!=typeof t[0]&&"undefined"!=typeof t[0].face&&(5==t[0].face.a&&7==t[0].face.b||7==t[0].face.a&&2==t[0].face.b)&&boxClicked(t[0].object)}xMove=0,yMove=0,didSingleClick=!1,mUP=!1,mDOWN=!1,mRIGHT=!1,mDOWN=!1,oldScale=0,pinched=!1}function mouseMove(e){e.preventDefault();var a=$("header").height();mouse.x=e.clientX/$(canvasDiv).width()*2-1,mouse.y=2*-((e.clientY-a)/$(canvasDiv).height())+1}function zoomHandler(e){var a=Math.max(-.1,Math.min(.1,e.wheelDelta||-e.detail));cameraController.Zoom(2*-a)}function resetPinches(){$(document).on("pinchstart",function(e){oldScale=0,pinched=!0}),$(document).on("pinchmove",function(e){pinched=!0;var a=e.scale-oldScale;oldScale=e.scale,cameraController.Zoom(a>0?-.4:.4)}),$(document).on("pinchend",function(e){oldScale=0,pinched=!1,$(document).off("pinchstart pinchmove pinchend"),resetPinches()})}function setupEventListeners(){var e=document.getElementsByTagName("canvas");canvas=e[0],canvas.addEventListener("touchstart",fingerMouseDown),canvas.addEventListener("mousedown",fingerMouseDown),canvas.addEventListener("touchend",fingerMouseUp),canvas.addEventListener("mouseup",fingerMouseUp),canvas.addEventListener("touchmove",fingerMouseDrag),canvas.addEventListener("mousewheel",zoomHandler),canvas.addEventListener("DOMMouseScroll",zoomHandler),canvas.addEventListener("mousemove",mouseMove),window.DeviceMotionEvent&&window.addEventListener("devicemotion",devMoveHandler,!1),onMouseLeftBrowserWindow(function(e){didSingleClick=!1,clearTimeout(mouseDownTimeout),fingerMouseUp(e)})}function onMouseLeftBrowserWindow(e){addEvent(document,"mouseout",function(a){a=a?a:window.event;var c=a.relatedTarget||a.toElement;c&&"HTML"!=c.nodeName||e(a)})}function addEvent(e,a,c){e.addEventListener?e.addEventListener(a,c,!1):e.attachEvent&&e.attachEvent("on"+a,c)}$(document).keydown(function(e){38==e.which&&(e.preventDefault(),mUP=!0),40==e.which&&(e.preventDefault(),mDOWN=!0),37==e.which&&(e.preventDefault(),mLEFT=!0),39==e.which&&(e.preventDefault(),mRIGHT=!0),34==e.which&&(e.preventDefault(),mGOIN=!0),33==e.which&&(e.preventDefault(),mGOOUT=!0),36==e.which&&(e.preventDefault(),mROTUP=!0),35==e.which&&(e.preventDefault(),mROTDOWN=!0)}),$(document).keyup(function(e){38==e.which&&(e.preventDefault(),mUP=!1),40==e.which&&(e.preventDefault(),mDOWN=!1),37==e.which&&(e.preventDefault(),mLEFT=!1),39==e.which&&(e.preventDefault(),mRIGHT=!1),34==e.which&&(e.preventDefault(),mGOIN=!1),33==e.which&&(e.preventDefault(),mGOOUT=!1),36==e.which&&(e.preventDefault(),mROTUP=!1),35==e.which&&(e.preventDefault(),mROTDOWN=!1)}),resetPinches();var acc_oldaz=null,acc_az=0,acc_arAlpha=0,acc_arBeta=0,acc_speed=5,acc_fromx=null,acc_tox=null,acc_fromy=null,acc_toy=null,acc_totilt=null,acc_fromtilt=null,devMoveHandler=function(e){null===acc_fromx&&(acc_fromx=cameraController.camera.position.x),null===acc_tox&&(acc_tox=cameraController.camera.position.x),null===acc_fromy&&(acc_fromy=cameraController.camera.position.y),null===acc_toy&&(acc_toy=cameraController.camera.position.y),null===acc_totilt&&(acc_totilt=cameraController.camera.rotation.x),null===acc_fromtilt&&(acc_fromtilt=cameraController.camera.rotation.x);var a=e.rotationRate;if(null!==a&&(acc_arAlpha=a.alpha,isiOS||(acc_arAlpha=40*acc_arAlpha),acc_arBeta=a.beta,isiOS||(acc_arBeta=40*acc_arBeta)),mTouchDown)acc_toy=acc_fromy=cameraController.camera.position.y,acc_tox=acc_fromx=cameraController.camera.position.x;else{if(acc_fromx=camera.position.x,Math.abs(acc_arBeta)>10){var c=-acc_arBeta/45;acc_tox=acc_fromx+c}if(acc_fromy=camera.position.y,Math.abs(acc_arAlpha)>10){var o=acc_arAlpha/25;acc_toy=acc_fromy+o}cameraController.Move((acc_tox-acc_fromx)/acc_speed,(acc_toy-acc_fromy)/acc_speed,void 0,!1)}acc_az=Math.abs(1*e.accelerationIncludingGravity.z),null===acc_oldaz&&(acc_oldaz=acc_az),acc_fromtilt=camera.rotation.x,(acc_az>acc_oldaz+.5||acc_oldaz-.5>acc_az)&&(acc_totilt=.09*(acc_az-3),acc_oldaz=acc_az),cameraController.Rotate((acc_totilt-acc_fromtilt)/(2*acc_speed),void 0,void 0,!1)};