var g_gsShopMainLayer = cc.Layer.create();
g_gsShopMainLayer.retain();


g_gsShopMainLayer.Init = function () {
	this.m_bgSprite = cc.Sprite.create("res/Splash.jpg");
	this.m_bgSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_bgSprite.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_bgSprite.setLocalZOrder (LAYER_BACKGROUND);
	this.addChild(this.m_bgSprite);
	
	this.m_topPanel = new MediumPanel(this, 1, CANVAS_W * 0.5, CANVAS_H * 0.5 + 50, 18, 12);
	this.m_bottomPanel = new BigPanel(this, 1, CANVAS_W * 0.5, 15, 8, 2);
	
	//this.m_basicButton = new BigButton (this, 1, "Basic", CANVAS_W * 0.5 - 225, 40, this.OpenBasic);
	//this.m_turretButton = new BigButton (this, 1, "Turrets", CANVAS_W * 0.5 - 75, 40, this.OpenTurrets);
	//this.m_enemyButton = new BigButton (this, 1, "Enemies", CANVAS_W * 0.5 + 75, 40, this.OpenEnemmies);
	this.m_backButton = new BigButton (this, 2, "Back", CANVAS_W * 0.5 + 225, 40, PopState);
	
	this.m_buttonList = [];
	//this.m_buttonList.push (this.m_basicButton);
	//this.m_buttonList.push (this.m_turretButton);
	//this.m_buttonList.push (this.m_enemyButton);
	this.m_buttonList.push (this.m_backButton);
}


g_gsShopMainLayer.update = function(deltaTime) {
	
}






g_gsShopMainLayer.AddEventListener = function () {
	cc.eventManager.addListener({
		event: cc.EventListener.KEYBOARD,
		onKeyPressed:  function(keyCode, event) {
		},
		onKeyReleased: function(keyCode, event) {
			if (keyCode == cc.KEY.back) {
				GoToMenu();
			}
			return true;
		}
	}, this);
	
	for (var i=0; i<this.m_buttonList.length; i++) {
		this.m_buttonList[i].AddEventListener();
	}
}

var GSShop = cc.Scene.extend({
	ctor:function () {
		this._super();
		this.addChild(g_gsShopMainLayer);
		g_gsShopMainLayer.Init();
		this.added = true;
		this.eventListenerAdded = false;
	},
    onEnter:function () {
		this._super();
		g_gsShopMainLayer.scheduleUpdate();
		if (this.eventListenerAdded == false || !cc.sys.isNative) {
			g_gsShopMainLayer.AddEventListener();
			this.eventListenerAdded = true;
		}
    }
});

