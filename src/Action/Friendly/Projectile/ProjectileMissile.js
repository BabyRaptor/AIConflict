var PROJECTILE_MISSILE = 3;
var PROJECTILE_MISSILE_DAMAGE = [500, 600, 700, 800, 900];
var PROJECTILE_MISSILE_SPEED = [6, 7, 8, 9, 10];
var PROJECTILE_MISSILE_PIERCE = [0, 0, 0, 0, 0];
var PROJECTILE_MISSILE_AOE = [2, 2.1, 2.2, 2.3, 2.4];
var PROJECTILE_MISSILE_AOE_DAMAGE = [500, 600, 700, 800, 900];
var PROJECTILE_MISSILE_AOE_PIERCE = [0, 0, 0, 0, 0];
var PROJECTILE_MISSILE_ROTATION_SPEED = [80, 90, 100, 110, 120];

var PROJECTILE_MISSILE_SCAN_ANGLE = 45;

function ProjectileMissile(battle, layer, x, y, angle, owner, target) {
	var KILL_DELAY = 2;
	this.m_type = PROJECTILE_MISSILE;
	
	this.m_live = true;
	this.m_x = x;
	this.m_y = y;
	this.m_angle = angle;
	this.m_target = target;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = g_spritePool.GetSpriteFromPool("res/GSAction/Turret/3-Missile/Projectile.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setRotation(this.m_angle);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_sprite);
	
	this.m_trailParticle = g_emitterPool.GetEmitterFromPool("res/GSAction/Turret/3-Missile/Particle.plist", layer);
	this.m_trailParticle.setLocalZOrder (LAYER_PROJECTILE);
	this.m_trailParticle.setBlendAdditive (true);
	this.m_trailParticle.setPositionType(cc.ParticleSystem.TYPE_RELATIVE);
	battle.RegisterEmitter (this.m_trailParticle);
	
	this.m_markForKill = false;
	this.m_killDelayCount = 0;
	
	
	this.Update = function (deltaTime) {
		if (this.m_live == true && this.m_markForKill == false) {
			if (this.m_target != null) {
				var targetAngle = AngleBetweenTwoPoint (this.m_x, this.m_y, this.m_target.m_x, this.m_target.m_y);
				var rotateAmount = this.GetRotationSpeed() * deltaTime;
				if (Math.abs(targetAngle - this.m_angle) <= PROJECTILE_MISSILE_SCAN_ANGLE) {
					if (targetAngle > this.m_angle + rotateAmount) {
						this.m_angle += rotateAmount;
					}
					else if (targetAngle < this.m_angle - rotateAmount) {
						this.m_angle -= rotateAmount;
					}
					else {
						this.m_angle = targetAngle;
					}
				}
				else {
					this.m_target = null;
				}
				
				if (this.m_target!= null && this.m_target.m_live == false) {
					this.m_target = null;
				}
			}
			
			this.m_x += this.GetSpeed() * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
			this.m_y += this.GetSpeed() * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
			
			
			if (this.m_x < -5 || this.m_y < -5 || this.m_x > battle.m_mapWidth + 5 || this.m_y > battle.m_mapHeight + 5) {
				this.m_markForKill = true;
				this.m_sprite.setVisible (false);
				this.m_trailParticle.stopSystem();
			}
			
			this.CheckCollision();
		}
		else if (this.m_live == true && this.m_markForKill == true) {
			this.m_killDelayCount += deltaTime;
			if (this.m_killDelayCount >= KILL_DELAY) {
				this.Destroy();
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true && this.m_markForKill == false) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
			this.m_sprite.setRotation(this.m_angle);
			this.m_trailParticle.setPosition (cc.p(spriteX, spriteY));
		}
	}
	
	this.CheckCollision = function () {
		for (var i=0; i<battle.m_enemies.length; i++) {
			var tempEnemy = battle.m_enemies[i];
			if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y) <= tempEnemy.m_size) {
				this.m_markForKill = true;
				this.m_sprite.setVisible (false);
				this.m_trailParticle.stopSystem();

				
				battle.SpawnExplosion (EXPLOSION_FIRE_BLUE, 1.2, this.m_x, this.m_y);
				tempEnemy.Hit (this.GetDamage(), this.GetPierce());
				
				for (var j=0; j<battle.m_enemies.length; j++) {
					if (i != j) {
						var tempEnemy2 = battle.m_enemies[j];
						if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy2.m_x, tempEnemy2.m_y) <= tempEnemy.m_size + PROJECTILE_MISSILE_AOE[owner.m_level]) {
							tempEnemy2.Hit (this.GetAOEDamage(), this.GetAOEPierce());
						}
					}
				}
				return;
			}
		}
	}
	
	this.Destroy = function() {
		if (this.m_live == true) {
			this.m_live = false;
			
			layer.removeChild(this.m_sprite);
			g_spritePool.PutSpriteIntoPool(this.m_sprite);
			
			//layer.removeChild(this.m_trailParticle); // Don't fucking remove the particle
			g_emitterPool.PutEmitterToPool(this.m_trailParticle);
			battle.UnregisterEmitter (this.m_trailParticle);
		}
	}
	
	
	this.GetSpeed = function() {
		return PROJECTILE_MISSILE_SPEED[owner.m_level];
	}
	this.GetRotationSpeed = function() {
		return PROJECTILE_MISSILE_ROTATION_SPEED;
	}
	this.GetDamage = function() {
		return PROJECTILE_MISSILE_DAMAGE[owner.m_level];
	}
	this.GetAOEDamage = function() {
		return PROJECTILE_MISSILE_AOE_DAMAGE[owner.m_level];
	}
	this.GetPierce = function() {
		return PROJECTILE_MISSILE_PIERCE[owner.m_level];
	}
	this.GetAOEPierce = function() {
		return PROJECTILE_MISSILE_AOE_PIERCE[owner.m_level];
	}
	this.GetAOE = function() {
		return PROJECTILE_MISSILE_AOE[owner.m_level]
	}
}