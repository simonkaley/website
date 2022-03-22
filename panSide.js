function PanSide(x,y,w,h,ang) {
    var options = {
        isStatic: true,
        angle: ang,

    }
    this.body=Bodies.rectangle(x,y,w,h,options);
    this.w=w;
    this.h=h;
    this.ang=ang;
    Composite.add(world,this.body);

    this.show = function() {
        var pos=this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        rectMode(CENTER);
        rect(0,0,this.w,this.h);
        imageMode(CENTER)
        //image(ballImg,0,0,50,50);
        pop();
    }

}