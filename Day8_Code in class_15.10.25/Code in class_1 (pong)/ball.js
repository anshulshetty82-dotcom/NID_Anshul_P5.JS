class Ball{
    constructor(x,y,Xspeed,Yspeed){

    this.x = x;
    this.y = y;
    this.Xspeed = Xspeed;
    this.Yspeed = Yspeed;
    this.size = 20;


    }

    show(){
        
        circle(this.x,this.y,this.size)
        
    }
   

}