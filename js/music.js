/*
 * 本文件依赖于jweixin-1.0.0.js
 * 2016.7.21
 * Ray
 */
(function(){
	var body = document.getElementsByTagName("body")[0],
		styleT= document.createElement("style"),
		btn = document.createElement("div"),
		music = document.createElement("audio"),
		wrap = document.createElement("div"),
		globalURL = "images/";
	//样式
	styleT.setAttribute("type","text/css");
	//按钮
	btn.setAttribute("id","btn-music");
	//audio
	music.setAttribute("id","music");
	music.setAttribute("preload","preload");
	//wrap
	body.appendChild(styleT);
	body.appendChild(wrap);
	wrap.className = "music-wrap";
	wrap.appendChild(btn);
	wrap.appendChild(music);
	//click
	var isRotate = false;
	btn.addEventListener("click",function(){
		if(music.paused){
			music.play();
			btn.className = isRotate ? "music-open music-rotate" : "music-open";
		}else{
			music.pause();
			btn.className = "music-paused";
		}
	});
	window.initMusic = function(config){
		var def = {
			"width":"2rem",
			"height":"2rem",
			"right":"2rem",
			"top":"2rem",
			"left":"auto",
			"bottom":"auto",
			"rotate":false,
			"url":"images/",
			"name":"bgm.mp3",
			"loop":true,
			"auto":true
		};
		//复制配置
		if(config){
			for(var key in config){
				def[key] = config[key];
			}
		}
		globalURL = def.url;
		//默认自动播放
		if(def.loop){
			music.setAttribute("loop","loop");
		}
		//是否自动播放
		if(def.auto){
			btn.className = "music-open";
			music.play();
		}else{
			btn.className = "music-paused";
		}
		//是否旋转
		if(def.rotate){
			btn.className += " music-rotate"; 
			isRotate = true;
		}
		//重设
		styleT.innerHTML = ".music-wrap{position:absolute;width:1.6rem;height:1.6rem;z-index:999;right:2rem;top:2rem;}.music-wrap div{width:100%;height:100%;background-repeat:no-repeat;background-position:0 0;-webkit-background-size:100% 100%;background-size:100% 100%;}.music-rotate{animation:rotate 3s linear infinite;-webkit-animation: rotate 3s linear infinite;}.music-open{background-image:url(" + def.url +"btn_music.png);}.music-paused{animation-play-state:paused;-webkit-animation-play-state:paused;background-image:url(" + def.url + "btn_music_close.png) !important;}@keyframes rotate{from{transform: rotateZ(0deg);}to{transform: rotateZ(360deg);}}@-webkit-keyframes rotate{from{-webkit-transform: rotateZ(0deg);}to{-webkit-transform: rotateZ(360deg);}";
		var styleStr = 'width:' + def.width + ';height:' + def.height + ';right:' + def.right + ";top:" + def.top + ";left:" + def.left + ";bottom:" + def.bottom;
		wrap.setAttribute("style",styleStr);
		music.innerHTML = '<source src="' + (def.url + def.name) + '"></source>您的浏览器不支持Audio标签哦。';
	}
	window.Sound = function(config){
		if(arguments.length == 0){
			console.warn("请指定音效文件...");
			return false;
		}
		var base = globalURL,
			src = base;
		//直接使用完整路径
		if(typeof config == "string"){
			src = config;
		}else if(typeof config == "object" && !(config instanceof Array)){
			var def = {
				'name':'',
				'url':base,
				'auto':false,
				'loop':false
			}
			for(var k in config){
				def[k] = config[k];
			}
			src = def.url + def.name;
		}
		var tag = document.createElement("audio"),
			source = '<source src="' + src + '"></source>您的浏览器不支持Audio标签哦。';
		tag.innerHTML = source;
		tag.style.display = "none";
		body.appendChild(tag);
		tag.preload = "auto";
		if(def){
			if(def.loop){
				tag.loop = "loop";
			}
			def.auto && tag.play();
		}
		return tag;
	}
})(); 