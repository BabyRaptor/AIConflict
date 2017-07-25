function MissionInfo (layer, x, y) {
	var instance = this;

	var PANEL_W = 8;
	var PANEL_H = 7;
	var MOVE_AMOUNT = 600;
	var MOVE_SPEED = 1300;

	var PANEL_TITLE_X = 00;
	var PANEL_TITLE_Y = 190;
	var LBL_SELECTMISSION_X = 0;
	var LBL_SELECTMISSION_Y = 190;
	
	var BTN_START_X = -225;
	var BTN_START_Y= -260;
	var BTN_CLOSE_X = 225;
	var BTN_CLOSE_Y= -260;
	
	var MISSION_MAP_X = 0;
	var MISSION_MAP_Y = 42;
	
	var SMALL_THUMBNAIL_X = [-200, 0, 200, -200, 0, 200];
	var SMALL_THUMBNAIL_Y = [50, 50, 50, -74, -74, -74];
	
	var THUMBNAIL_SWITCH_SPEED = 3;
	
	
	
	this.m_x = x;
	this.m_y = y;
	
	this.m_showing = false;
	
	this.m_infoPanel = new BigPanel(layer, 1, x, y, PANEL_W, PANEL_H);
	
	this.m_titlePanel = new SmallPanel(layer, 1, x + PANEL_TITLE_X, y + PANEL_TITLE_Y, 12, 2);
	
	this.m_lblSelectMission = new cc.LabelTTF(" SELECT MISSION ", GetFont("Nasalization"), 40);
	this.m_lblSelectMission.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_lblSelectMission.setPosition (cc.p(x + LBL_SELECTMISSION_X, y + LBL_SELECTMISSION_Y));
	this.m_lblSelectMission.setLocalZOrder (LAYER_UI + 1);
	this.m_lblSelectMission.setFontFillColor (new cc.Color(255, 255, 255));
	this.m_lblSelectMission.enableStroke (new cc.Color(16, 173, 255, 0.5), 1);
	this.m_lblSelectMission.enableShadow (new cc.Color(100, 220, 255, 255), cc.size(0, 0), 15);
	layer.addChild(this.m_lblSelectMission);
	
	
	this.m_missionBorder = new Array();
	this.m_missionThumbnail = new Array();
	for (var i=0; i<6; i++) {
		this.m_missionThumbnail[i] = cc.Sprite.create("res/GSMission/Thumbnail/Thumb-1-1.png");
		this.m_missionThumbnail[i].setAnchorPoint(0.5, 0.5);
		this.m_missionThumbnail[i].setPosition(cc.p(this.m_x + SMALL_THUMBNAIL_X[i], this.m_y + SMALL_THUMBNAIL_Y[i]));
		this.m_missionThumbnail[i].setLocalZOrder (LAYER_UI + 1);
		layer.addChild(this.m_missionThumbnail[i]);
		
		this.m_missionBorder[i] = cc.Sprite.create("res/GSMission/Thumbnail/Border.png");
		this.m_missionBorder[i].setAnchorPoint(0.5, 0.5);
		this.m_missionBorder[i].setPosition(cc.p(this.m_x + SMALL_THUMBNAIL_X[i], this.m_y + SMALL_THUMBNAIL_Y[i]));
		this.m_missionBorder[i].setLocalZOrder (LAYER_UI + 2);
		layer.addChild(this.m_missionBorder[i]);
	}
	
	this.m_missionSelector = cc.Sprite.create("res/GSMission/Thumbnail/BorderGlow.png");
	this.m_missionSelector.setAnchorPoint(0.5, 0.5);
	this.m_missionSelector.setLocalZOrder (LAYER_UI + 2);
	this.m_missionSelector.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_missionSelector.setPosition(cc.p(this.m_x + SMALL_THUMBNAIL_X[0], this.m_y + SMALL_THUMBNAIL_Y[0]));
	this.m_missionSelector.setOpacity (0);
	layer.addChild(this.m_missionSelector);
	
	
	var campaign = -1;
	var selecting = -1;
	var selectorAlpha = 0;
	var moveOffset = MOVE_AMOUNT;
	
	
	this.Init = function () {
		this.m_startButton = new BigButton (layer, 1, "Start", x + BTN_START_X, y + BTN_START_Y, this.Start);
		this.m_closeButton = new BigButton (layer, 2, "Close", x + BTN_CLOSE_X, y + BTN_CLOSE_Y, this.Close);
	}
	
	this.Show = function (c) {
		if (((g_profile.m_progress / 3) >> 0) < c) return;
		
		if (campaign != c) {
			campaign = c;
			selecting = 0;
			
			// This guarantee that we'll select the latest mission
			for (var i=0; i<6; i++) {
				this.SwitchMission(i);
			}
			
			this.RefreshLockStatus();
		}	
		this.m_showing = true;
	}
	
	this.SwitchMission = function (mission) {
		if (g_campaignData[campaign].m_missionList[mission] != null) {
			if (g_campaignData[campaign].m_missionList[mission].m_locked == false) {
				selecting = mission;
			}
		}
	}
	
	this.Hide = function () {
		this.m_showing = false;
	}
	
	this.RefreshLockStatus = function () {
		for (var i=0; i<6; i++) {
			if (g_campaignData[campaign].m_missionList[i] != null) {
				this.m_missionThumbnail[i].setTexture(g_campaignData[campaign].m_missionList[i].m_mapThumbnail);
				if (g_campaignData[campaign].m_missionList[i].m_locked == true) {
					this.m_missionBorder[i].setTexture("res/GSMission/Thumbnail/BorderLock.png");
				}
				else {
					this.m_missionBorder[i].setTexture("res/GSMission/Thumbnail/Border.png");
				}
				this.m_missionThumbnail[i].setVisible(true);
				this.m_missionBorder[i].setVisible(true);
			}
			else {
				this.m_missionThumbnail[i].setVisible(false);
				this.m_missionBorder[i].setVisible(false);
			}
		}
	}
	
	
	
	this.AddEventListener = function() {
		this.m_infoPanel.AddEventListener();
		this.m_startButton.AddEventListener();
		this.m_closeButton.AddEventListener();
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				for (var i=0; i<6; i++) {
					if (touch.getLocation().x >= instance.m_x + SMALL_THUMBNAIL_X[i] - 100
					&&  touch.getLocation().x <= instance.m_x + SMALL_THUMBNAIL_X[i] + 100
					&&  touch.getLocation().y >= instance.m_y + SMALL_THUMBNAIL_Y[i] - 60 + moveOffset
					&&  touch.getLocation().y <= instance.m_y + SMALL_THUMBNAIL_Y[i] + 60 + moveOffset) {
						instance.SwitchMission (i);
						return true;
					}
				}
			},
			onTouchMoved: function (touch, event) {
				
			},
			onTouchEnded: function (touch, event) {
				
			}
		}, this.m_lblSelectMission);
	}
	
	this.Update = function (deltaTime) {
	if (this.m_showing == true) {
			moveOffset -= deltaTime * MOVE_SPEED;
			if (moveOffset < 0) {
				moveOffset = 0;
			}
		}
		else {
			moveOffset += deltaTime * MOVE_SPEED;
			if (moveOffset > MOVE_AMOUNT) {
				moveOffset = MOVE_AMOUNT;
			}
		}
		
		this.m_infoPanel.SetPosition (this.m_x, this.m_y + moveOffset);
		this.m_titlePanel.SetPosition (this.m_x + PANEL_TITLE_X, this.m_y + moveOffset + PANEL_TITLE_Y);
		this.m_lblSelectMission.setPosition (cc.p(this.m_x + LBL_SELECTMISSION_X, this.m_y + moveOffset + LBL_SELECTMISSION_Y));
		
		this.m_startButton.SetPosition (this.m_x + BTN_START_X, this.m_y + BTN_START_Y + moveOffset);
		this.m_closeButton.SetPosition (this.m_x + BTN_CLOSE_X, this.m_y + BTN_CLOSE_Y + moveOffset);
		
		for (var i=0; i<6; i++) {
			this.m_missionThumbnail[i].setPosition(cc.p(this.m_x + SMALL_THUMBNAIL_X[i], this.m_y + SMALL_THUMBNAIL_Y[i] + moveOffset));
			this.m_missionBorder[i].setPosition(cc.p(this.m_x + SMALL_THUMBNAIL_X[i], this.m_y + SMALL_THUMBNAIL_Y[i] + moveOffset));
		}
		
		if (selecting >= 0) {
			this.m_missionSelector.setPosition(cc.p(this.m_x + SMALL_THUMBNAIL_X[selecting], this.m_y + SMALL_THUMBNAIL_Y[selecting] + moveOffset));
			
			selectorAlpha += deltaTime * 3;
			if (selectorAlpha > 6.28) { // 2 * pi
				selectorAlpha = 0;
			}
			
			var actualAlpha = Math.sin (selectorAlpha);
			if (actualAlpha < 0) actualAlpha *= -1;
			
			this.m_missionSelector.setOpacity (actualAlpha * 255);
		}
		else {
			this.m_missionSelector.setOpacity (0);
		}
	}
	
	this.Start = function () {
		PushAction(campaign, selecting);
	}
	
	this.Close = function () {
		instance.m_showing = false;
	}
	
	this.Init();
}