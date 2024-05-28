class WebSocketService {
    private client: WebSocket;

    constructor(url: string) {
        this.client = new WebSocket(url);

        this.client.onopen = () => {
            console.log('WebSocket connection opened');
        };

        this.client.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.client.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    sendMessage(message: object) {
        if (this.client.readyState === WebSocket.OPEN) {
            this.client.send(JSON.stringify(message));
        } else {
            this.client.onopen = () => {
                this.client.send(JSON.stringify(message));
            };
        }
    }

    onMessage(callback: (data: any) => void) {
        this.client.onmessage = (event) => {
            callback(JSON.parse(event.data));
        };
    }

    isConnected(): boolean {
        return this.client.readyState === WebSocket.OPEN;
    }

    close() {
        this.client.close();
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

    joinRoom(name: string) {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name
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

    getUserList() {
        this.sendMessage({
            action: "onchat",
            data: {
                event: "GET_USER_LIST"
            }
        });
    }
}

export default WebSocketService;
