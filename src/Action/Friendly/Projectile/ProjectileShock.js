var PROJECTILE_SHOCK = 7;
var PROJECTILE_SHOCK_DAMAGE = [200, 275, 350, 425, 500];
var PROJECTILE_SHOCK_SPEED = [10, 10, 10, 10, 10];
var PROJECTILE_SHOCK_PIERCE = [0, 0, 0, 0, 0];


var PROJECTILE_SHOCK_FRAME_SIZE = 200;
var PROJECTILE_SHOCK_FADE_SPEED = 400;

function ProjectileShock(battle, layer, x, y, angle, owner) {
	this.m_type = PROJECTILE_SHOCK;
	
	this.m_live = true;
	this.m_x = x;
	this.m_y = y;
	this.m_extend = 0;
	this.m_alpha = 255;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = g_spritePool.GetSpriteFromPool("res/GSAction/Turret/7-Shock/Shock.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	this.m_sprite.setScale (0);
	
	layer.addChild(this.m_sprite);
	
	var hitList = [];
	
	
	this.Update = function (deltaTime) {
		if (this.m_live == true) {
			if (this.m_extend < this.GetAOE()) {
				this.m_extend += this.GetSpeed() * deltaTime;
				
				if (this.m_extend > this.GetAOE()) {
					this.m_extend = this.GetAOE();
				}
				
				for (var i=0; i<battle.m_enemies.length; i++) {
					var tempEnemy = battle.m_enemies[i];
					if (tempEnemy.m_live == true && hitList.indexOf (tempEnemy) == -1) {
						if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y) <= this.m_extend + tempEnemy.m_size) {
							tempEnemy.Hit (this.GetDamage(), this.GetPierce());
							hitList.push (tempEnemy);
						}
					}
				}
			}
			else {
				this.m_alpha -= deltaTime * PROJECTILE_SHOCK_FADE_SPEED;
				if (this.m_alpha <= 0) {
					this.Destroy();
				}
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true) {
			this.m_sprite.setScale (this.m_extend * BLOCK_SIZE * 2 / PROJECTILE_SHOCK_FRAME_SIZE);
			this.m_sprite.setOpacity (this.m_alpha);
		}
	}
	
	this.Destroy = function() {
		if (this.m_live == true) {
			this.m_live = false;
			layer.removeChild(this.m_sprite);
			g_spritePool.PutSpriteIntoPool(this.m_sprite);
		}
	}
	
	this.GetSpeed = function() {
		return PROJECTILE_SHOCK_SPEED[owner.m_level];
	}
	this.GetDamage = function() {
		return PROJECTILE_SHOCK_DAMAGE[owner.m_level];
	}
	this.GetPierce = function() {
		return PROJECTILE_SHOCK_PIERCE[owner.m_level];
	}
	this.GetAOE = function() {
		return TURRET_SHOCK_RANGE[owner.m_level]
	}
}