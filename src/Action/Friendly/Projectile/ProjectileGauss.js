var PROJECTILE_GAUSS = 5;
var PROJECTILE_GAUSS_DAMAGE = [800, 900, 1000, 1100, 1200];
var PROJECTILE_GAUSS_SPEED = [50, 50, 50, 50, 50];
var PROJECTILE_GAUSS_PIERCE = [1, 1, 1, 1, 1];
var PROJECTILE_GAUSS_CHECK_NUMBER = 5;

function ProjectileGauss(battle, layer, x, y, angle, owner) {
	this.m_type = PROJECTILE_GAUSS;
	
	this.m_live = true;
	this.m_x = x;
	this.m_y = y;
	this.m_angle = angle;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = GetFromPool("res/GSAction/Turret/5-Gauss/Projectile.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 1));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setRotation (this.m_angle);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_sprite);
	
	var travel = 0;
	var hitList = [];
	
	this.Update = function (deltaTime) {
		if (this.m_live == true) {
			for (var i=0; i<PROJECTILE_GAUSS_CHECK_NUMBER; i++) {
				this.m_x += this.GetSpeed() * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD) / PROJECTILE_GAUSS_CHECK_NUMBER;
				this.m_y += this.GetSpeed() * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD) / PROJECTILE_GAUSS_CHECK_NUMBER;
				
				
				if (this.m_x < -20 || this.m_y < -20 || this.m_x > battle.m_mapWidth + 20 || this.m_y > battle.m_mapHeight + 20) {
					this.Destroy();
					return;
				}
				
				this.CheckCollision();
			}
			
			travel += this.GetSpeed() * deltaTime * 60;
			if (travel > 1000) {
				travel = 1000;
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
			this.m_sprite.setTextureRect (cc.rect(0, 0, 50, travel));
			this.m_sprite.setContentSize (cc.size(50, travel));
		}
	}
	
	this.CheckCollision = function () {
		for (var i=0; i<battle.m_enemies.length; i++) {
			var tempEnemy = battle.m_enemies[i];
			if (hitList.indexOf (tempEnemy) == -1) {
				if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y) <= tempEnemy.m_size) {
					tempEnemy.Hit (this.GetDamage(), this.GetPierce());
					hitList.push (tempEnemy);
					return;
				}
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
	
	
	this.GetSpeed = function() {
		return PROJECTILE_GAUSS_SPEED[owner.m_level];
	}
	this.GetDamage = function() {
		return PROJECTILE_GAUSS_DAMAGE[owner.m_level];
	}
	this.GetPierce = function() {
		return PROJECTILE_GAUSS_PIERCE[owner.m_level];
	}
}