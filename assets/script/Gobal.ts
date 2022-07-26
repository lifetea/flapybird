import { _decorator, Component, Node, NodePool, Prefab, instantiate, resources, director, Vec3, RigidBody2D } from 'cc';
import { Game } from './Game';
// import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('Global')
export class Global{
    private static instance: Global;
    
    //水管回收池
    pipePool:NodePool

    //敌人回收池
    // enemyPool:NodePool

    // //敌人2回收池
    // enemy2Pool:NodePool

    // //敌人3回收池
    // enemy3Pool:NodePool
    
    // //道具1回收池
    // prop1Pool:NodePool

    public isPause:Boolean = true

    public isGameOver:Boolean = true

    public lastPipe:Node = null

    public score:number = 0

    private game:Game = null

    // public index:number = 1

    private pipePrefab:Prefab = null

    private constructor() {
        this.pipePool = new NodePool()
        // this.enemyPool = new NodePool()
        // this.enemy2Pool = new NodePool()
        // this.enemy3Pool = new NodePool()
        // this.prop1Pool = new NodePool()
        resources.load("/prefab/pipe", Prefab, (err, prefab) => {
            this.pipePrefab = prefab
        });
    }

    public setGame(game:Node){
        this.game = game.getComponent(Game)
    }

    public getGame(){
        return this.game
    }

    // 初始化实例
    public static getInstance(){
        if (!Global.instance) {
            Global.instance = new Global();
          }
          return Global.instance;
    }

    // addScore(score:number){
    //     this.score += score
    // }
    // 生成水管
    public createPipe(prefab:Prefab = null):Node{
        let pipe:Node = null
        // 水管 层
        // let parent = director.getScene().getChildByPath('Canvas/bg')
        // console.log(this.bulletPool.size(), this.enemyPool.size())
        if(this.pipePool.size() > 0){
            pipe = this.pipePool.get()
        } else {
            pipe = instantiate(this.pipePrefab)
        }
        this.lastPipe = pipe
        return pipe
        // parent.addChild(prop);
        // prop.setPosition(pos)
    }

    public getLatestPipe():Node{
        return this.lastPipe
    }

    // 回收水管
    public recyclePipe(node:Node){
        this.pipePool.put(node)
    }

    // // 生成子弹
    // public createBullet(pre:Prefab){
    //     let bullet = null
    //     // console.log(this.bulletPool.size(), this.enemyPool.size())
    //     if(this.bulletPool.size() > 0){
    //         bullet = this.bulletPool.get()
    //     } else {
    //         bullet = instantiate(pre)
    //     }
    //     return bullet
    // }
    
    // // 回收子弹
    // public recycleBullet(node:Node){
    //     this.bulletPool.put(node)
    // }


    // // 生成敌机
    // public createEnemy(pre:Prefab, parent:Node, x:number, type:number){
    //     if(this.isPuase == true)
    //         return null
    //     let enemy = null
    //     let pool = null
    //     switch(type){
    //         case 1:
    //             pool = this.enemyPool
    //             break
    //         case 2:
    //             pool = this.enemy2Pool
    //             break
    //         case 3:
    //             pool = this.enemy3Pool
    //             break
    //     }
    //     if(pool.size() > 0){
    //         enemy = pool.get()
    //     } else {
    //         enemy = instantiate(pre)
    //     }
    //     if(enemy != null){
    //         // console.log('生成敌机')
    //         parent.insertChild(enemy, 2)
    //         enemy.setPosition(x, 860)
    //         enemy.getComponent(Enemy).hp = enemy.getComponent(Enemy).MaxHP
    //         this.index += 1
    //     }
    // }

    // // 回收敌击
    // public recycleEnemy(node:Node){
    //     // console.log('回收敌机')
    //     // 恢复敌机类型
    //     let type =  node.getComponent(Enemy).type
    //     switch(type){
    //         case 1:
    //             this.enemyPool.put(node)
    //             break
    //         case 2:
    //             this.enemy2Pool.put(node)
    //             break
    //         case 3:
    //             this.enemy3Pool.put(node)
    //             break
    //     }
    // }

}