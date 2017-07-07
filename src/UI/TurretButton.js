function TurretButton(layer, icon, name, price, x, y, callback, param) {
	var BUTTON_W = 150;
	var BUTTON_H = 50;
	
	var instance = this;
	var style = 1;
	
	this.m_x = x;
	this.m_y = y;
	this.m_callback = callback;
	this.m_enabled = true;
	this.m_visible = true;
	this.m_alpha = 255;
	
	this.m_buttonSprite = new cc.Sprite("res/UI/TurretButton/Up-" + style + ".png");
	this.m_buttonSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_buttonSprite.setPosition (cc.p(x, y));
	this.m_buttonSprite.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_buttonSprite);
	
	this.m_iconSprite = new cc.Sprite(icon);
	this.m_iconSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_iconSprite.setPosition (cc.p(x - 112, y));
	this.m_iconSprite.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_iconSprite);
	
	if (price != null) {
		this.m_nameLabel = new cc.LabelTTF(name.toUpperCase(), GetFont("Nasalization"), 19);
		this.m_nameLabel.setAnchorPoint(cc.p(0, 0.5));
		this.m_nameLabel.setPosition (cc.p(x - 70, y + 15));
		this.m_nameLabel.setLocalZOrder (LAYER_UI);
		layer.addChild(this.m_nameLabel);
	
		this.m_priceLabel = new cc.LabelTTF("Cost: " + price, GetFont("Nasalization"), 17);
		this.m_priceLabel.setAnchorPoint(cc.p(0, 0.5));
		this.m_priceLabel.setPosition (cc.p(x - 70, y - 15));
		this.m_priceLabel.setLocalZOrder (LAYER_UI);
		layer.addChild(this.m_priceLabel);
		
		this.m_confirmLabel = new cc.LabelTTF("CONFIRM BUILD", GetFont("Nasalization"), 20);
		this.m_confirmLabel.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_confirmLabel.setPosition (cc.p(x + 30, y));
		this.m_confirmLabel.setLocalZOrder (LAYER_UI);
		this.m_confirmLabel.setVisible (false);
		layer.addChild(this.m_confirmLabel);
	}
	else {
		this.m_confirmLabel = new cc.LabelTTF(name.toUpperCase(), GetFont("Nasalization"), 20);
		this.m_confirmLabel.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_confirmLabel.setPosition (cc.p(x + 30, y));
		this.m_confirmLabel.setLocalZOrder (LAYER_UI);
		this.m_confirmLabel.setVisible (true);
		layer.addChild(this.m_confirmLabel);
	}
	
	
	

	
	
	this.SetPosition = function (x, y) {
		this.m_x = x;
		this.m_y = y;
		
		this.m_buttonSprite.setPosition (cc.p(x, y));
		this.m_iconSprite.setPosition (cc.p(x - 112, y));
		if (price != null) {
			this.m_nameLabel.setPosition (cc.p(x - 70, y + 15));
			this.m_priceLabel.setPosition (cc.p(x - 70, y - 15));
		}
		this.m_confirmLabel.setPosition (cc.p(x + 30, y));
	}
	this.Update = function (deltaTime) {
		
	}
	
	this.SetEnable = function (enable) {
		this.m_enabled = enable;
		if (this.m_enabled == false) {
			this.m_buttonSprite.setTexture("res/UI/TurretButton/Disabled.png");
			this.m_iconSprite.setOpacity(127);
		}
		else {
			this.m_buttonSprite.setTexture("res/UI/TurretButton/Up-" + style + ".png");
			this.m_iconSprite.setOpacity(255);
		}
	}
	this.SetVisible = function (visible) {
		this.m_visible = visible;
		this.m_buttonSprite.setVisible (visible);
		this.m_iconSprite.setVisible (visible);
		if (price != null) {
			if (visible == false) {
				this.m_nameLabel.setVisible (false);
				this.m_priceLabel.setVisible (false);
				this.m_confirmLabel.setVisible (false);
			}
			else {
				if (style == 3) {
					this.m_confirmLabel.setVisible (true);
					this.m_nameLabel.setVisible (false);
					this.m_priceLabel.setVisible (false);
				}
				else {
					this.m_confirmLabel.setVisible (false);
					this.m_nameLabel.setVisible (true);
					this.m_priceLabel.setVisible (true);
				}
			}
		}
		else {
			this.m_confirmLabel.setVisible (visible);
		}
	}
	
	this.SetOpacity = function (alpha) {
		this.m_alpha = alpha;
		
		this.m_buttonSprite.setOpacity (this.m_alpha);
		this.m_iconSprite.setOpacity (this.m_alpha);
		if (price != null) {
			this.m_nameLabel.setOpacity (this.m_alpha);
			this.m_priceLabel.setOpacity (this.m_alpha);
		}
		this.m_confirmLabel.setOpacity (this.m_alpha);
	}
	
	this.SwitchToConfirmMode = function() {
		style = 3;
		this.m_buttonSprite.setTexture("res/UI/TurretButton/Up-" + style + ".png");
		if (price != null) {
			this.m_confirmLabel.setVisible (true);
			this.m_nameLabel.setVisible (false);
			this.m_priceLabel.setVisible (false);
		}
	}
	this.SwitchToNormalMode = function() {
		if (style == 3) {
			style = 1;
			this.SetEnable (this.m_enabled);
			if (price != null) {
				this.m_confirmLabel.setVisible (false);
				this.m_nameLabel.setVisible (true);
				this.m_priceLabel.setVisible (true);
			}
		}
	}
	
	this.AddEventListener = function() {
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				if (instance.m_enabled && instance.m_visible) {
					lastTouchPos = touch.getLocation();
					var buttonRect = instance.m_buttonSprite.getBoundingBox();
					if (cc.rectContainsPoint(buttonRect, lastTouchPos)) {
						instance.m_buttonSprite.setTexture("res/UI/TurretButton/Down-" + style + ".png");
						return true;
					}
				}
				return false;
			},
			onTouchMoved: function (touch, event) {
				if (instance.m_enabled && instance.m_visible) {
					lastTouchPos = touch.getLocation();
					var buttonRect = instance.m_buttonSprite.getBoundingBox();
					if (cc.rectContainsPoint(buttonRect, lastTouchPos)) {
						instance.m_buttonSprite.setTexture("res/UI/TurretButton/Down-" + style + ".png");
					}
					else {
						instance.m_buttonSprite.setTexture("res/UI/TurretButton/Up-" + style + ".png");
					}
				}
			},
			onTouchEnded: function (touch, event) {
				if (instance.m_enabled && instance.m_visible) {
					var buttonRect = instance.m_buttonSprite.getBoundingBox();
					if (cc.rectContainsPoint(buttonRect, lastTouchPos)) {
						if (callback) callback(param);
					}
					instance.m_buttonSprite.setTexture("res/UI/TurretButton/Up-" + style + ".png");
				}
			}
		}, instance.m_buttonSprite);
	}
}