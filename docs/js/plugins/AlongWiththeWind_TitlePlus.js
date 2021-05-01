//=============================================================================
// AlongWiththeWind_TitlePlus.js
// Version: 1.0
//=============================================================================
/*:
 * @plugindesc 標題畫面強化
 * @author Mirai
 * @help
 * 
 * ─ 插件簡介 ─
 * 這是設計給「與風同行」兩位遊戲作者使用的標題畫面強化插件。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.0 初次版本的插件發佈
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 2.在事件頁中高級區塊選擇「插件命令...」，
 *   並設定選擇要執行的插件命令及參數即可。
 * 
 * 
 * ─ 插件命令 ─
 * 
 * 【儲存章節變數】
 * --說明：在遊戲中隨時儲存目前的章節變數。
 * --插件命令 TitleChapter Save
 * 
 * 
 * 
 * @param Title Boolean
 * @text 開啟標題功能
 * @desc 是否開啟標題強化功能
 * @type boolean
 * @default true
 * @on 開啟
 * @off 關閉
 * 
 * @param Chapter Variable
 * @text 標題章節變數
 * @desc 指定標題圖像的變數ID。
 * @type variable
 * @default 0
 * 
 * @param AnyKey Text
 * @text 任意鍵提示文字
 * @desc 指定按下任意鍵在畫面所顯示的文字提示。
 * @type string
 * @default 按 下 任 意 鍵 開 始
 * 
 * @param Title List
 * @text 標題章節配置列表
 * @desc 指定每個章節在標題畫面所顯示的版面配置。
 * @type struct<TitleD>[]
 * @default []
 * 
 */
/*~struct~TitleD:
 * 
 * @param Image Class
 * @text ◆ 標題畫面
 * 
 * @param Title_Image
 * @text 標題畫面圖像
 * @desc 指定在標題畫面所顯示的標題圖像。
 * @parent Image Class
 * @type file
 * @dir img/titles1/
 * @default Island
 * 
 * @param Title_Gradient
 * @text 標題漸層圖像
 * @desc 指定在標題畫面所顯示的漸層圖像。
 * @parent Image Class
 * @type file
 * @dir img/titles2/
 * @default Title_Gradient
 * 
 * @param BGM Class
 * @text ◆ 背景音樂
 * 
 * @param BGM_Name
 * @text 標題背景音樂
 * @desc 指定在標題畫面播放的背景音樂檔案。
 * @parent BGM Class
 * @type file
 * @dir audio/bgm
 * @default 標題
 * 
 * @param BGM_Volume
 * @text 指定BGM音量
 * @desc 指定BGM的音量控制。
 * @parent BGM Class
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param BGM_Pitch
 * @text 指定BGM音高
 * @desc 指定BGM的音高控制。
 * @parent BGM Class
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param BGM_Pan
 * @text 指定BGM移動
 * @desc 指定BGM的移動控制。
 * @parent BGM Class
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param Text Class
 * @text ◆ 標題文字
 * 
 * @param Title_Text
 * @text 標題文字圖像
 * @desc 指定在標題畫面所顯示的文字圖像。
 * @parent Text Class
 * @type file
 * @dir img/pictures/
 * @default Title_basic
 * 
 * @param Over_Text
 * @text 標題疊層圖像
 * @desc 指定在標題畫面所顯示的疊層圖像。
 * @parent Text Class
 * @type file
 * @dir img/pictures/
 * @default Title_over
 * 
 * @param Mask_Text
 * @text 標題遮罩圖像
 * @desc 指定在標題畫面所顯示的遮罩圖像。
 * @parent Text Class
 * @type file
 * @dir img/pictures/
 * @default Title_mask
 * 
 * @param Title_Text_X
 * @text 標題文字X座標
 * @desc 指定標題在畫面所顯示的X座標。
 * @type number
 * @parent Text Class
 * @min -999999999
 * @max 999999999
 * @default 25
 * 
 * @param Title_Text_Y
 * @text 標題文字Y座標
 * @desc 指定標題在畫面所顯示的Y座標。
 * @type number
 * @parent Text Class
 * @min -999999999
 * @max 999999999
 * @default 70
 * 
 * @param Command Class
 * @text ◆ 標題選項
 * 
 * @param Title_Command_Color
 * @text 標題選項色彩
 * @desc 指定選項在畫面所顯示的文字色彩，
 * 而文字色彩請參照對話文字色彩的代號。
 * @type number
 * @parent Command Class
 * @default 0
 * 
 * @param Title_Command_X
 * @text 標題選項X座標
 * @desc 指定選項在畫面所顯示的X座標。
 * @type number
 * @parent Command Class
 * @min -999999999
 * @max 999999999
 * @default 25
 * 
 * @param Title_Command_Y
 * @text 標題選項Y座標
 * @desc 指定選項在畫面所顯示的Y座標。
 * @type number
 * @parent Command Class
 * @min -999999999
 * @max 999999999
 * @default 425
 * 
 * @param Verions Class
 * @text ◆ 版本代號
 * 
 * @param Verions_Front_Name
 * @text 版本號前置字元
 * @desc 指定版本號在畫面所顯示的前置字元。
 * @type string
 * @parent Verions Class
 * @default Ver 
 * 
 * @param Verions_Text_X
 * @text 版本號X座標
 * @desc 指定版本號在畫面所顯示的X座標。
 * @type number
 * @parent Verions Class
 * @min -999999999
 * @max 999999999
 * @default 12
 * 
 * @param Verions_Text_Y
 * @text 版本號Y座標
 * @desc 指定版本號在畫面所顯示的Y座標。
 * @type number
 * @parent Verions Class
 * @min -999999999
 * @max 999999999
 * @default 600
 * 
 * 
 */
//=============================================================================
'use strict';
var Imported = Imported || {};
(function () {
    let AlongWiththeWind = {};
    let pluginName = "AlongWiththeWind_TitlePlus";
    AlongWiththeWind.TitlePlus = {};
    AlongWiththeWind.CrossSave = {};

    AlongWiththeWind.TitlePlus.Parameters = PluginManager.parameters(pluginName);
    AlongWiththeWind.TitlePlus.TitleBoolean = String(AlongWiththeWind.TitlePlus.Parameters['Title Boolean'] || 'true');
    AlongWiththeWind.TitlePlus.ChapterVariable = Number(AlongWiththeWind.TitlePlus.Parameters['Chapter Variable'] || 0);
    AlongWiththeWind.TitlePlus.AnyKeyText = String(AlongWiththeWind.TitlePlus.Parameters['AnyKey Text'] || '按 下 任 意 鍵 開 始');
    AlongWiththeWind.TitlePlus.TitleEnter = false;
    AlongWiththeWind.TitlePlus.titleInit = false;
    AlongWiththeWind.TitlePlus.ChapterNumber = 1;

    let titlePlus_List = JSON.parse(AlongWiththeWind.TitlePlus.Parameters['Title List']);
    let args_TitlePlus = {};
    let args_TitleParse;
    args_TitlePlus.TitleImage = Array();
    args_TitlePlus.TitleGradient = Array();
    args_TitlePlus.BGMName = Array();
    args_TitlePlus.BGMVolume = Array();
    args_TitlePlus.BGMPitch = Array();
    args_TitlePlus.BGMPan = Array();

    args_TitlePlus.TitleText = Array();
    args_TitlePlus.OverText = Array();
    args_TitlePlus.MaskText = Array();
    args_TitlePlus.TitleTextX = Array();
    args_TitlePlus.TitleTextY = Array();

    args_TitlePlus.TitleCommandColor = Array();
    args_TitlePlus.TitleCommandX = Array();
    args_TitlePlus.TitleCommandY = Array();

    args_TitlePlus.VerionsFrontName = Array();
    args_TitlePlus.VerionsTextX = Array();
    args_TitlePlus.VerionsTextY = Array();
    for (let i = 0; i < titlePlus_List.length; i++) {
        args_TitleParse = JSON.parse(titlePlus_List[i]);






        args_TitlePlus.TitleImage.push(String(args_TitleParse["Title_Image"]));
        args_TitlePlus.TitleGradient.push(String(args_TitleParse["Title_Gradient"]));

        args_TitlePlus.BGMName.push(String(args_TitleParse["BGM_Name"]));
        args_TitlePlus.BGMVolume.push(Number(args_TitleParse["BGM_Volume"]));
        args_TitlePlus.BGMPitch.push(Number(args_TitleParse["BGM_Pitch"]));
        args_TitlePlus.BGMPan.push(Number(args_TitleParse["BGM_Pan"]));

        args_TitlePlus.TitleText.push(String(args_TitleParse["Title_Text"]));
        args_TitlePlus.OverText.push(String(args_TitleParse["Over_Text"]));
        args_TitlePlus.MaskText.push(String(args_TitleParse["Mask_Text"]));
        args_TitlePlus.TitleTextX.push(Number(args_TitleParse["Title_Text_X"]));
        args_TitlePlus.TitleTextY.push(Number(args_TitleParse["Title_Text_Y"]));

        args_TitlePlus.TitleCommandColor.push(Number(args_TitleParse["Title_Command_Color"]));
        args_TitlePlus.TitleCommandX.push(Number(args_TitleParse["Title_Command_X"]));
        args_TitlePlus.TitleCommandY.push(Number(args_TitleParse["Title_Command_Y"]));

        args_TitlePlus.VerionsFrontName.push(String(args_TitleParse["Verions_Front_Name"]));
        args_TitlePlus.VerionsTextX.push(Number(args_TitleParse["Verions_Text_X"]));
        args_TitlePlus.VerionsTextY.push(Number(args_TitleParse["Verions_Text_Y"]));

    }


    AlongWiththeWind.TitlePlus._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        AlongWiththeWind.TitlePlus._Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'TitleChapter') {
            switch (args[0]) {
                case 'Save':
                    AlongWiththeWind.TitlePlus.ChapterNumber = $gameVariables.value(AlongWiththeWind.TitlePlus.ChapterVariable);
                    ConfigManager.save();
                    break;
            }
        }
    };

    AlongWiththeWind.TitlePlus._Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        AlongWiththeWind.TitlePlus._Scene_Boot_start.call(this);
        ConfigManager.load();
        if (!ConfigManager.chapter) {
            AlongWiththeWind.TitlePlus.ChapterNumber = 1;
        } else {
            AlongWiththeWind.TitlePlus.ChapterNumber = ConfigManager.chapter;
        }
    };

    AlongWiththeWind.TitlePlus._Window_TitleCommand_initialize = Window_TitleCommand.prototype.initialize;
    Window_TitleCommand.prototype.initialize = function () {
        AlongWiththeWind.TitlePlus._Window_TitleCommand_initialize.call(this);
        this.open();
        this.opacity = 0;
        this.deactivate();
        this.contentsOpacity = 0;

    };
    Window_TitleCommand.prototype.updateCursor = function () {

        if (this._cursorAll) {
            var allRowsHeight = this.maxRows() * this.itemHeight();
            //  this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
            this.setTopRow(0);
        } else if (this.isCursorVisible()) {

            var rect = this.itemRect(this.index());
            //  this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
            this.contents.fontSize = 28;
            this.contents.outlineWidth = 0;
            this.contents.textColor = this.textColor(args_TitlePlus.TitleCommandColor[AlongWiththeWind.TitlePlus.ChapterNumber - 1]);
            this.drawText("▶", rect.x, rect.y, rect.width, "left");
        } else {
            //  this.setCursorRect(0, 0, 0, 0);
        }
    };
    Window_TitleCommand.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.contents.fontSize = 28;
        this.contents.outlineWidth = 0;
        this.contents.textColor = this.textColor(args_TitlePlus.TitleCommandColor[AlongWiththeWind.TitlePlus.ChapterNumber - 1]);
        this.drawText(this.commandName(index), rect.x + 28, rect.y, rect.width, align);
    };

    Window_TitleCommand.prototype.update = function () {
        Window_Command.prototype.update.call(this);
        if (this.contents) {
            this.contents.clear();
            this.drawAllItems();

        }
        this.updateCursor();
    };

    Window_TitleCommand.prototype.updatePlacement = function () {

        this.x = args_TitlePlus.TitleCommandX[AlongWiththeWind.TitlePlus.ChapterNumber - 1];
        this.y = args_TitlePlus.TitleCommandY[AlongWiththeWind.TitlePlus.ChapterNumber - 1];
    };
    /* 
       Window_TitleCommand.prototype.makeCommandList = function () {
           this.addCommand(TextManager.newGame, 'newGame');
           this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
           this.addCommand(TextManager.options, 'options');
           //this.addCommand("製作群", 'credits', false);
       };
    */
    Window_TitleCommand.prototype.onTouch = function (triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };

    AlongWiththeWind.TitlePlus._Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Title.prototype.initialize = function () {
        AlongWiththeWind.TitlePlus._Scene_Base_initialize.call(this);
        AlongWiththeWind.TitlePlus.titleCheck = false;
        this._waitCheck = false;

    };



    AlongWiththeWind.TitlePlus._Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function () {
        AlongWiththeWind.TitlePlus._Scene_Title_create.call(this);
        this.createVerionsInfo();
        this.createAnyEnter();
    };

    Scene_Title.prototype.createVerionsInfo = function () {

        this._verionsInfoSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._verionsInfoSprite);
        var x = args_TitlePlus.VerionsTextX[AlongWiththeWind.TitlePlus.ChapterNumber - 1];
        var y = args_TitlePlus.VerionsTextY[AlongWiththeWind.TitlePlus.ChapterNumber - 1];
        var maxWidth = 250;
        if (Imported.AlongWiththeWind_CrossSave == true) {
            var text = args_TitlePlus.VerionsFrontName[AlongWiththeWind.TitlePlus.ChapterNumber - 1] + " " + Imported.AlongWiththeWind_CrossSave_GameVersion;
        } else {
            var text = args_TitlePlus.VerionsFrontName[AlongWiththeWind.TitlePlus.ChapterNumber - 1] + " 1.0";
        }

        this._verionsInfoSprite.bitmap.outlineColor = 'black';
        this._verionsInfoSprite.bitmap.outlineWidth = 0;
        this._verionsInfoSprite.bitmap.fontSize = 12;
        this._verionsInfoSprite.bitmap.drawText(text, x, y, maxWidth, 12, 'left');
        this._verionsInfoSprite.opacity = 0;
    };

    AlongWiththeWind.TitlePlus._Scene_Title_createForeground = Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function () {
        AlongWiththeWind.TitlePlus._Scene_Title_createForeground.call(this);
        if (this._gameTitleSprite) {
            this.removeChild(this._gameTitleSprite);
        }
        if (this._gameTitleOver) {
            this.removeChild(this._gameTitleOver);
        }
        if (this._gameTitleMask) {
            this.removeChild(this._gameTitleMask);
        }
        var x = args_TitlePlus.TitleTextX[AlongWiththeWind.TitlePlus.ChapterNumber - 1];
        var y = args_TitlePlus.TitleTextY[AlongWiththeWind.TitlePlus.ChapterNumber - 1];
        this._gameTitleSprite = new Sprite(ImageManager.loadPicture(args_TitlePlus.TitleText[AlongWiththeWind.TitlePlus.ChapterNumber - 1]));
        this.addChild(this._gameTitleSprite);
        this._gameTitleSprite.x = x;
        this._gameTitleSprite.y = y;
        this._gameTitleOver = new Sprite(ImageManager.loadPicture(args_TitlePlus.OverText[AlongWiththeWind.TitlePlus.ChapterNumber - 1]));
        this._gameTitleOver.addChild(new Sprite_Picture(101));
        this.addChild(this._gameTitleOver);
        this._gameTitleOver.x = x;
        this._gameTitleOver.y = y;
        this._gameTitleMask = new Sprite(ImageManager.loadPicture(args_TitlePlus.MaskText[AlongWiththeWind.TitlePlus.ChapterNumber - 1]));
        this._gameTitleMask.addChild(new Sprite_Picture(102));
        this.addChild(this._gameTitleMask);
        this._gameTitleMask.x = x - 250;
        this._gameTitleMask.y = y;
        this._gameTitleMask.opacity = 0;

    };


    Scene_Title.prototype.playTitleMusic = function () {
        var bgm = {
            name: args_TitlePlus.BGMName[AlongWiththeWind.TitlePlus.ChapterNumber - 1],
            pan: args_TitlePlus.BGMPan[AlongWiththeWind.TitlePlus.ChapterNumber - 1],
            pitch: args_TitlePlus.BGMPitch[AlongWiththeWind.TitlePlus.ChapterNumber - 1],
            volume: args_TitlePlus.BGMVolume[AlongWiththeWind.TitlePlus.ChapterNumber - 1]
        }
        AudioManager.playBgm(bgm);
        AudioManager.stopBgs();
        AudioManager.stopMe();
    };

    Scene_Title.prototype.createAnyEnter = function () {
        this._anyEnterSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));

        var text = AlongWiththeWind.TitlePlus.AnyKeyText;
        var maxWidth = 320;
        var x = (Graphics.boxWidth / 2) - (320 / 2);
        var y = Graphics.boxHeight - 160;
        this._anyEnterSprite.bitmap.outlineColor = 'black';
        this._anyEnterSprite.bitmap.outlineWidth = 2;
        this._anyEnterSprite.bitmap.fontSize = 18;

        this._anyEnterSprite.bitmap.drawText(text, x, y, maxWidth, 18, 'center');
        this._anyEnterSprite.opacity = 0;
        this.addChild(this._anyEnterSprite);
        AlongWiththeWind.TitlePlus.titleCheck = true;
    };

    AlongWiththeWind.TitlePlus._Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function () {
        AlongWiththeWind.TitlePlus._Scene_Title_update.call(this);
        if (AlongWiththeWind.TitlePlus.titleInit && this._waitCheck != true) {
            if (Input.isTriggered('ok')) {
                SoundManager.playOk();
                this._waitCheck = true;
            }
            if (TouchInput.isTriggered()) {
                SoundManager.playOk();
                this._waitCheck = true;
            }
        }
        this.updateWaitCount();
    };

    Scene_Title.prototype.isBusy = function () {
        return Scene_Base.prototype.isBusy.call(this);
    };


    Scene_Title.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        this.createForeground();
        ConfigManager.load();
        if (!ConfigManager.chapter) {
            AlongWiththeWind.TitlePlus.ChapterNumber = 1;
        } else {
            AlongWiththeWind.TitlePlus.ChapterNumber = ConfigManager.chapter;
        }

        if (ConfigManager.deadVar) {
            AlongWiththeWind.TitlePlus.deadVar = ConfigManager.deadVar;
            AlongWiththeWind.TitlePlus.varleVar = ConfigManager.varleVar;
        }
        if (AlongWiththeWind.TitlePlus.titleInit == true) {
            this._gameTitleOver.mask = this._gameTitleMask;
            this._gameTitleMask.opacity = 255;
            this._gameTitleOver.opacity = 255;
        }
        this.centerSprite(this._backSprite1);
        this.centerSprite(this._backSprite2);
        this.startFadeIn(this.fadeSpeed(), false);
    };

    Scene_Title.prototype.updateWaitCount = function () {

        if (AlongWiththeWind.TitlePlus.titleInit != true) {
            if (this._backSprite1.opacity > 254) {
                this.playTitleMusic();
                this._gameTitleOver.mask = this._gameTitleMask;
                this._gameTitleMask.opacity = 255;
                this._gameTitleOver.opacity = 255;
                AlongWiththeWind.TitlePlus.titleInit = true;
            } else {
                this._backSprite1.opacity += 5;
                this._gameTitleOver.opacity -= 5;
            }




        } else {
            if (AlongWiththeWind.TitlePlus.TitleEnter != true) {
                if (this._waitCheck == true) {

                    if (this._anyEnterSprite.opacity < 1) {

                        AlongWiththeWind.TitlePlus.TitleEnter = true;
                        return;
                    } else {
                        this._anyEnterSprite.opacity -= 5;
                    }

                } else {
                    if (AlongWiththeWind.TitlePlus.titleCheck == true) {
                        this._anyEnterSprite.opacity += 5;

                    }
                    if (AlongWiththeWind.TitlePlus.titleCheck == false) {
                        this._anyEnterSprite.opacity -= 5;

                    }
                    if (this._anyEnterSprite.opacity > 254 && AlongWiththeWind.TitlePlus.titleCheck == true) {
                        AlongWiththeWind.TitlePlus.titleCheck = false;
                    }
                    if (this._anyEnterSprite.opacity < 1 && AlongWiththeWind.TitlePlus.titleCheck == false) {
                        AlongWiththeWind.TitlePlus.titleCheck = true;
                    }



                }

            }
            if (AlongWiththeWind.TitlePlus.TitleEnter == true) {
                if (this._commandWindow.contentsOpacity > 254) {
                    this._commandWindow.activate();

                } else {
                    this._backSprite2.opacity += 5;
                    this._commandWindow.contentsOpacity += 5;
                    this._verionsInfoSprite.opacity += 5;
                }
            }
            if (this._gameTitleMask.x > 2500) {
                this._gameTitleMask.x = -250;
            } else {
                this._gameTitleMask.x += 10;
            }
            this._gameTitleOver.mask = this._gameTitleMask;
        }
    };

    Scene_Title.prototype.commandNewGame = function () {

        DataManager.setupNewGame();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
        ConfigManager.load();
        if (!ConfigManager.chapter) {
            $gameVariables.setValue(AlongWiththeWind.TitlePlus.ChapterVariable, 1);
        } else {
            $gameVariables.setValue(AlongWiththeWind.TitlePlus.ChapterVariable, ConfigManager.chapter);
        }

        if (ConfigManager.deadVar) {
            $gameVariables.setValue(AlongWiththeWind.TitlePlus.deadVar, AlongWiththeWind.TitlePlus.varleVar);
        }

        this._commandWindow.close();
    };

    /*    AlongWiththeWind.TitlePlus._Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
       Scene_Title.prototype.createCommandWindow = function () {
           this._commandWindow = new Window_TitleCommand();
           this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
           this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
           this._commandWindow.setHandler('options', this.commandOptions.bind(this));
           this._commandWindow.setHandler('credits', this.commandCredits.bind(this));
           this.addWindow(this._commandWindow);
       };
    
    Scene_Title.prototype.commandCredits = function () {
        SoundManager.playBuzzer();
        return;
    };
    */

    AlongWiththeWind.TitlePlus._Scene_Title_createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function () {
        AlongWiththeWind.TitlePlus._Scene_Title_createBackground.call(this);

        if (this._backSprite1) {
            this.removeChild(this._backSprite1);
        }
        if (this._backSprite2) {
            this.removeChild(this._backSprite2);
        }

        if (AlongWiththeWind.TitlePlus.TitleBoolean == 'true') {
            this._backSprite1 = new Sprite(ImageManager.loadTitle1(args_TitlePlus.TitleImage[AlongWiththeWind.TitlePlus.ChapterNumber - 1]));
            this._backSprite2 = new Sprite(ImageManager.loadTitle2(args_TitlePlus.TitleGradient[AlongWiththeWind.TitlePlus.ChapterNumber - 1]));
        } else {
            this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
            this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
        }

        if (AlongWiththeWind.TitlePlus.titleInit != true) {
            this._backSprite1.opacity = 0;
            this._backSprite2.opacity = 0;
        }


        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };

    AlongWiththeWind.TitlePlus._Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        ConfigManager.load();
        AlongWiththeWind.TitlePlus._Scene_Map_start.call(this);
        AlongWiththeWind.TitlePlus.titleInit = false;
        AlongWiththeWind.TitlePlus.TitleEnter = false;
        if (!ConfigManager.chapter) {
            $gameVariables.setValue(AlongWiththeWind.TitlePlus.ChapterVariable, 1);
        } else {
            $gameVariables.setValue(AlongWiththeWind.TitlePlus.ChapterVariable, ConfigManager.chapter);
        }
        if (ConfigManager.deadVar) {
            $gameVariables.setValue(AlongWiththeWind.TitlePlus.deadVar, AlongWiththeWind.TitlePlus.varleVar);
        }
    };



    AlongWiththeWind.TitlePlus._ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        var config = AlongWiththeWind.TitlePlus._ConfigManager_makeData.call(this);

        config.chapter = AlongWiththeWind.TitlePlus.ChapterNumber;

        return config;
    };

    AlongWiththeWind.TitlePlus._ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        AlongWiththeWind.TitlePlus._ConfigManager_applyData.call(this, config);

        this.chapter = this.readVar(config, 'chapter');
    };

    ConfigManager.readVar = function (config, name) {
        var value = config[name];
        if (value !== undefined) {
            return Number(value);
        } else {
            return 1;
        }
    };

})();
