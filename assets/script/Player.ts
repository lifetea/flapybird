import { _decorator, Component, Node, input, EventKeyboard, Input, NodeEventType, KeyCode, tween, v3, RigidBody2D, RigidBody, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    onLoad() {
        //键盘事件
        input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
        input.on(Input.EventType.KEY_UP, this.keyUp, this);    

        //键盘事件
        // input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
    }

    fly(){
        let regid = this.node.getComponent(RigidBody2D)
        let pos = this.node.position
        // {position:v3(pos.x, pos.y+ 100)} , {easing:'linear'}
        tween(this.node).to(0.4, {position:v3(pos.x, pos.y+ 150)}, {easing:'sineOut'}).start();
        // this.node.setPosition(v3(pos.x, pos.y+ 150))
        regid.linearVelocity = v2(0, 0)

        // regid.linearVelocity.y = 0
        // console.log(this.node.position);

    }

    keyDown(event: EventKeyboard) {
        //按下键盘事件
        switch(event.keyCode) {
            case KeyCode.KEY_W:
                this.fly();
                // console.log("W");
                break;

        }
    }

    keyUp(event: EventKeyboard) {
        //按下键盘事件
        switch(event.keyCode) {
            case KeyCode.KEY_W:
                // console.log("W");
                break;

        }

    }
    onDestroy() {
        //销毁键盘事件
        input.off(Input.EventType.KEY_DOWN, this.keyDown, this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

