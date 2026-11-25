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


## Hành trình sức mạnh (v5)
- Tab **Cấp độ** và thẻ Tổng quan: Giai đoạn I → II → III → Endless I, II, III...
- Mỗi cấp có 8 nhóm: đẩy, kéo, chân, chuỗi sau, core, liên sườn, cân bằng, bộc phát. Chọn biến thể trong từng nhóm theo dụng cụ; mốc I–III cố định, Endless gợi ý luân phiên và cho chỉnh trong giới hạn. Biến thể không được quy đổi thành cùng một mức sức mạnh.
- Test từng mục bất cứ khi nào sẵn sàng (không khi đang tập dở hoặc báo phục hồi kém), xác nhận an toàn, chốt mốc, nhập kết quả thật, xác nhận kỹ thuật. Bài hai bên phải đạt cả hai; bài dùng dây ghi thông số/cách đặt dây. Bài giữ tư thế có bấm giờ tới mốc. Test không tự ghi vào log buổi tập hay tự tăng kháng lực.
- Đạt cả 8 nhóm mới mở cấp kế; lưu lịch sử riêng và mốc đã đạt. Không cần test cùng một ngày. Mốc gợi ý là thử thách cá nhân, không phải tiêu chuẩn thể lực đã được kiểm định. Endless giữ mốc khi đạt giới hạn, không bắt tăng vô hạn; tránh test tối đa và không tập thêm khi mệt/đau.
- Sao lưu JSON v3 gồm hành trình, vẫn nhập được bản cũ; giữ lịch, lịch sử buổi tập, tăng/giảm tải. Tối đa 400 lần test và 100 giai đoạn gần nhất trong lịch sử; cấp hiện tại vẫn được giữ.

## Huân chương & Full Stage Test (v6)
- **Bền bỉ (Individual):** đạt đủ 8 mục tiêu tích lũy, tự mở cấp kế. Thành tích đã đạt trong v5 được công nhận tự động.
- **Toàn diện (Full Stage):** mở sau khi đã có Bền bỉ ở cấp đó. Kiểm tra lại đủ 8 bài trong cùng phiên, theo thứ tự bộc phát → đẩy → kéo → chân → chuỗi sau → cân bằng → core → liên sườn. Dùng đúng biến thể, mốc và thông số dây của Individual nếu hồ sơ còn lưu; cấp quá cũ thiếu hồ sơ dùng mốc mặc định. Không cộng kết quả Individual hoặc từ lần Full Stage khác. Không đạt một bài thì không nhận huân chương. Không mất huân chương Bền bỉ.
- Nghỉ bắt buộc giữa bài 60–180 giây tùy nhóm, có +30 giây; không tự chuyển bài. Đồng hồ giữ tư thế riêng. Bài bộc phát có hướng dẫn nghỉ giữa lần thử. Đạt mốc rồi dừng, không test tối đa. Phiên tối đa 120 phút; có thể hủy khi mệt/đau. Phiên chưa xong không khôi phục khi tải lại trang; không ép tiếp tục nếu rời app.
- Huân chương Toàn diện được lưu trong campaign.fullMedals; sao lưu JSON v4, tương thích bản v3 và cũ hơn. Thành tích được tự ghi nhận, không phải chuẩn kiểm định thể lực.

## Chọn dụng cụ theo buổi (v7)
- Trước buổi tập, Individual Test hoặc Full Stage Test, xác nhận dụng cụ đang có: không dây, một dây, hai dây, dây nhảy, xà đơn, xà kép; các điều kiện neo/dây vòng/bục/thước... chọn riêng. Có lựa chọn nhanh tất cả dụng cụ chính hoặc không dụng cụ. App nhớ lựa chọn gần nhất nhưng luôn hỏi trước phiên mới.
- Tự lọc giáo án, bài đổi và đề xuất tăng tải. Có bài bodyweight cho mỗi nhóm, xà kép Dip và khởi động nhảy dây nhẹ 30 giây nếu có. Nhóm kéo không dụng cụ dùng tự kháng lực hoặc kiểm soát bả vai, không tương đương kéo xà/dây; bài kỹ thuật bộc phát không đo công suất. Một dây ghi tên để tách thành tích và không đề xuất dây khác khi không có.
- Test chỉ hiện biến thể phù hợp; Full Stage giữ bài/mốc cũ khi đủ dụng cụ hoặc đổi bài với mốc riêng và liệt kê trước khi bắt đầu. Không tuyên bố các biến thể tương đương sức mạnh. Kết quả ghi dụng cụ; huân chương cũ không mất. Sao lưu JSON v5 tương thích cũ.

## Luồng tập liền mạch và bánh xe số (v8)
- Mỗi bài mới tự mở hướng dẫn một lần trong buổi; mở lại bằng nút Hướng dẫn. Vòng tròn là nút Bắt đầu / Tiếp tục / Kết thúc hiệp / Mở lại xác nhận. Hết giờ tự mở popup; không tự ghi nhận mục tiêu.
- Popup kết quả có bánh xe cuộn dọc 0–999, nút +/-1, nhập nhanh và chọn đúng mục tiêu. Số ban đầu là gợi ý; chỉ lưu khi người dùng xác nhận rõ số thực tế. Đánh giá có lựa chọn Chưa rõ mặc định, không chặn ghi nhận khi chưa tự đánh giá. Vẫn lưu riêng RIR/tốc độ/độ khó và không tự tăng tải nếu thiếu bằng chứng.
- Lưu kết quả tự chạy nghỉ; hết nghỉ tự chuẩn bị hiệp mới nhưng không tự bắt đầu tập. Có cộng thời gian nghỉ và xác nhận khi kết thúc nghỉ sớm. Buổi đang dở ở trạng thái review cũ mở popup khi tiếp tục. Không xóa localStorage.
- Safe area cho iPhone; âm báo dùng lại AudioContext đã mở khi bấm bắt đầu (trình duyệt/thiết bị có thể hạn chế âm thanh hoặc chạy nền).

## Đếm nhịp theo loại bài (v9)
- Bài lặp: chỉ hiển thị lần hiện tại/tổng lần, đọc tiếng Việt mỗi lần bắt đầu, bíp đồng thời; 3 giây chuẩn bị, nhịp gợi ý 3–4 giây/lần, bài bộc phát 5 giây/lần, Tempo Push-Up 7 giây/lần. Nhịp là hướng dẫn không phải đo cảm biến. Bài hai bên có nhắc bên trái/phải hoặc 5 giây đổi bên tùy động tác.
- Bài thời lượng: hiển thị giây còn lại, bíp mỗi giây, đọc mốc đầu và 5 giây cuối. Side Plank/Suitcase Hold/Single-Leg Stand chia tổng thời lượng hai bên, 5 giây đổi bên không tính thời gian tập. Nghỉ đọc 5 giây cuối và thông báo kết thúc. Không tự bắt đầu hiệp mới.
- Kết thúc sớm hoặc hết nhịp mở popup; giá trị đề xuất dựa trên nhịp đã chạy (không đo số lần thật), xác nhận thực tế trước lưu. Hiệp cũ đang dở được bắt đầu lại theo nhịp mới, không mất kết quả đã lưu. Có nút thử âm thanh ở buổi tập và cài đặt; âm thanh phụ thuộc trình duyệt/giọng tiếng Việt/âm lượng thiết bị. Tạm dừng khi ra nền.
