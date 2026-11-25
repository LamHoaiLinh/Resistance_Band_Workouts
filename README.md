# BandFit — Resistance Band Workouts

Ứng dụng web tập luyện tại nhà, **ưu tiên dây kháng lực**, giao diện điện thoại đen–xanh lá, toàn bộ hướng dẫn bằng tiếng Việt với **tên bài tập bằng tiếng Anh**.

## Sử dụng ngay

1. Vào **Settings → Pages** trong repository GitHub này.
2. Ở **Build and deployment → Source**, chọn **GitHub Actions** (ứng dụng đã có workflow tự xuất bản khi cập nhật nhánh main).
3. Xem tiến độ ở tab **Actions**, workflow **Publish BandFit to GitHub Pages**. Nếu chưa chạy, chọn **Run workflow**.
4. Sau khi workflow hoàn thành thành công, truy cập: **https://lamhoailinh.github.io/Resistance_Band_Workouts/**
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
- Chọn **Dây nhẹ / Dây nặng** theo từng bài. App ghi nhận mức dây và học số rep **riêng cho từng bài + từng mức dây** để không đánh đồng việc đổi sang dây nặng với việc yếu đi.
- **Cá nhân hóa**: cuối buổi, ứng dụng so sánh số thực hiện với mục tiêu từng bài (80% trọng số) và mức hoàn thành tổng (20%). Nếu thấp hơn mục tiêu, giảm nhẹ lần sau; nếu vượt rõ và không quá khó, tăng nhẹ. Không tự tăng số hiệp, và không khuyến khích rep quá cao ở bài bộc phát.
- Lưu lịch sử, lịch tập, bài thay thế, mức rep đề xuất trong **localStorage**.
- **Xuất/Nhập JSON** để sao lưu và chuyển thiết bị. Không tự đồng bộ.
- Có PWA cache các tệp cơ bản cho sử dụng sau lần tải online.

## Lưu ý quan trọng

- Với các bài sức mạnh, chỉ chọn dây nặng khi vẫn kiểm soát tốt từng lần; có thể bắt đầu bằng dây nhẹ.
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


## Huấn luyện thông minh (v4)
- Kết quả thực tế: hết giờ chỉ chuyển sang xác nhận; nhập số lần/giây thật (có thể bằng 0), chọn đánh giá rồi lưu. Không tự ghi mục tiêu.
- RIR: số lần còn có thể làm đúng kỹ thuật, 0–4+ hoặc chưa rõ. Bộc phá đánh giá tốc độ/kỹ thuật; giữ tư thế đánh giá độ khó.
- Tăng tải: hai buổi cùng bài, cùng tải, cùng mục tiêu và đủ RIR (>=3) hoặc giữ tư thế dễ mới tăng nhẹ; khi chạm ngưỡng, đề xuất dây/biến thể, phải xác nhận. Bộc phá không tự tăng số lần.
- Giảm tải: gợi ý nếu tự báo phục hồi kém hoặc hai buổi gần nhất cùng loại đạt dưới 85% mục tiêu, có đủ hiệp xác nhận. Có thể chọn giảm tải thủ công; số hiệp giảm khoảng 40% (làm tròn), mục tiêu giảm khoảng 25%, dùng dây nhẹ/trợ lực và thay bài bộc phá. Không cập nhật mục tiêu dài hạn trong buổi giảm tải.
- Bản sao lưu JSON v2 tương thích dữ liệu cũ, giữ lịch sử và đề xuất. Hiệp cũ không xác nhận không dùng để tính tiến bộ. Dữ liệu vẫn lưu tại trình duyệt.
- Ngưỡng chỉ là quy tắc hỗ trợ, không phải chỉ định y khoa; dừng hoặc nghỉ khi đau, mệt bất thường.
