var PROJECTILE_STATIC = 6;
var PROJECTILE_STATIC_DAMAGE = [300, 420, 525, 640, 750];
var PROJECTILE_STATIC_SPEED = [3, 3, 3, 3, 3];
var PROJECTILE_STATIC_PIERCE = [0, 0, 0, 0, 0];
var PROJECTILE_STATIC_AOE = [3, 3.25, 3.5, 3.75, 4];


var PROJECTILE_STATIC_FRAME_NUMBER = 4;
var PROJECTILE_STATIC_FRAME_SIZE = 50;
var PROJECTILE_STATIC_FRAME_DURATION = 0.032;

function ProjectileStatic(battle, layer, x, y, angle, owner) {
	this.m_type = PROJECTILE_STATIC;
	
	this.m_live = true;
	this.m_x = x;
	this.m_y = y;
	this.m_angle = angle;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = g_spritePool.GetSpriteFromPool("res/GSAction/Turret/6-Static/Projectile.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setRotation (this.m_angle);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	this.m_sprite.setTextureRect (cc.rect(0, 0, PROJECTILE_STATIC_FRAME_SIZE, PROJECTILE_STATIC_FRAME_SIZE));
	layer.addChild(this.m_sprite);
	
	this.m_sparkList = new Array();
	
	
	var frame = 0;
	var frameCount = 0;
	
	this.Update = function (deltaTime) {
		if (this.m_live == true) {
			this.m_x += this.GetSpeed() * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
			this.m_y += this.GetSpeed() * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
			
			if (this.m_x < -1 || this.m_y < -1 || this.m_x > battle.m_mapWidth + 1 || this.m_y > battle.m_mapHeight + 1) {
				this.Destroy();
			}
			
			frameCount += deltaTime;
			if (frameCount >= PROJECTILE_STATIC_FRAME_DURATION) {
				frameCount -= PROJECTILE_STATIC_FRAME_DURATION;
				frame ++;
				if (frame >= PROJECTILE_STATIC_FRAME_NUMBER) {
					frame = 0;
				}
			}
			
			for (var i=0; i<battle.m_enemies.length; i++) {
				var tempEnemy = battle.m_enemies[i];
				if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y) <= this.GetAOE() + tempEnemy.m_size) {
					tempEnemy.Hit (this.GetDamage() * deltaTime, this.GetPierce());
					
					var alreadyATarget = false;
					for (var j=0; j<this.m_sparkList.length; j++) {
						if (this.m_sparkList[j].m_target == tempEnemy) {
							alreadyATarget = true;
							break;
						}
					}
					
					if (!alreadyATarget) {
						var sparkFound = false;
						for (var j=0; j<this.m_sparkList.length; j++) {
							if (!this.m_sparkList[j].m_active) {
								this.m_sparkList[j].Spawn (tempEnemy, owner.m_level);
								sparkFound = true;
								break;
							}
						}
						
						if (!sparkFound) {
							var tempSpark = new StaticSpark(battle, layer, this);
							this.m_sparkList.push (tempSpark);
							tempSpark.Spawn (tempEnemy, owner.m_level);
						}
					}
				}
			}
			
			for (var i=0; i<this.m_sparkList.length; i++) {
				this.m_sparkList[i].Update(deltaTime);
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
			this.m_sprite.setTextureRect (cc.rect(frame * PROJECTILE_STATIC_FRAME_SIZE, 0, PROJECTILE_STATIC_FRAME_SIZE, PROJECTILE_STATIC_FRAME_SIZE));
			
			for (var i=0; i<this.m_sparkList.length; i++) {
				this.m_sparkList[i].UpdateVisual();
			}
		}
	}
	
	this.Destroy = function() {
		this.m_live = false;
		layer.removeChild(this.m_sprite);
		g_spritePool.PutSpriteIntoPool(this.m_sprite);
		
		for (var i=0; i<this.m_sparkList.length; i++) {
			this.m_sparkList[i].Destroy();
		}
	}
	
	
	this.GetSpeed = function() {
		return PROJECTILE_STATIC_SPEED[owner.m_level];
	}
	this.GetDamage = function() {
		return PROJECTILE_STATIC_DAMAGE[owner.m_level];
	}
	this.GetPierce = function() {
		return PROJECTILE_STATIC_PIERCE[owner.m_level];
	}
	this.GetAOE = function() {
		return PROJECTILE_STATIC_AOE[owner.m_level];
	}
}


var STATIC_SPARK_FRAME_NUMBER = 8;
var STATIC_SPARK_FRAME_SIZE = 50;
var STATIC_SPARK_FRAME_DURATION = 0.032;

function StaticSpark(battle, layer, owner) {
	this.m_active = false;
	
	this.m_sprite = g_spritePool.GetSpriteFromPool("res/GSAction/Turret/6-Static/Spark.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setTextureRect (cc.rect(0, 0, STATIC_SPARK_FRAME_SIZE, STATIC_SPARK_FRAME_SIZE));
	this.m_sprite.retain();
	this.m_sprite.setVisible (false);
	layer.addChild(this.m_sprite);
	
	this.m_target = null;
	this.m_level = 0;
	
	var frame = 0;
	var frameCount = 0;
	
	
	this.Spawn = function (target, level) {
		this.m_active = true;
		this.m_target = target;
		this.m_level = level;
		this.m_sprite.setVisible (true);
	}
	this.Update = function (deltaTime) {
		if (this.m_active) {
			frameCount += deltaTime;
			if (frameCount >= STATIC_SPARK_FRAME_DURATION) {
				frameCount -= STATIC_SPARK_FRAME_DURATION;
				frame ++;
				if (frame >= STATIC_SPARK_FRAME_NUMBER) {
					frame = 0;
				}
			}
			
			var targetDistance = DistanceBetweenTwoPoint (owner.m_x, owner.m_y, this.m_target.m_x, this.m_target.m_y);
			if (targetDistance > PROJECTILE_STATIC_AOE[this.m_level] + this.m_target.m_size) {
				this.m_active = false;
				this.m_sprite.setVisible (false);
				this.m_target = null;
			}
			else if (this.m_target.m_HP <= 0) {
				this.m_active = false;
				this.m_sprite.setVisible (false);
				this.m_target = null;
			}
			
		}
	}
	this.UpdateVisual = function () {
		if (this.m_active) {
			var targetAngle = AngleBetweenTwoPoint (owner.m_x, owner.m_y, this.m_target.m_x, this.m_target.m_y);
			var targetDistance = DistanceBetweenTwoPoint (owner.m_x, owner.m_y, this.m_target.m_x, this.m_target.m_y);
			var spriteX = (owner.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			var spriteY = (owner.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			
			this.m_sprite.setRotation (targetAngle);
			this.m_sprite.setScaleY (targetDistance * 1.2);
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
			this.m_sprite.setTextureRect (cc.rect(frame * STATIC_SPARK_FRAME_SIZE, 0, STATIC_SPARK_FRAME_SIZE, STATIC_SPARK_FRAME_SIZE));
		}
	}
	this.Destroy = function () {
		layer.removeChild(this.m_sprite);
		g_spritePool.PutSpriteIntoPool(this.m_sprite);
	}
}