class Flower{
    constructor(x,y,xspeed,yspeed,size){

        this.x=x;
        this.y=y;
        this.xspeed=xspeed;
        this.yspeed=yspeed;
        this.size =size;
        this.selectedFlower=false;

    }

    drawFlower(){

        if(this.selectedFlower==true){
            fill("red");
        }else{
            fill(random(0,255),random(0,255),random(0,255))
        }
        
        ellipse(this.x,this.y,this.size,this.size);
        
        ellipse(this.x,this.y,this.size,this.size);
        
        ellipse(this.x,this.y,this.size,this.size);



    }

    moveFlower(){

        this.x = this.x+this.xspeed;
        this.y = this.y+this.yspeed;

        if(this.y+25 > height || this.y-25 < 0){
            this.yspeed = -this.yspeed;
        }

        

        if(this.x-25 < 0 || this.x+25 > width){
            this.xspeed = -this.xspeed;
        }


    }

    checkifSelected(mx,my){

        let distance = dist(mx,my,this.x,this.y);
        if(distance < this.size/2){

            this.selectedFlower=true;

        }else{
            this.selectedFlower=false;
        }

        
    }

}

