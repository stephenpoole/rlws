function resize(){camera.aspect=canvasDiv.width()/canvasDiv.height(),renderer.setSize(canvasDiv.width(),canvasDiv.height()),camera.updateProjectionMatrix()}function render(){requestAnimationFrame(render),cameraController.Render(),TWEEN.update();var e=(new Date).getTime()/1e3;if(frameTime=e-currentTime,currentTime=e,totalTime+=frameTime,!overlay){var r=xMove?-(xMove/200):.1;mLEFT&&!xMove&&(r*=-1);var a=yMove?yMove/200:.1;mDOWN&&!yMove&&(a*=-1),(mLEFT||mRIGHT)&&cameraController.PanX(r,void 0,void 0,!1),(mUP||mDOWN)&&cameraController.PanY(a,void 0,void 0,!1),mGOIN&&cameraController.Zoom(.1),mGOOUT&&cameraController.Zoom(-.1),mROTUP&&cameraController.Rotate(.03,void 0,void 0,!1),mROTDOWN&&cameraController.Rotate(-.03,void 0,void 0,!1),renderer.render(scene,camera)}}function init3D(){if(Detector.webgl){resize();var e=new THREE.PlaneBufferGeometry(1e4,1e4),r=new THREE.MeshBasicMaterial({color:16776690,side:THREE.DoubleSide}),a=new THREE.Mesh(e,r);scene.add(a),a.position.z=-.2,hemilight=new THREE.HemisphereLight(10011597,16776690,1.1),scene.add(hemilight),cameraController=new objs.cameraController(renderer,scene,camera),setupEventListeners(),initInterval=setInterval(function(){if(glCards.length>0){clearInterval(initInterval),$("#loading").fadeOut(),dataController.SetData(glCards);var e=SpawnAndGoToCity(homeKeyword,2);camera.position.z=e.extents.Z2*camZStart,cameraController.Zoom(e.extents.Z2*camZEnd,void 0,camZAnimationTime,!0,!1)}},500),render()}}function SpawnAndGoToCity(e,r){if(void 0===typeof r&&(r=1),cityController.CityIsSpawned(e))var a=cityController.GetCityByTag(e);else{if(e==homeKeyword)var n=dataController.rawData;else var n=dataController.GetAllWithTag(e);var a=cityController.SpawnCity(buildingsPerRow,buildingsPerColumn,e,n,r)}return cityController.SetCity(a),cameraController.CenterOnCity(a),a}var isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),fuse,canvasDiv=$("#canvas"),camera=new THREE.PerspectiveCamera(60,canvasDiv.width()/canvasDiv.height(),1,100),scene=new THREE.Scene,mouse=new THREE.Vector2,intersected,raycaster=new THREE.Raycaster;scene.fog=new THREE.FogExp2(16776690,.12);var renderer=new THREE.WebGLRenderer({antialias:!0}),hemilight=null,lightintensity=40,initInterval,objects=[],objs=new _objects,dataController=new objs.dataController,cityController=new objs.cityController(dataController),cameraController=null,cloudRenderer=new objs.clouds;renderer.shadowMapEnabled=!0,$(window).on("resize",resize);