//=============================================================================
// MULI_Tetris.js
//=============================================================================

/*:
 * @plugindesc 俄羅斯方塊
 * @author moonyoulove
 *
 * @help
 * 俄羅斯方塊版權歸俄羅斯方塊公司所有，所以本插件不得用於商業用途
 * 
 * 使用方法:
 * 1.建立一個地圖，note裡設置<Tetris>
 * 2.建立一個事件來開始俄羅斯方塊
 *     條件:無
 *     觸發器:操作按鈕
 *     內容:
 *       ◆插件命令：Tetris Create 2 0 9 13
 *       ◆插件命令：Tetris Show Next          // 可選
 *       ◆插件命令：Tetris Show Status        // 可選
 *       ◆控制開關：#0001 方塊開始 = ON        // 開始俄羅斯方塊
 * 3.建立一個並行處理或自動執行事件來運行俄羅斯方塊，必須再創建方塊後執行，
 * 所以出現條件可為方塊開始開關ON
 *     條件:開關 #0001 方塊開始
 *     觸發器:自動執行
 *     內容:
 *       ◆插件命令：Tetris Update             // 循環
 * 4.建立一個事件來改變遊戲難度，比如獲取當前分數，當大於多少時設置速度為多少，
 * 最大值理論為6(最快速度)
 * 5.遊戲失敗後會自動將遊戲失敗開關設為ON，此時可以執行事件來清空方塊的指令
 *     條件:開關 #0002 遊戲結束
 *     觸發器:自動執行
 *     內容:
 *       ◆插件命令：Tetris Clear
 *       ◆控制開關：#0001 方塊開始 = OFF
 *       ◆控制開關：#0002 遊戲結束 = OFF
 * 6.離開地圖方塊會自動消失
 * 
 * 插件命令:
 * Tetris Create x y width height // 創建俄羅斯方塊，設定整個版面的位置
 * Tetris Update // 運行俄羅斯方塊必要循環更新
 * Tetris SetSpeed speed // 設置俄羅斯方塊下落速度(等同難度)
 * Tetris SetScore score // 設置目前遊玩中的俄羅斯方塊的分數
 * Tetris Show Next // 顯示下一個俄羅斯方塊視窗
 * Tetris Hide Next // 隱藏下一個俄羅斯方塊視窗
 * Tetris Show Status // 顯示難度等級和分數視窗
 * Tetris Hide Status // 隱藏難度等級和分數視窗
 * Tetris Clear // 清空方塊
 * Tetris SetTime // 設定新方塊生成時間
 * 
 * 標籤:
 * <Tetris> // 放在地圖的標籤框裡，表示預定該地圖可以玩俄羅斯方塊
 * 
 * @param gameOverSwitchId
 * @text 遊戲結束開關
 * @type switch
 * 
 * @param scoreVariableId
 * @text 分數變量
 * @desc 唯讀
 * @type variable
 * 
 * @param speedVariableId
 * @text 速度變量
 * @desc 唯讀
 * @type variable
 * 
 * @param eliminateAnimationId
 * @text 方塊消除動畫
 * @type animation
 * @require 1
 * 
 * @param freezeAnimationId
 * @text 方塊凍結動畫
 * @type animation
 * @require 1
 * 
 * @param spawnTime
 * @text 預設新方塊生成時間
 * @default 50
 * @type number
 * 
 * @param scoreFormula
 * @text 分數公式
 * @desc 有兩個參數line(幾行連成線)和dash(加速落下的時間佔比)，背後是js eval返回計算結果，this是Game_Tetris
 * @default line + 4 * dash 
 * @type text
 *
 * @param images
 * @text 方塊圖片
 * @default {"I":"{\"name\":\"!Chest\",\"index\":\"0\",\"fix\":\"true\",\"walk\":\"false\"}","J":"{\"name\":\"!Chest\",\"index\":\"1\",\"fix\":\"true\",\"walk\":\"false\"}","L":"{\"name\":\"!Chest\",\"index\":\"2\",\"fix\":\"true\",\"walk\":\"false\"}","O":"{\"name\":\"!Chest\",\"index\":\"3\",\"fix\":\"true\",\"walk\":\"false\"}","S":"{\"name\":\"!Chest\",\"index\":\"4\",\"fix\":\"true\",\"walk\":\"false\"}","T":"{\"name\":\"!Chest\",\"index\":\"5\",\"fix\":\"true\",\"walk\":\"false\"}","Z":"{\"name\":\"!Chest\",\"index\":\"6\",\"fix\":\"true\",\"walk\":\"false\"}"}
 * @type struct<Images>
 * 
 * @param statusWindow
 * @text 方塊得分難度狀態視窗
 * 
 * @param statusWindowX
 * @parent statusWindow
 * @text x
 * @default 528
 * @type number
 * 
 * @param statusWindowY
 * @parent statusWindow
 * @text y
 * @default 0
 * @type number
 * 
 * @param statusWindowWidth
 * @parent statusWindow
 * @text 寬度
 * @default 288
 * @type number
 * 
 * @param statusWindowHeight
 * @parent statusWindow
 * @text 高度
 * @default 72
 * @type number
 * 
 * @param nextWindow
 * @text 下一個方塊預覽視窗
 * 
 * @param nextWindowX
 * @parent nextWindow
 * @text x
 * @default 528
 * @type number
 * 
 * @param nextWindowY
 * @parent nextWindow
 * @text y
 * @default 72
 * @type number
 * 
 * @param nextWindowWidth
 * @parent nextWindow
 * @text 寬度
 * @default 288
 * @type number
 * 
 * @param nextWindowHeight
 * @parent nextWindow
 * @text 高度
 * @default 120
 * @type number
 */

/*~struct~Images:
 * @param I
 * @type struct<Image>
 *
 * @param J
 * @type struct<Image>
 * 
 * @param L
 * @type struct<Image>
 * 
 * @param O
 * @type struct<Image>
 * 
 * @param S
 * @type struct<Image>
 * 
 * @param T
 * @type struct<Image>
 * 
 * @param Z
 * @type struct<Image>
 */

/*~struct~Image:
 * @param name
 * @text 行走圖名稱
 * @type file
 * @dir img/characters
 * @require 1
 *
 * @param index
 * @text 行走圖索引編號
 * @type number
 * @min 0
 * @max 7
 * 
 * @param fix
 * @text 鎖定行走圖朝向
 * @default true
 * @type boolean
 * 
 * @param walk
 * @text 行走動畫
 * @default false
 * @type boolean
 */

function Tetris() {
    throw new Error('This is a static class');
}

Tetris.parameters = PluginManager.parameters("MULI_Tetris");
Tetris.gameOverSwitchId = Number(Tetris.parameters.gameOverSwitchId);
Tetris.scoreVariableId = Number(Tetris.parameters.scoreVariableId);
Tetris.speedVariableId = Number(Tetris.parameters.speedVariableId);
Tetris.eliminateAnimationId = Number(Tetris.parameters.eliminateAnimationId);
Tetris.freezeAnimationId = Number(Tetris.parameters.freezeAnimationId);
Tetris.spawnTime = Number(Tetris.parameters.spawnTime);
Tetris.scoreFormula = Tetris.parameters.scoreFormula;
Tetris.images = (function() {
    var images = JSON.parse(Tetris.parameters.images || "{}");
    for (var shape in images) {
        var image = JSON.parse(images[shape] || "{}");
        images[shape] = {
            name: image.name,
            index: Number(image.index),
            fix: image.fix !== "false",
            walk: image.walk === "true"
        };
    }
    return images;
})();
Tetris.statusWindowX = Number(Tetris.parameters.statusWindowX);
Tetris.statusWindowY = Number(Tetris.parameters.statusWindowY);
Tetris.statusWindowWidth = Number(Tetris.parameters.statusWindowWidth);
Tetris.statusWindowHeight = Number(Tetris.parameters.statusWindowHeight);
Tetris.nextWindowX = Number(Tetris.parameters.nextWindowX);
Tetris.nextWindowY = Number(Tetris.parameters.nextWindowY);
Tetris.nextWindowWidth = Number(Tetris.parameters.nextWindowWidth);
Tetris.nextWindowHeight = Number(Tetris.parameters.nextWindowHeight);
Tetris.hasPlugin = {
    // "SomePlugin": PluginManager._scripts.includes("SomePlugin")
};
Tetris.calculateScore = new Function("line", "dash", `return ${Tetris.scoreFormula};`);
Tetris.shape = {
    "I": {
        "image": Tetris.images.I,
        "initial": [
            [0, 3],
            [1, 3],
            [2, 3],
            [3, 3]
        ],
        "transform": [
            [
                [1, -3],
                [0, -2],
                [-1, -1],
                [-2, 0]
            ],
            [
                [2, 3],
                [1, 2],
                [0, 1],
                [-1, 0]
            ],
            [
                [-2, 0],
                [-1, -1],
                [0, -2],
                [1, -3]
            ],
            [
                [-1, 0],
                [0, 1],
                [1, 2],
                [2, 3]
            ]
        ],
        "sideLength": 4
    },
    "J": {
        "image": Tetris.images.J,
        "initial": [
            [0, 1],
            [0, 2],
            [1, 2],
            [2, 2]
        ],
        "transform": [
            [
                [2, -1],
                [1, -2],
                [0, -1],
                [-1, 0]
            ],
            [
                [0, 2],
                [1, 1],
                [0, 0],
                [-1, -1]
            ],
            [
                [-2, 0],
                [-1, 1],
                [0, 0],
                [1, -1]
            ],
            [
                [0, -1],
                [-1, 0],
                [0, 1],
                [1, 2]
            ]
        ],
        "sideLength": 3
    },
    "L": {
        "image": Tetris.images.L,
        "initial": [
            [2, 1],
            [0, 2],
            [1, 2],
            [2, 2]
        ],
        "transform": [
            [
                [0, 1],
                [1, -2],
                [0, -1],
                [-1, 0]
            ],
            [
                [-2, 0],
                [1, 1],
                [0, 0],
                [-1, -1]
            ],
            [
                [0, -2],
                [-1, 1],
                [0, 0],
                [1, -1]
            ],
            [
                [2, 1],
                [-1, 0],
                [0, 1],
                [1, 2]
            ]
        ],
        "sideLength": 3
    },
    "O": {
        "image": Tetris.images.O,
        "initial": [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ],
        "transform": [
            [
                [1, 0],
                [0, 1],
                [0, -1],
                [-1, 0]
            ],
            [
                [0, 1],
                [-1, 0],
                [1, 0],
                [0, -1]
            ],
            [
                [-1, 0],
                [0, -1],
                [0, 1],
                [1, 0]
            ],
            [
                [0, -1],
                [1, 0],
                [-1, 0],
                [0, 1]
            ]
        ],
        "sideLength": 2
    },
    "S": {
        "image": Tetris.images.S,
        "initial": [
            [1, 1],
            [2, 1],
            [0, 2],
            [1, 2]
        ],
        "transform": [
            [
                [0, 0],
                [-1, 1],
                [0, -2],
                [-1, -1]
            ],
            [
                [0, 1],
                [-1, 0],
                [2, 1],
                [1, 0]
            ],
            [
                [-1, -1],
                [0, -2],
                [-1, 1],
                [0, 0]
            ],
            [
                [1, 0],
                [2, 1],
                [-1, 0],
                [0, 1]
            ]
        ],
        "sideLength": 3
    },
    "T": {
        "image": Tetris.images.T,
        "initial": [
            [1, 1],
            [0, 2],
            [1, 2],
            [2, 2]
        ],
        "transform": [
            [
                [1, 0],
                [1, -2],
                [0, -1],
                [-1, 0]
            ],
            [
                [-1, 1],
                [1, 1],
                [0, 0],
                [-1, -1]
            ],
            [
                [-1, -1],
                [-1, 1],
                [0, 0],
                [1, -1]
            ],
            [
                [1, 0],
                [-1, 0],
                [0, 1],
                [1, 2]
            ]
        ],
        "sideLength": 3
    },
    "Z": {
        "image": Tetris.images.Z,
        "initial": [
            [0, 1],
            [1, 1],
            [1, 2],
            [2, 2]
        ],
        "transform": [
            [
                [1, -1],
                [0, 0],
                [-1, -1],
                [-2, 0]
            ],
            [
                [1, 2],
                [0, 1],
                [1, 0],
                [0, -1]
            ],
            [
                [-2, 0],
                [-1, -1],
                [0, 0],
                [1, -1]
            ],
            [
                [0, -1],
                [1, 0],
                [0, 1],
                [1, 2]
            ]
        ],
        "sideLength": 3
    }
};

function Game_Tetris() {
    this.initialize.apply(this, arguments);
}

Game_Tetris.prototype.initialize = function(x, y, width, height) {
    this._monoises = [];
    this._direction = 0;
    this._name = "";
    this._next = "";
    this._waitCount = 0;
    this._speed = 1;
    this._score = 0;
    this._dashTime = 0;
    this._dropTime = 0;
    this.setBoard(x, y, width, height);
    this._showNextTetris = false;
    this._showTetrisStatus = false;
    this._spwanTime = Tetris.spawnTime;
};

Game_Tetris.prototype.all = function(method, args) {
    return this._monoises.map(function(event) {
        return event[method].apply(event, args);
    });
};

Game_Tetris.prototype.checkAll = function(method, args) {
    return this._monoises.every(function(event) {
        return event[method].apply(event, args);
    });
};

Game_Tetris.prototype.setBoard = function(x, y, width, height) {
    this._boardX = x;
    this._boardY = y;
    this._boardWidth = width < 4 ? 4 : width;
    this._boardHeight = height;
};

Game_Tetris.prototype.showNextTetris = function() {
    this._showNextTetris = true;
};

Game_Tetris.prototype.hideNextTetris = function() {
    this._showNextTetris = false;
};

Game_Tetris.prototype.nextWindowOpen = function() {
    return this._showNextTetris;
};

Game_Tetris.prototype.showTetrisStatus = function() {
    this._showTetrisStatus = true;
};

Game_Tetris.prototype.hideTetrisStatus = function() {
    this._showTetrisStatus = false;
};

Game_Tetris.prototype.statusWindowOpen = function() {
    return this._showTetrisStatus;
};

Game_Tetris.prototype.boardX = function() {
    return this._boardX;
};

Game_Tetris.prototype.boardY = function() {
    return this._boardY;
};

Game_Tetris.prototype.boardWidth = function() {
    return this._boardWidth;
};

Game_Tetris.prototype.boardHeight = function() {
    return this._boardHeight;
};

Game_Tetris.prototype.setShape = function(name) {
    this._name = name;
};

Game_Tetris.prototype.add = function(event) {
    this._monoises.push(event);
};

Game_Tetris.prototype.clear = function() {
    this.all("freeze");
    this._monoises = [];
    this._direction = 0;
    this._name = "";
    this._dashTime = 0;
    this._dropTime = 0;
};

Game_Tetris.prototype.hasMonois = function() {
    return this._monoises.length > 0;
};

Game_Tetris.prototype.update = function() {
    if (this.hasMonois()) {
        this.updateInput();
        this.updateDashing();
        this.updateDrop();
    } else if (this.isWaitingSpawn()) {
        this._waitCount--;
    } else {
        this.spawn();
        if (!this.checkAll("canPassHere", [2, false])) {
            this.checkOverlap();
            this.gameOver();
        }
    }
    $gameVariables.setValue(Tetris.speedVariableId, this._speed);
    $gameVariables.setValue(Tetris.scoreVariableId, this._score);
};

Game_Tetris.prototype.isWaitingSpawn = function() {
    return this._waitCount > 0 || $gameMap.isAnyMonoisNotStopping();
};

Game_Tetris.prototype.waitingToSpawn = function() {
    this._waitCount = this._spwanTime;
};

Game_Tetris.prototype.setSpawnTime = function(time) {
    this._spwanTime = time;
};

Game_Tetris.prototype.checkOverlap = function() {
    if (!this.checkAll("canPassHere", [2, false, 0, -1])) {
        this._monoises.forEach(function(event) {
            $gameMap.deleteMonois(event);
        });
    }
};

Game_Tetris.prototype.gameOver = function() {
    this.clear();
    this._next = "";
    $gameSwitches.setValue(Tetris.gameOverSwitchId, true);
};

Game_Tetris.prototype.hasNextShape = function() {
    return this._next !== "";
};

Game_Tetris.prototype.setNextShape = function(name) {
    this._next = name;
};

Game_Tetris.prototype.nextShape = function() {
    return this._next;
};

Game_Tetris.prototype.speed = function() {
    return this._speed;
};

Game_Tetris.prototype.setSpeed = function(speed) {
    this._speed = speed;
};

Game_Tetris.prototype.score = function() {
    return this._score;
};

Game_Tetris.prototype.addScore = function(score) {
    this._score += score;
};

Game_Tetris.prototype.setScore = function(score) {
    this._score = score;
};

Game_Tetris.prototype.spawn = function() {
    if (this.hasNextShape()) {
        this.setShape(this._next);
    } else {
        this.setShape(this.randomShape());
    }
    this.setNextShape(this.randomShape());
    var tetris = Tetris.shape[this._name];
    var charName = tetris.image.name;
    var charIndex = tetris.image.index;
    var dirFix = tetris.image.fix;
    var walkAnime = tetris.image.walk;
    var x = this._boardX + Math.floor(this._boardWidth / 2);
    var y = this._boardY - tetris.sideLength + 1;
    tetris.initial.forEach(function(coord) {
        this.add($gameMap.createMonois(x + coord[0], y + coord[1], charName, charIndex, dirFix, walkAnime));
    }, this);
    this.all("setMoveSpeed", [this._speed]);
};

Game_Tetris.prototype.randomShape = function() {
    var names = Object.keys(Tetris.shape);
    var max = names.length - 1;
    var min = 0;
    var index = Math.floor(Math.random() * (max - min + 1)) + min;
    return names[index];
};

Game_Tetris.prototype.updateDrop = function() {
    if (this.checkAll("isStopping")) {
        if (this.checkAll("canPassHere", [2, true])) {
            this.all("moveStraightNotTurn", [2]);
        } else {
            if (Tetris.freezeAnimationId > 0) {
                this.all("requestAnimation", [Tetris.freezeAnimationId]);
            }
            this.processConnect();
            this.waitingToSpawn();
            this.clear();
        }
    }
    this._dropTime++;
};

Game_Tetris.prototype.checkConnect = function() {
    var y = this._boardY;
    var width = this._boardWidth;
    var height = this._boardHeight;
    var line = 0;
    var monoises = $gameMap.events().filter(function(event) {
        return event.isMonois();
    });
    for (; y < height; y++) {
        var events = monoises.filter(inThisLine);
        if (events.length === width) {
            line++;
            events.forEach(function(monois) {
                monois.eliminate();
            });
            monoises.filter(aboveThisLine).sort(function(e1, e2) {
                return e2.y - e1.y;
            }).forEach(drop);
        }
    }
    return line;

    function aboveThisLine(event) {
        return event.y < y;
    }

    function inThisLine(event) {
        return event.y === y;
    }

    function drop(event) {
        event.moveLater(0, 1, $gameMap.isCharRemovedQueueEmpty.bind($gameMap));
    }
};

Game_Tetris.prototype.processConnect = function() {
    var line = this.checkConnect();
    if (line > 0) {
        var score = Tetris.calculateScore.call(this, line, this._dashTime / this._dropTime);
        this.addScore(Math.round(score));
    }
};

Game_Tetris.prototype.updateDashing = function() {
    if (!Input.isPressed('down')) {
        this.all("stopDash");
    }
};

Game_Tetris.prototype.updateInput = function() {
    if (Input.isTriggered("ok")) {
        this.turn90();
    } else if (Input.isRepeated("left")) {
        this.moveLeft();
    } else if (Input.isRepeated("right")) {
        this.moveRight();
    } else if (Input.isPressed("down")) {
        if (this._speed < 6) {
            this.all("startDash");
            this._dashTime++;
        }
    }
};

Game_Tetris.prototype.turn90 = function() {
    this.all("savePosition");
    var tetris = Tetris.shape[this._name];
    for (var i = 0; i < this._monoises.length; i++) {
        var xy = tetris.transform[this._direction][i];
        this._monoises[i].teleportFrom(xy[0], xy[1]);
    }
    for (var dx of [0, -1, 2]) {
        this.all("teleportFrom", [dx, 0]);
        if (this.checkAll("insideBoard") && this.checkAll("canPassHere", [2, true])) {
            this._direction++;
            if (this._direction > 3) {
                this._direction = 0;
            }
            this.all("turnRight90");
            return true;
        }
    }
    this.all("restorePosition");
    return false;
};

Game_Tetris.prototype.moveLeft = function() {
    if (this.checkAll("canPassHere", [4, false])) {
        this.all("savePosition");
        this.all("teleportStraight", [4]);
        if (!this.checkAll("insideBoard")) {
            this.all("restorePosition");
        }
    }
};

Game_Tetris.prototype.moveRight = function() {
    if (this.checkAll("canPassHere", [6, false])) {
        this.all("savePosition");
        this.all("teleportStraight", [6]);
        if (!this.checkAll("insideBoard")) {
            this.all("restorePosition");
        }
    }
};

// mono- + tennis
function Game_Monois() {
    this.initialize.apply(this, arguments);
}

Game_Monois.prototype = Object.create(Game_Event.prototype);
Game_Monois.prototype.constructor = Game_Monois;

Game_Monois.prototype.initialize = function(mapId, eventId) {
    Game_Event.prototype.initialize.call(this, mapId, eventId);
    this._isMonois = true;
    this._freeze = false;
    this._dashing = false;
};

Game_Monois.data = {
    "id": 0,
    "name": "EVTPL",
    "note": "",
    "pages": [{
        "conditions": {
            "actorId": 1,
            "actorValid": false,
            "itemId": 1,
            "itemValid": false,
            "selfSwitchCh": "A",
            "selfSwitchValid": false,
            "switch1Id": 1,
            "switch1Valid": false,
            "switch2Id": 1,
            "switch2Valid": false,
            "variableId": 1,
            "variableValid": false,
            "variableValue": 0
        },
        "directionFix": true,
        "image": {
            "characterIndex": 0,
            "characterName": "",
            "direction": 2,
            "pattern": 1,
            "tileId": 0
        },
        "list": [{
            "code": 0,
            "indent": 0,
            "parameters": []
        }],
        "moveFrequency": 3,
        "moveRoute": {
            "list": [{
                "code": 0,
                "parameters": []
            }],
            "repeat": true,
            "skippable": false,
            "wait": false
        },
        "moveSpeed": 3,
        "moveType": 0,
        "priorityType": 1,
        "stepAnime": false,
        "through": false,
        "trigger": 0,
        "walkAnime": true
    }],
    "x": 0,
    "y": 0
};

Game_Monois.prototype.event = function() {
    return Game_Monois.data;
};

Game_Monois.prototype.freeze = function() {
    this._freeze = true;
    this.setMoveSpeed(3);
    this.stopDash();
};

Game_Monois.prototype.isCollidedWithEvents = function(x, y) {
    var events = $gameMap.eventsXyNt(x, y).filter(function(event) {
        if (event === this) {
            return false;
        }
        if (this._priorityType !== event.priorityType()) {
            return false;
        }
        if (event.isMonois() && !event.isFreeze()) {
            return false;
        }
        return true;
    }, this);
    return events.length > 0;
};

Game_Monois.prototype.canPass = function(x, y, d) {
    if ($gameMap.roundYWithDirection(y, d) < 0) {
        return true;
    }
    if (this.isCollidedWithCharacters(x, y)) {
        return false;
    }
    return Game_Event.prototype.canPass.call(this, x, y, d);
};

Game_Monois.prototype.isDashing = function() {
    return this._dashing;
};

Game_Monois.prototype.startDash = function() {
    this._dashing = true;
};

Game_Monois.prototype.stopDash = function() {
    this._dashing = false;
};

Game_Monois.prototype.realMoveSpeed = function() {
    return this.isDashing() ? 6 : this._moveSpeed;
};

Game_Monois.prototype.insideBoard = function() {
    var tetris = $gameMap.tetris();
    var left = tetris.boardX();
    var right = left + tetris.boardWidth();
    return this._x >= left && this._x < right;
};

Game_Monois.prototype.eliminate = function(callback) {
    if (Tetris.eliminateAnimationId > 0) {
        this.requestAnimation(Tetris.eliminateAnimationId);
    }
    $gameMap.deleteMonois(this, true, callback);
};

function Window_NextTetris() {
    this.initialize.apply(this, arguments);
}

Window_NextTetris.prototype = Object.create(Window_Base.prototype);
Window_NextTetris.prototype.constructor = Window_NextTetris;

Window_NextTetris.prototype.initialize = function() {
    var x = Tetris.nextWindowX;
    var y = Tetris.nextWindowY;
    var width = Tetris.nextWindowWidth;
    var height = Tetris.nextWindowHeight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._lastShape = "";
    this.openness = 0;
};

Window_NextTetris.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    var tetris = $gameMap.tetris();
    if (tetris) {
        if (!this.isOpening() && !this.isClosing()) {
            if (tetris.nextWindowOpen()) {
                this.open();
            } else {
                this.close();
            }
        }
        var nextShape = tetris.nextShape();
        if (this._lastShape !== nextShape) {
            this._lastShape = nextShape;
            this.refresh();
        }
    }
};

Window_NextTetris.prototype.refresh = function() {
    this.contents.clear();
    var tetris = Tetris.shape[this._lastShape];
    if (tetris) {
        var charName = tetris.image.name;
        var bitmap = ImageManager.loadCharacter(charName);
        bitmap.addLoadListener(this.drawNextTetris.bind(this));
    }
};

Window_NextTetris.prototype.drawNextTetris = function(bitmap) {
    var tetris = Tetris.shape[this._lastShape];
    var charIndex = tetris.image.index;
    var sideLength = tetris.sideLength;
    var cw = this.contentsWidth();
    var ch = this.contentsHeight();
    var tw = $gameMap.tileWidth();
    var th = $gameMap.tileHeight();
    var pw = bitmap.width / 12;
    var ph = bitmap.height / 8;
    var sx = charIndex % 4 * 3 * pw;
    var sy = Math.floor(charIndex / 4) * 4 * ph;
    for (var i = 0; i < 4; i++) {
        var xy = tetris.initial[i];
        var x = xy[0];
        var y = xy[1];
        var dx = x * tw + (cw - tw * sideLength) / 2;
        var dy = (y - sideLength + 2) * th + (ch - th * 2) / 2;
        this.contents.blt(bitmap, sx, sy, tw, th, dx, dy);
    }
};

function Window_TetrisStatus() {
    this.initialize.apply(this, arguments);
}

Window_TetrisStatus.prototype = Object.create(Window_Base.prototype);
Window_TetrisStatus.prototype.constructor = Window_TetrisStatus;

Window_TetrisStatus.prototype.initialize = function() {
    var x = Tetris.statusWindowX;
    var y = Tetris.statusWindowY;
    var width = Tetris.statusWindowWidth;
    var height = Tetris.statusWindowHeight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._lastScore = -1;
    this.openness = 0;
};

Window_TetrisStatus.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    var tetris = $gameMap.tetris();
    if (tetris) {
        if (!this.isOpening() && !this.isClosing()) {
            if (tetris.statusWindowOpen()) {
                this.open();
            } else {
                this.close();
            }
        }
        var score = tetris.score();
        if (this._lastScore !== score) {
            this._lastScore = score;
            this.refresh();
        }
    }
};

Window_TetrisStatus.prototype.refresh = function() {
    this.contents.clear();
    var tetris = $gameMap.tetris();
    var lh = this.lineHeight();
    var cw = this.contentsWidth();
    this.drawTextEx(`${tetris.speed()}\\C[14]\u2605`, 0, 0);
    this.changeTextColor(this.systemColor());
    this.drawText("Score", 70, 0);
    this.resetTextColor();
    this.drawText(tetris.score(), 150, 0, cw - 150, "right");
};

(function() {
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        if ($dataMap.meta.Tetris) {
            this._tetrisStatusWindow = new Window_TetrisStatus();
            this.addWindow(this._tetrisStatusWindow);
            this._nextTetrisWindow = new Window_NextTetris();
            this.addWindow(this._nextTetrisWindow);
        }
    };

    var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        _Scene_Map_onMapLoaded.call(this);
        if (Tetris.eliminateAnimationId > 0) {
            this.reserveAnimation(Tetris.eliminateAnimationId);
        }
        if (Tetris.freezeAnimationId > 0) {
            this.reserveAnimation(Tetris.freezeAnimationId);
        }
    };

    Scene_Map.prototype.reserveAnimation = function(animationId) {
        var animation = $dataAnimations[animationId];
        var name1 = animation.animation1Name;
        var name2 = animation.animation2Name;
        var hue1 = animation.animation1Hue;
        var hue2 = animation.animation2Hue;
        ImageManager.reserveAnimation(name1, hue1);
        ImageManager.reserveAnimation(name2, hue2);
    };

    var _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.call(this);
        this._tetris = null;
        this._characterAddedQueue = [];
        this._characterRemovedQueue = [];
    };

    Game_Map.prototype.initTetris = function() {
        if (this._tetris === undefined) {
            this._tetris = null;
            this._characterAddedQueue = [];
            this._characterRemovedQueue = [];
        }
    };

    let _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameMap.initTetris();
    };

    Game_Map.prototype.tetris = function() {
        return this._tetris;
    };

    Game_Map.prototype.getTetris = function() {
        if (this._tetris) {
            return this._tetris;
        }
        throw new Error("Game_Tetris hasn't been constructed yet. 先執行插件命令Tetris Create");
    };

    Game_Map.prototype.characterAddedQueue = function() {
        return this._characterAddedQueue;
    };

    Game_Map.prototype.characterRemovedQueue = function() {
        return this._characterRemovedQueue;
    };

    Game_Map.prototype.isCharRemovedQueueEmpty = function() {
        return this._characterRemovedQueue.length === 0;
    };

    Game_Map.prototype.createMonois = function(x, y, charName, charIndex, dirFix, walkAnime) {
        var eventId = this._events.length;
        var event = new Game_Monois(this._mapId, eventId);
        this._events[eventId] = event;
        this._characterAddedQueue.push(event);
        event.locate(x, y);
        event.setImage(charName, charIndex);
        event.setDirectionFix(!!dirFix);
        event.setWalkAnime(!!walkAnime);
        return event;
    };

    Game_Map.prototype.deleteMonois = function(event, waitAnimationEnd, callback) {
        this._characterRemovedQueue.push({
            character: event,
            waitAnimationEnd: waitAnimationEnd,
            callback: callback
        });
        this._events[event.eventId()] = undefined;
    };

    Game_Map.prototype.isAnyMonoisNotStopping = function() {
        return this.events().some(function(event) {
            return event.isMonois() && !event.isStopping();
        });
    };

    var _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.updateCharacters();
    };

    Spriteset_Map.prototype.updateCharacters = function() {
        var addedQueue = $gameMap.characterAddedQueue();
        if (addedQueue && addedQueue.length > 0) {
            addedQueue.forEach(function(character) {
                var sprite = new Sprite_Character(character);
                this._characterSprites.push(sprite);
                this._tilemap.addChild(sprite);
            }, this);
            addedQueue.splice(0);
        }
        var removedQueue = $gameMap.characterRemovedQueue();
        if (removedQueue && removedQueue.length > 0) {
            removedQueue.forEach(function({ character, waitAnimationEnd, callback }, index, queue) {
                if (waitAnimationEnd && character.isAnimationPlaying()) {

                } else {
                    var sprite = character.sprite();
                    sprite.endAnimation();
                    sprite.endBalloon();
                    var spriteIndex = this._characterSprites.indexOf(sprite);
                    this._characterSprites.splice(spriteIndex);
                    this._tilemap.removeChild(sprite);
                    queue[index] = null;
                    if (callback) {
                        callback();
                    }
                }
            }, this);
            for (var i = 0; i < removedQueue.length; i++) {
                if (!removedQueue[i]) {
                    removedQueue.splice(i, 1);
                    i--;
                }
            }
        }
    };

    Game_Map.prototype.createTetris = function(x, y, width, height) {
        this._tetris = new Game_Tetris(x, y, width, height);
    };

    Game_Map.prototype.clearMonoises = function() {
        this.events().forEach(function(event) {
            if (event.isMonois()) {
                this.deleteMonois(event);
            }
        }, this);
    };

    Game_Event.prototype.isMonois = function() {
        return this._isMonois;
    };

    Game_Event.prototype.isFreeze = function() {
        return this._freeze;
    };

    Game_CharacterBase.prototype.priorityType = function() {
        return this._priorityType;
    };

    Game_CharacterBase.prototype.teleportStraight = function(d) {
        var dx = d === 4 ? -1 : d === 6 ? 1 : 0;
        var dy = d === 8 ? -1 : d === 2 ? 1 : 0;
        this._x += dx;
        this._realX += dx;
        this._y += dy;
        this._realY += dy;
    };

    Game_CharacterBase.prototype.teleportFrom = function(x, y) {
        var dx = this._x - this._realX;
        var dy = this._y - this._realY;
        this._x += x;
        this._y += y;
        this._realX = this._x - dx;
        this._realY = this._y - dy;
    };

    Game_CharacterBase.prototype.moveLater = function(dx, dy, condition) {
        this._goalX += dx;
        this._goalY += dy;
        if (!this._conditionToMove) {
            this._conditionToMove = condition;
        }
    };

    var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
    Game_CharacterBase.prototype.updateStop = function() {
        _Game_CharacterBase_updateStop.call(this);
        if (this._conditionToMove && this._conditionToMove()) {
            this._x += this._goalX;
            this._y += this._goalY;
            this._goalX = 0;
            this._goalY = 0;
            this._conditionToMove = null;
        }
    };

    Game_CharacterBase.prototype.moveStraightNotTurn = function(d) {
        var lastDirectionFix = this.isDirectionFixed();
        this.setDirectionFix(true);
        this.moveStraight(d);
        this.setDirectionFix(lastDirectionFix);

    };

    var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.call(this);
        this._savedPos = {};
        this._goalX = 0;
        this._goalY = 0;
        this._conditionToMove = null;
    };

    Game_CharacterBase.prototype.canPassHere = function(direction, isRealXy, dx = 0, dy = 0) {
        var x = dx;
        var y = dy;
        if (isRealXy) {
            x += Math.floor(this._realX);
            y += Math.floor(this._realY);
        } else {
            x += this._x;
            y += this._y;
        }
        return this.canPass(x, y, direction);
    };

    Game_CharacterBase.prototype.savePosition = function() {
        this._savedPos = {
            x: this._x,
            y: this._y,
            realX: this._realX,
            realY: this._realY
        };
    };

    Game_CharacterBase.prototype.restorePosition = function() {
        this._x = this._savedPos.x;
        this._y = this._savedPos.y;
        this._realX = this._savedPos.realX;
        this._realY = this._savedPos.realY;
    };

    Game_CharacterBase.prototype.setSprite = function(sprite) {
        this._sprite = sprite;
    };

    Game_CharacterBase.prototype.sprite = function() {
        return this._sprite;
    };

    var _Sprite_Character_setCharacter = Sprite_Character.prototype.setCharacter;
    Sprite_Character.prototype.setCharacter = function(character) {
        _Sprite_Character_setCharacter.call(this, character);
        this._character.setSprite(this);
    };

    var _JsonEx__encode = JsonEx._encode;
    JsonEx._encode = function(value, circular, depth) {
        if (value instanceof Game_CharacterBase) {
            circular.push(["_sprite", value, value.sprite()]);
            value.setSprite(null);
        }
        return _JsonEx__encode.call(this, value, circular, depth);
    };
	
    Sprite_Base.prototype.endAnimation = function() {
        this._animationSprites.forEach(function(sprite) {
            sprite.remove();
        });
        this._animationSprites = [];
    };

    Sprite_Animation._tetrisChecker = {};

    var _Sprite_Animation_createSprites = Sprite_Animation.prototype.createSprites;
    Sprite_Animation.prototype.createSprites = function() {
        _Sprite_Animation_createSprites.call(this);
        if (this._animation.id === Tetris.freezeAnimationId || this._animation.id === Tetris.eliminateAnimationId) {
            if (Sprite_Animation._tetrisChecker[this._animation.id]) {
                this._duplicated = true;
            } else {
                this._duplicated = false;
                Sprite_Animation._tetrisChecker[this._animation.id] = true;
            }
        }
    };

    var _Sprite_Animation_update = Sprite_Animation.prototype.update;
    Sprite_Animation.prototype.update = function() {
        _Sprite_Animation_update.call(this);
        Sprite_Animation._tetrisChecker = {};
    };

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "Tetris") {
            switch (args[0]) {
                case "Update":
                    $gameMap.getTetris().update();
                    break;
                case "Create":
                    var x = Number(args[1]);
                    var y = Number(args[2]);
                    var width = Number(args[3]);
                    var height = Number(args[4]);
                    var tetris = $gameMap.tetris();
                    if (tetris) {
                        tetris.setBoard(x, y, width, height);
                    } else {
                        $gameMap.createTetris(x, y, width, height);
                    }
                    break;
                case "SetScore":
                    $gameMap.getTetris().setScore(Number(args[1]));
                    break;
                case "SetSpeed":
                    $gameMap.getTetris().setSpeed(Number(args[1]));
                    break;
                case "SetTime":
                    $gameMap.getTetris().setSpawnTime(Number(args[1]));
                    break;
                case "Clear":
                    $gameMap.clearMonoises();
                    break;
                case "Show":
                    switch (args[1]) {
                        case "Next":
                            $gameMap.getTetris().showNextTetris();
                            break;
                        case "Status":
                            $gameMap.getTetris().showTetrisStatus();
                            break;
                    }
                    break;
                case "Hide":
                    switch (args[1]) {
                        case "Next":
                            $gameMap.getTetris().hidebNextTetris();
                            break;
                        case "Status":
                            $gameMap.getTetris().hideTetrisStatus();
                            break;
                    }
                    break;
            }
        }
    };
})();