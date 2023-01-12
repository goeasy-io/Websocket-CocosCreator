import { _decorator, Component, Prefab, instantiate, Node, Label, CCInteger, Vec3 } from "cc";
import { PlayerController } from "./PlayerController";
const { ccclass, property } = _decorator;

enum BlockType{
    BT_NONE,
    BT_STONE,
};

enum GameState{
    GS_INIT,
    GS_PLAYING,
    GS_RESTART
};

@ccclass("GameManager")
export class GameManager extends Component {

    @property({type: Prefab})
    public cubePrfb: Prefab|null = null;
    @property({type: CCInteger})
    public roadLength: Number = 50;
    private _road: BlockType[] = [];
    @property({type: Node})
    public startMenu: Node|null = null;
    @property({type: PlayerController})
    public playerCtrl: PlayerController|null = null;
    @property({type: Label})
    public stepsLabel: Label|null = null;

    start () {
        this.subscribe();
        this.curState = GameState.GS_INIT;
        this.playerCtrl?.node.on('JumpEnd', this.onPlayerJumpEnd, this);
    }

    subscribe() {
        window.goEasy.pubsub.subscribe({
            channel: 'PlayerStatus',
            onMessage: (message: any) => {
                switch (message.content) {
                    case 'RESTART':
                        this.curState = GameState.GS_RESTART;
                        break
                    case 'PLAYING':
                        this.curState = GameState.GS_PLAYING;
                        break
                }
            },
            onSuccess: () => {
                // console.log("监听成功");
            },
            onFailed: (error: any) => {
                console.log("订阅消息失败, code:" + error.code + ",错误信息:" + error.content);
            }
        })
    }

    sendMessage(status: String) {
        //发送消息
        let message = status;
        window.goEasy.pubsub.publish({
            channel: 'PlayerStatus',
            message: message,
            onSuccess: () => {
                // console.log("发送成功");
            },
            onFailed: (error: any) => {
                console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
            }
        });
    }

    init() {
        if (this.startMenu) {
            this.startMenu.active = false;
        }

        this.generateRoad();

        if (this.playerCtrl) {
            this.playerCtrl.node.setPosition(Vec3.ZERO);
            this.playerCtrl.reset();
        }
    }

    reStart() {
        if (this.startMenu) {
            this.startMenu.active = true;
        }

        this.generateRoad();

        if (this.playerCtrl) {
            this.playerCtrl.node.setPosition(Vec3.ZERO);
            this.playerCtrl.reset();
        }
    }

    set curState (value: GameState) {
        switch(value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                if (this.startMenu) {
                    this.startMenu.active = false;
                }

                if (this.stepsLabel) {
                    this.stepsLabel.string = '0';   // 将步数重置为0
                }

                break;
            case GameState.GS_RESTART:
                this.reStart();
                break;
        }
    }

    generateRoad() {
        this._road = [
            1, 0, 1, 1, 0, 1, 1, 1, 1, 0,
            1, 0, 1, 0, 1, 0, 1, 1, 1, 1,
            1, 0, 1, 0, 1, 1, 0, 1, 1, 0,
            1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
            1, 1, 0, 1, 0, 1, 1, 1, 0, 1
        ]

        let linkedBlocks = 0;
        for (let j = 0; j < this._road.length; j++) {
            if(this._road[j]) {
                ++linkedBlocks;
            }
            if(this._road[j] == 0) {
                if(linkedBlocks > 0) {
                    this.spawnBlockByCount(j - 1, linkedBlocks);
                    linkedBlocks = 0;
                }
            }
            if(this._road.length == j + 1) {
                if(linkedBlocks > 0) {
                    this.spawnBlockByCount(j, linkedBlocks);
                    linkedBlocks = 0;
                }
            }
        }
    }

    spawnBlockByCount(lastPos: number, count: number) {
        let block: Node|null = this.spawnBlockByType(BlockType.BT_STONE);
        if(block) {
            this.node.addChild(block);
            block?.setScale(count, 1, 1);
            block?.setPosition(lastPos - (count - 1) * 0.5, -1.5, 0);
        }
    }

    spawnBlockByType(type: BlockType) {
        if (!this.cubePrfb) {
            return null;
        }

        let block: Node|null = null;
        switch(type) {
            case BlockType.BT_STONE:
                block = instantiate(this.cubePrfb);
                break;
        }

        return block;
    }

    onStartButtonClicked() {
        this.sendMessage('PLAYING');
    }

    checkResult(moveIndex: number) {
        if (moveIndex < this.roadLength) {
            if (this._road[moveIndex] == BlockType.BT_NONE) {
                //跳到了空方块上
                this.sendMessage('RESTART');
            }
        } else {
            // 跳过了最大长度
            this.sendMessage('RESTART');
        }
    }

    onPlayerJumpEnd(moveIndex: number) {
        if (this.stepsLabel) {
            this.stepsLabel.string = '' + (moveIndex >= this.roadLength ? this.roadLength : moveIndex);
        }
        this.checkResult(moveIndex);
    }

}
