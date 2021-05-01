//=============================================================================
// AlongWiththeWind_MenuPlus.js
// Version: 1.1
//=============================================================================
/*:
 * @plugindesc 遊戲選單強化
 * @author Mirai
 * @help
 * 
 * ─ 插件簡介 ─
 * 這是設計給「與風同行」兩位遊戲作者使用的遊戲選單強化插件。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.1 修正一些小小的BUG。
 * V1.0 初次版本的插件發佈。
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 2.在事件頁中高級區塊選擇「插件命令...」，
 *   並設定選擇要執行的插件命令及參數即可。
 * 
 * 
 * 
 * 
 * 
 * @param MenuTips Variable
 * @text 主線劇情變數
 * @desc 指定主線劇情的變數ID。
 * @type variable
 * @default 2
 * 
 * 
 * @param MenuTips List
 * @text 主線劇情列表...
 * @desc 指定主線劇情提示的設置。
 * @type struct<MenuTips>[]
 * @default []
 * 
 */
/*~struct~MenuTips:
 * 
 * @param MenuTips Value
 * @text 條件數值
 * @desc 指定主線劇情變數的條件數值。
 * @type number
 * 
 * @param MenuTips Text
 * @text 提示文字
 * @desc 指定主線劇情變數的提示文字。
 * @type string
 * 
 * 
 */
//=============================================================================
'use strict';
Scene_Menu.prototype.callSceneSp = function () {
};
(function () {
    let AlongWiththeWind = {};
    var pluginName = "AlongWiththeWind_MenuPlus";
    AlongWiththeWind.MenuPlus = {};
    AlongWiththeWind.MenuPlus.Parameters = PluginManager.parameters(pluginName);
    AlongWiththeWind.MenuPlus.MenuTipsVariable = Number(AlongWiththeWind.MenuPlus.Parameters['MenuTips Variable'] || 2);

    let menuPluss_List = JSON.parse(AlongWiththeWind.MenuPlus.Parameters['MenuTips List']);
    let args_MenuPlus = {};
    let args_MenuParse;
    args_MenuPlus.MenuTipsValue = Array();
    args_MenuPlus.MenuTipsText = Array();
    for (let i = 0; i < menuPluss_List.length; i++) {
        args_MenuParse = JSON.parse(menuPluss_List[i]);
        args_MenuPlus.MenuTipsValue.push(Number(args_MenuParse["MenuTips Value"]));
        args_MenuPlus.MenuTipsText.push(String(args_MenuParse["MenuTips Text"]));
    }

    Bitmap.prototype.drawTextRot = function (text, x, y, maxWidth, lineHeight, align) {
        if (text !== undefined) {
            var tx = x;
            var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
            var context = this._context;
            var alpha = context.globalAlpha;
            maxWidth = maxWidth || 0xffffffff;
            if (align === 'center') {
                tx += maxWidth / 2;
            }
            if (align === 'right') {
                tx += maxWidth;
            }
            context.save();
            context.font = this._makeFontNameText();
            context.textAlign = align;
            context.textBaseline = 'alphabetic';
            context.globalAlpha = 1;
            context.rotate(-4 * Math.PI / 180);
            this._drawTextOutline(text, tx, ty, maxWidth);
            context.globalAlpha = alpha;
            this._drawTextBody(text, tx, ty, maxWidth);
            context.restore();
            this._setDirty();
        }
    };

    Bitmap.prototype.fillRectRot = function (x, y, width, height, color) {
        var context = this._context;
        context.save();
        context.fillStyle = color;
        context.rotate(-4 * Math.PI / 180);
        context.fillRect(x, y, width, height);

        context.restore();
        this._setDirty();
    };



    function Window_GoldBg() {
        this.initialize.apply(this, arguments);
    }

    Window_GoldBg.prototype = Object.create(Window_Base.prototype);
    Window_GoldBg.prototype.constructor = Window_GoldBg;

    Window_GoldBg.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.opacity = 0;
        this._goldOpacity = 0;
        this._goldBg = new Sprite();

        this._goldBg.bitmap = new Bitmap(0, 0);
        this._goldBg.bitmap = ImageManager.loadSystem('menugold_bg');
        this._goldBg.x = 50;
        this._goldBg.y = 10;
        this.addChildToBack(this._goldBg);
        this.refresh();
    };

    Window_GoldBg.prototype.windowWidth = function () {
        return 240;
    };

    Window_GoldBg.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };

    Window_GoldBg.prototype.drawCurrencyValue = function (value, unit, wx, wy, ww) {
        this.resetTextColor();
        this.contents.fontSize = Yanfly.Param.GoldFontSize;
        if (this.usingGoldIcon(unit)) {
            var cx = Window_Base._iconWidth;
        } else {
            var cx = this.textWidth(unit);
        }
        var text = Yanfly.Util.toGroup(value);
        if (this.textWidth(text) > ww - cx) {
            text = Yanfly.Param.GoldOverlap;
        }
        this.drawText(text, wx + 30, wy, ww - cx - 4, 'right');
        if (this.usingGoldIcon(unit)) {
            this.drawIcon(Yanfly.Icon.Gold, wx + Window_Base._iconWidth, wy + 2);
        } else {
            this.changeTextColor(this.systemColor());
            this.drawText(unit, wx, wy, ww, 'right');
        }
        this.resetFontSettings();
    };

    Window_GoldBg.prototype.refresh = function () {

        var x = this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
    };

    Window_GoldBg.prototype.value = function () {
        return $gameParty.gold();
    };

    Window_GoldBg.prototype.currencyUnit = function () {
        return TextManager.currencyUnit;
    };

    Window_GoldBg.prototype.open = function () {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

    Window_GoldBg.prototype.bgOpacity = function (value) {
        this._goldOpacity = value;
    }

    Window_GoldBg.prototype.update = function () {
        this._goldBg.opacity = this._goldOpacity;
        Window_Base.prototype.update.call(this);
    };



    function Window_MenuTipsBg() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuTipsBg.prototype = Object.create(Window_Base.prototype);
    Window_MenuTipsBg.prototype.constructor = Window_MenuTipsBg;

    Window_MenuTipsBg.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.opacity = 0;
        this._tipsOpacity = 0;
        this._tipsBg = new Sprite();
        this._tipsBg.bitmap = new Bitmap(0, 0);
        this._tipsBg.bitmap = ImageManager.loadSystem('menutips_bg');
        this._tipsBg.x = 50;
        this._tipsBg.y = 10;
        this.addChildToBack(this._tipsBg);
        this._tipstext;
        for (let i = 0; i < menuPluss_List.length; i++) {
            if ($gameVariables.value(AlongWiththeWind.MenuPlus.MenuTipsVariable) == args_MenuPlus.MenuTipsValue[i]) {
                text = args_MenuPlus.MenuTipsText[i];
            }

        }
        this.refresh();
    };

    Window_MenuTipsBg.prototype.bgOpacity = function (value) {
        this._tipsOpacity = value;
    }

    Window_MenuTipsBg.prototype.update = function () {
        if (this._tipstext) {
            this._tipsBg.opacity = this._tipsOpacity;
        } else {
            this._tipsBg.opacity = 0;
        }
        Window_Base.prototype.update.call(this);
    };


    Window_MenuTipsBg.prototype.windowWidth = function () {
        return 350;
    };

    Window_MenuTipsBg.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };

    Window_MenuTipsBg.prototype.drawCurrencyValue = function (value, unit, wx, wy, ww) {
        this.resetTextColor();
        var cx = Window_Base._iconWidth;
        this.contents.fontSize = 20;
        for (let i = 0; i < menuPluss_List.length; i++) {
            if ($gameVariables.value(AlongWiththeWind.MenuPlus.MenuTipsVariable) == args_MenuPlus.MenuTipsValue[i]) {
                this._tipstext = args_MenuPlus.MenuTipsText[i];
            }

        }
        if (this._tipstext) {
            this.drawIcon(193, wx + Window_Base._iconWidth, wy + 2);
        }

        this.drawText(this._tipstext, wx + 70, wy, ww - cx - 4);
        this.resetFontSettings();
    };

    Window_MenuTipsBg.prototype.refresh = function () {
        var x = this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
    };

    Window_MenuTipsBg.prototype.value = function () {
        return $gameParty.gold();
    };

    Window_MenuTipsBg.prototype.currencyUnit = function () {
        return TextManager.currencyUnit;
    };

    Window_MenuTipsBg.prototype.open = function () {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };


    AlongWiththeWind.MenuPlus._Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function (x, y) {
        AlongWiththeWind.MenuPlus._Window_MenuCommand_initialize.call(this, x, y);
        this.opacity = 0;
        this.deactivate();
        this._windowCursorSprite.bitmap = ImageManager.loadSystem('menulist_cursor');
    };

    Window_MenuCommand.prototype.drawTextRot = function (text, x, y, maxWidth, align) {
        this.contents.drawTextRot(text, x, y, maxWidth, this.lineHeight(), align);
    };

    Window_MenuCommand.prototype.updateCursor = function () {

        if (this._cursorAll) {
            var allRowsHeight = this.maxRows() * this.itemHeight();
            //  this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
            this.setTopRow(0);
        } else if (this.isCursorVisible()) {

            var rect = this.itemRect(this.index());
            this._windowCursorSprite.move(rect.x + (3 * this.index()), rect.y + 8);
        } else {
            //  this.setCursorRect(0, 0, 0, 0);
        }
    };

    Window_MenuCommand.prototype.itemHeight = function () {
        return 48;
    };

    Window_MenuCommand.prototype.windowHeight = function () {
        return 624;
    };

    Window_MenuCommand.prototype.drawHorzLine = function (y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRectRot(-25, lineY + 25, this.contentsWidth() - 25, 2, this.textColor(7));
        this.contents.paintOpacity = 255;
    };

    Window_MenuCommand.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = 'center';
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawTextRot(this.commandName(index), rect.x - 40, rect.y + 2, rect.width, align);
        this.drawHorzLine(this.itemHeight() * index);
    };


    function Window_MenuStatusPlus() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuStatusPlus.prototype = Object.create(Window_Selectable.prototype);
    Window_MenuStatusPlus.prototype.constructor = Window_MenuStatusPlus;

    Window_MenuStatusPlus.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._formationMode = false;
        this._pendingIndex = -1;
        this.opacity = 0;

        this.refresh();

    };

    Window_MenuStatusPlus.prototype.windowWidth = function () {
        return Graphics.boxWidth - 300;
    };
    Window_MenuStatusPlus.prototype.windowHeight = function () {
        return Graphics.boxHeight - 80;
    };

    Window_MenuStatusPlus.prototype.drawFace = function (faceName, faceIndex, x, y, width, height) {
        width = width || Window_Base._faceWidth;
        height = height || Window_Base._faceHeight;
        var bitmap = ImageManager.loadFace(faceName);
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw - 20, ph - 20);
    };

    Window_MenuStatusPlus.prototype.maxItems = function () {
        return $gameParty.size();
    };

    Window_MenuStatusPlus.prototype.itemHeight = function () {
        var clientHeight = this.height - this.padding * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_MenuStatusPlus.prototype.numVisibleRows = function () {
        return 4;
    };

    Window_MenuStatusPlus.prototype.loadImages = function () {
        $gameParty.members().forEach(function (actor) {
            ImageManager.reserveFace(actor.faceName());
        }, this);
    };

    Window_MenuStatusPlus.prototype.drawItem = function (index) {

        this.drawItemBackground(index);
        this.drawItemImage(index);
        this.drawItemStatus(index);
    };

    Window_MenuStatusPlus.prototype.drawItemBackground = function (index) {
        if (index === this._pendingIndex) {
            var rect = this.itemRect(index);
            var color = this.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
            this.changePaintOpacity(true);
        }
    };

    Window_MenuStatusPlus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.drawStatusBg(0, rect.y)
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceWidth);
        this.changePaintOpacity(true);
    };

    Window_MenuStatusPlus.prototype.drawStatusBg = function (x, y) {
        var bitmap = ImageManager.loadSystem('menuactor_bg');
        var pw = 480;
        var ph = 125;
        var sx = 0;
        var sy = 0;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };

    Window_MenuStatusPlus.prototype.drawItemStatus = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        var x = rect.x + 142;
        var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
        var width = rect.width - x - this.textPadding();
        this.drawActorSimpleStatus(actor, x, y, width);
    };

    Window_MenuStatusPlus.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
        var lineHeight = this.lineHeight();
        var x2 = x + 140;
        var width2 = Math.min(200, width - 140 - this.textPadding());
        this.drawActorName(actor, x, y);
        this.drawActorLevel(actor, x, y + lineHeight * 1);
        this.drawActorIcons(actor, x, y + lineHeight * 2); 8
        // this.drawActorClass(actor, x2, y);
        this.drawActorHp(actor, x2, y, width2);
        this.drawActorMp(actor, x2, y + lineHeight * 1, width2);
        this.drawActorTp(actor, x2, y + lineHeight * 2, width2);
    };

    Window_MenuStatusPlus.prototype.processOk = function () {
        Window_Selectable.prototype.processOk.call(this);
        $gameParty.setMenuActor($gameParty.members()[this.index()]);
    };

    Window_MenuStatusPlus.prototype.isCurrentItemEnabled = function () {
        if (this._formationMode) {
            var actor = $gameParty.members()[this.index()];
            return actor && actor.isFormationChangeOk();
        } else {
            return true;
        }
    };

    Window_MenuStatusPlus.prototype.selectLast = function () {
        this.select($gameParty.menuActor().index() || 0);
    };

    Window_MenuStatusPlus.prototype.formationMode = function () {
        return this._formationMode;
    };

    Window_MenuStatusPlus.prototype.setFormationMode = function (formationMode) {
        this._formationMode = formationMode;
    };

    Window_MenuStatusPlus.prototype.pendingIndex = function () {
        return this._pendingIndex;
    };

    Window_MenuStatusPlus.prototype.setPendingIndex = function (index) {
        var lastPendingIndex = this._pendingIndex;
        this._pendingIndex = index;
        this.redrawItem(this._pendingIndex);
        this.redrawItem(lastPendingIndex);
    };


    Scene_Menu.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createMenuBG();
        this.createCommandBg();
        this.createCommandWindow();
        this.createGoldWindow();
        this.createTipsWindow();
        this.createStatusWindow();
    };

    AlongWiththeWind.MenuPlus._Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function () {
        AlongWiththeWind.MenuPlus._Scene_Menu_start.call(this);
        this._waitCheck = true;
        this._waitOut = false;
        this._waitCall = false;
        this._waitOpacity = 0;
    };

    AlongWiththeWind.MenuPlus._Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        AlongWiththeWind.MenuPlus._Scene_Menu_createCommandWindow.call(this);
        this._commandBg.addChild(this._commandWindow);
    };

    Scene_Menu.prototype.createGoldWindow = function () {
        this._goldWindow = new Window_GoldBg(0, 0);
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this._goldWindow.opacity = 0;
        this._goldWindow.contentsOpacity = 0;
        this.addChild(this._goldWindow);
    };

    Scene_Menu.prototype.createMenuBG = function () {
        this._menuBg = new Sprite();

        this._menuBg.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        this._menuBg.bitmap.fillAll('black')
        this._menuBg.opacity = 0;

        this.addChild(this._menuBg);

    };

    Scene_Menu.prototype.createCommandBg = function () {
        this._commandBg = new Sprite();

        this._commandBg.bitmap = new Bitmap(274, 624);
        this._commandBg.bitmap = ImageManager.loadSystem('menulist_bg');
        this._commandBg.x = -274;
        this._commandBg.y = 0;
        this.addChild(this._commandBg);

    };

    Scene_Menu.prototype.createStatusWindow = function () {
        this._statusWindow = new Window_MenuStatusPlus(this._commandWindow.width, 0);
        this._statusWindow.reserveFaceImages();
        this._statusWindow.opacity = 0;
        this._statusWindow.contentsOpacity = 0;
        this._statusWindow.x = this._commandWindow.width + 35;
        this.addChild(this._statusWindow);
    };

    Scene_Menu.prototype.createTipsWindow = function () {
        this._tipsWindow = new Window_MenuTipsBg(0, 0);
        this._tipsWindow.x = 240;
        this._tipsWindow.y = Graphics.boxHeight - this._tipsWindow.height;
        this._tipsWindow.opacity = 0;
        this._tipsWindow.contentsOpacity = 0;
        this.addChild(this._tipsWindow);
    };

    Scene_Menu.prototype.popScene = function () {
        this._waitOut = true;
    };

    Scene_Menu.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
        if (this._waitCheck == true) {
            if (this._commandBg.x + 15 >= 0) {
                this._commandWindow.activate();
                this._waitCheck = false;
            } else {
                this._commandBg.x += 15;
                this._menuBg.opacity += 6;

                this._statusWindow.contentsOpacity += 15;
                this._goldWindow.contentsOpacity += 15;
                this._tipsWindow.contentsOpacity += 15;
                this._waitOpacity += 15;
                this._goldWindow.bgOpacity(this._waitOpacity);
                this._tipsWindow.bgOpacity(this._waitOpacity);
            }
        }
        if (this._waitOut == true) {
            if (this._commandBg.x - 15 <= -274) {
                this._commandWindow.deactivate();
                SceneManager.pop();
                this._waitOut = false;
            } else {
                this._commandBg.x -= 15;
                this._menuBg.opacity -= 6;
                this._statusWindow.contentsOpacity -= 15;
                this._goldWindow.contentsOpacity -= 15;
                this._tipsWindow.contentsOpacity -= 15;
                this._waitOpacity -= 15;
                this._goldWindow.bgOpacity(this._waitOpacity);
                this._tipsWindow.bgOpacity(this._waitOpacity);
            }
        }
        if (this._waitCall != false) {
            if (this._commandBg.x - 15 <= -274) {
                this._commandWindow.deactivate();
                this.callSceneSp();

            } else {
                this._commandBg.x -= 15;
                this._menuBg.opacity -= 6;
                this._statusWindow.contentsOpacity -= 15;
                this._goldWindow.contentsOpacity -= 15;
                this._tipsWindow.contentsOpacity -= 15;
                this._waitOpacity -= 15;
                this._goldWindow.bgOpacity(this._waitOpacity);
                this._tipsWindow.bgOpacity(this._waitOpacity);
            }
        }

    };

})();