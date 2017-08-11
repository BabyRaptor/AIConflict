var g_gsMenuMainLayer = cc.Layer.create();
g_gsMenuMainLayer.retain();

g_gsMenuMainLayer.Init = function () {
	this.m_bgSprite = cc.Sprite.create("res/GSMenu/TempBG.jpg");
	this.m_bgSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_bgSprite.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_bgSprite.setLocalZOrder (LAYER_BACKGROUND);
	this.addChild(this.m_bgSprite);
	
	this.m_topPanel = new BigPanel(this, 1, CANVAS_W * 0.5, CANVAS_H - 15, 8, 2);
	//this.m_midPanel = new SmallPanel(this, 1, CANVAS_W * 0.5, CANVAS_H * 0.5, 6, 8);
	this.m_bottomPanel = new BigPanel(this, 1, CANVAS_W * 0.5, 15, 8, 2);
	
	this.m_startButton = new BigButton (this, 1, "Play", CANVAS_W * 0.5 - 225, 40, PushMission);
	this.m_upgradeButton = new BigButton (this, 1, "Research", CANVAS_W * 0.5 - 75, 40, PushUpgrade);
	this.m_shopButton = new BigButton (this, 1, "Shop", CANVAS_W * 0.5 + 75, 40, PushShop);
	this.m_optionButton = new BigButton (this, 1, "Settings", CANVAS_W * 0.5 + 225, 40, PushOption);
	//this.m_infoButton = new BigButton (this, 1, "Info", CANVAS_W * 0.5 + 225, 40, PushInfo);
	
	this.m_buttonList = [];
	this.m_buttonList.push (this.m_startButton);
	this.m_buttonList.push (this.m_upgradeButton);
	this.m_buttonList.push (this.m_shopButton);
	this.m_buttonList.push (this.m_optionButton);
	//this.m_buttonList.push (this.m_infoButton);
	
	this.m_logoSprite = cc.Sprite.create("res/GSMenu/Logo.png");
	this.m_logoSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_logoSprite.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H - 42));
	this.m_logoSprite.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_logoSprite);
}

g_gsMenuMainLayer.AddEventListener = function () {
	cc.eventManager.addListener({
		event: cc.EventListener.KEYBOARD,
		onKeyPressed:  function(keyCode, event) {
		},
		onKeyReleased: function(keyCode, event) {
			if (keyCode == cc.KEY.back) {
				cc.director.end();
			}
			return true;
		}
	}, this);
	
	for (var i=0; i<this.m_buttonList.length; i++) {
		this.m_buttonList[i].AddEventListener();
	}
}



var GSMenu = cc.Scene.extend({
	ctor:function () {
		this._super();
		this.addChild(g_gsMenuMainLayer);
		g_gsMenuMainLayer.Init();
		this.eventListenerAdded = false;
	},
    onEnter:function () {
		this._super();
		if (this.eventListenerAdded == false || g_isAndroidBuild == false) {
			g_gsMenuMainLayer.AddEventListener();
			this.eventListenerAdded = true;
		}
    }
});

