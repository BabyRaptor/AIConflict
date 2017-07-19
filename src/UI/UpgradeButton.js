var UPGRADE_BUTTON_ENABLE = 1;
var UPGRADE_BUTTON_DISABLED = 2;
var UPGRADE_BUTTON_UPGRADED = 3;


function UpgradeButton(layer, iconE, iconD, iconU, x, y, callback, param) {
	var instance = this;
	
	this.m_x = x;
	this.m_y = y;
	this.m_callback = callback;
	this.m_enabled = true;
	this.m_visible = true;
	this.m_status = UPGRADE_BUTTON_ENABLE;
	
	this.m_buttonSprite = new cc.Sprite("res/UI/UpgradeButton/Up-1.png");
	this.m_buttonSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_buttonSprite.setPosition (cc.p(x, y));
	this.m_buttonSprite.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_buttonSprite);
	
	this.m_buttonHighlightSprite = new cc.Sprite("res/UI/UpgradeButton/Highlight.png");
	this.m_buttonHighlightSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_buttonHighlightSprite.setPosition (cc.p(x, y));
	this.m_buttonHighlightSprite.setLocalZOrder (LAYER_UI);
	this.m_buttonHighlightSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_buttonHighlightSprite.setOpacity(0);
	layer.addChild(this.m_buttonHighlightSprite);
	
	this.m_iconSprite = new cc.Sprite(iconE);
	this.m_iconSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_iconSprite.setPosition (cc.p(x, y));
	this.m_iconSprite.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_iconSprite);
	
	var highlighting = false;
	var highlightAlpha = 0;
	var actualAlpha = 0;
	
	this.SetPosition = function (x, y) {
		this.m_x = x;
		this.m_y = y;
		
		this.m_buttonSprite.setPosition (cc.p(x, y));
		this.m_buttonHighlightSprite.setPosition (cc.p(x, y));
		this.m_iconSprite.setPosition (cc.p(x, y));
	}
	this.Update = function (deltaTime) {
		if (highlighting) {
			highlightAlpha += 3 * deltaTime;
			if (highlightAlpha > 6.28) {
				highlightAlpha = 0;
			}
			actualAlpha = Math.sin (highlightAlpha);
			if (actualAlpha < 0) actualAlpha *= -1;
		}
		else {
			actualAlpha -= deltaTime;
			if (actualAlpha < 0) actualAlpha = 0;
		}
		this.m_buttonHighlightSprite.setOpacity(actualAlpha * 255);
	}
	
	this.SetEnable = function (enable) {
		this.m_enabled = enable;
		if (this.m_enabled == false) {
			this.m_iconSprite.setOpacity(127);
		}
		else {
			this.m_iconSprite.setOpacity(255);
		}
	}
	this.SetVisible = function (visible) {
		this.m_visible = visible;
		this.m_buttonSprite.setVisible (visible);
		this.m_iconSprite.setVisible (visible);
	}
	
	this.SetStatus = function (status) {
		this.m_status = status;
		this.m_buttonSprite.setTexture("res/UI/UpgradeButton/Up-" + this.m_status + ".png");
		if (this.m_status == UPGRADE_BUTTON_ENABLE) {
			this.m_iconSprite.setTexture(iconE)
		}
		else if (this.m_status == UPGRADE_BUTTON_DISABLED) {
			this.m_iconSprite.setTexture(iconD)
		}
		else if (this.m_status == UPGRADE_BUTTON_UPGRADED) {
			this.m_iconSprite.setTexture(iconU)
		}
	}
	
	this.SetHighlight = function(highlight) {
		highlighting = highlight;
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
						instance.m_buttonSprite.setTexture("res/UI/UpgradeButton/Down-" + instance.m_status + ".png");
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
						instance.m_buttonSprite.setTexture("res/UI/UpgradeButton/Down-" + instance.m_status + ".png");
					}
					else {
						instance.m_buttonSprite.setTexture("res/UI/UpgradeButton/Up-" + instance.m_status + ".png");
					}
				}
			},
			onTouchEnded: function (touch, event) {
				if (instance.m_enabled && instance.m_visible) {
					var buttonRect = instance.m_buttonSprite.getBoundingBox();
					if (cc.rectContainsPoint(buttonRect, lastTouchPos)) {
						if (callback) callback(param);
					}
					instance.m_buttonSprite.setTexture("res/UI/UpgradeButton/Up-" + instance.m_status + ".png");
				}
			}
		}, instance.m_buttonSprite);
	}
}