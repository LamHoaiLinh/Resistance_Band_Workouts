
"use strict";
(function(){
  const KEY="bandfit-local-v1";
  const SHORT=["CN","T2","T3","T4","T5","T6","T7"];
  const DAYNAME=["Chủ nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];
  const ORDER=[1,2,3,4,5,6,0];
  const PRESETS=[
    {days:[2,4,6],name:"Thứ 3 · 5 · 7",hint:"Phù hợp nếu bạn tập võ vào 2 · 4 · 6"},
    {days:[1,3,5],name:"Thứ 2 · 4 · 6",hint:"Ba ngày cách nhau đều"},
    {days:[1,4,6],name:"Thứ 2 · 5 · 7",hint:"Có thêm thời gian phục hồi"},
    {days:[1,3,4,6],name:"Thứ 2 · 4 · 5 · 7",hint:"Thêm một buổi phục hồi nhẹ"}
  ];
  const MODES={
    strength:{title:"Sức mạnh",tag:"STRENGTH DAY",subtitle:"Tải vừa đến nặng · Tập chậm, chắc · 1–2 lần dự trữ",icon:"◆",time:"45–55 phút"},
    power:{title:"Bộc phát",tag:"POWER DAY",subtitle:"Phát lực nhanh có kiểm soát · Không tập đến kiệt sức",icon:"↗",time:"35–45 phút"},
    balance:{title:"Sức bền & cân bằng",tag:"ENDURANCE / BALANCE DAY",subtitle:"Sức bền cơ · Lưng · Vai sau · Chân · Bụng chéo",icon:"◎",time:"45–55 phút"},
    recovery:{title:"Phục hồi chủ động",tag:"RECOVERY DAY",subtitle:"Buổi thứ tư nhẹ: kỹ thuật, kiểm soát và linh hoạt",icon:"◌",time:"20–30 phút"}
  };
  const EX={};
  function E(id,en,vi,group,steps,tip,need){
    EX[id]={id:id,en:en,vi:vi,group:group,steps:steps,tip:tip||"",need:need||"Dây kháng lực"};
  }
  E("squat","Resistance Band Squat","Ngồi xuống đứng lên với dây","Chân & mông",["Đứng lên giữa dây, hai chân rộng bằng vai; giữ hai đầu dây gần vai.","Đẩy hông ra sau rồi hạ người như ngồi ghế.","Dồn lực qua bàn chân để đứng lên, không để gối đổ vào trong."],"Giữ lưng tự nhiên; chọn dây vừa đủ để vẫn đứng lên chắc chắn.");
  E("split","Resistance Band Split Squat","Chùng chân tách trước sau","Chân & mông",["Đặt một chân phía trước lên giữa dây, chân kia ở sau.","Hạ người thẳng xuống đến mức thoải mái.","Đẩy chân trước để đứng lên, đổi bên sau mỗi hiệp."],"Giữ người ổn định, không cần hạ thật sâu.");
  E("lunge","Resistance Band Reverse Lunge","Bước lùi chùng chân","Chân & mông",["Giữ dây dưới bàn chân trước, hai đầu dây ngang vai.","Bước chân còn lại ra sau rồi hạ gối gần sàn.","Đẩy chân trước để trở về, đổi chân đều nhau."],"Có thể dùng dây nhẹ hoặc bỏ dây khi chưa vững.");
  E("wallSit","Wall Sit","Tựa tường giữ tư thế ngồi","Chân & mông",["Tựa lưng vào tường, đặt chân ra trước một chút.","Trượt xuống tư thế như ngồi ghế, mức sâu vừa sức.","Giữ đều hơi thở rồi đứng dậy từ từ."],"Nếu đau gối, giảm độ sâu hoặc đổi bài.","Không cần dụng cụ");
  E("lateralWalk","Resistance Band Lateral Walk","Đi ngang với dây","Chân & mông",["Quấn dây vòng quanh đùi hoặc mắt cá nếu là dây vòng.","Hơi khuỵu gối và bước ngang từng bước ngắn.","Giữ đầu gối cùng hướng với mũi chân."],"Nếu dùng dây dài, giữ căng nhẹ bằng hai tay thay vì quấn không an toàn.");
  E("gluteBridge","Resistance Band Glute Bridge","Nâng mông nằm ngửa","Chân & mông",["Nằm ngửa, co gối, bàn chân đặt chắc trên sàn.","Giữ dây qua hông và cố định hai bên nếu an toàn; có thể tập không dây.","Siết mông nâng hông lên rồi hạ chậm."],"Không ưỡn lưng quá mức.");
  E("squatJump","Bodyweight Squat Jump","Bật nhảy từ tư thế squat","Chân & mông",["Đứng vững, hạ người nhẹ như squat.","Bật lên nhanh và thẳng, không cần nhảy quá cao.","Tiếp đất êm với gối hơi chùng, nghỉ giữa các lần."],"Không tập nếu gối hoặc cổ chân đang đau.","Không cần dụng cụ");
  E("calf","Resistance Band Calf Raise","Nhón gót tập bắp chân","Chân & mông",["Đứng vững, giữ dây căng nhẹ nếu phù hợp.","Nâng gót lên cao, giữ một nhịp.","Hạ gót chậm; có thể vịn tường để giữ thăng bằng."],"Đừng nảy gót thật nhanh.");
  E("rdl","Resistance Band Romanian Deadlift","Gập hông kéo dây","Hông & lưng dưới",["Đứng giữa dây, cầm hai đầu, gối hơi chùng.","Đẩy hông ra sau, cúi thân nhưng giữ lưng thẳng tự nhiên.","Siết mông đứng lên, không giật người bằng lưng."],"Dừng khi cảm thấy căng nhẹ mặt sau đùi.");
  E("goodMorning","Resistance Band Good Morning","Gập hông với dây","Hông & lưng dưới",["Đạp dây dưới hai bàn chân, đặt phần dây còn lại ngang vai nếu chắc chắn.","Hơi chùng gối, đẩy mông ra sau và nghiêng thân.","Dùng mông đứng thẳng lại, giữ lưng không gù."],"Dùng dây nhẹ; nếu khó cố định dây hãy thay Romanian Deadlift.");
  E("hipHinge","Bodyweight Hip Hinge","Gập hông không dây","Hông & lưng dưới",["Đứng hai chân rộng bằng hông, đặt tay lên hông.","Đẩy mông ra sau, nghiêng thân trong khi lưng giữ tự nhiên.","Đứng lại bằng cách siết mông."],"Ưu tiên học kỹ thuật trước khi tăng lực.","Không cần dụng cụ");
  E("bandDeadlift","Resistance Band Deadlift","Kéo dây từ thấp lên đứng thẳng","Hông & lưng dưới",["Đứng giữa dây, hai chân rộng bằng hông.","Hạ hông vừa phải và nắm chắc hai đầu dây.","Đạp chân xuống sàn, đứng thẳng và giữ dây sát người."],"Không ngửa lưng ra sau khi đứng lên.");
  E("chest","Standing Resistance Band Chest Press","Đẩy ngực đứng","Ngực",["Quấn dây qua lưng trên, giữ hai đầu ngang ngực.","Đẩy hai tay về trước đến gần thẳng, không khóa khuỷu.","Thu tay chậm về ngang ngực, không nhún vai."],"Không để dây cọ sát cổ.");
  E("floorChest","Resistance Band Floor Press","Đẩy ngực nằm sàn","Ngực",["Nằm ngửa, đặt dây ngang lưng trên, hai tay nắm chắc.","Đẩy hai tay lên đến gần thẳng khuỷu.","Hạ có kiểm soát đến khi tay trên chạm nhẹ sàn."],"Giữ cổ và vai thoải mái.");
  E("inclinePush","Incline Push-Up","Hít đất tựa ghế chắc chắn","Ngực",["Chống hai tay lên bàn hoặc ghế thật chắc.","Giữ thân thẳng từ đầu đến chân.","Hạ ngực có kiểm soát rồi đẩy lên."],"Không dùng ghế trơn trượt.","Không cần dụng cụ");
  E("fly","Resistance Band Chest Fly","Khép tay tập ngực","Ngực",["Quấn dây chắc quanh lưng trên, hai khuỷu hơi chùng.","Mở tay vừa phải rồi khép hai tay trước ngực.","Trở lại chậm, không giật vai ra sau."],"Ưu tiên dây nhẹ, không ép vai quá sâu.");
  E("speedPress","Resistance Band Speed Chest Press","Đẩy ngực nhanh với dây nhẹ","Ngực",["Quấn dây nhẹ qua lưng trên, hai đầu ngang ngực.","Đẩy nhanh về trước nhưng dừng có kiểm soát.","Thu tay chậm, nghỉ một nhịp trước lần tiếp."],"Không giật hoặc khóa cứng khuỷu tay.");
  E("wallPush","Explosive Wall Push-Up","Chống đẩy nhanh vào tường","Ngực",["Đứng cách tường vừa phải, chống tay ngang ngực.","Hạ người nhẹ về tường.","Đẩy mạnh ra xa, rồi đón lực bằng bàn tay mềm."],"Động tác nhanh nhưng không đập mạnh khớp.","Không cần dụng cụ");
  E("row","Bent Over Resistance Band Row","Kéo dây tập lưng cúi người","Lưng",["Đứng giữa dây, gối hơi chùng và nghiêng người.","Kéo hai khuỷu tay về phía hông.","Hạ tay chậm, giữ lưng thẳng và vai không nhún."],"Giữ cổ thẳng tự nhiên.");
  E("singleRow","Single Arm Resistance Band Row","Kéo lưng từng tay","Lưng",["Giữ dây dưới chân trước, tay cùng phía nắm đầu dây.","Kéo khuỷu tay về hông, giữ thân yên.","Hạ chậm rồi đổi bên."],"Không xoay mạnh thân để lấy đà.");
  E("seatedRow","Seated Resistance Band Row","Ngồi kéo dây về bụng","Lưng",["Ngồi vững trên sàn, vòng dây quanh bàn chân đang mang giày.","Giữ lưng tự nhiên rồi kéo khuỷu tay ra sau.","Duỗi tay chậm, không ngả người để giật dây."],"Chỉ thực hiện khi dây không thể tuột khỏi chân.");
  E("speedRow","Resistance Band Speed Row","Kéo lưng nhanh với dây nhẹ","Lưng",["Đứng chắc trên dây, hơi gập hông và giữ lưng thẳng.","Kéo nhanh hai khuỷu về hông.","Trả tay chậm, không giật lưng."],"Dừng khi tốc độ kéo chậm rõ rệt.");
  E("pullApart","Resistance Band Pull Apart","Kéo giãn dây ngang ngực","Lưng",["Giữ dây trước ngực, hai tay gần thẳng.","Mở hai tay sang hai bên cho dây căng.","Thu lại từ từ, vai giữ thấp."],"Dây nhẹ đủ để không phải nhún vai.");
  E("facePull","Resistance Band Face Pull","Kéo dây về ngang mặt","Lưng",["Cố định dây ở điểm neo thật chắc ngang mặt.","Kéo hai đầu dây về phía mặt, khuỷu mở vừa phải.","Khép bả vai nhẹ rồi thả tay có kiểm soát."],"Nếu không có điểm neo chắc, chọn Pull Apart.","Cần điểm neo chắc chắn");
  E("reverseFly","Resistance Band Reverse Fly","Mở tay tập vai sau","Lưng",["Giữ dây nhẹ trước ngực, hai tay hơi chùng.","Mở tay ra hai bên, giữ vai thấp.","Trả tay chậm, tránh ngửa lưng."],"Bắt đầu bằng dây nhẹ.");
  E("overhead","Resistance Band Overhead Press","Đẩy tay lên trên đầu","Vai",["Đứng giữa dây, hai tay giữ ngang vai.","Đẩy tay lên trên đầu trong tầm thoải mái.","Hạ xuống ngang vai chậm, không ưỡn lưng."],"Nếu vai đau khi giơ cao, thay Lateral Raise.");
  E("lateralRaise","Resistance Band Lateral Raise","Nâng tay ngang","Vai",["Đứng trên dây, hai tay giữ bên hông.","Nâng tay sang ngang đến gần ngang vai.","Hạ xuống chậm, khuỷu hơi chùng."],"Không nhún vai hoặc quăng tay.");
  E("frontRaise","Resistance Band Front Raise","Nâng tay ra trước","Vai",["Đứng trên dây, giữ tay gần đùi.","Nâng tay trước mặt đến ngang vai.","Hạ xuống chậm, thân không ngả ra sau."],"Dùng dây nhẹ hơn bài đẩy ngực.");
  E("externalRot","Resistance Band External Rotation","Xoay tay ra ngoài tập vai","Vai",["Kẹp khuỷu tay sát thân, gập 90 độ.","Giữ dây nhẹ và xoay bàn tay ra ngoài.","Quay lại từ từ, không xoay cả người."],"Dùng lực cản rất nhẹ; không cần tập đến mỏi.","Dây kháng lực nhẹ");
  E("curl","Resistance Band Biceps Curl","Cuốn tay trước","Tay",["Đứng giữa dây, hai khuỷu ở sát thân.","Gập khuỷu kéo tay lên gần vai.","Hạ tay chậm, không lắc người."],"Dây nặng vừa đủ để không cần ngả lưng.");
  E("hammerCurl","Resistance Band Hammer Curl","Cuốn tay kiểu búa","Tay",["Đạp giữa dây, lòng bàn tay hướng vào nhau.","Giữ khuỷu ở gần thân và kéo tay lên.","Hạ từ từ, tránh nhún vai."],"Tập cả cơ cánh tay và cẳng tay.");
  E("altCurl","Alternating Resistance Band Curl","Cuốn tay luân phiên","Tay",["Đứng giữa dây, giữ hai đầu.","Lần lượt cuốn từng tay lên gần vai.","Hạ chậm rồi đổi tay, không vung người."],"Giữ thân yên.");
  E("triceps","Resistance Band Triceps Extension","Duỗi tay sau","Tay",["Giữ một đầu dây cố định chắc bằng bàn chân.","Giữ khuỷu ở gần thân, duỗi cẳng tay ra sau.","Thu tay về chậm; không giật khuỷu."],"Dùng dây vừa, khuỷu không nên đau.");
  E("overheadTri","Overhead Resistance Band Triceps Extension","Duỗi tay sau trên đầu","Tay",["Đứng trên một đầu dây và giữ đầu kia sau đầu.","Đưa tay lên cao bằng cách duỗi khuỷu.","Gập lại từ từ, không ưỡn lưng."],"Nếu vai khó chịu, thay Triceps Kickback.");
  E("kickback","Resistance Band Triceps Kickback","Duỗi tay ra sau khi cúi người","Tay",["Hơi gập hông, giữ khuỷu gần ngang thân.","Duỗi cẳng tay ra sau đến gần thẳng.","Trả tay về chậm, thân giữ yên."],"Không văng cánh tay ra sau.");
  E("sidePlank","Side Plank","Giữ người nghiêng tập hai bên eo","Core",["Chống một khuỷu ngay dưới vai, hai chân xếp hoặc chân dưới co.","Nâng hông, giữ thân thành một đường.","Giữ nửa thời gian bên trái, nửa còn lại bên phải."],"Nếu vai đau, giảm thời gian hoặc chống gối.","Không cần dụng cụ");
  E("sideReach","Side Plank Reach Through","Plank nghiêng luồn tay","Core",["Vào tư thế Side Plank vững.","Đưa tay trên xuống luồn nhẹ dưới thân, xoay vừa tầm.","Mở tay lại, làm đều hai bên."],"Không vặn quá mức cột sống.","Không cần dụng cụ");
  E("deadBug","Dead Bug","Nằm ngửa duỗi tay chân đối diện","Core",["Nằm ngửa, nâng hai đầu gối và hai tay.","Duỗi chậm một tay và chân đối diện gần sàn.","Đưa về giữa rồi đổi bên, giữ lưng dưới ổn định."],"Giảm biên độ nếu lưng bị võng.","Không cần dụng cụ");
  E("reverseCrunch","Reverse Crunch","Cuộn gối về ngực","Core",["Nằm ngửa, hai chân co, tay đặt cạnh thân.","Cuộn nhẹ hông để đưa gối hướng về ngực.","Hạ xuống chậm, không đung đưa chân."],"Không cần nâng hông quá cao.","Không cần dụng cụ");
  E("birdDog","Bird Dog","Chống bốn điểm duỗi tay chân","Core",["Chống hai tay và hai gối xuống sàn.","Duỗi tay phải và chân trái ra thẳng trong tầm kiểm soát.","Thu về rồi đổi bên, giữ hông không nghiêng."],"Chậm và chắc quan trọng hơn duỗi thật cao.","Không cần dụng cụ");
  E("woodChop","Resistance Band Wood Chop","Kéo dây chéo thân","Core",["Cố định dây chắc ở bên cạnh thân ngang bụng.","Hai tay giữ dây rồi kéo theo đường chéo vừa tầm.","Trở về từ từ; hoàn thành mỗi bên như nhau."],"Xoay từ thân và hông vừa phải, không giật lưng.","Cần điểm neo chắc chắn");
  E("pallof","Pallof Press","Đẩy dây chống xoay người","Core",["Cố định dây chắc ở bên cạnh, đứng ngang dây.","Giữ hai tay trước ngực rồi đẩy thẳng ra trước.","Giữ thân không bị kéo xoay, thu tay và đổi bên."],"Chọn dây nhẹ; không để thân bị vặn.","Cần điểm neo chắc chắn");
  E("heelTouch","Heel Touches","Nằm chạm gót hai bên","Core",["Nằm ngửa, co hai gối, đặt chân xuống sàn.","Nâng nhẹ vai khỏi sàn nếu thoải mái.","Nghiêng thân nhẹ để chạm lần lượt hai gót."],"Không kéo cổ bằng tay.","Không cần dụng cụ");
  E("standingKnee","Standing Knee to Elbow","Đưa gối gần khuỷu tay","Core",["Đứng thẳng, hai tay ngang vai.","Nâng gối bên cạnh về phía khuỷu cùng bên.","Đổi bên từ từ, không gập người quá sâu."],"Có thể tập không dây.","Không cần dụng cụ");
  E("plank","Forearm Plank","Giữ thân thẳng chống khuỷu","Core",["Chống hai khuỷu dưới vai, duỗi chân.","Giữ bụng và mông vừa căng, thân thẳng.","Thở đều trong suốt thời gian giữ."],"Hạ gối xuống nếu lưng võng.","Không cần dụng cụ");
  E("shoulderTap","Plank Shoulder Tap","Plank chạm vai luân phiên","Core",["Chống hai tay thẳng dưới vai.","Dùng một tay chạm nhẹ vai đối diện.","Đặt tay xuống rồi đổi bên, hạn chế lắc hông."],"Có thể chống tay lên bàn chắc để dễ hơn.","Không cần dụng cụ");
  E("march","Glute Bridge March","Nâng mông nhấc chân luân phiên","Core",["Nằm ngửa co gối rồi nâng mông.","Giữ hông cân, nhấc nhẹ một chân khỏi sàn.","Đặt xuống và đổi chân, không lắc hông."],"Nếu khó, tập Glute Bridge thường.","Không cần dụng cụ");
  E("pushup","Standard Push-Up","Hít đất chuẩn","Ngực",["Chống tay dưới vai","Hạ ngực có kiểm soát","Đẩy lên giữ thân thẳng"],"Giữ đủ biên độ, không võng lưng","Không cần dụng cụ");
  E("fastPush","Fast Push-Up","Hít đất nhanh liên tục","Ngực",["Hạ và đẩy nhịp nhanh đều","Giữ đủ biên độ","Dừng khi kỹ thuật giảm"],"Nhiều lần để rèn sức bền, không khóa khuỷu mạnh","Không cần dụng cụ");
  E("tempoPush","Tempo Push-Up","Hít đất chậm có giữ","Ngực",["Hạ 2 giây","Giữ dưới 1–2 giây rồi đẩy lên 2 giây","Giữ trên 1 giây"],"Giữ thân thẳng, chọn số lần vừa sức","Không cần dụng cụ");
  E("bandPush","Resistance Band Push-Up","Hít đất tăng tải bằng dây","Ngực",["Vòng dây qua lưng trên, giữ chắc hai đầu dưới tay","Hạ ngực có kiểm soát","Đẩy lên giữ thân thẳng"],"Kiểm tra dây không tuột, còn 1–3 lần dự trữ","Dây kháng lực");
  E("closePush","Close-Grip Push-Up","Hít đất tay hẹp","Tay",["Đặt tay gần nhau dưới ngực","Hạ người, khuỷu sát thân vừa phải","Đẩy lên"],"Không cần chạm ngón tay, dừng nếu đau cổ tay","Không cần dụng cụ");
  E("declinePush","Decline Push-Up","Hít đất kê chân cao","Ngực",["Kê chân lên bục thấp chắc","Hạ ngực chậm","Đẩy lên giữ thân thẳng"],"Không dùng bục trơn hoặc quá cao","Bục chắc chắn");
  E("explosivePush","Explosive Push-Up","Hít đất đẩy nhanh","Ngực",["Hạ có kiểm soát","Đẩy nhanh nhất có thể, tay không bắt buộc rời sàn","Ổn định trước lần tiếp"],"Dừng khi tốc độ giảm","Không cần dụng cụ");
  E("clapPush","Clapping Push-Up","Hít đất bộc phá vỗ tay","Ngực",["Khởi động cổ tay và vai, hạ người","Đẩy mạnh để tay rời sàn, vỗ nếu đủ độ cao","Tiếp đất khuỷu hơi chùng rồi ổn định"],"Chỉ chọn khi đã làm Explosive Push-Up an toàn","Không cần dụng cụ");
  E("pullup","Pull-Up (Overhand Grip)","Hít xà úp tay","Lưng",["Nắm xà lòng tay hướng ra trước","Kéo khuỷu xuống, nâng cằm qua xà nếu đủ sức","Hạ chậm"],"Không đung đưa, dùng trợ lực nếu cần","Xà đơn chắc chắn");
  E("chinup","Chin-Up (Underhand Grip)","Hít xà ngửa tay","Lưng",["Nắm xà lòng tay hướng về mặt","Kéo ngực về xà","Hạ có kiểm soát"],"Dừng nếu đau khuỷu hoặc cổ tay","Xà đơn chắc chắn");
  E("neutralPull","Neutral-Grip Pull-Up","Hít xà tay trung tính","Lưng",["Nắm tay cầm song song","Kéo ngực lên, khuỷu hướng xuống","Hạ chậm"],"Chỉ dùng tay cầm phù hợp","Xà đơn tay cầm song song");
  E("assistPull","Band-Assisted Pull-Up","Hít xà úp tay có trợ lực","Lưng",["Gắn dây vòng nguyên vẹn chắc vào xà, dùng bục vững đặt chân hoặc gối vào dây","Kéo lên bằng lưng","Hạ chậm và tháo dây khi đứng vững"],"Dây mạnh hơn giúp bài dễ hơn, tránh dây bật vào mặt","Xà đơn + dây vòng trợ lực");
  E("assistChin","Band-Assisted Chin-Up","Hít xà ngửa tay có trợ lực","Lưng",["Gắn dây vòng chắc vào xà, dùng bục vững đặt chân hoặc gối vào dây","Nắm ngửa tay và kéo lên","Hạ chậm rồi tháo dây an toàn"],"Dây mạnh hơn trợ lực nhiều hơn","Xà đơn + dây vòng trợ lực");
  E("negativePull","Negative Pull-Up","Hít xà âm hạ chậm","Lưng",["Dùng bục chắc vào vị trí cằm ngang xà","Hạ người 3–5 giây","Đặt chân lên bục rồi lặp"],"Không nhảy lên xà, chỉ 2–4 lần sạch","Xà đơn + bục chắc chắn");
  E("scapPull","Scapular Pull-Up","Kéo bả vai khi treo xà","Lưng",["Treo xà khuỷu gần thẳng","Kéo vai xuống để thân nhích lên","Thả chậm"],"Không gập khuỷu, giảm biên độ nếu khó chịu","Xà đơn chắc chắn");
  E("deadHang","Dead Hang","Treo xà rèn lực nắm","Cẳng tay",["Nắm xà chắc, chân có thể chạm bục","Giữ vai thoải mái, thở đều","Xuống bục có kiểm soát"],"Không treo đến tuột tay","Xà đơn chắc chắn");
  E("latPulldown","Resistance Band Lat Pulldown","Kéo dây từ trên xuống tập xô","Lưng",["Neo dây chắc phía trên đầu","Kéo khuỷu xuống hai bên","Trả tay chậm"],"Không ngửa người, kiểm tra neo","Cần điểm neo chắc chắn");
  E("bandPullover","Resistance Band Straight-Arm Pulldown","Kéo dây tay thẳng tập xô","Lưng",["Neo dây cao chắc chắn","Giữ tay hơi chùng, kéo xuống ngang hông","Trả tay chậm"],"Không ưỡn lưng","Cần điểm neo chắc chắn");
  E("crunch","Crunch","Gập bụng ngắn","Core",["Nằm ngửa co gối","Cuộn vai lên khỏi sàn, thở ra","Hạ chậm"],"Không kéo cổ","Không cần dụng cụ");
  E("hollow","Hollow Body Hold","Giữ bụng dạng thân cong","Core",["Nằm ngửa ép nhẹ lưng dưới xuống sàn","Nâng vai và chân vừa sức","Giữ và thở đều"],"Co gối nếu khó, dừng nếu lưng đau","Không cần dụng cụ");
  E("legRaise","Lying Leg Raise","Nằm nâng chân","Core",["Nằm ngửa co nhẹ gối","Nâng chân","Hạ chậm đến mức lưng còn ổn định"],"Không lấy đà hoặc võng lưng","Không cần dụng cụ");
  E("hangingKnee","Hanging Knee Raise","Treo xà nâng gối","Core",["Treo xà chắc vai ổn định","Cuộn nhẹ hông nâng gối","Hạ chậm"],"Không đung đưa, đổi Reverse Crunch nếu tay mỏi","Xà đơn chắc chắn");
  E("bicycle","Bicycle Crunch","Gập bụng đạp xe chéo","Core",["Nằm ngửa nâng nhẹ vai","Đưa khuỷu về gối đối diện","Đổi bên chậm"],"Không kéo cổ, đếm mỗi bên","Không cần dụng cụ");
  E("sideDip","Side Plank Hip Dip","Plank nghiêng nâng hạ hông","Core",["Chống khuỷu dưới vai","Hạ hông nhẹ rồi nâng thẳng","Đổi bên"],"Không sụp vai, có thể co gối","Không cần dụng cụ");
  E("suitcase","Band Suitcase Hold","Giữ dây một bên chống nghiêng","Core",["Đứng lên dây, cầm một tay","Giữ thân thẳng chống lực kéo lệch","Đổi bên, thở đều"],"Không cố nghiêng lưng","Dây kháng lực");
  E("backExtension","Prone Back Extension","Nằm sấp nâng ngực nhẹ","Hông & lưng dưới",["Nằm sấp tay cạnh thân","Nâng ngực nhẹ khỏi sàn","Hạ chậm"],"Không ưỡn lưng mạnh, dừng nếu đau","Không cần dụng cụ");
  E("proneYT","Prone Y-T Raise","Nằm sấp nâng tay chữ Y và T","Lưng",["Nằm sấp trán tựa khăn","Nâng tay nhẹ theo chữ Y rồi T","Hạ chậm"],"Mỗi cặp Y-T tính một lần","Không cần dụng cụ");
  E("singleRdl","Single-Leg Band RDL","Gập hông một chân với dây","Hông & lưng dưới",["Đạp dây bằng chân trụ","Gập hông chân kia ra sau","Đứng lên bằng mông rồi đổi bên"],"Vịn tường nếu chưa vững","Dây kháng lực");
  E("hamCurl","Sliding Hamstring Curl","Co gót trượt tập đùi sau","Chân & mông",["Nằm ngửa đặt gót lên khăn","Nâng nhẹ hông rồi kéo gót về mông","Duỗi chân có kiểm soát"],"Giảm biên độ nếu chuột rút","Khăn trên sàn phù hợp");
  E("singleCalf","Single-Leg Calf Raise","Nhón gót một chân","Bắp chân",["Đứng một chân vịn tường","Nhón gót","Hạ chậm rồi đổi bên"],"Không nảy gót","Không cần dụng cụ");
  E("bentCalf","Bent-Knee Calf Raise","Nhón gót gối chùng","Bắp chân",["Vịn tường khuỵu gối nhẹ","Giữ góc gối nâng gót","Hạ chậm"],"Tập cơ dép, dừng nếu đau gân","Không cần dụng cụ");
  E("tibRaise","Tibialis Raise","Nâng mũi chân tập mặt trước ống quyển","Bắp chân",["Tựa lưng vào tường, gót đặt sàn","Nâng mũi chân","Hạ từ từ"],"Dừng nếu đau xương ống quyển","Không cần dụng cụ");
  E("tuckJump","Tuck Jump","Bật nhảy co gối","Chân & mông",["Khởi động và hạ nhẹ người","Bật nhanh, co gối vừa sức","Tiếp đất êm rồi ổn định"],"Chỉ tập khi Squat Jump đã vững","Không cần dụng cụ");
  E("pogo","Pogo Jump","Bật nhẹ bằng cổ chân","Bắp chân",["Đứng gối hơi chùng","Bật thấp bằng cổ chân","Tiếp đất nhẹ"],"Dừng nếu tốc độ giảm hoặc gân đau","Không cần dụng cụ");
  E("broadJump","Standing Broad Jump","Bật xa tại chỗ","Chân & mông",["Chọn sàn không trơn, khoảng trống","Gập hông rồi bật ra trước","Tiếp đất hai chân gối chùng"],"Không cố đạt cự ly tối đa lúc mới tập","Không cần dụng cụ");
  E("speedPunch","Resistance Band Speed Punch","Đấm nhanh với dây nhẹ","Ngực",["Vòng dây nhẹ qua lưng trên","Đứng thế thủ đấm nhanh có kiểm soát","Thu tay về rồi đổi bên"],"Không khóa khuỷu hay dùng dây nặng","Dây kháng lực nhẹ");
  E("speedChop","Resistance Band Speed Wood Chop","Kéo chéo phát lực nhanh","Core",["Neo dây nhẹ chắc bên thân","Xoay hông và thân vừa tầm kéo chéo nhanh","Trả chậm rồi đổi bên"],"Không vặn lưng quá mức","Cần điểm neo chắc chắn");
  E("grip","Hand Gripper","Bóp tay rèn lực nắm","Cẳng tay",["Giữ dụng cụ vừa tay","Bóp chắc giữ cổ tay thẳng","Thả chậm đổi bên"],"Không tập khi đau khuỷu","Dụng cụ bóp tay");
  E("pikePush","Pike Push-Up","Hít đất chữ V tập vai","Vai",["Chống tay nâng hông thành chữ V","Gập khuỷu để đầu tiến gần sàn","Đẩy lên"],"Không dồn lực vào cổ, giảm độ dốc nếu yếu","Không cần dụng cụ");
  E("bandLateral","Resistance Band Lateral Lunge","Chùng chân ngang với dây","Chân & mông",["Đứng chân rộng giữ dây chắc hoặc bỏ dây","Dồn hông sang một bên","Đẩy về giữa đổi bên"],"Giữ gối cùng hướng bàn chân","Dây kháng lực");
  E("bandWrist","Resistance Band Wrist Curl","Gập cổ tay với dây","Cẳng tay",["Ngồi tựa cẳng tay lên đùi","Giữ dây dưới chân và gập cổ tay","Hạ chậm đổi bên"],"Dây nhẹ, không cố khi đau","Dây kháng lực nhẹ");
  E("speedPulldown","Resistance Band Speed Lat Pulldown","Kéo xô nhanh bằng dây nhẹ","Lưng",["Neo dây nhẹ chắc trên đầu","Kéo khuỷu xuống nhanh","Trả tay chậm nghỉ một nhịp"],"Không giật vai hay dùng dây nặng","Cần điểm neo chắc chắn");
  E("skater","Skater Jump","Bật ngang đổi chân","Chân & mông",["Bật ngang đoạn ngắn","Tiếp đất một chân gối hơi chùng","Ổn định rồi đổi bên"],"Bắt đầu bước ngang nếu chưa vững","Không cần dụng cụ");
  const TEMPLATES={
    strength:[
      ["leg","squat",["split","lunge","wallSit"],3,8,"reps"],
      ["push","chest",["floorChest","inclinePush","fly"],3,8,"reps"],
      ["pull","row",["singleRow","seatedRow","pullApart"],3,9,"reps"],
      ["shoulder","overhead",["lateralRaise","frontRaise","externalRot"],2,9,"reps"],
      ["hip","rdl",["goodMorning","bandDeadlift","hipHinge"],2,9,"reps"],
      ["biceps","curl",["hammerCurl","altCurl"],2,10,"reps"],
      ["triceps","triceps",["kickback","overheadTri"],2,10,"reps"],
      ["oblique","sidePlank",["pallof","sideReach","standingKnee"],2,60,"seconds"],
      ["core","deadBug",["birdDog","reverseCrunch","plank"],2,9,"reps"]
    ],
    power:[
      ["jump","squatJump",["squat","lunge","calf"],3,4,"reps"],
      ["speedPush","speedPress",["wallPush","chest","inclinePush"],3,5,"reps"],
      ["speedPull","speedRow",["row","singleRow","pullApart"],3,5,"reps"],
      ["leg","lunge",["squat","split","lateralWalk"],2,8,"reps"],
      ["hip","rdl",["goodMorning","hipHinge","gluteBridge"],2,9,"reps"],
      ["upperBack","pullApart",["reverseFly","facePull","row"],2,12,"reps"],
      ["oblique","woodChop",["pallof","sidePlank","standingKnee"],2,10,"reps"],
      ["backCore","birdDog",["deadBug","plank","march"],2,9,"reps"],
      ["calf","calf",["lateralWalk","gluteBridge","wallSit"],2,15,"reps"]
    ],
    balance:[
      ["leg","split",["lunge","squat","wallSit"],2,9,"reps"],
      ["pull","singleRow",["row","seatedRow","pullApart"],3,10,"reps"],
      ["push","floorChest",["chest","inclinePush","fly"],2,10,"reps"],
      ["shoulder","lateralRaise",["overhead","frontRaise","reverseFly"],2,12,"reps"],
      ["hip","goodMorning",["rdl","hipHinge","bandDeadlift"],2,10,"reps"],
      ["upperBack","facePull",["pullApart","reverseFly","row"],2,12,"reps"],
      ["oblique","pallof",["sidePlank","woodChop","sideReach"],2,10,"reps"],
      ["abs","reverseCrunch",["deadBug","heelTouch","plank"],2,12,"reps"],
      ["rotator","externalRot",["pullApart","reverseFly","lateralRaise"],2,12,"reps"]
    ],
    recovery:[
      ["leg","lateralWalk",["lunge","squat","gluteBridge"],2,10,"reps"],
      ["upperBack","pullApart",["reverseFly","facePull","row"],2,12,"reps"],
      ["hip","gluteBridge",["hipHinge","goodMorning","rdl"],2,12,"reps"],
      ["backCore","birdDog",["deadBug","march","plank"],2,8,"reps"],
      ["core","deadBug",["plank","reverseCrunch","heelTouch"],2,8,"reps"],
      ["oblique","sidePlank",["standingKnee","pallof","sideReach"],2,40,"seconds"]
    ]
  };
  const EXTRA_OPTIONS={"strength":{"leg":"bandLateral","push":"bandPush tempoPush declinePush pushup closePush","pull":"pullup chinup neutralPull assistPull assistChin negativePull latPulldown bandPullover","shoulder":"pikePush","hip":"singleRdl hamCurl backExtension","biceps":"chinup assistChin grip bandWrist","triceps":"closePush bandPush","oblique":"sideDip suitcase woodChop bicycle","core":"crunch hollow legRaise hangingKnee backExtension"},"power":{"jump":"tuckJump broadJump skater pogo","speedPush":"explosivePush clapPush speedPunch","speedPull":"speedPulldown","leg":"bandLateral","hip":"singleRdl hamCurl backExtension","upperBack":"proneYT scapPull","oblique":"speedChop sideDip suitcase","backCore":"hollow backExtension crunch","calf":"pogo singleCalf bentCalf tibRaise"},"balance":{"leg":"bandLateral","pull":"pullup chinup neutralPull assistPull assistChin scapPull latPulldown bandPullover","push":"fastPush tempoPush pushup closePush declinePush","shoulder":"pikePush","hip":"singleRdl hamCurl backExtension","upperBack":"proneYT scapPull deadHang","oblique":"bicycle sideDip suitcase","abs":"crunch hollow legRaise hangingKnee bicycle","rotator":"proneYT bandWrist grip"},"recovery":{"leg":"tibRaise bentCalf","upperBack":"proneYT scapPull","hip":"backExtension","backCore":"backExtension","core":"crunch hollow","oblique":"sideDip suitcase"}};
  for(const [mode,slots] of Object.entries(EXTRA_OPTIONS))for(const slot of TEMPLATES[mode])slot[2]=[...new Set([...slot[2],...(slots[slot[0]]||"").split(" ").filter(Boolean)])].filter(id=>id!==slot[1]);
  const EXTRA_SLOTS={"strength":[["verticalPull","latPulldown",["bandPullover","pullup","chinup","neutralPull","assistPull","assistChin","negativePull","row"],2,8,"reps"]],"balance":[["calf","singleCalf",["bentCalf","tibRaise","calf"],2,12,"reps"],["grip","grip",["deadHang","bandWrist","hammerCurl"],1,12,"reps"]]};
  for(const [mode,slots] of Object.entries(EXTRA_SLOTS))TEMPLATES[mode].push(...slots);
  const POWER_SLOTS=new Set(["jump","speedPush","speedPull"]);
  const EXPLOSIVE=new Set("squatJump tuckJump broadJump skater pogo speedPress wallPush explosivePush clapPush speedPunch speedRow speedPulldown speedChop".split(" "));
  const PULL_IDS=new Set("pullup chinup neutralPull assistPull assistChin negativePull scapPull".split(" "));
  const UNILATERAL=new Set("split lunge singleRow woodChop pallof birdDog deadBug externalRot standingKnee sideReach altCurl bicycle sideDip singleRdl singleCalf speedPunch speedChop grip bandLateral bandWrist skater heelTouch shoulderTap march lateralWalk".split(" "));
  const MODE_FILTERS={all:"Mọi mục tiêu",strength:"Sức mạnh",power:"Bộc phát",balance:"Sức bền / Cân bằng",recovery:"Phục hồi"};
  function exerciseModes(id){return Object.keys(TEMPLATES).filter(mode=>TEMPLATES[mode].some(slot=>[slot[1],...slot[2]].includes(id)));}
  function campaignEngine(){
  // Targets are personal challenges, not scientifically equivalent strength standards.
  const v=(id, name, goals, cap, step, unit="reps", both=false, band=false, cue="")=>({id,name,goals,cap,step,unit,both,band,cue});
  const domains=[
    {id:"push",name:"Đẩy · Ngực / tay sau",goal:"Đẩy thân hoặc tải có kiểm soát",options:[
      v("pushup","Standard Push-Up",[15,25,40],50,2,"reps",false,false,"Ngực hạ tới cùng một độ sâu; thân thẳng, không võng lưng."),
      v("tempoPush","Tempo Push-Up (3–1–1)",[6,10,15],20,1,"reps",false,false,"Hạ 3 giây, dừng 1 giây, đẩy 1 giây; không nghỉ ở đỉnh."),
      v("chest","Band Chest Press",[10,14,18],24,1,"reps",false,true,"Dùng cùng loại dây, độ căng ban đầu và biên độ khi so sánh.")]},
    {id:"pull",name:"Kéo · Lưng / tay trước",goal:"Kéo bằng lưng, không lấy đà",options:[
      v("pullup","Pull-Up",[3,6,10],15,1,"reps",false,false,"Bắt đầu tay gần thẳng, cằm qua xà, hạ có kiểm soát. Không đung đưa."),
      v("chinup","Chin-Up",[3,6,10],15,1,"reps",false,false,"Tay ngửa, cằm qua xà; không đá chân."),
      v("row","Resistance Band Row",[10,14,18],24,1,"reps",false,true,"Gập hông ổn định; kéo khuỷu tới hông, giữ cùng mức dây và độ căng.")]},
    {id:"legs",name:"Chân · Đùi / mông",goal:"Sức bền và kiểm soát chân",options:[
      v("bodySquat","Bodyweight Squat",[20,30,40],50,2,"reps",false,false,"Hạ tới độ sâu cố định, vừa sức; gối cùng hướng bàn chân, đứng thẳng giữa các lần."),
      v("bodySplit","Bodyweight Split Squat",[8,12,16],22,1,"reps",true,false,"Hạ thẳng thân, gối trước ổn định; cùng độ sâu mỗi bên."),
      v("squat","Resistance Band Squat",[8,12,16],22,1,"reps",false,true,"Giữ dây và độ căng cố định, không tăng dây chỉ để thi.")]},
    {id:"hinge",name:"Chuỗi sau · Hông / lưng",goal:"Gập hông và duỗi hông ổn định",options:[
      v("rdl","Resistance Band Romanian Deadlift",[8,12,16],20,1,"reps",false,true,"Đẩy hông ra sau, lưng tự nhiên; không giật người."),
      v("bridge","Single-Leg Glute Bridge",[8,12,16],22,1,"reps",true,false,"Một chân trụ, nâng hông đều hai bên; không ưỡn lưng.")]},
    {id:"core",name:"Core · Chống võng lưng",goal:"Giữ thân ổn định, thở đều",options:[
      v("plank","Forearm Plank",[45,75,120],150,5,"seconds",false,false,"Thân thẳng, dừng ngay khi võng lưng hoặc phải nín thở."),
      v("hollow","Hollow Body Hold",[15,25,40],60,5,"seconds",false,false,"Lưng dưới tiếp xúc sàn, chân duỗi ở cùng độ cao; không cố khi đau.")]},
    {id:"oblique",name:"Eo · Chống nghiêng / xoay",goal:"Ổn định cơ liên sườn ở cả hai bên",options:[
      v("sidePlank","Side Plank",[20,30,45],60,5,"seconds",true,false,"Chân duỗi, khuỷu dưới vai, hông không sụp; kiểm tra riêng trái/phải."),
      v("pallof","Pallof Press",[8,12,16],20,1,"reps",true,true,"Giữ tay duỗi 2 giây mỗi lần; không để thân xoay. Dây nhẹ, neo chắc.")]},
    {id:"balance",name:"Cân bằng · Kiểm soát một chân",goal:"Kiểm soát hai bên đồng đều",options:[
      v("stance","Single-Leg Stand",[20,30,45],60,5,"seconds",true,false,"Mắt mở, sàn phẳng, đứng gần tường; không vịn hoặc chạm chân còn lại."),
      v("singleHinge","Single-Leg Bodyweight RDL",[6,10,12],18,1,"reps",true,false,"Gập hông chậm, chân sau đưa ra sau; không cần hạ sâu, không vịn trong lần được tính.")]},
    {id:"power",name:"Bộc phát · Tốc độ / tiếp đất",goal:"Phát lực nhanh, không thử đến kiệt sức",options:[
      v("broadJump","Standing Broad Jump",[70,100,130],160,5,"cm",false,false,"Khởi động, thử 3 lần ở mức tự tin; nghỉ 60–90 giây/lần. Đo từ vạch bật tới gót gần nhất khi tiếp đất. Nhập khoảng cách thấp nhất của 3 lần tiếp đất vững. Không cố nhảy tối đa."),
      v("verticalJump","Vertical Reach Jump",[15,20,25],35,2,"cm",false,false,"Đo tầm với đứng, sau đó độ cao chạm khi bật tại chỗ trừ tầm với đứng. Nhập mức thấp nhất của 3 lần tiếp đất vững, nghỉ 60–90 giây/lần."),
      v("speedPress","Speed Chest Press (không nhảy)",[3,4,5],5,1,"reps",false,true,"Dây nhẹ, mỗi lần đẩy nhanh có kiểm soát, không khóa khuỷu. Dừng khi tốc độ giảm. Chỉ đánh giá chất lượng kỹ thuật tự ghi nhận, không đo công suất.")] }
  ];
  const roman=n=>{if(n>3999)return String(n);let s="";for(const [a,b] of [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]])while(n>=a){s+=b;n-=a;}return s;};
  const name=n=>n<=3?"Giai đoạn "+roman(n):"Endless "+roman(n-3);
  const theme=n=>["","Nền tảng","Phát triển","Nâng cao"][n]||"Thành tích cá nhân & duy trì";
  const integer=(x,lo,hi)=>typeof x==="number"&&Number.isSafeInteger(x)&&x>=lo&&x<=hi;
  const goal=(n,o,di)=>n<=3?o.goals[n-1]:Math.min(o.cap,o.goals[2]+o.step*Math.max(0,Math.floor((n-4+domains.length-di)/domains.length)));
  const unit=o=>o.unit==="seconds"?"giây":o.unit==="cm"?"cm":"lần";
  const label=(o,g)=>g+" "+unit(o)+(o.both?" / bên":"");
  const validResult=(r,n,d)=>{
    if(!r||r.level!==n||r.domain!==d.id||typeof r.date!=="string")return false;
    const o=d.options.find(x=>x.id===r.option);
    if(!o||!integer(r.goal,1,o.cap)||!integer(r.a,0,9999)||(o.both&&!integer(r.b,0,9999)))return false;
    if(n<=3?r.goal!==goal(n,o,domains.indexOf(d)):r.goal<o.goals[2])return false;
    return r.form===true&&r.a>=r.goal&&(!o.both||r.b>=r.goal)&&(!o.band||(typeof r.setup==="string"&&r.setup.trim().length>0));
  };
  const clean=x=>{
    const raw=x&&typeof x==="object"?x:{},level=integer(raw.level,1,Number.MAX_SAFE_INTEGER-1)?raw.level:1;
    const history=Array.isArray(raw.history)?raw.history.filter(r=>r&&typeof r==="object"&&typeof r.date==="string").slice(-400):[];
    const completed=Array.isArray(raw.completed)?raw.completed.filter(r=>r&&integer(r.level,1,level-1)&&typeof r.date==="string").slice(-100):[];
    const passes={};for(const d of domains){let r=raw.passes&&raw.passes[d.id];if(validResult(r,level,d))passes[d.id]=r;}
    return {level,history,completed,passes,fullMedals:ME.clean(raw.fullMedals,level)};
  };
  const save=(state,r)=>{
    const s=clean(state),d=domains.find(x=>x.id===r.domain);
    if(!d||r.level!==s.level||s.passes[d.id])return {state:s,accepted:false,passed:false,unlocked:false};
    const o=d.options.find(x=>x.id===r.option);
    if(!o||!integer(r.goal,1,o.cap)||!integer(r.a,0,9999)||(o.both&&!integer(r.b,0,9999))||r.form!==true||(o.band&&!(typeof r.setup==="string"&&r.setup.trim())))return {state:s,accepted:false,passed:false,unlocked:false};
    if(s.level<=3?r.goal!==goal(s.level,o,domains.indexOf(d)):r.goal<o.goals[2])return {state:s,accepted:false,passed:false,unlocked:false};
    const passed=validResult(r,s.level,d);
    const record={...r,passed};s.history=[...s.history,record].slice(-400);
    if(passed)s.passes[d.id]=record;
    let unlocked=false;
    if(domains.every(x=>s.passes[x.id])){
      s.completed=[...s.completed,{level:s.level,date:r.date,results:domains.map(x=>s.passes[x.id])}].slice(-100);
      s.level++;s.passes={};unlocked=true;
    }
    return {state:s,accepted:true,passed,unlocked};
  };
  return {domains,name,theme,goal,unit,label,clean,save,validResult};
}
  const CE=campaignEngine();
  function medalEngine(CE){
  const order=["power","push","pull","legs","hinge","balance","core","oblique"];
  const rest={power:180,push:180,pull:180,legs:120,hinge:180,balance:60,core:120,oblique:120};
  const plan=(s,level)=>{
    if(!Number.isSafeInteger(level)||level<1||level>=s.level)return null;
    const old=s.completed.find(x=>x.level===level);
    return order.map(id=>{
      const d=CE.domains.find(x=>x.id===id),r=old?.results?.find(x=>x.domain===id);
      const valid=CE.validResult(r,level,d),o=valid?d.options.find(x=>x.id===r.option):d.options[0];
      return {id,option:o.id,goal:valid?r.goal:CE.goal(level,o,CE.domains.indexOf(d)),setup:valid&&o.band?r.setup:"",rest:rest[id]};
    });
  };
  const verify=(level,items,results)=>{
    if(!Array.isArray(items)||items.length!==8||!Array.isArray(results)||results.length!==8)return false;
    return order.every((id,i)=>{
      const d=CE.domains.find(x=>x.id===id),t=items[i],r=results[i];
      return t?.id===id&&r?.option===t.option&&r?.goal===t.goal&&(!t.setup||r.setup===t.setup)&&CE.validResult(r,level,d);
    });
  };
  const clean=(raw,level)=>{
    const out={};
    if(raw&&typeof raw==="object"&&!Array.isArray(raw))for(const [key,x] of Object.entries(raw)){
      const n=Number(key);
      if(Number.isSafeInteger(n)&&n>=1&&n<level&&x?.level===n&&typeof x.date==="string"&&Number.isFinite(x.duration)&&x.duration>=0&&x.duration<=7200&&verify(n,x.plan,x.results))out[n]=x;
    }
    return out;
  };
  const award=(s,run,now)=>{
    if(!run||!Number.isFinite(now)||!Number.isFinite(run.started)||now<run.started||now-run.started>7200000||run.level>=s.level||run.level<1||!verify(run.level,run.plan,run.results))return false;
    if(s.fullMedals[run.level])return false;
    s.fullMedals[run.level]={level:run.level,date:new Date(now).toISOString(),duration:Math.floor((now-run.started)/1000),plan:run.plan,results:run.results};return true;
  };
  return {order,rest,plan,verify,clean,award};
}
  const ME=medalEngine(CE);
  function fullStageUI(){
  let run=null,interval=null,work=null;
  const by=id=>document.getElementById(id),safe=x=>esc(String(x??""));
  const b=(label,act,cls="secondary-btn",extra="")=>'<button type="button" class="'+cls+'" data-full="'+act+'" '+extra+'>'+label+'</button>';
  const refresh=()=>{app.innerHTML=render();window.scrollTo(0,0);updateRest();};
  const campaign=()=>CE.clean(S.campaign);
  function clear(){if(interval)clearInterval(interval);if(work)clearInterval(work.handle);interval=null;work=null;run=null;}
  function active(){return !!run;}
  function medal(which,earned){return '<div class="medal-item '+(earned?'earned':'locked')+'"><span class="medal-symbol '+which+'">'+(which==="individual"?"◆":"✦")+'</span><div><b>'+(which==="individual"?"Bền bỉ · Individual":"Toàn diện · Full Stage")+'</b><small>'+(earned?"Đã nhận":"Chưa đạt")+'</small></div></div>';}
  function summary(s){
    const total=Object.keys(s.fullMedals).length;
    let recent=[];
    for(let n=s.level-1;n>=Math.max(1,s.level-8);n--)recent.push(n);
    return '<section class="card medal-panel"><div class="eyebrow">MEDAL COLLECTION · HUÂN CHƯƠNG</div><h2>Bộ sưu tập thành tích</h2><p class="muted tiny">Mỗi cấp có hai huân chương độc lập. Hoàn thành từng mục để nhận Bền bỉ và mở khóa cấp tiếp theo. Vượt lại cả 8 bài trong một buổi để nhận Toàn diện.</p><div class="medal-counts"><div><strong>'+(s.level-1)+'</strong><small>Bền bỉ</small></div><div><strong>'+total+'</strong><small>Toàn diện</small></div></div>'+
    '<div class="medal-level"><b>'+CE.name(s.level)+' · hiện tại</b>'+medal("individual",false)+medal("full",false)+'</div>'+
    recent.map(n=>'<div class="medal-level"><b>'+CE.name(n)+'</b>'+medal("individual",true)+medal("full",!!s.fullMedals[n])+(s.fullMedals[n]?'<small class="muted">Toàn diện: '+safe(isoDay(s.fullMedals[n].date))+'</small>':b("Full Stage Test","start","primary-btn wide",'data-level="'+n+'"'))+'</div>').join("")+
    (s.level>9?'<label class="medal-picker">Chọn cấp cũ (số thứ tự; Endless I = 4)<input id="medalLevel" type="number" min="1" max="'+(s.level-1)+'" value="1" step="1"></label>'+b("Xem / test cấp cũ","older"):"")+
    (s.level===1?'<div class="inline-note">Full Stage Test sẽ mở sau khi nhận huân chương Bền bỉ đầu tiên.</div>':"")+'</section>';
  }
  function render(){
    if(!run)return "";
    const t=run.plan[run.results.length],d=t&&CE.domains.find(x=>x.id===t.id),o=d&&d.options.find(x=>x.id===t.option);
    const top='<section class="card"><div class="eyebrow">FULL STAGE TEST · '+CE.name(run.level)+'</div><h2>Thử thách Toàn diện</h2><p>'+run.results.length+'/8 bài đã kiểm tra · '+run.results.filter(r=>r.passed).length+' bài đạt</p><progress class="cp-progress" max="8" value="'+run.results.length+'"></progress><div class="full-order">'+run.plan.map((x,i)=>'<div class="'+(i===run.results.length?'current':'')+'">'+(i+1)+'. '+safe(CE.domains.find(d=>d.id===x.id).name)+' <b>'+(run.results[i]?(run.results[i].passed?"Đạt":"Chưa đạt"):i===run.results.length?"Tiếp theo":"")+'</b></div>').join("")+'</div></section>';
    const stop=b("Dừng / thoát thử thách","cancel");
    if(run.phase==="intro")return top+'<section class="card cp-test"><h2>Chuẩn bị</h2><p>Test 8 bài theo thứ tự cố định, dùng đúng biến thể và mục tiêu đã đạt ở Individual Test nếu còn hồ sơ. Không lấy kết quả từ ngày trước. Đạt mốc thì dừng, không thi tối đa. Dùng đúng thông số dây đã ghi.</p><p>Thời gian nghỉ tối thiểu 60–180 giây tùy bài; có thể nghỉ thêm. Đây là thử thách tự ghi nhận, không phải chuẩn thể lực chính thức. Tối đa 120 phút trong cùng phiên; tải lại trang sẽ hủy phiên chưa hoàn thành. Không cần cố làm đủ nếu mệt hoặc đau.</p><label class="cp-check"><input id="fsReady" type="checkbox">Tôi đã khởi động, hồi phục tốt, không đau/chóng mặt và có dụng cụ an toàn.</label><div class="cp-buttons">'+b("Bắt đầu 8 bài","begin","primary-btn")+stop+'</div></section>';
    if(run.phase==="done")return top+'<section class="card cp-test"><h2>'+(run.earned?"✦ Nhận huân chương Toàn diện!":"Chưa đạt huân chương Toàn diện")+'</h2><p>'+run.results.filter(r=>r.passed).length+'/8 bài đạt trong cùng buổi. '+(run.earned?"Thành tích đã lưu vĩnh viễn trong dữ liệu app.":"Hãy hồi phục rồi thử lại vào buổi khác. Huân chương Bền bỉ vẫn giữ nguyên.")+'</p>'+b("Về bộ sưu tập","finish","primary-btn wide")+'</section>';
    if(run.phase==="rest")return top+'<section class="card cp-test"><div class="eyebrow">RECOVERY · NGHỈ GIỮA BÀI</div><div class="cp-clock"><strong id="fsRest">'+formatTime(Math.max(0,Math.ceil((run.deadline-Date.now())/1000)))+'</strong><p class="muted tiny">Tối thiểu '+run.restMin+' giây. Nghỉ thêm nếu cần.</p></div><p>Tiếp theo: <b>'+safe(o.name)+'</b> · '+CE.label(o,t.goal)+'</p><div class="cp-buttons">'+b("+30 giây","extend")+b("Bài tiếp theo","next","primary-btn",'id="fsNext" disabled')+stop+'</div></section>';
    const inputs=(id,label)=>'<label>'+label+'<input type="number" id="'+id+'" min="0" max="9999" step="1" required inputmode="numeric" placeholder="Kết quả thật"></label>';
    const timer=o.unit==="seconds"?'<div class="cp-clock"><strong id="fsClock">00:00</strong><div class="cp-buttons">'+b(o.both?"Bấm giờ trái":"Bấm giờ","clock","secondary-btn",'data-field="fsA"')+(o.both?b("Bấm giờ phải","clock","secondary-btn",'data-field="fsB"'):"")+b("Dừng & điền","clock-stop")+'</div><p class="muted tiny">Dừng ở mốc hoặc khi mất kỹ thuật. Có thể nhập tay.'+(o.both?" Nghỉ ít nhất 60 giây khi đổi bên.":"")+'</p></div>':"";
    return top+'<section class="card cp-test"><div class="eyebrow">BÀI '+(run.results.length+1)+' / 8</div><h2>'+safe(o.name)+'</h2><p><b>Mục tiêu: '+CE.label(o,t.goal)+'</b></p><p>'+safe(o.cue)+'</p><form id="fsForm">'+timer+inputs("fsA",o.both?"Bên trái · "+CE.unit(o):"Kết quả · "+CE.unit(o))+(o.both?inputs("fsB","Bên phải · "+CE.unit(o)):"")+
    (o.band?'<label>Thông số / cách đặt dây<input id="fsSetup" type="text" required maxlength="160" value="'+safe(t.setup)+'" '+(t.setup?"readonly":"")+' placeholder="Dây, vị trí chân/neo"></label>':'')+
    '<label class="cp-check"><input type="checkbox" id="fsOK" required>Chỉ ghi kết quả đúng kỹ thuật, không đau, đã dừng khi kỹ thuật giảm.'+(t.setup?" Tôi dùng đúng thông số dây ghi ở trên.":"")+'</label><div class="cp-buttons"><button type="submit" class="primary-btn">Lưu bài & nghỉ</button>'+stop+'</div></form></section>';
  }
  function updateRest(){
    if(!run||run.phase!=="rest")return;
    const n=Math.max(0,Math.ceil((run.deadline-Date.now())/1000)),el=by("fsRest"),next=by("fsNext");
    if(el)el.textContent=formatTime(n);if(next)next.disabled=n>0;
    if(n===0&&interval){clearInterval(interval);interval=null;try{alertEnd();}catch(_){}}
  }
  function stopWork(copy){
    if(!work)return;const elapsed=Math.min(work.goal,Math.max(0,Math.floor((performance.now()-work.start)/1000)));
    clearInterval(work.handle);if(copy&&by(work.field))by(work.field).value=String(elapsed);
    if(by("fsClock"))by("fsClock").textContent=formatTime(elapsed);work=null;
  }
  function start(level){
    if(S.active||readiness==="poor"){toast("Hãy hoàn thành buổi đang dở hoặc nghỉ hồi phục trước.");return;}
    const s=campaign();
    if(s.fullMedals[level]){toast("Đã nhận Toàn diện ở "+CE.name(level));return;}
    const plan=ME.plan(s,level);if(!plan){toast("Cấp độ chưa mở Full Stage Test.");return;}
    clear();run={level,plan,results:[],phase:"intro",started:null,deadline:0};refresh();
  }
  function click(e){
    const el=e.target.closest("[data-full]");if(!el||page!=="campaign")return;
    const a=el.dataset.full;
    if(a==="start"||a==="older"){start(a==="start"?Number(el.dataset.level):by("medalLevel")?.valueAsNumber);return;}
    if(!run)return;
    if(a==="finish"){clear();CP.redraw();return;}
    if(a==="cancel"){if(run.phase==="intro"||confirm("Dừng thử thách? Phiên Full Stage này sẽ không nhận huân chương.")){clear();CP.redraw();}return;}
    if(a==="begin"){
      if(!by("fsReady")?.checked||S.active||readiness==="poor"){toast("Xác nhận đã khởi động và đủ điều kiện an toàn.");return;}
      run.started=Date.now();run.phase="test";refresh();return;
    }
    if(run.started&&Date.now()-run.started>7200000){toast("Đã hết 120 phút. Hãy thử lại vào ngày khác.");clear();CP.redraw();return;}
    if(a==="extend"&&run.phase==="rest"){run.deadline=Math.max(Date.now(),run.deadline)+30000;if(!interval)interval=setInterval(updateRest,250);updateRest();return;}
    if(a==="next"&&run.phase==="rest"&&Date.now()>=run.deadline){if(interval)clearInterval(interval);interval=null;run.phase="test";refresh();return;}
    if(a==="clock-stop"){stopWork(true);return;}
    if(a==="clock"&&run.phase==="test"&&!work){
      const t=run.plan[run.results.length],d=CE.domains.find(x=>x.id===t.id),o=d.options.find(x=>x.id===t.option);
      const field=el.dataset.field;if(o.unit!=="seconds"||!["fsA","fsB"].includes(field)||!by(field))return;
      work={start:performance.now(),goal:t.goal,field,handle:setInterval(()=>{if(!work)return;const n=Math.floor((performance.now()-work.start)/1000);if(by("fsClock"))by("fsClock").textContent=formatTime(Math.min(n,work.goal));if(n>=work.goal){stopWork(true);try{alertEnd();}catch(_){}}},200)};
      if(by("fsClock"))by("fsClock").textContent="00:00";
    }
  }
  function submit(e){
    if(e.target.id!=="fsForm")return;e.preventDefault();
    if(!run||run.phase!=="test"||work||S.active||readiness==="poor"||!e.target.reportValidity())return;
    if(Date.now()-run.started>7200000){clear();CP.redraw();toast("Phiên đã hết thời gian.");return;}
    const t=run.plan[run.results.length],d=CE.domains.find(x=>x.id===t.id),o=d.options.find(x=>x.id===t.option);
    const r={level:run.level,domain:d.id,option:o.id,goal:t.goal,a:by("fsA").valueAsNumber,b:o.both?by("fsB").valueAsNumber:null,setup:o.band?by("fsSetup").value.trim():"",form:by("fsOK").checked,date:stamp()};
    if(!Number.isSafeInteger(r.a)||r.a<0||r.a>9999||(o.both&&(!Number.isSafeInteger(r.b)||r.b<0||r.b>9999))||!r.form||(o.band&&!r.setup)||(t.setup&&r.setup!==t.setup)){toast("Kết quả hoặc thông số dây chưa hợp lệ.");return;}
    r.passed=CE.validResult(r,run.level,d);run.results.push(r);
    if(run.results.length===8){
      const s=campaign();run.earned=ME.award(s,run,Date.now());S.campaign=s;persist();run.phase="done";refresh();return;
    }
    run.phase="rest";run.restMin=t.rest;run.deadline=Date.now()+1000*t.rest;refresh();interval=setInterval(updateRest,250);updateRest();
  }
  function attach(){app.addEventListener("click",click);app.addEventListener("submit",submit);document.addEventListener("visibilitychange",()=>{if(document.hidden&&work)stopWork(false);if(!document.hidden)updateRest();});}
  return {summary,render,active,clear,attach};
}
  const FS=fullStageUI();
  function campaignUI(){
  let draft=null,clock=null;
  const byId=id=>document.getElementById(id);
  const safe=x=>esc(String(x??""));
  const state=()=>CE.clean(S.campaign);
  const btn=(label,action,extra="",cls="secondary-btn")=>'<button type="button" class="'+cls+'" data-campaign="'+action+'" '+extra+'>'+label+'</button>';
  function stopClock(copy=false){
    if(!clock)return;
    const elapsed=Math.min(clock.goal,Math.max(0,Math.floor((performance.now()-clock.start)/1000)));
    clearInterval(clock.handle);
    if(copy){const input=byId(clock.field);if(input)input.value=String(elapsed);}
    clock=null;
    const el=byId("cpClock");if(el)el.textContent=elapsed+" giây";
  }
  function clear(){stopClock();draft=null;FS.clear();}
  function home(){
    const s=state(),n=Object.keys(s.passes).length;
    return '<section class="card cp-home"><div class="eyebrow">STRENGTH CAMPAIGN</div><h2>'+CE.name(s.level)+' · '+CE.theme(s.level)+'</h2><p class="muted tiny">'+n+'/'+CE.domains.length+' mục tiêu đạt · Thử sức và mở khóa cấp độ tiếp theo.</p><progress class="cp-progress" max="'+CE.domains.length+'" value="'+n+'"></progress>'+btn("Xem mục tiêu & Test thử →","open","","primary-btn wide")+'</section>';
  }
  function road(s){
    const levels=[1,2,3,...Array.from({length:Math.max(3,Math.min(5,s.level-1))},(_,i)=>Math.max(4,s.level-1)+i)];
    return '<div class="cp-road">'+[...new Set(levels)].sort((a,b)=>a-b).map(n=>'<div class="cp-stage '+(n===s.level?'current':'')+'"><b>'+CE.name(n)+'</b><small>'+(n<s.level?'Đã vượt qua':n===s.level?'Đang mở':'Khóa')+'</small></div>').join("")+'</div>';
  }
  function config(s){
    const d=CE.domains.find(x=>x.id===draft.domain),di=CE.domains.indexOf(d);
    if(!d||s.passes[d.id]||draft.level!==s.level){clear();return "";}
    const o=d.options.find(x=>x.id===draft.option)||d.options[0],suggested=CE.goal(s.level,o,di);
    if(draft.phase==="ready"){
      return '<section class="card cp-test"><div class="eyebrow">CHỌN BÀI KIỂM TRA</div><h2>'+safe(d.name)+'</h2><p class="muted tiny">Chọn một bài phù hợp dụng cụ. Các biến thể là mục tiêu thay thế, không phải quy đổi sức mạnh tương đương.</p><label>Biến thể<select id="cpOption">'+d.options.map(x=>'<option value="'+x.id+'" '+(o.id===x.id?'selected':'')+'>'+safe(x.name)+' · '+CE.label(x,CE.goal(s.level,x,di))+'</option>').join("")+'</select></label><p>'+safe(o.cue)+'</p><label>Mốc '+(s.level<=3?'cố định':'cá nhân (Endless)')+'<input id="cpGoal" type="number" min="'+(s.level<=3?suggested:o.goals[2])+'" max="'+(s.level<=3?suggested:o.cap)+'" step="1" value="'+suggested+'" '+(s.level<=3?'readonly':'')+'></label><p class="muted tiny">'+CE.unit(o)+(o.both?' mỗi bên':'')+' · '+(s.level>3?'Mốc gợi ý '+suggested+'; không thấp hơn chuẩn III của bài. Có thể giữ mốc khi đã chạm giới hạn.':'Đạt mốc rồi dừng, không bắt buộc tập tối đa.')+'</p><label class="cp-check"><input id="cpReady" type="checkbox">Tôi đã khởi động, không đau, không chóng mặt, không mệt bất thường và có dụng cụ/vị trí an toàn.</label><div class="cp-buttons">'+btn("Chốt mục tiêu · Bắt đầu","begin","","primary-btn")+btn("Quay lại","cancel")+'</div></section>';
    }
    const goal=draft.goal;
    const inputs=(id,lab)=>'<label>'+lab+'<input id="'+id+'" type="number" min="0" max="9999" step="1" required inputmode="numeric" placeholder="Nhập kết quả thực tế"></label>';
    const timer=o.unit==="seconds"?'<div class="cp-clock"><strong id="cpClock">0 giây</strong><div class="cp-buttons">'+btn(o.both?"Bấm giờ trái":"Bấm giờ","clock",'data-field="cpA"')+(o.both?btn("Bấm giờ phải","clock",'data-field="cpB"'):"")+btn("Dừng & điền","clock-stop")+'</div><p class="muted tiny">Đồng hồ tự dừng ở mốc mục tiêu; dừng sớm nếu kỹ thuật hỏng. Có thể nhập tay.</p></div>':"";
    const ex=EX[o.id];
    return '<section class="card cp-test"><div class="eyebrow">TEST · '+CE.name(s.level)+'</div><h2>'+safe(o.name)+'</h2><p><b>Mục tiêu: '+CE.label(o,goal)+'</b></p><p>'+safe(o.cue)+'</p>'+(ex?'<details><summary>Hướng dẫn bài tập trong thư viện</summary><ol>'+ex.steps.map(x=>'<li>'+safe(x)+'</li>').join("")+'</ol></details>':"")+
      '<form id="cpTestForm">'+timer+inputs("cpA",o.both?"Bên trái · "+CE.unit(o):"Kết quả · "+CE.unit(o))+(o.both?inputs("cpB","Bên phải · "+CE.unit(o)):"")+
      (o.band?'<label>Thông số dây / cách đặt dây (bắt buộc)<input id="cpSetup" type="text" maxlength="160" required placeholder="VD: dây đỏ, 15 kg danh định, vị trí chân/neo đánh dấu"></label>':'')+
      '<label class="cp-check"><input id="cpFormOK" type="checkbox" required>Chỉ tính lần/giây/khoảng cách đạt kỹ thuật, đủ biên độ, không lấy đà, không đau. Tôi đã dừng khi kỹ thuật giảm.</label><div class="cp-buttons"><button type="submit" class="primary-btn">Lưu kết quả</button>'+btn("Hủy test","cancel")+'</div></form></section>';
  }
  function render(){
    if(FS.active())return FS.render();
    const s=state(),n=Object.keys(s.passes).length;
    const chosen=draft?config(s):"";
    const cards=CE.domains.map((d,i)=>{
      const r=s.passes[d.id],first=d.options[0],g=CE.goal(s.level,first,i);
      return '<article class="card cp-domain"><div class="section-head"><h2>'+safe(d.name)+'</h2><span class="pill '+(r?'':'muted')+'">'+(r?'Đã đạt':'Chưa đạt')+'</span></div><p class="muted tiny">'+safe(d.goal)+'</p>'+(r?'<p><b>'+safe(d.options.find(o=>o.id===r.option).name)+'</b> · '+r.a+(r.b!=null?' / '+r.b:'')+' '+CE.unit(d.options.find(o=>o.id===r.option))+'</p>':'<p><b>'+safe(first.name)+'</b> · '+CE.label(first,g)+'</p><details><summary>Bài thay thế & mốc</summary><ul>'+d.options.slice(1).map(o=>'<li>'+safe(o.name)+' · '+CE.label(o,CE.goal(s.level,o,i))+'</li>').join("")+'</ul></details>'+btn("Test mục tiêu","select",'data-domain="'+d.id+'"',"primary-btn wide"))+'</article>';
    }).join("");
    const recent=s.history.slice(-15).reverse().map(r=>{
      const d=CE.domains.find(x=>x.id===r.domain),o=d&&d.options.find(x=>x.id===r.option);
      if(!o)return "";
      return '<div class="cp-log"><b>'+safe(CE.name(Number.isSafeInteger(r.level)&&r.level>0?r.level:1))+' · '+safe(o.name)+'</b><small>'+safe(isoDay(r.date))+' · '+safe(r.a)+(o.both?' / '+safe(r.b):'')+' / mốc '+safe(r.goal)+' '+CE.unit(o)+' · '+(r.passed===true?'Đạt':'Chưa đạt')+'</small>'+(r.setup?'<small>'+safe(r.setup)+'</small>':'')+'</div>';
    }).join("");
    return '<section class="page-head"><div><div class="eyebrow">STRENGTH CAMPAIGN</div><h1>Hành trình<br><span style="color:var(--green)">sức mạnh</span></h1><p>Mỗi nhóm năng lực là một thử thách riêng. Không phải chuẩn sức khỏe hay phân hạng vận động viên.</p></div></section>'+road(s)+
      '<section class="card"><div class="eyebrow">CẤP ĐỘ HIỆN TẠI</div><h2>'+CE.name(s.level)+' · '+CE.theme(s.level)+'</h2><p>'+n+'/'+CE.domains.length+' mục tiêu đã đạt</p><progress class="cp-progress" max="'+CE.domains.length+'" value="'+n+'"></progress><p class="muted tiny">Đạt tất cả để mở '+CE.name(s.level+1)+'. Không cần test cùng ngày; lưu tự động. Mỗi giai đoạn có thể chọn biến thể khác, nhưng chỉ so sánh thành tích cùng bài, cùng cách đo và tải.</p><div class="inline-note">Nên test khi hồi phục, sau khởi động; không thêm cả bộ test vào buổi tập. Tránh test cùng nhóm cơ trong 24–48 giờ sau buổi nặng. Đau hoặc mệt bất thường: dừng. Cấp độ không ép tăng tải tự động.</div></section>'+
      (chosen||FS.summary(s)+cards)+
      '<section class="card"><h2>Thành tích mở khóa</h2>'+(s.completed.length?s.completed.slice(-12).reverse().map(x=>'<div class="cp-log"><b>'+safe(CE.name(x.level))+' · Hoàn thành</b><small>'+safe(isoDay(x.date))+'</small></div>').join(""):'<p class="muted tiny">Chưa hoàn thành giai đoạn nào.</p>')+'</section><section class="card"><h2>15 lần test gần nhất</h2>'+(recent||'<p class="muted tiny">Chưa có kết quả.</p>')+'</section><p class="muted tiny">Endless luân phiên tăng mốc từng nhóm, có giới hạn mặc định; khi đạt trần, duy trì kỹ thuật hoặc đặt mục tiêu cá nhân trong phạm vi cho phép. Không ép tăng số lần vô hạn.</p>';
  }
  function click(e){
    const b=e.target.closest("[data-campaign]");if(!b)return;
    const a=b.dataset.campaign;
    if(a==="open"){clear();navigate("campaign");return;}
    if(page!=="campaign")return;
    const s=state();
    if(a==="cancel"){clear();renderPage();return;}
    if(a==="select"){
      if(S.active){toast("Hãy hoàn thành hoặc kết thúc buổi tập đang dở trước khi test.");return;}
      if(readiness==="poor"){toast("Bạn đang báo phục hồi kém. Nên nghỉ và kiểm tra vào ngày khỏe.");return;}
      const d=CE.domains.find(x=>x.id===b.dataset.domain);if(!d||s.passes[d.id])return;
      clear();draft={level:s.level,domain:d.id,option:d.options[0].id,phase:"ready"};renderPage();byId("cpOption")?.focus();return;
    }
    if(!draft)return;
    const d=CE.domains.find(x=>x.id===draft.domain),o=d?.options.find(x=>x.id===draft.option);
    if(!o)return;
    if(a==="begin"){
      if(S.active||readiness==="poor"||!byId("cpReady")?.checked){toast("Chỉ bắt đầu khi đã hồi phục, khởi động và xác nhận an toàn.");return;}
      const inp=byId("cpGoal"),g=inp.valueAsNumber;if(!inp.checkValidity()||!Number.isSafeInteger(g)){toast("Mốc không hợp lệ.");return;}
      draft.goal=g;draft.phase="test";renderPage();return;
    }
    if(a==="clock"&&draft.phase==="test"&&o.unit==="seconds"){
      if(clock){toast("Dừng đồng hồ hiện tại trước khi bắt đầu bên kia.");return;}
      const field=b.dataset.field;if(!["cpA","cpB"].includes(field)||!byId(field))return;
      const out=byId("cpClock");clock={start:performance.now(),field,goal:draft.goal,handle:null};
      clock.handle=setInterval(()=>{if(!clock)return;const seconds=Math.floor((performance.now()-clock.start)/1000);if(out)out.textContent=Math.min(seconds,clock.goal)+" / "+clock.goal+" giây";if(seconds>=clock.goal){stopClock(true);toast("Đã tới mốc, hãy dừng và xác nhận kỹ thuật.");}},200);
      if(out)out.textContent="0 / "+draft.goal+" giây";
    }else if(a==="clock-stop"){stopClock(true);}
  }
  function renderPage(){document.querySelectorAll(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.page===page));app.innerHTML=render();window.scrollTo(0,0);}
  function change(e){if(page==="campaign"&&draft?.phase==="ready"&&e.target.id==="cpOption"){const d=CE.domains.find(x=>x.id===draft.domain);if(d?.options.some(x=>x.id===e.target.value)){draft.option=e.target.value;renderPage();}}}
  function submit(e){
    if(e.target.id!=="cpTestForm")return;e.preventDefault();
    if(!draft||draft.phase!=="test"||S.active||readiness==="poor")return;
    if(clock){toast("Hãy dừng đồng hồ trước khi lưu.");return;}
    if(!e.target.reportValidity())return;
    const s=state(),d=CE.domains.find(x=>x.id===draft.domain),o=d?.options.find(x=>x.id===draft.option);if(!o)return;
    const r={level:draft.level,domain:d.id,option:o.id,goal:draft.goal,a:byId("cpA").valueAsNumber,b:o.both?byId("cpB").valueAsNumber:null,setup:o.band?byId("cpSetup").value.trim():"",form:byId("cpFormOK").checked,date:stamp()};
    const result=CE.save(s,r);if(!result.accepted){toast("Kết quả không hợp lệ hoặc mục tiêu đã được ghi nhận.");return;}
    S.campaign=result.state;persist();clear();renderPage();
    toast(result.unlocked?"Mở khóa "+CE.name(S.campaign.level)+"!":result.passed?"Đạt mục tiêu!":"Đã lưu kết quả. Hồi phục rồi thử lại.");
  }
  function attach(){app.addEventListener("click",click);app.addEventListener("change",change);app.addEventListener("submit",submit);document.addEventListener("visibilitychange",()=>{if(document.hidden&&clock){stopClock(false);const out=byId("cpClock");if(out)out.textContent="Đã dừng khi rời màn hình; hãy kiểm tra lại.";}});}
  return {home,render,clear,attach,redraw:renderPage};
}
  const CP=campaignUI();
  function defaultData(){return {onboarded:false,schedule:[2,4,6],settings:{restSec:90,workSec:45,sound:true,vibration:false},logs:[],targets:{},swaps:{},bands:{},coachTips:{},campaign:CE.clean(null),active:null};}
  function load(){
    let data=defaultData();
    try{let saved=JSON.parse(localStorage.getItem(KEY)||"null");if(saved&&typeof saved==="object"){data=Object.assign(data,saved);data.settings=Object.assign(defaultData().settings,saved.settings||{});}}
    catch(error){console.warn("Không đọc được dữ liệu đã lưu",error);}
    if(!Array.isArray(data.schedule))data.schedule=[2,4,6];
    if(!Array.isArray(data.logs))data.logs=[];
    if(!data.targets||typeof data.targets!=="object")data.targets={};
    if(!data.swaps||typeof data.swaps!=="object")data.swaps={};
    if(!data.bands||typeof data.bands!=="object")data.bands={};
    if(data.active&&data.active.phase==="work"){data.active.phase="paused";data.active.remaining=Math.max(1,Number(data.active.remaining)||15);}
    if(!data.coachTips||typeof data.coachTips!=="object"||Array.isArray(data.coachTips))data.coachTips={};
    if(data.active&&!data.active.coachVersion){
      data.active.coachVersion=3;data.active.input=null;data.active.rir=null;data.active.quality=null;data.active.effort=null;
      data.active.records=(data.active.records||[]).map(r=>({...r,confirmed:false}));
    }
    data.campaign=CE.clean(data.campaign);
    return data;
  }
  let S=load(),page=S.active?"workout":(S.onboarded?"home":"setup"),draftDays=S.schedule.slice(),presetCustom=false;
  let readiness="unknown",deloadChoice="auto";
  let libraryQuery="",libraryFilter="Tất cả",libraryMode="all",detailId=null,lastSummary=null,toastTimer=null,timerInterval=null,lastRestBeep=false;
  const app=document.getElementById("app");
  const dayOrder=(a,b)=>ORDER.indexOf(a)-ORDER.indexOf(b);
  const sortDays=arr=>Array.from(new Set(arr)).sort(dayOrder);
  const getTemplate=mode=>{
    let slots=TEMPLATES[mode]||TEMPLATES.strength;
    const a=S.active&&S.active.mode===mode?S.active:null;
    if(a&&!a.templateVersion)slots=slots.slice(0,slots.length-(EXTRA_SLOTS[mode]||[]).length);
    return a&&a.deload?slots.map(slot=>[...slot.slice(0,3),Math.max(1,Math.round(slot[3]*.6)),...slot.slice(4)]):slots;
  };
  const slotId=(mode,slot)=>mode+":"+slot[0];
  const ASSIST=new Set(["assistPull","assistChin"]);
  const DELOAD_ALT={squatJump:"squat",tuckJump:"squat",broadJump:"squat",skater:"lunge",pogo:"calf",speedPress:"chest",wallPush:"inclinePush",explosivePush:"inclinePush",clapPush:"inclinePush",speedPunch:"chest",speedRow:"row",speedPulldown:"row",speedChop:"pallof"};
  const getExercise=(mode,slot,act)=>{
    const ex=EX[(act&&act.swaps&&act.swaps[slot[0]])||S.swaps[slotId(mode,slot)]||slot[1]]||EX[slot[1]];
    if(act&&act.deload&&EXPLOSIVE.has(ex.id)){
      const allowed=[slot[1],...slot[2]],id=DELOAD_ALT[ex.id];
      return EX[allowed.includes(id)?id:allowed.find(x=>!EXPLOSIVE.has(x))]||ex;
    }
    return ex;
  };
  const getBand=(mode,slot,act)=>{
    const ex=getExercise(mode,slot,act);
    if(!/dây|neo/i.test(ex.need))return "none";
    if(act&&act.deload)return ASSIST.has(ex.id)?"heavy":"light";
    if(/nhẹ/i.test(ex.need)||EXPLOSIVE.has(ex.id))return "light";
    const saved=(act&&act.bands&&act.bands[slot[0]])||S.bands[slotId(mode,slot)];
    if(saved==="heavy"||saved==="light")return saved;
    if(ASSIST.has(ex.id))return "heavy";
    return mode==="strength"&&["Chân & mông","Ngực","Lưng","Hông & lưng dưới"].includes(ex.group)?"heavy":"light";
  };
  const BAND_LABEL={heavy:"Dây nặng",light:"Dây nhẹ",none:"Không dây"};
  const TIMED_EXERCISES=new Set(["sidePlank","plank","wallSit","hollow","deadHang","suitcase"]);
  const getMetric=(mode,slot,act)=>TIMED_EXERCISES.has(getExercise(mode,slot,act).id)?"seconds":"reps";
  const targetKey=(mode,slot,act)=>slotId(mode,slot)+":"+getExercise(mode,slot,act).id+":"+getMetric(mode,slot,act)+":"+getBand(mode,slot,act);
  const getBaseTarget=(mode,slot,act)=>{
    const ex=getExercise(mode,slot,act),metric=getMetric(mode,slot,act);let base=slot[5]===metric?slot[4]:metric==="seconds"?40:10;
    if(metric==="seconds"&&["hollow","deadHang","suitcase"].includes(ex.id))base=20;
    if(metric==="reps"){
      if(PULL_IDS.has(ex.id))base=ex.id==="scapPull"?6:3;
      else if(EXPLOSIVE.has(ex.id))base=4;
      else if(ex.id==="tempoPush")base=mode==="strength"?6:10;
      else if(["bandPush","declinePush","pikePush"].includes(ex.id))base=6;
      else if(ex.id==="fastPush")base=18;
      else if(mode==="balance"&&"pushup inclinePush row singleRow seatedRow squat split lunge calf singleCalf bentCalf tibRaise crunch bicycle".split(" ").includes(ex.id))base=15;
    }
    const value=Math.max(1,Number(S.targets[targetKey(mode,slot,act)])||base);
    return metric==="reps"&&EXPLOSIVE.has(ex.id)?Math.min(5,value):value;
  };
  const getTarget=(mode,slot,act)=>{
    const a=act||(S.active&&S.active.mode===mode?S.active:null);
    const base=getBaseTarget(mode,slot,a);
    return a&&a.deload?Math.max(1,Math.floor(base*.75)):base;
  };
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const minmax=(n,min,max)=>Math.min(max,Math.max(min,Number(n)||min));
  const formatTime=s=>{s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");};
  const isoDay=d=>new Date(d).toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit",year:"numeric"});
  const stamp=()=>new Date().toISOString();
  const isPairClose=(a,b)=>((a===0?7:a)+1===(b===0?7:b));
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(err){toast("Trình duyệt chưa cho phép lưu dữ liệu");}}
  function toast(msg){
    const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");
    if(toastTimer)clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600);
  }
  function scheduleFor(days){
    let arr=sortDays(days);if(arr.length<3)return [];
    let recoveryIndex=-1;
    if(arr.length===4){
      for(let i=1;i<arr.length;i++){if(isPairClose(arr[i-1],arr[i])){recoveryIndex=i;break;}}
      if(recoveryIndex<0 && arr[0]===1 && arr[arr.length-1]===0)recoveryIndex=arr.length-1;
      if(recoveryIndex<0)recoveryIndex=arr.length-1;
    }
    let modeList=["strength","power","balance"];
    let k=0;
    return arr.map((day,i)=>({day:day,mode:i===recoveryIndex?"recovery":modeList[k++]}));
  }
  function nextScheduled(){
    const schedule=scheduleFor(S.schedule),today=new Date().getDay(),n=ORDER.indexOf(today);
    return schedule.map(x=>Object.assign({},x,{delta:(ORDER.indexOf(x.day)-n+7)%7})).sort((a,b)=>a.delta-b.delta)[0];
  }
  function render(){
    CP.clear();
    document.querySelectorAll(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.page===page));
    document.getElementById("bottomNav").style.display=(page==="setup"||page==="workout"||page==="summary")?"none":"";
    app.style.paddingBottom=(page==="setup"||page==="workout"||page==="summary")?"45px":"";
    if(page==="setup")app.innerHTML=renderSetup();
    else if(page==="home")app.innerHTML=renderHome();
    else if(page==="workout")app.innerHTML=renderWorkout();
    else if(page==="summary")app.innerHTML=renderSummary();
    else if(page==="library")app.innerHTML=renderLibrary();
    else if(page==="history")app.innerHTML=renderHistory();
    else if(page==="campaign")app.innerHTML=CP.render();
    refreshTickDisplay();
  }
  function navigate(p){if(FS.active()&&!confirm("Rời Full Stage Test sẽ kết thúc phiên đang thực hiện. Tiếp tục?"))return;if(S.active && p!=="workout" && p!=="home" && !confirm("Bạn đang tập dở. Tiến độ được giữ lại, bộ đếm sẽ tạm dừng. Tiếp tục?"))return;if(S.active&&S.active.phase==="work"&&p!=="workout")pauseSet();page=p;render();window.scrollTo(0,0);}
  function renderSetup(){
    const selected=draftDays.join(",");
    let opts=PRESETS.map(p=>{
      const active=sortDays(p.days).join(",")===sortDays(draftDays).join(",")&&!presetCustom;
      return '<button class="preset-btn '+(active?"selected":"")+'" data-action="preset" data-days="'+p.days.join(",")+'"><span><b>'+p.name+'</b><small>'+p.hint+'</small></span><span class="tick">'+(active?"●":"○")+'</span></button>';
    }).join("");
    return '<section class="page-head"><div><div class="eyebrow">WELCOME TO BANDFIT</div><h1>Chọn lịch tập<br><span style="color:var(--green)">của bạn.</span></h1><p>3 hoặc 4 ngày mỗi tuần · Tối ưu luân phiên sức mạnh, bộc phát và cân bằng.</p></div></section>'+
    '<div class="card"><h2 style="font-size:18px">Lịch đề xuất</h2><div class="select-preset">'+opts+'</div>'+
    '<div class="separator"></div><div class="section-head" style="margin:0 0 8px"><h2 style="font-size:15px">Hoặc chọn ngày tùy ý</h2><span class="pill muted">'+draftDays.length+' / 3–4 ngày</span></div>'+
    '<div class="day-select">'+ORDER.map(day=>'<button class="day-choice '+(draftDays.includes(day)?"selected":"")+'" data-action="toggle-day" data-day="'+day+'">'+SHORT[day]+'</button>').join("")+'</div>'+
    '<div class="inline-note">Buổi thứ tư sẽ được phân bổ nhẹ hơn để tránh dồn tải vào các ngày liền nhau. Bạn có thể đổi lịch sau trong Tổng quan.</div>'+
    '<button data-action="save-schedule" class="primary-btn wide" '+(draftDays.length<3||draftDays.length>4?"disabled":"")+'>Lưu lịch và bắt đầu →</button></div>';
  }
  const READINESS={unknown:"Chưa đánh giá",good:"Khỏe, hồi phục tốt",medium:"Hơi mệt",poor:"Mệt nhiều / phục hồi kém"};
  function confirmedRecords(log){return (log.records||[]).filter(r=>r.confirmed===true);}
  function verifiedRatio(records){return records.length?records.reduce((n,r)=>n+Math.min(1,r.target>0?r.actual/r.target:0),0)/records.length:null;}
  function deloadReason(mode){
    if(readiness==="poor")return "Bạn tự đánh giá phục hồi kém.";
    const logs=S.logs.filter(l=>l.mode===mode&&!l.deload&&l.coachVersion===3&&confirmedRecords(l).length>=Math.max(2,Math.ceil((l.plannedSets||1)*.5))).slice(-3);
    const last=logs.slice(-2);
    if(last.length===2&&last.every(l=>verifiedRatio(confirmedRecords(l))<.85))return "Hai buổi gần nhất cùng loại đều đạt dưới 85% mục tiêu (chỉ tính hiệp đã xác nhận).";
    return "";
  }
  function coachHome(mode){
    const reason=deloadReason(mode);
    const tips=Object.values(S.coachTips||{}).filter(t=>t&&t.mode===mode);
    return '<div class="card coach-panel"><div class="eyebrow">SMART TRAINING · HUẤN LUYỆN THÔNG MINH</div><h2>Phục hồi & tăng tải</h2><p class="muted tiny">Đánh giá trước buổi tập. Nếu đau nhói, chóng mặt, sốt hoặc mệt bất thường, hãy nghỉ; không dùng giảm tải để cố tập.</p><div class="coach-label">Hôm nay cơ thể thế nào?</div><div class="coach-options">'+Object.entries(READINESS).map(([k,v])=>'<button class="filter-btn '+(readiness===k?"active":"")+'" data-action="readiness" data-value="'+k+'">'+esc(v)+'</button>').join("")+'</div><div class="coach-label">Chế độ buổi tiếp theo</div><div class="coach-options">'+[["auto","Gợi ý tự động"],["normal","Bình thường"],["light","Giảm tải"]].map(([k,v])=>'<button class="filter-btn '+(deloadChoice===k?"active":"")+'" data-action="deload-choice" data-value="'+k+'">'+v+'</button>').join("")+'</div><div class="inline-note">'+(reason?'<strong>Đề xuất giảm tải:</strong> '+esc(reason):'Chưa có tín hiệu cần giảm tải từ dữ liệu hiện tại.')+' Giảm số hiệp khoảng 40%, số lần/giây khoảng 25%, ưu tiên dây nhẹ hoặc trợ lực, bỏ động tác bộc phá. Không thay đổi mục tiêu dài hạn.</div>'+(tips.length?'<p class="tiny muted">Có '+tips.length+' đề xuất tăng độ khó cho buổi '+esc(MODES[mode].title)+'. Xem tại động tác tương ứng.</p>':'')+'<details><summary>RIR, tăng tải và giảm tải là gì?</summary><p class="tiny muted">RIR là số lần còn có thể làm đúng kỹ thuật: 0 = hết khả năng, 2 = còn 2 lần. Tập sức mạnh thường giữ 1–3 lần dự trữ. Tăng tải là tăng lực dây hoặc biến thể khó hơn khi đã thích nghi. Giảm tải là tạm giảm lượng và độ khó tập để hồi phục. Các ngưỡng trong app là quy tắc thực hành, không phải chẩn đoán.</p></details></div>';
  }
  function renderHome(){
    const today=new Date().getDay(),session=scheduleFor(S.schedule),up=nextScheduled();
    const todayMode=session.find(x=>x.day===today);
    const last7=S.logs.filter(x=>Date.now()-new Date(x.date).getTime()<7*864e5);
    let weekly='<div class="week-strip">'+ORDER.map(day=>'<div class="day-pill '+(session.some(x=>x.day===day)?"on ":"")+(today===day?"today":"")+'"><span>'+SHORT[day]+'</span><strong>'+(session.some(x=>x.day===day)?"●":"·")+'</strong></div>').join("")+'</div>';
    let rows=session.map(x=>{
      const m=MODES[x.mode],count=getTemplate(x.mode).length,mark=today===x.day?' <span class="pill">Hôm nay</span>':'';
      return '<button class="session-row" data-action="start" data-mode="'+x.mode+'" data-day="'+x.day+'"><span class="session-num">'+m.icon+'</span><span class="session-info"><strong>'+DAYNAME[x.day]+' · '+m.title+mark+'</strong><small>'+count+' động tác · '+m.time+' · '+m.subtitle+'</small></span><span class="session-arrow">›</span></button>';
    }).join("");
    let banner=S.active?'<div class="inline-note">Buổi tập đang tạm lưu: '+MODES[S.active.mode].title+'. <button class="link-btn" data-action="resume">Tiếp tục →</button> <button class="link-btn" data-action="reset-workout">↺ Reset</button></div>':'';
    return '<section class="hero card"><div class="eyebrow">BUILD STRENGTH. MOVE BETTER.</div><h1>Khỏe hơn.<br>Không cần tập quá sức.</h1><p>Bài tập bằng dây kháng lực, đo thời gian từng hiệp và tăng số rep theo tiến bộ thực tế của bạn.</p><div class="hero-actions"><button class="primary-btn" data-action="'+(S.active?"resume":"start")+'" data-mode="'+(todayMode?todayMode.mode:up.mode)+'" data-day="'+(todayMode?todayMode.day:up.day)+'">'+(S.active?"▶ Tiếp tục buổi tập":todayMode?"▶ Tập hôm nay":"▶ Bắt đầu buổi kế tiếp")+'</button></div></section>'+
    banner+CP.home()+coachHome(todayMode?todayMode.mode:up.mode)+'<div class="stats"><div class="stat"><strong>'+S.logs.length+'</strong><small>Buổi đã lưu</small></div><div class="stat"><strong>'+last7.length+'</strong><small>Buổi / 7 ngày</small></div><div class="stat"><strong>'+Object.keys(EX).length+'</strong><small>Bài trong thư viện</small></div></div>'+
    '<div class="section-head"><h2>Lịch của bạn</h2><button class="link-btn" data-action="edit-schedule">Chỉnh lịch ↗</button></div>'+weekly+
    '<div class="section-head"><h2>Chọn một buổi để tập</h2></div><div class="workout-list">'+rows+'</div>'+
    '<div class="inline-note mt20">Mỗi động tác có nhiều phương án thay thế theo mục tiêu. Bài bổ trợ cuối buổi có thể bỏ qua nếu chưa hồi phục. Nếu bài khiến bạn đau khớp, hãy dừng bài đó và đổi sang động tác phù hợp hơn.</div>';
  }
  function recordCount(a){return Array.isArray(a.records)?a.records.length:0;}
  function workoutStats(a){
    const slots=getTemplate(a.mode),total=slots.reduce((n,s)=>n+s[3],0);
    return {done:recordCount(a),total:total,pct:total?Math.round(recordCount(a)*100/total):0};
  }
  function workSeconds(a,slot){
    if(getMetric(a.mode,slot,a)==="seconds")return getTarget(a.mode,slot,a);
    
    const id=getExercise(a.mode,slot,a).id,unilateral=UNILATERAL.has(id);
    if(EXPLOSIVE.has(id))return 25*(unilateral?2:1);
    return Math.max(minmax(S.settings.workSec,15,180),id==="tempoPush"?getTarget(a.mode,slot,a)*7:15)*(unilateral?2:1);
  }
  function current(){
    const a=S.active;if(!a)return null;
    return {a:a,slot:getTemplate(a.mode)[a.index]};
  }
  function renderEffort(a,ex,unit){
    if(EXPLOSIVE.has(ex.id))return '<div class="coach-panel"><strong>Tốc độ phát lực</strong><p class="tiny muted">Không dùng RIR cho bộc phá. Dừng khi chậm rõ, mất kiểm soát hoặc tiếp đất không ổn định.</p><div class="coach-options">'+[["fast","Nhanh, kỹ thuật tốt"],["slow","Chậm / mất kỹ thuật"],["unknown","Chưa rõ"]].map(([k,v])=>'<button class="effort-choice '+(a.quality===k?"selected":"")+'" data-action="quality" data-value="'+k+'">'+v+'</button>').join("")+'</div></div>';
    if(unit==="giây")return '<div class="coach-panel"><strong>Độ khó khi giữ tư thế</strong><p class="tiny muted">RIR là số lần lặp nên không áp dụng cho bài tính giây.</p><div class="coach-options">'+[["easy","Dễ"],["medium","Vừa"],["hard","Khó"],["unknown","Chưa rõ"]].map(([k,v])=>'<button class="effort-choice '+(a.effort===k?"selected":"")+'" data-action="effort" data-value="'+k+'">'+v+'</button>').join("")+'</div></div>';
    return '<div class="coach-panel"><strong>RIR – còn làm được bao nhiêu lần?</strong><p class="tiny muted">Ước tính số lần còn có thể làm đúng kỹ thuật sau hiệp, không cần thử đến kiệt sức. 0: hết sức; 1–3: còn ít; 4+: còn nhiều.</p><div class="coach-options">'+[["0","0"],["1","1"],["2","2"],["3","3"],["4","4+"],["unknown","Chưa rõ"]].map(([k,v])=>'<button class="effort-choice '+(String(a.rir)===k?"selected":"")+'" data-action="rir" data-value="'+k+'">'+v+'</button>').join("")+'</div>'+(a.deload?'<p class="tiny muted">Giảm tải: cố gắng còn ít nhất 3–4 lần dự trữ, không cố tập hết sức.</p>':'')+'</div>';
  }
  function renderCoachTip(a,slot,ex,band){
    if(a.deload||a.setIndex!==0||a.phase!=="ready")return "";
    const t=S.coachTips[slotId(a.mode,slot)];
    if(!t||t.exerciseId!==ex.id||t.band!==band)return "";
    return '<div class="inline-note coach-tip"><strong>Progressive Overload · Tăng tải</strong><p>'+esc(t.reason)+'</p>'+(t.nextBand||t.nextExercise?'<button class="secondary-btn wide" data-action="apply-tip">Áp dụng đề xuất</button>':'<p class="tiny muted">Chỉ tăng tải khi kiểm soát tốt kỹ thuật; có thể giữ nguyên.</p>')+'<button class="link-btn" data-action="dismiss-tip">Bỏ qua đề xuất</button></div>';
  }
  function renderWorkout(){
    const v=current();if(!v)return '<div class="card"><h2>Không có buổi tập đang mở</h2><button class="primary-btn mt20" data-action="go-home">Về tổng quan</button></div>';
    const a=v.a,s=v.slot,ex=getExercise(a.mode,s,a),m=MODES[a.mode],st=workoutStats(a),target=getTarget(a.mode,s,a),band=getBand(a.mode,s,a);
    const unit=getMetric(a.mode,s,a)==="seconds"?"giây":"lần";
    const unilateralRep=UNILATERAL.has(ex.id);const repUnit=unit==="lần"&&unilateralRep?"lần mỗi bên":unit;
    const exerciseTimer=workSeconds(a,s);
    let remaining=a.phase==="review"?0:a.phase==="ready"?exerciseTimer:(a.phase==="paused"?a.remaining:(a.phase==="work"?Math.max(0,Math.ceil((a.deadline-Date.now())/1000)):exerciseTimer));
    let pct=a.phase==="review"?0:a.phase==="ready"?100:Math.min(100,Math.max(0,100*remaining/exerciseTimer));
    let body='';
    if(a.phase==="rest"){
      let restSec=Math.max(0,Math.ceil((a.deadline-Date.now())/1000));
      let restPct=Math.min(100,Math.max(0,restSec/Math.max(15,a.restTotal||S.settings.restSec)*100));
      let nextText=a.setIndex+1<s[3]?'Hiệp '+(a.setIndex+2)+' / '+s[3]+' của '+ex.en:(a.index+1<getTemplate(a.mode).length?getExercise(a.mode,getTemplate(a.mode)[a.index+1],a).en:"Hoàn tất");
      body='<div class="next-panel"><span class="pill orange">REST · NGHỈ NGƠI</span><h2>Hồi sức để tập tốt hơn</h2><div class="timer-wrap"><div class="timer-ring rest" id="timerRing" style="--pct:'+restPct+'"><div class="timer-inner"><div id="timerNum" class="timer-number">'+formatTime(restSec)+'</div><div class="timer-label">THỜI GIAN NGHỈ</div></div></div></div><p>Tiếp theo: <strong>'+esc(nextText)+'</strong></p><div class="timer-button-row"><button class="secondary-btn" data-action="add-rest">+15 giây</button><button class="ghost-btn" data-action="skip-rest">Đã nghỉ xong →</button></div><p class="tiny muted mt12">Bạn có thể nhấn +15 giây nhiều lần. Hết giờ không tự ép bạn bắt đầu hiệp mới.</p></div>';
    } else {
      body='<div class="exercise-card"><div class="set-meta"><span>ĐỘNG TÁC '+(a.index+1)+' / '+getTemplate(a.mode).length+'</span><strong>HIỆP '+(a.setIndex+1)+' / '+s[3]+'</strong></div>'+
        '<div class="exercise-name">'+esc(ex.en)+'</div><div class="exercise-vn">'+esc(ex.vi)+'</div><div class="ex-tags"><span class="pill">'+esc(ex.group)+'</span><span class="pill muted">'+esc(ex.need)+'</span></div>'+
        '<div class="band-select"><span>'+(ex.id==="assistPull"||ex.id==="assistChin"?"Dây trợ lực (dây mạnh hơn = dễ hơn):":"Loại dây đang dùng:")+'</span>'+(band==="none"?'<span class="pill muted">Không cần dây</span>':['light','heavy'].map(b=>'<button class="band-choice '+(band===b?'selected':'')+'" data-action="set-band" data-band="'+b+'">'+BAND_LABEL[b]+'</button>').join(''))+'</div>'+        '<ol class="exercise-instructions">'+ex.steps.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ol>'+
        '<div class="tips">Lưu ý: '+esc(ex.tip)+'</div>'+renderCoachTip(a,s,ex,band)+
        '<div class="exercise-tool-row"><button class="ghost-btn" data-action="swap">⇄ Đổi bài tương tự</button><button class="ghost-btn" data-action="skip-exercise">Bỏ qua bài</button></div>'+
        '<div class="timer-wrap"><div class="timer-ring" id="timerRing" style="--pct:'+pct+'"><div class="timer-inner"><div class="timer-number" id="timerNum">'+formatTime(remaining)+'</div><div class="timer-label">'+(a.phase==="review"?"XÁC NHẬN KẾT QUẢ":a.phase==="ready"?"SẴN SÀNG":a.phase==="paused"?"TẠM DỪNG":"ĐANG TẬP")+'</div></div></div></div>'+
        '<div class="rep-row"><label><strong>Thực tế: bao nhiêu '+unit+'?</strong>Mục tiêu: '+target+' '+repUnit+(["sidePlank","suitcase"].includes(ex.id)&&unit==="giây"?" (chia đều 2 bên)":"")+'. Nhập đúng kết quả, kể cả 0.</label><input id="repInput" class="rep-input" type="number" inputmode="numeric" min="0" max="999" step="1" placeholder="—" value="'+esc(a.input==null?"":a.input)+'" aria-label="Số '+unit+' thực tế"></div>'+
        '<button class="ghost-btn wide" data-action="use-target">Đã làm đúng mục tiêu ('+target+' '+unit+')</button>'+
        renderEffort(a,ex,unit)+
        (a.phase==="review"?'<div class="inline-note">Đã hết giờ hoặc dừng hiệp. Nhập số thực tế và xác nhận để lưu; thời gian nghỉ bắt đầu sau khi xác nhận.</div>':'')+
        '<div class="timer-button-row">'+(a.phase==="ready"?'<button class="primary-btn" data-action="start-set">▶ Bắt đầu đếm giờ</button>':a.phase==="paused"?'<button class="primary-btn" data-action="resume-set">▶ Tiếp tục</button>':a.phase==="work"?'<button class="secondary-btn" data-action="pause-set">Ⅱ Tạm dừng</button>':'')+
        '<button class="ghost-btn" data-action="reset-set">↺ Đếm lại</button><button class="primary-btn" data-action="finish-set">✓ Xác nhận kết quả / Nghỉ</button></div></div>';
    }
    return '<div class="workout-top"><div><div class="eyebrow">'+m.tag+' · '+DAYNAME[a.day]+'</div><h2 style="font-size:23px;margin:6px 0">'+m.title+'</h2>'+(a.deload?'<span class="pill orange">DELOAD · GIẢM TẢI</span>':'')+'</div><button class="ghost-btn" data-action="exit-workout">Thoát tạm</button></div><button class="secondary-btn wide" data-action="reset-workout">↺ Reset buổi tập</button>'+
      '<div class="set-meta"><span>ĐÃ HOÀN THÀNH '+st.done+' / '+st.total+' HIỆP</span><span>'+st.pct+'%</span></div><div class="progress-track"><div class="progress-fill" style="width:'+st.pct+'%"></div></div>'+body;
  }
  function renderSummary(){
    if(!lastSummary){return '<div class="card"><h2>Chưa có kết quả mới</h2><button class="primary-btn mt20" data-action="go-home">Về trang chủ</button></div>';}
    const l=lastSummary,adj=l.adjustments||[],items=adj.slice(0,8).map(a=>'<div class="history-item"><strong>'+esc(a.name)+'</strong><p>'+(a.kind==='tip'?'Đề xuất tăng độ khó · ':a.previous+' → '+a.next+' '+(a.metric==="seconds"?"giây":"lần")+'/hiệp · ')+esc(a.reason)+'</p></div>').join("");
    return '<div class="eyebrow">WORKOUT SAVED</div><h1 style="font-size:34px;margin:11px 0">Hoàn thành buổi tập.</h1><p class="muted">Kết quả được lưu trên thiết bị này, không cần tài khoản.</p>'+
      '<div class="summary-grid"><div class="stat"><strong>'+l.records.length+' / '+l.plannedSets+'</strong><small>Hiệp hoàn thành</small></div><div class="stat"><strong>'+l.volume+'</strong><small>Tổng lần/giây đã ghi*</small></div><div class="stat"><strong>'+(l.ratio==null?'—':l.ratio+'%')+'</strong><small>Trung bình mức đạt từng hiệp đã xác nhận</small></div><div class="stat"><strong>'+l.minutes+' phút</strong><small>Thời gian phiên</small></div></div>'+
      '<div class="card"><h2 style="font-size:19px">Cá nhân hóa buổi sau</h2><p class="muted tiny mt12">Chỉ dùng hiệp đã xác nhận. So sánh cùng bài, cùng tải, cùng mục tiêu; hai buổi liên tiếp đủ dễ mới tăng nhẹ. Bộc phá ưu tiên tốc độ; giảm tải không sửa mục tiêu dài hạn.</p>'+
      (l.deload?'<div class="inline-note">Buổi giảm tải: đã lưu kết quả nhưng giữ nguyên mục tiêu dài hạn.</div>':adj.length?'<div class="mt12">'+items+'</div>':'<div class="inline-note">Giữ nguyên mục tiêu. Chưa đủ dữ liệu xác nhận để tăng tải hoặc không cần điều chỉnh.</div>')+
      '<p class="muted tiny mt12">* Tổng khối lượng chỉ là số đếm để theo dõi, không phải năng lượng tiêu hao; không cộng giây và lần thành cùng một đơn vị sinh lý.</p></div>'+
      '<button class="primary-btn wide mt20" data-action="go-home">Về tổng quan →</button>';
  }
  function renderLibraryList(){
    let q=libraryQuery.toLocaleLowerCase("vi"),list=Object.values(EX).filter(ex=>(libraryFilter==="Tất cả"||ex.group===libraryFilter)&&(libraryMode==="all"||(libraryMode==="power"?EXPLOSIVE.has(ex.id):exerciseModes(ex.id).includes(libraryMode)))&&(!q||[ex.en,ex.vi,ex.group,ex.need].join(" ").toLocaleLowerCase("vi").includes(q)));
    if(!list.length)return '<div class="card muted center">Không có bài phù hợp.</div>';
    return list.map(ex=>'<div class="exercise-list-item" data-action="toggle-detail" data-id="'+ex.id+'" role="button" tabindex="0"><span><strong>'+esc(ex.en)+'</strong><small>'+esc(ex.vi)+' · '+esc(ex.group)+'</small></span><span class="session-arrow">'+(detailId===ex.id?"⌃":"›")+'</span></div>'+
    (detailId===ex.id?'<div class="exercise-detail"><span class="pill muted">'+esc(ex.need)+'</span><ol class="exercise-instructions">'+ex.steps.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ol><p>Ghi nhớ: '+esc(ex.tip)+'</p></div>':"")).join("");
  }
  function renderLibrary(){
    const cats=["Tất cả",...new Set(Object.values(EX).map(x=>x.group))];
    return '<div class="page-head"><div><div class="eyebrow">EXERCISE LIBRARY</div><h1>Thư viện bài tập</h1><p>Ưu tiên dây kháng lực · Tên tiếng Anh dễ tìm video hướng dẫn.</p></div><span class="pill">'+Object.keys(EX).length+' bài</span></div>'+
    '<div class="library-toolbar"><input id="searchExercise" class="search-input" type="search" placeholder="Tìm bài hoặc nhóm cơ..." value="'+esc(libraryQuery)+'" aria-label="Tìm bài tập">'+
    '<div class="filter-row" aria-label="Mục tiêu">'+Object.entries(MODE_FILTERS).map(([k,v])=>'<button class="filter-btn '+(k===libraryMode?"active":"")+'" data-action="filter-mode" data-mode="'+k+'">'+esc(v)+'</button>').join("")+'</div>'+
    '<div class="filter-row">'+cats.map(c=>'<button class="filter-btn '+(c===libraryFilter?"active":"")+'" data-action="filter" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join("")+'</div></div>'+
    '<p class="tiny muted">Sức mạnh: tăng tải, còn 1–3 lần dự trữ. Bộc phát: ít lần nhanh, nghỉ đủ. Sức bền: nhiều lần có kiểm soát. Bài có thể phục vụ nhiều mục tiêu tùy cách tập.</p><div id="libraryList" class="exercise-list">'+renderLibraryList()+'</div>';
  }
  function renderHistory(){
    const list=S.logs.slice().reverse();
    let html=list.map(l=>{
      const fmt=l.mode==="strength"?"Sức mạnh":MODES[l.mode].title;
      return '<details class="history-item"><summary><span class="pill">'+esc(fmt)+(l.deload?' · Giảm tải':'')+'</span><strong>'+isoDay(l.date)+' · '+l.records.length+' hiệp</strong><p>'+(l.ratio==null?'Chưa có kết quả xác nhận':l.ratio+'% mục tiêu')+' · '+l.minutes+' phút · '+(l.adjustments||[]).length+' bài được điều chỉnh</p></summary>'+
      '<div class="mt12">'+l.records.map(r=>'<div class="tiny muted" style="padding:5px 0">'+esc(EX[r.exerciseId]?EX[r.exerciseId].en:r.exerciseId)+' · hiệp '+r.set+' · '+r.actual+'/'+r.target+' '+(r.metric==="seconds"?"giây":"lần")+' · '+(BAND_LABEL[r.band]||'Không rõ dây')+(r.confirmed===true?' · Đã xác nhận'+(Number.isInteger(r.rir)?' · RIR '+(r.rir===4?'4+':r.rir):r.quality?' · '+(r.quality==='fast'?'Phát lực tốt':r.quality==='slow'?'Tốc độ giảm':'Chưa rõ tốc độ'):r.effort?' · '+({easy:'Dễ',medium:'Vừa',hard:'Khó',unknown:'Chưa rõ'}[r.effort]||'Chưa rõ'):' · RIR chưa rõ'):' · Dữ liệu cũ, chưa xác nhận')+'</div>').join("")+'</div></details>';
    }).join("");
    return '<div class="page-head"><div><div class="eyebrow">PROGRESS LOG</div><h1>Lịch sử tập luyện</h1><p>Dữ liệu lưu tại trình duyệt này. Xóa dữ liệu trang web sẽ xóa lịch sử.</p></div></div>'+
      (list.length?'<div class="card">'+html+'</div>':'<div class="card"><h2>Chưa có buổi tập</h2><p class="muted mt12">Sau khi hoàn thành buổi đầu tiên, lịch sử và điều chỉnh rep sẽ xuất hiện ở đây.</p></div>')+
      '<div class="inline-note mt20">Để sao lưu, hãy dùng chức năng Xuất dữ liệu JSON bên dưới. Dữ liệu không tự đồng bộ giữa iPhone và máy tính.</div>'+
      '<button class="secondary-btn wide" data-action="export">Xuất lịch sử và cài đặt (JSON)</button>'+
      '<label class="secondary-btn wide mt12" style="display:flex;cursor:pointer">Nhập dữ liệu đã sao lưu<input type="file" id="importFile" accept="application/json,.json" style="display:none"></label>';
  }
  function goHome(){if(FS.active()&&!confirm("Rời Full Stage Test? Phiên chưa hoàn thành sẽ bị hủy."))return;if(S.active&&S.active.phase==="work")pauseSet();page="home";render();window.scrollTo(0,0);}
  function startWorkout(mode,day,override){
    if(S.active){page="workout";render();return;}
    if(!TEMPLATES[mode])return;
    const reason=deloadReason(mode);
    const useDeload=override?override.deload:(deloadChoice==="light"||(deloadChoice==="auto"&&!!reason&&confirm(reason+" Bắt đầu buổi giảm tải? OK = giảm tải; Hủy = buổi bình thường.")));
    const a={templateVersion:2,coachVersion:3,deload:!!useDeload,readiness:override?override.readiness:readiness,mode:mode,day:day,index:0,setIndex:0,phase:"ready",records:[],startedAt:stamp(),swaps:{},bands:{},input:null,rir:null,quality:null,effort:null,remaining:0,deadline:0,restTotal:0};
    readiness="unknown";deloadChoice="auto";
    S.active=a;initSet(a);persist();page="workout";render();window.scrollTo(0,0);
  }
  function resetWorkout(){
    const a=S.active;if(!a)return;
    if(!confirm("Bắt đầu lại từ động tác 1, hiệp 1? Các hiệp chưa lưu của buổi này sẽ bị bỏ. Lịch sử, cài đặt và bài đã chọn vẫn được giữ."))return;
    const mode=a.mode,day=a.day;S.active=null;lastRestBeep=false;lastSummary=null;startWorkout(mode,day,{deload:!!a.deload,readiness:a.readiness});toast("Đã reset buổi tập");
  }
  function initSet(a){const slot=getTemplate(a.mode)[a.index];a.input=null;a.rir=null;a.quality=null;a.effort=null;a.remaining=workSeconds(a,slot);a.phase="ready";a.deadline=0;}
  function startSet(){
    const a=S.active;if(!a||!["ready","paused"].includes(a.phase))return;
    let t=a.phase==="paused"?a.remaining:workSeconds(a,getTemplate(a.mode)[a.index]);
    a.deadline=Date.now()+Math.max(1,t)*1000;a.phase="work";a.remaining=t;persist();render();
  }
  function pauseSet(){
    const a=S.active;if(!a||a.phase!=="work")return;
    a.remaining=Math.max(1,Math.ceil((a.deadline-Date.now())/1000));a.phase="paused";a.deadline=0;persist();render();
  }
  function resetSet(){
    const a=S.active;if(!a)return;if(!["ready","paused","work","review"].includes(a.phase))return;
    initSet(a);persist();render();
  }
  function alertEnd(){
    if(S.settings.vibration && navigator.vibrate)navigator.vibrate([90,60,90]);
    if(!S.settings.sound)return;
    try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
      const ctx=new C(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.type="sine";osc.frequency.setValueAtTime(740,ctx.currentTime);osc.frequency.exponentialRampToValueAtTime(990,ctx.currentTime+.15);
      gain.gain.setValueAtTime(.045,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.21);
      osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.22);osc.onended=()=>ctx.close();
    }catch(e){/* Trình duyệt có thể chặn âm thanh không có tương tác */}}
  function finishSet(auto){
    const a=S.active;if(!a||a.phase==="rest")return;
    if(auto){a.phase="review";a.deadline=0;a.remaining=0;persist();render();toast("Hết giờ · Nhập và xác nhận kết quả");return;}
    const slot=getTemplate(a.mode)[a.index],ex=getExercise(a.mode,slot,a),metric=getMetric(a.mode,slot,a);
    if(a.phase!=="review"){a.phase="review";a.deadline=0;a.remaining=0;persist();render();}
    if(a.input===null||a.input===""||!Number.isInteger(Number(a.input))||Number(a.input)<0||Number(a.input)>999){toast("Nhập số lần/giây thực tế, kể cả 0");return;}
    if(EXPLOSIVE.has(ex.id)?!a.quality:metric==="seconds"?!a.effort:a.rir===null||a.rir===undefined){toast("Chọn đánh giá sau hiệp hoặc Chưa rõ");return;}
    const target=getTarget(a.mode,slot,a),actual=Number(a.input);
    a.records.push({slot:slot[0],exerciseId:ex.id,set:a.setIndex+1,target,actual,metric,band:getBand(a.mode,slot,a),effort:a.effort,rir:metric==="reps"&&!EXPLOSIVE.has(ex.id)&&a.rir!=="unknown"?Number(a.rir):null,quality:EXPLOSIVE.has(ex.id)?a.quality:null,confirmed:true,auto:false});
    if(a.index===getTemplate(a.mode).length-1 && a.setIndex===slot[3]-1){finishWorkout();return;}
    a.phase="rest";a.restTotal=Math.max(minmax(S.settings.restSec,15,300),(EXPLOSIVE.has(ex.id)||(a.mode==="strength"&&["leg","push","pull","verticalPull","shoulder","hip"].includes(slot[0])))?120:15);a.deadline=Date.now()+a.restTotal*1000;a.remaining=a.restTotal;lastRestBeep=false;persist();render();
  }
  function advance(){
    const a=S.active;if(!a||a.phase!=="rest")return;
    const slot=getTemplate(a.mode)[a.index];
    if(a.setIndex+1<slot[3])a.setIndex++;
    else{a.index++;a.setIndex=0;}
    if(a.index>=getTemplate(a.mode).length){finishWorkout();return;}
    initSet(a);persist();render();window.scrollTo(0,0);
  }
  function skipExercise(){
    const a=S.active;if(!a)return;
    if(!confirm("Bỏ qua động tác này? Các hiệp chưa làm sẽ không được tính vào tổng tải đã thực hiện."))return;
    a.index++;a.setIndex=0;
    if(a.index>=getTemplate(a.mode).length)finishWorkout();else{initSet(a);persist();render();}
  }
  const VARIANTS={inclinePush:["pushup","tempoPush","bandPush"],pushup:["tempoPush","bandPush","declinePush"],tempoPush:["bandPush","declinePush"],fastPush:["tempoPush","bandPush"],chest:["bandPush","tempoPush"],floorChest:["bandPush","tempoPush"],pullup:[],chinup:[],assistPull:["pullup"],assistChin:["chinup"],negativePull:["assistPull","assistChin"],squat:["split","bandLateral"],hipHinge:["rdl","singleRdl"],rdl:["singleRdl"],gluteBridge:["singleRdl"],calf:["singleCalf"],plank:["hollow"],reverseCrunch:["legRaise"],row:["singleRow"],lunge:["split"]};
  function capFor(a,ex,metric){
    if(metric==="seconds")return 60;
    if(EXPLOSIVE.has(ex.id))return 5;
    if(PULL_IDS.has(ex.id))return a.mode==="balance"?8:5;
    return a.mode==="strength"?8:a.mode==="balance"?20:12;
  }
  function loadTip(a,slot,ex,band){
    const key=slotId(a.mode,slot),allowed=[slot[1],...slot[2]],base={mode:a.mode,slot:slot[0],exerciseId:ex.id,band};
    if(ASSIST.has(ex.id)&&band==="heavy")return {...base,nextBand:"light",reason:"Hai buổi cùng bài đạt mục tiêu, còn ít nhất 3 lần dự trữ. Có thể dùng dây trợ lực nhẹ hơn (khó hơn)."};
    if(!ASSIST.has(ex.id)&&band==="light"&&!/nhẹ/i.test(ex.need)&&!EXPLOSIVE.has(ex.id))return {...base,nextBand:"heavy",reason:"Hai buổi cùng bài đạt mục tiêu, còn ít nhất 3 lần dự trữ. Thử dây nặng hơn; nếu khó quá, đổi lại dây nhẹ."};
    const next=(VARIANTS[ex.id]||[]).find(id=>allowed.includes(id)&&id!==ex.id);
    if(next)return {...base,nextExercise:next,reason:"Đã thích nghi ở mức hiện tại. Thử "+EX[next].en+"; bắt đầu với ít lần và kiểm soát kỹ thuật."};
    return {...base,reason:"Đã đạt ngưỡng số lần và còn dự trữ tốt. Nếu có tải phù hợp hơn, tăng độ khó từng bước; nếu không, giữ nguyên và ưu tiên kỹ thuật."};
  }
  function applyTip(){
    const a=S.active;if(!a||a.deload||a.phase!=="ready"||a.setIndex!==0)return;
    const slot=getTemplate(a.mode)[a.index],ex=getExercise(a.mode,slot,a),band=getBand(a.mode,slot,a),key=slotId(a.mode,slot),t=S.coachTips[key];
    if(!t||t.exerciseId!==ex.id||t.band!==band)return;
    if(t.nextExercise&&![slot[1],...slot[2]].includes(t.nextExercise))return;
    if(t.nextBand&&!["light","heavy"].includes(t.nextBand))return;
    if(!confirm("Áp dụng mức khó hơn cho bài này? Nếu kỹ thuật giảm, hãy đổi lại trước khi tập."))return;
    if(t.nextExercise){a.swaps[slot[0]]=t.nextExercise;S.swaps[key]=t.nextExercise;delete a.bands[slot[0]];delete S.bands[key];}
    if(t.nextBand){a.bands[slot[0]]=t.nextBand;S.bands[key]=t.nextBand;}
    const k=targetKey(a.mode,slot,a);if(getMetric(a.mode,slot,a)==="reps"){
      const newEx=getExercise(a.mode,slot,a),newBase=getBaseTarget(a.mode,slot,a);
      S.targets[k]=Math.max(1,Math.min(newBase,PULL_IDS.has(newEx.id)?3:a.mode==="strength"?5:8));
    }
    delete S.coachTips[key];initSet(a);persist();render();toast("Đã áp dụng; có thể đổi lại nếu quá khó");
  }
  function updateTargets(a){
    const all=a.records||[],records=all.filter(r=>r.confirmed===true),overall=verifiedRatio(records),changes=[];
    if(a.deload||a.mode==="recovery")return {changes,overall,totalActual:records.reduce((n,r)=>n+r.actual,0)};
    const grouped={};for(const r of records)(grouped[r.slot]||(grouped[r.slot]=[])).push(r);
    for(const [slotKey,rs] of Object.entries(grouped)){
      const slot=getTemplate(a.mode).find(x=>x[0]===slotKey);if(!slot)continue;
      const ex=getExercise(a.mode,slot,a),band=getBand(a.mode,slot,a),metric=getMetric(a.mode,slot,a),key=slotId(a.mode,slot);
      if(rs.length!==slot[3]||rs.some(r=>r.exerciseId!==ex.id||r.band!==band||r.metric!==metric))continue;
      delete S.coachTips[key];
      const before=getBaseTarget(a.mode,slot,a),ratio=verifiedRatio(rs),timed=metric==="seconds";
      const floor=timed?5:1,step=timed?5:1;
      let next=before,reason="";
      if(EXPLOSIVE.has(ex.id)){
        if(rs.some(r=>r.quality==="slow")||ratio<.85){next=Math.max(1,before-1);reason="Tốc độ/kỹ thuật giảm hoặc chưa đạt mục tiêu; giảm số lần, nghỉ đủ. Không tăng tải bộc phá tự động.";}
      }else if(ratio<.85||(!timed&&rs.filter(r=>r.rir===0).length>=Math.ceil(rs.length/2))){
        next=Math.max(floor,before-step);reason="Chưa đạt mục tiêu hoặc thường xuyên hết sức; giảm nhẹ để giữ kỹ thuật.";
      }else{
        const ready=arr=>arr.length===slot[3]&&arr.every(r=>r.confirmed===true&&r.actual>=r.target&&(timed?r.effort==="easy":Number.isInteger(r.rir)&&r.rir>=3));
        const previous=S.logs.slice().reverse().find(l=>l.mode===a.mode&&!l.deload&&l.coachVersion===3&&confirmedRecords(l).some(r=>r.slot===slotKey&&r.exerciseId===ex.id&&r.band===band&&r.metric===metric));
        const prev=previous?confirmedRecords(previous).filter(r=>r.slot===slotKey&&r.exerciseId===ex.id&&r.band===band&&r.metric===metric):[];
        if(a.readiness!=="poor"&&ready(rs)&&ready(prev)&&prev.every(r=>r.target===before)&&rs.every(r=>r.target===before)){
          const cap=capFor(a,ex,metric);
          if(before<cap){next=Math.min(cap,before+step);reason="Hai buổi cùng bài, cùng tải và mục tiêu đều hoàn thành dễ; tăng nhẹ số lần/giây.";}
          else{const t=loadTip(a,slot,ex,band);S.coachTips[key]=t;changes.push({name:ex.en,kind:"tip",previous:before,next:before,metric,reason:t.reason});}
        }
      }
      if(next!==before){S.targets[targetKey(a.mode,slot,a)]=next;changes.push({name:ex.en,kind:"target",previous:before,next,metric,reason});}
    }
    return {changes,overall,totalActual:records.reduce((n,r)=>n+r.actual,0)};
  }
  function finishWorkout(){
    const a=S.active;if(!a)return;
    const upd=updateTargets(a);
    const minutes=Math.max(1,Math.round((Date.now()-new Date(a.startedAt).getTime())/60000));
    const plannedSets=getTemplate(a.mode).reduce((n,s)=>n+s[3],0);
    const log={date:stamp(),coachVersion:3,deload:!!a.deload,readiness:a.readiness||"unknown",mode:a.mode,day:a.day,records:a.records.slice(),plannedSets:plannedSets,minutes:minutes,ratio:upd.overall===null?null:Math.round(upd.overall*100),volume:upd.totalActual,adjustments:upd.changes};
    S.logs.push(log);if(S.logs.length>250)S.logs=S.logs.slice(-250);
    lastSummary=log;S.active=null;persist();page="summary";render();alertEnd();window.scrollTo(0,0);
  }
  function openSwap(){
    const a=S.active;if(!a||a.phase==="rest")return;
    if(!["ready"].includes(a.phase)){toast("Chỉ đổi bài khi sẵn sàng, trước khi bắt đầu hiệp");return;}
    if(a.setIndex>0){toast("Đổi bài trước hiệp đầu tiên của động tác");return;}
    const slot=getTemplate(a.mode)[a.index],ids=[...new Set([slot[1],...slot[2]])].filter(id=>!a.deload||!EXPLOSIVE.has(id)),selected=getExercise(a.mode,slot,a).id;
    document.getElementById("swapList").innerHTML=ids.map(id=>{
      const ex=EX[id];return '<button class="swap-option '+(id===selected?"selected":"")+'" data-action="choose-swap" data-id="'+id+'"><span class="swap-radio">'+(id===selected?"●":"○")+'</span><span><strong>'+esc(ex.en)+'</strong><p>'+esc(ex.vi)+' · '+esc(ex.need)+(a.mode==='power'&&POWER_SLOTS.has(slot[0])&&!EXPLOSIVE.has(id)?' · Bổ trợ, không phải bộc phát':'')+'</p><p>'+esc(ex.steps[0])+'</p></span></button>';
    }).join("");
    document.getElementById("swapDialog").showModal();
  }
  function chooseSwap(id){
    const a=S.active;if(!a)return;
    const slot=getTemplate(a.mode)[a.index];
    if(a.phase!=="ready"||a.setIndex!==0||![slot[1],...slot[2]].includes(id))return;
    if(a.deload&&EXPLOSIVE.has(id)){toast("Buổi giảm tải không chọn bài bộc phá");return;}
    a.swaps[slot[0]]=id;if(!a.deload)S.swaps[slotId(a.mode,slot)]=id;initSet(a);persist();
    document.getElementById("swapDialog").close();render();toast("Đã đổi sang "+EX[id].en);
  }
  function refreshTickDisplay(){
    const a=S.active;if(page!=="workout"||!a||!["work","rest"].includes(a.phase))return;
    const remaining=Math.max(0,Math.ceil((a.deadline-Date.now())/1000));
    const el=document.getElementById("timerNum"),ring=document.getElementById("timerRing");
    if(!el||!ring)return;
    el.textContent=formatTime(remaining);
    const max=a.phase==="rest"?Math.max(15,a.restTotal||S.settings.restSec):workSeconds(a,getTemplate(a.mode)[a.index]);
    ring.style.setProperty("--pct",Math.min(100,Math.max(0,remaining*100/max)));
  }
  function tick(){
    if(page!=="workout"||!S.active)return;
    const a=S.active;if(!["work","rest"].includes(a.phase))return;
    const seconds=Math.ceil((a.deadline-Date.now())/1000);
    if(seconds<=0){
      if(a.phase==="work"){alertEnd();finishSet(true);}
      else{refreshTickDisplay();if(!lastRestBeep){lastRestBeep=true;alertEnd();}}
    }else refreshTickDisplay();
  }
  function exportData(){
    const blob=new Blob([JSON.stringify({app:"BandFit",version:4,exportedAt:stamp(),data:{onboarded:S.onboarded,schedule:S.schedule,settings:S.settings,logs:S.logs,targets:S.targets,swaps:S.swaps,bands:S.bands,coachTips:S.coachTips,campaign:S.campaign}},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="bandfit-backup-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }
  async function importData(file){
    try{
      const obj=JSON.parse(await file.text());
      if(!obj||obj.app!=="BandFit"||!obj.data||!Array.isArray(obj.data.logs)||!Array.isArray(obj.data.schedule))throw Error("Sai định dạng bản sao lưu BandFit");
      if(!confirm("Nhập dữ liệu sẽ thay lịch sử, số rep đã học và cài đặt hiện tại. Tiếp tục?"))return;
      const x=obj.data;
      S={onboarded:!!x.onboarded,schedule:sortDays(x.schedule.filter(d=>ORDER.includes(d))).slice(0,4),settings:Object.assign(defaultData().settings,x.settings||{}),logs:x.logs.slice(-250),targets:x.targets||{},swaps:x.swaps||{},bands:x.bands||{},coachTips:x.coachTips&&typeof x.coachTips==="object"&&!Array.isArray(x.coachTips)?x.coachTips:{},campaign:CE.clean(x.campaign),active:null};
      if(S.schedule.length<3)S.schedule=[2,4,6];
      persist();goHome();toast("Đã khôi phục bản sao lưu");
    }catch(e){toast("Không nhập được: "+e.message);}
  }
  document.addEventListener("click",function(event){
    const target=event.target.closest("[data-action]");if(!target)return;
    const action=target.dataset.action;
    if(action==="preset"){draftDays=target.dataset.days.split(",").map(Number);presetCustom=false;render();}
    else if(action==="toggle-day"){
      const d=Number(target.dataset.day);if(draftDays.includes(d))draftDays=draftDays.filter(x=>x!==d);
      else if(draftDays.length<4)draftDays.push(d);else{toast("Chọn tối đa 4 ngày");return;}
      draftDays=sortDays(draftDays);presetCustom=true;render();
    }else if(action==="save-schedule"){
      if(draftDays.length<3||draftDays.length>4){toast("Hãy chọn 3 hoặc 4 ngày");return;}
      S.schedule=sortDays(draftDays);S.onboarded=true;persist();goHome();
    }else if(action==="edit-schedule"){draftDays=S.schedule.slice();presetCustom=false;navigate("setup");}
    else if(action==="start")startWorkout(target.dataset.mode,Number(target.dataset.day));
    else if(action==="resume"){page="workout";render();window.scrollTo(0,0);}
    else if(action==="start-set"||action==="resume-set")startSet();
    else if(action==="pause-set")pauseSet();
    else if(action==="reset-set")resetSet();
    else if(action==="reset-workout")resetWorkout();
    else if(action==="finish-set")finishSet(false);
    else if(action==="readiness"){if(Object.hasOwn(READINESS,target.dataset.value)){readiness=target.dataset.value;render();}}
    else if(action==="deload-choice"){if(["auto","normal","light"].includes(target.dataset.value)){deloadChoice=target.dataset.value;render();}}
    else if(action==="use-target"){const a=S.active;if(a&&a.phase!=="rest"){a.input=getTarget(a.mode,getTemplate(a.mode)[a.index],a);persist();render();}}
    else if(action==="apply-tip")applyTip();
    else if(action==="dismiss-tip"){const a=S.active;if(a){delete S.coachTips[slotId(a.mode,getTemplate(a.mode)[a.index])];persist();render();}}
    else if(action==="rir"||action==="quality"){const a=S.active,v=target.dataset.value;if(a&&a.phase!=="rest"){if(action==="rir"&&["0","1","2","3","4","unknown"].includes(v))a.rir=v==="unknown"?v:Number(v);if(action==="quality"&&["fast","slow","unknown"].includes(v))a.quality=v;persist();render();}}
    else if(action==="skip-rest")advance();
    else if(action==="add-rest"){
      const a=S.active;if(a&&a.phase==="rest"){let now=Date.now();a.deadline=Math.max(now,a.deadline)+15000;a.restTotal=Math.max(15,Math.ceil((a.deadline-now)/1000));lastRestBeep=false;persist();refreshTickDisplay();toast("Đã cộng thêm 15 giây");}
    }else if(action==="swap")openSwap();
    else if(action==="choose-swap")chooseSwap(target.dataset.id);
    else if(action==="set-band"){
      const a=S.active;if(!a)return;
      if(a.phase!=="ready"||a.setIndex>0||a.deload){toast(a.deload?"Buổi giảm tải tự chọn mức dây nhẹ hoặc trợ lực":"Hãy đổi dây trước hiệp đầu tiên của bài");return;}
      const b=target.dataset.band;if(!["light","heavy"].includes(b))return;
      const currentEx=getExercise(a.mode,getTemplate(a.mode)[a.index],a);if(b==="heavy"&&(/nhẹ/i.test(currentEx.need)||EXPLOSIVE.has(currentEx.id))){toast("Bài này dùng dây nhẹ để giữ kỹ thuật và tốc độ");return;}
      const slot=getTemplate(a.mode)[a.index];a.bands[slot[0]]=b;S.bands[slotId(a.mode,slot)]=b;
      initSet(a);persist();render();toast("Đã chọn "+BAND_LABEL[b]);
    }
    else if(action==="effort"){const a=S.active;if(a&&a.phase!=="rest"&&["easy","medium","hard","unknown"].includes(target.dataset.value)){a.effort=target.dataset.value;persist();render();}}
    else if(action==="skip-exercise")skipExercise();
    else if(action==="exit-workout"){if(S.active&&S.active.phase==="work")pauseSet();page="home";render();}
    else if(action==="go-home")goHome();
    else if(action==="filter"){libraryFilter=target.dataset.cat;detailId=null;render();}
    else if(action==="filter-mode"){libraryMode=target.dataset.mode;detailId=null;render();}
    else if(action==="toggle-detail"){detailId=detailId===target.dataset.id?null:target.dataset.id;document.getElementById("libraryList").innerHTML=renderLibraryList();}
    else if(action==="export")exportData();
  });
  document.getElementById("brandBtn").addEventListener("click",goHome);
  document.getElementById("settingsBtn").addEventListener("click",()=>{
    if(page==="campaign"){if(FS.active()&&!confirm("Mở cài đặt sẽ kết thúc Full Stage Test. Tiếp tục?"))return;CP.clear();render();}
    const f=document.getElementById("settingsForm");
    f.elements.restSec.value=S.settings.restSec;f.elements.workSec.value=S.settings.workSec;
    f.elements.sound.checked=!!S.settings.sound;f.elements.vibration.checked=!!S.settings.vibration;
    document.getElementById("settingsDialog").showModal();
  });
  document.querySelectorAll(".close-dialog").forEach(btn=>btn.addEventListener("click",()=>document.getElementById(btn.dataset.dialog).close()));
  document.querySelectorAll("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close();}));
  document.getElementById("settingsForm").addEventListener("submit",e=>{
    e.preventDefault();const f=e.target;
    S.settings.restSec=minmax(f.elements.restSec.value,15,300);S.settings.workSec=minmax(f.elements.workSec.value,15,180);
    S.settings.sound=f.elements.sound.checked;S.settings.vibration=f.elements.vibration.checked;
    persist();document.getElementById("settingsDialog").close();render();toast("Đã lưu cài đặt");
  });
  document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.page)));
  app.addEventListener("input",e=>{
    if(e.target.id==="repInput"&&S.active){const v=e.target.value;S.active.input=v===""?null:Number(v);persist();}
    if(e.target.id==="searchExercise"){libraryQuery=e.target.value;detailId=null;document.getElementById("libraryList").innerHTML=renderLibraryList();}
  });
  app.addEventListener("change",e=>{if(e.target.id==="importFile"&&e.target.files&&e.target.files[0])importData(e.target.files[0]);});
  app.addEventListener("keydown",e=>{const t=e.target.closest('[data-action="toggle-detail"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();t.click();}});
  window.addEventListener("online",()=>{document.getElementById("onlineStatus").classList.remove("offline");});
  window.addEventListener("offline",()=>{document.getElementById("onlineStatus").classList.add("offline");});
  if(!navigator.onLine)document.getElementById("onlineStatus").classList.add("offline");
  if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
  document.addEventListener("visibilitychange",()=>{if(document.hidden&&S.active&&S.active.phase==="work"){const a=S.active;a.remaining=Math.max(1,Math.ceil((a.deadline-Date.now())/1000));a.phase="paused";a.deadline=0;persist();}else if(!document.hidden&&page==="workout"){render();}});
  CP.attach();
  FS.attach();
  timerInterval=setInterval(tick,250);
  render();
})();
