function ResultPopup (layer, x, y) {
	var instance = this;
	this.m_visible = false;
	this.m_win = false;
	
	this.Init = function () {
		this.m_maskPanel = new BigPanel(layer, 1, x, y, 15, 8);
		this.m_panel = new MediumPanel(layer, 1, x, y, 8, 10);
		
		this.m_resultLabel = new cc.LabelTTF("MISSION COMPLETED", GetFont("Nasalization"), 24);
		this.m_resultLabel.setAnchorPoint(cc.p(0.5, 0.5));
		this.m_resultLabel.setPosition (cc.p(x, y + 195));
		this.m_resultLabel.setLocalZOrder (LAYER_UI);
		layer.addChild(this.m_resultLabel);
	
		this.m_restartButton = new BigButton (layer, 1, "Restart", x - 75, y - 195, this.RestartGame);
		this.m_quitButton = new BigButton (layer, 1, "Quit", x + 75, y - 195, this.Quit);
	}
	
	this.Open = function (win) {
		g_battle.m_forcePause = true;
		instance.SetVisible (true);
		
		if (win) {
			instance.m_resultLabel.setString ("MISSION COMPLETED");
			instance.m_resultLabel.setFontFillColor (new cc.Color(0, 255, 50, 255));
		}
		else {
			instance.m_resultLabel.setString ("MISSION FAILED");
			instance.m_resultLabel.setFontFillColor (new cc.Color(255, 50, 0, 255));
		}
		
		this.m_win = win;
	}
	this.Close = function () {
		g_battle.m_forcePause = false;
		instance.SetVisible (false);
	}
	
	this.SetVisible = function (visible) {
		instance.m_visible = visible;
		instance.m_maskPanel.SetVisible (instance.m_visible);
		instance.m_panel.SetVisible (instance.m_visible);
		instance.m_resultLabel.setVisible (instance.m_visible);
		instance.m_restartButton.SetVisible (instance.m_visible);
		instance.m_quitButton.SetVisible (instance.m_visible);
	}
	
	
	this.AddEventListener = function() {
		instance.m_maskPanel.AddEventListener();
		instance.m_restartButton.AddEventListener();
		instance.m_quitButton.AddEventListener();
	}
	
	this.Update = function (deltaTime) {
		
	}
	
	this.RestartGame = function () {
		g_gsAction.RestartBattle();
		instance.Close();
	}
	this.Quit = function () {
		g_gsAction.Destroy();
		instance.Close();
		PopState();
	}
	
	this.Init();
	this.SetVisible (false);
}