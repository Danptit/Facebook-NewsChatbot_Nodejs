// # SimpleServer
// A simple chat bot server
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var router = express();

var app = express(); // tao 1 server express
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);
var request = require("request");

var TOKEN = "EAAC02puoZBOIBAAIyY4Xqb0y7GE5gaviauL3lpxsCgQy7GZC26JZBeGIBZBU6AiTvekaWBWZBPZAC1CSWezqUC9p5dkHWfTnZCxZAZCQPAs7WEZBU3Da7Uo9DfCWdFfLfcW8v8sLzOWBbJYMjKcTwDX8CaQlk7iEj55NeqKgDbb9A0othZASO7NV9uF"
app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

//  create Webhook ( xac thuc sms, verify ng dung)
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});-

// Xử lý khi có người nhắn tin cho bot
// 
app.post('/webhook', function (req, res) {

  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // If users send text!!!
        let c = message.message.text
        if (/Hi/.test(c)|| /hào/.test(c)||/hi/.test(c)) {
          seen(senderId);
          sendMessage(senderId, "Chào bác, em là bot  tin tức :)");
          typingon(senderId);
          guiAnh(senderId,"");
          setTimeout(function(){guiAnh();  }, 2000);
          sendMessage(senderId, "Bác muốn đọc tin về thể thao, quân sự hay công nghệ ạ ?:)");
        }
         else if (/hể thao/.test(c)) {
          seen(senderId);
          typingon(senderId);
          setTimeout(function(){typingon();  }, 2000);
          sendMessage(senderId, "Tin tức thể thao nổi bật đây bác ;) ");
          thethao(senderId,"");
      
        }
         else if (/uân sự/.test(c)){
          seen(senderId);
          typingon(senderId);
          sendMessage(senderId, "Tin tức quân sự nổi bật đây bác ;) ");
          quansu(senderId, "");
        }
        else if(/page/.test(c)){
          seen(senderId);
          typingon(senderId);
          setTimeout(function(){typingon();  }, 2000);
          sendMessage(senderId,"Dạ, anh ý đang bận đi báo cáo AI ạ :(");
          
        }
        else if(/ông nghệ/.test(c)){
          seen(senderId);
          typingon(senderId);
          sendMessage(senderId, "Tin tức công nghệ nổi bật đây bác ;) ");
          tech(senderId,"");
        }
         else if(/điện thoại/.test(c)){
          seen(senderId);
          typingon(senderId);
          sendMessage(senderId, "Bác gọi vào số này nhé: 0971 739 971 :)");
        }
        else if(/thank/.test(c)|| /ảm ơn/.test(c)){
          seen(senderId);
          typingon(senderId);
          setTimeout(function(){typingon();  }, 2000);
          sendMessage(senderId, "em cảm ơn bác, muốn đọc tin tức thì cứ ib em nhaaaa ;)");
          sendMessage(senderId, "Yêu nạ  <3 <3 <3");
        }
        else if(/nhắn tin/.test(c) || /tin nhắn/.test(c)){
          seen(senderId);
          typingon(senderId);
          setTimeout(function(){typingon();  }, 2000);
          sendMessage(senderId, "Dạ, đúng rùi ạ, bác muốn đọc tin tức gì ạ ?");
          
        }
        else {
          setTimeout(function(){seen();  }, 3000);
          seen(senderId);
          
          typingon(senderId);
          setTimeout(function(){typingon();  }, 2000);
          sendMessage(senderId, "Bot còn trẻ người non dạ, tạm thời chưa hiểu thým nói gì :(");
          
          
        }
       

      }
    }
  }

  res.status(200).send("OK");
});



// Gửi anh cho ng dung khi ho nhan tin
function guiAnh(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      
      message: {
        "attachment": {
          "type": "image",
          "payload": {
            "url": "https://3c2ba678857e073c9506-9b92ffc51ccdc874f7e956dfcfbdbfba.ssl.cf5.rackcdn.com/spark/Non-Eidiko%20built%20apps%20/gupshupproxybot/gupshup_proxy.png",
            "is_reusable": true
          }
        }
      },
    }
  }, (e, r, b) => {
    if (e) console.log(e + '', '------e---------')
    if (r) console.log(r.body, '------r---------')
    // console.log(b, '------b---------')
  });
}

//function gui generic template (link, carouseel, button)
function sendGT(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Welcome!",
              "image_url": "https://hungmobile.vn/images/redmi-note-5-pro(03)_5ab45eb93d730_23_03_2018_08_56_09.jpg",
              "subtitle": "We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://hungmobile.vn",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://facebook.com/"
              },
              "buttons": [{
                "type": "web_url",
                "url": "https://google.com",
                "title": "View Website"
              }, {
                "type": "postback",
                "title": "Start Chatting",
                "payload": "details:12345"
              }]
            }]
          }
        }
      },
    }
  }, (e, r, b) => {
    if (e) console.log(e + '', '------2e---------')
    if (r) console.log(r.body, '------r2---------')
    // console.log(b, '------b---------')
  });
}



// quan su 

function quansu(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      
      message: {
        "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title":"Tin nổi bật",
              "image_url":"https://i-vnexpress.vnecdn.net/2018/05/22/F-35I-5350-1526975081.jpg",
              "subtitle":"Tin quân sự ",
              "default_action": {
                "type": "web_url",
                "url": "https://vnexpress.net/tin-tuc/the-gioi/quan-su",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://vnexpress.net/tin-tuc/the-gioi/quan-su/israel-lan-dau-dua-tiem-kich-tang-hinh-f-35-tham-chien-o-syria-3753036.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://vnexpress.net/tin-tuc/the-gioi/quan-su",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 1",
                  "payload":"details:12345"
                }              
              ]      
            },
            {
              "title":"Tin nổi bật",
              "image_url":"https://images01.military.com/sites/default/files/styles/thumbnail_tile/public/2018-05/black-hawk-fort-bliss-3000.jpg?itok=g4nkigUf",
              "subtitle":"Tin quân sự",
              "default_action": {
                "type": "web_url",
                "url": "https://www.military.com/",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://www.military.com/daily-news/2018/05/21/army-studies-flight-patterns-after-black-hawk-drops-ammo-can-school.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.military.com/",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 2",
                  "payload":"details:12345"
                }              
              ]      
            },
            {
              "title":"Tin nổi bật",
              "image_url":"https://sofrep.com/wp-content/uploads/2018/05/wk0NiP1dF8S9uSnPX7vn0QgBTR19vAci-905x558.jpg",
              "subtitle":"Tin quân sự",
              "default_action": {
                "type": "web_url",
                "url": "https://sofrep.com/",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://sofrep.com/103489/russia-and-the-syrian-regime-looking-for-a-political-solution-to-the-regional-conflict/"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://sofrep.com/",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 3",
                  "payload":"details:12345"
                }              
              ]      
            }
          ]
        }
      }
      },
    }
  }, (e, r, b) => {
    if (e) console.log(e + '', '------e---------')
    if (r) console.log(r.body, '------r---------')
    // console.log(b, '------b---------')
  });
}

// the thao
function thethao(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      
      message: {
        "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title":"Tin nổi bật",
              "image_url":"https://znews-photo-td.zadn.vn/w660/Uploaded/pgi_ubnvgunau/2018_05_22/mohamedsalah6.jpg",
              "subtitle":"Tin thể thao ",
              "default_action": {
                "type": "web_url",
                "url": "https://news.zing.vn/the-thao.html",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://news.zing.vn/cuu-hlv-tay-ban-nha-salah-cung-khong-du-trinh-choi-cho-real-post844937.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://news.zing.vn/the-thao.html",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 1",
                  "payload":"details:12345"
                }              
              ]      
            },
            {
              "title":"Tin nổi bật",
              "image_url":"https://znews-photo-td.zadn.vn/w660/Uploaded/ofh_huqfztmf/2018_05_22/icardimessi.jpg",
              "subtitle":"Tin thể thao ",
              "default_action": {
                "type": "web_url",
                "url": "https://news.zing.vn/cong-nghe.html",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://news.zing.vn/quyen-luc-cua-messi-thao-tung-dt-argentina-post844672.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://news.zing.vn/the-thao.html",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 2",
                  "payload":"details:12345"
                }              
              ]      
            },
            {
              "title":"Tin nổi bật",
              "image_url":"https://znews-photo-td.zadn.vn/w1024/Uploaded/pgi_ubnvgunau/2018_05_22/cristianoronaldo.jpg",
              "subtitle":"Tin thể thao",
              "default_action": {
                "type": "web_url",
                "url": "https://news.zing.vn/the-thao.html",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://news.zing.vn/xa-stress-ben-ban-gai-ronaldo-san-sang-cho-chung-ket-champions-league-post844925.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://news.zing.vn/the-thao.html",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 3",
                  "payload":"details:12345"
                }              
              ]      
            }
          ]
        }
      }
      },
    }
  }, (e, r, b) => {
    if (e) console.log(e + '', '------e---------')
    if (r) console.log(r.body, '------r---------')
    // console.log(b, '------b---------')
  });
}

// tech
function tech(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      
      message: {
        "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title":"Tin nổi bật",
              "image_url":"https://images.idgesg.net/images/article/2018/04/cw_computerworld_best_of_the_best_android_apps_landing_page_background_image_by_thinkstock-100756329-large.jpg",
              "subtitle":"Tin công nghệ ",
              "default_action": {
                "type": "web_url",
                "url": "https://www.computerworld.com/",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://www.computerworld.com/article/3268630/android/android-apps-best-of-the-best.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.computerworld.com/",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 1",
                  "payload":"details:12345"
                }              
              ]      
            },
            {
              "title":"Tin nổi bật",
              "image_url":"https://znews-photo-td.zadn.vn/w660/Uploaded/Aohuouk/2018_05_22/5afe142ce988ef49008b4e85960720.jpg",
              "subtitle":"Tin công nghệ ",
              "default_action": {
                "type": "web_url",
                "url": "https://news.zing.vn/cong-nghe.html",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://news.zing.vn/startup-quit-gan-22000-chiec-headphone-du-nhan-von-3-trieu-usd-post844906.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://news.zing.vn/cong-nghe.html",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 2",
                  "payload":"details:12345"
                }              
              ]      
            },
            {
              "title":"Tin nổi bật",
              "image_url":"https://znews-photo-td.zadn.vn/w660/Uploaded/lce_uxlcq/2018_05_21/L29RX_DTGT_1.jpg",
              "subtitle":"Tin công nghệ",
              "default_action": {
                "type": "web_url",
                "url": "https://news.zing.vn/cong-nghe.html",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://news.zing.vn/galaxy-s-light-luxury-ra-mat-snapdragon-660-camera-16-mp-post844617.html"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://news.zing.vn/cong-nghe.html",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Option 3",
                  "payload":"details:12345"
                }              
              ]      
            }
          ]
        }
      }
      },
    }
  }, (e, r, b) => {
    if (e) console.log(e + '', '------e---------')
    if (r) console.log(r.body, '------r---------')
    // console.log(b, '------b---------')
  });
}
//quick rep
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
        
      },
      
      message: {
        text: message
      },
    }
  });
}
//mark_seen
function seen(senderId) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
        
      },
      sender_action:"mark_seen",
    
    }
  });
}

//typing on
function typingon(senderId) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
        
      },
      sender_action:"typing_on",
    
    }
  });
}


//send message attachment
function sendMessageAttachment(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Welcome!",
              "image_url": "w",
              "subtitle": "We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://google.com",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://google.com/"
              },
              "buttons": [{
                "type": "web_url",
                "url": "https://google.com",
                "title": "View Website"
              }, {
                "type": "postback",
                "title": "Start Chatting",
                "payload": "DEVELOPER_DEFINED_PAYLOAD"
              }]
            }]
          }
        }
      }
    }
  });
}

app.set('port', process.env.PORT || 8080);

server.listen(app.get('port'), function () {
  console.log("Chat bot server listening");
});
// khi ma minh muon them 1 url vao de ma click nora thi phai define vao while list cua facebook nhu ben duoi
// curl -X POST -H "Content-Type: application/json" -d '{
//   "setting_type" : "domain_whitelisting",
//   "whitelisted_domains" : ["tendomain"],
//   "domain_action_type": "add"
// }' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=TOKENCUAMINH"