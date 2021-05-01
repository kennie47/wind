//=============================================================================
// NekoGakuen_ItemMenuPlus.js
// Version: 1.1
//=============================================================================
/*:
 * @plugindesc 道具選單強化
 * @author Mirai
 * @help
 * 
 * ─ 插件簡介 ─
 * 在RPG Maker MV/MZ中將原本的道具選單功能強化。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.1 修正自訂分類的道具顯示問題
 * V1.0.1 更新插件使用條款
 * V1.0 初次版本的插件發佈
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV/MZ的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 
 * 
 * ─ 註釋指令 ─
 * 
 * 【指定道具分類】
 * --說明：指定該道具的分類項目，XXX為你所設定的「分類名稱」。
 * --註釋指令 <分類:XXX>
 * --使用範圍 資料庫-道具、武器、盔甲(防具)。
 * 
 * 【指定道具重量】
 * --說明：指定該道具的重量，XXX為你所設定的「重量」數值。
 * --註釋指令 <重量:XXX>
 * --使用範圍 資料庫-道具、武器、盔甲(防具)。
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
 * @param Term_Setting
 * @text 用語設定
 * 
 * @param Used_Text
 * @text 「使用」用語文字
 * @desc 指定在道具畫面「使用」的選項名稱。
 * @parent Term_Setting
 * @type string
 * @default 使用
 * 
 * @param Discard_Text
 * @text 「丟棄」用語文字
 * @desc 指定在道具畫面「丟棄」的選項名稱。
 * @parent Term_Setting
 * @type string
 * @default 丟棄
 * 
 * @param Cancel_Text
 * @text 「取消」用語文字
 * @desc 指定在道具畫面「取消」的選項名稱。
 * @parent Term_Setting
 * @type string
 * @default 取消
 * 
 * 
 * @param Category_List
 * @text 道具分類列表...
 * @desc 設定道具分類的列表。
 * @type struct<ItemCategory>[]
 * @default ["{\"Category_Name\":\"道具\"}","{\"Category_Name\":\"武器\"}","{\"Category_Name\":\"盔甲\"}","{\"Category_Name\":\"關鍵道具\"}"]
 * 
 * 
 */
/*~struct~ItemCategory:
 * 
 * @param Category_Name
 * @text 分類名稱
 * @desc 自訂道具選單的分類項目。
 * @type combo
 * @option 道具
 * @option 武器
 * @option 盔甲
 * @option 關鍵道具
 * @default 道具
 * 
 */
//=============================================================================
'use strict';

(function () {

    let NekoGakuen = {};
    var pluginName = "NekoGakuen_ItemMenuPlus";
    NekoGakuen.ItemMenuPlus = {};
    NekoGakuen.ItemMenuPlus.Parameters = PluginManager.parameters(pluginName);
    NekoGakuen.ItemMenuPlus.HeavyValue = Number(NekoGakuen.ItemMenuPlus.Parameters['Heavy_Value'] || 0);
    NekoGakuen.ItemMenuPlus.HeavyMaxValue = Number(NekoGakuen.ItemMenuPlus.Parameters['Heavy_MaxValue'] || 100);
    NekoGakuen.ItemMenuPlus.HeavyTipBoolean = String(NekoGakuen.ItemMenuPlus.Parameters['HeavyTip_Boolean'] || 'false');
    NekoGakuen.ItemMenuPlus.UsedText = String(NekoGakuen.ItemMenuPlus.Parameters['Used_Text'] || '使用');
    NekoGakuen.ItemMenuPlus.DiscardText = String(NekoGakuen.ItemMenuPlus.Parameters['Discard_Text'] || '丟棄');
    NekoGakuen.ItemMenuPlus.CancelText = String(NekoGakuen.ItemMenuPlus.Parameters['Cancel_Text'] || '取消');
    NekoGakuen.ItemMenuPlus.HeavyText = String(NekoGakuen.ItemMenuPlus.Parameters['Heavy_Text'] || '重量');
    NekoGakuen.ItemMenuPlus.HeavyTipText = String(NekoGakuen.ItemMenuPlus.Parameters['HeavyTip_Text'] || '超過重量上限');

    var args_Category_List = JSON.parse(NekoGakuen.ItemMenuPlus.Parameters['Category_List']);
    var args_Category_Name = Array();
    let args_Category;
    for (let i = 0; i < args_Category_List.length; i++) {
        args_Category = JSON.parse(args_Category_List[i]);
        args_Category_Name.push(String(args_Category["Category_Name"]));
    }




    function Window_ItemAction() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemAction.prototype = Object.create(Window_Command.prototype);
    Window_ItemAction.prototype.constructor = Window_ItemAction;

    Window_ItemAction.prototype.initialize = function (x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
        this._actionIndex = false;
        this.hide();
    };

    Window_ItemAction.prototype.windowWidth = function () {
        return 240;
    };

    Window_ItemAction.prototype.update = function () {
        Window_Command.prototype.update.call(this);
        this.refresh();
    };

    Window_ItemAction.prototype.refresh = function () {
        this._actionIndex = $gameParty.canUse($gameParty.lastItem());
        Window_Command.prototype.refresh.call(this);
    };

    Window_ItemAction.prototype.makeCommandList = function () {
        this.addCommand(NekoGakuen.ItemMenuPlus.UsedText, "used", this._actionIndex);
        this.addCommand(NekoGakuen.ItemMenuPlus.DiscardText, "discard");
        this.addCommand(NekoGakuen.ItemMenuPlus.CancelText, "cancelSe");
    };

    Window_ItemAction.prototype.updateBackOpacity = function () {
        this.backOpacity = 255;
    };


    function Window_DiscardNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_DiscardNumber.prototype = Object.create(Window_Selectable.prototype);
    Window_DiscardNumber.prototype.constructor = Window_DiscardNumber;

    Window_DiscardNumber.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._max = 1;
        this._number = 1;

        this.createButtons();
    };

    Window_DiscardNumber.prototype.windowWidth = function () {
        return 450;
    };

    Window_DiscardNumber.prototype.windowHeight = function () {
        return this.fittingHeight(4);
    };

    Window_DiscardNumber.prototype.number = function () {
        return this._number;
    };

    Window_DiscardNumber.prototype.updateBackOpacity = function () {
        this.backOpacity = 255;
    };

    Window_DiscardNumber.prototype.setup = function (item, max) {
        this._item = item;
        this._max = Math.floor(max);
        this._number = 1;
        this.placeButtons();
        this.showButtons();
        this.refresh();
    };

    Window_DiscardNumber.prototype.createButtons = function () {
        var bitmap = ImageManager.loadSystem('ButtonSet');
        var buttonWidth = 48;
        var buttonHeight = 48;
        this._buttons = [];
        for (var i = 0; i < 5; i++) {
            var button = new Sprite_Button();
            var x = buttonWidth * i;
            var w = buttonWidth * (i === 4 ? 2 : 1);
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, w, buttonHeight);
            button.setHotFrame(x, buttonHeight, w, buttonHeight);
            button.visible = false;
            this._buttons.push(button);
            this.addChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
        this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
        this._buttons[4].setClickHandler(this.onButtonOk.bind(this));

    };

    Window_DiscardNumber.prototype.placeButtons = function () {
        var numButtons = this._buttons.length;
        var spacing = 16;
        var totalWidth = -spacing;
        for (var i = 0; i < numButtons; i++) {
            totalWidth += this._buttons[i].width + spacing;
        }
        var x = (this.width - totalWidth) / 2;
        for (var j = 0; j < numButtons; j++) {
            var button = this._buttons[j];
            button.x = x;
            button.y = this.buttonY();
            x += button.width + spacing;
        }
    };

    Window_DiscardNumber.prototype.showButtons = function () {
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].visible = true;
        }
    };

    Window_DiscardNumber.prototype.refresh = function () {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        this.drawHorzLine();
    };

    Window_DiscardNumber.prototype.drawMultiplicationSign = function () {
        var sign = '\u00d7';
        var width = this.textWidth(sign);
        var x = this.cursorX() - width * 2;
        var y = this.itemY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    };

    Window_DiscardNumber.prototype.drawNumber = function () {
        var x = this.cursorX();
        var y = this.itemY();
        var width = this.cursorWidth() - this.textPadding();
        this.resetTextColor();
        this.drawText(this._number, x, y, width, 'right');
    };

    Window_DiscardNumber.prototype.drawHorzLine = function () {
        var lineY = this.itemY() + (this.lineHeight() * 2);
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
        this.contents.paintOpacity = 255;
    };

    Window_DiscardNumber.prototype.itemY = function () {
        return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5);
    };

    Window_DiscardNumber.prototype.totalPriceY = function () {
        return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
    };

    Window_DiscardNumber.prototype.buttonY = function () {
        return Math.round(this.totalPriceY() + this.lineHeight() - 5);
    };

    Window_DiscardNumber.prototype.cursorWidth = function () {
        var digitWidth = this.textWidth('0');
        return this.maxDigits() * digitWidth + this.textPadding();
    };

    Window_DiscardNumber.prototype.cursorX = function () {
        return this.contentsWidth() - this.cursorWidth() - this.textPadding() * 2;
    };

    Window_DiscardNumber.prototype.maxDigits = function () {
        return 2;
    };

    Window_DiscardNumber.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        this.processNumberChange();
    };

    Window_DiscardNumber.prototype.isOkTriggered = function () {
        return Input.isTriggered('ok');
    };

    Window_DiscardNumber.prototype.playOkSound = function () {
        //
    };

    Window_DiscardNumber.prototype.processNumberChange = function () {
        if (this.isOpenAndActive()) {
            if (Input.isRepeated("right")) {
                this.changeNumber(1);
            }
            if (Input.isRepeated("left")) {
                this.changeNumber(-1);
            }
            if (Input.isRepeated("up")) {
                this.changeNumber(10);
            }
            if (Input.isRepeated("down")) {
                this.changeNumber(-10);
            }
        }
    };

    Window_DiscardNumber.prototype.changeNumber = function (amount) {
        var lastNumber = this._number;
        this._number = (this._number + amount).clamp(1, this._max);
        if (this._number !== lastNumber) {
            SoundManager.playCursor();
            this.refresh();
        }
    };

    Window_DiscardNumber.prototype.updateCursor = function () {
        this.setCursorRect(this.cursorX(), this.itemY(),
            this.cursorWidth(), this.lineHeight());
    };

    Window_DiscardNumber.prototype.onButtonUp = function () {
        this.changeNumber(1);
    };

    Window_DiscardNumber.prototype.onButtonUp2 = function () {
        this.changeNumber(10);
    };

    Window_DiscardNumber.prototype.onButtonDown = function () {
        this.changeNumber(-1);
    };

    Window_DiscardNumber.prototype.onButtonDown2 = function () {
        this.changeNumber(-10);
    };

    Window_DiscardNumber.prototype.onButtonOk = function () {
        this.processOk();
    };


    Window_ItemList.prototype.isCurrentItemEnabled = function () {
        return this.isActionEnabled(this.item());
    };

    Window_ItemList.prototype.isActionEnabled = function (item) {
        return this.includes(item) ? true : false;
    };

    Window_ItemList.prototype.includes = function (item) {

        for (let i = 0; i < args_Category_Name.length; i++) {
            if (this._category == args_Category_Name[i]) {
                return item && item.meta["分類"] == args_Category_Name[i];
            }
        }

        if (this._category == "item") {
            return DataManager.isItem(item) && item.itypeId === 1 && !item.meta["分類"];
        }
        if (this._category == "weapon") {
            return DataManager.isWeapon(item) && !item.meta["分類"];
        }
        if (this._category == "armor") {
            return DataManager.isArmor(item);
        }
        if (this._category == "keyItem") {
            return DataManager.isItem(item) && item.itypeId === 2 && !item.meta["分類"];
        }
    };

    Window_ItemList.prototype.drawItem = function (index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawBackground(rect.x, rect.y, rect.width, this.lineHeight());
            this.drawItemName(item, rect.x, rect.y, rect.width);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_ItemList.prototype.spacing = function () {
        return 6;
    };

    Window_ItemList.prototype.drawBackground = function (x, y, width, height) {
        this.contents.fillRect(x, y + 1, width + 6, height - 1, 'rgba(0, 0, 0, 0.25)');
    };



    function Window_ItemPlusCategory() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemPlusCategory.prototype = Object.create(Window_Command.prototype);
    Window_ItemPlusCategory.prototype.constructor = Window_ItemPlusCategory;

    Window_ItemPlusCategory.prototype.initialize = function (x, y) {
        Window_Command.prototype.initialize.call(this, x, y);

    };


    Window_ItemCategory.prototype.maxCols = function () {
        return args_Category_Name.length;
    };

    Window_ItemPlusCategory.prototype.update = function () {
        Window_Command.prototype.update.call(this);
        if (this._itemWindow) {
            this._itemWindow.setCategory(this.currentSymbol());
        }
    };

    Window_ItemPlusCategory.prototype.makeCommandList = function () {

        var itemTypes = args_Category_Name;
        itemTypes.forEach(function (itemTypesName) {

            if (itemTypesName == "道具") {
                this.addCommand(TextManager.item, "item");
            } else if (itemTypesName == "武器") {
                this.addCommand(TextManager.weapon, "weapon");
            } else if (itemTypesName == "盔甲") {
                this.addCommand(TextManager.armor, "armor");
            } else if (itemTypesName == "關鍵道具") {
                this.addCommand(TextManager.keyItem, "keyItem");
            } else {
                this.addCommand(itemTypesName, itemTypesName);
            }

        }, this);
    };

    Window_ItemPlusCategory.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawBackground(rect.x, rect.y, rect.width, this.lineHeight());
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);

    };

    Window_ItemPlusCategory.prototype.drawBackground = function (x, y, width, height) {
        this.contents.fillRect(x - 6, y + 1, width + 6, height - 1, 'rgba(0, 0, 0, 0.25)');
    };

    Window_ItemPlusCategory.prototype.setItemWindow = function (itemWindow) {
        this._itemWindow = itemWindow;
    };




    function Window_ItemBgTip() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemBgTip.prototype = Object.create(Window_Base.prototype);
    Window_ItemBgTip.prototype.constructor = Window_ItemBgTip;

    Window_ItemBgTip.prototype.initialize = function () {
        var wight = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, (Graphics.boxWidth / 2) - (wight / 2), 50, wight, height);
        this.opacity = 0;
        this.contentsOpacity = 0;
        this._showCount = 0;
        this.refresh();
    };

    Window_ItemBgTip.prototype.windowWidth = function () {
        return 360;
    };

    Window_ItemBgTip.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };

    Window_ItemBgTip.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (this._showCount > 0) {
            this.updateFadeIn();
            this._showCount--;
        } else {
            this.updateFadeOut();
        }
    };

    Window_ItemBgTip.prototype.updateFadeIn = function () {
        this.contentsOpacity += 16;
    };

    Window_ItemBgTip.prototype.updateFadeOut = function () {
        this.contentsOpacity -= 16;
    };

    Window_ItemBgTip.prototype.open = function () {
        this.refresh();
        this._showCount = 150;
    };

    Window_ItemBgTip.prototype.close = function () {
        this._showCount = 0;
    };

    Window_ItemBgTip.prototype.refresh = function () {
        this.contents.clear();
        var width = this.contentsWidth();
        this.drawBackground(0, 0, width, this.lineHeight());
        this.drawText(NekoGakuen.ItemMenuPlus.HeavyTipText, 0, 0, width, "center");
    };

    Window_ItemBgTip.prototype.drawBackground = function (x, y, width, height) {
        var color1 = this.dimColor1();
        var color2 = this.dimColor2();
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
    };


    function Window_ItemBg() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemBg.prototype = Object.create(Window_Base.prototype);
    Window_ItemBg.prototype.constructor = Window_ItemBg;

    Window_ItemBg.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.createBackground();
        this.drawItemTitle();
        this.refresh();
    };

    Window_ItemBg.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_ItemBg.prototype.windowHeight = function () {
        return Graphics.boxHeight;
    };

    Window_ItemBg.prototype.refresh = function () {
        var x = this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        this.drawItemTitle();
    };

    Window_ItemBg.prototype.createBackground = function () {
        this._achiBackground = new Sprite();
        this._achiBackground.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        this._achiBackground.bitmap = ImageManager.loadSystem('menuitem_bg');
        this._achiBackground.x = 0;
        this._achiBackground.y = 0;
        this.addChildToBack(this._achiBackground);
    };


    Window_ItemBg.prototype.drawItemTitle = function () {
        this.contents.fontSize = 48;
        this.changeTextColor(this.normalColor());
        this.drawText(TextManager.item, 5, 2);
    };

    Scene_ItemBase.prototype.showActionWindow = function () {
        this._actionWindow.show();
        this._actionWindow.activate();
        this._actionWindow.select(0);
    };

    Scene_ItemBase.prototype.hideActionWindow = function () {
        this._actionWindow.hide();
        this._actionWindow.deactivate();
    };

    Scene_ItemBase.prototype.onActorCancel = function () {
        this.hideSubWindow(this._actorWindow);
        this.activateItemWindow();
        this.hideActionWindow();
    };

    Scene_ItemBase.prototype.showSubWindow = function (window) {
        window.x = Graphics.boxWidth - window.width;
        window.show();
        window.activate();
    };

    Scene_ItemBase.prototype.determineItem = function () {
        var action = new Game_Action(this.user());
        var item = this.item();
        action.setItemObject(item);
        if (action.isForFriend()) {
            this.showSubWindow(this._actorWindow);
            this._actorWindow.selectForItem(this.item());
        } else {
            this.useItem();
            this.activateItemWindow();
        }
        this.hideActionWindow();
    };

    Scene_ItemBase.prototype.onActionDiscard = function () {
        this.hideActionWindow();
        var num = $gameParty.numItems(this.item());
        this._discardWindow.setup(this.item(), num);
        this._discardWindow.show();
        this._discardWindow.activate();
    };

    Scene_ItemBase.prototype.onActionCancel = function () {
        this.hideActionWindow();
        this.activateItemWindow();
    };

    Scene_ItemBase.prototype.createActionWindow = function () {
        this._actionWindow = new Window_ItemAction(0, 0);
        this._actionWindow.x = (Graphics.boxWidth / 2) - (this._actionWindow.width / 2);
        this._actionWindow.y = (Graphics.boxHeight / 2) - (this._actionWindow.height / 2);
        this._actionWindow.setHandler("used", this.determineItem.bind(this));
        this._actionWindow.index(this._itemWindow.index());
        this._actionWindow.setHandler("discard", this.onActionDiscard.bind(this));
        this._actionWindow.setHandler("cancelSe", this.onActionCancel.bind(this));
        this._actionWindow.setHandler("cancel", this.onActionCancel.bind(this));
        this.addChild(this._actionWindow);
    };

    Scene_ItemBase.prototype.createActorWindow = function () {
        this._actorWindow = new Window_MenuActor();
        this._actorWindow.setHandler('ok', this.onActorOk.bind(this));
        this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
        this.addChild(this._actorWindow);
    };


    Scene_ItemBase.prototype.createDiscardWindow = function () {
        this._discardWindow = new Window_DiscardNumber(0, 0);
        this._discardWindow.x = (Graphics.boxWidth / 2) - (this._discardWindow.width / 2);
        this._discardWindow.y = (Graphics.boxHeight / 2) - (this._discardWindow.height / 2);
        this._discardWindow.hide();
        this._discardWindow.setHandler("ok", this.onDiscardOk.bind(this));
        this._discardWindow.setHandler("cancel", this.onDiscardCancel.bind(this));
        this.addChild(this._discardWindow);
    };

    Scene_ItemBase.prototype.onDiscardOk = function () {
        $gameParty.loseItem(this.item(), this._discardWindow.number());
        SoundManager.playShop();
        this._discardWindow.hide();
        this._discardWindow.deactivate();
        this.activateItemWindow();
    };

    Scene_ItemBase.prototype.onDiscardCancel = function () {
        this._discardWindow.hide();
        this._discardWindow.deactivate();
        this.activateItemWindow();
    };

    Scene_Menu.prototype.commandItem = function () {
        this._waitCall = "Item";
    };


    NekoGakuen.ItemMenuPlus._Scene_Menu_callSceneSp = Scene_Menu.prototype.callSceneSp;
    Scene_Menu.prototype.callSceneSp = function () {
        NekoGakuen.ItemMenuPlus._Scene_Menu_callSceneSp.call(this);
        console.log(this._waitCall)
        if (this._waitCall == "Item") {
            SceneManager.push(Scene_ItemPlus);
            this._waitCall = false;
        }

    };

    function Scene_ItemPlus() {
        this.initialize.apply(this, arguments);
    }

    Scene_ItemPlus.prototype = Object.create(Scene_Item.prototype);
    Scene_ItemPlus.prototype.constructor = Scene_ItemPlus;

    Scene_ItemPlus.prototype.initialize = function () {
        Scene_Item.prototype.initialize.call(this);
    };

    Scene_ItemPlus.prototype.create = function () {
        Scene_ItemBase.prototype.create.call(this);
        this.createItemBgWindow();
        this.createHelpWindow();
        this.createCategoryWindow();
        this.createItemWindow();
        this.createActorWindow();
        this.createActionWindow();
        this.createDiscardWindow();
    };

    Scene_ItemPlus.prototype.createHelpWindow = function () {
        this._helpWindow = new Window_Help();
        this._helpWindow.opacity = 0;
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;
        this.addChild(this._helpWindow);
    };

    Scene_ItemPlus.prototype.createCategoryWindow = function () {
        this._categoryWindow = new Window_ItemPlusCategory();
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._categoryWindow.opacity = 0;
        this._categoryWindow.y = 70;
        this._categoryWindow.width = 225;
        this._categoryWindow.height = Graphics.boxHeight - this._categoryWindow.y - this._helpWindow.height;
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
        this.addChild(this._categoryWindow);
    };

    Scene_ItemPlus.prototype.createItemWindow = function () {
        var wx = this._categoryWindow.width + 50;
        var wy = 70;
        var ww = Graphics.boxWidth - this._categoryWindow.width - 50;
        var wh = Graphics.boxHeight - wy - this._helpWindow.height;
        this._itemWindow = new Window_ItemList(wx, wy, ww, wh);
        this._itemWindow.opacity = 0;
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this.addChild(this._itemWindow);
        this._categoryWindow.setItemWindow(this._itemWindow);
    };

    Scene_ItemPlus.prototype.createItemBgWindow = function () {
        this._itemBgWindow = new Window_ItemBg(0, 0);
        this._itemBgWindow.opacity = 0;
        this.addWindow(this._itemBgWindow);
    };

    Scene_ItemPlus.prototype.onCategoryOk = function () {
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    Scene_ItemPlus.prototype.onItemOk = function () {
        $gameParty.setLastItem(this.item());
        this.showActionWindow();
    };

    Scene_ItemPlus.prototype.onItemCancel = function () {
        this._itemWindow.deselect();
        this._categoryWindow.activate();
    };

    Scene_ItemPlus.prototype.playSeForItem = function () {
        SoundManager.playUseItem();
    };

    Scene_ItemPlus.prototype.useItem = function () {
        Scene_ItemBase.prototype.useItem.call(this);
        this._itemWindow.redrawCurrentItem();
    };



})();