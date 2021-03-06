var BASE_RANGE = 7;
var BASE_COOL_DOWN = 5;

function Base(battle, layer) {
	var BASE_ROTATING_SPEED = 13;
	var BASE_SHIELD_FADE_SPEED = 500;
	var BASE_EXPLOSION_INTERVAL = 0.2;
	
	this.m_x = 0;
	this.m_y = 0;
	this.m_angle = 0;
	this.m_HP = 0;
	this.m_maxHP = 0;
	this.m_shield = 0;
	this.m_maxShield = 0;
	
	this.m_target = null;
	
	var shieldAlpha = 0;
	var explosionCount = 0;
	var cooldownCount = 0;
	
	this.Init = function () {
		this.m_sprite = cc.Sprite.create("res/GSAction/Base/Base-1.png");
		this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_sprite.setLocalZOrder (LAYER_TOWER_TURRET);
		layer.addChild(this.m_sprite);
		
		this.m_shieldSprite = cc.Sprite.create("res/GSAction/Base/Shield.png");
		this.m_shieldSprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_shieldSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.m_shieldSprite.setLocalZOrder (LAYER_TOWER_TURRET+1);
		this.m_shieldSprite.setOpacity (0);
		layer.addChild(this.m_shieldSprite);
		
		this.m_HP = 100;
		this.m_maxHP = 100;
		this.m_shield = 100;
		this.m_maxShield = 100;
		
		this.m_laserBeam = new ProjectileBaseLaser (battle, layer, this);
	}
	
	this.SetPosition = function(x, y) {
		this.m_x = x;
		this.m_y = y;
		
		var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
		var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
		this.m_sprite.setPosition (cc.p(spriteX, spriteY));
		this.m_shieldSprite.setPosition (cc.p(spriteX, spriteY));
	}
	
	this.Update = function (deltaTime) {
		this.m_angle += deltaTime * BASE_ROTATING_SPEED;
		if (this.m_angle > 360) {
			this.m_angle -= 360;
		}
		this.m_sprite.setRotation(this.m_angle);
		
		if (shieldAlpha > 0) {
			shieldAlpha -= BASE_SHIELD_FADE_SPEED * deltaTime;
			if (shieldAlpha < 0) shieldAlpha = 0;
		}
		
		if (this.m_HP > 0) {
			if (cooldownCount > 0) {
				cooldownCount -= deltaTime;
			}
			if (this.m_target == null) {
				this.ScanForTarget();
			}
			else {
				if (DistanceBetweenTwoPoint (this.m_x, this.m_y, this.m_target.m_x, this.m_target.m_y) > this.GetRange()) {
					this.m_target = null;
				}
				else if (this.m_target.m_live == false) {
					this.m_target = null;
				}
				else if (cooldownCount <= 0) {
					var barrelX = this.m_x;
					var barrelY = this.m_y;
					
					this.m_laserBeam.Show (barrelX, barrelY, this.m_target);
					cooldownCount += BASE_COOL_DOWN;
				}
			}
		}
		else {
			explosionCount += deltaTime;
			if (explosionCount >= BASE_EXPLOSION_INTERVAL) {
				explosionCount -= BASE_EXPLOSION_INTERVAL;
				var randomX = 1.5 - Math.random() * 3;
				var randomY = 1.5 - Math.random() * 3;
				battle.SpawnExplosion (EXPLOSION_DEBRIS_BLUE, 0.8, this.m_x + randomX, this.m_y + randomY);
			}
		}
		
		
		this.m_laserBeam.Update (deltaTime);
		
		
	}
	
	this.UpdateVisual = function () {
		if (this.m_HP < this.m_maxHP * 0.2) 		this.m_sprite.setTexture("res/GSAction/Base/Base-6.png");
		else if (this.m_HP < this.m_maxHP * 0.4) 	this.m_sprite.setTexture("res/GSAction/Base/Base-5.png");
		else if (this.m_HP < this.m_maxHP * 0.6) 	this.m_sprite.setTexture("res/GSAction/Base/Base-4.png");
		else if (this.m_HP < this.m_maxHP * 0.8) 	this.m_sprite.setTexture("res/GSAction/Base/Base-3.png");
		else if (this.m_HP < this.m_maxHP) 			this.m_sprite.setTexture("res/GSAction/Base/Base-2.png");
		
		this.m_sprite.setRotation(this.m_angle);
		this.m_shieldSprite.setOpacity (shieldAlpha);
		
		this.m_laserBeam.UpdateVisual ();
	}
	
	this.Hit = function (damage) {
		if (this.m_shield >= damage) {
			this.m_shield -= damage;
			shieldAlpha = 192;
			this.m_shieldSprite.setOpacity (shieldAlpha);
		}
		else {
			if (this.m_HP > 0) {
				this.m_HP -= damage - this.m_shield;
				this.m_shield = 0;
				if (this.m_HP <= 0) {
					this.m_HP = 0;
					g_battle.BaseDestroyed();
				}
			}
		}
	}
	
	
	this.ScanForTarget = function() {
		var currentDistance = 9999;
		for (var i=0; i<battle.m_enemies.length; i++) {
			var tempEnemy = battle.m_enemies[i];
			var tempDistance = DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y);
			if (tempDistance <= this.GetRange() && tempDistance < currentDistance) {
				currentDistance = tempDistance;
				this.m_target = tempEnemy;
			}
		}
	}
	this.GetRange = function() {
		return BASE_RANGE;
	}
	
	this.Init();
}