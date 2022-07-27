import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Prefab, director, math, v2, Scene, v3, Label, RigidBody2D, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
import { Global } from './Gobal';
import { Pipe } from './Pipe';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    private global:Global = Global.getInstance()

    @property({ type: Node })
    player: Node = null;

    @property({ type: Label })
    scoreLabel: Label = null;


    @property({ type: Prefab })
    pipePrefab: Prefab = null;

    private overGameNode: Scene = null;

    createRandPipe() {
        if(this.global.isGameOver == true || this.global.isPause == true) {
            return;
        }
        let x = 240;
        let y = math.randomRangeInt(-60, 60)
        let lastPipe = this.global.getLatestPipe();
        let pipe = this.global.createPipe(this.pipePrefab);
        let parent = director.getScene().getChildByPath('Canvas/bg')
        parent.insertChild(pipe, 2);
        if(lastPipe && lastPipe.position.x > -0) {
            x = lastPipe.position.x + math.randomRangeInt(140, 240);
        }
        pipe.getComponent(Pipe).setRand();
        pipe.setPosition(x, y);
        // console.log(pipe2.position);
        // pipe.getComponent(RigidBody2D).enabled = true;

    }

    refreshScore() {
        // console.log("refreshScore", this.scoreLabel);
        this.scoreLabel.string = this.global.score.toString();
    }

    startGame() {
        this.global.isGameOver = false;
        this.global.isPause = false;
        this.global.score = 0; 
        this.player.getComponent(Player).init();
        let startGame = director.getScene().getChildByPath('Canvas/startGame')
        startGame.active = false;
        this.scoreLabel.node.active = true;
    }

    backHome(){
        let startGame = director.getScene().getChildByPath('Canvas/startGame')
        startGame.active = true;
        let overGame = director.getScene().getChildByPath('Canvas/gameover')
        overGame.active = false
        this.player.getComponent(Player).reset();
        this.recycleAll();
        this.global.score = 0; 
        this.refreshScore();
        this.scoreLabel.node.active = false;
    }

    overGame() {
        let overGame = director.getScene().getChildByPath('Canvas/gameover')
        overGame.active = true
        this.global.isGameOver = true;

        // this.global.isPause = false;
        
        // let startGame = director.getScene().getChildByPath('Canvas/startGame')
        // startGame.active = false;
    }

    // 回收所有水管
    public recycleAll(){
        let parent = this.node.getChildByName('bg')
        parent.children.forEach(element => {
            if(element.name == 'pipe'){
                // console.log('回收敌机', element)
                element.setPosition(-600, 0)
            }
        })
    }


    onLoad() {
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        // EPhysics2DDrawFlags.Pair |
        // EPhysics2DDrawFlags.CenterOfMass |
        // EPhysics2DDrawFlags.Joint |
        // EPhysics2DDrawFlags.Shape;
        this.overGameNode = director.getScene().getChildByPath('Canvas/gameover')
        this.overGameNode.active = false
        this.scoreLabel.node.active = false;
        this.global.setGame(this.node);
        this.schedule(function(){
            // console.log("schedule");
            this.createRandPipe()
        }, 1);
        // input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
    }
    start() {
        console.log("start");
    }

    update(deltaTime: number) {
        
    }
}

