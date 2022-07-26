import { _decorator, Component, Node, Collider2D, IPhysics2DContact, Contact2DType, RigidBody2D, PhysicsSystem2D, Vec3, v3 } from 'cc';
import { Global } from './Gobal';
const { ccclass, property } = _decorator;

@ccclass('Pipe')

export class Pipe extends Component {

    private global:Global = Global.getInstance()

    start() {
        this.schedule(this.move, 0.01);
    }

    move(){
        if(this.global.isPause || this.global.isGameOver){
            return;
        }
        let pos = this.node.position;
        if(pos.x < -300) {
        // this.node.getComponent(RigidBody2D).enabled = false;
            // console.log('回收');
            this.global.recyclePipe(this.node);
        } else {
            this.node.setPosition(pos.x - 3, pos.y);
        }
    }

    onLoad() {

    }

    update(deltaTime: number) {
        let pos:Vec3 =this.node.getWorldPosition()

        let pipe2 = this.node.getChildByName('pipe2');
        let pos2 = pipe2.getWorldPosition();
        pipe2.setWorldPosition(v3(pos.x, pos2.y, pos2.z));

        let pipe1 = this.node.getChildByName('pipe1');
        let pos1 = pipe1.getWorldPosition();
        pipe1.setWorldPosition(v3(pos.x, pos1.y, pos1.z));

        let pipe3 = this.node.getChildByName('pipe3');
        let pos3 = pipe3.getWorldPosition();
        pipe3.setWorldPosition(v3(pos.x + 20, pos3.y, pos3.z));

        // this.node.getWor
    }
}

