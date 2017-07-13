var PROJECTILE_BASE_LASER = 0;
var PROJECTILE_BASE_LASER_DAMAGE = 500;
var PROJECTILE_BASE_LASER_PIERCE = 1;
var PROJECTILE_BASE_LASER_FADE_SPEED = 255;

function ProjectileBaseLaser(battle, layer, owner) {
	this.m_type = PROJECTILE_BASE_LASER;
	
	this.m_target = null;
	
	this.m_sprite = GetFromPool("res/GSAction/Base/Laser.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setVisible (false);
	layer.addChild(this.m_sprite);
	
	this.m_tipSprite1 = GetFromPool("res/GSAction/Base/LaserTip.png");
	this.m_tipSprite1.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_tipSprite1.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_tipSprite1.setLocalZOrder (LAYER_PROJECTILE);
	this.m_tipSprite1.setVisible (false);
	layer.addChild(this.m_tipSprite1);
	
	this.m_tipSprite2 = GetFromPool("res/GSAction/Base/LaserTip.png");
	this.m_tipSprite2.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_tipSprite2.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_tipSprite2.setLocalZOrder (LAYER_PROJECTILE);
	this.m_tipSprite2.setVisible (false);
	layer.addChild(this.m_tipSprite2);
	
	
	
	var alphaDir = 0;
	var alpha = 0;
	
	
	this.Hide = function () {
		this.m_active = false;
		this.m_sprite.setVisible (false);
		this.m_tipSprite1.setVisible (false);
		this.m_tipSprite2.setVisible (false);
	}
	
	this.Show = function (x, y, target) {
		this.m_active = true;
		this.m_target = target;
		this.m_x = x;
		this.m_y = y;
		
		var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
		var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
		this.m_sprite.setPosition (cc.p(spriteX, spriteY));
		this.m_tipSprite1.setPosition (cc.p(spriteX, spriteY));
		
		var targetSpriteX = (target.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
		var targetSpriteY = (target.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
		this.m_tipSprite2.setPosition (cc.p(targetSpriteX, targetSpriteY));
		
		this.m_sprite.setVisible (true);
		this.m_tipSprite1.setVisible (true);
		this.m_tipSprite2.setVisible (true);
		
		if (this.m_target != null) {
			this.m_target.Hit (PROJECTILE_BASE_LASER_DAMAGE, PROJECTILE_BASE_LASER_PIERCE);
		}
		
		alpha = 255;
	}
	
	this.Update = function (deltaTime) {
		if (this.m_active == true) {
			alpha -= PROJECTILE_BASE_LASER_FADE_SPEED * deltaTime;
			if (alpha <= 0) {
				alpha = 0;
				this.m_active = false;
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_active == true) {
			var targetAngle = AngleBetweenTwoPoint (this.m_x, this.m_y, this.m_target.m_x, this.m_target.m_y);
			var targetDistance = DistanceBetweenTwoPoint (this.m_x, this.m_y, this.m_target.m_x, this.m_target.m_y);
			
			this.m_sprite.setRotation (targetAngle);
			this.m_sprite.setScaleY (targetDistance);
			this.m_sprite.setOpacity (alpha);
			
			this.m_tipSprite1.setOpacity (alpha);
			this.m_tipSprite2.setOpacity (alpha);
		}
	}
	
	this.Destroy = function() {
		if (this.m_live == true) {
			this.m_live = false;
			layer.removeChild(this.m_sprite);
			layer.removeChild(this.m_tipSprite1);
			layer.removeChild(this.m_tipSprite2);
			
			PutIntoPool(this.m_sprite);
			PutIntoPool(this.m_tipSprite1);
			PutIntoPool(this.m_tipSprite2);
		}
	}
}