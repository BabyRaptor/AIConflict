var g_spritePool = new Array();


function PutIntoPool(sprite) {
	g_spritePool.push (sprite);
}

function GetFromPool (path) {
	var tempSprite;
	for (var i=0; i<g_spritePool.length; i++) {
		if (g_spritePool[i].getTexture().url == path) {
			tempSprite = g_spritePool[i];
			tempSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA));
			tempSprite.setOpacity (255);
			tempSprite.setRotation (0);
			
			g_spritePool.splice (i, 1);
			break;
		}
	}
	
	if (tempSprite == null) {
		tempSprite = cc.Sprite.create(path);
		tempSprite.retain();
	}
	
	return tempSprite;
}