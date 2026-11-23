# BandFit — Resistance Band Workouts

Ứng dụng web tập luyện tại nhà, **ưu tiên dây kháng lực**, giao diện điện thoại đen–xanh lá, toàn bộ hướng dẫn bằng tiếng Việt với **tên bài tập bằng tiếng Anh**.

## Sử dụng ngay

1. Vào **Settings → Pages** trong repository GitHub này.
2. Ở mục **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn nhánh **main**, thư mục **/(root)** rồi **Save**.
4. Sau khi GitHub Pages triển khai thành công, truy cập: **https://lamhoailinh.github.io/Resistance_Band_Workouts/**
5. Trên iPhone: mở bằng Safari → **Share → Add to Home Screen** để thêm vào màn hình chính.

Không cần npm, máy chủ hay API key. Mở index.html để xem giao diện, nhưng PWA/offline chỉ hoạt động đúng khi chạy từ HTTPS/localhost.

## Chức năng

- 4 lịch nhanh: **3–5–7**, **2–4–6**, **2–5–7**, **2–4–5–7**, và tự chọn 3–4 ngày/tuần.
- 3 dạng buổi: **Strength (sức mạnh)**, **Power (bộc phát)**, **Balance (cân bằng)**. Nếu có ngày thứ 4, ứng dụng tự thêm một buổi **Recovery** nhẹ. Với hai ngày sát nhau, ngày sát sau thường được chọn làm buổi nhẹ.
- Kho bài tập toàn thân: chân, mông, ngực, lưng, vai, tay, core và cơ hai bên eo; danh mục tìm kiếm theo tiếng Anh/Việt.
- Mỗi bài có hướng dẫn **3 bước dễ hiểu**, lưu ý an toàn và 2–3 lựa chọn cùng nhóm cơ. Một số bài core không dùng dây.
- Đếm giờ từng hiệp, tự chuyển sang nghỉ khi hết giờ. Có nút **Hoàn thành hiệp**, **Tạm dừng**, **Đếm lại**.
- Bộ đếm nghỉ có **Đã nghỉ xong** và **+15 giây** (bấm nhiều lần). Hết giờ nghỉ không tự ép bắt đầu hiệp kế tiếp.
- **Cài đặt (⚙)** luôn ở trên cùng: thời gian nghỉ, thời gian đếm hiệp, tiếng chuông, rung.
- Nhập số **rep thực hiện thực tế** (hoặc số giây của bài giữ tư thế); đánh giá cảm giác **Dễ/Vừa/Khó**.
- **Cá nhân hóa**: cuối buổi, ứng dụng so sánh số thực hiện với mục tiêu từng bài (80% trọng số) và mức hoàn thành tổng (20%). Nếu thấp hơn mục tiêu, giảm nhẹ lần sau; nếu vượt rõ và không quá khó, tăng nhẹ. Không tự tăng số hiệp, và không khuyến khích rep quá cao ở bài bộc phát.
- Lưu lịch sử, lịch tập, bài thay thế, mức rep đề xuất trong **localStorage**.
- **Xuất/Nhập JSON** để sao lưu và chuyển thiết bị. Không tự đồng bộ.
- Có PWA cache các tệp cơ bản cho sử dụng sau lần tải online.

## Lưu ý quan trọng

- Dây phải nguyên vẹn, không rách/nứt; vị trí neo chắc chắn. Không để dây bật vào mặt.
- Nếu đau khớp, đau nhói hoặc chóng mặt: ngừng tập. Những bài bật nhảy chỉ nên tập khi khớp chịu lực tốt.
- Bài bộc phát ưu tiên tốc độ và kiểm soát; không tập đến kiệt sức. Đừng xem cảm giác mỏi là thước đo sức mạnh.
- Gợi ý rep của app chỉ là **quy tắc thích nghi đơn giản**, không phải huấn luyện y khoa hoặc đo sức mạnh tối đa.
- Bộ đếm hiệp trên trình duyệt có thể bị tạm dừng khi khóa màn hình/chuyển ứng dụng; khi quay lại cần tiếp tục thủ công để tránh ghi nhầm hiệp chưa tập.
- Khi xóa dữ liệu trình duyệt sẽ mất lịch sử nếu chưa xuất JSON.

## Công nghệ

HTML5 + CSS3 + JavaScript thuần, PWA service worker, không thư viện ngoài. Mục tiêu: tải nhanh, sửa dễ, responsive, tránh trượt ngang và tránh bôi đen nội dung nút khi nhấn giữ.

## Cấu trúc

- index.html: cấu trúc giao diện và hộp cài đặt
- style.css: giao diện mobile-first
- app.js: thư viện bài tập, lịch 3–4 ngày, động cơ đếm giờ, lưu và cá nhân hóa
- manifest.webmanifest và icon.svg: cài lên màn hình chính
- sw.js: bộ nhớ tạm để chạy sau khi đã tải

## Tuyên bố riêng tư

Ứng dụng **không gửi dữ liệu tập luyện tới máy chủ**. Dữ liệu lưu trên thiết bị/trình duyệt đang sử dụng.
