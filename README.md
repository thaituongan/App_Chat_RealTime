# App_Chat_RealTime
GVHD:	ThS Phan Đình Long
NHÓM:	28
THÀNH VIÊN:	
21130286 – Nguyễn Bính
21130268 – Thái Tường An

I.	Giới thiệu ứng dụng
Ứng dụng chat realtime của chúng tôi được thiết kế để mang lại trải nghiệm giao tiếp tức thời và mượt mà cho người dùng. Với các tính năng nổi bật như nhắn tin cá nhân, tạo phòng chat nhóm, và cập nhật trạng thái trực tuyến của người dùng, ứng dụng đảm bảo mọi cuộc trò chuyện đều diễn ra liên tục và không bị gián đoạn. Giao diện thân thiện và dễ sử dụng cùng với tích hợp biểu tượng cảm xúc phong phú giúp cuộc trò chuyện trở nên sống động và thú vị hơn. Bên cạnh đó, tính năng tự động đăng nhập lại giúp người dùng duy trì kết nối ngay cả khi gặp sự cố mạng, đảm bảo mọi tin nhắn đều được gửi và nhận một cách an toàn và nhanh chóng. Hãy trải nghiệm ứng dụng chat realtime của chúng tôi để kết nối mọi lúc, mọi nơi với bạn bè và đồng nghiệp!
II.	Công nghệ sử dụng
1.	Frontend
o	React: Thư viện JavaScript dùng để xây dựng giao diện người dùng. React giúp tạo ra các component tái sử dụng và quản lý trạng thái hiệu quả.
o	Redux: Thư viện quản lý trạng thái cho ứng dụng JavaScript, giúp duy trì và quản lý trạng thái toàn cục của ứng dụng.
o	TypeScript: Ngôn ngữ lập trình phát triển từ JavaScript, bổ sung thêm kiểu dữ liệu tĩnh giúp phát hiện lỗi sớm trong quá trình phát triển.
o	FontAwesome: Bộ thư viện icon giúp cải thiện giao diện người dùng.
o	Router: định nghĩa và quản lý các đường dẫn URL.
o	Emoji: Bộ thư viện emoji giúp tăng thêm cảm xúc khi nhắn tin. 
2.	Quản lý trạng thái và API
o	Redux Toolkit: Bộ công cụ cho Redux giúp đơn giản hóa việc tạo store, reducer và action.
o	WebSocketService: Dịch vụ tùy chỉnh để quản lý kết nối WebSocket và xử lý các sự kiện liên quan.
o	WebSocket: Giao thức giao tiếp hai chiều giữa client và server, được sử dụng để cập nhật danh sách người dùng và phòng chat theo thời gian thực.
III.	Hướng Dẫn Sử Dụng
1.	Xác thực. 
a.	Đăng Nhập
Bước 1: Khi lần đầu truy cập, ứng dụng sẽ hiển thị trang đăng nhập để người dùng có thể đăng nhập vào ứng dụng.
 <img width="940" height="449" alt="ảnh" src="https://github.com/user-attachments/assets/7d08fd6d-24b1-46b1-962a-392a8d4dc1f8" />
Giao diện đăng nhập
Bước 2: Người dùng nhập username và mật khẩu.
 
Bước 3: Người dùng nhấn nút Sign in hoặc nhấn phím Enter để đăng nhập. Có 3 trường hợp khi đăng nhập.
TH1: Khi chưa nhập dữ liệu:

TH 2: Khi nhập sai, hệ thống sẽ thông báo cho người dùng để người dùng nhập lại lần nữa.
 
TH 3: Khi đăng nhập đúng, hệ thống sẽ chuyển qua màn hình chat .
 <img width="889" height="449" alt="ảnh" src="https://github.com/user-attachments/assets/70e97474-0053-4ce6-813b-76f6575aae98" />

b.	Đăng Kí. 
Bước 1: Hiển thị trang đăng kí để người dùng có thể đăng kí tài khoản.
 <img width="940" height="446" alt="ảnh" src="https://github.com/user-attachments/assets/5f38797d-f00e-48ae-b362-8a8e31ff11af" />

Giao diện đăng ký
 
Bước 2:  Nhập thông tin theo yêu cầu và nhấn Sign Up hoặc phím Enter.
Bước 3: Sau khi nhấn Sign Up hoặc phím Enter thì sẽ có các trường hợp sau:
TH 1: Chưa nhập thông tin hoặc chỉ nhập mỗi username sẽ hiện thông báo cần nhập thông tin.
TH 2: Nhập thiếu Confirm Password hoặc Password và Confirm Password khác nhau sẽ hiện thông báo đỏ.
TH 3: Đăng ký thành công sẽ hiện thông báo và nhấn OK để chuyển qua trang Login

 
c.	Đăng xuất
Bước 1: Người dùng chọn nút Logout và ứng dụng sẽ đăng xuất khỏi tài khoản và điều hướng người dùng về trang Login.

2.	App Chat

a.	Gửi Tin Nhắn
Bước 1: Hiển thị danh sách người dùng.

Bước 2: Chọn đối tượng để nhắn tin, khi chọn vào 1 đối tượng từ danh sách người dùng ứng dụng sẽ hiển thị khung chat có chứa tin nhắn với người dùng đó.
 
Bước 3: Nhập tin nhắn vào ô ‘type a message…’
 
Bước 4: Click vào icon gửi hoặc nhấn Enter, tin nhắn người dùng sẽ được tải lên chatbox
 
b.	Thêm biểu tượng cảm xúc vào tin nhắn
Bước 1: Bên cạnh ô nhập tin nhắn có một biểu tượng emoji, khi nhấn vào emoji đó sẽ hiện lên một hộp thoại hiện lên danh sách emoji để người dùng chọn.
Bước 2: Chọn vào emoji muốn gửi, emoji sẽ hiển thị trong ô nhập tin nhắn. (có thể nhập tin nhắn cùng với emoji).
 
Bước 3:Click vào icon  gửi hoặc nhấn Enter, tin nhắn người dùng sẽ được tải lên chatbox.
 
c.	Tìm kiếm người dùng hoặc nhóm:
Bước 1: Nhập tên người dùng vào ô tìm kiếm (nếu là nhóm thì nhấn tick vào ô room) 
Bước 2: Danh sách người dùng/ nhóm sẽ tìm kiếm và lọc ra theo từ khóa được nhập và hiển thị lên danh khung danh sách người dùng/nhóm
Bước 3: Chọn người dùng/nhóm
 

d.	Thêm người dùng mới
Bước 1: Nhập tên người dùng vào ô tìm kiếm, nếu người dùng có trong danh sách sẽ hiển thị trên khung danh sách người dùng

Bước 2: Nhấn phím mũi tên để thêm người dùng mới, người dùng sẽ được thêm vào cuối danh sách người dung

Bước 3: Chọn vào người dùng mới được thêm và nhắn tin, nếu người dùng này tồn tại, người dùng mới sẽ được chuyển lên đầu danh sách.

e.	Tạo room mới
Bước 1: Tích vào ô room để hiện danh sách room đã tham gia.
 
Bước 2: Nhập tên room mới muốn tạo vào ô tìm kiếm và nhấn nút Create room.
 
Bước 3: Sau khi nhấn Create Room thì sẽ có các trường hợp sau:
TH1: Tạo room mới thất bại (nếu room đã tồn tại thì sẽ hiện thị thông báo và không tạo được room mới).
 
TH2: Tạo room thành công (room mới sẽ được thêm vào đầu danh sách room)
 

f.	Tham gia room
Bước 1: Tích vào ô room để hiện danh sách room đã tham gia.
 
Bước 2: Nhập tên room mới muốn tham gia vào ô tìm kiếm và nhấn nút Join Room.
 
Bước 3: Sau khi nhấn Join Room thì sẽ có các trường hợp sau:
TH1: Tham gia room mới thất bại (nếu room chưa tồn tại thì sẽ hiển thị thông báo và không tham gia được room mới)
 
TH2: Tham gia room thành công (room mới vừa tham gia sẽ được thêm vào đầu danh sách room)
 
 

