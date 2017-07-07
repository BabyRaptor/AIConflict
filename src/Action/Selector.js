function Selector(battle, layer) {
	var SELECTOR_VIBRATE_SPEED = 0.2;
	var SELECTOR_TEST_TURRET_ALPHA_SPEED = 300;
	
	this.m_x = 0;
	this.m_y = 0;
	this.m_testTurretShowing = false;
	
	var spriteX = 0;
	var spriteY = 0;
	var spriteScale = 1;
	var scaleDirection = 0;
	var testTurretAlpha = 80;
	
	
	this.Init = function () {
		this.m_sprite = cc.Sprite.create("res/GSAction/Selector.png");
		this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.m_sprite.setLocalZOrder (LAYER_UI);
		layer.addChild(this.m_sprite);
		
		this.m_rangeSprite = cc.Sprite.create("res/GSAction/RangeFinder.png");
		this.m_rangeSprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_rangeSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.m_rangeSprite.setLocalZOrder (LAYER_UI);
		this.m_rangeSprite.setVisible (false);
		layer.addChild(this.m_rangeSprite);
		
		this.m_testTurretSprite = cc.Sprite.create("res/GSAction/Turret/1-Gatling/Icon.png");
		this.m_testTurretSprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_testTurretSprite.setLocalZOrder (LAYER_UI);
		this.m_testTurretSprite.setVisible(false);
		layer.addChild(this.m_testTurretSprite);
	}
	
	this.SetVisible = function (visible) {
		this.m_sprite.setVisible (visible);
		if (visible == false) {
			this.HideTestTurret();
			this.HideRangeFinder();
		}
	}
	
	this.ShowTestTurret = function (type) {
		if (type == 1) {
			this.m_testTurretSprite.setTexture ("res/GSAction/Turret/1-Gatling/Icon.png");
			this.ShowRangeFinder (TURRET_GATLING_RANGE[0]);
		}
		else if (type == 2) {
			this.m_testTurretSprite.setTexture ("res/GSAction/Turret/2-Cannon/Icon.png");
			this.ShowRangeFinder (TURRET_CANNON_RANGE[0]);
		}
		else if (type == 3) {
			this.m_testTurretSprite.setTexture ("res/GSAction/Turret/3-Missile/Icon.png");
			this.ShowRangeFinder (TURRET_MISSILE_RANGE[0]);
		}
		else if (type == 4) {
			this.m_testTurretSprite.setTexture ("res/GSAction/Turret/4-Laser/Icon.png");
			this.ShowRangeFinder (TURRET_LASER_RANGE[0]);
		}
		else if (type == 5) {
			this.m_testTurretSprite.setTexture ("res/GSAction/Turret/5-Gauss/Icon.png");
			this.ShowRangeFinder (TURRET_GAUSS_RANGE[0]);
		}
		else if (type == 6) {
			this.m_testTurretSprite.setTexture ("res/GSAction/Turret/6-Static/Icon.png");
			this.ShowRangeFinder (TURRET_STATIC_RANGE[0]);
		}
		else if (type == 7) {
			this.m_testTurretSprite.setTexture ("res/GSAction/Turret/7-Shock/Turret.png");
			this.ShowRangeFinder (TURRET_SHOCK_RANGE[0]);
		}
		
		this.m_testTurretSprite.setVisible (true);
		this.m_testTurretShowing = true;
	}
	this.HideTestTurret = function() {
		this.m_testTurretSprite.setVisible (false);
		this.m_testTurretShowing = false;
	}
	
	this.ShowRangeFinder = function (range) {
		this.m_rangeSprite.setVisible (true);
		this.m_rangeSprite.setScale (range * BLOCK_SIZE / 500);
	}
	this.HideRangeFinder = function () {
		this.m_rangeSprite.setVisible (false);
	}
	
	
	this.SetPosition = function(x, y) {
		this.m_x = x;
		this.m_y = y;
		
		var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
		var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
		this.m_sprite.setPosition (cc.p(spriteX, spriteY));
		this.m_rangeSprite.setPosition (cc.p(spriteX, spriteY));
		this.m_testTurretSprite.setPosition (cc.p(spriteX, spriteY));
	}
	
	this.Update = function (deltaTime) {
		if (scaleDirection == 0) {
			testTurretAlpha += deltaTime * SELECTOR_TEST_TURRET_ALPHA_SPEED
			spriteScale += deltaTime * SELECTOR_VIBRATE_SPEED;
			if (spriteScale >= 1.1) {
				scaleDirection = 1;
			}
		}
		else {
			testTurretAlpha -= deltaTime * SELECTOR_TEST_TURRET_ALPHA_SPEED
			spriteScale -= deltaTime * SELECTOR_VIBRATE_SPEED;
			if (spriteScale <= 1) {
				scaleDirection = 0;
			}
		}
		this.m_sprite.setScale (spriteScale);
		
		
		this.m_testTurretSprite.setOpacity (testTurretAlpha);
		
	}
	
	this.Init();
}