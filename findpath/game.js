var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
            console.log("1");
        }
        WorldMap.prototype.render = function (context) {
            // var gird = new astar.Grid(NUM_COLS,NUM_ROWS);
            //context.fillStyle = '#0000FF';
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    // console.log(this.grid.);                    
                    if (this.grid.getNode(i, j).walkable == false) {
                        context.fillStyle = '#000000';
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    }
                    else {
                        context.fillStyle = '#0000FF';
                        context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fill();
                    }
                    context.stroke();
                }
            }
            context.closePath();
        };
        return WorldMap;
    }(DisplayObject));
    game.WorldMap = WorldMap;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.x_Array = []; // x坐标
            this.y_Array = []; // y坐标
            this.n = 1; // 为了让计算速度的地方在速度改变前只执行一次 
            this.vx0 = 1;
            this.vy0 = 1;
        }
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            for (var i = 0; i < path.length; i++) {
                this.x_Array[i] = path[i].x;
                this.y_Array[i] = path[i].y;
            }
            console.log(path);
            console.log(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            for (var i = 1; i < this.x_Array.length; i++) {
                this.x_move = String(this.x / 50);
                this.y_move = String(this.y / 50);
                // console.log(i +"i");
                if (parseInt(this.x_move) == this.x_Array[i - 1] && parseInt(this.y_move) == this.y_Array[i - 1] && this.n == i) {
                    this.n++;
                    // console.log(this.n+"n");
                    this.dx = this.x_Array[i] - this.x_Array[i - 1];
                    this.dy = this.y_Array[i] - this.y_Array[i - 1];
                    if (this.dx == 0) {
                        this.vx = 0;
                    }
                    if (this.dx == 1) {
                        this.vx = this.vx0;
                    }
                    if (this.dy == 0) {
                        this.vy = 0;
                    }
                    if (this.dy == 1) {
                        this.vy = this.vy0;
                    }
                }
                if (this.n == 13) {
                    this.vx = 0;
                    this.vy = 0;
                }
            }
            this.y += duringTime * this.vy;
            this.x += duringTime * this.vx;
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
//body.vx = 5;
//body.vy = 5;   //
var renderCore = new RenderCore();
renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
