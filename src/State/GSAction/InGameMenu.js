function InGameMenu (layer, x, y) {
	var instance = this;
	
	
	this.m_visible = false;
	this.m_restartConfirm = false;
	this.m_quitConfirm = false;
	
	this.Init = function () {
		this.m_maskPanel = new BigPanel(layer, 1, x, y, 15, 8);
		this.m_panel = new MediumPanel(layer, 1, x, y, 11, 3);
		this.m_resumeButton = new BigButton (layer, 3, "Resume", x - 150, y + 25, this.Close);
		this.m_restartButton = new BigButton (layer, 1, "Restart", x, y + 25, this.RestartGame);
		this.m_quitButton = new BigButton (layer, 2, "Quit", x + 150, y + 25, this.Quit);
		this.m_shopButton = new BigButton (layer, 1, "Shop", x - 150, y - 25);
		this.m_upgradeButton = new BigButton (layer, 1, "Research", x, y - 25, this.GoToUpgrade);
		this.m_infoButton = new BigButton (layer, 1, "Info", x + 150, y - 25, this.GoToInfo);
		
	}
	
	this.SetVisible = function (visible) {
		instance.m_visible = visible;
		instance.m_maskPanel.SetVisible (instance.m_visible);
		instance.m_panel.SetVisible (instance.m_visible);
		instance.m_resumeButton.SetVisible (instance.m_visible);
		instance.m_restartButton.SetVisible (instance.m_visible);
		instance.m_quitButton.SetVisible (instance.m_visible);
		instance.m_shopButton.SetVisible (instance.m_visible);
		instance.m_upgradeButton.SetVisible (instance.m_visible);
		instance.m_infoButton.SetVisible (instance.m_visible);
	}
	
	
	this.AddEventListener = function() {
		instance.m_maskPanel.AddEventListener();
		instance.m_resumeButton.AddEventListener();
		instance.m_restartButton.AddEventListener();
		instance.m_quitButton.AddEventListener();
		instance.m_shopButton.AddEventListener();
		instance.m_upgradeButton.AddEventListener();
		instance.m_infoButton.AddEventListener();
	}
	
	this.Update = function (deltaTime) {
		
	}
	
	this.Open = function () {
		g_battle.m_forcePause = true;
		instance.SetVisible (true);
		
		this.m_restartConfirm = false;
		instance.m_restartButton.SetCaption ("Restart");
		this.m_quitConfirm = false;
		instance.m_quitButton.SetCaption ("Quit");
	}
	this.Close = function () {
		g_battle.m_forcePause = false;
		instance.SetVisible (false);
	}
	
	this.ResetConfirmStatus = function () {
		this.m_restartConfirm = false;
		instance.m_restartButton.SetCaption ("Restart");
		this.m_quitConfirm = false;
		instance.m_quitButton.SetCaption ("Quit");
	}
	
	this.RestartGame = function () {
		if (instance.m_restartConfirm == false) {
			instance.ResetConfirmStatus();
			instance.m_restartConfirm = true;
			instance.m_restartButton.SetCaption ("Confirm?");
		}
		else {
			g_gsAction.RestartBattle();
			instance.Close();
		}
	}
	this.Quit = function () {
		if (instance.m_quitConfirm == false) {
			instance.ResetConfirmStatus();
			instance.m_quitConfirm = true;
			instance.m_quitButton.SetCaption ("Confirm?");
		}
		else {
			g_gsAction.Destroy();
			instance.Close();
			PopState();
		}
	}
	this.GoToInfo = function () {
		instance.ResetConfirmStatus();
		PushInfo();
	}
	this.GoToUpgrade = function () {
		instance.ResetConfirmStatus();
		PushUpgrade();
	}
	
	this.Init();
	this.SetVisible (false);
}