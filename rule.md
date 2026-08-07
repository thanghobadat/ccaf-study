# 📜 PROJECT RULES - CCAF WEBSITE

## 🚨 1. Quy tắc quan trọng nhất (Bắt buộc tuân thủ)
- **Đây là yêu cầu quan trọng nhất và phải luôn luôn ghi nhớ:** Luôn luôn đọc lại file [rule.md](file:///d:/AI/CCAF/rule.md) mỗi khi nhận được bất kỳ yêu cầu mới nào từ người dùng trước khi thực hiện công việc.

## 📋 2. Quy tắc lập kế hoạch (Planning First)
- Dù người dùng có đưa ra bất kỳ yêu cầu gì, kết quả trả về luôn phải ở dạng **lên kế hoạch (Implementation Plan)**, không được thực hiện trực tiếp yêu cầu cho đến khi có xác nhận.

## 📊 3. Quy tắc tóm tắt kết quả (Summary Rule)
- Khi thực hiện xong yêu cầu, phải tóm tắt ngắn gọn nội dung yêu cầu, những gì đã làm được và kết quả cụ thể.

## 🛑 4. Quy tắc quản lý Git & Project Memory (Manual Push & Sync Only)
- **TUYỆT ĐỐI KHÔNG TỰ ĐỘNG PUSH GIT & CẬP NHẬT MEMORY**: Không tự động chạy `git push` mã nguồn lên GitHub hay tự động cập nhật file `project_memory.md` sau khi hoàn thành sửa code.
- **CHỈ THỰC HIỆN KHI CÓ YÊU CẦU**: Chỉ thực hiện `git push` và đồng bộ file `project_memory.md` khi nhận được yêu cầu trực tiếp từ người dùng (ví dụ: *"push source"*, *"push git"*, *"lưu trạng thái"*...).
- **QUY TRÌNH KHI ĐƯỢC YÊU CẦU PUSH**: Khi người dùng yêu cầu push source, bắt buộc thực hiện đồng thời:
  1. Cập nhật lại file [project_memory.md](file:///d:/AI/CCAF/project_memory.md) để lưu vết trạng thái mới nhất của dự án.
  2. Thực hiện `git add`, `git commit` và `git push` mã nguồn lên GitHub repository.

