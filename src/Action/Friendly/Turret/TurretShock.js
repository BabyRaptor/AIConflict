var TURRET_SHOCK_NAME = "Shock emitter";
var TURRET_SHOCK = 7;
var TURRET_SHOCK_PRICE = [300, 150, 175, 200, 225];
var TURRET_SHOCK_RANGE = [4, 4.25, 4.5, 4.75, 5];
var TURRET_SHOCK_COOLDOWN = [3.8, 3.6, 3.4, 3.2, 3];

// Do nothing, just for display purpose
var TURRET_SHOCK_ACCURACY = [99, 99, 99, 99, 99];

function TurretShock (battle, layer, x, y) {
	// Properties
	this.m_active = true;
	this.m_type = TURRET_SHOCK;
	
	this.m_x = x;
	this.m_y = y;
	this.m_level = 0;
	this.m_price = TURRET_SHOCK_PRICE[0];
	
	this.m_target = null;
	
	// Sprite
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_turretSprite = GetFromPool("res/GSAction/Turret/7-Shock/Turret.png");
	this.m_turretSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_turretSprite.setLocalZOrder (LAYER_TOWER_TURRET);
	this.m_turretSprite.setRotation(this.m_angle);
	this.m_turretSprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_turretSprite);
	
	this.m_blindedIcon = GetFromPool("res/GSAction/Turret/BlindIcon.png");
	this.m_blindedIcon.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_blindedIcon.setLocalZOrder (LAYER_TOWER_TURRET_STATUS);
	this.m_blindedIcon.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_blindedIcon.setVisible (false);
	this.m_blindedIcon.setScale(0.15);
	layer.addChild(this.m_blindedIcon);
	
	this.m_slowedIcon = GetFromPool("res/GSAction/Turret/SlowIcon.png");
	this.m_slowedIcon.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_slowedIcon.setLocalZOrder (LAYER_TOWER_TURRET_STATUS);
	this.m_slowedIcon.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_slowedIcon.setVisible (false);
	this.m_slowedIcon.setScale(0.15);
	layer.addChild(this.m_slowedIcon);
	
	this.m_stunnedIcon = GetFromPool("res/GSAction/Turret/StunIcon.png");
	this.m_stunnedIcon.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_stunnedIcon.setLocalZOrder (LAYER_TOWER_TURRET_STATUS);
	this.m_stunnedIcon.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_stunnedIcon.setVisible (false);
	this.m_stunnedIcon.setScale(0.15);
	layer.addChild(this.m_stunnedIcon);
	
	
	var cooldownCount = 0;
	
	// Status effect
	this.m_blinded = 0;
	this.m_slowed = 0;
	this.m_stunned = 0;
	
	// Display info
	this.m_designPath = "res/GSAction/Turret/7-Shock/Design.png";
	this.m_name = TURRET_SHOCK_NAME;
	this.m_damageBar = [6, 6, 7, 7, 8];
	this.m_fireRateBar = [1, 1, 2, 2, 3];
	this.m_piercingBar = [1, 1, 1, 1, 1];
	this.m_rangeBar = [2, 2, 3, 3, 3];
	this.m_aoeBar = [8, 9, 9, 10, 10];
	
	this.MoneyRequireForNextLevel = function() {
		if (this.m_level < TURRET_SHOCK_PRICE.length - 1) {
			return TURRET_SHOCK_PRICE[this.m_level + 1];
		}
		return null;
	}
	
	this.Upgrade = function () {
		if (this.m_level < TURRET_SHOCK_PRICE.length - 1) {
			if (battle.m_money >= this.MoneyRequireForNextLevel()) {
				this.m_price += this.MoneyRequireForNextLevel();
				battle.m_money -= this.MoneyRequireForNextLevel();
				this.m_level ++;
			}
		}
	}
	
	
	this.Update = function (deltaTime) {
		if (this.m_active == true) {
			if (this.m_stunned <= 0) {
				if (cooldownCount > 0) {
					cooldownCount -= deltaTime;
				}
				
				for (var i=0; i<battle.m_enemies.length; i++) {
					var tempEnemy = battle.m_enemies[i];
					var tempDistance = DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y);
					if (tempDistance <= this.GetRange()) {
						this.Shoot();
						break;
					}
				}
			}
			
			if (this.m_blinded > 0) this.m_blinded -= deltaTime;
			if (this.m_slowed > 0) this.m_slowed -= deltaTime;
			if (this.m_stunned > 0) this.m_stunned -= deltaTime;
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_active == true) {
			var statusIconOffset = 0;
			if (this.m_blinded > 0) {
				this.m_blindedIcon.setPosition(cc.p(spriteX - 20 + statusIconOffset * 20, spriteY - 22));
				this.m_blindedIcon.setVisible (true);
				this.m_blindedIcon.setOpacity (255 * Math.abs(Math.sin(this.m_blinded * 3)));
				statusIconOffset ++;
			}
			else {
				this.m_blindedIcon.setVisible (false);
			}
			
			if (this.m_slowed > 0) {
				this.m_slowedIcon.setPosition(cc.p(spriteX - 20 + statusIconOffset * 20, spriteY - 22));
				this.m_slowedIcon.setVisible (true);
				this.m_slowedIcon.setOpacity (255 * Math.abs(Math.sin(this.m_slowed * 3)));
				statusIconOffset ++;
			}
			else {
				this.m_slowedIcon.setVisible (false);
			}
			
			if (this.m_stunned > 0) {
				this.m_stunnedIcon.setPosition(cc.p(spriteX - 20 + statusIconOffset * 20, spriteY - 22));
				this.m_stunnedIcon.setVisible (true);
				this.m_stunnedIcon.setOpacity (255 * Math.abs(Math.sin(this.m_stunned * 3)));
				statusIconOffset ++;
			}
			else {
				this.m_stunnedIcon.setVisible (false);
			}
		}
	}
	
	
	this.Shoot = function() {
		if (cooldownCount <= 0) {
			battle.SpawnProjectile (PROJECTILE_SHOCK, this.m_x, this.m_y, 0, this.m_level);
			cooldownCount += this.GetCooldown();
		}
	}
	
	
	
	this.GetRange = function() {
		if (this.m_blinded > 0) {
			return TURRET_SHOCK_RANGE[this.m_level] * BLIND_RANGE_MULTIPLIER;
		}
		else {
			return TURRET_SHOCK_RANGE[this.m_level];
		}
	}
	this.GetCooldown = function() {
		if (this.m_slowed > 0) {
			return TURRET_SHOCK_COOLDOWN[this.m_level] * SLOW_COOLDOWN_MULTIPLIER;
		}
		else {
			return TURRET_SHOCK_COOLDOWN[this.m_level];
		}
	}
	
	
	this.Blind = function (duration) {
		if (this.m_blinded < duration) this.m_blinded = duration;
	}
	this.Slow = function (duration) {
		if (this.m_slowed < duration) this.m_slowed = duration;
	}
	this.Stun = function (duration) {
		if (this.m_stunned < duration) this.m_stunned = duration;
	}
	
	
	
	
	
	this.GetSellPrice = function () {
		return (this.m_price * 0.5) >> 0;
	}
	this.Sell = function() {
		this.m_active = false;
		battle.m_money += this.GetSellPrice();
		this.Destroy();
	}
	this.Destroy = function () {
		layer.removeChild(this.m_turretSprite);
		layer.removeChild(this.m_blindedIcon);
		layer.removeChild(this.m_slowedIcon);
		layer.removeChild(this.m_stunnedIcon);
		
		PutIntoPool(this.m_turretSprite);
		PutIntoPool(this.m_blindedIcon);
		PutIntoPool(this.m_slowedIcon);
		PutIntoPool(this.m_stunnedIcon);
	}
}
