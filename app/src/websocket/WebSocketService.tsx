class WebSocketService {
    private client: WebSocket | null = null;
    private url: string;
    public reLoginCode: string | null = null;
    private user: string | null = null;
    private pass: string | null = null;
    private reconnectTimeout: number | null = null;

    constructor(url: string) {
        this.url = url;
        this.createConnection();
    }

    public setReLoginCode(code: string | null) {
        this.reLoginCode = code;
    }

    public setUser(user: string | null) {
        this.user = user;
    }

    private createConnection() {
        this.client = new WebSocket(this.url);

        this.client.onopen = () => {
            console.log('WebSocket connection opened');
            if (this.reLoginCode && this.user) {
                this.reLogin(this.user, this.reLoginCode);
                console.log('Re-login with code:', this.reLoginCode);
            }
        };

        this.client.onclose = () => {
            console.log('WebSocket connection closed');
            this.reconnectTimeout = window.setTimeout(() => this.createConnection(), 3000); // Retry connection after 3 seconds
        };


        this.client.onerror = (error) => {
            console.error('WebSocket error:', error);
        };


        this.client.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === "RE_LOGIN" && data.status === "success") {
                this.reLoginCode = data.data.RE_LOGIN_CODE;
            }
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
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
    }

    initializeNewConnection() {
        this.close();
        this.createConnection();
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
        this.user = user;
        this.pass = pass;
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
