function BigButton(layer, style, caption, x, y, callback) {
	var BUTTON_W = 150;
	var BUTTON_H = 50;
	
	var instance = this;
	
	this.m_x = x;
	this.m_y = y;
	this.m_callback = callback;
	this.m_enabled = true;
	this.m_visible = true;
	
	this.m_buttonSprite = new cc.Sprite("res/UI/BigButton/Up-" + style + ".png");
	this.m_buttonSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_buttonSprite.setPosition (cc.p(x, y));
	this.m_buttonSprite.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_buttonSprite);
	
	this.m_buttonCaption = new cc.LabelTTF(caption, GetFont("Nasalization"), 20);
	this.m_buttonCaption.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_buttonCaption.setPosition (cc.p(x, y));
	this.m_buttonCaption.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_buttonCaption);
	
	
	this.SetPosition = function (x, y) {
		this.m_x = x;
		this.m_y = y;
		
		this.m_buttonSprite.setPosition (cc.p(x, y));
		this.m_buttonCaption.setPosition (cc.p(x, y));
	}
	this.SetCaption = function (string) {
		this.m_buttonCaption.setString (string);
	}
	
	this.Update = function (deltaTime) {
		
	}
	
	this.SetEnable = function (enable) {
		if (this.m_enabled != enable) {
			if (enable) {
				this.m_buttonSprite.setTexture("res/UI/BigButton/Up-" + style + ".png");
			}
			else {
				this.m_buttonSprite.setTexture("res/UI/BigButton/Disabled.png");
			}
			this.m_enabled = enable;
		}
	}
	this.SetVisible = function (visible) {
		this.m_visible = visible;
		this.m_buttonSprite.setVisible (visible);
		this.m_buttonCaption.setVisible (visible);
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
						instance.m_buttonSprite.setTexture("res/UI/BigButton/Down-" + style + ".png");
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
						instance.m_buttonSprite.setTexture("res/UI/BigButton/Down-" + style + ".png");
					}
					else {
						instance.m_buttonSprite.setTexture("res/UI/BigButton/Up-" + style + ".png");
					}
				}
			},
			onTouchEnded: function (touch, event) {
				if (instance.m_enabled && instance.m_visible) {
					var buttonRect = instance.m_buttonSprite.getBoundingBox();
					if (cc.rectContainsPoint(buttonRect, lastTouchPos)) {
						if (callback) callback();
					}
					instance.m_buttonSprite.setTexture("res/UI/BigButton/Up-" + style + ".png");
				}
			}
		}, instance.m_buttonSprite);
	}
}