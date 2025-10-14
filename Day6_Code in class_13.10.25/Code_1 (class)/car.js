class Car{

    constructor(x,y,wheelSize){
        this.x = x;
        this.y =y,
        this.size = 40;
        this.wheelSize = wheelSize
        this.speed = 5;





        

    }
     
    show(){

        
        rect(this.x,this.y,this.size,40);
        circle(this.x+10,this.y+45,this.wheelSize);
        circle(this.x+30,this.y+45,this.wheelSize);

    }

    



}