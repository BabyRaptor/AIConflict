var g_gsMissionBGLayer = cc.Layer.create();
g_gsMissionBGLayer.retain();

g_gsMissionBGLayer.Init = function () {
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
	g_gsMissionStarMapLayer.setScale (0.05 + this.m_starMapScale * 0.95);
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
	
	g_gsMissionStarMapLayer.setScale (this.m_starMapScale);
	g_gsMissionStarMapLayer.setPosition(cc.p(CANVAS_W * 0.5 * this.m_starMapScale, CANVAS_H * 0.5 * this.m_starMapScale));
}









var PLANET_SELECT_OFFSET = 80;
var TARGET_SIZE = 120;
var TARGET_ALPHA = 250;
var TARGET_ROTATE_SPEED = 20;

var STAR_X = 0;
var STAR_Y = 0;

var g_gsMissionStarMapLayer;

function CreateStarMapLayer() {
	g_gsMissionStarMapLayer = cc.Layer.create();
	g_gsMissionStarMapLayer.retain();



	g_gsMissionStarMapLayer.Init = function () {
		this.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
		
		this.m_targetAlpha = 0;
		
		
		this.m_starSprite = cc.Sprite.create("res/GSMission/Objects/Star.png");
		this.m_starSprite.setPosition(cc.p(STAR_X, STAR_Y));
		this.m_starSprite.setLocalZOrder (LAYER_BACKGROUND + 9);
		this.addChild(this.m_starSprite);
		
		this.m_starGlowSprite = cc.Sprite.create("res/GSMission/Objects/StarGlow.png");
		this.m_starGlowSprite.setPosition(cc.p(STAR_X, STAR_Y));
		this.m_starGlowSprite.setLocalZOrder (LAYER_BACKGROUND + 8);
		this.m_starGlowSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.addChild(this.m_starGlowSprite);
		
		
		this.m_planetSprite = [];
		for (var i=0; i<g_campaignData.length; i++) {
			var x = g_campaignData[i].m_mapX;
			var y = g_campaignData[i].m_mapY;
			
			this.m_planetSprite[i] = cc.Sprite.create("res/GSMission/Objects/Planet-" + (i + 1) + ".png");
			this.m_planetSprite[i].setPosition(cc.p(x, y));
			this.m_planetSprite[i].setLocalZOrder (LAYER_BACKGROUND + 9);
			this.addChild(this.m_planetSprite[i]);
		}
		
		this.m_targetAngle = Math.random() * 360;
		this.m_targetSprite = cc.Sprite.create("res/GSMission/Target/Current.png");
		this.m_targetSprite.setPosition(cc.p(x, y));
		this.m_targetSprite.setLocalZOrder (LAYER_BACKGROUND + 10);
		this.m_targetSprite.setOpacity(0);
		this.m_targetSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.m_targetSprite.setRotation(this.m_targetAngle);
		this.addChild(this.m_targetSprite);
		
		for (var i=0; i<g_campaignData.length; i++) {
			if (((g_profile.m_progress / 3) >> 0) == i) {
				this.m_targetSprite.setPosition(g_campaignData[i].m_mapX, g_campaignData[i].m_mapY);
				break;
			}
		}
	}

	g_gsMissionStarMapLayer.Reset = function () {
		this.m_targetSprite.setOpacity(0);
	}

	g_gsMissionStarMapLayer.update = function (deltaTime) {
		if (g_gsMissionBGLayer.m_starMapScale == 1) {
			this.m_targetAlpha += deltaTime * TARGET_ALPHA;
			if (this.m_targetAlpha > TARGET_ALPHA) {
				this.m_targetAlpha = TARGET_ALPHA;
			}
			this.m_targetSprite.setOpacity(this.m_targetAlpha);
			this.m_targetAngle += TARGET_ROTATE_SPEED * deltaTime;
			this.m_targetSprite.setRotation(this.m_targetAngle);
		}
	}

	g_gsMissionStarMapLayer.AddEventListener = function () {
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			swallowTouches: true,
			onTouchesBegan: function (touches, event) {
				g_gsMissionUILayer.m_topPanel.Hide();
				for (var i=0; i<g_campaignData.length; i++) {
					if (touches[0].getLocation().x - CANVAS_W * 0.5 <= g_campaignData[i].m_mapX + PLANET_SELECT_OFFSET 
					&&  touches[0].getLocation().x - CANVAS_W * 0.5 >= g_campaignData[i].m_mapX - PLANET_SELECT_OFFSET 
					&&  touches[0].getLocation().y - CANVAS_H * 0.5 <= g_campaignData[i].m_mapY + PLANET_SELECT_OFFSET 
					&&  touches[0].getLocation().y - CANVAS_H * 0.5 >= g_campaignData[i].m_mapY - PLANET_SELECT_OFFSET ) {
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
}















var g_gsMissionUILayer = cc.Layer.create();
g_gsMissionUILayer.retain();

g_gsMissionUILayer.Init = function () {
	this.m_topPanel = new MissionInfo (this, CANVAS_W * 0.5, 450);
	this.m_bottomPanel = new BigPanel(this, 1, CANVAS_W * 0.5, 15, 8, 2);
	
	
	this.m_upgradeButton = new BigButton (this, 1, "Research", CANVAS_W * 0.5 - 225, 40, PushUpgrade);
	this.m_shopButton = new BigButton (this, 1, "Shop", CANVAS_W * 0.5 - 75, 40);
	//this.m_infoButton = new BigButton (this, 1, "Info", CANVAS_W * 0.5 + 75, 40, PushInfo);
	this.m_backButton = new BigButton (this, 2, "Back", CANVAS_W * 0.5 + 225, 40, this.Back);
	
	this.m_buttonList = [];
	this.m_buttonList.push (this.m_upgradeButton);
	this.m_buttonList.push (this.m_shopButton);
	//this.m_buttonList.push (this.m_infoButton);
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
		
		CreateStarMapLayer();
		this.addChild(g_gsMissionStarMapLayer);
		g_gsMissionStarMapLayer.Init();
		
		this.addChild(g_gsMissionUILayer);
		g_gsMissionUILayer.Init();
	},
    onEnter:function () {
		this._super();
		g_gsMissionBGLayer.scheduleUpdate();
		
		g_gsMissionStarMapLayer.scheduleUpdate();
		g_gsMissionStarMapLayer.AddEventListener();
		
		g_gsMissionUILayer.AddEventListener();
		g_gsMissionUILayer.scheduleUpdate();
    },
	Reset:function() {
		g_gsMissionBGLayer.Reset();
		g_gsMissionStarMapLayer.Reset();
	}
});