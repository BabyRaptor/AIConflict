var g_gsMissionBGLayer = cc.Layer.create();
g_gsMissionBGLayer.retain();

g_gsMissionBGLayer.Init = function () {
	HEX_BLOCK_W = ((CANVAS_W / HEX_WIDTH) >> 0) + 2;
	HEX_BLOCK_H = ((CANVAS_H / HEX_HEIGHT) >> 0) + 2;
	HEX_BLOCK_W_OFFSET = HEX_BLOCK_W - DEFAULT_HEX_BLOCK_W;
	
	this.m_starMap1 = cc.Sprite.create("res/GSMission/StarMapLayer1.jpg");
	this.m_starMap1.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_starMap1.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_starMap1.setLocalZOrder (LAYER_BACKGROUND);
	this.addChild(this.m_starMap1);
	
	this.m_starMap2 = cc.Sprite.create("res/GSMission/StarMapLayer2.png");
	this.m_starMap2.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_starMap2.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_starMap2.setLocalZOrder (LAYER_BACKGROUND + 1);
	this.addChild(this.m_starMap2);
	
	this.m_starMap3 = cc.Sprite.create("res/GSMission/StarMapLayer3.png");
	this.m_starMap3.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_starMap3.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_starMap3.setLocalZOrder (LAYER_BACKGROUND + 2);
	this.addChild(this.m_starMap3);
	
	this.m_starMap4 = cc.Sprite.create("res/GSMission/StarMapLayer4.png");
	this.m_starMap4.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_starMap4.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_starMap4.setLocalZOrder (LAYER_BACKGROUND + 3);
	this.addChild(this.m_starMap4);
	
	this.m_starMapScale = 0;
}

g_gsMissionBGLayer.Reset = function () {
	this.m_starMapScale = 0;
	this.m_starMap1.setScale (0.8 + this.m_starMapScale * 0.2);
	this.m_starMap2.setScale (0.72 + this.m_starMapScale * 0.28);
	this.m_starMap3.setScale (0.64 + this.m_starMapScale * 0.36);
	this.m_starMap4.setScale (0.5 + this.m_starMapScale * 0.5);
	g_gsMissionHexLayer.setScale (0.05 + this.m_starMapScale * 0.95);
}

g_gsMissionBGLayer.update = function (deltaTime) {
	var speed = 1 - this.m_starMapScale;
	if (speed > 0.5) speed = 0.5;
	if (speed < 0.25) speed = 0.25;
	
	this.m_starMapScale += deltaTime * speed;
	if (this.m_starMapScale > 1) {
		this.m_starMapScale = 1;
	}
	
	this.m_starMap1.setScale (0.8 + this.m_starMapScale * 0.2);
	this.m_starMap2.setScale (0.72 + this.m_starMapScale * 0.28);
	this.m_starMap3.setScale (0.64 + this.m_starMapScale * 0.36);
	this.m_starMap4.setScale (0.5 + this.m_starMapScale * 0.5);
	
	var hexScale = 0.05 + this.m_starMapScale * 0.95;
	g_gsMissionHexLayer.setScale (hexScale);
	g_gsMissionHexLayer.setPosition(cc.p(CANVAS_W * 0.5 * hexScale, CANVAS_H * 0.5 * hexScale));
}
















var HEX_WIDTH = 64;
var HEX_HEIGHT = 56;
var HEX_SPRITE_W = 74;
var HEX_SPRITE_H = 82;
var HEX_REAL_HEIGHT = 76;
var HEX_BLOCK_W = ((CANVAS_W / HEX_WIDTH) >> 0) + 2;
var HEX_BLOCK_H = ((CANVAS_H / HEX_HEIGHT) >> 0) + 2;

var DEFAULT_HEX_BLOCK_W = ((CANVAS_W / HEX_WIDTH) >> 0) + 2;
var HEX_BLOCK_W_OFFSET = 0;

var HEX_ALPHA = 120;

var STAR_HEX_X = 9;
var STAR_HEX_Y = 7;

var g_gsMissionHexLayer;

function CreateHexLayer() {
	g_gsMissionHexLayer = cc.Layer.create();
	g_gsMissionHexLayer.retain();



	g_gsMissionHexLayer.Init = function () {
		this.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
		

		HEX_BLOCK_W = ((CANVAS_W / HEX_WIDTH) >> 0) + 2;
		HEX_BLOCK_H = ((CANVAS_H / HEX_HEIGHT) >> 0) + 2;
		HEX_BLOCK_W_OFFSET = ((HEX_BLOCK_W - DEFAULT_HEX_BLOCK_W) * 0.5) >> 0;
		
		this.m_hexAlpha = 0;
		this.m_hexSelecting = null;
		this.m_hexSelectingAlpha = 0;
		
		this.m_hexSprite = [];
		for (var i=0; i<HEX_BLOCK_W; i++) {
			this.m_hexSprite[i] = [];
			for (var j=0; j<HEX_BLOCK_H; j++) {
				this.m_hexSprite[i][j] = cc.Sprite.create("res/GSMission/Hex.png");
				this.m_hexSprite[i][j].setAnchorPoint(cc.p(0.5, 0.5));
				
				var x = 0;
				var y = j * HEX_HEIGHT - CANVAS_H * 0.5;
				if (j % 2 == 0) {
					x = i * HEX_WIDTH - CANVAS_W * 0.5;
				}
				else if (j % 2 == 1) {
					x = (i + 0.5) * HEX_WIDTH - CANVAS_W * 0.5;
				}
				this.m_hexSprite[i][j].setPosition(cc.p(x, y));
				this.m_hexSprite[i][j].setLocalZOrder (LAYER_BACKGROUND + 10);
				this.m_hexSprite[i][j].setOpacity (0);
				this.m_hexSprite[i][j].setTextureRect (cc.rect(0, 0, HEX_SPRITE_W, HEX_SPRITE_H));
				this.m_hexSprite[i][j].setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
				this.addChild(this.m_hexSprite[i][j]);
			}
		}
		
		
		var starX = 0;
		var starY = STAR_HEX_Y * HEX_HEIGHT - CANVAS_H * 0.5;
		if (STAR_HEX_Y % 2 == 0) {
			starX = (STAR_HEX_X + HEX_BLOCK_W_OFFSET) * HEX_WIDTH - CANVAS_W * 0.5;
		}
		else if (STAR_HEX_Y % 2 == 1) {
			starX = ((STAR_HEX_X + HEX_BLOCK_W_OFFSET) + 0.5) * HEX_WIDTH - CANVAS_W * 0.5;
		}
		
		this.m_starSprite = cc.Sprite.create("res/GSMission/Objects/Star.png");
		this.m_starSprite.setPosition(cc.p(starX, starY));
		this.m_starSprite.setLocalZOrder (LAYER_BACKGROUND + 9);
		this.addChild(this.m_starSprite);
		
		this.m_starGlowSprite = cc.Sprite.create("res/GSMission/Objects/StarGlow.png");
		this.m_starGlowSprite.setPosition(cc.p(starX, starY));
		this.m_starGlowSprite.setLocalZOrder (LAYER_BACKGROUND + 8);
		this.m_starGlowSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.addChild(this.m_starGlowSprite);
		
		
		this.m_planetSprite = [];
		for (var i=0; i<g_campaignData.length; i++) {
			var x = 0;
			var y = g_campaignData[i].m_mapY * HEX_HEIGHT - CANVAS_H * 0.5;
			if (g_campaignData[i].m_mapY % 2 == 0) {
				x = (g_campaignData[i].m_mapX + HEX_BLOCK_W_OFFSET) * HEX_WIDTH - CANVAS_W * 0.5;
			}
			else if (g_campaignData[i].m_mapY % 2 == 1) {
				x = ((g_campaignData[i].m_mapX + HEX_BLOCK_W_OFFSET) + 0.5) * HEX_WIDTH - CANVAS_W * 0.5;
			}
				
			this.m_planetSprite[i] = cc.Sprite.create("res/GSMission/Objects/Planet-" + (i + 1) + ".png");
			this.m_planetSprite[i].setPosition(cc.p(x, y));
			this.m_planetSprite[i].setLocalZOrder (LAYER_BACKGROUND + 9);
			this.addChild(this.m_planetSprite[i]);
		}
		
		
	}

	g_gsMissionHexLayer.Reset = function () {
		this.m_hexAlpha = 0;
		for (var i=0; i<HEX_BLOCK_W; i++) {
			for (var j=0; j<HEX_BLOCK_H; j++) {
				this.m_hexSprite[i][j].setOpacity (0);
				this.m_hexSprite[i][j].setTextureRect (cc.rect(0, 0, HEX_SPRITE_W, HEX_SPRITE_H));
			}
		}
	}

	g_gsMissionHexLayer.update = function (deltaTime) {
		if (g_gsMissionBGLayer.m_starMapScale == 1) {
			this.m_hexAlpha += deltaTime * HEX_ALPHA * 2;
			if (this.m_hexAlpha > HEX_ALPHA) {
				this.m_hexAlpha = HEX_ALPHA;
			}
			for (var i=0; i<HEX_BLOCK_W; i++) {
				for (var j=0; j<HEX_BLOCK_H; j++) {
					this.m_hexSprite[i][j].setOpacity (this.m_hexAlpha);
				}
			}
			
			if (this.m_hexSelecting != null) {
				this.m_hexSelectingAlpha += deltaTime * 2;
				if (this.m_hexSelectingAlpha > 6.28) { // 2 * pi
					this.m_hexSelectingAlpha = 0;
				}
				
				var actualAlpha = Math.sin (this.m_hexSelectingAlpha);
				if (actualAlpha < 0) actualAlpha *= -1;
				
				this.m_hexSelecting.setOpacity (actualAlpha * 200 + 55);
			}
		}
	}

	g_gsMissionHexLayer.AddEventListener = function () {
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			swallowTouches: true,
			onTouchesBegan: function (touches, event) {
				var coord = GetHexSquareFromTouch (touches[0].getLocation().x, touches[0].getLocation().y);
				
				if (g_gsMissionHexLayer.m_hexSelecting != null) {
					g_gsMissionHexLayer.m_hexSelecting.setTextureRect (cc.rect(0, 0, HEX_SPRITE_W, HEX_SPRITE_H));
				}
				
				g_gsMissionHexLayer.m_hexSelecting = g_gsMissionHexLayer.m_hexSprite[coord.x][coord.y];
				g_gsMissionHexLayer.m_hexSelecting.setTextureRect (cc.rect(HEX_SPRITE_W, 0, HEX_SPRITE_W, HEX_SPRITE_H));
				
				g_gsMissionUILayer.m_topPanel.Hide();
				for (var i=0; i<g_campaignData.length; i++) {
					if (coord.x - HEX_BLOCK_W_OFFSET == g_campaignData[i].m_mapX && coord.y == g_campaignData[i].m_mapY) {
						g_gsMissionUILayer.m_topPanel.Show (i);
						break;
					}
				}
				
				return true;
			},
			onTouchesMoved: function (touches, event) {
				
			},
			onTouchesEnded: function (touches, event) {
				
			}
		}, this);
	}
	
	g_gsMissionHexLayer.Deselect = function () {
		g_gsMissionHexLayer.m_hexSelecting.setTextureRect (cc.rect(0, 0, HEX_SPRITE_W, HEX_SPRITE_H));
		g_gsMissionHexLayer.m_hexSelecting = null;
	}
}















var g_gsMissionUILayer = cc.Layer.create();
g_gsMissionUILayer.retain();

g_gsMissionUILayer.Init = function () {
	this.m_topPanel = new MissionInfo (this, CANVAS_W * 0.5, 450);
	this.m_bottomPanel = new BigPanel(this, 1, CANVAS_W * 0.5, 15, 8, 2);
	
	
	this.m_upgradeButton = new BigButton (this, 1, "Research", CANVAS_W * 0.5 - 225, 40, PushUpgrade);
	this.m_shopButton = new BigButton (this, 1, "Shop", CANVAS_W * 0.5 - 75, 40);
	this.m_infoButton = new BigButton (this, 1, "Info", CANVAS_W * 0.5 + 75, 40, PushInfo);
	this.m_backButton = new BigButton (this, 2, "Back", CANVAS_W * 0.5 + 225, 40, this.Back);
	
	this.m_buttonList = [];
	this.m_buttonList.push (this.m_upgradeButton);
	this.m_buttonList.push (this.m_shopButton);
	this.m_buttonList.push (this.m_infoButton);
	this.m_buttonList.push (this.m_backButton);
}

g_gsMissionUILayer.AddEventListener = function () {
	this.m_topPanel.AddEventListener();
	this.m_bottomPanel.AddEventListener();
	for (var i=0; i<this.m_buttonList.length; i++) {
		this.m_buttonList[i].AddEventListener();
	}
	
	cc.eventManager.addListener({
		event: cc.EventListener.KEYBOARD,
		onKeyPressed:  function(keyCode, event) {
		},
		onKeyReleased: function(keyCode, event) {
			if (keyCode == cc.KEY.back) {
				g_gsMissionUILayer.Back();
			}
			return true;
		}
	}, this);
}

g_gsMissionUILayer.update = function (deltaTime) {
	this.m_topPanel.Update (deltaTime);
}

g_gsMissionUILayer.Back = function (deltaTime) {
	g_gsMissionUILayer.m_topPanel.Hide();
	PopState();
}








var GSMission = cc.Scene.extend({
	ctor:function () {
		this._super();
		this.addChild(g_gsMissionBGLayer);
		g_gsMissionBGLayer.Init();
		
		CreateHexLayer();
		this.addChild(g_gsMissionHexLayer);
		g_gsMissionHexLayer.Init();
		
		this.addChild(g_gsMissionUILayer);
		g_gsMissionUILayer.Init();
	},
    onEnter:function () {
		this._super();
		g_gsMissionBGLayer.scheduleUpdate();
		
		g_gsMissionHexLayer.scheduleUpdate();
		g_gsMissionHexLayer.AddEventListener();
		
		g_gsMissionUILayer.AddEventListener();
		g_gsMissionUILayer.scheduleUpdate();
    },
	Reset:function() {
		g_gsMissionBGLayer.Reset();
		g_gsMissionHexLayer.Reset();
	}
});














function GetHexSquareFromTouch(x, y) {
	x += HEX_WIDTH * 0.5;
	y += HEX_REAL_HEIGHT * 0.5;
	
    var row = (y / HEX_HEIGHT) >> 0;
    var column;

    var rowIsOdd = row % 2 == 1;

    if (rowIsOdd)
        column = ((x - (HEX_WIDTH * 0.5)) / HEX_WIDTH) >> 0;
    else
        column = (x / HEX_WIDTH) >> 0;
		
    var relY = y - (row * HEX_HEIGHT);
    var relX;

    if (rowIsOdd)
        relX = (x - (column * HEX_WIDTH)) - (HEX_WIDTH * 0.5);
    else
        relX = x - (column * HEX_WIDTH);
	
	var c = 13;
	var m = c / (HEX_WIDTH * 0.5);
	
    if (relY < (-m * relX) + c) {
		row--;
		if (!rowIsOdd)
			column--;
	}
    else if (relY < (m * relX) - c) {
		row--;
		if (rowIsOdd)
			column++;
	}
    return cc.p(column, row);
}

