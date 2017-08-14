var g_gsInfoMainLayer = cc.Layer.create();
g_gsInfoMainLayer.retain();


var GSINFO_SCREEN_BASIC = 1;
var GSINFO_SCREEN_TURRET = 2;
var GSINFO_SCREEN_ENEMY = 3;

g_gsInfoMainLayer.Init = function () {
	this.m_bgSprite = cc.Sprite.create("res/Splash.jpg");
	this.m_bgSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_bgSprite.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_bgSprite.setLocalZOrder (LAYER_BACKGROUND);
	this.addChild(this.m_bgSprite);
	
	this.m_topPanel = new MediumPanel(this, 1, CANVAS_W * 0.5, CANVAS_H * 0.5 + 50, 18, 12);
	this.m_bottomPanel = new BigPanel(this, 1, CANVAS_W * 0.5, 15, 8, 2);
	
	this.m_basicButton = new BigButton (this, 1, "Basic", CANVAS_W * 0.5 - 225, 40, this.OpenBasic);
	this.m_turretButton = new BigButton (this, 1, "Turrets", CANVAS_W * 0.5 - 75, 40, this.OpenTurrets);
	this.m_enemyButton = new BigButton (this, 1, "Enemies", CANVAS_W * 0.5 + 75, 40, this.OpenEnemmies);
	this.m_backButton = new BigButton (this, 2, "Back", CANVAS_W * 0.5 + 225, 40, PopState);
	
	this.m_buttonList = [];
	this.m_buttonList.push (this.m_basicButton);
	this.m_buttonList.push (this.m_turretButton);
	this.m_buttonList.push (this.m_enemyButton);
	this.m_buttonList.push (this.m_backButton);
	
	// Turret Info
	this.m_turretWiki = new TurretWiki(this);
	this.m_turretWiki.SetOpacity(0);
	
	
	this.OpenBasic();
	
	this.m_alpha = 0;
	this.m_switchScreen = false;
	this.m_targetScreen = 0;
	this.m_currentScreen = 0;
}



g_gsInfoMainLayer.OpenBasic = function() {
	if (g_gsInfoMainLayer.m_currentScreen != GSINFO_SCREEN_BASIC) {
		g_gsInfoMainLayer.m_targetScreen = GSINFO_SCREEN_BASIC;
		g_gsInfoMainLayer.m_switchScreen = true;
	}
}
g_gsInfoMainLayer.OpenTurrets = function() {
	if (g_gsInfoMainLayer.m_currentScreen != GSINFO_SCREEN_TURRET) {
		g_gsInfoMainLayer.m_targetScreen = GSINFO_SCREEN_TURRET;
		g_gsInfoMainLayer.m_switchScreen = true;
	}
}
g_gsInfoMainLayer.OpenEnemmies = function() {
	if (g_gsInfoMainLayer.m_currentScreen != GSINFO_SCREEN_ENEMY) {
		g_gsInfoMainLayer.m_targetScreen = GSINFO_SCREEN_ENEMY;
		g_gsInfoMainLayer.m_switchScreen = true;
	}
}


g_gsInfoMainLayer.update = function(deltaTime) {
	if (this.m_switchScreen == true) {
		this.m_alpha -= deltaTime * GLOBAL_TEXT_FADE_SPEED;
		if (this.m_alpha <= 0) {
			this.m_alpha = 0;
			this.m_switchScreen = false;
			this.m_currentScreen = this.m_targetScreen;
			this.m_turretWiki.SetOpacity (0);
		}
	}
	else {
		this.m_alpha += deltaTime * GLOBAL_TEXT_FADE_SPEED;
		if (this.m_alpha >= 255) {
			this.m_alpha = 255;
		}
	}
	if (this.m_currentScreen == GSINFO_SCREEN_BASIC) {
		
	}
	else if (this.m_currentScreen == GSINFO_SCREEN_TURRET) {
		this.m_turretWiki.SetOpacity (this.m_alpha);
		this.m_turretWiki.Update (deltaTime);
	}
	else if (this.m_currentScreen == GSINFO_SCREEN_ENEMY) {
		
	}
}






g_gsInfoMainLayer.AddEventListener = function () {
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
	
	g_gsInfoMainLayer.m_turretWiki.AddEventListener();
}

var GSInfo = cc.Scene.extend({
	ctor:function () {
		this._super();
		this.addChild(g_gsInfoMainLayer);
		g_gsInfoMainLayer.Init();
		this.added = true;
		this.eventListenerAdded = false;
	},
    onEnter:function () {
		this._super();
		g_gsInfoMainLayer.scheduleUpdate();
		if (this.eventListenerAdded == false || !cc.sys.isNative) {
			g_gsInfoMainLayer.AddEventListener();
			this.eventListenerAdded = true;
		}
    }
});

