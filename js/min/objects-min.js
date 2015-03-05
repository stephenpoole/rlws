var _objects=function(){var t=this;this.MultiplyArray=function(t,i){if(2>t)return i;for(var e=i.slice(),n=1;t>=n;n++)e=e.concat(i);return this.ShuffleArray(e)},this.ShuffleArray=function(t){for(var i=t.length,e,n;0!==i;)n=Math.floor(Math.random()*i),i-=1,e=t[i],t[i]=t[n],t[n]=e;return t},this.dataController=function(t){this.data=[],"undefined"!=typeof t&&this.SetData(t)},this.dataController.prototype.SetData=function(t){for(var i=0;i<t.length;i++)this.data[parseInt(t[i].id)]=t[i]},this.dataController.prototype.GetByID=function(t){return this.data[t]},this.cameraController=function(t){this.camera=t,this.constraints={X1:0,Y1:0,Z1:0,X2:0,Y2:0,Z2:0,R1:0,R2:0},this.origin={X:0,Y:0},this.animating=!1},this.cameraController.prototype.CenterOnCity=function(t,i){if("undefined"==typeof i&&(i=!1),-1==t)return console.log("Error (cameraController.CenterOnCity): Tried to Center on an invalid city"),0;var e={X1:t.extents.X1-camXExtents,Y1:t.extents.Y1-camYExtents,Z1:t.extents.Z1-camZ1Extents,X2:t.extents.X2+camXExtents,Y2:t.extents.Y2+camYExtents,Z2:t.extents.Z2+camZ2Extents,R1:camRotateMin,R2:camRotateMax};this.SetConstraints(e),i?this.Move(t.midpoint.X,t.midpoint.Y):this.Pan(t.midpoint.X,t.midpoint.Y,void 0,void 0,camPanToCityAnimationTime,!0,!1),this.SetOrigin(t.midpoint.X,t.midpoint.Y)},this.cameraController.prototype.SetConstraints=function(t){"undefined"!=typeof t.X1&&(this.constraints.X1=t.X1),"undefined"!=typeof t.Y1&&(this.constraints.Y1=t.Y1),"undefined"!=typeof t.Z1&&(this.constraints.Z1=t.Z1),"undefined"!=typeof t.R1&&(this.constraints.R1=t.R1),"undefined"!=typeof t.X2&&(this.constraints.X2=t.X2),"undefined"!=typeof t.Y2&&(this.constraints.Y2=t.Y2),"undefined"!=typeof t.Z2&&(this.constraints.Z2=t.Z2),"undefined"!=typeof t.R2&&(this.constraints.R2=t.R2)},this.cameraController.prototype.SetOrigin=function(t,i){"undefined"!=typeof t&&(this.origin.X=t),"undefined"!=typeof i&&(this.origin.Y=i)},this.cameraController.prototype.Pan=function(t,i,e,n,o,s,r){this.PanX(t,e,o,s,r),this.PanY(i,n,o,s,r),debug&&debugMovement&&console.log("Pan: X:"+t+",Y:"+i)},this.cameraController.prototype.PanX=function(t,i,e,n,o){var s=this;if("undefined"==typeof e&&(e=.01),"undefined"==typeof o&&(o=!0),"undefined"==typeof n&&(n=!1),"undefined"==typeof i&&(i=this.camera.position.x),n||(t=i+t),this.HitTestX(t)&&!this.animating||!o){o||(this.animating=!0);var r=new TWEEN.Tween({x:i}).to({x:t},1e3*e).onUpdate(function(){s.camera.position.x=this.x}).onComplete(function(){s.animating=!1}).start()}debug&&debugMovement&&console.log("PanX:"+t)},this.cameraController.prototype.PanY=function(t,i,e,n,o){var s=this;if("undefined"==typeof e&&(e=.01),"undefined"==typeof o&&(o=!0),"undefined"==typeof n&&(n=!1),"undefined"==typeof i&&(i=this.camera.position.y),n||(t=i+t),this.HitTestY(t)&&!this.animating||!o){o||(this.animating=!0);var r=new TWEEN.Tween({y:i}).to({y:t},1e3*e).onUpdate(function(){s.camera.position.y=this.y}).onComplete(function(){s.animating=!1}).start()}debug&&debugMovement&&console.log("PanY:"+t)},this.cameraController.prototype.Zoom=function(t,i,e,n,o){var s=this;if("undefined"==typeof o&&(o=!0),"undefined"==typeof e&&(e=.01),"undefined"==typeof n&&(n=!1),"undefined"==typeof i&&(i=this.camera.position.z),n||(t=i+t),debug&&debugMovement&&console.log("Zoom: "+t),this.HitTestZ(t)&&!this.animating||!o){o||(this.animating=!0);var r=new TWEEN.Tween({z:i}).to({z:t},1e3*e).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function(){s.camera.position.z=this.z}).onComplete(function(){s.animating=!1}).start()}},this.cameraController.prototype.Move=function(t,i,e,n,o){"undefined"==typeof o&&(o=!0),"undefined"==typeof n&&(n=!0),n||(t=this.camera.position.x+t,i=this.camera.position.y+i,e=this.camera.position.z+e),"undefined"!=typeof t&&(this.HitTestX(t)&&!this.animating||!o||n)&&(this.camera.position.x=t),"undefined"!=typeof i&&(this.HitTestY(i)&&!this.animating||!o||n)&&(this.camera.position.y=i),"undefined"!=typeof e&&(this.HitTestZ(e)&&!this.animating||!o||n)&&(this.camera.position.z=e),debug&&debugMovement&&console.log("Move: X:"+t+",Y:"+i+",Z:"+e)},this.cameraController.prototype.Rotate=function(t,i,e,n){"undefined"==typeof n&&(n=!0),n||(t=this.camera.rotation.x+t,i=this.camera.rotation.y+i,e=this.camera.rotation.z+e),"undefined"==typeof t&&isNaN(t)||(console.log("Hit Test "+this.HitTestR(t)+" move requested: "+t),this.HitTestR(t)&&!this.animating&&(this.camera.rotation.x=t)),"undefined"==typeof i&&isNaN(i)||this.HitTestR(i)&&!this.animating&&(this.camera.rotation.y=i),"undefined"==typeof e&&isNaN(e)||this.HitTestR(e)&&!this.animating&&(this.camera.rotation.z=e),debug&&debugMovement&&console.log("Rotate: X:"+t+",Y:"+i+",Z:"+e)},this.cameraController.prototype.HitTestX=function(t){return t>=this.constraints.X1&&t<=this.constraints.X2},this.cameraController.prototype.HitTestY=function(t){return t>=this.constraints.Y1&&t<=this.constraints.Y2},this.cameraController.prototype.HitTestZ=function(t){return t>=this.constraints.Z1&&t<=this.constraints.Z2},this.cameraController.prototype.HitTestR=function(t){return t>=this.constraints.R1&&t<=this.constraints.R2},this.cityController=function(){this.cities=[],this.city=void 0},this.cityController.prototype.GetCityByTag=function(t){if("default"==t)return-1;for(var i in this.cities)if("undefined"!=typeof this.cities[i].tag&&this.cities[i].tag==t)return this.cities[i];return 0},this.cityController.prototype.SpawnCity=function(i,e,n,o,s,r,a){"undefined"==typeof s&&(s=1),"undefined"==typeof r&&(r=0===this.cities.length?0:this.cities.length*this.cities[0].width*cityGutter),"undefined"==typeof a&&(a=0);var h=new t.city(i,e,o,s,r,a);return h.tag=n,this.cities.push(h),h.index=this.cities.length,1==this.cities.length&&(this.city=h),h},this.cityController.prototype.SetCityByIndex=function(t){this.city=t<=this.cities.length?cities[t]:cities.length},this.cityController.prototype.SetCityByTag=function(t){if("string"==typeof t)for(var i in this.cities)if("undefined"!=typeof this.cities[i].tag&&this.cities[i].tag==t)return this.city=this.cities[i],1;return 0},this.cityController.prototype.SetCity=function(t){return"undefined"!=typeof t&&t.index&&t.index<=this.cities.length?(this.city=this.cities[t.index],1):(console.log("Error (cityController.SetCity): Tried to set a city with an out of range index"),0)},this.city=function(t,i,e,n,o,s){this.logMatrix=function(t){if(debug)for(var i in t)for(var e in i)console.log(t[i][e])},this.index=void 0,this.tag="default",this.buildings=[],this.buildingData=e.slice(),this.extents={X1:void 0,Y1:void 0,X2:void 0,Y2:void 0,Z1:void 0,Z2:void 0},this.origin={X:o,Y:s},this.width=0,this.height=0,this.midpoint={X:0,Y:0},this.buildingsPerRow=t,this.buildingsPerColumn=i,this.init3D()},this.city.prototype.init3D=function(){var i=gridSizex-boxwidth,e=gridSizey-boxheight,n=jitterX,o=jitterY;this.drawMatrix=math.zeros(this.buildingsPerRow,this.buildingsPerColumn),this.dataMatrix=math.zeros(1,this.buildingData.length),camMinHeight=0;for(var s=this.buildingData.length,r=!1,a=0,h=1;h<=this.buildingsPerColumn;h++){for(var d=this.buildingsPerRow;d>=1;d--){var c={},u=new t.building(this.buildingData[a]);if("undefined"==typeof u){r=!0;break}for(var f=!1,p=!1,l=0;l<u.xsize;l++){for(var y=0;y<u.ysize&&(h+y-1<this.buildingsPerColumn&&this.buildingsPerRow-d+l<this.buildingsPerRow?this.drawMatrix.subset(math.index(h+y-1,this.buildingsPerRow-d+l))>0&&(console.log("found tile extending into occupied index"),p=!0,f=!0):f=!0,!f);y++);if(f)break}if(!p){for(var l=0;l<u.xsize;l++)for(var y=0;y<u.ysize;y++)h+y-1<this.buildingsPerColumn&&this.buildingsPerRow-d+l<this.buildingsPerRow&&this.drawMatrix.subset(math.index(h+y-1,this.buildingsPerRow-d+l),Math.max(u.xsize,u.ysize));this.buildingData.splice(a,1),n*=-1,o*=-1;var m=e*(u.ysize-1)+boxheight*u.ysize,g=i*(u.xsize-1)+boxwidth*u.xsize,x=3*Math.random()+1;x/2+1>camMinHeight&&(camMinHeight=Math.ceil(x/2+1)),c.geometry=new THREE.BoxGeometry(g,m,x);var b=parseInt(u.hex_color,16),v=new THREE.ImageUtils.loadTexture(u.img);v.wrapS=THREE.RepeatWrapping,v.wrapT=THREE.RepeatWrapping;var C,X;if(1==u.xsize?v.repeat.x=358/512:2==u.xsize&&(v.repeat.x=691/1024),1==u.ysize?v.repeat.y=435/512:2==u.ysize&&(v.repeat.y=947/1024),v.offset.y=1-v.repeat.y,c.material=[new THREE.MeshLambertMaterial({color:b}),new THREE.MeshLambertMaterial({color:b}),new THREE.MeshLambertMaterial({color:b}),new THREE.MeshLambertMaterial({color:b}),new THREE.MeshLambertMaterial({map:v}),new THREE.MeshLambertMaterial({color:b})],c.material[4].minFilter=THREE.NearestFilter,c.cube=new THREE.Mesh(c.geometry,new THREE.MeshFaceMaterial(c.material)),c.cube.name=u.id,scene.add(c.cube),c.cube.position.x=this.origin.X+(-d*gridSizex- -(u.xsize-1)*gridSizex/2+n),c.cube.position.y=this.origin.Y+(-h*gridSizey-(u.ysize-1)*gridSizey/2+o),(c.cube.position.x+1.4*g<this.extents.X1||"number"!=typeof this.extents.X1)&&(this.extents.X1=c.cube.position.x+1.4*g),(c.cube.position.x-1.4*g>this.extents.X2||"number"!=typeof this.extents.X2)&&(this.extents.X2=c.cube.position.x-1.4*g),(c.cube.position.y+m/4<this.extents.Y1||"number"!=typeof this.extents.Y1)&&(this.extents.Y1=c.cube.position.y+m/4),(c.cube.position.y-m/4>this.extents.Y2||"number"!=typeof this.extents.Y2)&&(this.extents.Y2=c.cube.position.y-m/4),(c.cube.position.z-x/2<this.extents.Z1||"number"!=typeof this.extents.Z1)&&(this.extents.Z1=c.cube.position.z+x/3),u.SetModel(c.cube),this.buildings[parseInt(u.id)]=u,objects.push(c.cube),r)break}}if(r)break}this.midpoint.X=(this.extents.X2+this.extents.X1)/2,this.midpoint.Y=(this.extents.Y2+this.extents.Y1)/2,this.width=Math.abs(this.extents.X1-this.extents.X2),this.height=Math.abs(this.extents.Y1-this.extents.Y2),this.extents.Z2=this.extents.Z1+camZ2Extents},this.building=function(t){"undefined"!=typeof t&&(this.xsize="undefined"==typeof t.xsize?void 0:t.xsize,this.ysize="undefined"==typeof t.ysize?void 0:t.ysize,this.id="undefined"==typeof t.id?void 0:t.id,this.title="undefined"==typeof t.title?void 0:t.title,this.description="undefined"==typeof t.description?void 0:t.description,this.tags="undefined"==typeof t.tags?void 0:t.tags,this.img="undefined"==typeof t.img?void 0:t.img,this.hex_color="undefined"==typeof t.hex_color?void 0:t.hex_color),this.model=void 0},this.building.prototype.SetModel=function(t){this.model=t}};