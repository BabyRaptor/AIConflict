var ENEMY_SKILL_HEAL = 1;



var SKILL_SPRITE_BASE_ALPHA = 150;
var SKILL_SPRITE_FADE_SPEED = 0.3;

function EnemySkill(battle, layer, type, owner, AOE, rate, modifier) {
	this.m_live = true;
	this.m_type = type;
	this.m_x = owner.m_x;
	this.m_y = owner.m_y;
	this.m_AOE = AOE;
	this.m_rate = rate;
	
	var spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
	var spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
	
	this.m_sprite = GetFromPool("res/GSAction/EnemySkill/" + type + ".png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_PROJECTILE);
	this.m_sprite.setPosition (cc.p(spriteX, spriteY));
	this.m_sprite.setScale (this.m_AOE);
	this.m_sprite.setOpacity(SKILL_SPRITE_BASE_ALPHA);
	layer.addChild(this.m_sprite);
	
	var fadeFactor = 1;
	var fadeDirection = 0;
	
	this.Update = function (deltaTime) {
		if (this.m_live == true) {
			this.m_x = owner.m_x;
			this.m_y = owner.m_y;
			
			if (fadeDirection == 0) {
				fadeFactor += SKILL_SPRITE_FADE_SPEED * deltaTime;
				if (fadeFactor > 1.3) {
					fadeDirection = 1;
				}
			}
			else {
				fadeFactor -= SKILL_SPRITE_FADE_SPEED * deltaTime;
				if (fadeFactor < 0.7) {
					fadeDirection = 0;
				}
			}
			
			
			if (this.m_type == ENEMY_SKILL_HEAL) {
				var tempEnemyList = this.GetEnemyAroundList();
				for (var i=0; i<tempEnemyList.length; i++) {
					tempEnemyList[i].Heal(this.m_rate * modifier * deltaTime);
				}
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_live == true) {
			spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
			spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
			
			this.m_sprite.setPosition (cc.p(spriteX, spriteY));
			this.m_sprite.setOpacity(SKILL_SPRITE_BASE_ALPHA * fadeFactor);
		}
	}
	
	this.Destroy = function() {
		this.m_live = false;
		layer.removeChild(this.m_sprite);
		PutIntoPool(this.m_sprite);
	}
	
	
	
	// Helping functions:
	this.GetEnemyAroundList = function() {
		var tempEnemyList = [];
		for (var i=0; i<battle.m_enemies.length; i++) {
			var tempEnemy = battle.m_enemies[i];
			if (DistanceBetweenTwoPoint (this.m_x, this.m_y, tempEnemy.m_x, tempEnemy.m_y) <= this.m_AOE) {
				tempEnemyList.push (tempEnemy);
			}
		}
		return tempEnemyList;
	}
}