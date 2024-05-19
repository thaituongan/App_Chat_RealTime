import { useState } from "react";
// @ts-ignore
function Login({ callback }) {
    const [name, setName] = useState("");
    const handleClick = () => {
        callback(name);
    };
    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <button onClick={handleClick}>Đăng nhập</button>
        </div>
    );
}

export default Login;