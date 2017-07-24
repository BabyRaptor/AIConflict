var BLOCK_SIZE = 60;
var BLOCK_PATH = 0;
var BLOCK_OCCUPIED = 1;
var BLOCK_FREE = 2;

var RESULT_NOT_DEFINED = 0;
var RESULT_WIN = 1;
var RESULT_LOSE = 2;

function Battle(bgLayer, layer, campaignID, missionID) {
	// =====================================================================
	// Initialization
	var MATCH_END_DELAY = 3;
	
	this.m_campaignID = campaignID;
	this.m_missionID = missionID;
	this.m_mission = g_campaignData[campaignID].m_missionList[missionID];
	
	
	var tempWaveDataList = null;
	var firstRunSetAntiAlias = true;
	
	var matchResult = RESULT_NOT_DEFINED;
	var matchEndCount = 0;
	
	this.Init = function () {
		// Background image
		this.m_bgSprite = cc.Sprite.create(this.m_mission.m_backgroundPath);
		this.m_bgSprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_bgSprite.setPosition(cc.p(CANVAS_W * 0.5, CANVAS_H * 0.5));
		this.m_bgSprite.setLocalZOrder (LAYER_BACKGROUND);
		bgLayer.addChild(this.m_bgSprite);
		
		// Platform map
		this.m_map = cc.TMXTiledMap.create(this.m_mission.m_mapPath);
		this.m_map.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_map.setLocalZOrder (LAYER_MAP);
		this.m_map.setPosition(cc.p(-2, -2));
		layer.addChild(this.m_map, 0, 0);
		
		
		// Map size
		this.m_mapWidth = this.m_map.mapWidth;
		this.m_mapHeight = this.m_map.mapHeight;
		this.m_mapRealWidth = this.m_map.width;
		this.m_mapRealHeight = this.m_map.height;
		
		
		
		
		// Map platform layer
		this.m_square = new Array();
		for (var i=0; i<this.m_mapWidth; i++) {
			this.m_square[i] = new Array();
			for (var j=0; j<this.m_mapHeight; j++) {
				var tempGID = this.m_map.getLayer("Platform").getTileGIDAt(cc.p(i, this.m_mapHeight-j-1));
				var property = this.m_map.getPropertiesForGID (tempGID);
				
				if (property == null) {
					this.m_square[i][j] = BLOCK_PATH;
				}
				else {
					this.m_square[i][j] = property["Type"];
				}
			}
		}
		
		// Map objects
		var objects = this.m_map.getObjectGroups()[0].getObjects();
		for (var i=0; i<objects.length; i++) {
			var objectX = ((objects[i].x + objects[i].width * 0.5) / BLOCK_SIZE) >> 0;
			var objectY = ((objects[i].y + objects[i].height * 0.5) / BLOCK_SIZE) >> 0;
			
			if (objects[i].name == "Base") {
				this.m_base = new Base(this, layer);
				this.m_base.SetPosition (objectX, objectY);
			}
			else if (objects[i].name == "Path") {
				this.m_path = [];
				this.m_path.push (cc.p(objects[i].x, objects[i].y));
				for (var j=1; j<objects[i].polylinePoints.length; j++) {
					this.m_path.push (cc.p(parseInt(objects[i].x) + parseInt(objects[i].polylinePoints[j].x), parseInt(objects[i].y) - parseInt(objects[i].polylinePoints[j].y)));
				}
			}
		}
		
		for (var i=0; i<this.m_path.length; i++) {
			this.m_path[i].x = Math.floor(this.m_path[i].x / BLOCK_SIZE);
			this.m_path[i].y = Math.floor(this.m_path[i].y / BLOCK_SIZE);
		}
		
		this.m_turrets = new Array();
		this.m_projectiles = new Array();
		this.m_enemies = new Array();
		this.m_emitter = new Array();
		
		this.m_explosions = new Array();
		
		// Camera
		this.m_cameraX = 0;
		this.m_cameraY = 0;
		this.m_zoom = 1;
		
		// Misc
		this.m_selector = new Selector(this, layer);
		this.m_selector.SetPosition (0, 0);
		this.m_selector.SetVisible (false);
		
		// Gameplay
		this.m_money = this.m_mission.m_money;
		this.m_wave = 0;
		this.m_waveTimeCount = 0;
		this.m_peaceTime = true;
		this.m_pause = false;
		this.m_forcePause = false;
		this.m_gameSpeed = 1;
		
		
	}
	// =====================================================================
	
	
	
	
	
	// =====================================================================
	// Game loop
	this.Update = function (deltaTime) {
		if (firstRunSetAntiAlias) {
			firstRunSetAntiAlias = false;
			this.m_map.getLayer("Platform").getTexture().setAliasTexParameters();
		}
		
		// Update thing that cannot be pause
		this.UpdateCamera();
		this.m_selector.Update (deltaTime);
		
		
		// Update thing that can be pause or slowed down
		if (!this.m_pause && !this.m_forcePause) {
			for (var j=0; j<this.m_gameSpeed; j++) {
				// Spawn enemies
				this.HandleWaveSpawning (deltaTime);
				
				// Update all objetct
				this.m_base.Update (deltaTime);
				
				for (var i=0; i<this.m_turrets.length; i++) {
					this.m_turrets[i].Update (deltaTime);
				}
				for (var i=0; i<this.m_enemies.length; i++) {
					this.m_enemies[i].Update (deltaTime);
				}
				for (var i=0; i<this.m_projectiles.length; i++) {
					this.m_projectiles[i].Update (deltaTime);
				}
				for (var i=0; i<this.m_explosions.length; i++) {
					this.m_explosions[i].Update (deltaTime);
				}
				
				this.CheckWinLostCondition();
				this.CleanUsedObject();
				
				if (j != 0) {
					for (var i=0; i<this.m_emitter.length; i++) {
						this.m_emitter[i].update(deltaTime);
					}
				}
			}
		}
		
		// Update graphic all objetct
		this.m_base.UpdateVisual ();
		
		for (var i=0; i<this.m_turrets.length; i++) {
			this.m_turrets[i].UpdateVisual ();
		}
		for (var i=0; i<this.m_enemies.length; i++) {
			this.m_enemies[i].UpdateVisual ();
		}
		for (var i=0; i<this.m_projectiles.length; i++) {
			this.m_projectiles[i].UpdateVisual ();
		}
		for (var i=0; i<this.m_explosions.length; i++) {
			this.m_explosions[i].UpdateVisual ();
		}
		
		
		if (matchResult != RESULT_NOT_DEFINED && !this.m_forcePause) {
			matchEndCount += deltaTime * this.m_gameSpeed;
			if (matchEndCount >= MATCH_END_DELAY) {
				g_gsActionUILayer.EndGame (matchResult == RESULT_WIN);
				matchEndCount = 0;
			}
		}
	}
	
	this.PlaceTestTurretAtSelectorLocation = function (type) {
		this.m_selector.ShowTestTurret (type);
	}
	this.BuildTurretAtSelectorLocation = function (type) {
		this.m_selector.SetVisible (false);
		this.m_selector.HideTestTurret();
		this.BuildTurret (this.m_selector.m_x, this.m_selector.m_y, type);
	}
	
	this.BuildTurret = function (x, y, type) {
		if (this.m_square[x][y] == BLOCK_FREE) {
			if (type == TURRET_GATLING && this.m_money >= TURRET_GATLING_PRICE[0]) {
				var tempTurret = new TurretGatling (this, layer, x, y);
				this.m_square[x][y] = tempTurret;
				this.m_turrets.push (tempTurret);
				this.m_money -= TURRET_GATLING_PRICE[0];
			}
			else if (type == TURRET_CANNON && this.m_money >= TURRET_CANNON_PRICE[0]) {
				var tempTurret = new TurretCannon (this, layer, x, y);
				this.m_square[x][y] = tempTurret;
				this.m_turrets.push (tempTurret);
				this.m_money -= TURRET_CANNON_PRICE[0];
			}
			else if (type == TURRET_MISSILE && this.m_money >= TURRET_MISSILE_PRICE[0]) {
				var tempTurret = new TurretMissile (this, layer, x, y);
				this.m_square[x][y] = tempTurret;
				this.m_turrets.push (tempTurret);
				this.m_money -= TURRET_MISSILE_PRICE[0];
			}
			else if (type == TURRET_LASER && this.m_money >= TURRET_LASER_PRICE[0]) {
				var tempTurret = new TurretLaser (this, layer, x, y);
				this.m_square[x][y] = tempTurret;
				this.m_turrets.push (tempTurret);
				this.m_money -= TURRET_LASER_PRICE[0];
			}
			else if (type == TURRET_GAUSS && this.m_money >= TURRET_GAUSS_PRICE[0]) {
				var tempTurret = new TurretGauss (this, layer, x, y);
				this.m_square[x][y] = tempTurret;
				this.m_turrets.push (tempTurret);
				this.m_money -= TURRET_GAUSS_PRICE[0];
			}
			else if (type == TURRET_STATIC && this.m_money >= TURRET_STATIC_PRICE[0]) {
				var tempTurret = new TurretStatic (this, layer, x, y);
				this.m_square[x][y] = tempTurret;
				this.m_turrets.push (tempTurret);
				this.m_money -= TURRET_STATIC_PRICE[0];
			}
			else if (type == TURRET_SHOCK && this.m_money >= TURRET_SHOCK_PRICE[0]) {
				var tempTurret = new TurretShock (this, layer, x, y);
				this.m_square[x][y] = tempTurret;
				this.m_turrets.push (tempTurret);
				this.m_money -= TURRET_SHOCK_PRICE[0];
			}
		}
	}
	
	this.SpawnProjectile = function (type, x, y, angle, level, target) {
		var tempProjectile;
		if (type == PROJECTILE_GATLING) {
			tempProjectile = new ProjectileGatling (this, layer, x, y, angle, level);
		}
		else if (type == PROJECTILE_CANNON) {
			tempProjectile = new ProjectileCannon (this, layer, x, y, angle, level);
		}
		else if (type == PROJECTILE_MISSILE) {
			tempProjectile = new ProjectileMissile (this, layer, x, y, angle, level, target);
		}
		else if (type == PROJECTILE_LASER) {
			// Do nothing
		}
		else if (type == PROJECTILE_GAUSS) {
			tempProjectile = new ProjectileGauss (this, layer, x, y, angle, level);
		}
		else if (type == PROJECTILE_STATIC) {
			tempProjectile = new ProjectileStatic (this, layer, x, y, angle, level);
		}
		else if (type == PROJECTILE_SHOCK) {
			tempProjectile = new ProjectileShock (this, layer, x, y, angle, level);
		}
		this.m_projectiles.push (tempProjectile);
	}
	
	this.SpawnEnemy = function (area, type, modifier) {
		var tempEnemy = CreateEnemy[area][type](this, layer, this.m_path, modifier);
		this.m_enemies.push (tempEnemy);
	}
	
	this.SpawnEnemyProjectile = function (type, x, y, angle) {
		tempProjectile = new EnemyProjectile(this, layer, type, x, y, angle);
		this.m_projectiles.push (tempProjectile);
	}
	
	this.SpawnExplosion = function (type, scale, x, y) {
		var tempExplosion;
		for (var i=0; i<this.m_explosions.length; i++) {
			if (this.m_explosions[i].m_active == false) {
				tempExplosion = this.m_explosions[i]
				break;
			}
		}
		
		if (tempExplosion == null) {
			tempExplosion = new Explosion(this, layer);
			this.m_explosions.push (tempExplosion);
		}
		tempExplosion.Spawn(type, scale, x, y);
	}
	
	
	
	
	this.StartWave = function () {
		this.m_peaceTime = false;
		this.m_waveTimeCount = 0;
		this.m_wave ++;
		tempWaveDataList = this.m_mission.m_waveData[this.m_wave];
	}
	
	this.PauseGame = function () {
		this.m_pause = !this.m_pause;
		for (var i=0; i<this.m_emitter.length; i++) {
			if (this.m_pause == true) {
				this.m_emitter[i].pause();
			}
			else {
				this.m_emitter[i].resume();
			}
		}
	}
	
	this.HandleWaveSpawning = function (deltaTime) {
		if (this.m_peaceTime == false) {
			this.m_waveTimeCount += deltaTime;
			
			for (var i=0; i<tempWaveDataList.length; i++) {
				var waveData = tempWaveDataList[i];
				if (this.m_waveTimeCount >= waveData.m_time && this.m_waveTimeCount <= waveData.m_time + waveData.m_number * waveData.m_latency) {
					for (j=0; j<waveData.m_number + 1; j++) {
						if (this.m_waveTimeCount >= waveData.m_time + j * waveData.m_latency
						&&  this.m_waveTimeCount - deltaTime < waveData.m_time + j * waveData.m_latency) {
							this.SpawnEnemy (waveData.m_area, waveData.m_type, waveData.m_modifier);
						}
					}
				}
			}
		}
	}
	
	this.CheckWinLostCondition = function () {
		if (this.m_peaceTime == false && this.m_wave > 0) {
			var isWin = true;
			if (this.m_enemies.length > 0 || this.m_projectiles.length > 0) {
				isWin = false;
			}
			if (isWin == true) {
				for (var i=0; i<tempWaveDataList.length; i++) {
					var waveData = tempWaveDataList[i];
					if (this.m_waveTimeCount <= waveData.m_time + (waveData.m_number + 1) * waveData.m_latency) {
						isWin = false;
						break;
					}
				}
			}
			
			if (isWin == true) {
				if (this.m_wave == this.m_mission.m_waveData.length - 1) {
					this.Victory();
				}
				else {
					this.m_peaceTime = true;
					g_gsActionUILayer.m_startButton.SetCaption("Start");
				}
			}
		}
	}
	
	
	this.RegisterEmitter = function (emitter) {
		this.m_emitter.push (emitter);
	}
	this.UnregisterEmitter = function (emitter) {
		for (var i=0; i<this.m_emitter.length; i++) {
			if (this.m_emitter[i] == emitter) {
				this.m_emitter.splice (i, 1);
			}
		}
	}
	
	this.CleanUsedObject = function () {
		for (var i=this.m_turrets.length-1; i>=0; i--) {
			if (this.m_turrets[i].m_active == false) {
				this.m_square[this.m_turrets[i].m_x][this.m_turrets[i].m_y] = BLOCK_FREE;
				this.m_turrets.splice(i, 1);
			}
		}
		
		for (var i=this.m_enemies.length-1; i>=0; i--) {
			if (this.m_enemies[i].m_live == false) {
				this.m_enemies.splice(i, 1);
			}
		}
		
		for (var i=this.m_projectiles.length-1; i>=0; i--) {
			if (this.m_projectiles[i].m_live == false) {
				this.m_projectiles.splice(i, 1);
			}
		}
	}
	
	this.Destroy = function () {
		for (var i=this.m_turrets.length-1; i>=0; i--) {
			this.m_turrets[i].Destroy();
		}
		for (var i=this.m_enemies.length-1; i>=0; i--) {
			this.m_enemies[i].Destroy();
		}
		for (var i=this.m_projectiles.length-1; i>=0; i--) {
			this.m_projectiles[i].Destroy();
		}
		for (var i=this.m_explosions.length-1; i>=0; i--) {
			this.m_explosions[i].Destroy();
		}
		
		if (!this.m_pause) {
			this.PauseGame();
		}
	}
	
	this.Victory = function () {
		if (matchResult == RESULT_NOT_DEFINED) {
			matchResult = RESULT_WIN;
			matchEndCount = 0;
			
			var progressCount = 0;
			for (var i=0; i<g_campaignData.length; i++) {
				for (var j=0; j<g_campaignData[i].m_missionList.length; j++) {
					progressCount ++;
					if (i == campaignID && j == missionID) {
						g_profile.UpdateProgress(progressCount);
						g_gsMissionUILayer.m_topPanel.RefreshLockStatus();
						return;
					}
				}
			}
		}
	}
	this.BaseDestroyed = function () {
		matchResult = RESULT_LOSE;
		matchEndCount = 0;
	}
	// =====================================================================
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// =====================================================================
	// Touch handling
	this.TouchOnMap = function (x, y) {
		var realTouchX = (x - CANVAS_W * 0.5) / this.m_zoom + this.m_cameraX + this.m_mapRealWidth * 0.5;
		var realTouchY = (y - CANVAS_H * 0.5) / this.m_zoom + this.m_cameraY + this.m_mapRealHeight * 0.5;
		var touchX = (realTouchX / BLOCK_SIZE) >> 0;
		var touchY = (realTouchY / BLOCK_SIZE) >> 0;
		
		if (this.m_square[touchX][touchY] == BLOCK_PATH) {
			this.m_selector.SetVisible (false);
			this.m_selector.HideTestTurret();
			this.m_selector.HideRangeFinder();
		}
		else if (this.m_square[touchX][touchY] == BLOCK_OCCUPIED) {
			this.m_selector.SetVisible (false);
			this.m_selector.HideTestTurret();
			this.m_selector.HideRangeFinder();
			//this.Victory();
			//matchResult = RESULT_LOSE;
			//matchEndCount = 2.95;
		}
		else if (this.m_square[touchX][touchY] == BLOCK_FREE) {
			this.m_selector.SetPosition (touchX, touchY);
			this.m_selector.SetVisible (true);
			if (!this.m_selector.m_testTurretShowing) {
				this.m_selector.HideRangeFinder();
			}
		}
		else {
			this.m_selector.SetPosition (touchX, touchY);
			this.m_selector.SetVisible (true);
			this.m_selector.HideTestTurret();
			this.m_selector.ShowRangeFinder (this.m_square[touchX][touchY].GetRange());
		}
		
		return this.m_square[touchX][touchY];
	}
	// =====================================================================
	
	
	
	
	// =====================================================================
	// Camera handling
	this.UpdateCamera = function () {
		layer.setPosition(cc.p((-this.m_cameraX + CANVAS_W * 0.5) * this.m_zoom, (-this.m_cameraY + CANVAS_H * 0.5) * this.m_zoom));
		layer.setScale (this.m_zoom);
	}
	
	this.MoveCamera = function (offsetX, offsetY) {
		this.m_cameraX += offsetX / this.m_zoom;
		this.m_cameraY += offsetY / this.m_zoom;
		
		if (-this.m_mapRealWidth * 0.5 + CANVAS_W * 0.5 / this.m_zoom > 0) {
			this.m_cameraX = 0;
		}
		else if (this.m_cameraX < -this.m_mapRealWidth * 0.5 + CANVAS_W * 0.5 / this.m_zoom) {
			this.m_cameraX = -this.m_mapRealWidth * 0.5 + CANVAS_W * 0.5 / this.m_zoom;
		}
		else if (this.m_cameraX > this.m_mapRealWidth * 0.5 - CANVAS_W * 0.5 / this.m_zoom) {
			this.m_cameraX = this.m_mapRealWidth * 0.5 - CANVAS_W * 0.5 / this.m_zoom;
		}
		
		if (-this.m_mapRealHeight * 0.5 + CANVAS_H * 0.5 / this.m_zoom > 0) {
			this.m_cameraY = 0;
		}
		else if (this.m_cameraY < -this.m_mapRealHeight * 0.5 + CANVAS_H * 0.5 / this.m_zoom) {
			this.m_cameraY = -this.m_mapRealHeight * 0.5 + CANVAS_H * 0.5 / this.m_zoom;
		}
		else if (this.m_cameraY > this.m_mapRealHeight * 0.5 - CANVAS_H * 0.5 / this.m_zoom) {
			this.m_cameraY = this.m_mapRealHeight * 0.5 - CANVAS_H * 0.5 / this.m_zoom;
		}
	}
	
	this.ApplyZoom = function (zoom) {
		if (this.m_mapRealWidth * this.m_zoom * zoom < CANVAS_W || this.m_mapRealHeight * this.m_zoom * zoom < CANVAS_H) {
			return
		}
		
		this.m_zoom *= zoom;
		if (this.m_zoom > 2) {
			this.m_zoom = 2;
		}
		else if (this.m_zoom < 0.5) {
			this.m_zoom = 0.5;
		}
		
		this.MoveCamera (0, 0);
	}
	this.CorrectZoom = function () {
		if (this.m_zoom <= 1.05 && this.m_zoom >= 0.95) {
			this.m_zoom = 1;
		}
		this.MoveCamera (0, 0);
	}
	// =====================================================================
	
	
	this.Init();
	
}