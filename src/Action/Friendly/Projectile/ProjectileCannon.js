var PROJECTILE_CANNON = 2;
var PROJECTILE_CANNON_DAMAGE = [300, 350, 400, 450, 500];
var PROJECTILE_CANNON_SPEED = [10, 11, 12, 13, 14];
var PROJECTILE_CANNON_PIERCE = [0.2, 0.25, 0.3, 0.35, 0.4];
var PROJECTILE_CANNON_AOE = [1, 1.2, 1.5, 1.7, 2];
var PROJECTILE_CANNON_AOE_DAMAGE = [60, 80, 100, 120, 140];
var PROJECTILE_CANNON_AOE_PIERCE = [0, 0, 0, 0, 0];

function ProjectileCannon(battle, layer, x, y, angle, level) {
	var KILL_DELAY = 2;
	this.m_type = PROJECTILE_CANNON;
	
	this.m_live = true;
	this.m_x = x;
	this.m_y = y;
	this.m_angle = angle;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = GetFromPool("res/GSAction/Turret/2-Cannon/Projectile.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setRotation(this.m_angle);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_sprite);
	
	this.m_trailParticle = cc.ParticleSystem.create("res/GSAction/Turret/2-Cannon/Particle.plist");
	this.m_trailParticle.setLocalZOrder (LAYER_PROJECTILE);
	this.m_trailParticle.setBlendAdditive (true);
	this.m_trailParticle.setAutoRemoveOnFinish (true);
	this.m_trailParticle.setPositionType(cc.ParticleSystem.TYPE_RELATIVE);
	this.m_trailParticle.resetSystem();
	layer.addChild(this.m_trailParticle);
	battle.RegisterEmitter (this.m_trailParticle);
	
	this.m_markForKill = false;
	this.m_killDelayCount = 0;
	
	
	this.Update = function (deltaTime) {
		if (this.m_live == true && this.m_markForKill == false) {
			this.m_x += PROJECTILE_CANNON_SPEED[level] * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
			this.m_y += PROJECTILE_CANNON_SPEED[level] * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
			
			
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
				
				battle.SpawnExplosion (EXPLOSION_FIRE_BLUE, 1, this.m_x, this.m_y);
				tempEnemy.Hit (PROJECTILE_CANNON_DAMAGE[level], PROJECTILE_CANNON_PIERCE[level]);
				
				for (var j=0; j<battle.m_enemies.length; j++) {
					if (i != j) {
						var tempEnemy2 = battle.m_enemies[j];
						if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy2.m_x, tempEnemy2.m_y) <= tempEnemy.m_size + PROJECTILE_CANNON_AOE[level]) {
							tempEnemy2.Hit (PROJECTILE_CANNON_AOE_DAMAGE[level], PROJECTILE_CANNON_AOE_PIERCE[level]);
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
			PutIntoPool(this.m_sprite);
			battle.UnregisterEmitter (this.m_trailParticle);
		}
	}
}