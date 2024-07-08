import {clearReLoginCode} from '../untils/localStorageUtils';


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
        };

        this.client.onclose = () => {
            console.log('WebSocket connection closed');
            clearReLoginCode();
        };

        this.client.onmessage = (event) => {
            const data = JSON.parse(event.data);
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
        this.createConnection();
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
        this.close();
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

    createRoom(name: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name
                }
            }
        });
    }

    joinRoom(roomName: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: { name: roomName }
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

    setEventHandler(event: string, handler: (data: any) => void) {
        this.eventHandlers[event] = handler;
    }
}

export default WebSocketService;
