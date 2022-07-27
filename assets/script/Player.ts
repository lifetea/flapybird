import { _decorator, Component, Animation, Node, input, EventKeyboard, Input, NodeEventType, KeyCode, tween,
     v3, RigidBody2D, RigidBody, v2, AudioSource, AudioClip, Collider2D, Contact2DType, IPhysics2DContact, physics, ERigidBody2DType } from 'cc';
import { Global } from './Gobal';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private audio: AudioSource

    @property({type: AudioClip})
    wingClip: AudioClip = null;

    @property({type: AudioClip})
    dieClip: AudioClip = null;

    @property({type: AudioClip})
    pointClip: AudioClip = null;

    private global:Global = Global.getInstance()

    private animate: Animation;

    private rigidBody: RigidBody2D;

    onLoad() {
        //声音播放
        this. audio = this.node.getComponent(AudioSource)
        // 动画播放
        this.animate = this.node.getComponent(Animation)
        //键盘事件
        input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
        input.on(Input.EventType.KEY_UP, this.keyUp, this);  
        //点击事件
        input.on(Input.EventType.TOUCH_START, this.fly, this);
        // 初始化刚体
        this.rigidBody = this.node.getComponent(RigidBody2D)
        this.rigidBody.type = ERigidBody2DType.Static
        //注册单个碰撞回调  
        let collider = this.getComponent(Collider2D);
        // console.log(collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    reset(){
        this.node.setPosition(0, 0)
        this.rigidBody.linearVelocity = v2(0, 0)
        this.rigidBody.angularVelocity = 0
        this.rigidBody.type = ERigidBody2DType.Static
        this.animate.play('bird')
    }

    init() {
        this.rigidBody.type = ERigidBody2DType.Dynamic
    }

    gainScore(){
        this.audio.playOneShot(this.pointClip, 1);
        this.global.score += 1
        this.global.getGame().refreshScore()
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.tag == 1 ){
            // console.log("通过管道");
            contact.disabled = true;
            this.gainScore();
            // this.node.destroy();
        }
        if(otherCollider.tag == 2 ){
            // console.log("碰到管道");
            this.die()
            // this.node.destroy();
        }

    }
    // 飞行
    fly(){
        if(this.global.isGameOver || this.global.isPause){
            return
        }
        let pos = this.node.position
        // {position:v3(pos.x, pos.y+ 100)} , {easing:'linear'}
        tween(this.node).to(0.4, {position:v3(pos.x, pos.y+ 80)}, {easing:'sineOut'}).start();
        // this.node.setPosition(v3(pos.x, pos.y+ 150))
        this.rigidBody.linearVelocity = v2(0, -4)
        this.rigidBody.gravityScale = 0.6
        this.audio.playOneShot(this.wingClip, 1);
        // regid.linearVelocity.y = 0
        // console.log(this.node.position);

    }
    // 死亡
    die(){
        this.audio.playOneShot(this.dieClip, 1);
        this.animate.stop()
        // 初始化刚体
        // this.rigidBody = this.node.getComponent(RigidBody2D)
        // this.rigidBody.type = ERigidBody2DType.Static
        this.global.getGame().overGame()
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
        input.off(Input.EventType.KEY_UP, this.keyUp, this);
        input.off(Input.EventType.TOUCH_START, this.touchStart, this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

