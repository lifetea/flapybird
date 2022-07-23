import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bg')
export class Bg extends Component {

    @property({ type: Node })
    bg1: Node = null;

    @property({ type: Node })
    bg2: Node = null;
    
    @property({ type: Node })
    groud1: Node = null;
        
    @property({ type: Node })
    groud2: Node = null;

    private _moveBgSpeed: number = 1;

    moveBg() {
       //移动背景 
        //    console.log("moveBg");
        let bg1Pos = this.bg1.position;
        let bg2Pos = this.bg2.position;
        let bg1Size = this.bg1.getComponent(UITransform).getBoundingBox()
        let width = bg1Size.width - 1;
        if(bg1Pos.x < - width + 2 ) {
            // console.log('背景1', bg1Pos.x, '背景2', bg2Pos.x);
            this.bg1.setPosition( bg2Pos.x + width, bg1Pos.y); 
        } else {
            this.bg1.setPosition(bg1Pos.x - this._moveBgSpeed, bg1Pos.y);   
        }

        if(bg2Pos.x < - width + 2 ) {
            // console.log('背景1', bg1Pos.x, '背景2', bg2Pos.x);
            this.bg2.setPosition(bg1Pos.x + width, bg2Pos.y); 
        } else {
            this.bg2.setPosition(bg2Pos.x - this._moveBgSpeed, bg2Pos.y);   
        }

    }

    start() {
        this.schedule(function(){
            this.moveBg();
        }, 0.01);

    }

    update(deltaTime: number) {

    }
}

