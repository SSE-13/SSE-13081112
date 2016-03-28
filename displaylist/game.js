var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var TotalContainer = new render.DisplayObjectContainer();
TotalContainer.addChild(humanContainer);
humanContainer.x = -100;
humanContainer.y = -100;
var head = new render.Bitmap();
head.source = "wander-icon.png";
humanContainer.addChild(head);
head.x = 60;
head.y = 0;
var trunk = new render.Bitmap();
trunk.source = "body.png";
humanContainer.addChild(trunk);
trunk.x = 40;
trunk.y = 60;
var left_leg = new render.Bitmap();
left_leg.source = "leftleg.png";
humanContainer.addChild(left_leg);
left_leg.x = 40;
left_leg.y = 160;
var right_leg = new render.Bitmap();
right_leg.source = "rightleg.png";
humanContainer.addChild(right_leg);
right_leg.x = 100;
right_leg.y = 140;
var left_arm = new render.Bitmap();
left_arm.source = "leftarm.png";
humanContainer.addChild(left_arm);
left_arm.x = 10;
left_arm.y = 60;
var right_arm = new render.Bitmap();
right_arm.source = "rightarm.png";
humanContainer.addChild(right_arm);
right_arm.x = 130;
right_arm.y = 50;
var renderCore = new render.RenderCore();
renderCore.start(TotalContainer, ["wander-icon.png", "body.png", "leftleg.png", "leftarm.png", "rightleg.png", "rightarm.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        // console.log(humanContainer.x);
        this.vx = 5;
        if (this.y > 250) {
            this.vy = -20;
        }
        if (this.y < 100) {
            this.vy = 10;
            console.log("2");
        }
        this.x += this.vx * duringTime;
        this.y += this.vy * duringTime;
        this.rotation += 10 * Math.PI * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(TotalContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map