function CampaignData () {
	// On starmap
	this.m_mapX = 0;
	this.m_mapY = 0;
	
	this.m_locked = true;
	
	this.m_missionList = [];
}


var g_campaignData = [];

g_campaignData[0] = new CampaignData();
g_campaignData[0].m_mapX = -200;
g_campaignData[0].m_mapY = -150;

g_campaignData[1] = new CampaignData();
g_campaignData[1].m_mapX = -150;
g_campaignData[1].m_mapY = -30;

g_campaignData[2] = new CampaignData();
g_campaignData[2].m_mapX = 30;
g_campaignData[2].m_mapY = -110;

g_campaignData[3] = new CampaignData();
g_campaignData[3].m_mapX = 220;
g_campaignData[3].m_mapY = -180;

g_campaignData[4] = new CampaignData();
g_campaignData[4].m_mapX = 350;
g_campaignData[4].m_mapY = -20;

g_campaignData[5] = new CampaignData();
g_campaignData[5].m_mapX = 150;
g_campaignData[5].m_mapY = 100;

g_campaignData[6] = new CampaignData();
g_campaignData[6].m_mapX = 70;
g_campaignData[6].m_mapY = 280;

g_campaignData[7] = new CampaignData();
g_campaignData[7].m_mapX = -300;
g_campaignData[7].m_mapY = 180;


function MissionData () {
	this.m_backgroundPath = "";
	this.m_mapPath = "";
	this.m_mapThumbnail = "";
	
	this.m_locked = true;
	this.m_waveData = new Array();
	this.m_waveData[0] = "Bleh"; // Pseudo.
	
	this.AddWaveData = function (wave, data) {
		if (!this.m_waveData[wave]) {
			this.m_waveData[wave] = new Array();
		}
		this.m_waveData[wave].push (data);
	}
	
	this.m_money = 0;
}

function WaveData(gate, time, area, type, number, latency, modifier) {
	this.m_gate = gate;
	this.m_time = time;
	this.m_area = area;
	this.m_type = type;
	this.m_number = number;
	this.m_latency = latency;
	this.m_modifier = modifier;
}

var tempMission;

// ======================================================================================================
// MISSION 1 - AREA 1
tempMission = new MissionData();
tempMission.m_backgroundPath = "res/GSAction/Background/1.jpg";
tempMission.m_mapPath = "res/GSAction/Map/1.tmx";
tempMission.m_mapThumbnail = "res/GSMission/Thumbnail/Thumb-1-1.png";
tempMission.m_money = 300;

/*                        Wave               Gate | Start | Area | Type | Number | Latency | Modifier  */
tempMission.AddWaveData (   1, new WaveData(   0,      1,     1,     1,      10,        1,         1  ));
tempMission.AddWaveData (   2, new WaveData(   0,      1,     1,     1,      10,        1,       1.3  )); 
tempMission.AddWaveData (   3, new WaveData(   0,      1,     1,     1,      15,        1,       1.7  )); 
tempMission.AddWaveData (   4, new WaveData(   0,      1,     1,     2,      10,        1,       1.8  )); 
tempMission.AddWaveData (   5, new WaveData(   0,      1,     1,     2,      10,        1,         2  )); 
tempMission.AddWaveData (   5, new WaveData(   0,    1.5,     1,     1,      10,        1,         2  )); 
tempMission.AddWaveData (   6, new WaveData(   0,      1,     1,     2,      15,      0.8,       2.5  )); 
tempMission.AddWaveData (   6, new WaveData(   0,    1.5,     1,     1,      15,      0.8,       2.5  )); 

g_campaignData[0].m_missionList.push (tempMission);
// ======================================================================================================




// ====================================================================
tempMission = new MissionData();
tempMission.m_backgroundPath = "res/GSAction/Background/1.jpg";
tempMission.m_mapPath = "res/GSAction/Map/2.tmx";
tempMission.m_mapThumbnail = "res/GSMission/Thumbnail/Thumb-1-2.png";
tempMission.m_money = 500;

/*                        Wave               Gate | Start | Area | Type | Number | Latency | Modifier  */
tempMission.AddWaveData (   1, new WaveData(   0,      1,     1,     1,      10,        1,       1.5  ));
tempMission.AddWaveData (   2, new WaveData(   0,      1,     1,     2,      10,        1,         2  ));
tempMission.AddWaveData (   2, new WaveData(   0,    1.3,     1,     1,      10,        1,         2  ));
tempMission.AddWaveData (   3, new WaveData(   0,      1,     1,     3,      20,        1,       2.5  ));
tempMission.AddWaveData (   4, new WaveData(   0,      1,     1,     2,      10,        1,         3  ));
tempMission.AddWaveData (   4, new WaveData(   0,      5,     1,     3,      10,        1,         3  ));
tempMission.AddWaveData (   5, new WaveData(   0,      1,     1,     1,      10,        1,       3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,    1.3,     1,     2,      10,        1,       3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,    1.6,     1,     3,      10,        1,       3.5  ));
tempMission.AddWaveData (   6, new WaveData(   0,      1,     1,     2,      15,        1,         4  ));
tempMission.AddWaveData (   6, new WaveData(   0,      5,     1,     3,      15,      0.5,         4  ));
tempMission.AddWaveData (   7, new WaveData(   0,      1,     1,     2,      15,      0.5,       4.5  ));
tempMission.AddWaveData (   7, new WaveData(   0,    1.5,     1,     3,      15,      0.5,       4.5  ));


g_campaignData[0].m_missionList.push (tempMission);
// ====================================================================

tempMission = new MissionData();
tempMission.m_backgroundPath = "res/GSAction/Background/1.jpg";
tempMission.m_mapPath = "res/GSAction/Map/3.tmx";
tempMission.m_mapThumbnail = "res/GSMission/Thumbnail/Thumb-1-3.png";
tempMission.m_money = 400;

/*                        Wave               Gate | Start | Area | Type | Number | Latency | Modifier  */
tempMission.AddWaveData (   1, new WaveData(   0,      1,     1,     1,      10,        2,         2  ));
tempMission.AddWaveData (   2, new WaveData(   0,      1,     1,     1,      15,        2,       2.5  ));
tempMission.AddWaveData (   3, new WaveData(   0,      1,     1,     2,      15,        2,         3  ));
tempMission.AddWaveData (   4, new WaveData(   0,      1,     1,     1,      10,      1.5,         3  ));
tempMission.AddWaveData (   4, new WaveData(   0,      3,     1,     4,       1,        1,         3  ));
tempMission.AddWaveData (   5, new WaveData(   0,      1,     1,     2,      15,      1.5,       3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,      5,     1,     3,      15,      0.5,       3.5  ));
tempMission.AddWaveData (   6, new WaveData(   0,      1,     1,     4,       3,        5,         4  ));
tempMission.AddWaveData (   6, new WaveData(   0,      3,     1,     3,      15,        1,         4  ));
tempMission.AddWaveData (   7, new WaveData(   0,      1,     1,     4,       5,        5,       4.5  ));
tempMission.AddWaveData (   7, new WaveData(   0,      1,     1,     2,      15,        1,       4.5  ));

g_campaignData[0].m_missionList.push (tempMission);
// ====================================================================

tempMission = new MissionData();
tempMission.m_backgroundPath = "res/GSAction/Background/1.jpg";
tempMission.m_mapPath = "res/GSAction/Map/4.tmx";
tempMission.m_mapThumbnail = "res/GSMission/Thumbnail/Thumb-1-4.png";
tempMission.m_money = 1000;

/*                        Wave               Gate | Start | Area | Type | Number | Latency | Modifier  */
tempMission.AddWaveData (   1, new WaveData(   0,      1,     1,     1,      10,      1.2,     1.5  ));
tempMission.AddWaveData (   1, new WaveData(   1,      1,     1,     1,      10,      1.2,     1.5  ));
tempMission.AddWaveData (   2, new WaveData(   0,      1,     1,     3,      15,        1,       2  ));
tempMission.AddWaveData (   2, new WaveData(   1,      1,     1,     3,      15,        1,       2  ));
tempMission.AddWaveData (   3, new WaveData(   0,      1,     1,     2,      15,      1.2,     2.5  ));
tempMission.AddWaveData (   3, new WaveData(   0,      5,     1,     4,       1,        1,       3  ));
tempMission.AddWaveData (   3, new WaveData(   1,      1,     1,     3,      20,      0.6,     2.5  ));
tempMission.AddWaveData (   4, new WaveData(   1,      1,     1,     2,      10,        1,       3  ));
tempMission.AddWaveData (   4, new WaveData(   1,      5,     1,     4,       2,        3,       3  ));
tempMission.AddWaveData (   4, new WaveData(   0,      1,     1,     2,      10,        1,       3  ));
tempMission.AddWaveData (   4, new WaveData(   0,      5,     1,     4,       2,        3,       3  ));
tempMission.AddWaveData (   5, new WaveData(   1,      8,     1,     3,      15,        1,     3.5  ));
tempMission.AddWaveData (   5, new WaveData(   1,      1,     1,     2,      15,        2,     3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,      8,     1,     3,      15,        1,     3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,      1,     1,     2,      15,        2,     3.5  ));
tempMission.AddWaveData (   6, new WaveData(   0,      1,     1,     4,       5,        3,       4  ));
tempMission.AddWaveData (   6, new WaveData(   1,      1,     1,     4,       5,        3,       4  ));
tempMission.AddWaveData (   7, new WaveData(   0,      3,     1,     4,       5,        3,       5  ));
tempMission.AddWaveData (   7, new WaveData(   0,      1,     1,     2,      20,        1,       5  ));
tempMission.AddWaveData (   7, new WaveData(   1,      3,     1,     4,       5,        3,       5  ));
tempMission.AddWaveData (   7, new WaveData(   1,      1,     1,     3,      20,        1,       5  ));

g_campaignData[0].m_missionList.push (tempMission);
// ====================================================================


// ====================================================================
tempMission = new MissionData();
tempMission.m_backgroundPath = "res/GSAction/Background/1.jpg";
tempMission.m_mapPath = "res/GSAction/Map/5.tmx";
tempMission.m_mapThumbnail = "res/GSMission/Thumbnail/Thumb-1-5.png";
tempMission.m_money = 500;

/*                        Wave               Gate | Start | Area | Type | Number | Latency | Modifier  */
tempMission.AddWaveData (   1, new WaveData(   0,      1,     1,     1,      15,        1,       1.5  ));
tempMission.AddWaveData (   2, new WaveData(   0,      1,     1,     3,      15,        1,         2  ));
tempMission.AddWaveData (   3, new WaveData(   0,      1,     1,     2,      15,        1,       2.5  ));
tempMission.AddWaveData (   4, new WaveData(   0,      1,     1,     2,      15,        1,         3  ));
tempMission.AddWaveData (   4, new WaveData(   0,      5,     1,     4,       3,        5,         3  ));
tempMission.AddWaveData (   5, new WaveData(   0,      1,     1,     3,      15,        1,       3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,      5,     1,     5,       1,        1,       3.5  ));
tempMission.AddWaveData (   6, new WaveData(   0,      1,     1,     2,      20,        1,         4  ));
tempMission.AddWaveData (   6, new WaveData(   0,      5,     1,     4,       5,        5,         4  ));
tempMission.AddWaveData (   6, new WaveData(   0,    7.5,     1,     5,       1,        1,         4  ));
tempMission.AddWaveData (   7, new WaveData(   0,      1,     1,     4,       5,        4,         5  ));
tempMission.AddWaveData (   7, new WaveData(   0,      3,     1,     5,       5,        4,         5  ));

g_campaignData[0].m_missionList.push (tempMission);
// ====================================================================


// ====================================================================
tempMission = new MissionData();
tempMission.m_backgroundPath = "res/GSAction/Background/1.jpg";
tempMission.m_mapPath = "res/GSAction/Map/6.tmx";
tempMission.m_mapThumbnail = "res/GSMission/Thumbnail/Thumb-1-6.png";
tempMission.m_money = 1000;

/*                        Wave               Gate | Start | Area | Type | Number | Latency | Modifier  */
tempMission.AddWaveData (   1, new WaveData(   0,      1,     1,     6,       1,        1,         1  ));
tempMission.AddWaveData (   1, new WaveData(   0,      2,     1,     1,      10,        1,         1  ));
tempMission.AddWaveData (   1, new WaveData(   0,      4,     1,     2,      10,        1,         1  ));
tempMission.AddWaveData (   1, new WaveData(   0,      8,     1,     3,      10,        1,         1  ));
tempMission.AddWaveData (   1, new WaveData(   0,     14,     1,     4,       2,        5,         2  ));
tempMission.AddWaveData (   1, new WaveData(   0,     15,     1,     1,      10,        1,         2  ));
tempMission.AddWaveData (   1, new WaveData(   0,     18,     1,     2,      10,        1,         2  ));
tempMission.AddWaveData (   1, new WaveData(   0,     19,     1,     5,       2,        5,         2  ));
tempMission.AddWaveData (   1, new WaveData(   0,     23,     1,     3,      10,        1,         2  ));
tempMission.AddWaveData (   1, new WaveData(   0,     34,     1,     4,       3,        5,         4  ));
tempMission.AddWaveData (   1, new WaveData(   0,     35,     1,     1,      15,        1,         4  ));
tempMission.AddWaveData (   1, new WaveData(   0,     38,     1,     2,      15,        1,         4  ));
tempMission.AddWaveData (   1, new WaveData(   0,     39,     1,     5,       3,        5,         4  ));
tempMission.AddWaveData (   1, new WaveData(   0,     43,     1,     3,      15,        1,         4  ));

g_campaignData[0].m_missionList.push (tempMission);
// ====================================================================


















// ====================================================================
tempMission = new MissionData();
tempMission.m_backgroundPath = "res/GSAction/Background/2.jpg";
tempMission.m_mapPath = "res/GSAction/Map/7.tmx";
tempMission.m_mapThumbnail = "res/GSMission/Thumbnail/Thumb-2-1.png";
tempMission.m_money = 500;

/*                        Wave               Gate | Start | Area | Type | Number | Latency | Modifier  */
tempMission.AddWaveData (   1, new WaveData(   0,      1,     2,     1,      10,        1,       1.5  ));
tempMission.AddWaveData (   2, new WaveData(   0,      1,     2,     2,      10,        1,         2  ));
tempMission.AddWaveData (   2, new WaveData(   0,    1.3,     2,     1,      10,        1,         2  ));
tempMission.AddWaveData (   3, new WaveData(   0,      1,     2,     3,      20,        1,       2.5  ));
tempMission.AddWaveData (   4, new WaveData(   0,      1,     2,     2,      10,        1,         3  ));
tempMission.AddWaveData (   4, new WaveData(   0,      5,     2,     3,      10,        1,         3  ));
tempMission.AddWaveData (   5, new WaveData(   0,      1,     2,     1,      10,        1,       3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,    1.3,     2,     2,      10,        1,       3.5  ));
tempMission.AddWaveData (   5, new WaveData(   0,    1.6,     2,     3,      10,        1,       3.5  ));
tempMission.AddWaveData (   6, new WaveData(   0,      1,     2,     2,      15,        1,         4  ));
tempMission.AddWaveData (   6, new WaveData(   0,      5,     2,     3,      15,      0.5,         4  ));
tempMission.AddWaveData (   7, new WaveData(   0,      1,     2,     2,      15,      0.5,       4.5  ));
tempMission.AddWaveData (   7, new WaveData(   0,    1.5,     2,     3,      15,      0.5,       4.5  ));


g_campaignData[1].m_missionList.push (tempMission);
// ====================================================================