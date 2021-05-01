//=============================================================================
// AlongWiththeWind_ItemSort.js
// Version: 1.0
//=============================================================================
/*:
 * @plugindesc 自訂道具順序
 * @author Mirai
 * @help
 * 
 * ─ 插件簡介 ─
 * 這是設計給「與風同行」兩位遊戲作者使用的自訂道具順序插件。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.0 初次版本的插件發佈
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 2.在RPG Maker MV的「資料庫」之中，
 *   在「道具」頁面裡指定該道具並在「註釋」欄位輸入即可。
 * 
 * 
 * ─ 註釋指令 ─
 * 
 * 【指定自訂道具順序的數字】
 * --說明：指定該道具想要排序的數字，X為數字。
 * --註釋指令 <ItemSort:X>
 * --使用範圍 資料庫(道具)
 * 
 * 
 * 
 */
(function () {
    Window_ItemList.prototype.makeItemList = function () {
        var allItems = $gameParty.allItems();
        for (var k = 0; k < allItems.length; k++) {
            var item = allItems[k];
            if (item.meta.ItemSort) {
                allItems.splice(k, 1);
                allItems.splice(Number(item.meta.ItemSort) - 1, 0, item);
            }
        }
        this._data = allItems.filter(function (item) {
            return this.includes(item);
        }, this);
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

})();