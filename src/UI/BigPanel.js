function BigPanel(layer, style, x, y, w, h) {
	var PANEL_UNIT_SIZE = 100;
	var instance = this;
	
	if (w < 2) w = 2;
	if (h < 2) h = 2;
	
	this.m_x = x;
	this.m_y = y;
	this.m_w = w;
	this.m_h = h;
	this.m_style = style;
	this.m_visible = true;
	this.m_alpha = 255;
	
	this.m_sprites = new Array();
	for (var i=0; i<w; i++) {
		this.m_sprites[i] = new Array();
		for (var j=0; j<h; j++) {
			if (i==0 && j==0) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Corner-" + style + ".png");
				this.m_sprites[i][j].setRotation (0);
			}
			else if (i==0 && j==h-1) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Corner-" + style + ".png");
				this.m_sprites[i][j].setRotation (90);
			}
			else if (i==w-1 && j==0) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Corner-" + style + ".png");
				this.m_sprites[i][j].setRotation (-90);
			}
			else if (i==w-1 && j==h-1) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Corner-" + style + ".png");
				this.m_sprites[i][j].setRotation (180);
			}
			else if (i==0) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Edge-" + style + ".png");
				this.m_sprites[i][j].setRotation (0);
			}
			else if (i==w-1) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Edge-" + style + ".png");
				this.m_sprites[i][j].setRotation (180);
			}
			else if (j==0) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Edge-" + style + ".png");
				this.m_sprites[i][j].setRotation (-90);
			}
			else if (j==h-1) {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Edge-" + style + ".png");
				this.m_sprites[i][j].setRotation (90);
			}
			else {
				this.m_sprites[i][j] = new cc.Sprite("res/UI/BigPanel/Mid-" + style + ".png");
				this.m_sprites[i][j].setRotation (0);
			}
			
			this.m_sprites[i][j].setAnchorPoint(cc.p(0.5, 0.5));
			this.m_sprites[i][j].setPosition (cc.p(x + (i + 0.5 - (w * 0.5)) * PANEL_UNIT_SIZE, y + (j + 0.5 - (h * 0.5)) * PANEL_UNIT_SIZE));
			this.m_sprites[i][j].setLocalZOrder (LAYER_UI);
			layer.addChild(this.m_sprites[i][j]);
		}
	}
	
	
	this.SetPosition = function (x, y) {
		this.m_x = x;
		this.m_y = y;
		
		for (var i=0; i<this.m_w; i++) {
			for (var j=0; j<this.m_h; j++) {
				this.m_sprites[i][j].setPosition (cc.p(x + (i + 0.5 - (w * 0.5)) * PANEL_UNIT_SIZE, y + (j + 0.5 - (h * 0.5)) * PANEL_UNIT_SIZE));
			}
		}
	}
	
	this.SetVisible = function (visible) {
		this.m_visible = visible;
		for (var i=0; i<this.m_w; i++) {
			for (var j=0; j<this.m_h; j++) {
				this.m_sprites[i][j].setVisible (visible);
			}
		}
	}
	
	this.SetOpacity = function (alpha) {
		this.m_alpha = alpha;
		for (var i=0; i<this.m_w; i++) {
			for (var j=0; j<this.m_h; j++) {
				this.m_sprites[i][j].setOpacity (alpha);
			}
		}
	}
	
	this.Update = function (deltaTime) {
		
	}
	
	this.AddEventListener = function() {
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				if (touch.getLocation().x >= instance.m_x - instance.m_w * PANEL_UNIT_SIZE * 0.5
				&&  touch.getLocation().x <= instance.m_x + instance.m_w * PANEL_UNIT_SIZE * 0.5
				&&  touch.getLocation().y >= instance.m_y - instance.m_h * PANEL_UNIT_SIZE * 0.5
				&&  touch.getLocation().y <= instance.m_y + instance.m_h * PANEL_UNIT_SIZE * 0.5
				&&  instance.m_visible == true) {
					return true;
				}
				else {
					return false;
				}
			},
			onTouchMoved: function (touch, event) {
				
			},
			onTouchEnded: function (touch, event) {
				
			}
		}, this.m_sprites[0][0]);
	}
}