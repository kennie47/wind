//=============================================================================
// AlongWiththeWind_CrossSave.js
// Version: 1.1
//=============================================================================
/*:
 * @plugindesc 舊版存檔繼承
 * @author Mirai
 * @help
 * 
 * ─ 插件簡介 ─
 * 這是設計給「與風同行」兩位遊戲作者使用的舊版存檔繼承插件。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.1 新增角色簡介的資料更新
 * V1.0 初次版本的插件發佈
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 
 * 
 * @param GameVersion
 * @text 指定遊戲版本代號
 * @desc 指定遊戲發行時的版本代號。
 * @type string
 * @default 1.0
 * 
 */
var Imported = Imported || {};
Imported.AlongWiththeWind_CrossSave = true;
var Moghunter = Moghunter || {};

let AlongWiththeWind = {};
const pluginName = "AlongWiththeWind_CrossSave";
AlongWiththeWind.CrossSave = {};
AlongWiththeWind.CrossSave.Parameters = PluginManager.parameters(pluginName);
AlongWiththeWind.CrossSave.GameVersion = String(AlongWiththeWind.CrossSave.Parameters['GameVersion'] || "1.0");
Imported.AlongWiththeWind_CrossSave_GameVersion = AlongWiththeWind.CrossSave.GameVersion;
(function () {
    AlongWiththeWind.CrossSave._Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        AlongWiththeWind.CrossSave._Game_System_initialize.call(this)
        this._gameVersion = AlongWiththeWind.CrossSave.GameVersion;
    };

    Scene_Load.prototype.onSavefileOk = function () {
        Scene_File.prototype.onSavefileOk.call(this);
        var jsonCross = StorageManager.load(this.savefileId());
        var fullgame = JsonEx.parse(jsonCross);
        if (DataManager.loadGame(this.savefileId())) {
            Moghunter.picturegallery_allDead = false;
            if (AlongWiththeWind.CrossSave.GameVersion == fullgame.system._gameVersion) {
                this.onLoadSuccess();
            } else {
                this.onLoadSuccessCross();
            }
        } else {
            this.onLoadFailure();
        }
    };

    Scene_Title.prototype.commandNewGame = function () {
        DataManager.setupNewGame();
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    Scene_Load.prototype.onLoadSuccessCross = function () {
        SoundManager.playLoad();
        var json = StorageManager.load(this.savefileId());
        DataManager.createGameObjects();
        DataManager.selectSavefileForNewGame();
        $gameParty.setupStartingMembers();
        DataManager.extractSaveContentCross(JsonEx.parse(json));
        Graphics.frameCount = 0;
        this.fadeOutAll();
        this._lastAccessedId = this.savefileId();
        SceneManager.goto(Scene_Map);
        this._loadSuccess = true;

    };

    DataManager.extractSaveContentCross = function (contents) {
        $gameSystem = new Game_System();
        $gameSystem._battleBgm = contents.system._battleBgm;
        $gameSystem._battleCount = contents.system._battleCount;
        $gameSystem._battleFormationCooldown = contents.system._battleFormationCooldown;
        $gameSystem._battleFormationEnabled = contents.system._battleFormationEnabled;
        $gameSystem._battleSystem = contents.system._battleSystem;
        $gameSystem._bgmOnSave = contents.system._bgmOnSave;
        $gameSystem._bgsOnSave = contents.system._bgsOnSave;
        $gameSystem._defeatMe = contents.system._defeatMe;
        $gameSystem._enableActorPartySwitch = contents.system._enableActorPartySwitch;
        $gameSystem._encounterEnabled = contents.system._encounterEnabled;
        $gameSystem._escapeCount = contents.system._escapeCount;
        $gameSystem._fastForward = contents.system._fastForward;
        $gameSystem._formationEnabled = contents.system._formationEnabled;
        $gameSystem._menuEnabled = contents.system._menuEnabled;
        $gameSystem._msgFontName = contents.system._msgFontName;
        $gameSystem._msgFontOutline = contents.system._msgFontOutline;
        $gameSystem._msgFontSize = contents.system._msgFontSize;
        $gameSystem._saveCount = contents.system._saveCount;
        $gameSystem._saveEnabled = contents.system._saveEnabled;
        $gameSystem._savedBgm = contents.system._savedBgm;
        $gameSystem._showActorPartySwitch = contents.system._showActorPartySwitch;
        $gameSystem._showActorPartySwitch = contents.system._showActorPartySwitch;
        $gameSystem._showBattleFormation = contents.system._showBattleFormation;
        $gameSystem._versionId = contents.system._versionId;
        $gameSystem._victoryMe = contents.system._victoryMe;
        $gameSystem._walkingBgm = contents.system._walkingBgm;
        $gameSystem._winCount = contents.system._winCount;
        $gameSystem._windowTone = contents.system._windowTone;
        $gameSystem._wordWrap = contents.system._wordWrap;

        $gameScreen = contents.screen;
        $gameTimer = contents.timer;
        $gameSwitches = contents.switches;
        $gameVariables = contents.variables;
        $gameSelfSwitches = contents.selfSwitches;
        $gameActors = contents.actors;
        for (var i = 1; i < $gameActors._data.length; i++) {
            $gameActors.actor(i)._profile = new Game_Actor(i)._profile;
        }
        $gameParty = contents.party;
        $gameMap = contents.map;

        $gameMap._tetris = new Game_Tetris();
        $gamePlayer = contents.player;

    };



})();
