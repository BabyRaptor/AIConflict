function TurretWiki (layer) {
	var instance = this;
	
	
	this.m_nextSelect = 1;
	this.m_internalAlpha = 255;
	this.m_fading = false;
	
	this.Init = function () {
		this.m_rightSubPanel = new SmallPanel(layer, 1, CANVAS_W * 0.5 + 150, CANVAS_H * 0.5 + 50, 11, 11);
	
		this.m_turretButton = [];
		this.m_turretButton[0] = new TurretButton (layer, "res/GSAction/Turret/1-Gatling/Icon.png", TURRET_GATLING_NAME, null, CANVAS_W * 0.5 - 275, CANVAS_H * 0.5 + 275, this.SelectTurret, 1);
		this.m_turretButton[1] = new TurretButton (layer, "res/GSAction/Turret/2-Cannon/Icon.png", TURRET_CANNON_NAME, null, CANVAS_W * 0.5 - 275, CANVAS_H * 0.5 + 200, this.SelectTurret, 2);
		this.m_turretButton[2] = new TurretButton (layer, "res/GSAction/Turret/3-Missile/Icon.png", TURRET_MISSILE_NAME, null, CANVAS_W * 0.5 - 275, CANVAS_H * 0.5 + 125, this.SelectTurret, 3);
		this.m_turretButton[3] = new TurretButton (layer, "res/GSAction/Turret/4-Laser/Icon.png", TURRET_LASER_NAME, null, CANVAS_W * 0.5 - 275, CANVAS_H * 0.5 + 50, this.SelectTurret, 4);
		this.m_turretButton[4] = new TurretButton (layer, "res/GSAction/Turret/5-Gauss/Icon.png", TURRET_GAUSS_NAME, null, CANVAS_W * 0.5 - 275, CANVAS_H * 0.5 - 25, this.SelectTurret, 5);
		this.m_turretButton[5] = new TurretButton (layer, "res/GSAction/Turret/6-Static/Icon.png", TURRET_STATIC_NAME, null, CANVAS_W * 0.5 - 275, CANVAS_H * 0.5 - 100, this.SelectTurret, 6);
		this.m_turretButton[6] = new TurretButton (layer, "res/GSAction/Turret/7-Shock/Turret.png", TURRET_SHOCK_NAME, null, CANVAS_W * 0.5 - 275, CANVAS_H * 0.5 - 175, this.SelectTurret, 7);
		
		this.m_designBoxSprite = cc.Sprite.create("res/GSInfo/DesignBox.png");
		this.m_designBoxSprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_designBoxSprite.setPosition(cc.p(CANVAS_W * 0.5 + 5, CANVAS_H * 0.5 + 196));
		this.m_designBoxSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.m_designBoxSprite.setLocalZOrder (LAYER_UI + 3);
		layer.addChild(this.m_designBoxSprite);
		
		this.m_designSprite = cc.Sprite.create("res/GSInfo/DesignBox.png");
		this.m_designSprite.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_designSprite.setPosition(cc.p(CANVAS_W * 0.5 + 5, CANVAS_H * 0.5 + 196));
		this.m_designSprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.m_designSprite.setLocalZOrder (LAYER_UI + 3);
		layer.addChild(this.m_designSprite);
		
		this.m_paramLabel = [];
		for (var i=0; i<9; i++) {
			this.m_paramLabel[i] = new cc.LabelTTF("Level:", GetFont("Nasalization"), 18);
			this.m_paramLabel[i].setAnchorPoint(cc.p(0, 0.5));
			this.m_paramLabel[i].setPosition (cc.p(CANVAS_W * 0.5 - 95, CANVAS_H * 0.5 + 65 - i * 30));
			this.m_paramLabel[i].setLocalZOrder (LAYER_UI + 3);
			layer.addChild(this.m_paramLabel[i]);
		}
		
		this.m_numberLabel = [];
		for (var j=0; j<5; j++) {
			this.m_numberLabel[j] = [];
			for (var i=0; i<9; i++) {
				this.m_numberLabel[j][i] = new cc.LabelTTF("100", GetFont("Nasalization"), 18);
				this.m_numberLabel[j][i].setAnchorPoint(cc.p(0.5, 0.5));
				this.m_numberLabel[j][i].setPosition (cc.p(CANVAS_W * 0.5 + 105 + j * 65, CANVAS_H * 0.5 + 65 - i * 30));
				this.m_numberLabel[j][i].setLocalZOrder (LAYER_UI + 3);
				layer.addChild(this.m_numberLabel[j][i]);
			}
		}
		
		this.m_paramLabel[0].setString ("Level:");
		this.m_paramLabel[1].setString ("Damage:");
		this.m_paramLabel[2].setString ("Fire rate:");
		this.m_paramLabel[3].setString ("Range:");
		this.m_paramLabel[4].setString ("Penetration:");
		this.m_paramLabel[5].setString ("Speed:");
		this.m_paramLabel[6].setString ("Accuracy:");
		this.m_paramLabel[7].setString ("Splash range:");
		this.m_paramLabel[8].setString ("Total cost:");
		
		for (var i=0; i<5; i++) {
			this.m_numberLabel[i][0].setString ((i + 1) + "");
		}
		
		
		this.SwitchTurretInfo (TURRET_GATLING);
		this.SetOpacity (0);
	}
	
	this.SetOpacity = function (alpha) {
		this.m_alpha = alpha;
		
		this.m_rightSubPanel.SetOpacity (this.m_alpha);
		
		for (var i=0; i<this.m_turretButton.length; i++) {
			this.m_turretButton[i].SetOpacity (this.m_alpha);
			this.m_turretButton[i].SetVisible (this.m_alpha > 0);
		}
		
		
		
		this.m_designBoxSprite.setOpacity (this.m_alpha);
		this.m_designSprite.setOpacity (this.m_internalAlpha * (this.m_alpha / 255));
		for (var i=0; i<this.m_paramLabel.length; i++) {
			this.m_paramLabel[i].setOpacity (this.m_internalAlpha * (this.m_alpha / 255));
		}
		for (var j=0; j<this.m_numberLabel.length; j++) {
			for (var i=0; i<this.m_numberLabel[j].length; i++) {
				this.m_numberLabel[j][i].setOpacity (this.m_internalAlpha * (this.m_alpha / 255));
			}
		}
	}
	
	
	this.AddEventListener = function() {
		for (var i=0; i<this.m_turretButton.length; i++) {
			this.m_turretButton[i].AddEventListener();
		}
	}
	
	this.Update = function (deltaTime) {
		if (this.m_fading == true) {
			this.m_internalAlpha -= deltaTime * GLOBAL_TEXT_FADE_SPEED;
			if (this.m_internalAlpha <= 0) {
				this.m_internalAlpha = 0;
				this.SwitchTurretInfo (this.m_nextSelect);
				this.m_fading = false;
			}
		}
		else {
			this.m_internalAlpha += deltaTime * GLOBAL_TEXT_FADE_SPEED;
			if (this.m_internalAlpha > 255) {
				this.m_internalAlpha = 255;
			}
		}
		
		
		//this.m_designBoxSprite.setOpacity (this.m_internalAlpha * (this.m_alpha / 255));
		this.m_designSprite.setOpacity (this.m_internalAlpha * (this.m_alpha / 255));
		for (var i=0; i<this.m_paramLabel.length; i++) {
			this.m_paramLabel[i].setOpacity (this.m_internalAlpha * (this.m_alpha / 255));
		}
		for (var j=0; j<this.m_numberLabel.length; j++) {
			for (var i=0; i<this.m_numberLabel[j].length; i++) {
				this.m_numberLabel[j][i].setOpacity (this.m_internalAlpha * (this.m_alpha / 255));
			}
		}
	}
	
	
	this.SelectTurret = function (index) {
		instance.m_nextSelect = index;
		instance.m_fading = true;
	}
	this.SwitchTurretInfo = function (index) {
		if (index == TURRET_GATLING) {
			instance.m_paramLabel[1].setString ("Damage:");
			instance.m_designSprite.setTexture ("res/GSAction/Turret/1-Gatling/Design.png");
			for (var i=0; i<5; i++) {
				instance.m_numberLabel[i][1].setString (PROJECTILE_GATLING_DAMAGE[i] + "");
				instance.m_numberLabel[i][2].setString ((1 / TURRET_GATLING_COOLDOWN[i]).toFixed(2) + "");
				instance.m_numberLabel[i][3].setString ((TURRET_GATLING_RANGE[i] * 10) + "");
				instance.m_numberLabel[i][4].setString (PROJECTILE_GATLING_PIERCE[i] * 100 + "%");
				instance.m_numberLabel[i][5].setString (TURRET_GATLING_ROTATE_SPEED[i] + "");
				instance.m_numberLabel[i][6].setString (TURRET_GATLING_ACCURACY[i] + "%");
				instance.m_numberLabel[i][7].setString ("-");
				
				var cost = 0;
				for (j=0; j<=i; j++) {
					cost += TURRET_GATLING_PRICE[j];
				}
				instance.m_numberLabel[i][8].setString (cost);
			}
		}
		else if (index == TURRET_CANNON) {
			instance.m_paramLabel[1].setString ("Damage:");
			instance.m_designSprite.setTexture ("res/GSAction/Turret/2-Cannon/Design.png");
			for (var i=0; i<5; i++) {
				instance.m_numberLabel[i][1].setString (PROJECTILE_CANNON_DAMAGE[i] + "");
				instance.m_numberLabel[i][2].setString ((1 / TURRET_CANNON_COOLDOWN[i]).toFixed(2) + "");
				instance.m_numberLabel[i][3].setString ((TURRET_CANNON_RANGE[i] * 10) + "");
				instance.m_numberLabel[i][4].setString (PROJECTILE_CANNON_PIERCE[i] * 100 + "%");
				instance.m_numberLabel[i][5].setString (TURRET_CANNON_ROTATE_SPEED[i] + "");
				instance.m_numberLabel[i][6].setString (TURRET_CANNON_ACCURACY[i] + "%");
				instance.m_numberLabel[i][7].setString ((PROJECTILE_CANNON_AOE[i] * 10) + "");
				
				var cost = 0;
				for (j=0; j<=i; j++) {
					cost += TURRET_CANNON_PRICE[j];
				}
				instance.m_numberLabel[i][8].setString (cost);
			}
		}
		else if (index == TURRET_MISSILE) {
			instance.m_paramLabel[1].setString ("Damage:");
			instance.m_designSprite.setTexture ("res/GSAction/Turret/3-Missile/Design.png");
			for (var i=0; i<5; i++) {
				instance.m_numberLabel[i][1].setString (PROJECTILE_MISSILE_DAMAGE[i] + "");
				instance.m_numberLabel[i][2].setString ((1 / TURRET_MISSILE_COOLDOWN[i]).toFixed(2) + "");
				instance.m_numberLabel[i][3].setString ((TURRET_MISSILE_RANGE[i] * 10) + "");
				instance.m_numberLabel[i][4].setString (PROJECTILE_MISSILE_PIERCE[i] * 100 + "%");
				instance.m_numberLabel[i][5].setString (TURRET_MISSILE_ROTATE_SPEED[i] + "");
				instance.m_numberLabel[i][6].setString (TURRET_MISSILE_ACCURACY[i] + "%");
				instance.m_numberLabel[i][7].setString ((PROJECTILE_MISSILE_AOE[i] * 10) + "");
				
				var cost = 0;
				for (j=0; j<=i; j++) {
					cost += TURRET_MISSILE_PRICE[j];
				}
				instance.m_numberLabel[i][8].setString (cost);
			}
		}
		else if (index == TURRET_LASER) {
			instance.m_paramLabel[1].setString ("Damage per sec:");
			instance.m_designSprite.setTexture ("res/GSAction/Turret/4-Laser/Design.png");
			for (var i=0; i<5; i++) {
				instance.m_numberLabel[i][1].setString (PROJECTILE_LASER_DAMAGE[i]);
				instance.m_numberLabel[i][2].setString ("-");
				instance.m_numberLabel[i][3].setString ((TURRET_LASER_RANGE[i] * 10) + "");
				instance.m_numberLabel[i][4].setString (PROJECTILE_LASER_PIERCE[i] * 100 + "%");
				instance.m_numberLabel[i][5].setString (TURRET_LASER_ROTATE_SPEED[i] + "");
				instance.m_numberLabel[i][6].setString (TURRET_LASER_ACCURACY[i] + "%");
				instance.m_numberLabel[i][7].setString ("-");
				
				var cost = 0;
				for (j=0; j<=i; j++) {
					cost += TURRET_LASER_PRICE[j];
				}
				instance.m_numberLabel[i][8].setString (cost);
			}
		}
		else if (index == TURRET_GAUSS) {
			instance.m_paramLabel[1].setString ("Damage:");
			instance.m_designSprite.setTexture ("res/GSAction/Turret/5-Gauss/Design.png");
			for (var i=0; i<5; i++) {
				instance.m_numberLabel[i][1].setString (PROJECTILE_GAUSS_DAMAGE[i] + "");
				instance.m_numberLabel[i][2].setString ((1 / TURRET_GAUSS_COOLDOWN[i]).toFixed(2) + "");
				instance.m_numberLabel[i][3].setString ((TURRET_GAUSS_RANGE[i] * 10) + "");
				instance.m_numberLabel[i][4].setString (PROJECTILE_GAUSS_PIERCE[i] * 100 + "%");
				instance.m_numberLabel[i][5].setString (TURRET_GAUSS_ROTATE_SPEED[i] + "");
				instance.m_numberLabel[i][6].setString (TURRET_GAUSS_ACCURACY[i] + "%");
				instance.m_numberLabel[i][7].setString ("10");
				
				var cost = 0;
				for (j=0; j<=i; j++) {
					cost += TURRET_GAUSS_PRICE[j];
				}
				instance.m_numberLabel[i][8].setString (cost);
			}
		}
		else if (index == TURRET_STATIC) {
			instance.m_paramLabel[1].setString ("Damage per sec:");
			instance.m_designSprite.setTexture ("res/GSAction/Turret/6-Static/Design.png");
			for (var i=0; i<5; i++) {
				instance.m_numberLabel[i][1].setString (PROJECTILE_STATIC_DAMAGE[i]);
				instance.m_numberLabel[i][2].setString ((1 / TURRET_STATIC_COOLDOWN[i]).toFixed(2) + "");
				instance.m_numberLabel[i][3].setString ((TURRET_STATIC_RANGE[i] * 10) + "");
				instance.m_numberLabel[i][4].setString (PROJECTILE_STATIC_PIERCE[i] * 100 + "%");
				instance.m_numberLabel[i][5].setString (TURRET_STATIC_ROTATE_SPEED[i] + "");
				instance.m_numberLabel[i][6].setString (TURRET_STATIC_ACCURACY[i] + "%");
				instance.m_numberLabel[i][7].setString ((PROJECTILE_STATIC_AOE[i] * 10) + "");
				
				var cost = 0;
				for (j=0; j<=i; j++) {
					cost += TURRET_STATIC_PRICE[j];
				}
				instance.m_numberLabel[i][8].setString (cost);
			}
		}
		else if (index == TURRET_SHOCK) {
			instance.m_paramLabel[1].setString ("Damage:");
			instance.m_designSprite.setTexture ("res/GSAction/Turret/7-Shock/Design.png");
			for (var i=0; i<5; i++) {
				instance.m_numberLabel[i][1].setString (PROJECTILE_SHOCK_DAMAGE[i] + "");
				instance.m_numberLabel[i][2].setString ((1 / TURRET_SHOCK_COOLDOWN[i]).toFixed(2) + "");
				instance.m_numberLabel[i][3].setString ((TURRET_SHOCK_RANGE[i] * 10) + "");
				instance.m_numberLabel[i][4].setString (PROJECTILE_SHOCK_PIERCE[i] * 100 + "%");
				instance.m_numberLabel[i][5].setString ("-");
				instance.m_numberLabel[i][6].setString (TURRET_SHOCK_ACCURACY[i] + "%");
				instance.m_numberLabel[i][7].setString ((TURRET_SHOCK_RANGE[i] * 10) + "");
				
				var cost = 0;
				for (j=0; j<=i; j++) {
					cost += TURRET_SHOCK_PRICE[j];
				}
				instance.m_numberLabel[i][8].setString (cost);
			}
		}
	}

	
	
	
	
	this.Init();
}