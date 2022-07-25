import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    start() {
        console.log("start");
    }

    update(deltaTime: number) {
        
    }
}

