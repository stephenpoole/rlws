function resize(){camera.aspect=canvasDiv.width()/canvasDiv.height(),renderer.setSize(canvasDiv.width(),canvasDiv.height()),camera.updateProjectionMatrix()}function render(){requestAnimationFrame(render),TWEEN.update();var e=(new Date).getTime()/1e3;if(frameTime=e-currentTime,currentTime=e,totalTime+=frameTime,!overlay){var r=xMove?-(xMove/200):.1;mLEFT&&!xMove&&(r*=-1);var t=yMove?yMove/200:.1;mDOWN&&!yMove&&(t*=-1),(mLEFT||mRIGHT)&&cameraController.PanX(r,void 0,void 0,!1),(mUP||mDOWN)&&cameraController.PanY(t,void 0,void 0,!1),mGOIN&&cameraController.Zoom(.1),mGOOUT&&cameraController.Zoom(-.1),mROTUP&&cameraController.Rotate(.03,void 0,void 0,!1),mROTDOWN&&cameraController.Rotate(-.03,void 0,void 0,!1),renderer.render(scene,camera)}}function init3D(){Detector.webgl&&(resize(),hemilight=new THREE.HemisphereLight(10011597,16776690,1.1),scene.add(hemilight),cameraController=new objs.cameraController(renderer,scene,camera),initInterval=setInterval(function(){if(glCards.length>0){clearInterval(initInterval),$("#loading").fadeOut(),dataController.SetData(glCards);var e=SpawnAndGoToCity(homeKeyword);camera.position.z=e.extents.Z2*camZStart,cameraController.Zoom(e.extents.Z2*camZEnd,void 0,camZAnimationTime,!0,!1)}},500),render())}function SpawnAndGoToCity(e,r){void 0===typeof r&&(r=1);var t=cityController.CityIsSpawned(e);if(t)var a=cityController.GetCityByTag(e);else if(e==homeKeyword)var n=layout,a=cityController.SpawnCity(void 0,void 0,e,n,r,0,0,1);else var n=dataController.GetAllWithTag(e),a=cityController.SpawnCity(buildingsPerRow,buildingsPerColumn,e,n,r);return n&&(n.length||Object.keys(n).length)||t?(cityController.SetCity(a),cameraController.CenterOnCity(a),a):void 0}var canvasDiv=$("#canvas"),camera=new THREE.PerspectiveCamera(60,canvasDiv.width()/canvasDiv.height(),1,300),scene=new THREE.Scene,mouse=new THREE.Vector2,intersected,raycaster=new THREE.Raycaster;scene.fog=new THREE.FogExp2(0,.12);var renderer=new THREE.WebGLRenderer({antialias:!0}),hemilight=null,lightintensity=40,initInterval,objects=[],objs=new _objects,dataController=new objs.dataController,cityController=new objs.cityController(dataController),cameraController=null,fuse,controlsinit=!1;renderer.shadowMapEnabled=!0,$(window).on("resize",resize);