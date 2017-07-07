function TurretInfo (layer, x, y) {
	var MOVE_AMOUNT = 350;
	var MOVE_SPEED = 1000;
	var moveOffset = 0;
	
	var instance = this;
	
	this.m_x = x;
	this.m_y = y;
	
	this.m_showing = false;
	
	this.m_infoPanel = new MediumPanel(layer, 1, x, y, 8, 12);
	
	this.m_selecting = null;
	this.m_sellConfirm = false;
	
	this.m_nameLabel = new cc.LabelTTF("Name", GetFont("Nasalization"), 22);
	this.m_nameLabel.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_nameLabel.setPosition (cc.p(0, 0));
	this.m_nameLabel.setLocalZOrder (LAYER_UI + 1);
	layer.addChild(this.m_nameLabel);
	
	this.m_levelLabel = new cc.LabelTTF("Level", GetFont("Nasalization"), 18);
	this.m_levelLabel.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_levelLabel.setPosition (cc.p(0, 0));
	this.m_levelLabel.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_levelLabel);
	
	this.m_designSprite = cc.Sprite.create("res/GSAction/Turret/1-Gatling/Design.png");
	this.m_designSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_designSprite.setPosition(cc.p(0, 0));
	this.m_designSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_designSprite.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_designSprite);
	
	
	this.m_damageLabel = new cc.LabelTTF("Damage:", GetFont("Nasalization"), 16);
	this.m_damageLabel.setAnchorPoint(cc.p(0, 0.5));
	this.m_damageLabel.setPosition(cc.p(0, 0));
	this.m_damageLabel.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_damageLabel);
	
	this.m_fireRateLabel = new cc.LabelTTF("Fire rate:", GetFont("Nasalization"), 16);
	this.m_fireRateLabel.setAnchorPoint(cc.p(0, 0.5));
	this.m_fireRateLabel.setPosition (cc.p(0, 0));
	this.m_fireRateLabel.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_fireRateLabel);
	
	this.m_piercingLabel = new cc.LabelTTF("Penetration:", GetFont("Nasalization"), 16);
	this.m_piercingLabel.setAnchorPoint(cc.p(0, 0.5));
	this.m_piercingLabel.setPosition (cc.p(0, 0));
	this.m_piercingLabel.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_piercingLabel);
	
	this.m_rangeLabel = new cc.LabelTTF("Range:", GetFont("Nasalization"), 16);
	this.m_rangeLabel.setAnchorPoint(cc.p(0, 0.5));
	this.m_rangeLabel.setPosition (cc.p(0, 0));
	this.m_rangeLabel.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_rangeLabel);
	
	this.m_aoeLabel = new cc.LabelTTF("Effect area:", GetFont("Nasalization"), 16);
	this.m_aoeLabel.setAnchorPoint(cc.p(0, 0.5));
	this.m_aoeLabel.setPosition (cc.p(0, 0));
	this.m_aoeLabel.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_aoeLabel);
	
	this.m_damageBar = new PowerBar(layer, 0, 0);
	this.m_fireRateBar = new PowerBar(layer, 0, 0);
	this.m_piercingBar = new PowerBar(layer, 0, 0);
	this.m_rangeBar = new PowerBar(layer, 0, 0);
	this.m_aoeBar = new PowerBar(layer, 0, 0);
	
	this.m_upgradePriceLabel = new cc.LabelTTF("", GetFont("Nasalization"), 16);
	this.m_upgradePriceLabel.setAnchorPoint(cc.p(0, 0.5));
	this.m_upgradePriceLabel.setPosition (cc.p(0, 0));
	this.m_upgradePriceLabel.setLocalZOrder (LAYER_UI + 3);
	layer.addChild(this.m_upgradePriceLabel);
	
	this.m_sellPriceLabel = new cc.LabelTTF("", GetFont("Nasalization"), 16);
	this.m_sellPriceLabel.setAnchorPoint(cc.p(0, 0.5));
	this.m_sellPriceLabel.setPosition (cc.p(0, 0));
	this.m_sellPriceLabel.setLocalZOrder (LAYER_UI + 3);
	this.m_sellPriceLabel.setFontFillColor (new cc.Color(201, 90, 0, 255));
	layer.addChild(this.m_sellPriceLabel);
	
	this.Init = function () {
		this.m_designPanel = new SmallPanel(layer, 1, x, y, 6, 6);
		this.m_upgradeButton = new BigButton (layer, 1, "Upgrade", 0, 0, this.Upgrade);
		this.m_sellButton = new BigButton (layer, 2, "Sell", 0, 0, this.Sell);
	}
	
	
	this.AddEventListener = function() {
		this.m_infoPanel.AddEventListener();
		this.m_upgradeButton.AddEventListener();
		this.m_sellButton.AddEventListener();
	}
	
	this.Update = function (deltaTime) {
		if (this.m_showing == true) {
			moveOffset += deltaTime * MOVE_SPEED;
			if (moveOffset > MOVE_AMOUNT) {
				moveOffset = MOVE_AMOUNT;
			}
		}
		else {
			moveOffset -= deltaTime * MOVE_SPEED;
			if (moveOffset < 0) {
				moveOffset = 0;
			}
		}
		this.m_infoPanel.SetPosition (this.m_x - moveOffset, this.m_y);
		
		this.m_designPanel.SetPosition (this.m_x - 10 - moveOffset, this.m_y + 120);
		this.m_nameLabel.setPosition (cc.p(this.m_x - 10 - moveOffset, this.m_y + 235));
		this.m_levelLabel.setPosition (cc.p(this.m_x - 10 - moveOffset, this.m_y + 5));
		this.m_designSprite.setPosition (cc.p(this.m_x - 10 - moveOffset, this.m_y + 120));
		
		this.m_damageLabel.setPosition (cc.p(this.m_x - 150 - moveOffset, this.m_y - 50));
		this.m_fireRateLabel.setPosition (cc.p(this.m_x - 150 - moveOffset, this.m_y - 75));
		this.m_piercingLabel.setPosition (cc.p(this.m_x - 150 - moveOffset, this.m_y - 100));
		this.m_rangeLabel.setPosition (cc.p(this.m_x - 150 - moveOffset, this.m_y - 125));
		this.m_aoeLabel.setPosition (cc.p(this.m_x - 150 - moveOffset, this.m_y - 150));
		this.m_upgradePriceLabel.setPosition (cc.p(this.m_x - 150 - moveOffset, this.m_y - 180));
		this.m_sellPriceLabel.setPosition (cc.p(this.m_x - 150 - moveOffset, this.m_y - 205));
		
		this.m_damageBar.SetPosition (this.m_x - 35 - moveOffset, this.m_y - 50);
		this.m_fireRateBar.SetPosition (this.m_x - 35 - moveOffset, this.m_y - 75);
		this.m_piercingBar.SetPosition (this.m_x - 35 - moveOffset, this.m_y - 100);
		this.m_rangeBar.SetPosition (this.m_x - 35 - moveOffset, this.m_y - 125);
		this.m_aoeBar.SetPosition (this.m_x - 35 - moveOffset, this.m_y - 150);
		
		this.m_upgradeButton.SetPosition (this.m_x - 78 - moveOffset, this.m_y - 250);
		this.m_sellButton.SetPosition (this.m_x + 72 - moveOffset, this.m_y - 250);
		
		
		if (this.m_selecting != null) {
			if (this.m_selecting.MoneyRequireForNextLevel() != null) {
				// There is still level to upgrade
				if (g_battle.m_money < this.m_selecting.MoneyRequireForNextLevel()) {
					this.m_upgradeButton.SetEnable (false);
				}
				else {
					this.m_upgradeButton.SetEnable (true);
				}
			}
			else {
				// Turret at max
				this.m_upgradeButton.SetEnable (false);
			}
		}
	}
	
	this.SetTurret = function (turret) {
		this.m_selecting = turret;
		this.m_designSprite.setTexture(turret.m_designPath);
		this.m_nameLabel.setString(turret.m_name.toUpperCase());
		this.m_levelLabel.setString("Level: " + (turret.m_level + 1));
		this.m_upgradePriceLabel.setString("Upgrade cost: " + turret.MoneyRequireForNextLevel());
		this.m_sellPriceLabel.setString("Sell price: " + turret.GetSellPrice());
		
		this.m_damageBar.SetValue (turret.m_damageBar[turret.m_level]);
		this.m_fireRateBar.SetValue (turret.m_fireRateBar[turret.m_level]);
		this.m_piercingBar.SetValue (turret.m_piercingBar[turret.m_level]);
		this.m_rangeBar.SetValue (turret.m_rangeBar[turret.m_level]);
		this.m_aoeBar.SetValue (turret.m_aoeBar[turret.m_level]);
		
		
	}
	
	this.Upgrade = function () {
		instance.ResetSell();
		if (instance.m_selecting != null) {
			instance.m_selecting.Upgrade();
			instance.SetTurret (instance.m_selecting);
			g_battle.m_selector.ShowRangeFinder (instance.m_selecting.GetRange());
		}
	}
	
	this.Sell = function () {
		if (instance.m_sellConfirm == false) {
			instance.m_sellConfirm = true;
			instance.m_sellButton.SetCaption ("Confirm?");
		}
		else {
			instance.m_showing = false;
			instance.ResetSell();
			instance.m_selecting.Sell();
			
			g_battle.m_selector.SetVisible (false);
		}
	}
	
	this.ResetSell = function() {
		this.m_sellConfirm = false;
		this.m_sellButton.SetCaption ("Sell");
	}
	
	this.Init();
}