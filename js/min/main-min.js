function spinfunction(){loopCount++;var e=180*loopCount;$("#loadinglogo").velocity({rotateZ:e},{duration:1200})}function resize(){var e=canvasDiv.width(),o=canvasDiv.height();camera.sceneWidth=e,camera.sceneHeight=o,camera.aspect=e/o,renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(e,o),camera.updateProjectionMatrix(),cameraController&&cameraController.Update(),secondResize?secondResize=!1:(setTimeout(resize,750),secondResize=!0)}function render(){function e(e){return 50*e/100*.3}if(renderMouseListener(),TWEEN.update(),windSound.volume=cameraController.camera.position.z/1100,cameraController.AfterRelease(),!overlay){var o=xMove?-(xMove/200):.4;mLEFT&&!xMove&&(o*=-1);var t=yMove?yMove/200:.4;mDOWN&&!yMove&&(t*=-1),(mLEFT||mRIGHT)&&cameraController.Move(o,void 0,void 0,!1),(mUP||mDOWN)&&cameraController.Move(void 0,t,void 0,!1),mGOIN&&cameraController.Zoom(.4),mGOOUT&&cameraController.Zoom(-.4),mROTUP&&cameraController.Rotate(.03,void 0,void 0,!1),mROTDOWN&&cameraController.Rotate(-.03,void 0,void 0,!1),composer.render(.1),requestAnimationFrame(render)}if(isMobile)var a=camera.position.x,r=camera.position.y;else var a=camera.position.x+camera.width*e(mouse.x),r=camera.position.y+camera.height*e(mouse.y);var n=cityController.city?cityController.city.extents.Z2:0,i=7,s=6;mouseSpot.position.set(a-s,r-i,n),mouseSpot.target.position.set(a+s,r+i,0),mouseSpot.updateMatrixWorld(),mouseSpot.target.updateMatrixWorld(),cameraController.Update(),indicator.Update()}function init3D(){if(Detector.webgl){resize(),citySound.load("sounds/city.mp3"),citySound.setRefDistance(audioRefDistance),citySound.setVolume(audioVolume),citySound.autoplay=!1,citySound.setLoop=5e3,composer=new THREE.EffectComposer(renderer);var e=new THREE.RenderPass(scene,camera);composer.addPass(e);var o=new THREE.ShaderPass(THREE.VignetteShader);o.uniforms.darkness.value=1.5,composer.addPass(o),hblurPass=new THREE.ShaderPass(THREE.HorizontalBlurShader),hblurPass.uniforms.h.value=0,composer.addPass(hblurPass),vblurPass=new THREE.ShaderPass(THREE.VerticalBlurShader),vblurPass.uniforms.v.value=0,composer.addPass(vblurPass);var t=new THREE.ShaderPass(THREE.CopyShader);t.renderToScreen=!0,composer.addPass(t);var a=new THREE.ImageUtils.loadTexture("img/cloud1.png"),r=new THREE.MeshBasicMaterial({map:a,depthWrite:!1,depthTest:!1});r.transparent=!0;var n=new THREE.PlaneBufferGeometry(64,64,1,1),i=new THREE.ImageUtils.loadTexture("img/cloud2.png"),s=new THREE.MeshBasicMaterial({map:i,depthWrite:!1,depthTest:!1});s.transparent=!0;var d=new THREE.ImageUtils.loadTexture("img/cloud3.png"),l=new THREE.MeshBasicMaterial({map:d,depthWrite:!1,depthTest:!1});l.transparent=!0;var c=new THREE.Mesh(n,l);c.position.set(16,16,30),scene.add(c);var m=new THREE.Mesh(n,s);m.position.set(2,0,38),m.rotation.z=3.5,scene.add(m);var p=new THREE.Mesh(n,l);p.position.set(30,2,45),scene.add(p);var u=new THREE.Mesh(n,s);u.position.set(30,30,50),scene.add(u);var h=new THREE.Mesh(n,r);h.position.set(-5,40,55),h.rotation.z=3.5,scene.add(h);var v=new THREE.Mesh(n,s);v.position.set(55,15,58),scene.add(v);var E=new THREE.Mesh(n,l);E.position.set(-25,15,61),scene.add(E);var w=new THREE.Mesh(n,r);w.position.set(15,50,68),w.rotation.z=3.5,scene.add(w);var y=new THREE.Mesh(n,r);y.position.set(16,-15,73),scene.add(y);var g=new THREE.PlaneBufferGeometry(1e4,1e4),T=new THREE.MeshLambertMaterial({color:8947848,side:THREE.DoubleSide});plane=new THREE.Mesh(g,T),scene.add(plane),plane.receiveShadow=!0,plane.position.z=groundZ,spotLight.position.set(0,40,80),spotLight.target.position.set(40,0,0),spotLight.intensity=.8,spotLight.castShadow=!0,spotLight.shadowDarkness=.3,spotLight.shadowMapWidth=1024,spotLight.shadowMapHeight=1024,spotLight.shadowCameraNear=10,spotLight.shadowCameraFar=4e4,spotLight.shadowCameraFov=55,scene.add(spotLight),mouseSpot.castShadow=!0,mouseSpot.shadowDarkness=0,mouseSpot.shadowMapWidth=1024,mouseSpot.shadowMapHeight=1024,mouseSpot.shadowCameraNear=1,mouseSpot.shadowCameraFar=180,mouseSpot.shadowCameraFov=55,mouseSpot.exponent=20,mouseSpot.intensity=1,mouseSpot.angle=isMobile?.5:.1,scene.add(mouseSpot),hemilight=new THREE.HemisphereLight(10011597,16776690,.5),scene.add(hemilight),cameraController=new objs.cameraController(renderer,scene,camera,spotLight),cameraController.constrain=!disableConstraints,cameraController.on("outofbounds",keywordHide),initInterval=setInterval(function(){glCards.length>0&&(clearInterval(initInterval),dataController.SetData(glCards),setTimeout(function(){SpawnAndGoToCity(homeKeyword)},1e3))},500),render()}}function SpawnAndGoToCity(e){function o(){cityController.SetCity(a);var e=new TWEEN.Tween({value:0}).to({value:.4},1e3).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function(){mouseSpot.shadowDarkness=this.value,mouseSpot.updateMatrixWorld(),mouseSpot.target.updateMatrixWorld()}).start()}e||(e=homeKeyword);var t=cityController.CityIsSpawned(e);if(t)var a=cityController.GetCityByTag(e);else if(e==homeKeyword)var r=layout,a=cityController.SpawnCity(e,r,1);else{var r=dataController.GetAllWithTag(e,!0);if(!r||!r.length)return void 0;var a=cityController.SpawnCity(e,r)}return r&&(r.length||Object.keys(r).length)||t?(e!=homeKeyword||dataController.loaded?cameraController.CenterOnCity(a,!1,o):dataController.on("loaded",function(){dataController.off("loaded","centeroncity"),cameraController.CenterOnCity(a,!1,o),citySound.isPlaying||citySound.play()},"centeroncity"),e==homeKeyword&&indicator.SetDestination(a.midpoint),a):void 0}var canvasDiv=$("#canvas"),canvas=canvasDiv.get(0),camera=new THREE.PerspectiveCamera(camFOVStart,canvasDiv.width()/canvasDiv.height(),1,300),scene=new THREE.Scene,mouse=new THREE.Vector2,intersected,raycaster=new THREE.Raycaster,renderer=new THREE.WebGLRenderer({antialias:!0}),maxAnisotropy=renderer.getMaxAnisotropy(),spotLight=new THREE.SpotLight(16777215);spotLight.offset=spotlightOffset;var mouseSpot=new THREE.SpotLight(16777215,1.3,20,1),hemilight=null,composer,hblurPass,vblurPass,windSound=document.getElementById("bgwind");windSound.volume=0,windSound.play();var listener=new THREE.AudioListener;camera.add(listener);var citySound=new THREE.Audio(listener,!0),initInterval,objects=[],objs=new _objects,dataController=new objs.dataController,cityController=new objs.cityController(dataController,camera),indicator=new objs.indicator(camera),cameraController=null,fuse,controlsinit=!1,plane,loopCount=0;spinfunction();var brentSpinner=setInterval(spinfunction,1600),secondResize=!1;renderer.shadowMapEnabled=!0,$(window).on("resize",resize),document.addEventListener("orientationchange",resize);var animateVolume=function(e,o){"undefined"!=typeof e&&(e>1&&100>=e&&(e/=100),"undefined"==typeof o&&(o=1e3),$("#bgwind").animate({volume:e},o))};animateVolume(25,2e3);