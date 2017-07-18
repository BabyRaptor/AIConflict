function Upgrade() {
	this.m_name = "";
	this.m_price = 0;
	this.m_iconPathE = "";
	this.m_iconPathD = "";
	this.m_iconPathU = "";
	
	this.m_description = "";
	this.m_isAdvance = false;
}

var tempUpgrade;
var g_upgrade = [];




var UPGRADE_GATLING = 0;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Gatling gun upgrade";
tempUpgrade.m_price = 1000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Gatling.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Gatling.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Gatling.png";
tempUpgrade.m_description = "GATLING: +20% damage.\n";
tempUpgrade.m_isAdvance = false;
g_upgrade.push (tempUpgrade);

var UPGRADE_CANNON = 1;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Cannon upgrade";
tempUpgrade.m_price = 1000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Cannon.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Cannon.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Cannon.png";
tempUpgrade.m_description = "CANNON: +20% damage.";
tempUpgrade.m_isAdvance = false;
g_upgrade.push (tempUpgrade);

var UPGRADE_MISSILE = 2;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Missile launcher upgrade";
tempUpgrade.m_price = 1000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Missile.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Missile.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Missile.png";
tempUpgrade.m_description = "MISSILE: +20% damage.";
tempUpgrade.m_isAdvance = false;
g_upgrade.push (tempUpgrade);

var UPGRADE_LASER = 3;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Laser turret upgrade";
tempUpgrade.m_price = 1000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Laser.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Laser.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Laser.png";
tempUpgrade.m_description = "LASER: +20% damage.";
tempUpgrade.m_isAdvance = false;
g_upgrade.push (tempUpgrade);

var UPGRADE_RAIL = 4;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Rail gun upgrade";
tempUpgrade.m_price = 1000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Gauss.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Gauss.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Gauss.png";
tempUpgrade.m_description = "RAIL: +20% damage.";
tempUpgrade.m_isAdvance = false;
g_upgrade.push (tempUpgrade);

var UPGRADE_STATIC = 5;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Static charger upgrade";
tempUpgrade.m_price = 1000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Static.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Static.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Static.png";
tempUpgrade.m_description = "STATIC: +20% damage.";
tempUpgrade.m_isAdvance = false;
g_upgrade.push (tempUpgrade);

var UPGRADE_SHOCK = 6;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Shock emitter upgrade";
tempUpgrade.m_price = 1000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Shock.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Shock.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Shock.png";
tempUpgrade.m_description = "SHOCK: +20% damage.";
tempUpgrade.m_isAdvance = false;
g_upgrade.push (tempUpgrade);







var UPGRADE_AMMUNITION = 0;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Ammunition";
tempUpgrade.m_price = 1500;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Ammunition.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Ammunition.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Ammunition.png";
tempUpgrade.m_description = 	"GATLING: +20% armor piercing at range 500 or less." + "\n" + 
								"CANNON: +20% projectile speed." + "\n" + 
								"RAIL: -50% damage reduction after each hit.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_MANUFACTURING = 1;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Manufacturing";
tempUpgrade.m_price = 2000;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Manufacture.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Manufacture.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Manufacture.png";
tempUpgrade.m_description = 	"GATLING: -25% cost (both constructing and upgrading cost)." + "\n" + 
								"CANNON: +20% fire rate." + "\n" + 
								"MISSILE: +100% turn rate";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_GENERATOR = 2;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Power Generator";
tempUpgrade.m_price = 2300;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Generator.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Generator.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Generator.png";
tempUpgrade.m_description = 	"LASER: +20% damage." + "\n" + 
								"BASE: +25% shield recharge rate." + "\n" + 
								"SHOCK: +20% fire rate";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_CAPACITOR = 3;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Capacitor";
tempUpgrade.m_price = 4500;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Capacitor.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Capacitor.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Capacitor.png";
tempUpgrade.m_description = 	"RAIL: +20% fire rate." + "\n" + 
								"STATIC: +50% area of effect." + "\n" + 
								"SHOCK: +50% area of effect.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_EXPLOSIVE = 4;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Explosive";
tempUpgrade.m_price = 3100;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Explosive.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Explosive.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Explosive.png";
tempUpgrade.m_description = 	"GATLING: +100% damage against boss." + "\n" + 
								"CANNON: +25% damage." + "\n" + 
								"MISSILE: +50% area of effect.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_CONDUCTOR = 5;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Conductor";
tempUpgrade.m_price = 2700;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Conductor.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Conductor.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Conductor.png";
tempUpgrade.m_description = 	"STATIC: +20% fire rate." + "\n" + 
								"SHOCK: +25% damage for adjacent LASER or STATIC turrets. (does not stack)" + "\n" + 
								"RAIL: +25% damage.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_ECONOMY = 6;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Economy";
tempUpgrade.m_price = 1200;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Economy.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Economy.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Economy.png";
tempUpgrade.m_description = 	"BASE: +50% turret dismantling return." + "\n" + 
								"BASE: +50% bonus money after each wave" + "\n" + 
								"BASE: +100 mission starting money.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_ENERGY = 7;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Energy Manipulation";
tempUpgrade.m_price = 3800;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Energy.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Energy.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Energy.png";
tempUpgrade.m_description = 	"STATIC: +5% damage for each enemy in the AOE" + "\n" + 
								"SHOCK: +50% bounty for enemy destroyed inside a Shockwave Emitter attack range." + "\n" + 
								"LASER: The beam refract to 2 other targets for 50% damage.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_MATERIAL = 8;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Material";
tempUpgrade.m_price = 1700;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Material.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Material.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Material.png";
tempUpgrade.m_description = 	"CANNON: +20% armour penetration on direct hit" + "\n" + 
								"LASER: +20% damage from GATLING, CANNON and MISSILE taken by an enemy under LASER attack." + "\n" + 
								"BASE: +100% base HP.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_MICROCHIP = 9;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Microchip";
tempUpgrade.m_price = 1400;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Microchip.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Microchip.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Microchip.png";
tempUpgrade.m_description = 	"RAIL: +50% turret rotation speed." + "\n" + 
								"STATIC: Add homing capability for STATIC projectile." + "\n" + 
								"MISSILE: Seek another target if miss the current one.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_TARGETING = 10;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Targeting System";
tempUpgrade.m_price = 2100;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Targeting.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Targeting.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Targeting.png";
tempUpgrade.m_description = 	"GATLING: -50% recoil." + "\n" + 
								"RAIL: +10% chance to deal 500% damage." + "\n" + 
								"LASER: +20% attack range.";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_CHEMICAL = 11;
tempUpgrade = new Upgrade();
tempUpgrade.m_name = "Chemical";
tempUpgrade.m_price = 3500;
tempUpgrade.m_iconPathE = "res/GSUpgrade/Enable/Chemical.png";
tempUpgrade.m_iconPathD = "res/GSUpgrade/Disabled/Chemical.png";
tempUpgrade.m_iconPathU = "res/GSUpgrade/Upgraded/Chemical.png";
tempUpgrade.m_description = 	"GATLING: Immune to blind and slow" + "\n" + 
								"CANNON: +100 damage per second for 5 seconds for all enemies inside the explosion. (does not stack)" + "\n" + 
								"MISSILE: -50% move speed for 2 seconds for all enemies inside the explosion. (does not stack)";
tempUpgrade.m_isAdvance = true;
g_upgrade.push (tempUpgrade);



var UPGRADE_TOTAL = 12;