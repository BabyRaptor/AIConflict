var NUMBER_OF_TILESET = 1;
var NUMBER_OF_BACKGROUND = 1;

var g_preloadList = [];
var g_imageList = [];
var g_fileList = [];
var g_audioList = [];







// =========================================================================================
// Preload
g_preloadList.push ("res/Splash.jpg");

// =========================================================================================






// =========================================================================================
// State
g_imageList.push ("res/GSMenu/Logo.png");
g_imageList.push ("res/GSMenu/TempBG.jpg");

// UI
g_imageList.push ("res/UI/BigPanel/Corner-1.png");
g_imageList.push ("res/UI/BigPanel/Edge-1.png");
g_imageList.push ("res/UI/BigPanel/Mid-1.png");
g_imageList.push ("res/UI/BigPanel/Corner-2.png");
g_imageList.push ("res/UI/BigPanel/Edge-2.png");
g_imageList.push ("res/UI/BigPanel/Mid-2.png");
g_imageList.push ("res/UI/BigPanel/Corner-3.png");
g_imageList.push ("res/UI/BigPanel/Edge-3.png");
g_imageList.push ("res/UI/BigPanel/Mid-3.png");

g_imageList.push ("res/UI/MediumPanel/Corner-1.png");
g_imageList.push ("res/UI/MediumPanel/Edge-1.png");
g_imageList.push ("res/UI/MediumPanel/Mid-1.png");
g_imageList.push ("res/UI/MediumPanel/Corner-2.png");
g_imageList.push ("res/UI/MediumPanel/Edge-2.png");
g_imageList.push ("res/UI/MediumPanel/Mid-2.png");
g_imageList.push ("res/UI/MediumPanel/Corner-3.png");
g_imageList.push ("res/UI/MediumPanel/Edge-3.png");
g_imageList.push ("res/UI/MediumPanel/Mid-3.png");

g_imageList.push ("res/UI/SmallPanel/Corner-1.png");
g_imageList.push ("res/UI/SmallPanel/Edge-1.png");
g_imageList.push ("res/UI/SmallPanel/Mid-1.png");
g_imageList.push ("res/UI/SmallPanel/Corner-2.png");
g_imageList.push ("res/UI/SmallPanel/Edge-2.png");
g_imageList.push ("res/UI/SmallPanel/Mid-2.png");
g_imageList.push ("res/UI/SmallPanel/Corner-3.png");
g_imageList.push ("res/UI/SmallPanel/Edge-3.png");
g_imageList.push ("res/UI/SmallPanel/Mid-3.png");

g_imageList.push ("res/UI/BigButton/Disabled.png");
g_imageList.push ("res/UI/BigButton/Up-1.png");
g_imageList.push ("res/UI/BigButton/Down-1.png");
g_imageList.push ("res/UI/BigButton/Up-2.png");
g_imageList.push ("res/UI/BigButton/Down-2.png");
g_imageList.push ("res/UI/BigButton/Up-3.png");
g_imageList.push ("res/UI/BigButton/Down-3.png");

g_imageList.push ("res/UI/TurretButton/Up-1.png");
g_imageList.push ("res/UI/TurretButton/Down-1.png");
g_imageList.push ("res/UI/TurretButton/Up-2.png");
g_imageList.push ("res/UI/TurretButton/Down-2.png");
g_imageList.push ("res/UI/TurretButton/Up-3.png");
g_imageList.push ("res/UI/TurretButton/Down-3.png");
g_imageList.push ("res/UI/TurretButton/Disabled.png");

g_imageList.push ("res/UI/UpgradeButton/Up-1.png");
g_imageList.push ("res/UI/UpgradeButton/Down-1.png");
g_imageList.push ("res/UI/UpgradeButton/Up-2.png");
g_imageList.push ("res/UI/UpgradeButton/Down-2.png");
g_imageList.push ("res/UI/UpgradeButton/Up-3.png");
g_imageList.push ("res/UI/UpgradeButton/Down-3.png");
g_imageList.push ("res/UI/UpgradeButton/Highlight.png");

g_imageList.push ("res/UI/PowerBar/PowerBar.png");
g_imageList.push ("res/UI/PowerBar/PowerBarContent.png");

g_imageList.push ("res/UI/BigMoneyBar.png");


// Mission
g_imageList.push ("res/GSMission/StarMapLayer1.jpg");
g_imageList.push ("res/GSMission/StarMapLayer2.png");
g_imageList.push ("res/GSMission/StarMapLayer3.png");
g_imageList.push ("res/GSMission/StarMapLayer4.png");
g_imageList.push ("res/GSMission/Objects/Star.png");
g_imageList.push ("res/GSMission/Objects/StarGlow.png");


g_imageList.push ("res/GSMission/Target/Current.png");
g_imageList.push ("res/GSMission/Target/Locked.png");
g_imageList.push ("res/GSMission/Target/Cleared.png");
for (var i=1; i<=g_campaignData.length; i++) {
	g_imageList.push ("res/GSMission/Objects/Planet-" + i + ".png");
}

for (var i=0; i<g_campaignData.length; i++) {
	for (var j=0; j<g_campaignData[i].m_missionList.length; j++) {
		g_imageList.push (g_campaignData[i].m_missionList[j].m_mapThumbnail);
		g_fileList.push (g_campaignData[i].m_missionList[j].m_mapPath);
	}
}
g_imageList.push ("res/GSMission/Thumbnail/Border.png");
g_imageList.push ("res/GSMission/Thumbnail/BorderGlow.png");
g_imageList.push ("res/GSMission/Thumbnail/BorderLock.png");
g_imageList.push ("res/GSMission/Thumbnail/BigBorder.png");


// Upgrade
for (var i=0; i<g_upgrade.length; i++) {
	g_imageList.push (g_upgrade[i].m_iconPathE);
	g_imageList.push (g_upgrade[i].m_iconPathD);
	g_imageList.push (g_upgrade[i].m_iconPathU);
}


// Info
g_imageList.push ("res/GSInfo/DesignBox.png");



// Action
for (var i=1; i<=NUMBER_OF_TILESET; i++) {
	g_imageList.push ("res/GSAction/Map/Set-" + i + ".png");
}
for (var i=1; i<=NUMBER_OF_BACKGROUND; i++) {
	g_imageList.push ("res/GSAction/Background/" + i + ".jpg");
}

// Misc
g_imageList.push ("res/GSAction/Selector.png");
g_imageList.push ("res/GSAction/RangeFinder.png");
g_imageList.push ("res/GSAction/UI/WaveBar.png");
g_imageList.push ("res/GSAction/UI/MoneyBar.png");
g_imageList.push ("res/GSAction/UI/HPBar.png");
g_imageList.push ("res/GSAction/UI/ShieldBar.png");
g_imageList.push ("res/GSAction/UI/Bar.png");


// Base
g_imageList.push ("res/GSAction/Base/Base-1.png");
g_imageList.push ("res/GSAction/Base/Base-2.png");
g_imageList.push ("res/GSAction/Base/Base-3.png");
g_imageList.push ("res/GSAction/Base/Base-4.png");
g_imageList.push ("res/GSAction/Base/Base-5.png");
g_imageList.push ("res/GSAction/Base/Base-6.png");
g_imageList.push ("res/GSAction/Base/Shield.png");

g_imageList.push ("res/GSAction/Base/Laser.png");
g_imageList.push ("res/GSAction/Base/LaserTip.png");


// Turret
g_imageList.push ("res/GSAction/Turret/1-Gatling/Base.png");
g_imageList.push ("res/GSAction/Turret/1-Gatling/Turret.png");
g_imageList.push ("res/GSAction/Turret/1-Gatling/Shadow.png");
g_imageList.push ("res/GSAction/Turret/1-Gatling/Icon.png");
g_imageList.push ("res/GSAction/Turret/1-Gatling/Projectile.png");
g_imageList.push ("res/GSAction/Turret/1-Gatling/Design.png");

g_imageList.push ("res/GSAction/Turret/2-Cannon/Base.png");
g_imageList.push ("res/GSAction/Turret/2-Cannon/Turret.png");
g_imageList.push ("res/GSAction/Turret/2-Cannon/Shadow.png");
g_imageList.push ("res/GSAction/Turret/2-Cannon/Icon.png");
g_imageList.push ("res/GSAction/Turret/2-Cannon/Projectile.png");
g_imageList.push ("res/GSAction/Turret/2-Cannon/Particle.png");
g_imageList.push ("res/GSAction/Turret/2-Cannon/Design.png");

g_imageList.push ("res/GSAction/Turret/3-Missile/Base.png");
g_imageList.push ("res/GSAction/Turret/3-Missile/Turret.png");
g_imageList.push ("res/GSAction/Turret/3-Missile/Shadow.png");
g_imageList.push ("res/GSAction/Turret/3-Missile/Icon.png");
g_imageList.push ("res/GSAction/Turret/3-Missile/Projectile.png");
g_imageList.push ("res/GSAction/Turret/3-Missile/Particle.png");
g_imageList.push ("res/GSAction/Turret/3-Missile/Design.png");

g_imageList.push ("res/GSAction/Turret/4-Laser/Base.png");
g_imageList.push ("res/GSAction/Turret/4-Laser/Turret.png");
g_imageList.push ("res/GSAction/Turret/4-Laser/Shadow.png");
g_imageList.push ("res/GSAction/Turret/4-Laser/Icon.png");
g_imageList.push ("res/GSAction/Turret/4-Laser/Laser.png");
g_imageList.push ("res/GSAction/Turret/4-Laser/LaserTip.png");
g_imageList.push ("res/GSAction/Turret/4-Laser/Design.png");

g_imageList.push ("res/GSAction/Turret/5-Gauss/Base.png");
g_imageList.push ("res/GSAction/Turret/5-Gauss/Turret.png");
g_imageList.push ("res/GSAction/Turret/5-Gauss/Shadow.png");
g_imageList.push ("res/GSAction/Turret/5-Gauss/Icon.png");
g_imageList.push ("res/GSAction/Turret/5-Gauss/Projectile.png");
g_imageList.push ("res/GSAction/Turret/5-Gauss/Design.png");

g_imageList.push ("res/GSAction/Turret/6-Static/Base.png");
g_imageList.push ("res/GSAction/Turret/6-Static/Turret.png");
g_imageList.push ("res/GSAction/Turret/6-Static/Shadow.png");
g_imageList.push ("res/GSAction/Turret/6-Static/Icon.png");
g_imageList.push ("res/GSAction/Turret/6-Static/Projectile.png");
g_imageList.push ("res/GSAction/Turret/6-Static/Spark.png");
g_imageList.push ("res/GSAction/Turret/6-Static/Design.png");

g_imageList.push ("res/GSAction/Turret/7-Shock/Turret.png");
g_imageList.push ("res/GSAction/Turret/7-Shock/Shock.png");
g_imageList.push ("res/GSAction/Turret/7-Shock/Design.png");

g_imageList.push ("res/GSAction/Turret/BlindIcon.png");
g_imageList.push ("res/GSAction/Turret/SlowIcon.png");
g_imageList.push ("res/GSAction/Turret/StunIcon.png");





// Enemy
g_imageList.push ("res/GSAction/Enemy/HPBar.png");
// Ship
g_imageList.push ("res/GSAction/Enemy/Area-1/1.png");
g_imageList.push ("res/GSAction/Enemy/Area-1/2.png");
g_imageList.push ("res/GSAction/Enemy/Area-1/3.png");
g_imageList.push ("res/GSAction/Enemy/Area-1/4.png");
g_imageList.push ("res/GSAction/Enemy/Area-1/5.png");
g_imageList.push ("res/GSAction/Enemy/Area-1/6.png");
// Projectile
g_imageList.push ("res/GSAction/Enemy/Area-1/Gatling.png");
g_imageList.push ("res/GSAction/Enemy/Area-1/Laser.png");
g_imageList.push ("res/GSAction/Enemy/Area-1/LaserTip.png");
// Skill
g_imageList.push ("res/GSAction/Enemy/Area-1/Heal.png");


// Explosion
for (var i=1; i<=8; i++) {
	g_imageList.push ("res/GSAction/Explosion/" + i + ".png");
}
// =========================================================================================





// =========================================================================================
// Fonts
g_fileList.push ("res/Fonts/Nasalization.ttf");

// Particles
g_fileList.push ("res/GSAction/Turret/2-Cannon/Particle.plist");
g_fileList.push ("res/GSAction/Turret/3-Missile/Particle.plist");
// =========================================================================================












// =========================================================================================
var GetFont = function (font) {
	if (cc.sys.isNative) {
        return "res/Fonts/" + font + ".ttf";
    } else {
        return font;
    }
}

// =========================================================================================