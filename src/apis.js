const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const request = require("request");

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

function sendTemplate(sender_psid, title, imgUrl, buttons) {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: title,
            subtitle: "Tap a button to answer.",
            image_url: imgUrl,
            buttons: buttons
          }
        ]
      }
    }
  };
  callSendAPI(sender_psid, response);
}
function sendScors(toID) {
  let qr = {
    // "text": "请对我上周的表现打分How was your helper last week?",

    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "请对我上周的表现打分",
            subtitle: "How was your helper last week?",
            image_url: "https://yosion.oss-cn-beijing.aliyuncs.com/pw2.png"
            // "buttons": buttons,
          }
        ]
      }
    },

    quick_replies: [
      {
        content_type: "text",
        title: "1",
        payload: "<POSTBACK_PAYLOAD>"
      },
      {
        content_type: "text",
        title: "2",
        payload: "<POSTBACK_PAYLOAD>"
      },
      {
        content_type: "text",
        title: "3",
        payload: "<POSTBACK_PAYLOAD>"
      },
      {
        content_type: "text",
        title: "4",
        payload: "<POSTBACK_PAYLOAD>"
      },
      {
        content_type: "text",
        title: "5",
        payload: "<POSTBACK_PAYLOAD>"
      }
    ]
  };
  callSendAPI(toID, qr);
}

module.exports.callSendAPI = callSendAPI;
module.exports.sendScors = sendScors;

module.exports.sendTemplate = sendTemplate;
