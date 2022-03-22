function Kernel(x,y,w,h) {
    var options = {
        friction: 0.4,


    }
    this.body=Bodies.rectangle(x,y,w,h,options);
    this.w=w;
    this.h=h;
    Composite.add(world,this.body);

    this.show = function() {
        var pos=this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        //rectMode(CENTER);
        //rect(0,0,this.w,this.h);
        imageMode(CENTER)
        image(kernelsImg,0,0,245,118);
        pop();
    }

}