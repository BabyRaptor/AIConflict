var CANVAS_W = 1280;
var CANVAS_H = 720;

var LAYER_BACKGROUND = 0;
var LAYER_MAP = 10;
var LAYER_TOWER_BASE = 20;
var LAYER_TOWER_SHADOW = 21;
var LAYER_TOWER_TURRET = 22;
var LAYER_TOWER_TURRET_STATUS = 23;
var LAYER_ENEMY = 30;
var LAYER_PROJECTILE = 40;
var LAYER_EXPLOSION = 50;
var LAYER_UI = 60;

var g_gsLoader;
var g_gsMenu;
var g_gsMission;
var g_gsInfo;
var g_gsShop;
var g_gsOption;
var g_gsUpgrade;
var g_gsAction;

var GLOBAL_TEXT_FADE_SPEED = 1200;

function InitLoader() {
	g_gsLoader = new GSLoader();
	g_gsLoader.retain();
}

function GlobalInit() {
	g_gsMenu = new GSMenu();
	g_gsMission = new GSMission();
	g_gsInfo = new GSInfo();
	g_gsShop = new GSShop();
	g_gsOption = new GSOption();
	g_gsUpgrade = new GSUpgrade();
	g_gsAction = new GSAction();
	
	g_gsMenu.retain();
	g_gsMission.retain();
	g_gsInfo.retain();
	g_gsUpgrade.retain();
	g_gsAction.retain();
}



var g_stateStack = new Array();
function PushState (state) {
	g_stateStack.push (state);
	cc.director.runScene(new cc.TransitionFade(0.8, state));
}
function PopState () {
	g_stateStack.splice (g_stateStack.length - 1, 1);
	cc.director.runScene(new cc.TransitionFade(0.8, g_stateStack[g_stateStack.length - 1]));
}






function PushMenu () {
	PushState (g_gsMenu);
}
function PushMission() {
	g_gsMission.Reset();
	PushState (g_gsMission);
}
function PushUpgrade() {
	PushState (g_gsUpgrade);
}
function PushInfo() {
	PushState (g_gsInfo);
}
function PushOption() {
	PushState (g_gsOption);
}
function PushShop() {
	PushState (g_gsShop);
}

function PushAction (campaign, mission) {
	g_gsAction.NewBattle (campaign, mission);
	PushState (g_gsAction);
}






cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);

    // Setup the resolution policy and design resolution size
	//cc.view.setDesignResolutionSize(CANVAS_W, CANVAS_H, cc.ResolutionPolicy.FIXED_HEIGHT);
	
    cc.view.setDesignResolutionSize(CANVAS_W, CANVAS_H, cc.ResolutionPolicy.FIXED);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);
	
	// Show FPS or not
	cc.director.setDisplayStats(false);

    //load resources
	cc.LoaderScene.preload(g_preloadList, function () {
		InitLoader();
        cc.director.runScene(g_gsLoader);
    }, this);
	
	// fix the width
	CANVAS_W = cc.director.getWinSizeInPixels().width;
};
cc.game.run();