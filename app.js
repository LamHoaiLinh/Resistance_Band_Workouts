
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
    balance:{title:"Cân bằng cơ thể",tag:"BALANCE DAY",subtitle:"Lưng · Vai sau · Chân · Bụng chéo · Ổn định toàn thân",icon:"◎",time:"45–55 phút"},
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
  function defaultData(){return {onboarded:false,schedule:[2,4,6],settings:{restSec:90,workSec:45,sound:true,vibration:false},logs:[],targets:{},swaps:{},active:null};}
  function load(){
    let data=defaultData();
    try{let saved=JSON.parse(localStorage.getItem(KEY)||"null");if(saved&&typeof saved==="object"){data=Object.assign(data,saved);data.settings=Object.assign(defaultData().settings,saved.settings||{});}}
    catch(error){console.warn("Không đọc được dữ liệu đã lưu",error);}
    if(!Array.isArray(data.schedule))data.schedule=[2,4,6];
    if(!Array.isArray(data.logs))data.logs=[];
    if(!data.targets||typeof data.targets!=="object")data.targets={};
    if(!data.swaps||typeof data.swaps!=="object")data.swaps={};
    if(data.active&&data.active.phase==="work"){data.active.phase="paused";data.active.remaining=Math.max(1,Number(data.active.remaining)||15);}
    return data;
  }
  let S=load(),page=S.active?"workout":(S.onboarded?"home":"setup"),draftDays=S.schedule.slice(),presetCustom=false;
  let libraryQuery="",libraryFilter="Tất cả",detailId=null,lastSummary=null,toastTimer=null,timerInterval=null,lastRestBeep=false;
  const app=document.getElementById("app");
  const dayOrder=(a,b)=>ORDER.indexOf(a)-ORDER.indexOf(b);
  const sortDays=arr=>Array.from(new Set(arr)).sort(dayOrder);
  const getTemplate=mode=>TEMPLATES[mode]||TEMPLATES.strength;
  const slotId=(mode,slot)=>mode+":"+slot[0];
  const getExercise=(mode,slot,act)=>EX[(act&&act.swaps&&act.swaps[slot[0]])||S.swaps[slotId(mode,slot)]||slot[1]]||EX[slot[1]];
  const getTarget=(mode,slot)=>Math.max(1,Number(S.targets[slotId(mode,slot)])||slot[4]);
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
    document.querySelectorAll(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.page===page));
    document.getElementById("bottomNav").style.display=(page==="setup"||page==="workout"||page==="summary")?"none":"";
    app.style.paddingBottom=(page==="setup"||page==="workout"||page==="summary")?"45px":"";
    if(page==="setup")app.innerHTML=renderSetup();
    else if(page==="home")app.innerHTML=renderHome();
    else if(page==="workout")app.innerHTML=renderWorkout();
    else if(page==="summary")app.innerHTML=renderSummary();
    else if(page==="library")app.innerHTML=renderLibrary();
    else if(page==="history")app.innerHTML=renderHistory();
    refreshTickDisplay();
  }
  function navigate(p){if(S.active && p!=="workout" && p!=="home" && !confirm("Bạn đang tập dở. Rời màn hình không làm mất tiến độ, nhưng bộ đếm sẽ vẫn chạy. Tiếp tục?"))return;page=p;render();window.scrollTo(0,0);}
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
  function renderHome(){
    const today=new Date().getDay(),session=scheduleFor(S.schedule),up=nextScheduled();
    const todayMode=session.find(x=>x.day===today);
    const last7=S.logs.filter(x=>Date.now()-new Date(x.date).getTime()<7*864e5);
    let weekly='<div class="week-strip">'+ORDER.map(day=>'<div class="day-pill '+(session.some(x=>x.day===day)?"on ":"")+(today===day?"today":"")+'"><span>'+SHORT[day]+'</span><strong>'+(session.some(x=>x.day===day)?"●":"·")+'</strong></div>').join("")+'</div>';
    let rows=session.map(x=>{
      const m=MODES[x.mode],count=getTemplate(x.mode).length,mark=today===x.day?' <span class="pill">Hôm nay</span>':'';
      return '<button class="session-row" data-action="start" data-mode="'+x.mode+'" data-day="'+x.day+'"><span class="session-num">'+m.icon+'</span><span class="session-info"><strong>'+DAYNAME[x.day]+' · '+m.title+mark+'</strong><small>'+count+' động tác · '+m.time+' · '+m.subtitle+'</small></span><span class="session-arrow">›</span></button>';
    }).join("");
    let banner=S.active?'<div class="inline-note">Buổi tập đang tạm lưu: '+MODES[S.active.mode].title+'. <button class="link-btn" data-action="resume">Tiếp tục →</button></div>':'';
    return '<section class="hero card"><div class="eyebrow">BUILD STRENGTH. MOVE BETTER.</div><h1>Khỏe hơn.<br>Không cần tập quá sức.</h1><p>Bài tập bằng dây kháng lực, đo thời gian từng hiệp và tăng số rep theo tiến bộ thực tế của bạn.</p><div class="hero-actions"><button class="primary-btn" data-action="'+(S.active?"resume":"start")+'" data-mode="'+(todayMode?todayMode.mode:up.mode)+'" data-day="'+(todayMode?todayMode.day:up.day)+'">'+(S.active?"▶ Tiếp tục buổi tập":todayMode?"▶ Tập hôm nay":"▶ Bắt đầu buổi kế tiếp")+'</button></div></section>'+
    banner+'<div class="stats"><div class="stat"><strong>'+S.logs.length+'</strong><small>Buổi đã lưu</small></div><div class="stat"><strong>'+last7.length+'</strong><small>Buổi / 7 ngày</small></div><div class="stat"><strong>'+Object.keys(EX).length+'</strong><small>Bài trong thư viện</small></div></div>'+
    '<div class="section-head"><h2>Lịch của bạn</h2><button class="link-btn" data-action="edit-schedule">Chỉnh lịch ↗</button></div>'+weekly+
    '<div class="section-head"><h2>Chọn một buổi để tập</h2></div><div class="workout-list">'+rows+'</div>'+
    '<div class="inline-note mt20">Mỗi động tác có 2–3 phương án thay thế. Nếu bài khiến bạn đau khớp, hãy dừng bài đó và đổi sang động tác phù hợp hơn.</div>';
  }
  function recordCount(a){return Array.isArray(a.records)?a.records.length:0;}
  function workoutStats(a){
    const slots=getTemplate(a.mode),total=slots.reduce((n,s)=>n+s[3],0);
    return {done:recordCount(a),total:total,pct:total?Math.round(recordCount(a)*100/total):0};
  }
  function workSeconds(a,slot){
    if(slot[5]==="seconds")return getTarget(a.mode,slot);
    if(a.mode==="power" && (slot[0]==="jump"||slot[0]==="speedPush"||slot[0]==="speedPull"))return 25;
    const unilateral=["split","lunge","singleRow","woodChop","pallof","birdDog","deadBug","externalRot","standingKnee","sideReach"].includes(getExercise(a.mode,slot,a).id);
    return minmax(S.settings.workSec,15,180)*(unilateral?2:1);
  }
  function current(){
    const a=S.active;if(!a)return null;
    return {a:a,slot:getTemplate(a.mode)[a.index]};
  }
  function renderWorkout(){
    const v=current();if(!v)return '<div class="card"><h2>Không có buổi tập đang mở</h2><button class="primary-btn mt20" data-action="go-home">Về tổng quan</button></div>';
    const a=v.a,s=v.slot,ex=getExercise(a.mode,s,a),m=MODES[a.mode],st=workoutStats(a),target=getTarget(a.mode,s);
    const unit=s[5]==="seconds"?"giây":(ex.id==="sidePlank"?"giây":"lần");
    const exerciseTimer=workSeconds(a,s);
    let remaining=a.phase==="ready"?exerciseTimer:(a.phase==="paused"?a.remaining:(a.phase==="work"?Math.max(0,Math.ceil((a.deadline-Date.now())/1000)):exerciseTimer));
    let pct=a.phase==="ready"?100:Math.min(100,Math.max(0,100*remaining/exerciseTimer));
    let body='';
    if(a.phase==="rest"){
      let restSec=Math.max(0,Math.ceil((a.deadline-Date.now())/1000));
      let restPct=Math.min(100,Math.max(0,restSec/Math.max(15,a.restTotal||S.settings.restSec)*100));
      let nextText=a.setIndex+1<s[3]?'Hiệp '+(a.setIndex+2)+' / '+s[3]+' của '+ex.en:(a.index+1<getTemplate(a.mode).length?getExercise(a.mode,getTemplate(a.mode)[a.index+1],a).en:"Hoàn tất");
      body='<div class="next-panel"><span class="pill orange">REST · NGHỈ NGƠI</span><h2>Hồi sức để tập tốt hơn</h2><div class="timer-wrap"><div class="timer-ring rest" id="timerRing" style="--pct:'+restPct+'"><div class="timer-inner"><div id="timerNum" class="timer-number">'+formatTime(restSec)+'</div><div class="timer-label">THỜI GIAN NGHỈ</div></div></div></div><p>Tiếp theo: <strong>'+esc(nextText)+'</strong></p><div class="timer-button-row"><button class="secondary-btn" data-action="add-rest">+15 giây</button><button class="ghost-btn" data-action="skip-rest">Đã nghỉ xong →</button></div><p class="tiny muted mt12">Bạn có thể nhấn +15 giây nhiều lần. Hết giờ không tự ép bạn bắt đầu hiệp mới.</p></div>';
    } else {
      body='<div class="exercise-card"><div class="set-meta"><span>ĐỘNG TÁC '+(a.index+1)+' / '+getTemplate(a.mode).length+'</span><strong>HIỆP '+(a.setIndex+1)+' / '+s[3]+'</strong></div>'+
        '<div class="exercise-name">'+esc(ex.en)+'</div><div class="exercise-vn">'+esc(ex.vi)+'</div><div class="ex-tags"><span class="pill">'+esc(ex.group)+'</span><span class="pill muted">'+esc(ex.need)+'</span></div>'+
        '<ol class="exercise-instructions">'+ex.steps.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ol>'+
        '<div class="tips">Lưu ý: '+esc(ex.tip)+'</div>'+
        '<div class="exercise-tool-row"><button class="ghost-btn" data-action="swap">⇄ Đổi bài tương tự</button><button class="ghost-btn" data-action="skip-exercise">Bỏ qua bài</button></div>'+
        '<div class="timer-wrap"><div class="timer-ring" id="timerRing" style="--pct:'+pct+'"><div class="timer-inner"><div class="timer-number" id="timerNum">'+formatTime(remaining)+'</div><div class="timer-label">'+(a.phase==="ready"?"SẴN SÀNG":a.phase==="paused"?"TẠM DỪNG":"ĐANG TẬP")+'</div></div></div></div>'+
        '<div class="rep-row"><label><strong>Thực hiện được bao nhiêu '+unit+'?</strong>Gợi ý: '+target+' '+unit+(["sidePlank","sideReach"].includes(ex.id)&&s[5]==="seconds"?" (chia đều 2 bên)":"")+'. Có thể sửa số thực tế.</label><input id="repInput" class="rep-input" type="number" inputmode="numeric" min="0" max="999" value="'+esc(a.input==null?target:a.input)+'" aria-label="Số '+unit+' thực tế"></div>'+
        '<div class="effort-row"><span>Cảm giác sau hiệp:</span>'+[["easy","Dễ"],["medium","Vừa"],["hard","Khó"]].map(x=>'<button class="effort-choice '+(a.effort===x[0]?"selected":"")+'" data-action="effort" data-value="'+x[0]+'">'+x[1]+'</button>').join("")+'</div>'+
        '<div class="timer-button-row">'+(a.phase==="ready"?'<button class="primary-btn" data-action="start-set">▶ Bắt đầu đếm giờ</button>':a.phase==="paused"?'<button class="primary-btn" data-action="resume-set">▶ Tiếp tục</button>':'<button class="secondary-btn" data-action="pause-set">Ⅱ Tạm dừng</button>')+
        '<button class="ghost-btn" data-action="reset-set">↺ Đếm lại</button><button class="primary-btn" data-action="finish-set">✓ Hoàn thành hiệp / Nghỉ</button></div></div>';
    }
    return '<div class="workout-top"><div><div class="eyebrow">'+m.tag+' · '+DAYNAME[a.day]+'</div><h2 style="font-size:23px;margin:6px 0">'+m.title+'</h2></div><button class="ghost-btn" data-action="exit-workout">Thoát tạm</button></div>'+
      '<div class="set-meta"><span>ĐÃ HOÀN THÀNH '+st.done+' / '+st.total+' HIỆP</span><span>'+st.pct+'%</span></div><div class="progress-track"><div class="progress-fill" style="width:'+st.pct+'%"></div></div>'+body;
  }
  function renderSummary(){
    if(!lastSummary){return '<div class="card"><h2>Chưa có kết quả mới</h2><button class="primary-btn mt20" data-action="go-home">Về trang chủ</button></div>';}
    const l=lastSummary,adj=l.adjustments||[],items=adj.slice(0,8).map(a=>'<div class="history-item"><strong>'+esc(a.name)+'</strong><p>'+a.previous+' → '+a.next+' '+(a.metric==="seconds"?"giây":"lần")+'/hiệp · '+esc(a.reason)+'</p></div>').join("");
    return '<div class="eyebrow">WORKOUT SAVED</div><h1 style="font-size:34px;margin:11px 0">Hoàn thành buổi tập.</h1><p class="muted">Kết quả được lưu trên thiết bị này, không cần tài khoản.</p>'+
      '<div class="summary-grid"><div class="stat"><strong>'+l.records.length+'</strong><small>Hiệp đã ghi</small></div><div class="stat"><strong>'+l.volume+'</strong><small>Tổng lần/giây đã ghi*</small></div><div class="stat"><strong>'+l.ratio+'%</strong><small>Đạt mục tiêu đã đặt</small></div><div class="stat"><strong>'+l.minutes+' phút</strong><small>Thời gian phiên</small></div></div>'+
      '<div class="card"><h2 style="font-size:19px">Cá nhân hóa buổi sau</h2><p class="muted tiny mt12">Hệ thống so sánh số lần thực tế với mục tiêu của từng bài, đồng thời xét mức hoàn thành toàn buổi và cảm giác nặng/nhẹ. Thay đổi từng bước nhỏ, không tự tăng số hiệp.</p>'+
      (adj.length?'<div class="mt12">'+items+'</div>':'<div class="inline-note">Giữ nguyên mức hiện tại: phù hợp với số lần bạn vừa thực hiện.</div>')+
      '<p class="muted tiny mt12">* Tổng khối lượng chỉ là số đếm để theo dõi, không phải năng lượng tiêu hao; không cộng giây và lần thành cùng một đơn vị sinh lý.</p></div>'+
      '<button class="primary-btn wide mt20" data-action="go-home">Về tổng quan →</button>';
  }
  function renderLibraryList(){
    let q=libraryQuery.toLocaleLowerCase("vi"),list=Object.values(EX).filter(ex=>(libraryFilter==="Tất cả"||ex.group===libraryFilter)&&(!q||[ex.en,ex.vi,ex.group].join(" ").toLocaleLowerCase("vi").includes(q)));
    if(!list.length)return '<div class="card muted center">Không có bài phù hợp.</div>';
    return list.map(ex=>'<div class="exercise-list-item" data-action="toggle-detail" data-id="'+ex.id+'" role="button" tabindex="0"><span><strong>'+esc(ex.en)+'</strong><small>'+esc(ex.vi)+' · '+esc(ex.group)+'</small></span><span class="session-arrow">'+(detailId===ex.id?"⌃":"›")+'</span></div>'+
    (detailId===ex.id?'<div class="exercise-detail"><span class="pill muted">'+esc(ex.need)+'</span><ol class="exercise-instructions">'+ex.steps.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ol><p>Ghi nhớ: '+esc(ex.tip)+'</p></div>':"")).join("");
  }
  function renderLibrary(){
    const cats=["Tất cả",...new Set(Object.values(EX).map(x=>x.group))];
    return '<div class="page-head"><div><div class="eyebrow">EXERCISE LIBRARY</div><h1>Thư viện bài tập</h1><p>Ưu tiên dây kháng lực · Tên tiếng Anh dễ tìm video hướng dẫn.</p></div><span class="pill">'+Object.keys(EX).length+' bài</span></div>'+
    '<div class="library-toolbar"><input id="searchExercise" class="search-input" type="search" placeholder="Tìm bài hoặc nhóm cơ..." value="'+esc(libraryQuery)+'" aria-label="Tìm bài tập">'+
    '<div class="filter-row">'+cats.map(c=>'<button class="filter-btn '+(c===libraryFilter?"active":"")+'" data-action="filter" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join("")+'</div></div>'+
    '<div id="libraryList" class="exercise-list">'+renderLibraryList()+'</div>';
  }
  function renderHistory(){
    const list=S.logs.slice().reverse();
    let html=list.map(l=>{
      const fmt=l.mode==="strength"?"Sức mạnh":MODES[l.mode].title;
      return '<details class="history-item"><summary><span class="pill">'+esc(fmt)+'</span><strong>'+isoDay(l.date)+' · '+l.records.length+' hiệp</strong><p>'+l.ratio+'% mục tiêu · '+l.minutes+' phút · '+(l.adjustments||[]).length+' bài được điều chỉnh</p></summary>'+
      '<div class="mt12">'+l.records.map(r=>'<div class="tiny muted" style="padding:5px 0">'+esc(EX[r.exerciseId]?EX[r.exerciseId].en:r.exerciseId)+' · hiệp '+r.set+' · '+r.actual+'/'+r.target+' '+(r.metric==="seconds"?"giây":"lần")+'</div>').join("")+'</div></details>';
    }).join("");
    return '<div class="page-head"><div><div class="eyebrow">PROGRESS LOG</div><h1>Lịch sử tập luyện</h1><p>Dữ liệu lưu tại trình duyệt này. Xóa dữ liệu trang web sẽ xóa lịch sử.</p></div></div>'+
      (list.length?'<div class="card">'+html+'</div>':'<div class="card"><h2>Chưa có buổi tập</h2><p class="muted mt12">Sau khi hoàn thành buổi đầu tiên, lịch sử và điều chỉnh rep sẽ xuất hiện ở đây.</p></div>')+
      '<div class="inline-note mt20">Để sao lưu, hãy dùng chức năng Xuất dữ liệu JSON bên dưới. Dữ liệu không tự đồng bộ giữa iPhone và máy tính.</div>'+
      '<button class="secondary-btn wide" data-action="export">Xuất lịch sử và cài đặt (JSON)</button>'+
      '<label class="secondary-btn wide mt12" style="display:flex;cursor:pointer">Nhập dữ liệu đã sao lưu<input type="file" id="importFile" accept="application/json,.json" style="display:none"></label>';
  }
  function goHome(){page="home";render();window.scrollTo(0,0);}
  function startWorkout(mode,day){
    if(S.active){page="workout";render();return;}
    if(!TEMPLATES[mode])return;
    const a={mode:mode,day:day,index:0,setIndex:0,phase:"ready",records:[],startedAt:stamp(),swaps:{},input:null,effort:"medium",remaining:0,deadline:0,restTotal:0};
    S.active=a;initSet(a);persist();page="workout";render();window.scrollTo(0,0);
  }
  function initSet(a){const slot=getTemplate(a.mode)[a.index];a.input=getTarget(a.mode,slot);a.effort="medium";a.remaining=workSeconds(a,slot);a.phase="ready";a.deadline=0;}
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
    const a=S.active;if(!a)return;if(!["ready","paused","work"].includes(a.phase))return;
    a.phase="ready";a.remaining=workSeconds(a,getTemplate(a.mode)[a.index]);a.deadline=0;persist();render();
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
    const slot=getTemplate(a.mode)[a.index],ex=getExercise(a.mode,slot,a);
    const raw=Number(a.input),target=getTarget(a.mode,slot),actual=Number.isFinite(raw)?Math.max(0,Math.min(999,Math.round(raw))):target;
    a.records.push({slot:slot[0],exerciseId:ex.id,set:a.setIndex+1,target:target,actual:actual,metric:slot[5],effort:a.effort,auto:!!auto});
    if(a.index===getTemplate(a.mode).length-1 && a.setIndex===slot[3]-1){finishWorkout();return;}
    a.phase="rest";a.restTotal=minmax(S.settings.restSec,15,300);a.deadline=Date.now()+a.restTotal*1000;a.remaining=a.restTotal;lastRestBeep=false;persist();render();
    if(auto)toast("Hết giờ hiệp · Bắt đầu nghỉ");
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
  function updateTargets(a){
    const records=a.records||[];
    const totalTarget=records.reduce((v,r)=>v+r.target,0);
    const totalActual=records.reduce((v,r)=>v+r.actual,0);
    const overall=totalTarget?totalActual/totalTarget:1;
    const grouped={};records.forEach(r=>{(grouped[r.slot]||(grouped[r.slot]=[])).push(r);});
    let changes=[];
    Object.keys(grouped).forEach(slotKey=>{
      const rs=grouped[slotKey],slot=getTemplate(a.mode).find(x=>x[0]===slotKey);
      if(!slot)return;
      const expected=rs.reduce((n,r)=>n+r.target,0);
      const actual=rs.reduce((n,r)=>n+r.actual,0);
      if(!expected)return;
      const local=actual/expected,combined=local*.8+overall*.2;
      const hard=rs.filter(r=>r.effort==="hard").length/rs.length;
      const easy=rs.filter(r=>r.effort==="easy").length/rs.length;
      const before=getTarget(a.mode,slot),isSeconds=slot[5]==="seconds";
      let next=before,reason="";
      if(combined<.74){next=before-(isSeconds?10:2);reason="Số lần thực tế thấp hơn mục tiêu";}
      else if(combined<.90){next=before-(isSeconds?5:1);reason="Giảm nhẹ để phù hợp khả năng";}
      else if(combined>1.14&&hard<.5){next=before+(isSeconds?5:1);reason="Hoàn thành vượt mục tiêu, tăng nhẹ";}
      else if(combined>=1.06&&easy>.7){next=before+(isSeconds?5:1);reason="Bạn đánh giá bài khá dễ";}
      if(a.mode==="power"&&!isSeconds&&before>=6&&next>before){next=before;reason="Giữ ít lần để tập nhanh; có thể tăng lực dây nhẹ";}
      const cap=isSeconds?120:(a.mode==="power"?16:25),floor=isSeconds?15:3;
      next=Math.round(minmax(next,floor,cap));
      if(next!==before){
        S.targets[slotId(a.mode,slot)]=next;
        changes.push({name:getExercise(a.mode,slot,a).en,previous:before,next:next,metric:slot[5],reason:reason});
      }
    });
    return {changes:changes,overall:overall,totalActual:totalActual};
  }
  function finishWorkout(){
    const a=S.active;if(!a)return;
    const upd=updateTargets(a);
    const minutes=Math.max(1,Math.round((Date.now()-new Date(a.startedAt).getTime())/60000));
    const log={date:stamp(),mode:a.mode,day:a.day,records:a.records.slice(),minutes:minutes,ratio:Math.round(upd.overall*100),volume:upd.totalActual,adjustments:upd.changes};
    S.logs.push(log);if(S.logs.length>250)S.logs=S.logs.slice(-250);
    lastSummary=log;S.active=null;persist();page="summary";render();alertEnd();window.scrollTo(0,0);
  }
  function openSwap(){
    const a=S.active;if(!a||a.phase==="rest")return;
    if(a.setIndex>0){toast("Đổi bài trước hiệp đầu tiên của động tác");return;}
    const slot=getTemplate(a.mode)[a.index],ids=[slot[1],...slot[2]].slice(0,4),selected=getExercise(a.mode,slot,a).id;
    document.getElementById("swapList").innerHTML=ids.map(id=>{
      const ex=EX[id];return '<button class="swap-option '+(id===selected?"selected":"")+'" data-action="choose-swap" data-id="'+id+'"><span class="swap-radio">'+(id===selected?"●":"○")+'</span><span><strong>'+esc(ex.en)+'</strong><p>'+esc(ex.vi)+' · '+esc(ex.need)+'</p><p>'+esc(ex.steps[0])+'</p></span></button>';
    }).join("");
    document.getElementById("swapDialog").showModal();
  }
  function chooseSwap(id){
    const a=S.active;if(!a)return;
    const slot=getTemplate(a.mode)[a.index];
    if(![slot[1],...slot[2]].includes(id))return;
    a.swaps[slot[0]]=id;S.swaps[slotId(a.mode,slot)]=id;initSet(a);persist();
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
    const blob=new Blob([JSON.stringify({app:"BandFit",version:1,exportedAt:stamp(),data:{onboarded:S.onboarded,schedule:S.schedule,settings:S.settings,logs:S.logs,targets:S.targets,swaps:S.swaps}},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="bandfit-backup-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }
  async function importData(file){
    try{
      const obj=JSON.parse(await file.text());
      if(!obj||obj.app!=="BandFit"||!obj.data||!Array.isArray(obj.data.logs)||!Array.isArray(obj.data.schedule))throw Error("Sai định dạng bản sao lưu BandFit");
      if(!confirm("Nhập dữ liệu sẽ thay lịch sử, số rep đã học và cài đặt hiện tại. Tiếp tục?"))return;
      const x=obj.data;
      S={onboarded:!!x.onboarded,schedule:sortDays(x.schedule.filter(d=>ORDER.includes(d))).slice(0,4),settings:Object.assign(defaultData().settings,x.settings||{}),logs:x.logs.slice(-250),targets:x.targets||{},swaps:x.swaps||{},active:null};
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
    else if(action==="finish-set")finishSet(false);
    else if(action==="skip-rest")advance();
    else if(action==="add-rest"){
      const a=S.active;if(a&&a.phase==="rest"){let now=Date.now();a.deadline=Math.max(now,a.deadline)+15000;a.restTotal=Math.max(15,Math.ceil((a.deadline-now)/1000));lastRestBeep=false;persist();refreshTickDisplay();toast("Đã cộng thêm 15 giây");}
    }else if(action==="swap")openSwap();
    else if(action==="choose-swap")chooseSwap(target.dataset.id);
    else if(action==="effort"){const a=S.active;if(a){a.effort=target.dataset.value;persist();document.querySelectorAll(".effort-choice").forEach(b=>b.classList.toggle("selected",b.dataset.value===a.effort));}}
    else if(action==="skip-exercise")skipExercise();
    else if(action==="exit-workout"){page="home";render();}
    else if(action==="go-home")goHome();
    else if(action==="filter"){libraryFilter=target.dataset.cat;detailId=null;render();}
    else if(action==="toggle-detail"){detailId=detailId===target.dataset.id?null:target.dataset.id;document.getElementById("libraryList").innerHTML=renderLibraryList();}
    else if(action==="export")exportData();
  });
  document.getElementById("brandBtn").addEventListener("click",goHome);
  document.getElementById("settingsBtn").addEventListener("click",()=>{
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
    if(e.target.id==="repInput"&&S.active){S.active.input=minmax(e.target.value,0,999);persist();}
    if(e.target.id==="searchExercise"){libraryQuery=e.target.value;detailId=null;document.getElementById("libraryList").innerHTML=renderLibraryList();}
  });
  app.addEventListener("change",e=>{if(e.target.id==="importFile"&&e.target.files&&e.target.files[0])importData(e.target.files[0]);});
  app.addEventListener("keydown",e=>{const t=e.target.closest('[data-action="toggle-detail"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();t.click();}});
  window.addEventListener("online",()=>{document.getElementById("onlineStatus").classList.remove("offline");});
  window.addEventListener("offline",()=>{document.getElementById("onlineStatus").classList.add("offline");});
  if(!navigator.onLine)document.getElementById("onlineStatus").classList.add("offline");
  if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
  timerInterval=setInterval(tick,250);
  render();
})();
