class Candy {
    constructor(x, y) {

        var options ={
            restitution:0.4,
        }


        this.body = Bodies.circle(x, y,10,options); 
        this.radius=10;
        this.color=color(random(0, 255), random(0, 255), random(0, 255));
        World.add(world, this.body);

    }
    updatePosition() {

    if(this.body.position.y>=height){

        Matter.Body.setPosition(this.body,{x:random(0,600),y:random(0,600)})

    }

}

    showCandy(){
        //var pos = this.body.position;
        //var angle = this.body.angle;

        push();
        //translate(pos.x, pos.y);
        //rotate(angle);
        noStroke();
        fill(this.color)
        ellipseMode(CENTER)
        ellipse(this.body.position.x, this.body.position.y, this.radius,this.radius);
        //imageMode(CENTER);
        //image(this.image,this.body.position.x, this.body.position.y, this.radius,this.radius);
        pop();
    }

};



