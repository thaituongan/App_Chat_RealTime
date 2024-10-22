import {getReLoginCode, getUsername} from '../untils/localStorageUtils';

class WebSocketService {
    private client: WebSocket | null = null;
    private url: string;
    private messageListeners: ((data: any) => void)[] = [];
    private eventHandlers: { [key: string]: (data: any) => void } = {};

    constructor(url: string) {
        this.url = url;
        this.createConnection();
    }

    private createConnection() {
        this.client = new WebSocket(this.url);

        this.client.onopen = () => {
            console.log('WebSocket connection opened');
            const reloginCode = getReLoginCode();
            const userReload = getUsername();
            console.log(`Relogin attempt: username=${userReload}, code=${reloginCode}`);
            if (reloginCode && userReload) {
                this.reLogin(userReload, reloginCode);
            }
        };
        this.client.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.client.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message:', data);
            const handler = this.eventHandlers[data.event];
            if (handler) {
                handler(data);
            }
            this.messageListeners.forEach((listener) => listener(data));
        };
    }

    sendMessage(message: object) {
        if (this.client && this.client.readyState === WebSocket.OPEN) {
            this.client.send(JSON.stringify(message));
        } else {
            console.log("WebSocket is not open, attempting to resend...");
            this.client?.close();
            this.createConnection();
            this.client!.onopen = () => {
                this.client!.send(JSON.stringify(message));
            };
        }
    }

    onMessage(callback: (data: any) => void) {
        if (this.client) {
            this.messageListeners.push(callback);
        }
    }

    isConnected(): boolean {
        return this.client ? this.client.readyState === WebSocket.OPEN : false;
    }

    close() {
        this.client?.close();
    }

    register(user: string, pass: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "REGISTER",
                data: {
                    user,
                    pass
                }
            }
        });
    }

    login(user: string, pass: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user,
                    pass
                }
            }
        });
    }

    reLogin(user: string, code: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "RE_LOGIN",
                data: {
                    user,
                    code
                }
            }
        });
    }

    logout() {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "LOGOUT"
            }
        });
    }

    getPeopleChatMessages(name: string, page: number) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name,
                    page
                }
            }
        });
    }

    sendChatMessage(type: string, to: string, mes: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type,
                    to,
                    mes
                }
            }
        });
    }

    checkUser(user: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "CHECK_USER",
                data: {
                    user
                }
            }
        });
    }

    getRoomChatMessages(name: string, page: number) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "GET_ROOM_CHAT_MES",
                data: {
                    name,
                    page
                }
            }
        });
    }

    createRoom(name: string, onSuccess: () => void, onError: (error: any) => void) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name
                }
            }
        });

        this.onMessage((data: any) => {
            if (data.event === "CREATE_ROOM") {
                if (data.status === "success") {
                    onSuccess();
                } else {
                    onError(data);
                }
            }
        });
    }

    joinRoom(roomName: string, onSuccess: () => void, onError: (error: any) => void) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: { name: roomName }
            }
        });

        this.onMessage((data: any) => {
            if (data.event === "JOIN_ROOM") {
                if (data.status === "success") {
                    onSuccess();
                } else {
                    onError(data);
                }
            }
        });
    }

    getUserList() {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "GET_USER_LIST",
            }
        });
    }
}

export default WebSocketService;

