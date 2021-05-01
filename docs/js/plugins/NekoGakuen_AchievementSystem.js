//=============================================================================
// NekoGakuen_AchievementSystem.js
// Version: 1.6
//=============================================================================
/*:
 * @plugindesc 遊戲成就系統
 * @author Mirai
 * @help
 * 
 * ─ 插件簡介 ─
 * 在RPG Maker MV中也能擁有遊戲成就系統的功能。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.6 新增未讀提醒功能和其他細節。
 * V1.5 新增用於遊戲測試的插件命令/腳本「獲得全部成就」。
 * V1.1 成就資訊新增控制字元。
 * V1.0.1 修正長期停留在成就系統時的卡頓問題。
 * V1.0 初次版本的插件發佈
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 2.在事件頁中高級區塊選擇「插件命令/腳本...」，
 *   並輸入以下要執行的插件命令/腳本及參數即可。
 * 
 * 
 * ─ 插件命令/腳本 ─
 * 
 * 【呼叫成就畫面】
 * --說明：在遊戲中直接呼叫成就系統的畫面。
 * --插件命令 Achievement Call
 * --腳本 $gameSystem.achievementCall();
 * 
 * 【獲得成就】
 * --說明：在遊戲中獲得成就，而<參數>為你所設定的「成就ID」。
 * --插件命令 Achievement Get <參數>
 * --腳本 $gameSystem.achievementGet("<參數>");
 * 
 * 【獲得全部成就】
 * --說明：在遊戲中獲得所有成就，主要用於遊戲測試用途。
 * --插件命令 Achievement GetAll
 * --腳本 $gameSystem.achievementGetAll();
 * 
 * 
 * ─ 版權聲明 ─
 * 修改或翻譯本插件無需向作者事前告知，但修改後的版本禁止再次發佈。
 * 如果官方的版本有BUG，可以跟作者回報。
 * 
 * 禁止利用本插件進行非法販售及詐騙。
 * 作者只單純提供此插件，如有問題請使用者自負所有法律責任。
 * 本插件著作權為貓咪學園(Neko Gakuen)的程式人員Mirai(快閃小強)所有。
 * 
 * --------------------
 * -來源標示：【△ 不需要，但有的話會很感謝】
 * -授權方式：【√ 免費 (註1)】
 * -商業營利：【√ 允許】
 * -改作許可：【√ 允許】
 * -二次配佈：【× 禁止】
 * -成人用途：【√ 允許】
 * -使用範圍：【※ 僅RPG Maker系列】
 * 
 * 【！】註1：適用範圍僅限有支援包含「中文」在內的遊戲作品。
 * --------------------
 * 
 * 
 * @param UI Class
 * @text ◆ 介面項目
 * 
 * @param MenuUI Boolean
 * @text 顯示選單項目
 * @desc 是否在選單畫面中顯示該項目。
 * @parent UI Class
 * @type boolean
 * @default true
 * @on 顯示
 * @off 隱藏
 * 
 * @param MenuUI Name
 * @text 選單項目名稱
 * @desc 在選單畫面中所顯示的項目名稱。
 * @parent UI Class
 * @type string
 * @default 成就紀錄
 * 
 * @param SystemUI Title
 * @text 系統介面標題
 * @desc 在成就系統的畫面中所顯示的標題。
 * @parent UI Class
 * @type string
 * @default 成就系統
 * 
 * @param Achievement NameSize
 * @text 成就名稱文字大小
 * @desc 在成就系統的畫面中顯示該成就名稱的文字大小。
 * @parent UI Class
 * @type number
 * @min 1
 * @default 32
 * 
 * @param Achievement DateSize
 * @text 成就紀錄時間大小
 * @desc 在成就系統的畫面中顯示該成就紀錄時間的文字大小。
 * @parent UI Class
 * @type number
 * @min 1
 * @default 16
 * 
 * @param SystemInfo Title
 * @text 成就資訊標題文字
 * @desc 在成就系統的畫面中顯示該成就資訊的標題。
 * @parent UI Class
 * @type string
 * @default 成就資訊
 * 
 * @param SystemInfo Size
 * @text 成就資訊文字大小
 * @desc 在成就系統的畫面中顯示該成就資訊的文字大小。
 * @parent UI Class
 * @type number
 * @min 1
 * @default 16
 * 
 * @param UnlockTip Title
 * @text 解鎖提示標題文字
 * @desc 在成就系統的畫面中顯示該成就解鎖提示的標題。
 * @parent UI Class
 * @type string
 * @default 提示
 * 
 * @param UnlockTip Size
 * @text 解鎖提示文字大小
 * @desc 在成就系統的畫面中顯示該成就解鎖提示的文字大小。
 * @parent UI Class
 * @type number
 * @min 1
 * @default 28
 * 
 * @param Unknown Name
 * @text 未知成就名稱
 * @desc 指定未獲得該成就時所顯示的成就名稱，支援控制字元。
 * @parent UI Class
 * @type string
 * @default 未知
 * 
 * @param Unknown Help
 * @text 未知成就說明
 * @desc 指定未獲得該成就時所顯示的成就說明，支援控制字元。
 * @parent UI Class
 * @type note
 * @default "？？？"
 * 
 * @param Unknown IconType
 * @text 未知成就圖示類型
 * @desc 指定未知成就圖示的顯示類型。
 * @parent UI Class
 * @type select
 * @default IconSet
 * @option 從系統內建Icon顯示
 * @value IconSet
 * @option 從Pictures圖片顯示
 * @value Pictures
 * 
 * @param Unknown IconSet
 * @text 從系統內建Icon顯示
 * @desc 指定系統內建的Icon ID來顯示未知成就圖示。
 * @type string
 * @parent Unknown IconType
 * @default 16
 * 
 * @param Unknown IconPic
 * @text 從Pictures圖片顯示
 * @desc 指定圖檔名稱來顯示未知成就圖示，而圖檔尺寸為90x90像素(px)。
 * @parent Unknown IconType
 * @type file
 * @dir img/pictures/
 * 
 * @param UnlockNew Text
 * @text 未讀提示文字
 * @desc 在成就系統的畫面中顯示該成就解鎖後的未讀提示文字。
 * @parent UI Class
 * @type string
 * @default New
 * 
 * @param UnlockNew Size
 * @text 未讀提示文字大小
 * @desc 在成就系統的畫面中顯示該成就解鎖後的未讀提示文字大小。
 * @parent UI Class
 * @type number
 * @min 1
 * @default 18
 * 
 * @param UnlockNew Color
 * @text 未讀提示文字色彩
 * @desc 在成就系統的畫面中顯示該成就解鎖後的未讀提示文字色彩，
 * 而文字色彩請參照控制字元的色彩代號。
 * @parent UI Class
 * @type number
 * @default 6
 * 
 * 
 * @param Rate Class
 * @text ◆ 進度環
 * 
 * @param SystemRate Width
 * @text 進度環線條寬度
 * @desc 在成就系統的畫面中顯示進度環的線條寬度。
 * @parent Rate Class
 * @type number
 * @min 1
 * @default 10
 * 
 * @param SystemRate Bgcolor
 * @text 進度環底部色彩
 * @desc 在成就系統的畫面中顯示進度環的底部線條色彩，
 * 而色彩名稱請參照CSS3所提供的名稱。
 * @parent Rate Class
 * @type string
 * @default gray
 * 
 * @param SystemRate Mcolor01
 * @text 進度環顯示色彩01
 * @desc 在成就系統的畫面中顯示進度環的漸層線條色彩01，
 * 而色彩名稱請參照CSS3所提供的名稱。
 * @parent Rate Class
 * @type string
 * @default yellow
 * 
 * @param SystemRate Mcolor02
 * @text 進度環顯示色彩02
 * @desc 在成就系統的畫面中顯示進度環的漸層線條色彩02，
 * 而色彩名稱請參照CSS3所提供的名稱。
 * @parent Rate Class
 * @type string
 * @default green
 * 
 * @param SystemRate PColor
 * @text 進度環百分比色彩
 * @desc 在成就系統的畫面中顯示進度環的百分比文字色彩，
 * 而文字色彩請參照控制字元的色彩代號。
 * @parent Rate Class
 * @type number
 * @default 17
 * 
 * 
 * @param Tip Class
 * @text ◆ 獲得提示
 * 
 * @param Get Tip
 * @text 獲得提示訊息
 * @desc 在地圖畫面中顯示獲得成就的提示訊息。
 * @parent Tip Class
 * @type string
 * @default 獲得成就！
 * 
 * @param Get Tip Size
 * @text 提示文字大小
 * @desc 在地圖畫面中顯示獲得成就的提示文字大小。
 * @parent Tip Class
 * @type number
 * @min 1
 * @default 18
 * 
 * @param Get AchName Size
 * @text 成就名稱提示文字大小
 * @desc 在地圖畫面中顯示成就名稱的提示文字大小。
 * @parent Tip Class
 * @type number
 * @min 1
 * @default 28
 * 
 * @param SE_Name
 * @text 獲得提示音效
 * @desc 指定在地圖畫面播放的獲得提示音效檔案。
 * @parent Tip Class
 * @type file
 * @dir audio/se
 * @default Item3
 * 
 * @param SE_Volume
 * @text 指定SE音量
 * @desc 指定SE的音量控制。
 * @parent Tip Class
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param SE_Pitch
 * @text 指定SE音高
 * @desc 指定SE的音高控制。
 * @parent Tip Class
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param SE_Pan
 * @text 指定SE移動
 * @desc 指定SE的移動控制。
 * @parent Tip Class
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param Achievement List
 * @text 遊戲成就列表...
 * @desc 指定遊戲成就的設置。
 * @type struct<Achievement>[]
 * @default []
 * 
 */
/*~struct~Achievement:
 * 
 * @param Achievement ID
 * @text 成就ID
 * @desc 指定成就ID，建議用英文數字。
 * @type string
 * @default EX001
 * 
 * @param Achievement Name
 * @text 成就名稱
 * @desc 指定要顯示的成就名稱，支援控制字元。
 * @type string
 * @default 成就名稱
 * 
 * @param Achievement Help
 * @text 成就說明
 * @desc 指定要顯示的成就說明，支援控制字元。
 * @type note
 * @default "成就說明"
 * 
 * @param Achievement UnlockTip
 * @text 成就解鎖提示
 * @desc 指定要顯示的成就解鎖提示，支援控制字元。
 * @type string
 * @default 成就解鎖提示
 * 
 * @param Achievement UnlockPic
 * @text 成就解鎖CG圖片
 * @desc 指定成就解鎖之後要顯示的CG圖片，而圖檔尺寸必須與遊戲解析度一致。
 * @parent Achievement IconType
 * @type file
 * @dir img/pictures/
 * 
 * @param Achievement IconType
 * @text 成就圖示類型
 * @desc 指定成就圖示的顯示類型。
 * @type select
 * @default IconSet
 * @option 從系統內建Icon顯示
 * @value IconSet
 * @option 從Pictures圖片顯示
 * @value Pictures
 * 
 * @param Achievement IconSet
 * @text 從系統內建Icon顯示
 * @desc 指定系統內建的Icon ID來顯示成就圖示。
 * @type string
 * @parent Achievement IconType
 * @default 0
 * 
 * @param Achievement IconPic
 * @text 從Pictures圖片顯示
 * @desc 指定圖檔名稱來顯示成就圖示，而圖檔尺寸為90x90像素(px)。
 * @parent Achievement IconType
 * @type file
 * @dir img/pictures/
 * 
 */
//=============================================================================
'use strict';
Bitmap.prototype.drawRing = function (ox, oy, value, radios, lineWidth, basicColor, gradColor1, gradColor2) {
    const context = this._context;
    context.save();
    let PI = 3.1415926;
    let long = (value / 100) * PI * 2;
    let longss = (100 / 100) * PI * 2;
    let start = 1.5 * PI;
    context.lineWidth = lineWidth
    let x = ox + radios + lineWidth;
    let y = oy + x;
    context.beginPath()
    context.strokeStyle = basicColor;
    context.arc(x, y, radios, start, start + longss)
    context.stroke()
    context.beginPath()
    let gradient = context.createLinearGradient(ox + radios * 2 + lineWidth * 2, oy + lineWidth + radios, ox, oy + radios + lineWidth);
    gradient.addColorStop(0, gradColor1);
    gradient.addColorStop(1, gradColor2);
    context.strokeStyle = gradient;
    if (value != 0) {
        context.arc(x, y, radios, start, start + long)
        context.lineCap = "round";
    }
    context.stroke()
    this._baseTexture.update();
};

(function () {
    let NekoGakuen = {};
    var pluginName = "NekoGakuen_AchievementSystem";
    NekoGakuen.AchievementSystem = {};
    NekoGakuen.AchievementSystem.Parameters = PluginManager.parameters(pluginName);
    NekoGakuen.AchievementSystem.MenuUIBoolean = String(NekoGakuen.AchievementSystem.Parameters['MenuUI Boolean'] || 'true');
    NekoGakuen.AchievementSystem.MenuUIName = String(NekoGakuen.AchievementSystem.Parameters['MenuUI Name'] || '成就紀錄');
    NekoGakuen.AchievementSystem.SystemUITitle = String(NekoGakuen.AchievementSystem.Parameters['SystemUI Title'] || '成就系統');
    NekoGakuen.AchievementSystem.AchievementNameSize = Number(NekoGakuen.AchievementSystem.Parameters['Achievement NameSize'] || 32);
    NekoGakuen.AchievementSystem.AchievementDateSize = Number(NekoGakuen.AchievementSystem.Parameters['Achievement DateSize'] || 16);
    NekoGakuen.AchievementSystem.SystemInfoTitle = String(NekoGakuen.AchievementSystem.Parameters['SystemInfo Title'] || '成就資訊');
    NekoGakuen.AchievementSystem.SystemInfoSize = Number(NekoGakuen.AchievementSystem.Parameters['SystemInfo Size'] || 16);
    NekoGakuen.AchievementSystem.UnlockTipTitle = String(NekoGakuen.AchievementSystem.Parameters['UnlockTip Title'] || '提示');
    NekoGakuen.AchievementSystem.UnlockTipSize = Number(NekoGakuen.AchievementSystem.Parameters['UnlockTip Size'] || 28);
    NekoGakuen.AchievementSystem.GetTip = String(NekoGakuen.AchievementSystem.Parameters['Get Tip'] || '獲得成就！');
    NekoGakuen.AchievementSystem.GetTipSize = Number(NekoGakuen.AchievementSystem.Parameters['Get Tip Size'] || 18);
    NekoGakuen.AchievementSystem.GetAchNameSize = Number(NekoGakuen.AchievementSystem.Parameters['Get AchName Size'] || 28);
    NekoGakuen.AchievementSystem.SystemRateWidth = Number(NekoGakuen.AchievementSystem.Parameters['SystemRate Width'] || 10);
    NekoGakuen.AchievementSystem.SystemRateBgcolor = String(NekoGakuen.AchievementSystem.Parameters['SystemRate Bgcolor'] || 'gray');
    NekoGakuen.AchievementSystem.SystemRateMcolor01 = String(NekoGakuen.AchievementSystem.Parameters['SystemRate Mcolor01'] || 'yellow');
    NekoGakuen.AchievementSystem.SystemRateMcolor02 = String(NekoGakuen.AchievementSystem.Parameters['SystemRate Mcolor02'] || 'green');
    NekoGakuen.AchievementSystem.SystemRatePColor = Number(NekoGakuen.AchievementSystem.Parameters['SystemRate PColor'] || 17);
    NekoGakuen.AchievementSystem.UnknownName = String(NekoGakuen.AchievementSystem.Parameters['Unknown Name'] || '未知');
    NekoGakuen.AchievementSystem.UnknownHelp = String(NekoGakuen.AchievementSystem.Parameters['Unknown Help'] || '"？？？"');
    NekoGakuen.AchievementSystem.UnknownIconType = String(NekoGakuen.AchievementSystem.Parameters['Unknown IconType'] || "IconSet");
    NekoGakuen.AchievementSystem.UnknownIconSet = Number(NekoGakuen.AchievementSystem.Parameters['Unknown IconSet'] || 16);
    NekoGakuen.AchievementSystem.UnknownIconPic = String(NekoGakuen.AchievementSystem.Parameters['Unknown IconPic'] || '');
    NekoGakuen.AchievementSystem.UnlockNewText = String(NekoGakuen.AchievementSystem.Parameters['UnlockNew Text'] || 'New');
    NekoGakuen.AchievementSystem.UnlockNewSize = Number(NekoGakuen.AchievementSystem.Parameters['UnlockNew Size'] || 18);
    NekoGakuen.AchievementSystem.UnlockNewColor = Number(NekoGakuen.AchievementSystem.Parameters['UnlockNew Color'] || 6);
    NekoGakuen.AchievementSystem.SE_Name = String(NekoGakuen.AchievementSystem.Parameters['SE_Name'] || 'Item3');
    NekoGakuen.AchievementSystem.SE_Volume = Number(NekoGakuen.AchievementSystem.Parameters['SE_Volume'] || 90);
    NekoGakuen.AchievementSystem.SE_Pitch = Number(NekoGakuen.AchievementSystem.Parameters['SE_Pitch'] || 100);
    NekoGakuen.AchievementSystem.SE_Pan = Number(NekoGakuen.AchievementSystem.Parameters['SE_Pan'] || 0);
    NekoGakuen.AchievementSystem.GetSID = null;
    NekoGakuen.AchievementSystem.achievement_List = JSON.parse(NekoGakuen.AchievementSystem.Parameters['Achievement List']);

    let args_Achievement = {};
    let args_AchievementParse;
    args_Achievement.achID = Array();
    args_Achievement.achName = Array();
    args_Achievement.achHelp = Array();
    args_Achievement.achUnlockTip = Array();
    args_Achievement.achUnlockPic = Array();
    args_Achievement.achIconType = Array();
    args_Achievement.achIconSet = Array();
    args_Achievement.achIconPic = Array();
    args_Achievement.achData = Array();
    for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
        args_AchievementParse = JSON.parse(NekoGakuen.AchievementSystem.achievement_List[i]);
        args_Achievement.achID.push(String(args_AchievementParse["Achievement ID"]));
        args_Achievement.achName.push(String(args_AchievementParse["Achievement Name"]));
        args_Achievement.achHelp.push(String(args_AchievementParse["Achievement Help"]));
        args_Achievement.achUnlockTip.push(String(args_AchievementParse["Achievement UnlockTip"]));
        args_Achievement.achUnlockPic.push(String(args_AchievementParse["Achievement UnlockPic"]));
        args_Achievement.achIconType.push(String(args_AchievementParse["Achievement IconType"]));
        args_Achievement.achIconSet.push(Number(args_AchievementParse["Achievement IconSet"]));
        args_Achievement.achIconPic.push(String(args_AchievementParse["Achievement IconPic"]));
        args_Achievement.achData.push(null);
    }

    NekoGakuen.AchievementSystem._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        NekoGakuen.AchievementSystem._Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Achievement') {
            switch (args[0]) {
                case 'Call':
                    $gameSystem.achievementCall();
                    break;
                case 'Get':
                    $gameSystem.achievementGet(String(args[1]));
                    break;
                case 'GetAll':
                    $gameSystem.achievementGetAll();
                    break;
            }
        }
    };

    NekoGakuen.AchievementSystem._Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        NekoGakuen.AchievementSystem._Game_System_initialize.call(this);
        this.initAchNew();
    };

    Game_System.prototype.initAchNew = function () {
        this._achNew = Array();
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            this._achNew[i] = null;
        }
    }

    Game_System.prototype.setAchNew = function (index, value) {
        this._achNew[index] = value;
    };

    Game_System.prototype.achNew = function (index) {
        return this._achNew[index];
    };

    Game_System.prototype.achievementCall = function () {
        SceneManager.push(Scene_AchievementSystem);
    };

    Game_System.prototype.achievementGet = function (achID) {
        ConfigManager.load();
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            if (ConfigManager['Achi' + args_Achievement.achID[i]] != null) {
                args_Achievement.achData[i] = ConfigManager['Achi' + args_Achievement.achID[i]];
            }
        }
        let achSID = args_Achievement.achID.indexOf(String(achID));
        if (args_Achievement.achData[achSID] == null) {
            NekoGakuen.AchievementSystem.GetSID = achSID;
            var se = {
                name: NekoGakuen.AchievementSystem.SE_Name,
                pan: NekoGakuen.AchievementSystem.SE_Pan,
                pitch: NekoGakuen.AchievementSystem.SE_Pitch,
                volume: NekoGakuen.AchievementSystem.SE_Volume
            }
            AudioManager.playSe(se);
            var myDate = new Date();
            var min = myDate.getMinutes();
            if (min.toString().length == 1) {
                min = "0" + min;
            }
            var hours = myDate.getHours();
            if (hours.toString().length == 1) {
                hours = "0" + hours;
            }
            var month = (myDate.getMonth() + 1);
            if (month.toString().length == 1) {
                month = "0" + month;
            }
            var toDate = myDate.getDate();
            if (toDate.toString().length == 1) {
                toDate = "0" + toDate;
            }
            args_Achievement.achData[achSID] = myDate.getFullYear() + "/" + month + "/" + toDate + " " + hours + ":" + min;
            $gameSystem.setAchNew(achSID, true);
            ConfigManager.save();
        }
    };

    Game_System.prototype.achievementGetAll = function () {
        var se = {
            name: NekoGakuen.AchievementSystem.SE_Name,
            pan: NekoGakuen.AchievementSystem.SE_Pan,
            pitch: NekoGakuen.AchievementSystem.SE_Pitch,
            volume: NekoGakuen.AchievementSystem.SE_Volume
        }
        AudioManager.playSe(se);
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            var myDate = new Date();
            var min = myDate.getMinutes();
            if (min.toString().length == 1) {
                min = "0" + min;
            }
            var hours = myDate.getHours();
            if (hours.toString().length == 1) {
                hours = "0" + hours;
            }
            var month = (myDate.getMonth() + 1);
            if (month.toString().length == 1) {
                month = "0" + month;
            }
            var toDate = myDate.getDate();
            if (toDate.toString().length == 1) {
                toDate = "0" + toDate;
            }
            if (args_Achievement.achData[i] == null) {
                args_Achievement.achData[i] = myDate.getFullYear() + "/" + month + "/" + toDate + " " + hours + ":" + min;
                $gameSystem.setAchNew(i, true);
            }
        }
        ConfigManager.save();
    };


    NekoGakuen.AchievementSystem._ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        let config = NekoGakuen.AchievementSystem._ConfigManager_makeData.call(this);
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            if (args_Achievement.achData[i] != null) {
                config['Achi' + args_Achievement.achID[i]] = args_Achievement.achData[i];
            } else {
                config['Achi' + args_Achievement.achID[i]] = this['Achi' + args_Achievement.achID[i]];
            }
        }
        return config;
    };

    NekoGakuen.AchievementSystem._ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        NekoGakuen.AchievementSystem._ConfigManager_applyData.call(this, config);
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            this['Achi' + args_Achievement.achID[i]] = this.readText(config, 'Achi' + args_Achievement.achID[i]);
        }
    };

    ConfigManager.readText = function (config, name) {
        var value = config[name];
        if (value !== undefined) {
            return value;
        } else {
            return null;
        }
    };

    ImageManager.loadAchIconPic = function (filename, hue) {
        return this.loadBitmap('img/pictures/', filename, hue, false);
    };

    ImageManager.reserveAchIconPic = function (filename, hue, reservationId) {
        return this.reserveBitmap('img/pictures/', filename, hue, true, reservationId);
    };

    NekoGakuen.AchievementSystem._Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function () {
        NekoGakuen.AchievementSystem._Scene_Boot_loadSystemImages.call(this);
        if (NekoGakuen.AchievementSystem.UnknownIconType == "Pictures") {
            ImageManager.reserveAchIconPic(NekoGakuen.AchievementSystem.UnknownIconPic);
        }
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            if (args_Achievement.achIconType[i] == "Pictures") {
                ImageManager.reserveAchIconPic(args_Achievement.achIconPic[i]);
            }
        }
    };

    function Window_AchievementList() {
        this.initialize.apply(this, arguments);
    }

    Window_AchievementList.prototype = Object.create(Window_Selectable.prototype);
    Window_AchievementList.prototype.constructor = Window_AchievementList;

    Window_AchievementList.prototype.initialize = function (x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.opacity = 0;
        this.w_wait = 0;
        this.activate();
    };

    Window_AchievementList.prototype.maxItems = function () {
        return NekoGakuen.AchievementSystem.achievement_List.length;
    };

    Window_AchievementList.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        if (this.w_wait < NekoGakuen.AchievementSystem.achievement_List.length + 1) {
            for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
                this.redrawItem(i);
            }
            this.w_wait++
        }


    };

    Window_AchievementList.prototype.maxVisibleItems = function () {
        return 5;
    };

    Window_AchievementList.prototype.itemHeight = function () {
        var innerHeight = this.height - this.padding * 2;
        return Math.floor(innerHeight / this.maxVisibleItems());
    };

    Window_AchievementList.prototype.maxCols = function () {
        return Graphics.boxWidth > 900 ? 2 : 1;
    };

    Window_AchievementList.prototype.drawIconSet = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, this.itemHeight() * 0.85, this.itemHeight() * 0.85);
    };

    Window_AchievementList.prototype.drawIconPic = function (iconName, x, y) {
        var bitmap = ImageManager.loadAchIconPic(iconName);
        var pw = 90;
        var ph = 90;
        var sx = 0;
        var sy = 0;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };

    Window_AchievementList.prototype.resetFontSettings = function () {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = NekoGakuen.AchievementSystem.AchievementNameSize;
    };

    Window_AchievementList.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.normalColor());
        if (args_Achievement.achData[index] != null) {
            this.changePaintOpacity(true);
            this.drawBackground(rect.x, rect.y, rect.width, this.itemHeight());
            if (args_Achievement.achIconType[index] == "IconSet") {
                this.drawIconSet(args_Achievement.achIconSet[index], rect.x, rect.y + 5);
            } else {
                this.drawIconPic(args_Achievement.achIconPic[index], rect.x, rect.y + 5);
            }
            var lines = args_Achievement.achName[index].replace(/\\/g, '\x1b');
            lines = lines.replace(/\x1b\x1b/g, '\\');
            this.drawTextEx(lines.replace(/\"/g, ''), rect.x + this.itemHeight(), rect.y + 10);
            this.changeTextColor(this.normalColor());
            this.contents.fontSize = NekoGakuen.AchievementSystem.AchievementDateSize;
            this.drawText(args_Achievement.achData[index], rect.x, rect.y + 62, rect.width, 'right');
            if ($gameSystem.achNew(index) == true) {
                this.contents.fontSize = NekoGakuen.AchievementSystem.UnlockNewSize;
                this.changeTextColor(this.textColor(NekoGakuen.AchievementSystem.UnlockNewColor));
                this.drawText(NekoGakuen.AchievementSystem.UnlockNewText, rect.x, rect.y);
            }
            this.changeTextColor(this.normalColor());
            this.contents.fontSize = 28;
        } else {
            this.changePaintOpacity(false);
            this.drawBackground(rect.x, rect.y, rect.width, this.itemHeight());
            if (NekoGakuen.AchievementSystem.UnknownIconType == "IconSet") {
                this.drawIconSet(NekoGakuen.AchievementSystem.UnknownIconSet, rect.x, rect.y + 5);
            } else {
                this.drawIconPic(NekoGakuen.AchievementSystem.UnknownIconPic, rect.x, rect.y + 5);
            }
            var lines = NekoGakuen.AchievementSystem.UnknownName.replace(/\\/g, '\x1b');
            lines = lines.replace(/\x1b\x1b/g, '\\');
            this.drawTextEx("No." + (index + 1) + " " + lines.replace(/\"/g, ''), rect.x + this.itemHeight(), rect.y + 10);
            this.contents.fontSize = 28;
        }
    };

    Window_AchievementList.prototype.drawBackground = function (x, y, width, height) {
        this.contents.fillRect(x - 6, y + 1, width + 12, height - 1, 'rgba(0, 0, 0, 0.25)');
    };

    Window_AchievementList.prototype.playOkSound = function () {
    };


    function Window_AchievementStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_AchievementStatus.prototype = Object.create(Window_Selectable.prototype);
    Window_AchievementStatus.prototype.constructor = Window_AchievementStatus;

    Window_AchievementStatus.prototype.initialize = function () {
        ConfigManager.load();
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        this.rateValue = 0;
        this.rateMax = 0;
        this.helpindex = 0;
        this.achDataValue = 0;
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            if (ConfigManager['Achi' + args_Achievement.achID[i]] != null) {
                this.achDataValue++;
            }
        }
        Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
        this.createBackground();
        this.createRingSprite();
        this.activate();
        this.refresh();
    };

    Window_AchievementStatus.prototype.createBackground = function () {
        this._achiBackground = new Sprite();

        this._achiBackground.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        this._achiBackground.bitmap = ImageManager.loadSystem('menuachi_bg');
        this._achiBackground.x = 0;
        this._achiBackground.y = 0;
        this.addChildToBack(this._achiBackground);
    };

    Window_AchievementStatus.prototype.createRingSprite = function () {
        if (!this._ringSprite) {
            this._ringSprite = new Sprite();
            this._ringSprite.bitmap = new Bitmap(this.width, this.height);
            this._ringSprite.y = this.y;
            this.addChild(this._ringSprite);
        }
    };

    Window_AchievementStatus.prototype.refresh = function () {
        Window_Selectable.prototype.refresh.call(this);
        this.drawBlockTitle();
        this.drawHorzLine();
        this.drawProgressRate();

    };

    Window_AchievementStatus.prototype.wasValue = function (value, max) {
        this.rateValue = value;
        this.rateMax = max;
    };

    Window_AchievementStatus.prototype.drawBlockTitle = function () {
        this.contents.fontSize = 48;
        this.changeTextColor(this.normalColor());
        this.drawText(NekoGakuen.AchievementSystem.SystemUITitle, 5, 2);
    };

    Window_AchievementStatus.prototype.helpSID = function (value) {
        this.helpindex = value;
    };

    Window_AchievementStatus.prototype.resetFontSettings = function () {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = NekoGakuen.AchievementSystem.SystemInfoSize;
    };

    Window_AchievementStatus.prototype.drawProgressRate = function () {

        this.contents.paintOpacity = 150;
        this.contents.fillRect(0, 72, 330, 520, this.dimColor1());
        this.contents.fillRect(15, 400, 300, 170, 'rgba(255, 255, 255, 0.6)');
        if (this.rateValue <= this.rateMax + 1) {

            this._ringSprite.bitmap.drawRing(50, 70, this.rateValue, 120, NekoGakuen.AchievementSystem.SystemRateWidth, NekoGakuen.AchievementSystem.SystemRateBgcolor, NekoGakuen.AchievementSystem.SystemRateMcolor01, NekoGakuen.AchievementSystem.SystemRateMcolor02);
        }
        this.contents.paintOpacity = 255;
        this.changeTextColor(this.textColor(NekoGakuen.AchievementSystem.SystemRatePColor));
        this.contents.fontSize = 48;
        this.drawText(this.rateValue + "%", 90, 200, 150, 'center');
        this.changeTextColor(this.normalColor());
        this.contents.fontSize = 25;
        this.drawText(this.achDataValue + " / " + NekoGakuen.AchievementSystem.achievement_List.length, 90, 240, 150, 'center');
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 18;
        this.drawText(NekoGakuen.AchievementSystem.SystemInfoTitle, 20, 400);
        this.changeTextColor(this.normalColor());
        if (args_Achievement.achData[this.helpindex] != null) {
            var lines = args_Achievement.achHelp[this.helpindex].split('\\n');
            for (let index = 0; index < lines.length; index++) {
                lines[index] = lines[index].replace(/\\/g, '\x1b');
                lines[index] = lines[index].replace(/\x1b\x1b/g, '\\');
                this.drawTextEx(lines[index].replace(/\"/g, ''), 20, 430 + ((NekoGakuen.AchievementSystem.SystemInfoSize + 4) * index));
            }
        } else {
            var lines = NekoGakuen.AchievementSystem.UnknownHelp.split('\\n');
            for (let index = 0; index < lines.length; index++) {
                lines[index] = lines[index].replace(/\\/g, '\x1b');
                lines[index] = lines[index].replace(/\x1b\x1b/g, '\\');
                this.drawTextEx(lines[index].replace(/\"/g, ''), 20, 430 + ((NekoGakuen.AchievementSystem.SystemInfoSize + 4) * index));
            }
        }
    };

    Window_AchievementStatus.prototype.drawHorzLine = function () {
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, 58, this.contentsWidth(), 2, this.normalColor());
        this.contents.paintOpacity = 255;
    };


    Window_AchievementStatus.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        this.refresh();
    };

    if (NekoGakuen.AchievementSystem.MenuUIBoolean == "true") {
        NekoGakuen.AchievementSystem._Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function () {
            NekoGakuen.AchievementSystem._Window_MenuCommand_addOriginalCommands.call(this);
            this.addAchievementSystem();
        };

        Window_MenuCommand.prototype.addAchievementSystem = function () {
            this.addCommand(NekoGakuen.AchievementSystem.MenuUIName, 'achievement_system', true);
        };

        NekoGakuen.AchievementSystem._Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function () {
            NekoGakuen.AchievementSystem._Scene_Menu_createCommandWindow.call(this);
            this._commandWindow.setHandler('achievement_system', this.commandAchievementSystem.bind(this));
        };

        Scene_Menu.prototype.commandAchievementSystem = function () {
            this._waitCall = "Achi";

        };

        NekoGakuen.AchievementSystem._Scene_Menu_callSceneSp = Scene_Menu.prototype.callSceneSp;
        Scene_Menu.prototype.callSceneSp = function () {
            NekoGakuen.AchievementSystem._Scene_Menu_callSceneSp.call(this);
            if (this._waitCall == "Achi") {
                SceneManager.push(Scene_AchievementSystem);
                this._waitCall = false;
            }

        };


    }


    function Window_GetAchTip() {
        this.initialize.apply(this, arguments);
    }

    Window_GetAchTip.prototype = Object.create(Window_Base.prototype);
    Window_GetAchTip.prototype.constructor = Window_GetAchTip;

    Window_GetAchTip.prototype.initialize = function () {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this.opacity = 0;
        this._showCount = 0;
        this.refresh();
    };

    Window_GetAchTip.prototype.windowWidth = function () {
        return 400;
    };

    Window_GetAchTip.prototype.windowHeight = function () {
        return this.fittingHeight(2);
    };

    Window_GetAchTip.prototype.drawIconSet = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * 1.8, ph * 1.8);
    };

    Window_GetAchTip.prototype.drawIconPic = function (iconName, x, y) {
        var bitmap = ImageManager.loadAchIconPic(iconName);
        var pw = 90;
        var ph = 90;
        var sx = 0;
        var sy = 0;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw / 1.8, ph / 1.8);
    };

    Window_GetAchTip.prototype.resetFontSettings = function () {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = NekoGakuen.AchievementSystem.GetAchNameSize;
    };

    Window_GetAchTip.prototype.refresh = function () {
        this.contents.clear();
        var width = this.contentsWidth();
        this.drawBackground(0, 0, width, this.lineHeight() * 4);
        if (args_Achievement.achIconType[NekoGakuen.AchievementSystem.GetSID] == "IconSet") {
            this.drawIconSet(args_Achievement.achIconSet[NekoGakuen.AchievementSystem.GetSID], 15, 8);
        } else {
            this.drawIconPic(args_Achievement.achIconPic[NekoGakuen.AchievementSystem.GetSID], 15, 8);
        }
        if (NekoGakuen.AchievementSystem.GetSID != null) {
            this.changeTextColor(this.systemColor());
            this.contents.fontSize = NekoGakuen.AchievementSystem.GetTipSize;
            this.drawText(NekoGakuen.AchievementSystem.GetTip, 85, 0, width);
            this.changeTextColor(this.normalColor());
            var lines = args_Achievement.achName[NekoGakuen.AchievementSystem.GetSID].replace(/\\/g, '\x1b');
            lines = lines.replace(/\x1b\x1b/g, '\\');
            this.drawTextEx(lines.replace(/\"/g, ''), 85, 30);
        }
    };

    Window_GetAchTip.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.refresh();
    };

    Window_GetAchTip.prototype.drawBackground = function (x, y, width, height) {
        this.contents.fillRect(x, y, width, height, this.dimColor1());
    };

    function Window_UnlockTip() {
        this.initialize.apply(this, arguments);
    }

    Window_UnlockTip.prototype = Object.create(Window_Base.prototype);
    Window_UnlockTip.prototype.constructor = Window_UnlockTip;

    Window_UnlockTip.prototype.initialize = function () {
        var x = Graphics.boxWidth / 2;
        var y = Graphics.boxHeight / 2;
        var width = 600;
        var height = 200;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._text = '';
    };

    Window_UnlockTip.prototype.setText = function (text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };

    Window_UnlockTip.prototype.clear = function () {
        this.setText('');
    };

    Window_UnlockTip.prototype.setItem = function (index) {
        this.setText(args_Achievement.achUnlockTip[index]);
    };

    Window_UnlockTip.prototype.resetFontSettings = function () {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = NekoGakuen.AchievementSystem.UnlockTipSize;
    };

    Window_UnlockTip.prototype.convertEscapeCharacterSp = function (text) {
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bN\[(\d+)\]/gi, function () {
            return this.actorName(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bP\[(\d+)\]/gi, function () {
            return this.partyMemberName(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        text = text.replace(/\x1bC\[(\d+)\]/gi, '');
        text = text.replace(/\x1bC/gi, '');
        text = text.replace(/\x1bI\[(\d+)\]/gi, '');
        text = text.replace(/\x1b{/gi, '');
        text = text.replace(/\x1b}/gi, '');
        return text;
    };

    Window_UnlockTip.prototype.refresh = function () {
        this.contents.clear();
        var width = 300 - this.textWidth(NekoGakuen.AchievementSystem.UnlockTipTitle) / 2;
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 18;
        this.drawText(NekoGakuen.AchievementSystem.UnlockTipTitle, width + (NekoGakuen.AchievementSystem.GetTipSize / 2) - (this.textPadding() * 2), 0);
        this.changeTextColor(this.normalColor());
        var lines = this._text.replace(/\\/g, '\x1b');
        lines = lines.replace(/\x1b\x1b/g, '\\');
        var widthTip = 285 - this.textWidth(this.convertEscapeCharacterSp(this._text)) / 2;
        this.drawTextEx(lines.replace(/\"/g, ''), widthTip - (this.textPadding() * 2), 32);
    };


    function Window_UnlockPic() {
        this.initialize.apply(this, arguments);
    }

    Window_UnlockPic.prototype = Object.create(Window_Base.prototype);
    Window_UnlockPic.prototype.constructor = Window_UnlockPic;

    Window_UnlockPic.prototype.initialize = function () {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this.opacity = 0;
        this.contentsOpacity = 0;
    };

    Window_UnlockPic.prototype.setText = function (text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };

    Window_UnlockPic.prototype.clear = function () {
        this.setText('');
    };

    Window_UnlockPic.prototype.setItem = function (index) {
        this.setText(args_Achievement.achUnlockPic[index]);
    };

    Window_UnlockPic.prototype.refresh = function () {
        if (this._backgroundSprite) {
            this.removeChild(this._backgroundSprite);
        }
        this._backgroundSprite = new Sprite(ImageManager.loadAchIconPic(this._text));
        this._backgroundSprite.opacity = 0;
        this.addChildAt(this._backgroundSprite, 0);
    };


    NekoGakuen.AchievementSystem._Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function () {
        NekoGakuen.AchievementSystem._Scene_Map_createDisplayObjects.call(this);
        this.createGetAchTipWindow();
    };

    Scene_Map.prototype.createGetAchTipWindow = function () {
        this._getAchTipwait = 100;
        this._getAchTipCount = false;
        this._getAchTipWindow = new Window_GetAchTip();
        this._getAchTipWindow.x -= this._getAchTipWindow.width;
        this.addChild(this._getAchTipWindow);
    };

    NekoGakuen.AchievementSystem._Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        NekoGakuen.AchievementSystem._Scene_Map_start.call(this);
        NekoGakuen.AchievementSystem.GetSID = null;
    };

    NekoGakuen.AchievementSystem._Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        this.updateGetAchTip();
        NekoGakuen.AchievementSystem._Scene_Map_update.call(this);
    };

    Scene_Map.prototype.updateGetAchTip = function () {
        if (NekoGakuen.AchievementSystem.GetSID != null) {
            if (this._getAchTipCount != true) {
                if (this._getAchTipWindow.x >= -20) {
                    if (this._getAchTipwait == 0) {
                        this._getAchTipCount = true;
                    } else {
                        this._getAchTipwait--;
                    }
                } else {
                    this._getAchTipWindow.x += 10;
                }
            }
            if (this._getAchTipCount == true) {
                this._getAchTipWindow.x -= 10;
                if (this._getAchTipWindow.x < -1 * this._getAchTipWindow.width) {
                    this._getAchTipCount = false;
                    NekoGakuen.AchievementSystem.GetSID = null;
                    this._getAchTipwait = 100;
                }
            }
        }
    };

    NekoGakuen.AchievementSystem._Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.create = function () {
        NekoGakuen.AchievementSystem._Scene_Battle_createDisplayObjects.call(this);
        this.createGetAchTipWindow();
    };

    Scene_Battle.prototype.createGetAchTipWindow = function () {
        this._getAchTipwait = 100;
        this._getAchTipCount = false;
        this._getAchTipWindow = new Window_GetAchTip();
        this._getAchTipWindow.x -= this._getAchTipWindow.width;
        this.addChild(this._getAchTipWindow);
    };

    NekoGakuen.AchievementSystem._Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function () {
        NekoGakuen.AchievementSystem._Scene_Battle_start.call(this);
        NekoGakuen.AchievementSystem.GetSID = null;
    };

    NekoGakuen.AchievementSystem._Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        this.updateGetAchTip();
        NekoGakuen.AchievementSystem._Scene_Battle_update.call(this);
    };

    Scene_Battle.prototype.updateGetAchTip = function () {
        if (NekoGakuen.AchievementSystem.GetSID != null) {
            if (this._getAchTipCount != true) {
                if (this._getAchTipWindow.x >= -20) {
                    if (this._getAchTipwait == 0) {
                        this._getAchTipCount = true;
                    } else {
                        this._getAchTipwait--;
                    }
                } else {
                    this._getAchTipWindow.x += 10;
                }
            }
            if (this._getAchTipCount == true) {
                this._getAchTipWindow.x -= 10;
                if (this._getAchTipWindow.x < -1 * this._getAchTipWindow.width) {
                    this._getAchTipCount = false;
                    NekoGakuen.AchievementSystem.GetSID = null;
                    this._getAchTipwait = 100;
                }
            }
        }
    };


    function Scene_AchievementSystem() {
        this.initialize.apply(this, arguments);
    }

    Scene_AchievementSystem.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_AchievementSystem.prototype.constructor = Scene_AchievementSystem;

    Scene_AchievementSystem.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
        this._unlockAction = null;
        ConfigManager.load();
    };

    Scene_AchievementSystem.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        let value = 0;
        for (let i = 0; i < NekoGakuen.AchievementSystem.achievement_List.length; i++) {
            if (ConfigManager['Achi' + args_Achievement.achID[i]] != null) {
                args_Achievement.achData[i] = ConfigManager['Achi' + args_Achievement.achID[i]];
                value++;
            }
        }
        if (value != 0) {
            this._rateValue = (value / NekoGakuen.AchievementSystem.achievement_List.length) * 100;
        } else {
            this._rateValue = 0;
        }
        this._waitCheck = true;
        this._waitRate = 0;
        this._lastSelect = 0;
    };

    Scene_AchievementSystem.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createStatusWindow();
        this.createListWindow();
        this.createUnlockTipWindow();
        this.createUnlockPicWindow();
    };

    Scene_AchievementSystem.prototype.createStatusWindow = function () {
        this._achievementStatusWindow = new Window_AchievementStatus();
        this._achievementStatusWindow.setHandler('cancel', this.popScene.bind(this));
        this._achievementStatusWindow.opacity = 0;
        this.addWindow(this._achievementStatusWindow);
    };

    Scene_AchievementSystem.prototype.createUnlockTipWindow = function () {
        this._unlockTipWindow = new Window_UnlockTip();
        this._unlockTipWindow.width = 0;
        this._unlockTipWindow.height = 0;
        this._unlockTipWindow.x = 0;
        this._unlockTipWindow.y = 0
        this.addChild(this._unlockTipWindow);
        this._unlockTipWindow.hide();
        this._unlockTipWindow.contentsOpacity = 0;
        this._unlockTipWindow.deactivate();
    };

    Scene_AchievementSystem.prototype.createUnlockPicWindow = function () {
        this._unlockPicWindow = new Window_UnlockPic();
        this.addChild(this._unlockPicWindow);

        this._unlockPicWindow.deactivate();
    };

    Scene_AchievementSystem.prototype.createListWindow = function () {
        var x = 410;
        var y = 78;
        var width = Graphics.boxWidth - 410;
        var height = Graphics.boxHeight - y;
        this._achievementlistWindow = new Window_AchievementList(x, y, width, height);
        this._achievementlistWindow.setHandler('ok', this.onUnlockTipOk.bind(this));
        this._achievementlistWindow.deactivate();
        this._achievementlistWindow.select(0);
        this._achievementlistWindow.refresh();
        this.addChild(this._achievementlistWindow);
    };

    Scene_AchievementSystem.prototype.onUnlockTipOk = function () {
        var index = this._achievementlistWindow.index();

        if (args_Achievement.achData[index] != null) {

            if (args_Achievement.achUnlockPic[index]) {
                SoundManager.playOk();

                this._achievementlistWindow.deactivate();
                this._achievementStatusWindow.deactivate();
                this._unlockAction = "open";
                this._unlockPicWindow.setItem(index);
            } else {

                this._achievementlistWindow.activate();
                this._achievementStatusWindow.activate();
                return;
            }

        } else {

            SoundManager.playOk();
            this._unlockTipWindow.show();
            this._achievementlistWindow.deactivate();
            this._achievementStatusWindow.deactivate();
            this._unlockAction = "open";
            this._unlockTipWindow.setItem(index);
        }

    };


    Scene_AchievementSystem.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);


        if (this._waitCheck == true) {
            if (this._waitRate + 1 >= this._rateValue) {
                this._achievementlistWindow.activate();
                this._waitCheck = false;
            } else {
                this._waitRate += 2;
                this._achievementStatusWindow.wasValue(this._waitRate, this._rateValue);
            }
        }


        if (this._waitCheck != true && this._unlockAction == "open") {

            if (args_Achievement.achData[this._achievementlistWindow.index()] && args_Achievement.achUnlockPic[this._achievementlistWindow.index()] != 'undefined') {
                if (this._unlockPicWindow._backgroundSprite.opacity >= 255) {

                    this._unlockPicWindow.activate();
                    this._unlockAction = null;
                } else {
                    this._unlockPicWindow._backgroundSprite.opacity += 5;

                }
            } else {
                if (this._unlockTipWindow.width >= 600) {
                    this._unlockTipWindow.contentsOpacity = 255;
                    this._unlockTipWindow.activate();
                    this._unlockAction = null;
                } else {
                    this._unlockTipWindow.width += 30;
                    this._unlockTipWindow.height += 6;
                    this._unlockTipWindow.x = (Graphics.boxWidth / 2) - (this._unlockTipWindow.width / 2);
                    this._unlockTipWindow.y = (Graphics.boxHeight / 2) - (this._unlockTipWindow.height / 2);
                }
            }
        }

        if (args_Achievement.achData[this._achievementlistWindow.index()] && args_Achievement.achUnlockPic[this._achievementlistWindow.index()] != 'undefined') {
            if (this._waitCheck != true && this._unlockPicWindow.active == true) {
                if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isTriggered() || TouchInput.isCancelled()) {
                    SoundManager.playCancel();
                    this._unlockPicWindow.deactivate();
                    this._unlockAction = "close";
                }
            }
        } else {
            if (this._waitCheck != true && this._unlockTipWindow.active == true) {
                if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isTriggered() || TouchInput.isCancelled()) {
                    SoundManager.playCancel();
                    this._unlockTipWindow.contentsOpacity = 0;
                    this._unlockTipWindow.deactivate();
                    this._unlockAction = "close";
                }

            }
        }

        if (this._waitCheck != true && this._unlockAction == "close") {
            if (args_Achievement.achData[this._achievementlistWindow.index()] && args_Achievement.achUnlockPic[this._achievementlistWindow.index()] != 'undefined') {
                if (this._unlockPicWindow._backgroundSprite.opacity == 0) {
                    this._achievementlistWindow.activate();
                    this._achievementStatusWindow.activate();
                    this._unlockAction = null;
                } else {
                    this._unlockPicWindow._backgroundSprite.opacity -= 5;
                }
            } else {
                if (this._unlockTipWindow.width == 0) {
                    this._achievementlistWindow.activate();
                    this._achievementStatusWindow.activate();
                    this._unlockTipWindow.hide();
                    this._unlockAction = null;
                } else {
                    this._unlockTipWindow.width -= 30;
                    this._unlockTipWindow.height -= 6;
                    this._unlockTipWindow.x = (Graphics.boxWidth / 2) - (this._unlockTipWindow.width / 2);
                    this._unlockTipWindow.y = (Graphics.boxHeight / 2) - (this._unlockTipWindow.height / 2);
                }
            }
        }
        if (this._lastSelect != this._achievementlistWindow.index()) {

            this._achievementStatusWindow.helpSID(this._achievementlistWindow.index());
            $gameSystem.setAchNew(this._achievementlistWindow.index(), null);
            this._lastSelect = this._achievementlistWindow.index();
        }
    };

})();
