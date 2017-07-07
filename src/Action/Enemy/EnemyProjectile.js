var ENEMY_PROJECTILE_RED_LASER = 1;

function EnemyProjectile(battle, layer, type, x, y, angle, damage, speed) {
	this.m_live = true;
	this.m_type = type;
	this.m_x = x;
	this.m_y = y;
	this.m_angle = angle;
	this.m_damage = damage;
	this.m_speed = speed;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = GetFromPool("res/GSAction/EnemyProjectile/" + type + ".png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setRotation(this.m_angle);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_sprite);
	
	this.Update = function (deltaTime) {
		if (this.m_live == true) {
			this.m_x += this.m_speed * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
			this.m_y += this.m_speed * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
			
			if (DistanceBetweenTwoPoint(this.m_x, this.m_y, battle.m_base.m_x, battle.m_base.m_y) < 1) {
				this.Destroy();
				if (this.m_type == ENEMY_PROJECTILE_RED_LASER) {
					battle.SpawnExplosion (EXPLOSION_RING_RED, 1, this.m_x, this.m_y);
				}
				battle.m_base.Hit (this.m_damage);
			}
			else {
				if (this.m_x < -1 || this.m_y < -1 || this.m_x > battle.m_mapWidth + 1 || this.m_y > battle.m_mapHeight + 1) {
					this.Destroy();
				}
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			
			this.m_sprite.setRotation(this.m_angle);
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
		}
	}
	
	this.Destroy = function() {
		this.m_live = false;
		layer.removeChild(this.m_sprite);
		PutIntoPool(this.m_sprite);
	}
}