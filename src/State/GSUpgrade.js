var g_gsUpgradeMainLayer = cc.Layer.create();
g_gsUpgradeMainLayer.retain();



g_gsUpgradeMainLayer.Init = function () {
	this.m_bgSprite = cc.Sprite.create("res/Splash.jpg");
	this.m_bgSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_bgSprite.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
	this.m_bgSprite.setLocalZOrder (LAYER_BACKGROUND);
	this.addChild(this.m_bgSprite);
	
	this.m_topPanel = new MediumPanel(this, 1, CANVAS_W * 0.5, CANVAS_H * 0.5 + 100, 18, 14);
	this.m_bottomPanel = new BigPanel(this, 1, CANVAS_W * 0.5, 15, 8, 2);
	
	this.m_shopButton = new BigButton (this, 1, "Shop", CANVAS_W * 0.5 - 225, 40, this.OpenShop);
	this.m_backButton = new BigButton (this, 2, "Back", CANVAS_W * 0.5 + 225, 40, PopState);
	
	this.m_buttonList = [];
	this.m_buttonList.push (this.m_shopButton);
	this.m_buttonList.push (this.m_backButton);
	
	
	this.m_upgradePanel = new SmallPanel(this, 1, CANVAS_W * 0.5, CANVAS_H * 0.5 + 220, 17, 10);
	
	this.m_basicLabel = new cc.LabelTTF(" Basic research ", GetFont("Nasalization"), 32, cc.size(500, 50));
	this.m_basicLabel.setAnchorPoint(cc.p(0, 1));
	this.m_basicLabel.setPosition (cc.p(CANVAS_W * 0.5 - 400, CANVAS_H * 0.5 + 350));
	this.m_basicLabel.setLocalZOrder (LAYER_UI);
	this.m_basicLabel.enableStroke (new cc.Color(16, 173, 255, 0.5), 1);
	this.m_basicLabel.enableShadow (new cc.Color(100, 220, 255, 255), cc.size(0, 0), 15);
	this.addChild(this.m_basicLabel);
	
	this.m_advanceLabel = new cc.LabelTTF(" Advanced research ", GetFont("Nasalization"), 32, cc.size(500, 50));
	this.m_advanceLabel.setAnchorPoint(cc.p(0, 1));
	this.m_advanceLabel.setPosition (cc.p(CANVAS_W * 0.5 - 400, CANVAS_H * 0.5 + 205));
	this.m_advanceLabel.setLocalZOrder (LAYER_UI);
	this.m_advanceLabel.enableStroke (new cc.Color(16, 173, 255, 0.5), 1);
	this.m_advanceLabel.enableShadow (new cc.Color(100, 220, 255, 255), cc.size(0, 0), 15);
	this.addChild(this.m_advanceLabel);
	
	
	
	this.m_upgradeButtonList = [];
	var basicIndex = 0;
	var advancedIndex = 0;
	for (var i=0; i<g_upgrade.length; i++) {
		if (g_upgrade[i].m_isAdvance == false) {
			this.m_upgradeButtonList.push (new UpgradeButton(this, g_upgrade[i].m_iconPathE, g_upgrade[i].m_iconPathD, g_upgrade[i].m_iconPathU, 0, 0, this.SelectUpgrade, i));
			this.m_upgradeButtonList[i].SetPosition(CANVAS_W * 0.5 - 360 + (basicIndex % 10) * 80, CANVAS_H * 0.5 + 265 - ((basicIndex / 10) >> 0) * 80);
			basicIndex ++;
		}
		else {
			this.m_upgradeButtonList.push (new UpgradeButton(this, g_upgrade[i].m_iconPathE, g_upgrade[i].m_iconPathD, g_upgrade[i].m_iconPathU, 0, 0, this.SelectUpgrade, i));
			this.m_upgradeButtonList[i].SetPosition(CANVAS_W * 0.5 - 360 + (advancedIndex % 10) * 80, CANVAS_H * 0.5 + 115 - ((advancedIndex / 10) >> 0) * 80);
			advancedIndex ++;
		}
	}
	
	this.m_upgradeInfoPanel = new SmallPanel(this, 1, CANVAS_W * 0.5 - 125, CANVAS_H * 0.5 - 127, 12, 4);
	
	this.m_upgradeTitleLabel = new cc.LabelTTF("Monitization", GetFont("Nasalization"), 28, cc.size(500, 50));
	this.m_upgradeTitleLabel.setAnchorPoint(cc.p(0, 1));
	this.m_upgradeTitleLabel.setPosition (cc.p(CANVAS_W * 0.5 - 400, CANVAS_H * 0.5 - 55));
	this.m_upgradeTitleLabel.setLocalZOrder (LAYER_UI);
	this.m_upgradeTitleLabel.enableStroke (new cc.Color(16, 173, 255, 0.5), 1);
	this.m_upgradeTitleLabel.enableShadow (new cc.Color(100, 220, 255, 255), cc.size(0, 0), 10);
	this.m_upgradeTitleLabel.setOpacity(0);
	this.addChild(this.m_upgradeTitleLabel);
	
	this.m_upgradeDescriptionLabel = new cc.LabelTTF("Nothing", GetFont("Nasalization"), 16, cc.size(550, 0));
	this.m_upgradeDescriptionLabel.setAnchorPoint(cc.p(0, 1));
	this.m_upgradeDescriptionLabel.setPosition (cc.p(CANVAS_W * 0.5 - 393, CANVAS_H * 0.5 - 100));
	this.m_upgradeDescriptionLabel.setLocalZOrder (LAYER_UI);
	this.m_upgradeDescriptionLabel.setColor(new cc.Color(192, 192, 192, 0.5));
	this.m_upgradeDescriptionLabel.setOpacity(0);
	this.addChild(this.m_upgradeDescriptionLabel);
	
	
	this.m_upgradeButtonPanel = new SmallPanel(this, 1, CANVAS_W * 0.5 + 300, CANVAS_H * 0.5 - 127, 5, 4);
	
	this.m_upgradeCostTitleLabel = new cc.LabelTTF("Cost: ", GetFont("Nasalization"), 18);
	this.m_upgradeCostTitleLabel.setAnchorPoint(cc.p(0, 1));
	this.m_upgradeCostTitleLabel.setPosition (cc.p(CANVAS_W * 0.5 + 200, CANVAS_H * 0.5 - 75));
	this.m_upgradeCostTitleLabel.setLocalZOrder (LAYER_UI);
	this.m_upgradeCostTitleLabel.setOpacity(0);
	this.addChild(this.m_upgradeCostTitleLabel);
	
	this.m_upgradeCostLabel = new cc.LabelTTF("0", GetFont("Nasalization"), 18);
	this.m_upgradeCostLabel.setAnchorPoint(cc.p(1, 1));
	this.m_upgradeCostLabel.setPosition (cc.p(CANVAS_W * 0.5 + 400, CANVAS_H * 0.5 - 75));
	this.m_upgradeCostLabel.setLocalZOrder (LAYER_UI);
	this.m_upgradeCostLabel.setOpacity(0);
	this.addChild(this.m_upgradeCostLabel);
	
	this.m_creditTitleLabel = new cc.LabelTTF("Credit: ", GetFont("Nasalization"), 18);
	this.m_creditTitleLabel.setAnchorPoint(cc.p(0, 1));
	this.m_creditTitleLabel.setPosition (cc.p(CANVAS_W * 0.5 + 200, CANVAS_H * 0.5 - 100));
	this.m_creditTitleLabel.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_creditTitleLabel);
	
	this.m_creditLabel = new cc.LabelTTF("0", GetFont("Nasalization"), 18);
	this.m_creditLabel.setAnchorPoint(cc.p(1, 1));
	this.m_creditLabel.setPosition (cc.p(CANVAS_W * 0.5 + 400, CANVAS_H * 0.5 - 100));
	this.m_creditLabel.setLocalZOrder (LAYER_UI);
	this.addChild(this.m_creditLabel);
	
	this.m_upgradeButton = new BigButton (this, 1, "Research", CANVAS_W * 0.5 + 302, 183, this.Upgrade);
	this.m_buttonList.push (this.m_upgradeButton);
	
	this.m_textAlpha = 0;
	this.m_switchUpgrade = false;
	this.m_upgradeSelecting = 0;
	
	this.SelectUpgrade(0);
}

g_gsUpgradeMainLayer.Refresh = function () {
	for (var i=0; i<g_upgrade.length; i++) {
		if (g_profile.m_upgrade[i] == true) {
			g_gsUpgradeMainLayer.m_upgradeButtonList[i].SetStatus(UPGRADE_BUTTON_UPGRADED);
		}
		else {
			if (g_profile.m_money >= g_upgrade[i].m_price) {
				g_gsUpgradeMainLayer.m_upgradeButtonList[i].SetStatus(UPGRADE_BUTTON_ENABLE);
			}
			else {
				g_gsUpgradeMainLayer.m_upgradeButtonList[i].SetStatus(UPGRADE_BUTTON_DISABLED);
			}
		}
	}
}

g_gsUpgradeMainLayer.SelectUpgrade = function (id) {
	g_gsUpgradeMainLayer.m_upgradeSelecting = id;
	g_gsUpgradeMainLayer.m_switchUpgrade = true;
	
	for (var i=0; i<g_gsUpgradeMainLayer.m_upgradeButtonList.length; i++) {
		g_gsUpgradeMainLayer.m_upgradeButtonList[i].SetHighlight(false);
	}
	g_gsUpgradeMainLayer.m_upgradeButtonList[id].SetHighlight(true);
	
	if (g_profile.m_upgrade[this.m_upgradeSelecting] == true) {
		this.m_upgradeButton.SetEnable(false);
	}
	else {
		if (g_profile.m_money >= g_upgrade[g_gsUpgradeMainLayer.m_upgradeSelecting].m_price) {
			g_gsUpgradeMainLayer.m_upgradeButton.SetEnable(true);
		}
		else {
			g_gsUpgradeMainLayer.m_upgradeButton.SetEnable(false);
		}
	}
}

g_gsUpgradeMainLayer.Upgrade = function () {
	g_profile.Upgrade (g_gsUpgradeMainLayer.m_upgradeSelecting);
	g_gsUpgradeMainLayer.Refresh();
}

g_gsUpgradeMainLayer.UpdateUI = function () {
	this.m_upgradeTitleLabel.setString (" " + g_upgrade[this.m_upgradeSelecting].m_name + " ");
	this.m_upgradeDescriptionLabel.setString (g_upgrade[this.m_upgradeSelecting].m_description);
	this.m_upgradeCostLabel.setString (g_upgrade[this.m_upgradeSelecting].m_price);
}


g_gsUpgradeMainLayer.OpenShop = function() {
	PushShop();
}


g_gsUpgradeMainLayer.update = function (deltaTime) {
	if (this.m_switchUpgrade == true) {
		this.m_textAlpha -= deltaTime * GLOBAL_TEXT_FADE_SPEED;
		if (this.m_textAlpha <= 0) {
			this.m_textAlpha = 0;
			this.m_switchUpgrade = false;
			this.UpdateUI();
		}
	}
	else {
		this.m_textAlpha += deltaTime * GLOBAL_TEXT_FADE_SPEED;
		if (this.m_textAlpha >= 255) {
			this.m_textAlpha = 255;
		}
	}
	
	this.m_upgradeTitleLabel.setOpacity(this.m_textAlpha);
	this.m_upgradeDescriptionLabel.setOpacity(this.m_textAlpha);
	this.m_upgradeCostTitleLabel.setOpacity(this.m_textAlpha);
	this.m_upgradeCostLabel.setOpacity(this.m_textAlpha);
	
	this.m_creditLabel.setString (g_profile.m_money);
	
	for (var i=0; i<g_gsUpgradeMainLayer.m_upgradeButtonList.length; i++) {
		g_gsUpgradeMainLayer.m_upgradeButtonList[i].Update(deltaTime);
	}
}







g_gsUpgradeMainLayer.AddEventListener = function () {
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
	for (var i=0; i<this.m_upgradeButtonList.length; i++) {
		this.m_upgradeButtonList[i].AddEventListener();
	}
	
	//g_gsUpgradeMainLayer.m_turretWiki.AddEventListener();
}

var GSUpgrade = cc.Scene.extend({
	ctor:function () {
		this._super();
		this.addChild(g_gsUpgradeMainLayer);
		g_gsUpgradeMainLayer.Init();
		this.added = true;
	},
    onEnter:function () {
		this._super();
		g_gsUpgradeMainLayer.Refresh();
		g_gsUpgradeMainLayer.AddEventListener();
		g_gsUpgradeMainLayer.scheduleUpdate();
    }
});

