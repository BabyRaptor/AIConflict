function PowerBar(layer, x, y) {
	var instance = this;
	
	this.m_x = x;
	this.m_y = y;
	this.m_visible = true;
	
	this.m_barSprite = new cc.Sprite("res/UI/PowerBar/PowerBar.png");
	this.m_barSprite.setAnchorPoint(cc.p(0, 0.5));
	this.m_barSprite.setPosition (cc.p(x, y));
	this.m_barSprite.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_barSprite);
	
	this.m_barContentSprite = new cc.Sprite("res/UI/PowerBar/PowerBarContent.png");
	this.m_barContentSprite.setAnchorPoint(cc.p(0, 0.5));
	this.m_barContentSprite.setPosition (cc.p(x, y));
	this.m_barContentSprite.setLocalZOrder (LAYER_UI);
	layer.addChild(this.m_barContentSprite);
	
	this.m_value = 10;
	
	
	this.SetPosition = function (x, y) {
		this.m_x = x;
		this.m_y = y;
		
		this.m_barSprite.setPosition (cc.p(x, y));
		this.m_barContentSprite.setPosition (cc.p(x, y));
	}
	
	this.SetVisible = function (visible) {
		this.m_visible = visible;
		this.m_barSprite.setVisible (visible);
		this.m_barContentSprite.setVisible (visible);
	}
	
	this.SetValue = function (value) {
		if (value < 0) value = 0;
		if (value > 10) value = 10;
		this.m_value = value >> 0;
		this.m_barContentSprite.setTextureRect (cc.rect(0, 0, 5 + value * 16, 16));
	}
	
	this.Update = function (deltaTime) {
		
	}
}