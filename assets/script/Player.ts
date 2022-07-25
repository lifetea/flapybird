import { _decorator, Component, Node, input, EventKeyboard, Input, NodeEventType, KeyCode, tween, v3, RigidBody2D, RigidBody, v2, AudioSource, AudioClip, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private audio: AudioSource

    @property({type: AudioClip})
    wingClip: AudioClip = null;

    @property({type: AudioClip})
    dieClip: AudioClip = null;


    onLoad() {
        console.log("加载了", this.wingClip);
        //声音播放
        this. audio = this.node.getComponent(AudioSource)
        //键盘事件
        input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
        input.on(Input.EventType.KEY_UP, this.keyUp, this);  
        
        //注册单个碰撞回调  
        let collider = this.getComponent(Collider2D);
        // console.log(collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        console.log("碰撞了");
        if(otherCollider.tag == 2 ){
            this.audio.playOneShot(this.dieClip, 1);
            // this.node.destroy();
        }
    }

    fly(){
        let regid = this.node.getComponent(RigidBody2D)
        let pos = this.node.position
        // {position:v3(pos.x, pos.y+ 100)} , {easing:'linear'}
        tween(this.node).to(0.4, {position:v3(pos.x, pos.y+ 150)}, {easing:'sineOut'}).start();
        // this.node.setPosition(v3(pos.x, pos.y+ 150))
        regid.linearVelocity = v2(0, 0)
        regid.gravityScale = 1
        
        // this.audio.playOneShot(this.wingClip, 1);
        // this.audio.playOneShot(this.wingClip, 0.8)
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

