var g_localStorage = cc.sys.localStorage;

function UserProfile () {
	this.m_progress = 0;
	this.m_money = 5000;
	
	this.m_upgrade = [];
	for (var i=0; i<g_upgrade.length; i++) {
		this.m_upgrade[i] = false;
	}
	
	this.SaveProfile = function() {
		g_localStorage.setItem("m_progress", this.m_progress);
		g_localStorage.setItem("m_money", this.m_money);
		g_localStorage.setItem("m_upgrade", JSON.stringify(this.m_upgrade));
	}
	
	this.LoadProfile = function() {
		if (g_localStorage.getItem("m_progress") != null) {
			this.m_progress = g_localStorage.getItem("m_progress");
			this.m_money = g_localStorage.getItem("m_money");
			this.m_upgrade = JSON.parse(g_localStorage.getItem("m_upgrade"));
		}
		this.UnlockProgress();
	}
	
	this.UpdateProgress = function(progress) {
		if (this.m_progress < progress) {
			this.m_progress = progress;
			this.SaveProfile();
			this.UnlockProgress();
		}
	}
	this.UnlockProgress = function() {
		var tempProgress = 0;
		for (var i=0; i<g_campaignData.length; i++) {
			g_campaignData[i].m_locked = false;
			for (var j=0; j<g_campaignData[i].m_missionList.length; j++) {
				g_campaignData[i].m_missionList[j].m_locked = false;
				
				tempProgress ++;
				if (tempProgress > this.m_progress) {
					return;
				}
			}
		}
	}
	
	this.Upgrade = function (id) {
		if (this.m_upgrade[id] == false) {
			if (this.m_money >= g_upgrade[id].m_price) {
				this.m_money -= g_upgrade[id].m_price;
				this.m_upgrade[id] = true;
				this.SaveProfile();
			}
		}
	}
}

var g_profile = new UserProfile();
g_profile.LoadProfile();