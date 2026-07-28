# Birthday Tee Sign-up — Deploy Package

## Nội dung gói này

- `index.html` — toàn bộ website (form, size guide, admin panel). Vercel cần đúng tên file này để tự nhận diện là trang chủ.
- `apps-script-backend.gs` — code backend để dán vào Google Apps Script (không upload lên Vercel, chỉ dùng cho Google Sheet).

## Thứ tự làm: Backend TRƯỚC, Vercel SAU

Nên setup Google Sheet + Apps Script trước, để có `API_URL` thật rồi mới deploy lên Vercel — đỡ phải deploy lại 2 lần.

### Bước 1 — Setup Google Sheet + Apps Script

1. Mở Google Sheet bạn muốn dùng để lưu dữ liệu (hoặc tạo mới)
2. Đổi tên sheet (tab dưới) thành đúng chữ: `Submissions`
3. Dòng đầu tiên (header), nhập đúng thứ tự:
   `Timestamp | Name | Employee Code | Office | Team | Size | Month`
4. Vào **Extensions → Apps Script** (bắt buộc mở từ chính file Sheet này)
5. Xoá code mẫu, dán toàn bộ nội dung file `apps-script-backend.gs`
6. Trong code, đổi dòng:
   ```js
   const ADMIN_KEY = 'quynhchi';
   ```
   thành mật khẩu admin bạn muốn (đã set sẵn là `quynhchi`, đổi nếu cần)
7. **Deploy → New deployment → chọn loại "Web app"**
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Bấm **Deploy** → copy **Web app URL** (dạng `https://script.google.com/macros/s/xxxxx/exec`)

### Bước 2 — Gắn API_URL vào file index.html

1. Mở `index.html` bằng text editor bất kỳ (VS Code, Notepad...)
2. Tìm dòng:
   ```js
   const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
3. Thay bằng URL thật vừa copy ở Bước 1
4. Kiểm tra mật khẩu admin trong file này khớp với Apps Script:
   ```js
   const ADMIN_KEY = 'quynhchi';
   ```
5. Lưu file

### Bước 3 — Deploy lên Vercel

**Cách nhanh nhất (không cần Git, không cần cài gì):**

1. Vào [vercel.com](https://vercel.com) → **Sign up / Log in**
2. Ở dashboard, chọn **Add New → Project**
3. Chọn tab **"Deploy without Git"** hoặc kéo thả cả **folder này** (chứa `index.html`) vào khung upload
   - Nếu Vercel chỉ cho upload qua Git, dùng Cách B bên dưới
4. Vercel tự nhận diện là static site, deploy trong ~10-20 giây
5. Nhận được link dạng `https://ten-du-an.vercel.app`

**Cách B — qua GitHub (nếu Vercel yêu cầu kết nối Git):**

1. Tạo 1 repo mới trên GitHub, upload `index.html` vào đó
2. Trong Vercel: **Add New → Project → Import Git Repository** → chọn repo vừa tạo
3. Không cần cấu hình Build Command / Output Directory gì cả (để trống hoặc mặc định), vì đây là file tĩnh
4. Deploy

### Bước 4 — Kiểm tra

1. Mở link Vercel vừa deploy
2. Điền thử form, bấm "Reserve my shirt"
3. Mở Google Sheet ở Bước 1 → kiểm tra có dòng dữ liệu mới không
4. Bấm nút "Admin" ở footer → nhập mật khẩu `quynhchi` → xem có load được danh sách không

### (Tuỳ chọn) Gắn domain riêng của công ty

Trong Vercel: **Project → Settings → Domains → Add** → nhập domain công ty → làm theo hướng dẫn thêm DNS record (CNAME hoặc A record) tại nơi quản lý domain.

---

**Lưu ý bảo mật:** mật khẩu admin (`ADMIN_KEY`) nằm trong code JS phía client — đây là bảo vệ cơ bản, đủ ngăn nhân viên tò mò xem dữ liệu người khác, không phải bảo mật cấp doanh nghiệp. Nếu cần chặt hơn (đăng nhập bằng tài khoản Google Workspace thật), cần nâng cấp kiến trúc khác.
