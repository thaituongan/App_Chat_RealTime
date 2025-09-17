# App Chat Realtime

**GVHD:** ThS. Phan Đình Long  
**Nhóm:** 28  
**Thành viên:**  
- 21130286 – Nguyễn Bính  
- 21130268 – Thái Tường An  

---

## 📌 Giới thiệu
Ứng dụng chat realtime được thiết kế nhằm mang lại trải nghiệm giao tiếp tức thời và mượt mà cho người dùng.  

**Tính năng chính:**
- Nhắn tin cá nhân 1-1  
- Tạo phòng chat nhóm  
- Cập nhật trạng thái trực tuyến  
- Tự động đăng nhập lại khi mất kết nối  
- Giao diện thân thiện, dễ sử dụng  
- Tích hợp emoji phong phú  

---

## 🛠️ Công nghệ sử dụng

### Frontend
- **React** – Xây dựng UI theo component  
- **Redux / Redux Toolkit** – Quản lý trạng thái toàn cục  
- **TypeScript** – Kiểu tĩnh, giảm lỗi runtime  
- **FontAwesome** – Bộ icon cho UI  
- **React Router** – Quản lý đường dẫn  
- **Emoji Picker** – Gửi emoji trong chat  

### Quản lý trạng thái & API
- **Redux Toolkit** – Tối ưu store/reducer/action  
- **WebSocketService** – Dịch vụ quản lý kết nối WebSocket  
- **WebSocket** – Giao tiếp hai chiều client–server, cập nhật user/room realtime  

---

## 🚀 Hướng dẫn sử dụng

### 1. Xác thực

#### Đăng nhập
1. Mở app → hiển thị màn hình **Login**  
2. Nhập `username` và `password`  
3. Nhấn **Sign In** hoặc Enter  

📌 Các trường hợp:
- ❌ Chưa nhập dữ liệu → thông báo yêu cầu nhập  
- ❌ Sai thông tin → thông báo lỗi  
- ✅ Đúng thông tin → chuyển sang màn hình chat  

![Login](https://github.com/user-attachments/assets/7d08fd6d-24b1-46b1-962a-392a8d4dc1f8)

#### Đăng ký
1. Mở trang **Sign Up**  
2. Nhập thông tin → nhấn **Sign Up**  
3. Các trường hợp:  
   - ❌ Thiếu thông tin → báo lỗi  
   - ❌ Password ≠ Confirm Password → báo lỗi  
   - ✅ Đăng ký thành công → thông báo + chuyển về Login  

![Signup](https://github.com/user-attachments/assets/5f38797d-f00e-48ae-b362-8a8e31ff11af)

#### Đăng xuất
- Nhấn nút **Logout** → quay về trang Login  

---

### 2. App Chat

#### Gửi tin nhắn
1. Chọn người dùng trong danh sách  
2. Nhập tin nhắn vào ô `type a message...`  
3. Nhấn **Send** hoặc Enter → tin nhắn hiển thị trong chatbox  

#### Gửi emoji
1. Nhấn icon 😀 bên cạnh ô nhập  
2. Chọn emoji → hiển thị trong ô nhập  
3. Nhấn **Send** hoặc Enter  

#### Tìm kiếm người dùng/nhóm
1. Nhập từ khóa vào ô tìm kiếm  
2. Tick vào **room** nếu tìm phòng  
3. Danh sách lọc ra theo từ khóa  

#### Thêm người dùng mới
1. Nhập tên user vào ô tìm kiếm  
2. Nếu tồn tại → nhấn mũi tên để thêm vào danh sách  
3. User mới thêm hiển thị cuối danh sách  

#### Tạo room mới
1. Tick chọn **room** để hiển thị danh sách  
2. Nhập tên phòng mới → nhấn **Create Room**  
3. Kết quả:  
   - ❌ Room tồn tại → báo lỗi  
   - ✅ Tạo thành công → thêm vào đầu danh sách  

#### Tham gia room
1. Tick chọn **room** để hiển thị danh sách  
2. Nhập tên phòng muốn tham gia → nhấn **Join Room**  
3. Kết quả:  
   - ❌ Room chưa tồn tại → báo lỗi  
   - ✅ Join thành công → room hiển thị đầu danh sách  

---

## 📷 Giao diện minh họa
![Chat UI](https://github.com/user-attachments/assets/70e97474-0053-4ce6-813b-76f6575aae98)

---

## 📖 License
This project is for academic purposes only.
