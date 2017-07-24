var COMMAND_FOLLOW_WAYPOINT = 0;
var COMMAND_MOVE_TO_TARGET = 1;
var COMMAND_ATTACK_TARGET = 2;


function CreateEnemyPrototype (battle, layer) {
	var enemy = new Enemy (battle, layer);
	return enemy;
}


var HP_BAR_LENGTH_MULTIPLIER = 100;
var HP_BAR_OFFSET_Y = 70;

function Enemy (battle, layer) {
	// Status
	this.m_live 		= true;
	this.m_disabled 	= false;
	
	// Position
	this.m_x 			= 0;
	this.m_y 			= 0;
	
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
		this.m_HPBarRed = GetFromPool("res/GSAction/Enemy/HPBar.png");
		this.m_HPBarRed.setTextureRect (cc.rect(0, 0, 1, 4));
		this.m_HPBarRed.setAnchorPoint(cc.p(0, 0.5));
		this.m_HPBarRed.setLocalZOrder (LAYER_ENEMY + 4);
		this.m_HPBarRed.setPosition (cc.p(0, 0));
		this.m_HPBarRed.setScaleX (this.m_HPLength);
		layer.addChild(this.m_HPBarRed);
		
		this.m_HPBarGreen = GetFromPool("res/GSAction/Enemy/HPBar.png");
		this.m_HPBarGreen.setTextureRect (cc.rect(0, 4, 1, 4));
		this.m_HPBarGreen.setAnchorPoint(cc.p(0, 0.5));
		this.m_HPBarGreen.setLocalZOrder (LAYER_ENEMY + 4);
		this.m_HPBarGreen.setPosition (cc.p(0, 0));
		this.m_HPBarGreen.setScaleX (this.m_HPLength);
		layer.addChild(this.m_HPBarGreen);
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
			var resist = this.m_armor - piercing;
			if (resist < 0) resist = 0;
			
			// Deal damage
			var actualDamage = damage * (1 - resist);
			this.m_HP -= actualDamage;
			
			// Die bitch
			if (this.m_HP <= 0) {
				this.Destroy();
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
	
	this.Disable = function (time) {
		// Disable this ship for <time> seconds
	}
	
	this.LocalDestroy = function () {
		// Process its death
		this.m_live = false;
		battle.m_money += this.m_bounty;
		
		// Remove sprites
		layer.removeChild(this.m_HPBarRed);
		layer.removeChild(this.m_HPBarGreen);
		
		// Reserve removed sprites
		PutIntoPool(this.m_HPBarRed);
		PutIntoPool(this.m_HPBarGreen);
	}
}


var CreateEnemy = [];
for (var i=0; i<10; i++) {
	CreateEnemy[i] = [];
}