CreateEnemy[2][3] = function (battle, layer, path, modifier) {
	// Constant for this enemy
	// Common stuff
	var ENEMY_AREA 					= 2;
	var ENEMY_TYPE 					= 3;
	var ENEMY_BOUNTY				= 5;
	var ENEMY_SIZE					= 0.6;
	// Properties
	var ENEMY_HP					= 125;
	var ENEMY_ARMOR					= 0;
	var ENEMY_MOVE_SPEED 			= 4;
	var ENEMY_ROTATE_SPEED 			= 120;
	// Attack
	var ENEMY_ACCURACY 				= 10;
	var ENEMY_COOLDOWN				= 1;
	var ENEMY_PROJECTILE_TYPE 		= ENEMY_PROJECTILE_ORANGE_BALL;
	
	
	// Create and init the enemy prototype
	var enemy = CreateEnemyPrototype (battle, layer);
	enemy.m_moveSpeed = ENEMY_MOVE_SPEED;
	enemy.m_rotateSpeed = ENEMY_ROTATE_SPEED;
	enemy.Init(path, ENEMY_SIZE, modifier);
	
	
	// Some variable belong to the prototype
	enemy.m_HP 				= (ENEMY_HP * modifier) >> 0;
	enemy.m_maxHP			= enemy.m_HP;
	enemy.m_armor 			= ENEMY_ARMOR;
	enemy.m_bounty 			= ENEMY_BOUNTY;
	
	// Some variable used only by this enemy
	var targetIndex			= 1;
	var cooldownCount 		= 0;
	
	// The main sprite
	enemy.m_sprite = g_spritePool.GetSpriteFromPool("res/GSAction/Enemy/Area-" + ENEMY_AREA  + "/" + ENEMY_TYPE + ".png");
	enemy.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	enemy.m_sprite.setLocalZOrder (LAYER_ENEMY + 3);
	enemy.m_sprite.setRotation(enemy.m_angle);
	enemy.m_sprite.setPosition (cc.p(0, 0));
	layer.addChild(enemy.m_sprite);
	
	// Update function. This is the must for all enemy
	enemy.Update = function (deltaTime) {
		if (this.m_live == true) {
			if (this.m_stunned <= 0) {
				// Rotate to the next target
				targetAngle = AngleBetweenTwoPoint(this.m_x, this.m_y, this.m_target.x, this.m_target.y);
				var rotateAmount = this.GetRotateSpeed() * deltaTime;
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
				// Correct the angle
				if (this.m_angle > 360) this.m_angle -= 360;
				if (this.m_angle < 0) this.m_angle += 360;
				
				
				
				// Process movement
				if (this.m_command == COMMAND_FOLLOW_WAYPOINT) {
					// Floow the waypoint that lead to the base
					this.m_x += this.GetMoveSpeed() * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
					this.m_y += this.GetMoveSpeed() * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
					
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
					if (speedMultiplier > 0.7) speedMultiplier = 0.7;
					
					var actualSpeed = this.GetMoveSpeed() * (0.3 + speedMultiplier);
					this.m_x += actualSpeed * deltaTime * Math.sin(this.m_angle * DEG_TO_RAD);
					this.m_y += actualSpeed * deltaTime * Math.cos(this.m_angle * DEG_TO_RAD);
					
					if (Math.abs(this.m_x - this.m_target.x) < 1 && Math.abs(this.m_y - this.m_target.y) < 1) {
						this.m_command = COMMAND_ATTACK_TARGET;
						this.m_target = cc.p(battle.m_base.m_x, battle.m_base.m_y);
					}
				}
				else if (this.m_command == COMMAND_ATTACK_TARGET) {
					if (this.m_angle == targetAngle) {
						if (cooldownCount >= ENEMY_COOLDOWN) {
							cooldownCount -= ENEMY_COOLDOWN;
							this.Shoot();
						}
					}
				}
			}
			
			// Count rate of fire
			if (cooldownCount < ENEMY_COOLDOWN) {
				cooldownCount += deltaTime;
			}
		}
	}
	
	enemy.UpdateVisual = function () {
		if (this.m_live == true) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			
			this.m_sprite.setRotation(this.m_angle);
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
			
			this.UpdateHPBar(spriteX, spriteY);
		}
	}
	
	// Shoot function
	enemy.Shoot = function () {
		if (this.m_disarmed <= 0) {
			var randomizeAngle = ENEMY_ACCURACY - Math.random() * ENEMY_ACCURACY * 2;
			battle.SpawnEnemyProjectile (ENEMY_PROJECTILE_TYPE, this.m_x, this.m_y, this.m_angle + randomizeAngle);
		}
	}
	
	// Destroy
	enemy.Destroy = function () {
		battle.SpawnExplosion (EXPLOSION_DEBRIS, 1.2, this.m_x, this.m_y);
		layer.removeChild(this.m_sprite);
		g_spritePool.PutSpriteIntoPool(this.m_sprite);
	}
	
	return enemy;
}