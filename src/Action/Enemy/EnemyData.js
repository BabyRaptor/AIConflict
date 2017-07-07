var ENEMY_SKILL_NONE = 0;
var ENEMY_SKILL_HEAL = 1;
var ENEMY_SKILL_INVISIBLE = 2;

function EnemyData() {
	this.m_HP = 0;
	this.m_armor = 0;
	this.m_moveSpeed = 0;
	this.m_rotateSpeed = 0;
	
	this.m_cooldown = 0;
	this.m_damage = 0;
	this.m_projectileType = 0;
	this.m_projectileSpeed = 0;
	
	this.m_skill = 0;
	this.m_skillAOE = 0;
	this.m_skillRate = 0;
	
	this.m_bounty = 1;
}


var g_enemyData = new Array();
g_enemyData[1] = new Array();
for (var i=1; i<=5; i++) {
	g_enemyData[1][i] = new EnemyData();
}

g_enemyData[1][1].m_HP = 100;
g_enemyData[1][1].m_armor = 0;
g_enemyData[1][1].m_moveSpeed = 2;
g_enemyData[1][1].m_rotateSpeed = 60;
g_enemyData[1][1].m_size = 0.6;
g_enemyData[1][1].m_cooldown = 1;
g_enemyData[1][1].m_damage = 5;
g_enemyData[1][1].m_projectileType = 1;
g_enemyData[1][1].m_projectileSpeed = 8;
g_enemyData[1][1].m_bounty = 3;

g_enemyData[1][2].m_HP = 150;
g_enemyData[1][2].m_armor = 0.2;
g_enemyData[1][2].m_moveSpeed = 1.5;
g_enemyData[1][2].m_rotateSpeed = 40;
g_enemyData[1][2].m_size = 0.6;
g_enemyData[1][2].m_cooldown = 0.7;
g_enemyData[1][2].m_damage = 5;
g_enemyData[1][2].m_projectileType = 1;
g_enemyData[1][2].m_projectileSpeed = 8;
g_enemyData[1][2].m_bounty = 3;

g_enemyData[1][3].m_HP = 75;
g_enemyData[1][3].m_armor = 0;
g_enemyData[1][3].m_moveSpeed = 3.5;
g_enemyData[1][3].m_rotateSpeed = 105;
g_enemyData[1][3].m_size = 0.6;
g_enemyData[1][3].m_cooldown = 1.2;
g_enemyData[1][3].m_damage = 5;
g_enemyData[1][3].m_projectileType = 1;
g_enemyData[1][3].m_projectileSpeed = 8;
g_enemyData[1][3].m_bounty = 3;

g_enemyData[1][4].m_HP = 750;
g_enemyData[1][4].m_armor = 0;
g_enemyData[1][4].m_moveSpeed = 1;
g_enemyData[1][4].m_rotateSpeed = 30;
g_enemyData[1][4].m_size = 1.2;
g_enemyData[1][4].m_cooldown = 0.2;
g_enemyData[1][4].m_damage = 5;
g_enemyData[1][4].m_projectileType = 1;
g_enemyData[1][4].m_projectileSpeed = 8;
g_enemyData[1][4].m_skill = ENEMY_SKILL_HEAL;
g_enemyData[1][4].m_skillAOE = 3;
g_enemyData[1][4].m_skillRate = 30;
g_enemyData[1][4].m_bounty = 20;