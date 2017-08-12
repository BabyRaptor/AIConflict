var COMMAND_FOLLOW_WAYPOINT = 0;
var COMMAND_MOVE_TO_TARGET = 1;
var COMMAND_ATTACK_TARGET = 2;

var STATUS_SLOW_MODIFIER = 0.5;
var STATUS_HASTE_MODIFIER = 2;
var STATUS_AMPLIFY_MODIFIER = 2;


function CreateEnemyPrototype (battle, layer) {
	var enemy = new Enemy (battle, layer);
	return enemy;
}


var HP_BAR_LENGTH_MULTIPLIER = 100;
var HP_BAR_OFFSET_Y = 70;

function Enemy (battle, layer) {
	// Status
	this.m_live 		= true;
	this.m_stunned 		= 0;
	this.m_slowed		= 0;
	this.m_disarmed		= 0;
	this.m_amplified	= 0;
	this.m_corroded		= 0;
	this.m_hasted		= 0;
	
	// Position
	this.m_x 			= 0;
	this.m_y 			= 0;
	this.m_angle		= 0;
	this.m_moveSpeed	= 0;
	this.m_rotateSpeed	= 0;
	
	// Path
	this.m_path 		= null;
	
	// Other properties
	this.m_HP 			= 0;
	this.m_maxHP 		= 0;
	this.m_armor 		= 0;
	this.m_cooldown 	= 0;
	this.m_size 		= 0;
	this.m_bounty 		= 0;
	
	// Level
	this.m_modifer		= 0;
	
	// Signal garbage collector
	this.m_isGarbage 	= false;
	
	
	
	this.Init = function (path, size, modifier) {
		// Assign properties
		this.m_size 	= size;
		this.m_path 	= path;
		this.m_modifer 	= modifier;
		
		this.m_command 	= COMMAND_FOLLOW_WAYPOINT;
		this.m_x 		= path[0].x;
		this.m_y 		= path[0].y;
		this.m_target 	= path[1];
		this.m_angle 	= AngleBetweenTwoPoint(path[0].x, path[0].y, path[1].x, path[1].y);
		this.m_HPLength = this.m_size * HP_BAR_LENGTH_MULTIPLIER;
		
		// Create the HP bars
		this.m_HPBarRed = g_spritePool.GetSpriteFromPool("res/GSAction/Enemy/HPBar.png");
		this.m_HPBarRed.setTextureRect (cc.rect(0, 0, 1, 4));
		this.m_HPBarRed.setAnchorPoint(cc.p(0, 0.5));
		this.m_HPBarRed.setLocalZOrder (LAYER_ENEMY + 4);
		this.m_HPBarRed.setPosition (cc.p(0, 0));
		this.m_HPBarRed.setScaleX (this.m_HPLength);
		layer.addChild(this.m_HPBarRed);
		
		this.m_HPBarGreen = g_spritePool.GetSpriteFromPool("res/GSAction/Enemy/HPBar.png");
		this.m_HPBarGreen.setTextureRect (cc.rect(0, 4, 1, 4));
		this.m_HPBarGreen.setAnchorPoint(cc.p(0, 0.5));
		this.m_HPBarGreen.setLocalZOrder (LAYER_ENEMY + 4);
		this.m_HPBarGreen.setPosition (cc.p(0, 0));
		this.m_HPBarGreen.setScaleX (this.m_HPLength);
		layer.addChild(this.m_HPBarGreen);
	}
	
	this.LocalUpdate = function (deltaTime) {
		// Count all status
		if (this.m_stunned > 0) {
			this.m_stunned -= deltaTime;
			if (this.m_stunned < 0) {
				this.m_stunned = 0;
			}
		}
		if (this.m_slowed > 0) {
			this.m_slowed -= deltaTime;
			if (this.m_slowed < 0) {
				this.m_slowed = 0;
			}
		}
		if (this.m_disarmed > 0) {
			this.m_disarmed -= deltaTime;
			if (this.m_disarmed < 0) {
				this.m_disarmed = 0;
			}
		}
		if (this.m_disarmed > 0) {
			this.m_disarmed -= deltaTime;
			if (this.m_disarmed < 0) {
				this.m_disarmed = 0;
			}
		}
		if (this.m_corroded > 0) {
			this.m_corroded -= deltaTime;
			if (this.m_corroded < 0) {
				this.m_corroded = 0;
			}
		}
		if (this.m_hasted > 0) {
			this.m_hasted -= deltaTime;
			if (this.m_hasted < 0) {
				this.m_hasted = 0;
			}
		}
	}
	
	this.UpdateHPBar = function (spriteX, spriteY) {
		if (this.m_live == true) {
			this.m_HPBarRed.setPosition (cc.p(spriteX - this.m_HPLength * 0.5, spriteY + (this.m_size * HP_BAR_OFFSET_Y) >> 0));
			this.m_HPBarGreen.setPosition (cc.p(spriteX - this.m_HPLength * 0.5, spriteY + (this.m_size * HP_BAR_OFFSET_Y) >> 0));
			this.m_HPBarGreen.setScaleX ((this.m_HPLength * this.m_HP / this.m_maxHP) >> 0);
		}
	}
	
	this.Hit = function (damage, piercing) {
		if (this.m_live == true) {
			// Calculate resistant
			var resist = this.GetArmor() - piercing;
			if (resist < 0) resist = 0;
			
			// Deal damage
			var actualDamage = damage * (1 - resist);
			if (this.m_amplified > 0) {
				actualDamage *= STATUS_AMPLIFY_MODIFIER;
			}
			this.m_HP -= actualDamage;
			
			// Die bitch
			if (this.m_HP <= 0) {
				this.Explode();
				this.LocalDestroy();
			}
		}
	}
	
	this.Heal = function (amount) {
		// Heal this ship
		if (this.m_live == true) {
			this.m_HP += amount;
			if (this.m_HP > this.m_maxHP) {
				this.m_HP = this.m_maxHP;
			}
		}
	}
	this.Haste = function (time) {
		// Stun this ship for <time> seconds
		if (this.m_hasted < time) this.m_hasted = time;
	}
	
	this.Stun = function (time) {
		// Stun this ship for <time> seconds
		if (this.m_stunned < time) this.m_stunned = time;
	}
	this.Slow = function (time) {
		// Slow this ship for <time> seconds
		if (this.m_slowed < time) this.m_slowed = time;
	}
	this.Disarm = function (time) {
		// Disarm this ship for <time> seconds
		if (this.m_disarmed < time) this.m_disarmed = time;
	}
	this.Amplify = function (time) {
		// Aplify all damage to this ship for <time> seconds
		if (this.m_amplified < time) this.m_amplified = time;
	}
	this.Corrode = function (time) {
		// Reduce armor to 0 for <time> seconds
		if (this.m_corroded < time) this.m_corroded = time;
	}
	
	
	
	// Helper
	this.GetMoveSpeed = function () {
		var speed = this.m_moveSpeed;
		if (this.m_slowed > 0) speed *= STATUS_SLOW_MODIFIER;
		if (this.m_hasted > 0) speed *= STATUS_HASTE_MODIFIER;
		return speed;
	}
	this.GetRotateSpeed = function () {
		var speed = this.m_rotateSpeed;
		if (this.m_slowed > 0) speed *= STATUS_SLOW_MODIFIER;
		if (this.m_hasted > 0) speed *= STATUS_HASTE_MODIFIER;
		return speed;
	}
	this.GetArmor = function () {
		if (this.m_corroded <= 0) 
			return this.m_armor;
		else
			return 0;
	}
	
	this.LocalDestroy = function () {
		// Process its death
		this.m_live = false;
		battle.m_money += this.m_bounty;
		
		// Remove sprites
		layer.removeChild(this.m_HPBarRed);
		layer.removeChild(this.m_HPBarGreen);
		
		// Reserve removed sprites
		g_spritePool.PutSpriteIntoPool(this.m_HPBarRed);
		g_spritePool.PutSpriteIntoPool(this.m_HPBarGreen);
	}
}


var CreateEnemy = [];
for (var i=0; i<10; i++) {
	CreateEnemy[i] = [];
}