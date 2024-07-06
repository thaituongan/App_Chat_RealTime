class WebSocketService {
    private client: WebSocket | null = null;
    private url: string;
    private reconnectHandlers: (() => void)[] = [];

    constructor(url: string) {
        this.url = url;
        this.createConnection();  // Khởi tạo kết nối ngay khi tạo đối tượng
    }

    //tao ket noi qua websocket
    private createConnection() {
        this.client = new WebSocket(this.url);

        this.client.onopen = () => {
            console.log('WebSocket connection opened');
        };

        this.client.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // this.client.onerror = (error) => {
        //     console.error('WebSocket error:', error);
        // };
    }
    //ham gui tin nhan
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


    //ham xu li tin nhan nhan duoc
    onMessage(callback: (data: any) => void) {
        if (this.client) {
            this.client.onmessage = (event) => {
                callback(JSON.parse(event.data));
            };
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
    //kiem tra nguoi dung co online hay khong
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
    //lay ra tin nhan tu nhom
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
    //tao phong chat moi
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
    //tham gia vao phong chat
    joinRoom(roomName: string) {
        const message = {
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: { name: roomName }
            }
        };
        this.sendMessage(message);
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
