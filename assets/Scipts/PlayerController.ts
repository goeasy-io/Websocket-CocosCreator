import { _decorator, Component, Vec3, systemEvent, SystemEvent, EventMouse, Animation, SkeletalAnimation } from "cc";
const { ccclass, property } = _decorator;
import GoEasy from 'goeasy';

const goEasy = GoEasy.getInstance({
    host: "hangzhou.goeasy.io",
    appkey: "BC-xxx",
    modules: ['pubsub']
});

window.GoEasy = GoEasy;
window.goEasy = goEasy;

@ccclass("PlayerController")
export class PlayerController extends Component {

    @property({ type: Animation })
    public BodyAnim: Animation | null = null;

    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0;
    private _jumpTime: number = 0.3;
    private _curJumpSpeed: number = 0;
    private _curPos: Vec3 = new Vec3();
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _targetPos: Vec3 = new Vec3();
    private _curMoveIndex = 0;

    start() {
        goEasy.connect({
            id: 'player',
            data: {},
            onSuccess: () => {
                console.log("GoEasy connect successfully.");
                this.subscribe();
            },
            onFailed: (error) => {
                console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
            },
            onProgress: (attempts) => {
                console.log("GoEasy is connecting", attempts);
            }
        });
    }

    onClickButton(event: any) {
        if (event.currentTarget._name === "LeftButton") {
            this.sendMessage(1);
        } else if (event.currentTarget._name === "RightButton") {
            this.sendMessage(2);
        }
    }

    subscribe() {
        goEasy.pubsub.subscribe({
            channel: 'mindYourStep',
            onMessage: (message: any) => {
                let content = JSON.parse(message.content);
                this.jumpByStep(content.step);
            },
            onSuccess: () => {
                // console.log("监听新消息成功");
            },
            onFailed: (error: any) => {
                console.log("订阅消息失败, code:" + error.code + ",错误信息:" + error.content);
            }
        })
    }

    sendMessage(step: any) {
        let message = {
            step: step,
        };
        goEasy.pubsub.publish({
            channel: 'mindYourStep',
            message: JSON.stringify(message),
            onSuccess: () => {
                // console.log("发送成功");
            },
            onFailed: (error: any) => {
                console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
            }
        });
    }

    reset() {
        this._curMoveIndex = 0;
    }

    jumpByStep(step: number) {
        if (this._startJump) {
            return;
        }
        this._startJump = true;
        this._jumpStep = step;
        this._curJumpTime = 0;
        this._curJumpSpeed = this._jumpStep / this._jumpTime;
        this.node.getPosition(this._curPos);
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0));

        if (this.BodyAnim) {
            if (step === 1) {
                this.BodyAnim.play('oneStep');
            } else if (step === 2) {
                this.BodyAnim.play('twoStep');
            }
        }

        this._curMoveIndex += step;
    }

    onOnceJumpEnd() {
        if (this.BodyAnim) {
            this.BodyAnim.play('cocos_anim_idle');
        }

        this.node.emit('JumpEnd', this._curMoveIndex);
    }

    update(deltaTime: number) {
        if (this._startJump) {
            this._curJumpTime += deltaTime;
            if (this._curJumpTime > this._jumpTime) {
                // end
                this.node.setPosition(this._targetPos);
                this._startJump = false;
                this.onOnceJumpEnd();
            } else {
                // tween
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
        }
    }
}
