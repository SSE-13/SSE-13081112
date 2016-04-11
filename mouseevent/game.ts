
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
renderCore.start(TotalContainer, ["wander-icon.png","body.png","leftleg.png","leftarm.png","rightleg.png","rightarm.png"]);



class HumanBody extends Body {
 
    public vx:number = 5;
    public circle : number = 10*Math.PI;
    

    onTicker(duringTime: number) {

        this.x += this.vx * duringTime;
        
        this.rotation +=  this.circle * duringTime;
      //  console.log(this.vx);

    }
}

var ticker = new Ticker();
var body = new HumanBody(TotalContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    
    if(0 < localPoint.x  && localPoint.x < 73 && 0 < localPoint.y && localPoint.y < 82 ){
        return true;
    }
   
     else return false;
    
}




var headOnClick = () => {
    if(body.vx == 0){
        body.vx = 5;
        body.circle = 10*Math.PI;
        
    }
    else {
       body.vx = -body.vx;
       body.circle = -body.circle;
    }
                
            

    //修改 HumanBody 的速度，使其反向移动
}

var left_legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    
    
    if(0 < localPoint.x  && localPoint.x < 55 && 0 < localPoint.y && localPoint.y < 32 ){
        return true;
    }
   
     else return false;
}

var left_legOnClik = () => {
    body.rotation = 0;
    body.vx = 0 ;
    body.circle = 0;
    
}

var right_legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    
    if(0 < localPoint.x  && localPoint.x < 64 && 0 < localPoint.y && localPoint.y < 43 ){
        return true;
    }
    
    else return false; 
}

var right_legOnClik = () => {
    body.rotation = 0;
    body.vx = 0 ;
    body.circle = 0;
    
}


eventCore.register(head,headHitTest,headOnClick);
eventCore.register(left_leg,left_legHitTest,left_legOnClik);
eventCore.register(right_leg,right_legHitTest,right_legOnClik);
