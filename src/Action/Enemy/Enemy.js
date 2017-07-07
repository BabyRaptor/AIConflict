var COMMAND_FOLLOW_WAYPOINT = 0;
var COMMAND_MOVE_TO_TARGET = 1;
var COMMAND_ATTACK_TARGET = 2;


var HP_BAR_LENGTH_MULTIPLIER = 100;
var HP_BAR_OFFSET_Y = 70;

var ENEMY_SHOOTING_ACCURACY = 10; // More is less

function Enemy(battle, layer, area, type, path, modifier) {
	this.m_live = true;
	this.m_path = path;
	this.m_area = area;
	this.m_type = type;
	
	this.m_HP = (g_enemyData[area][type].m_HP * modifier) >> 0;
	this.m_maxHP = (g_enemyData[area][type].m_HP * modifier) >> 0;
	this.m_armor = g_enemyData[area][type].m_armor;
	this.m_moveSpeed = g_enemyData[area][type].m_moveSpeed;
	this.m_rotateSpeed = g_enemyData[area][type].m_rotateSpeed;
	this.m_cooldown = g_enemyData[area][type].m_cooldown;
	this.m_size = g_enemyData[area][type].m_size;
	this.m_damage = g_enemyData[area][type].m_damage;
	this.m_projectileType = g_enemyData[area][type].m_projectileType;
	this.m_projectileSpeed = g_enemyData[area][type].m_projectileSpeed;
	this.m_bounty = g_enemyData[area][type].m_bounty;
	
	this.m_skill = g_enemyData[area][type].m_skill;
	this.m_skillAOE = g_enemyData[area][type].m_skillAOE;
	this.m_skillRate = g_enemyData[area][type].m_skillRate;

	this.m_command = COMMAND_FOLLOW_WAYPOINT;
	this.m_x = path[0].x;
	this.m_y = path[0].y;
	this.m_target = path[1];
	this.m_angle = AngleBetweenTwoPoint(path[0].x, path[0].y, path[1].x, path[1].y);
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = GetFromPool("res/GSAction/Enemy/Area-" + area + "/" + type + ".png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setLocalZOrder (LAYER_ENEMY + 3);
	this.m_sprite.setRotation(this.m_angle);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	layer.addChild(this.m_sprite);
	
	var HPMaxLength = this.m_size * HP_BAR_LENGTH_MULTIPLIER;
	
	this.m_HPBarRed = GetFromPool("res/GSAction/Enemy/HPBar.png");
	this.m_HPBarRed.setTextureRect (cc.rect(0, 0, 1, 4));
	this.m_HPBarRed.setAnchorPoint(cc.p(0, 0.5));
	this.m_HPBarRed.setLocalZOrder (LAYER_ENEMY + 4);
	this.m_HPBarRed.setPosition (cc.p(spriteX - HPMaxLength * 0.5, spriteY + (this.m_size * HP_BAR_OFFSET_Y) >> 0));
	this.m_HPBarRed.setScaleX (HPMaxLength);
	layer.addChild(this.m_HPBarRed);
	
	this.m_HPBarGreen = GetFromPool("res/GSAction/Enemy/HPBar.png");
	this.m_HPBarGreen.setTextureRect (cc.rect(0, 4, 1, 4));
	this.m_HPBarGreen.setAnchorPoint(cc.p(0, 0.5));
	this.m_HPBarGreen.setLocalZOrder (LAYER_ENEMY + 4);
	this.m_HPBarGreen.setPosition (cc.p(spriteX - HPMaxLength * 0.5, spriteY + (this.m_size * HP_BAR_OFFSET_Y) >> 0));
	this.m_HPBarGreen.setScaleX (HPMaxLength);
	layer.addChild(this.m_HPBarGreen);
	
	var targetIndex = 1;
	var cooldownCount = 0;
	
	if (this.m_skill != ENEMY_SKILL_NONE) {
		this.m_skillObject = new EnemySkill(battle, layer, this.m_skill, this, this.m_skillAOE, this.m_skillRate, modifier);
	}
	
	this.Update = function (deltaTime) {
		if (this.m_live == true) {
			targetAngle = AngleBetweenTwoPoint(this.m_x, this.m_y, this.m_target.x, this.m_target.y);
			var rotateAmount = this.m_rotateSpeed * deltaTime;
			if (Math.abs(targetAngle - this.m_angle) <= 180) {
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
				if (targetAngle > this.m_angle) this.m_angle -= rotateAmount;
				else if (targetAngle < this.m_angle) this.m_angle += rotateAmount;
			}
			
			if (this.m_angle > 360) this.m_angle -= 360;
			if (this.m_angle < 0) this.m_angle += 360;
			
			if (this.m_command == COMMAND_FOLLOW_WAYPOINT) {
				this.m_x += this.m_moveSpeed * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
				this.m_y += this.m_moveSpeed * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
				
				if (Math.abs(this.m_x - this.m_target.x) < 2 && Math.abs(this.m_y - this.m_target.y) < 2) {
					targetIndex ++;
					if (targetIndex < this.m_path.length) {
						this.m_target = this.m_path[targetIndex];
					}
					else {
						var decisionAngle = Math.random() * 360;
						var targetX = battle.m_base.m_x + 3 * Math.sin(decisionAngle * DEG_TO_RAD);
						var targetY = battle.m_base.m_y + 3 * Math.cos(decisionAngle * DEG_TO_RAD);
						
						this.m_target = cc.p(targetX, targetY);
						this.m_command = COMMAND_MOVE_TO_TARGET;
					}
				}
			}
			else if (this.m_command == COMMAND_MOVE_TO_TARGET) {
				var speedMultiplier = DistanceBetweenTwoPoint (this.m_x, this.m_y, this.m_target.x, this.m_target.y) / 6;
				if (speedMultiplier > 0.9) speedMultiplier = 0.9;
				
				var actualSpeed = this.m_moveSpeed * (0.1 + speedMultiplier);
				this.m_x += actualSpeed * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
				this.m_y += actualSpeed * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
				
				if (Math.abs(this.m_x - this.m_target.x) < 1 && Math.abs(this.m_y - this.m_target.y) < 1) {
					this.m_command = COMMAND_ATTACK_TARGET;
					this.m_target = cc.p(battle.m_base.m_x, battle.m_base.m_y);
				}
			}
			else if (this.m_command == COMMAND_ATTACK_TARGET) {
				if (this.m_angle == targetAngle) {
					if (cooldownCount >= this.m_cooldown) {
						cooldownCount = 0;
						this.Shoot();
					}
				}
			}
			
			if (cooldownCount < this.m_cooldown) {
				cooldownCount += deltaTime;
			}
			
			if (this.m_skill != ENEMY_SKILL_NONE) {
				this.m_skillObject.Update(deltaTime);
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			
			this.m_sprite.setRotation(this.m_angle);
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
			
			this.m_HPBarRed.setPosition (cc.p(spriteX - HPMaxLength * 0.5, spriteY + (this.m_size * HP_BAR_OFFSET_Y) >> 0));
			this.m_HPBarGreen.setPosition (cc.p(spriteX - HPMaxLength * 0.5, spriteY + (this.m_size * HP_BAR_OFFSET_Y) >> 0));
			
			this.m_HPBarGreen.setScaleX ((HPMaxLength * this.m_HP / this.m_maxHP) >> 0);
			
			if (this.m_skill != ENEMY_SKILL_NONE) {
				this.m_skillObject.UpdateVisual();
			}
		}
	}
	
	this.Shoot = function () {
		var randomizeAngle = ENEMY_SHOOTING_ACCURACY - Math.random() * ENEMY_SHOOTING_ACCURACY * 2;
		battle.SpawnEnemyProjectile (this.m_projectileType, this.m_x, this.m_y, this.m_angle + randomizeAngle, this.m_damage, this.m_projectileSpeed);
	}
	
	this.Hit = function (damage, piercing) {
		if (this.m_live == true) {
			var resist = this.m_armor - piercing;
			if (resist < 0) resist = 0;
			
			var actualDamage = damage * (1 - resist);
			
			this.m_HP -= actualDamage;
			if (this.m_HP <= 0) {
				battle.SpawnExplosion (EXPLOSION_DEBRIS, 1.2, this.m_x, this.m_y);
				this.Destroy();
			}
		}
	}
	
	this.Heal = function (amount) {
		if (this.m_live == true) {
			this.m_HP += amount;
			if (this.m_HP > this.m_maxHP) {
				this.m_HP = this.m_maxHP;
			}
		}
	}
	
	this.Destroy = function() {
		layer.removeChild(this.m_sprite);
		layer.removeChild(this.m_HPBarRed);
		layer.removeChild(this.m_HPBarGreen);
		PutIntoPool(this.m_sprite);
		PutIntoPool(this.m_HPBarRed);
		PutIntoPool(this.m_HPBarGreen);
		
		this.m_live = false;
		battle.m_money += this.m_bounty;
		
		if (this.m_skill != ENEMY_SKILL_NONE) {
			this.m_skillObject.Destroy();
		}
	}
}