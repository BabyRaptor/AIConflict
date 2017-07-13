var BUILD_PANEL_SPEED = 450;
var INFO_PANEL_SPEED = 1000;

var g_battle;
var g_touchCount = 0;
var g_oldDistance = 0;
var g_touchStart = null;
var g_touchCurrent = null;




var g_gsActionBackgroundLayer = cc.Layer.create();
	g_gsActionBackgroundLayer.retain();

var g_gsActionBattleLayer = cc.Layer.create();
	g_gsActionBattleLayer.retain();

var g_gsActionUILayer = cc.Layer.create();
	g_gsActionUILayer.retain();

g_gsActionUILayer.Init = function () {
	this.m_buildPanel = new TurretBuyingList(this, -200, CANVAS_H * 0.5, g_gsActionUILayer.BuildTurret);
	this.m_infoPanel = new TurretInfo(this, CANVAS_W + 200, CANVAS_H * 0.5);
	
	this.m_topRightPanel = new MediumPanel(this, 1, CANVAS_W - 150, CANVAS_H, 8, 3);
	this.m_topLeftPanel = new MediumPanel(this, 1, 150, CANVAS_H, 8, 3);
	this.m_bottomRightPanel = new MediumPanel(this, 1, CANVAS_W - 150, 0, 8, 3);
	this.m_bottomLeftPanel = new MediumPanel(this, 1, 150, 0, 8, 3);
	this.m_menuButton = new BigButton (this, 2, "Menu", CANVAS_W - 78, 28, this.OpenMenu);
	this.m_inventoryButton = new BigButton (this, 1, "Inventory", CANVAS_W - 228, 28);
	this.m_speedButton = new BigButton (this, 1, "Speed: 1x", 228, 28, this.ChangeSpeed);
	this.m_startButton = new BigButton (this, 1, "Start", 78, 28, this.StartWaveOrPause);
	
	this.m_waveBar = cc.Sprite.create("res/GSAction/UI/WaveBar.png");
	this.m_waveBar.setAnchorPoint(cc.p(0, 0.5));
	this.m_waveBar.setPosition(cc.p(5, CANVAS_H - 28));
	this.m_waveBar.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_waveBar);
	
	this.m_waveLabel = new cc.LabelTTF("Wave: ", GetFont("Nasalization"), 18);
	this.m_waveLabel.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_waveLabel.setPosition (cc.p(90, CANVAS_H - 28));
	this.m_waveLabel.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_waveLabel);
	
	this.m_moneyBar = cc.Sprite.create("res/GSAction/UI/MoneyBar.png");
	this.m_moneyBar.setAnchorPoint(cc.p(0, 0.5));
	this.m_moneyBar.setPosition(cc.p(160, CANVAS_H - 28));
	this.m_moneyBar.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_moneyBar);
		
	this.m_moneyLabel = new cc.LabelTTF("Money: ", GetFont("Nasalization"), 18);
	this.m_moneyLabel.setAnchorPoint(cc.p(1, 0.5));
	this.m_moneyLabel.setPosition (cc.p(290, CANVAS_H - 28));
	this.m_moneyLabel.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_moneyLabel);
	
	this.m_buildConfirm = 0;
	
	this.m_baseHPBar = cc.Sprite.create("res/GSAction/UI/HPBar.png");
	this.m_baseHPBar.setAnchorPoint(cc.p(0, 0.5));
	this.m_baseHPBar.setPosition(cc.p(CANVAS_W - 145, CANVAS_H - 28));
	this.m_baseHPBar.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_baseHPBar);
	
	this.m_baseHPBarContent = cc.Sprite.create("res/GSAction/UI/Bar.png");
	this.m_baseHPBarContent.setAnchorPoint(cc.p(0, 0.5));
	this.m_baseHPBarContent.setPosition(cc.p(CANVAS_W - 106, CANVAS_H - 28));
	this.m_baseHPBarContent.setLocalZOrder (LAYER_UI);
	this.m_baseHPBarContent.setTextureRect (cc.rect(0, 0, 0, 21));
	this.m_baseHPBarContent.setContentSize (cc.size(0, 21));
	this.addChild(this.m_baseHPBarContent);
	
	
	
	this.m_baseShieldBar = cc.Sprite.create("res/GSAction/UI/ShieldBar.png");
	this.m_baseShieldBar.setAnchorPoint(cc.p(0, 0.5));
	this.m_baseShieldBar.setPosition(cc.p(CANVAS_W - 300, CANVAS_H - 28));
	this.m_baseShieldBar.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_baseShieldBar);
	
	this.m_baseShieldBarContent = cc.Sprite.create("res/GSAction/UI/Bar.png");
	this.m_baseShieldBarContent.setAnchorPoint(cc.p(0, 0.5));
	this.m_baseShieldBarContent.setPosition(cc.p(CANVAS_W - 261, CANVAS_H - 28));
	this.m_baseShieldBarContent.setLocalZOrder (LAYER_UI);
	this.m_baseShieldBarContent.setTextureRect (cc.rect(0, 0, 0, 21));
	this.m_baseShieldBarContent.setContentSize (cc.size(0, 21));
	this.addChild(this.m_baseShieldBarContent);
	
	
	
	this.m_inGameMenu = new InGameMenu(this, CANVAS_W * 0.5, CANVAS_H * 0.5);
	this.m_resultPopup = new ResultPopup(this, CANVAS_W * 0.5, CANVAS_H * 0.5);
}

g_gsActionUILayer.AddEventListener = function () {
	var instance = this;
	cc.eventManager.addListener({
		event: cc.EventListener.TOUCH_ALL_AT_ONCE,
		swallowTouches: true,
		onTouchesBegan: function (touches, event) {
			g_touchCount ++;
			if (g_touchCount == 1) {
				g_touchStart = touches[0].getLocation();
				g_touchCurrent = touches[0].getLocation();
			}
			else if (g_touchCount == 2) {
				if (touches[1] == null) {
					g_touchCount = 1;
				}
				g_oldDistance = 0;
			}
			return true;
		},
		onTouchesMoved: function (touches, event) {
			if (g_touchCount == 1) {
				g_battle.MoveCamera (g_touchCurrent.x - touches[0].getLocation().x, g_touchCurrent.y - touches[0].getLocation().y);
				g_touchCurrent = touches[0].getLocation();
			}
			else {
				if (g_oldDistance == 0) {
					g_oldDistance = DistanceBetweenTwoPoint (touches[0].getLocation().x, touches[0].getLocation().y, touches[1].getLocation().x, touches[1].getLocation().y);
				}
				else {
					var newDistance = DistanceBetweenTwoPoint (touches[0].getLocation().x, touches[0].getLocation().y, touches[1].getLocation().x, touches[1].getLocation().y);
					var zoom = newDistance / g_oldDistance;
					g_battle.ApplyZoom (zoom);
					g_oldDistance = newDistance;
				}
			}
		},
		onTouchesEnded: function (touches, event) {
			if (g_touchCount == 1) {
				if (Math.abs(g_touchCurrent.x - g_touchStart.x) < 5 && Math.abs(g_touchCurrent.y - g_touchStart.y) < 5) {
					var touchResult = g_battle.TouchOnMap (g_touchCurrent.x, g_touchCurrent.y);
					if (touchResult == BLOCK_FREE) {
						instance.m_buildPanel.m_showing = true;
					}
					else {
						instance.m_buildPanel.m_showing = false;
						instance.m_buildConfirm = 0;
						instance.m_buildPanel.Reset();
					}
					
					if (touchResult != BLOCK_PATH && touchResult != BLOCK_OCCUPIED && touchResult != BLOCK_FREE ) {
						instance.m_infoPanel.m_showing = true;
						instance.m_infoPanel.SetTurret (touchResult);
					}
					else {
						instance.m_infoPanel.m_showing = false;
					}
					
					instance.m_infoPanel.ResetSell();
				}
			}
			else {
				g_battle.CorrectZoom();
			}
			g_touchCount = 0;
		}
	}, this);
	
	this.m_buildPanel.AddEventListener();
	this.m_infoPanel.AddEventListener();
	
	this.m_topRightPanel.AddEventListener();
	this.m_bottomRightPanel.AddEventListener();
	this.m_topLeftPanel.AddEventListener();
	this.m_bottomLeftPanel.AddEventListener();
	
	this.m_menuButton.AddEventListener();
	this.m_inventoryButton.AddEventListener();
	this.m_speedButton.AddEventListener();
	this.m_startButton.AddEventListener();
	
	this.m_inGameMenu.AddEventListener();
	this.m_resultPopup.AddEventListener();
	
	cc.eventManager.addListener({
		event: cc.EventListener.KEYBOARD,
		onKeyPressed:  function(keyCode, event) {
		},
		onKeyReleased: function(keyCode, event) {
			if (keyCode == 187) {
				g_battle.ApplyZoom (1.1);
			}
			else if (keyCode == 189) {
				g_battle.ApplyZoom (0.9);
			}
			return true;
		}
	}, this);
}

g_gsActionUILayer.BuildTurret = function(param) {
	var instance = g_gsActionUILayer;
	
	if (instance.m_buildConfirm != param) {
		instance.m_buildConfirm = param;
		instance.m_buildPanel.SwitchToConfirmMode(param);
		
		g_battle.PlaceTestTurretAtSelectorLocation (param);
	}
	else if (instance.m_buildConfirm == param) {
		instance.m_buildConfirm = 0;
		instance.m_buildPanel.m_showing = false;
		instance.m_buildPanel.Reset();
		
		g_battle.BuildTurretAtSelectorLocation (param);
	}
}

g_gsActionUILayer.StartWaveOrPause = function () {
	if (g_battle.m_peaceTime == true) {
		g_battle.StartWave();
		g_gsActionUILayer.m_startButton.SetCaption("Pause");
		g_gsActionUILayer.m_waveLabel.setString (g_battle.m_wave + " / " + (g_battle.m_mission.m_waveData.length-1));
	}
	else {
		g_battle.PauseGame();
		if (g_battle.m_pause == true) {
			g_gsActionUILayer.m_startButton.SetCaption("Resume");
		}
		else {
			g_gsActionUILayer.m_startButton.SetCaption("Pause");
		}
		
	}
	
}

g_gsActionUILayer.OpenMenu = function () {
	g_gsActionUILayer.m_inGameMenu.Open ();
}

g_gsActionUILayer.EndGame = function (win) {
	g_gsActionUILayer.m_resultPopup.Open (win);
}

g_gsActionUILayer.ChangeSpeed = function () {
	if (g_battle.m_gameSpeed == 1) {
		g_battle.m_gameSpeed = 2;
	}
	else if (g_battle.m_gameSpeed == 2) {
		g_battle.m_gameSpeed = 3;
	}
	else if (g_battle.m_gameSpeed == 3) {
		g_battle.m_gameSpeed = 1;
	}
	g_gsActionUILayer.m_speedButton.SetCaption ("Speed: " + g_battle.m_gameSpeed + "x");
}

g_gsActionUILayer.Reset = function() {
	g_gsActionUILayer.m_waveLabel.setString (g_battle.m_wave + " / " + (g_battle.m_mission.m_waveData.length-1));
	g_gsActionUILayer.m_speedButton.SetCaption ("Speed: " + g_battle.m_gameSpeed + "x");
	g_gsActionUILayer.m_startButton.SetCaption("Start");
}


g_gsActionUILayer.update = function (deltaTime) {
	g_battle.Update(deltaTime);
	this.m_buildPanel.Update(deltaTime);
	this.m_infoPanel.Update(deltaTime);
	
	var shieldAmount = g_battle.m_base.m_shield * 93 / g_battle.m_base.m_maxShield;
	this.m_baseShieldBarContent.setTextureRect (cc.rect(0, 0, shieldAmount >> 0, 21));
	this.m_baseShieldBarContent.setContentSize (cc.size(shieldAmount >> 0, 21));
	
	var hpAmount = g_battle.m_base.m_HP * 93 / g_battle.m_base.m_maxHP;
	this.m_baseHPBarContent.setTextureRect (cc.rect(0, 0, hpAmount >> 0, 21));
	this.m_baseHPBarContent.setContentSize (cc.size(hpAmount >> 0, 21));
	
	g_gsActionUILayer.m_moneyLabel.setString (g_battle.m_money >> 0);
}



var GSAction = cc.Scene.extend({
	ctor:function () {
		this._super();
		g_gsActionUILayer.Init();
		this.addChild(g_gsActionBackgroundLayer);
		this.addChild(g_gsActionBattleLayer);
		this.addChild(g_gsActionUILayer);
	},
    onEnter:function () {
		this._super();
		g_gsActionUILayer.Reset();
		g_gsActionUILayer.scheduleUpdate();
		g_gsActionUILayer.AddEventListener();
    },
	NewBattle:function (campaignID, missionID) {
		g_battle = new Battle (g_gsActionBackgroundLayer, g_gsActionBattleLayer, campaignID, missionID);
	},
	RestartBattle:function () {
		var campaignID = g_battle.m_campaignID;
		var missionID = g_battle.m_missionID;
		
		this.Destroy();
		
		g_battle = new Battle (g_gsActionBackgroundLayer, g_gsActionBattleLayer, campaignID, missionID);
		g_gsActionUILayer.Reset();
	},
	Destroy:function () {
		g_battle.Destroy();
		g_gsActionBackgroundLayer.removeAllChildren();
		g_gsActionBattleLayer.removeAllChildren();
	}
});









function DistanceBetweenTwoPoint (x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

var RAD_TO_DEG = 57.29577951308231;
var DEG_TO_RAD = 0.0174532925199433;
function AngleBetweenTwoPoint (x1, y1, x2, y2) {
	var angle = 0;
	if (y2 == y1) {
		if (x2 > x1)
			angle = 90;
		else if (x2 < x1)
			angle = 270;
	}
	else {
		angle = Math.atan((x2 - x1) / (y2 - y1)) * RAD_TO_DEG;
		if (y2 < y1) {
			angle += 180;
		}
		if (angle < 0) angle += 360;
	}

	return angle;
}