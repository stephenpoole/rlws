function spinfunction(){loopCount++;var e=180*loopCount;$("#loadinglogo").velocity({rotateZ:e},{duration:1200})}function resize(){var e=canvasDiv.width(),o=canvasDiv.height();camera.sceneWidth=e,camera.sceneHeight=o,camera.aspect=e/o,renderer.setSize(e,o),camera.updateProjectionMatrix(),cameraController&&cameraController.Update()}function render(){function e(e){return 50*e/100*.3}if(renderMouseListener(),TWEEN.update(),cameraController.AfterRelease(),!overlay){var o=xMove?-(xMove/200):.1;mLEFT&&!xMove&&(o*=-1);var a=yMove?yMove/200:.1;mDOWN&&!yMove&&(a*=-1),(mLEFT||mRIGHT)&&cameraController.Move(o,void 0,void 0,!1),(mUP||mDOWN)&&cameraController.Move(void 0,a,void 0,!1),mGOIN&&cameraController.Zoom(.1),mGOOUT&&cameraController.Zoom(-.1),mROTUP&&cameraController.Rotate(.03,void 0,void 0,!1),mROTDOWN&&cameraController.Rotate(-.03,void 0,void 0,!1),composer.render(.1),requestAnimationFrame(render)}if(isMobile)var t=camera.position.x,r=camera.position.y;else var t=camera.position.x+camera.width*e(mouse.x),r=camera.position.y+camera.height*e(mouse.y);var n=cityController.city?cityController.city.extents.Z2:0,s=7,i=6;mouseSpot.position.set(t-i,r-s,n),mouseSpot.target.position.set(t+i,r+s,0),mouseSpot.updateMatrixWorld(),mouseSpot.target.updateMatrixWorld(),cameraController.Update(),indicator.Update()}function init3D(){if(Detector.webgl){resize(),composer=new THREE.EffectComposer(renderer);var e=new THREE.RenderPass(scene,camera);composer.addPass(e);var o=new THREE.ShaderPass(THREE.VignetteShader);o.uniforms.darkness.value=1.5,composer.addPass(o),hblurPass=new THREE.ShaderPass(THREE.HorizontalBlurShader),hblurPass.uniforms.h.value=0,composer.addPass(hblurPass),vblurPass=new THREE.ShaderPass(THREE.VerticalBlurShader),vblurPass.uniforms.v.value=0,composer.addPass(vblurPass);var a=new THREE.ShaderPass(THREE.CopyShader);a.renderToScreen=!0,composer.addPass(a);var t=new THREE.ImageUtils.loadTexture("img/cloud1.png"),r=new THREE.MeshBasicMaterial({map:t});r.transparent=!0;var n=new THREE.PlaneBufferGeometry(64,64,1,1),s=new THREE.ImageUtils.loadTexture("img/cloud2.png"),i=new THREE.MeshBasicMaterial({map:s});i.transparent=!0;var l=new THREE.ImageUtils.loadTexture("img/cloud3.png"),d=new THREE.MeshBasicMaterial({map:l});d.transparent=!0;var c=new THREE.Mesh(n,d);c.position.set(16,16,30),scene.add(c);var m=new THREE.Mesh(n,i);m.position.set(2,0,38),m.rotation.z=3.5,scene.add(m);var p=new THREE.Mesh(n,d);p.position.set(30,2,45),scene.add(p);var h=new THREE.Mesh(n,i);h.position.set(30,30,50),scene.add(h);var v=new THREE.Mesh(n,r);v.position.set(-5,40,55),v.rotation.z=3.5,scene.add(v);var E=new THREE.Mesh(n,i);E.position.set(55,15,58),scene.add(E);var u=new THREE.Mesh(n,d);u.position.set(-25,15,61),scene.add(u);var w=new THREE.Mesh(n,r);w.position.set(15,50,68),w.rotation.z=3.5,scene.add(w);var C=new THREE.Mesh(n,r);C.position.set(16,-15,73),scene.add(C);var g=new THREE.PlaneBufferGeometry(1e4,1e4),T=new THREE.MeshLambertMaterial({color:8947848,side:THREE.DoubleSide});plane=new THREE.Mesh(g,T),scene.add(plane),plane.receiveShadow=!0,plane.position.z=groundZ,spotLight.position.set(0,40,80),spotLight.target.position.set(40,0,0),spotLight.intensity=.8,spotLight.castShadow=!0,spotLight.shadowDarkness=.3,spotLight.shadowMapWidth=1024,spotLight.shadowMapHeight=1024,spotLight.shadowCameraNear=10,spotLight.shadowCameraFar=4e4,spotLight.shadowCameraFov=55,scene.add(spotLight),mouseSpot.castShadow=!0,mouseSpot.shadowDarkness=.4,mouseSpot.shadowMapWidth=1024,mouseSpot.shadowMapHeight=1024,mouseSpot.shadowCameraNear=1,mouseSpot.shadowCameraFar=120,mouseSpot.shadowCameraFov=55,mouseSpot.exponent=5,mouseSpot.intensity=1,mouseSpot.angle=isMobile?.5:.1,scene.add(mouseSpot),hemilight=new THREE.HemisphereLight(10011597,16776690,.5),scene.add(hemilight),cameraController=new objs.cameraController(renderer,scene,camera,spotLight),cameraController.constrain=!disableConstraints,cameraController.on("outofbounds",keywordHide),initInterval=setInterval(function(){glCards.length>0&&(clearInterval(initInterval),dataController.SetData(glCards),setTimeout(function(){SpawnAndGoToCity(homeKeyword)},1e3))},500),render()}}function SpawnAndGoToCity(e){function o(){cityController.SetCity(t)}e||(e=homeKeyword);var a=cityController.CityIsSpawned(e);if(a)var t=cityController.GetCityByTag(e);else if(e==homeKeyword)var r=layout,t=cityController.SpawnCity(e,r,1);else{var r=dataController.GetAllWithTag(e);if(!r||!r.length)return void 0;var t=cityController.SpawnCity(e,r)}return r&&(r.length||Object.keys(r).length)||a?(e!=homeKeyword||dataController.loaded?cameraController.CenterOnCity(t,!1,o):dataController.on("loaded",function(){dataController.off("loaded","centeroncity"),cameraController.CenterOnCity(t,!1,o)},"centeroncity"),indicator.SetDestination(t.midpoint),t):void 0}var canvasDiv=$("#canvas"),canvas=canvasDiv.get(0),camera=new THREE.PerspectiveCamera(camFOVStart,canvasDiv.width()/canvasDiv.height(),1,300),scene=new THREE.Scene,mouse=new THREE.Vector2,intersected,raycaster=new THREE.Raycaster,renderer=new THREE.WebGLRenderer({antialias:!0}),spotLight=new THREE.SpotLight(16777215);spotLight.offset=spotlightOffset;var mouseSpot=new THREE.SpotLight(16777215,.9,20,1),hemilight=null,lightintensity=40,composer,hblurPass,vblurPass,initInterval,objects=[],objs=new _objects,dataController=new objs.dataController,cityController=new objs.cityController(dataController,camera),indicator=new objs.indicator(camera),cameraController=null,fuse,controlsinit=!1,plane,loopCount=0;spinfunction();var brentSpinner=setInterval(spinfunction,1600);renderer.shadowMapEnabled=!0,$(window).on("resize",resize),document.addEventListener("orientationchange",resize);