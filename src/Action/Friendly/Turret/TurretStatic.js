var TURRET_STATIC_NAME = "Static charger";
var TURRET_STATIC = 6;
var TURRET_STATIC_PRICE = [400, 200, 250, 300, 350];
var TURRET_STATIC_PATROL_SPEED = [30, 30, 30, 30, 30];
var TURRET_STATIC_ROTATE_SPEED = [150, 160, 170, 180, 190];
var TURRET_STATIC_RANGE = [8, 9, 10, 11, 12];
var TURRET_STATIC_RECOIL = [9, 9, 9, 9, 9];
var TURRET_STATIC_COOLDOWN = [5, 5, 5, 5, 5];

// Do nothing, just for display purpose
var TURRET_STATIC_ACCURACY = [30, 30, 30, 30, 30];

function TurretStatic (battle, layer, x, y) {
	var SHADOW_OFFSET = 10;
	var PATROL_STAY_TIME = 5;
	
	// Properties
	this.m_active = true;
	this.m_type = TURRET_STATIC;
	
	this.m_x = x;
	this.m_y = y;
	this.m_level = 0;
	this.m_price = TURRET_STATIC_PRICE[0];
	
		
	this.m_target = null;
	this.m_targetAngle = Math.random() * 360;
	this.m_angle = Math.random() * 360;
	
	// Sprite
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	this.m_baseSprite = GetFromPool("res/GSAction/Turret/6-Static/Base.png");
	this.m_baseSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_baseSprite.setLocalZOrder (LAYER_TOWER_BASE);
	this.m_baseSprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_baseSprite);
	
	this.m_shadowSprite = GetFromPool("res/GSAction/Turret/6-Static/Shadow.png");
	this.m_shadowSprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_shadowSprite.setLocalZOrder (LAYER_TOWER_SHADOW);
	this.m_shadowSprite.setRotation(this.m_angle);
	this.m_shadowSprite.setPosition (cc.p(spriteX + TURRET_SHADOW_OFFSET, spriteY - TURRET_SHADOW_OFFSET));
	layer.addChild(this.m_shadowSprite);
	
	this.m_turretSprite = GetFromPool("res/GSAction/Turret/6-Static/Turret.png");
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
	var newPatrolAngleCount = 0;
	
	// Status effect
	this.m_blinded = 0;
	this.m_slowed = 0;
	this.m_stunned = 0;
	
	// Display info
	this.m_designPath = "res/GSAction/Turret/6-Static/Design.png";
	this.m_name = TURRET_STATIC_NAME;
	
	this.m_damageBar = [7, 7, 8, 8, 9];
	this.m_fireRateBar = [1, 1, 1, 2, 2];
	this.m_piercingBar = [1, 1, 1, 1, 1];
	this.m_rangeBar = [4, 5, 5, 6, 6];
	this.m_aoeBar = [8, 8, 9, 9, 10];
	
	this.MoneyRequireForNextLevel = function() {
		if (this.m_level < TURRET_STATIC_PRICE.length - 1) {
			return TURRET_STATIC_PRICE[this.m_level + 1];
		}
		return null;
	}
	
	this.Upgrade = function () {
		if (this.m_level < TURRET_STATIC_PRICE.length - 1) {
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
				var rotateAmount = 0;
				if (this.m_target == null) {
					rotateAmount = TURRET_STATIC_PATROL_SPEED[this.m_level] * deltaTime;
					if (Math.abs(this.m_targetAngle - this.m_angle) <= 180) {
						if (this.m_targetAngle > this.m_angle + rotateAmount) {
							this.m_angle += rotateAmount;
						}
						else if (this.m_targetAngle < this.m_angle - rotateAmount) {
							this.m_angle -= rotateAmount;
						}
						else {
							this.m_angle = this.m_targetAngle;
							newPatrolAngleCount += deltaTime;
							if (newPatrolAngleCount >= PATROL_STAY_TIME) {
								this.m_targetAngle = Math.random() * 360;
								newPatrolAngleCount = 0;
							}
						}
					}
					else {
						if (this.m_targetAngle > this.m_angle) this.m_angle -= rotateAmount;
						else if (this.m_targetAngle < this.m_angle) this.m_angle += rotateAmount;
					}
					this.ScanForTarget();
				}
				else {
					if (DistanceBetweenTwoPoint (this.m_x, this.m_y, this.m_target.m_x, this.m_target.m_y) > this.GetRange()) {
						this.m_target = null;
					}
					else if (this.m_target.m_live == false) {
						this.m_target = null;
					}
					else {
						this.m_targetAngle = AngleBetweenTwoPoint (this.m_x, this.m_y, this.m_target.m_x, this.m_target.m_y);
					}
					
					if (this.m_target != null) {
						rotateAmount = this.GetRotateSpeed() * deltaTime;
						if (Math.abs(this.m_targetAngle - this.m_angle) <= 180) {
							if (this.m_targetAngle > this.m_angle + rotateAmount) {
								this.m_angle += rotateAmount;
							}
							else if (this.m_targetAngle < this.m_angle - rotateAmount) {
								this.m_angle -= rotateAmount;
							}
							else {
								this.m_angle = this.m_targetAngle;
								this.Shoot();
							}
						}
						else {
							if (this.m_targetAngle > this.m_angle) this.m_angle -= rotateAmount;
							else if (this.m_targetAngle < this.m_angle) this.m_angle += rotateAmount;
						}
					}
				}
			
				if (this.m_angle > 360) this.m_angle -= 360;
				if (this.m_angle < 0) this.m_angle += 360;
				
				
				if (cooldownCount > 0) {
					cooldownCount -= deltaTime;
				}
			}
			
			if (this.m_blinded > 0) this.m_blinded -= deltaTime;
			if (this.m_slowed > 0) this.m_slowed -= deltaTime;
			if (this.m_stunned > 0) this.m_stunned -= deltaTime;
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_active == true) {
			this.m_shadowSprite.setRotation(this.m_angle);
			this.m_turretSprite.setRotation(this.m_angle);
				
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
	
	this.Shoot = function() {
		if (cooldownCount <= 0) {
			var angle = this.m_angle + (1 - Math.random() * 2) * this.GetRecoil();
			battle.SpawnProjectile (PROJECTILE_STATIC, this.m_x, this.m_y, angle, this.m_level);
			cooldownCount += this.GetCooldown();
		}
	}
	
	
	
	this.GetRange = function() {
		if (this.m_blinded > 0) {
			return TURRET_STATIC_RANGE[this.m_level] * BLIND_RANGE_MULTIPLIER;
		}
		else {
			return TURRET_STATIC_RANGE[this.m_level];
		}
	}
	this.GetRecoil = function() {
		if (this.m_blinded > 0) {
			return TURRET_STATIC_RECOIL[this.m_level] * BLIND_RECOIL_MULTIPLIER;
		}
		else {
			return TURRET_STATIC_RECOIL[this.m_level];
		}
	}
	this.GetRotateSpeed = function() {
		if (this.m_slowed > 0) {
			return TURRET_STATIC_ROTATE_SPEED[this.m_level] * SLOW_ROTATE_MULTIPLIER;
		}
		else {
			return TURRET_STATIC_ROTATE_SPEED[this.m_level];
		}
	}
	this.GetCooldown = function() {
		if (this.m_slowed > 0) {
			return TURRET_STATIC_COOLDOWN[this.m_level] * SLOW_COOLDOWN_MULTIPLIER;
		}
		else {
			return TURRET_STATIC_COOLDOWN[this.m_level];
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
		layer.removeChild(this.m_baseSprite);
		layer.removeChild(this.m_shadowSprite);
		layer.removeChild(this.m_turretSprite);
		layer.removeChild(this.m_blindedIcon);
		layer.removeChild(this.m_slowedIcon);
		layer.removeChild(this.m_stunnedIcon);
		
		PutIntoPool(this.m_baseSprite);
		PutIntoPool(this.m_shadowSprite);
		PutIntoPool(this.m_turretSprite);
		PutIntoPool(this.m_blindedIcon);
		PutIntoPool(this.m_slowedIcon);
		PutIntoPool(this.m_stunnedIcon);
	}
}
