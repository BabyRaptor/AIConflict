function TurretBuyingList (layer, x, y, callback) {
	var MOVE_AMOUNT = 350;
	var MOVE_SPEED = 1000;
	var moveOffset = 0;
	
	this.m_x = x;
	this.m_y = y;
	
	this.m_buildPanel = new MediumPanel(layer, 1, x, y, 8, 12);
	
	this.m_turretButton = [];
	
	this.m_turretButton[0] = new TurretButton (layer, "res/GSAction/Turret/1-Gatling/Icon.png", TURRET_GATLING_NAME, TURRET_GATLING_PRICE[0], x, y, callback, 1);
	this.m_turretButton[1] = new TurretButton (layer, "res/GSAction/Turret/2-Cannon/Icon.png", TURRET_CANNON_NAME, TURRET_CANNON_PRICE[0], x, y, callback, 2);
	this.m_turretButton[2] = new TurretButton (layer, "res/GSAction/Turret/3-Missile/Icon.png", TURRET_MISSILE_NAME, TURRET_MISSILE_PRICE[0], x, y, callback, 3);
	this.m_turretButton[3] = new TurretButton (layer, "res/GSAction/Turret/4-Laser/Icon.png", TURRET_LASER_NAME, TURRET_LASER_PRICE[0], x, y, callback, 4);
	this.m_turretButton[4] = new TurretButton (layer, "res/GSAction/Turret/5-Gauss/Icon.png", TURRET_GAUSS_NAME, TURRET_GAUSS_PRICE[0], x, y, callback, 5);
	this.m_turretButton[5] = new TurretButton (layer, "res/GSAction/Turret/6-Static/Icon.png", TURRET_STATIC_NAME, TURRET_STATIC_PRICE[0], x, y, callback, 6);
	this.m_turretButton[6] = new TurretButton (layer, "res/GSAction/Turret/7-Shock/Turret.png", TURRET_SHOCK_NAME, TURRET_SHOCK_PRICE[0], x, y, callback, 7);
	
	this.m_showing = false;
	
	this.AddEventListener = function() {
		for (var i=0; i<this.m_turretButton.length; i++) {
			this.m_turretButton[i].AddEventListener();
		}
		this.m_buildPanel.AddEventListener();
	}
	
	this.Update = function (deltaTime) {
		if (this.m_showing == true) {
			moveOffset += deltaTime * MOVE_SPEED;
			if (moveOffset > MOVE_AMOUNT) {
				moveOffset = MOVE_AMOUNT;
			}
		}
		else {
			moveOffset -= deltaTime * MOVE_SPEED;
			if (moveOffset < 0) {
				moveOffset = 0;
			}
		}
		
		this.m_buildPanel.SetPosition (this.m_x + moveOffset, this.m_y);
		for (var i=0; i<this.m_turretButton.length; i++) {
			this.m_turretButton[i].SetPosition (this.m_x + 15 + moveOffset, this.m_y + 225 - i * 75);
		}
		
		if (g_battle.m_money < TURRET_GATLING_PRICE[0]) this.m_turretButton[0].SetEnable (false);
		else this.m_turretButton[0].SetEnable (true);
		
		if (g_battle.m_money < TURRET_CANNON_PRICE[0]) this.m_turretButton[1].SetEnable (false);
		else this.m_turretButton[1].SetEnable (true);
		
		if (g_battle.m_money < TURRET_MISSILE_PRICE[0]) this.m_turretButton[2].SetEnable (false);
		else this.m_turretButton[2].SetEnable (true);
		
		if (g_battle.m_money < TURRET_LASER_PRICE[0]) this.m_turretButton[3].SetEnable (false);
		else this.m_turretButton[3].SetEnable (true);
		
		if (g_battle.m_money < TURRET_GAUSS_PRICE[0]) this.m_turretButton[4].SetEnable (false);
		else this.m_turretButton[4].SetEnable (true);
		
		if (g_battle.m_money < TURRET_STATIC_PRICE[0]) this.m_turretButton[5].SetEnable (false);
		else this.m_turretButton[5].SetEnable (true);
		
		if (g_battle.m_money < TURRET_SHOCK_PRICE[0]) this.m_turretButton[6].SetEnable (false);
		else this.m_turretButton[6].SetEnable (true);
	}
	
	this.SwitchToConfirmMode = function (param) {
		this.Reset();
		this.m_turretButton[param-1].SwitchToConfirmMode();
	}
	
	this.Reset = function () {
		for (var i=0; i<this.m_turretButton.length; i++) {
			this.m_turretButton[i].SwitchToNormalMode();
		}
	}
}