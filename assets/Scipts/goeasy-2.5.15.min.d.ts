export declare class CustomerStatus {
    status: string;
    sessionId?: number;
    start?: number;
    agent?: User;
}
export declare enum MediaType {
    VIDEO = "VIDEO",
    VOICE = "VOICE"
}
export declare enum ImApiEvents {
    PRIVATE_MESSAGE_RECEIVED = "PRIVATE_MESSAGE_RECEIVED",
    GROUP_MESSAGE_RECEIVED = "GROUP_MESSAGE_RECEIVED",
    SYSTEM_MESSAGE_RECEIVED = "SYSTEM_MESSAGE_RECEIVED",
    CONVERSATIONS_UPDATED = "CONVERSATIONS_UPDATED",
    USER_PRESENCE = "USER_PRESENCE",
    GROUP_PRESENCE = "GROUP_PRESENCE",
    MESSAGE_DELETED = "MESSAGE_DELETED",
    MESSAGE_READ = "MESSAGE_READ",
    MESSAGE_RECALLED = "MESSAGE_RECALLED",
    CS_MESSAGE_RECEIVED = "CS_MESSAGE_RECEIVED",
    PENDING_CONVERSATIONS_UPDATED = "PENDING_CONVERSATIONS_UPDATED"
}
export interface GoEasyOptions {
    host: string;
    appkey: string;
    modules: Array<string>;
    forceTLS?: boolean;
    supportOldBrowser?: boolean;
    allowNotification?: boolean;
}
export declare abstract class CallBackOptions {
    onSuccess?(result?: any): void;
    onFailed?(errInfo?: any): void;
}
export interface ConnectOptions extends CallBackOptions {
    id?: string | number;
    data: string | any;
    otp?: string;
    wxmpId?: {
        appid: string;
        openid: string;
    };
    onProgress?(progress: number): void;
}
export interface PresenceEvent<T> {
    action: string;
    time: number;
    data: T;
    id: string;
}
export interface PresenceEvents<T> {
    channel: string;
    clientAmount: number;
    events: PresenceEvent<T>[];
    userAmount: number;
}
export declare type IMEvent = keyof typeof ImApiEvents;
export declare type MessageCallback = (message: any) => void;
export interface PublishOptions extends CallBackOptions {
    channel: string;
    message: string;
    accessToken?: string;
    notification?: {
        title: string;
        body: string;
    };
    wxmpTemplateMsg?: WxmpTemplateMsg;
}
export interface LiveSessionOptions extends CallBackOptions {
    customerId: string;
    onNewMessage: Function;
    onStatusUpdated: Function;
}
export interface ListenCustomerOptions extends CallBackOptions {
    id: string;
    onNewMessage: Function;
    onStatusUpdated: Function;
}
export interface WxmpTemplateMsg {
    template_id: string;
    url: string;
    miniprogram: {
        appid: string;
        pagepath: string;
    };
    data: object;
}
export interface SubscribeOptions extends CallBackOptions {
    channel?: string;
    channels?: string[];
    accessToken?: string;
    onMessage(message: {
        channel: string;
        content: string;
    }): void;
}
export interface UnsubscribeOptions extends CallBackOptions {
    channel: string;
}
export interface SubscribePresenceOptions extends CallBackOptions {
    channel?: string;
    channels?: string[];
    onPresence<T = any>(presenceEvents: PresenceEvents<T>): void;
}
export interface UnsubscribePresenceOptions extends CallBackOptions {
    channel: string;
}
export interface HistoryOptions extends CallBackOptions {
    channel: string;
    limit: number;
    onSuccess(results: {
        code: number;
        content: {
            messages: Array<{
                time: number;
                content: string;
            }>;
        };
    }): void;
}
export interface HereNowOptions extends CallBackOptions {
    channels: string[];
    includeUsers?: boolean;
    distinct?: boolean;
    onSuccess(results: {
        code: number;
        content: {
            channels: {
                [key: string]: {
                    channel: string;
                    clientAmount: number;
                    userAmount: number;
                    users: any[];
                };
            };
        };
    }): void;
}
export interface HereNowByUserIdsOptions extends CallBackOptions {
    userIds: string[];
    distinct?: boolean;
    onSuccess(results: {
        code: number;
        content: Array<{
            id: string;
            data: any;
        }>;
    }): void;
}
export declare enum Scene {
    PRIVATE = "private",
    GROUP = "group",
    SYSTEM = "system",
    CS = "cs"
}
export interface To {
    type: Scene;
    id: string;
    data: any;
}
export interface MessageCreateOptions extends CallBackOptions {
    to: To;
    notification?: {
        title: string;
        body: string;
    };
    onProgress?: Function;
    wxmpTemplateMsg?: WxmpTemplateMsg;
}
export interface TextMessageCreateOptions extends MessageCreateOptions {
    text: string;
}
export interface FileMessageCreateOptions extends MessageCreateOptions {
    file: any;
}
export interface CustomMessageCreateOptions extends MessageCreateOptions {
    type: string;
    payload: any;
}
export interface IMHistoryQueryOptions extends CallBackOptions {
    id?: string;
    type?: Scene;
    userId?: string;
    groupId?: string;
    lastTimestamp?: number;
    limit?: number;
}
export interface UploadOptions extends CallBackOptions {
    file: File;
    name: string;
    onProgress(progress: ProgressEvent<EventTarget>): void;
}
export interface MessageSendOptions extends CallBackOptions {
    message: IMMessage;
    accessToken?: string;
}
export interface MarkGroupMessageAsReadOptions extends CallBackOptions {
    groupId: string;
}
export interface MarkPrivateMessageAsReadOptions extends CallBackOptions {
    userId: string;
}
export interface LatestConversationsOptions extends CallBackOptions {
    onSuccess(result: {
        code: number;
        content: {
            unreadTotal: number;
            conversations: ConversationDTO[];
        };
    }): void;
}
export interface PrivateConversationRemoveOptions extends CallBackOptions {
    userId: string;
}
export interface GroupConversationRemoveOptions extends CallBackOptions {
    groupId: string;
}
export interface PrivateConversationTopOptions extends CallBackOptions {
    userId: string;
    top: boolean;
}
export interface GroupConversationTopOptions extends CallBackOptions {
    groupId: string;
    top: boolean;
}
export interface ConversationTopOptions extends CallBackOptions {
    conversation: ConversationDTO;
    top: boolean;
}
export interface ConversationRemoveOptions extends CallBackOptions {
    conversation: ConversationDTO;
}
export interface SubscribeUserPresenceOptions extends CallBackOptions {
    userIds: string[];
}
export interface UnsubscribeUserPresenceOptions extends CallBackOptions {
    userId: string;
}
export interface IMHereNowOptions extends CallBackOptions {
    userIds: string[];
}
export interface SubscribeGroupOptions extends CallBackOptions {
    groupIds: string[];
    accessToken?: string;
}
export interface UnsubscribeGroupOptions extends CallBackOptions {
    groupId: string;
}
export interface SubscribeGroupPresenceOptions extends CallBackOptions {
    groupIds: string[];
}
export interface UnsubscribeGroupPresenceOptions extends CallBackOptions {
    groupId: string;
}
export interface GroupHereNowOptions extends CallBackOptions {
    groupId: string;
    onSuccess(result: {
        code: number;
        content: Array<{
            id: string;
            data: any;
        }>;
    }): void;
}
export interface GroupOnlineCountOptions extends CallBackOptions {
    groupId: string;
}
export interface MessageRecallOptions extends CallBackOptions {
    messages: Array<IMMessage>;
}
export interface MessageDeleteOptions extends CallBackOptions {
    messages: Array<IMMessage>;
}
export interface IMMessage {
    type: string;
    senderData?: string;
    read?: boolean;
    recalled: boolean;
    receiverId?: string;
    teamId?: string;
    to?: string;
    groupId?: string;
    timestamp?: number;
    senderId: string;
    payload: IAbstractMessagePayload;
    messageId: string;
    status: MessageStatus;
}
export interface IAbstractMessagePayload {
}
export interface ITextMessagePayload extends IAbstractMessagePayload {
    text: string;
}
export interface IVideoMessagePayload extends IAbstractMessagePayload {
    video: IGoEasyVideo;
    thumbnail: IGoEasyThumbnail;
}
export interface IGoEasyThumbnail {
    name: string;
    url: string;
    width: number;
    height: number;
    contentType: string;
}
export interface IGoEasyVideo {
    name: string;
    url: string;
    width: number;
    height: number;
    contentType: string;
    size: number;
    duration: number;
}
export interface IFileMessagePayload extends IAbstractMessagePayload {
    url: string;
    size: number;
    name: string;
    contentType: string;
}
export interface IImageMessagePayload extends IFileMessagePayload {
    width: number;
    height: number;
}
export interface IAudioMessagePayload extends IFileMessagePayload {
    duration: number;
}
export declare enum MessageStatus {
    NEW = "new",
    SENDING = "sending",
    SUCCESS = "success",
    FAIL = "fail"
}
export declare class ConversationDTO {
    id: string;
    type: string;
    groupId: string;
    userId: string;
    teamId?: string;
    data: object;
    unread: number;
    lastMessage: IMMessage;
    top: boolean;
    ended?: boolean;
}
export interface MarkAsReadOptions extends CallBackOptions {
    id: string;
    type: Scene;
}
export declare class AgentOnlineOptions extends CallBackOptions {
    teamData: object;
    agentData: object;
}
export declare class User {
    id: string;
    data?: any;
    constructor(id: string, data?: any);
}
export declare class CustomerStatusOptions extends CallBackOptions {
    id: string;
    onUpdated?(status: CustomerStatus): void;
}
export declare class GoEasyPubSub {
    constructor(options: GoEasyOptions);
    initialGoEasySocket(): void;
    initialBeforeConnect(): void;
    publish(options: PublishOptions): void;
    subscribe(options: SubscribeOptions): void;
    unsubscribe(options: UnsubscribeOptions): void;
    subscribePresence(options: SubscribePresenceOptions): void;
    unsubscribePresence(options: UnsubscribePresenceOptions): void;
    history(options: HistoryOptions): void;
    hereNow(options: HereNowOptions): void;
    hereNowByUserIds(options: HereNowByUserIdsOptions): void;
}
export declare class GoEasyIM {
    constructor(options: GoEasyOptions);
    afterConnect(): void;
    on(event: IMEvent, callBack: MessageCallback): void;
    off(event: IMEvent, callBack: MessageCallback): void;
    createTextMessage(createOptions: TextMessageCreateOptions): IMMessage;
    createImageMessage(createOptions: FileMessageCreateOptions): IMMessage;
    createFileMessage(createOptions: FileMessageCreateOptions): IMMessage;
    createAudioMessage(createOptions: FileMessageCreateOptions): IMMessage;
    createVideoMessage(createOptions: FileMessageCreateOptions): IMMessage;
    createCustomMessage(createOptions: CustomMessageCreateOptions): IMMessage;
    sendMessage(sendOptions: MessageSendOptions): void;
    recallMessage(messageRecallOptions: MessageRecallOptions): void;
    deleteMessage(messageDeleteOptions: MessageDeleteOptions): void;
    markGroupMessageAsRead(options: MarkGroupMessageAsReadOptions): void;
    markPrivateMessageAsRead(options: MarkPrivateMessageAsReadOptions): void;
    latestConversations(options: LatestConversationsOptions): void;
    removePrivateConversation(options: PrivateConversationRemoveOptions): void;
    removeGroupConversation(options: GroupConversationRemoveOptions): void;
    topPrivateConversation(options: PrivateConversationTopOptions): void;
    topGroupConversation(options: GroupConversationTopOptions): void;
    history(options: IMHistoryQueryOptions): void;
    subscribeUserPresence(options: SubscribeUserPresenceOptions): void;
    unsubscribeUserPresence(options: UnsubscribeUserPresenceOptions): void;
    hereNow(options: IMHereNowOptions): void;
    subscribeGroup(options: SubscribeGroupOptions): void;
    unsubscribeGroup(options: UnsubscribeGroupOptions): void;
    subscribeGroupPresence(options: SubscribeGroupPresenceOptions): void;
    unsubscribeGroupPresence(options: UnsubscribeGroupPresenceOptions): void;
    groupHereNow(options: GroupHereNowOptions): void;
    groupOnlineCount(options: GroupOnlineCountOptions): void;
    markMessageAsRead(options: MarkAsReadOptions): void;
    csteam(teamId: string): CSTeam;
    pendingConversations(options: LatestConversationsOptions): void;
    topConversation(options: ConversationTopOptions): void;
    removeConversation(options: ConversationRemoveOptions): void;
}
export default class GoEasy {
    static instance: GoEasy;
    static readonly version: string;
    static readonly IM_EVENT: typeof ImApiEvents;
    static readonly IM_SCENE: typeof Scene;
    static readonly MEDIA_TYPE: typeof MediaType;
    readonly im: GoEasyIM;
    readonly pubsub: GoEasyPubSub;
    private goEasySocket;
    private options;
    private constructor();
    static getInstance(options: GoEasyOptions): GoEasy;
    connect(options: ConnectOptions): void;
    disconnect(options: CallBackOptions): void;
    getConnectionStatus(): string;
    private validateOptions;
    onClickNotification(clickHandler: MessageCallback): void;
    private confirmUserId;
}
export interface CallOptions extends CallBackOptions {
    to: {
        type: Scene;
        id: string;
        data: object;
        users?: Array<{
            id: string;
            data: object;
        }>;
    };
    mediaType: MediaType;
    notification?: {
        title: string;
        body: string;
    };
}
export interface CSAcceptOptions extends CallBackOptions {
    customer: User;
}
export interface CSEndOptions extends CallBackOptions {
    id: string;
}
export interface CSTransferOptions extends CallBackOptions {
    customerId: string;
    agentId: string;
}
export declare class CSTeam {
    private id;
    constructor(id: string);
    isOnline(options: CallBackOptions): void;
    online(options: AgentOnlineOptions): void;
    offline(options: CallBackOptions): void;
    customerStatus(options: CustomerStatusOptions): void;
    accept(options: CSAcceptOptions): void;
    end(options: CSEndOptions): void;
    history(options: IMHistoryQueryOptions): void;
    markMessageAsRead(options: MarkAsReadOptions): void;
    createTextMessage(options: TextMessageCreateOptions): void;
    createImageMessage(options: FileMessageCreateOptions): void;
    createFileMessage(options: FileMessageCreateOptions): void;
    createAudioMessage(options: FileMessageCreateOptions): void;
    createVideoMessage(options: FileMessageCreateOptions): void;
    createCustomMessage(options: CustomMessageCreateOptions): void;
    transfer(options: CSTransferOptions): void;
    agents(options: CallBackOptions): void;
    liveSession(options: LiveSessionOptions): void;
    quitLiveSession(options: CallBackOptions): void;
    listenCustomer(options: ListenCustomerOptions): void;
    cancelListenCustomer(options: CallBackOptions): void;
}
