var PROJECTILE_GATLING = 1;
var PROJECTILE_GATLING_DAMAGE = [10, 12, 14, 16, 20];
var PROJECTILE_GATLING_SPEED = [14, 15, 16, 17, 18];
var PROJECTILE_GATLING_PIERCE = [0, 0.05, 0.1, 0.15, 0.2];

function ProjectileGatling(battle, layer, x, y, angle, level) {
	this.m_type = PROJECTILE_GATLING;
	
	this.m_live = true;
	this.m_x = x;
	this.m_y = y;
	this.m_angle = angle;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = GetFromPool("res/GSAction/Turret/1-Gatling/Projectile.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setRotation (this.m_angle);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_sprite);
	
	
	this.Update = function (deltaTime) {
		if (this.m_live == true) {
			this.m_x += PROJECTILE_GATLING_SPEED[level] * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
			this.m_y += PROJECTILE_GATLING_SPEED[level] * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
			
			
			if (this.m_x < -1 || this.m_y < -1 || this.m_x > battle.m_mapWidth + 1 || this.m_y > battle.m_mapHeight + 1) {
				this.Destroy();
			}
			
			this.CheckCollision();
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
		}
	}
	
	this.CheckCollision = function () {
		for (var i=0; i<battle.m_enemies.length; i++) {
			var tempEnemy = battle.m_enemies[i];
			if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y) <= tempEnemy.m_size) {
				this.Destroy();
				battle.SpawnExplosion (EXPLOSION_GATLING, 1.2, this.m_x, this.m_y);
				tempEnemy.Hit (PROJECTILE_GATLING_DAMAGE[level], PROJECTILE_GATLING_PIERCE[level]);
				return;
			}
		}
	}
	
	this.Destroy = function() {
		if (this.m_live == true) {
			this.m_live = false;
			layer.removeChild(this.m_sprite);
			PutIntoPool(this.m_sprite);
		}
	}
}