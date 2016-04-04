
var humanContainer = new render.DisplayObjectContainer();
var TotalContainer = new render.DisplayObjectContainer();
var click_obj :string;

TotalContainer.x = 100;
TotalContainer.y = 100;

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
renderCore.start(TotalContainer, ["wander-icon.png","body.png","leftleg.png","leftarm.png","rightleg.png","rightarm.png","s.jpg"]);



class HumanBody extends Body {
 
    vx:number = 1;
    public circle : number = 10*Math.PI;
    

    onTicker(duringTime: number) {
        //this.vx = 1;
        if(click_obj == "head"){
            if(this.vx == 0) {
                this.circle = 10*Math.PI;
                this.vx = 1;
            }
            else {
                this.circle = - this.circle;
                click_obj = "no";
            }
            
        }
        if(click_obj == "leg"){
            this.rotation = 0;
            this.circle = 0;
            this.vx = 0;
        }
        
        console.log (click_obj,this.vx);
        this.x += this.vx * duringTime;
        
        this.rotation +=  this.circle * duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(TotalContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    
    var lp_x : number;
    var lp_y : number;
    
    lp_x = localPoint.x;
    lp_y = localPoint.y;
    if(0 < lp_x  && lp_x < 73 && 0 < lp_y && lp_y < 82 ){
        click_obj = "head";  
    }
    if((-20 < lp_x && lp_x < 35 && 160 < lp_y && 192 > lp_y) || (40 < lp_x && lp_x < 104 && 140 < lp_y && 183 > lp_y)){
        click_obj = "leg";
    }
    
    

    
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);
