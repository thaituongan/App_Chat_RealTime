class WebSocketService {
    constructor() {
        this.client = null;
        this.messageQueue = [];
        this.isConnected = false;
    }

    connect() {
        this.client = new WebSocket('ws://140.238.54.136:8080/chat/chat');

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

    register(user, pass) {
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

    login(user, pass) {
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

    reLogin(user, code) {
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

    createRoom(name) {
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

    joinRoom(name) {
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

    getRoomChatMessages(name, page) {
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

    getPeopleChatMessages(name, page) {
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

    sendChatMessage(type, to, mes) {
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

    checkUser(user) {
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

    sendMessage(message) {
        if (this.client && this.client.readyState === WebSocket.OPEN) {
            this.client.send(JSON.stringify(message));
        } else {
            this.client.onopen = () => {
                this.client.send(JSON.stringify(message));
            };
        }
    }

    onMessage(callback) {
        this.client.onmessage = (event) => {
            callback(JSON.parse(event.data));
        };
    }
}

export default new WebSocketService();
