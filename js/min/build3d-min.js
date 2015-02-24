function moveCamX(e){camera.position.x+=e,light.position.x+=e}function moveCamY(e){camera.position.y+=e,light.position.y+=e}function render(){requestAnimationFrame(render),overlay||(mRIGHT&&moveCamX(.1),mLEFT&&moveCamX(-.1),mUP&&moveCamY(.1),mDOWN&&moveCamY(-.1),mGOIN&&(camera.position.z-=.1),mGOOUT&&(camera.position.z+=.1),xMove&&moveCamX(xMove/200*-1),yMove&&moveCamY(yMove/200),mROTUP&&camera.rotation.x<.9&&(camera.rotation.x+=.03),mROTDOWN&&camera.rotation.x>0&&(camera.rotation.x-=.03),renderer.render(scene,camera))}function boxClicked(e){console.log(glCards[parseInt(e.name)]),$("#blackout").css({display:"block"}).animate({opacity:1},500),overlay=!0,$("#overlay").html("box clicked: "+e.name+"<br>Content title: "+glCards[parseInt(e.name)].title+"<br>Description: "+glCards[parseInt(e.name)].description+'<br>Image: <img src="'+glCards[parseInt(e.name)].img+'">'),$("#blackout").on("click touchend",function(e){$(this).animate({opacity:0},500,function(){$("#blackout").css({display:"none"}),overlay=!1}),$(this).unbind("click")})}function fingerMouseDown(e){if(e.preventDefault(),isMobile)if(2==e.touches.length)console.log(e.touches);else{var i=e.touches[0];oldTouchX=i.pageX,oldTouchY=i.pageY}else oldTouchX=e.clientX,oldTouchY=e.clientY;mTouchDown=!0}function fingerMouseDrag(e){if(e.preventDefault(),isMobile){var i=e.touches[0];xMove=i.pageX-oldTouchX,oldTouchX=i.pageX,yMove=i.pageY-oldTouchY,oldTouchY=i.pageY}else mTouchDown&&(xMove=e.clientX-oldTouchX,oldTouchX=e.clientX,yMove=e.clientY-oldTouchY,oldTouchY=e.clientY)}function fingerMouseUp(e){e.preventDefault();var i,n,o;if(isMobile?(i=e.pageX/window.innerWidth*2-1,n=2*-(e.pageY/window.innerHeight)+1,o=new THREE.Vector3(i,n,.5)):(i=e.clientX/window.innerWidth*2-1,n=2*-(e.clientY/window.innerHeight)+1,o=new THREE.Vector3(i,n,.5)),1>xMove&&xMove>-1&&1>yMove&&yMove>-1&&!pinched){var t=new THREE.Raycaster;o.unproject(camera),t.set(camera.position,o.sub(camera.position).normalize());var a=t.intersectObjects(objects);a.length>0&&boxClicked(a[0].object)}xMove=0,yMove=0,mTouchDown=!1,oldScale=0,pinched=!1}function zoomHandler(e){var i=Math.max(-.1,Math.min(.1,e.wheelDelta||-e.detail));(camera.position.z>camMinHeight&&i>0||camera.position.z<camMaxHeight&&0>i)&&(camera.position.z-=i)}function resetPinches(){$(document).on("pinchstart",function(e){oldScale=0,pinched=!0}),$(document).on("pinchmove",function(e){pinched=!0;var i=e.scale-oldScale;oldScale=e.scale,camera.position.z<camMaxHeight&&0>i?(camera.position.z+=.1,console.log("zoom out, delta: "+i)):camera.position.z>camMinHeight&&i>0&&(camera.position.z-=.1,console.log("zoom in, delta: "+i))}),$(document).on("pinchend",function(e){oldScale=0,pinched=!1,$(document).off("pinchstart pinchmove pinchend"),resetPinches()})}function init3D(){var e=new THREE.PlaneBufferGeometry(100,100),i=new THREE.MeshPhongMaterial({color:16776690,side:THREE.DoubleSide}),n=new THREE.Mesh(e,i);scene.add(n),n.position.z=-.2,light=new THREE.PointLight(16777215,1,50),light.position.set(0,0,4),scene.add(light),camera.position.z=5,initInterval=setInterval(function(){glCards.length>0&&(clearInterval(initInterval),initBuildings())},500),render()}function initBuildings(){var e=math.zeros(maxX,maxY),i=math.zeros(1,glCards.length);camMinHeight=0;for(var n=glCards,o=n.length,t=jitterX,a=jitterY,r=!1,c=0,m=1;maxY>=m;m++){for(var l=maxX;l>=1;l--){var s={},h=n[c];if("undefined"==typeof h){r=!0;break}if(1!=e.subset(math.index(m-1,maxX-l))){e.subset(math.index(m-1,maxX-l),1);var d;if(h.ysize>1)for(d=1;d<=h.xsize;d++)e.subset(math.index(m+d-1,maxX-l),1);if(h.xsize>1)for(d=1;d<=h.ysize;d++)e.subset(math.index(m-1,maxX-l+d),1);i.subset(math.index(0,o-n.length),1),n=n.splice(c,1),t*=-1,a*=-1;var u=gutterY*(h.ysize-1)+boxheight*h.ysize,g=gutterX*(h.xsize-1)+boxwidth*h.xsize,v=3*Math.random()+1;v/2+1>camMinHeight&&(camMinHeight=Math.ceil(v/2+1)),s.geometry=new THREE.BoxGeometry(g,u,v);var p=colors[Math.round(Math.random())];if(s.material=[new THREE.MeshLambertMaterial({color:p}),new THREE.MeshLambertMaterial({color:p}),new THREE.MeshLambertMaterial({color:p}),new THREE.MeshLambertMaterial({color:p}),new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture(h.img)}),new THREE.MeshLambertMaterial({color:p})],s.material[4].minFilter=THREE.NearestFilter,s.cube=new THREE.Mesh(s.geometry,new THREE.MeshFaceMaterial(s.material)),s.cube.name=c,scene.add(s.cube),objects.push(s.cube),s.cube.position.x=-l*gridSizex-(h.xsize-1)*gridSizex/2+t,s.cube.position.y=-m*gridSizey-(h.ysize-1)*gridSizey/2+a,r)break}}if(r)break}console.log("camera max: "+camMaxHeight+" min: "+camMinHeight)}function logMatrix(e){for(var i in e)for(var n in i)console.log(e[i][n])}var mUP=!1,mDOWN=!1,mRIGHT=!1,mLEFT=!1,mGOIN=!1,mGOOUT=!1,mROTUP=!1,mROTDOWN=!1,isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1e4),scene=new THREE.Scene;scene.fog=new THREE.FogExp2(16776690,.18);var renderer=new THREE.WebGLRenderer({antialias:!0}),light=null,camMaxHeight=6.5,camMinHeight,objects=[],gridSizex=1.2,gridSizey=1.5,maxX=6,maxY=6,boxheight=1.3,boxwidth=1,gutterX=gridSizex-boxwidth,gutterY=gridSizey-boxheight,jitterX=.05,jitterY=.4,colors=[14755101,3909315],objects=[],oldTouchX=0,oldTouchY=0,xMove=0,yMove=0,mTouchDown=!1,mTouchMove=!1,overlay=!1,oldScale=0,pinched=!1,initInterval;renderer.setSize(window.innerWidth,window.innerHeight),renderer.shadowMapEnabled=!0,document.body.appendChild(renderer.domElement),$(document).keydown(function(e){38==e.which&&(e.preventDefault(),mUP=!0),40==e.which&&(e.preventDefault(),mDOWN=!0),37==e.which&&(e.preventDefault(),mLEFT=!0),39==e.which&&(e.preventDefault(),mRIGHT=!0),34==e.which&&(e.preventDefault(),mGOIN=!0),33==e.which&&(e.preventDefault(),mGOOUT=!0),36==e.which&&(e.preventDefault(),mROTUP=!0),35==e.which&&(e.preventDefault(),mROTDOWN=!0)}),$(document).keyup(function(e){38==e.which&&(e.preventDefault(),mUP=!1),40==e.which&&(e.preventDefault(),mDOWN=!1),37==e.which&&(e.preventDefault(),mLEFT=!1),39==e.which&&(e.preventDefault(),mRIGHT=!1),34==e.which&&(e.preventDefault(),mGOIN=!1),33==e.which&&(e.preventDefault(),mGOOUT=!1),36==e.which&&(e.preventDefault(),mROTUP=!1),35==e.which&&(e.preventDefault(),mROTDOWN=!1)}),resetPinches(),document.addEventListener("touchstart",fingerMouseDown),document.addEventListener("mousedown",fingerMouseDown),document.addEventListener("touchend",fingerMouseUp),document.addEventListener("mouseup",fingerMouseUp),document.addEventListener("touchmove",fingerMouseDrag),document.addEventListener("mousemove",fingerMouseDrag),document.addEventListener("mousewheel",zoomHandler);