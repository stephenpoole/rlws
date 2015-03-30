function resize(){camera.aspect=canvasDiv.width()/canvasDiv.height(),renderer.setSize(canvasDiv.width(),canvasDiv.height()),camera.updateProjectionMatrix()}function render(){requestAnimationFrame(render),TWEEN.update();var e=(new Date).getTime()/1e3;if(frameTime=e-currentTime,currentTime=e,totalTime+=frameTime,!overlay){var a=xMove?-(xMove/200):.1;mLEFT&&!xMove&&(a*=-1);var o=yMove?yMove/200:.1;mDOWN&&!yMove&&(o*=-1),(mLEFT||mRIGHT)&&cameraController.Move(a,void 0,void 0,!1),(mUP||mDOWN)&&cameraController.Move(void 0,o,void 0,!1),mGOIN&&cameraController.Zoom(.1),mGOOUT&&cameraController.Zoom(-.1),mROTUP&&cameraController.Rotate(.03,void 0,void 0,!1),mROTDOWN&&cameraController.Rotate(-.03,void 0,void 0,!1),composer.render(.1)}}function init3D(){if(Detector.webgl){resize(),composer=new THREE.EffectComposer(renderer);var e=new THREE.RenderPass(scene,camera);composer.addPass(e);var a=new THREE.ShaderPass(THREE.VignetteShader);a.uniforms.darkness.value=1.5,composer.addPass(a),hblurPass=new THREE.ShaderPass(THREE.HorizontalBlurShader),hblurPass.uniforms.h.value=0,composer.addPass(hblurPass),vblurPass=new THREE.ShaderPass(THREE.VerticalBlurShader),vblurPass.uniforms.v.value=0,composer.addPass(vblurPass);var o=new THREE.ShaderPass(THREE.CopyShader);o.renderToScreen=!0,composer.addPass(o);var t=new THREE.ImageUtils.loadTexture("img/cloud1.png"),r=new THREE.MeshBasicMaterial({map:t});r.transparent=!0;var n=new THREE.PlaneBufferGeometry(64,64,1,1),s=new THREE.ImageUtils.loadTexture("img/cloud2.png"),i=new THREE.MeshBasicMaterial({map:s});i.transparent=!0;var l=new THREE.ImageUtils.loadTexture("img/cloud3.png"),d=new THREE.MeshBasicMaterial({map:l});d.transparent=!0,cloud1=new THREE.Mesh(n,d),cloud1.position.set(16,16,30),scene.add(cloud1),cloud2=new THREE.Mesh(n,i),cloud2.position.set(2,0,38),cloud2.rotation.z=3.5,scene.add(cloud2),cloud3=new THREE.Mesh(n,d),cloud3.position.set(30,2,45),scene.add(cloud3),cloud4=new THREE.Mesh(n,i),cloud4.position.set(30,30,50),scene.add(cloud4),cloud5=new THREE.Mesh(n,r),cloud5.position.set(-5,40,55),cloud5.rotation.z=3.5,scene.add(cloud5),cloud6=new THREE.Mesh(n,i),cloud6.position.set(55,15,58),scene.add(cloud6),cloud7=new THREE.Mesh(n,d),cloud7.position.set(-25,15,61),scene.add(cloud7),cloud8=new THREE.Mesh(n,r),cloud8.position.set(15,50,68),cloud8.rotation.z=3.5,scene.add(cloud8),cloud9=new THREE.Mesh(n,r),cloud9.position.set(16,-15,73),scene.add(cloud9);var c=new THREE.PlaneBufferGeometry(1e4,1e4),E=new THREE.MeshBasicMaterial({color:0,side:THREE.DoubleSide});plane=new THREE.Mesh(c,E),scene.add(plane),plane.position.z=12,spotLight.position.set(0,40,80),spotLight.target.position.set(40,0,0),spotLight.intensity=.8,spotLight.castShadow=!0,spotLight.shadowDarkness=.3,spotLight.shadowMapWidth=1024,spotLight.shadowMapHeight=1024,spotLight.shadowCameraNear=10,spotLight.shadowCameraFar=4e4,spotLight.shadowCameraFov=30,scene.add(spotLight),hemilight=new THREE.HemisphereLight(10011597,16776690,.3),scene.add(hemilight),cameraController=new objs.cameraController(renderer,scene,camera),initInterval=setInterval(function(){glCards.length>0&&(clearInterval(initInterval),dataController.SetData(glCards),setTimeout(function(){$("#loading").fadeOut(),SpawnAndGoToCity(homeKeyword)},1e3))},500),render()}}function SpawnAndGoToCity(e){"undefined"==typeof abs&&(abs=!1);var a=cityController.CityIsSpawned(e);if(a)var o=cityController.GetCityByTag(e);else if(e==homeKeyword)var t=layout,o=cityController.SpawnCity(e,t,1);else{var t=dataController.GetAllWithTag(e);if(!t||!t.length)return void 0;var o=cityController.SpawnCity(e,t)}return t&&(t.length||Object.keys(t).length)||a?(cityController.SetCity(o),cameraController.CenterOnCity(o),o):void 0}var canvasDiv=$("#canvas"),canvas=canvasDiv.get(0),camera=new THREE.PerspectiveCamera(camFOVStart,canvasDiv.width()/canvasDiv.height(),1,300),scene=new THREE.Scene,mouse=new THREE.Vector2,intersected,raycaster=new THREE.Raycaster,renderer=new THREE.WebGLRenderer({antialias:!0}),spotLight=new THREE.SpotLight(16777215),hemilight=null,lightintensity=40,composer,hblurPass,vblurPass,initInterval,objects=[],objs=new _objects,dataController=new objs.dataController,cityController=new objs.cityController(dataController),cameraController=null,fuse,controlsinit=!1,plane;renderer.shadowMapEnabled=!0,$(window).on("resize",resize);var cloud2;