// -----------------------------------------------------------------------------
//署名を検証する
const crypto = require("crypto");

const channelSecret = "{Channel Secret}"; // Channel secret string
const body = "body"; // Request body string
const signature = crypto
  .createHmac("SHA256", channelSecret)
  .update(body)
  .digest("base64");
// Compare X-Line-Signature request header and the signature

// -----------------------------------------------------------------------------
// モジュールのインポート
const express = require("express");
const app = express();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
  channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
app.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + "/"));

const bot = new line.Client(line_config);

// ルーター設定
app.post("/webhook", line.middleware(line_config), (req, res, next) => {
  // 先行してLINE側にステータスコード200でレスポンスする。
  res.sendStatus(200);
  // すべてのイベント処理のプロミスを格納する配列。
  let events_processed = [];
  // イベントオブジェクトを順次処理。
  req.body.events.forEach(event => {
    const request = require("request");
    let userId = event.source.userId;
    var options = {
      url: "https://api.line.me/v2/bot/profile/" + userId,
      headers: {
        Authorization: "Bearer {Access TOKEN}"
      },
      json: true
    };
    request.get(options, (req, res, next) => {
      let userName = res.body.displayName;
      console.log(userName);
      console.log(event.message.text);
      if (event.type == "message" && event.message.type == "text") {
        // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
        if (event.message.text.match("名前")) {
          // replyMessage()で返信し、そのプロミスをevents_processedに追加。
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: userName + "チャンだよね😆🎵" + userName + "チャンからメッセージが来てとっても嬉しいよ😏✨\n今日もいっぱい頑張れそうだ💪"
            })
          );
        } else if (event.message.text.match("行ってきた")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: "そうなんだ〜♪実はオレも昨日ディズニーランドに行って来たんだよ🐭🏰\nいつか" + userName + "チャンと一緒に行きたいな😆🚗"
            })
          );
        } else if (event.message.text.match("おはよう")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: userName +  "チャン、お早う😃☀️\n朝から元気そうで何より‼️\n元気と言えば、オジサン昨日飲みすぎちゃったよ(^^;;......なんて言ってちゃダメだね😁💦\n次に" + userName + "チャンに会えるのを楽しみに💑今日も頑張って仕事に行ってきます💪✨"
            })
          );
        } else if (event.message.text.match("こんにちは")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text:
                userName + "チャン、コンニチハ😆🎵\n今日もお仕事頑張ってね‼️そういえば最近近所にできたカフェに行ってきたよ😄\n結構いい雰囲気だったから今度" + userName + "チャンを連れて行きたいな〜なーんちゃって😅じゃあ今から元気にコーヒー淹れてきます☕️✨"
            })
          );
        } else if (event.message.text.match("ハゲ")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: userName + "チャン‼️女の子👯‍♀️なんだからそんな言葉使っちゃダメだぞ☝️❕\nでもそんな" + userName + "チャンもかわいいな〜😚なーんちゃって😝\nじゃあオジサンはお仕事行ってくるよ💨お互い頑張ろう💪エイ、エイ、オー‼️"
            })
          );
        } else if (event.message.text.match("綺麗")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: userName + "の方が綺麗だよ😏"
            })
          );
        } else if (event.message.text.match("おじさん")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: "おじさん❓オレのことかな❓😀\nオレのこと呼んでくれるだなんて" + userName + "チャンもオレのこと考えてくれてたんだね👍✨"
            })
          );
        } else if (event.message.text.match("キモい")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: "まったく、" + userName + "チャンって照れ屋さんなんだね🤚‼️照れ屋さんと言えば、" + userName + "チャンからメッセージがきて嬉しくて照れてしまったよ♪そうだ、今度近所の映画館で恋愛映画👩‍❤️‍👩上映するみたいだから一緒に行かない❓恋人同士みたいだね😝なーんちゃって♫じゃあ、おじさん今から仕事頑張ってきます💪✨"
            })
          );
        } else if (event.message.text.match("script")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: "こらっ❗️" + userName + "チャン‼️そんな文字列を入れたらオジサンおかしくなっちゃうよ😨" + userName + "チャンにqq・w。え、rmtnyぶゔぃcおxzp"
            })
          );
        } else if (event.message.text.match("ただいま")) {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: userName + "チャンお疲れ様‼️✨最近チョー寒いね〜😱\n暖かくして寝るんだよ😁一緒に寝ちゃう❓なんちゃって😁❕" + userName + "チャンにとって明日もいい1日になりますように✨"
            })
          );
        } else {
          events_processed.push(
            bot.replyMessage(event.replyToken, {
              type: "text",
              text: "今日あったいいこと🎶" + userName + "チャンからメッセージがあったこと😁✨"
            })
          );
        }
      }
      if (event.type == "message" && event.message.type == "image") {
        events_processed.push(
          bot.replyMessage(event.replyToken, {
            type: "text",
            text: "コレは" + userName + "チャンの写真かな❓とってもグッドだね👍✨\n写真と言えば、最近免許証の更新をしたんだけど、今度" + userName + "チャンと一緒にドライブ🚗に行きたいなあ😆なんちゃって💦\n今度いつ空いてるかな❓"
          })
        );
      }
    });
  });

  // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
  Promise.all(events_processed).then(response => {
    //console.log(`${response.length} event(s) processed.`);
  });
});
