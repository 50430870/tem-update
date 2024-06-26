/*
活动名称：盖楼有礼 · 超级无线
活动链接：https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=<活动id>
环境变量：jd_wxBuildActivity_activityId // 活动id
         jd_wxBuildActivity_openCard // 是否开卡，默认不开卡

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('盖楼有礼（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(lliII1 => {
    cookiesArr.push(jdCookieNode[lliII1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IlIiIlI => IlIiIlI.cookie)].filter(iII11il1 => !!iII11il1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  jd_wxBuildActivity_activityId = process.env.jd_wxBuildActivity_activityId ? process.env.jd_wxBuildActivity_activityId : "",
  openCard = process.env.jd_wxBuildActivity_openCard === "true" ? true : false;
const defaultWordsArr = ["%E4%B8%8D%E9%94%99%EF%BC%8C%E6%88%91%E6%9D%A5%E4%BA%86", "%E6%88%91%E4%B9%9F%E5%8F%82%E5%8A%A0%E4%B8%8B%E6%B4%BB%E5%8A%A8%E8%AF%95%E8%AF%95%EF%BC%81", "6666%EF%BC%8C%E8%80%81%E9%93%81", "%E5%B8%8C%E6%9C%9B%E4%B8%AD%E5%A5%96%E5%95%8A%EF%BC%81", "%E6%88%91%E8%A6%81%E5%86%B2%E9%A1%B6%E5%95%8A%EF%BC%81"];
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = jd_wxBuildActivity_activityId;
  console.log("活动入口：https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId);
  for (let l11Ili1 = 0; l11Ili1 < cookiesArr.length; l11Ili1++) {
    cookie = cookiesArr[l11Ili1];
    originCookie = cookiesArr[l11Ili1];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l11Ili1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      await getUA();
      await run();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let il1lilll = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + il1lilll);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(i11ll11 => $.logErr(i11ll11)).finally(() => $.done());
async function run() {
  try {
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(originCookie, "https://lzkj-isv.isvjd.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    if ($.index == 1) await takePostRequest("getSimpleActInfoVo");
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await $.wait(1000);
    await takePostRequest("accessLogWithAD");
    await $.wait(500);
    await takePostRequest("getActMemberInfo");
    await $.wait(500);
    if (!$.openCard && openCard) {
      $.shopactivityId = "";
      $.joinVenderId = $.venderId;
      await getshopactivityId();
      for (let liIiI1iI = 0; liIiI1iI < Array(5).length; liIiI1iI++) {
        if (liIiI1iI > 0) console.log("第" + liIiI1iI + "次 重新开卡");
        await joinShop();
        await $.wait(1000);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
      await takePostRequest("getActMemberInfo");
      await $.wait(1000);
    }
    await takePostRequest("activityContent");
    if ($.index == 1) {
      await $.wait(500);
      await takePostRequest("getShopInfoVO");
      var i1iiiIil = "";
      for (let lIii1lIl = 0; lIii1lIl < $.drawInfos.length; lIii1lIl++) {
        lIii1lIl != $.drawInfos.length - 1 ? i1iiiIil += $.drawInfos[lIii1lIl].name + "，" : i1iiiIil += "" + $.drawInfos[lIii1lIl].name;
      }
      console.log("店铺名称：" + ($.shopName || "未知") + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + i1iiiIil + "\n");
    }
    if ($.hotFlag) return;
    $.buildTimes = 0;
    $.builtTimes = 0;
    $.retryTimes = 0;
    for (let iiii1III = 0; iiii1III < 20; iiii1III++) {
      if ($.words.length != 0) {
        let Illl1lIi = Math.floor(Math.random() * $.words.length + 1) - 1;
        $.content = encodeURIComponent($.words[Illl1lIi].content);
      } else {
        let illliii = Math.floor(Math.random() * defaultWordsArr.length + 1) - 1;
        $.content = defaultWordsArr[illliii];
      }
      await takePostRequest("publish");
      if ($.builtTimes >= $.maxBuiltTimes) break;
      if ($.retryTimes >= 5 && $.buildTimes >= 5) {
        console.log("今日盖楼次数可能已经达到上限~");
        return;
      }
      await $.wait(4000);
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
  } catch (Il11Ii1) {
    console.log(Il11Ii1);
  }
}
async function takePostRequest(I11i1liI) {
  if ($.outFlag) return;
  let Iil1lII = "https://lzkj-isv.isvjd.com",
    I1il1I1l = "",
    iI1iII1i = "POST";
  switch (I11i1liI) {
    case "getMyPing":
      url = Iil1lII + "/customer/getMyPing";
      I1il1I1l = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      url = Iil1lII + "/customer/getSimpleActInfoVo";
      I1il1I1l = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = Iil1lII + "/wxCommonInfo/getActMemberInfo";
      I1il1I1l = "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = Iil1lII + "/common/accessLogWithAD";
      let I11ilIIl = "https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId;
      I1il1I1l = "venderId=" + ($.shopId || $.venderId || "") + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(I11ilIIl) + "&subType=app&adSource=";
      break;
    case "activityContent":
      url = Iil1lII + "/wxBuildActivity/activityContent";
      I1il1I1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "follow":
      url = Iil1lII + "/wxBuildActivity/follow";
      I1il1I1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "publish":
      url = Iil1lII + "/wxBuildActivity/publish";
      I1il1I1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&content=" + $.content;
      break;
    case "getShopInfoVO":
      url = Iil1lII + "/wxActionCommon/getShopInfoVO";
      I1il1I1l = "userId=" + $.venderId;
      break;
    case "getUserInfo":
      url = Iil1lII + "/wxActionCommon/getUserInfo";
      I1il1I1l = "pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I11i1liI);
  }
  let ililIil = getPostRequest(url, I1il1I1l, iI1iII1i);
  return new Promise(async i1ill1I => {
    $.post(ililIil, (IIlIIli1, i11iiii1, iiiI1iI) => {
      try {
        setActivityCookie(i11iiii1);
        if (IIlIIli1) {
          if (i11iiii1 && typeof i11iiii1.statusCode != "undefined") {
            if (i11iiii1.statusCode == 493) {
              console.log(I11i1liI + " 此ip已被限制，请过10分钟后再执行脚本");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(IIlIIli1, IIlIIli1));
          console.log(I11i1liI + " API请求失败，请检查网路重试");
        } else dealReturn(I11i1liI, iiiI1iI);
      } catch (iliIIlI) {
        console.log(iliIIlI, i11iiii1);
      } finally {
        i1ill1I();
      }
    });
  });
}
async function dealReturn(IilIiII, iliIi1Ii) {
  let I11i1li1 = "";
  try {
    (IilIiII != "accessLogWithAD" || IilIiII != "drawContent") && iliIi1Ii && (I11i1li1 = JSON.parse(iliIi1Ii));
  } catch (illill1i) {
    console.log(IilIiII + " 执行任务异常");
    console.log(illill1i);
    $.runFalag = false;
  }
  try {
    switch (IilIiII) {
      case "getMyPing":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            if (I11i1li1.data && typeof I11i1li1.data.secretPin != "undefined") $.Pin = I11i1li1.data.secretPin;
            if (I11i1li1.data && typeof I11i1li1.data.nickname != "undefined") $.nickname = I11i1li1.data.nickname;
          } else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else {
          console.log(IilIiII + " " + iliIi1Ii);
        }
        break;
      case "getSimpleActInfoVo":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            if (typeof I11i1li1.data.shopId != "undefined") $.shopId = I11i1li1.data.shopId;
            if (typeof I11i1li1.data.venderId != "undefined") $.venderId = I11i1li1.data.venderId;
            $.activityType = I11i1li1.data.activityType;
          } else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "follow":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true && I11i1li1.count === 0) console.log("关注成功");else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "getActMemberInfo":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            $.openCard = I11i1li1.data.openCard || false;
          } else {
            if (I11i1li1.errorMessage) {
              console.log(IilIiII + " " + (I11i1li1.errorMessage || ""));
            } else console.log(IilIiII + " " + iliIi1Ii);
          }
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "getUserInfo":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            if (I11i1li1.data && typeof I11i1li1.data.yunMidImageUrl != "undefined") $.attrTouXiang = I11i1li1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = I11i1li1.data.nickname || "";
          } else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "activityContent":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            $.drawInfos = I11i1li1.data.drawInfos || [];
            $.canJoin = I11i1li1.data.canJoin || false;
            $.needFollow = I11i1li1.data.needFollow || false;
            $.hasFollow = I11i1li1.data.hasFollow || false;
            $.endTime = I11i1li1.data.endTime || "";
            $.startTime = I11i1li1.data.startTime || "";
            $.title = I11i1li1.data.title || "";
            $.currentFloors = I11i1li1.data.currentFloors || 0;
            $.totalJoinMans = I11i1li1.data.totalJoinMans || 0;
            $.rule = I11i1li1.data.rule || "";
            $.maxBuiltTimes = I11i1li1.data.rule.match(/每人每天最多可盖楼(\d+)次/);
            $.words = I11i1li1.data.words || [];
            $.maxBuiltTimes ? $.maxBuiltTimes = $.maxBuiltTimes[1] : $.maxBuiltTimes = 2;
          } else {
            if (I11i1li1.errorMessage) {
              if (I11i1li1.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(IilIiII + " " + (I11i1li1.errorMessage || ""));
            } else console.log(IilIiII + " " + iliIi1Ii);
          }
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "getShopInfoVO":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.data) $.shopName = I11i1li1.data.shopName;else I11i1li1.errorMessage ? console.log("" + (I11i1li1.errorMessage || "")) : console.log("" + iliIi1Ii);
        } else console.log("" + iliIi1Ii);
        break;
      case "publish":
        if (typeof I11i1li1 == "object") {
          $.buildTimes++;
          if (I11i1li1.result && I11i1li1.result === true) {
            if (I11i1li1.data) {
              $.builtTimes++;
              process.stdout.write("🏛️ " + I11i1li1.data.currentFloors + "层 ➜ ");
              if (I11i1li1.data.drawResult.drawInfo) {
                let ii1I1i11 = I11i1li1.data.drawResult.drawInfo;
                switch (ii1I1i11.type) {
                  case 6:
                    console.log("🎉 " + ii1I1i11.name + " 🐶");
                    break;
                  case 7:
                    const i11iilI = I11i1li1.data.drawResult.addressId;
                    prizeName = ii1I1i11.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    console.log("参考价值：" + ii1I1i11.priceInfo + "（元）");
                    if (ii1I1i11.showImage) console.log("预览图片：" + ii1I1i11.showImage);
                    let ilillIiI = await wxSavePrize("https://lzkj-isv.isvjd.com", cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, i11iilI);
                    if (ilillIiI) $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId));else {
                      $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId));
                    }
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + ii1I1i11.name + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + ii1I1i11.name + " 🎁");
                    break;
                  case 16:
                    console.log("🎉 " + ii1I1i11.priceInfo + " 🧧");
                    break;
                  default:
                    ii1I1i11.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + ii1I1i11.name);
                    break;
                }
              } else console.log("💨 空气");
            } else console.log(JSON.stringify(I11i1li1));
          } else {
            if (I11i1li1.errorMessage) {
              if (I11i1li1.errorMessage = "哎呀活动火爆，请稍后再试！") {
                $.retryTimes++;
              } else console.log("" + (I11i1li1.errorMessage || ""));
            } else {
              console.log("抽了个寂寞，京东接口返回内容为空~");
            }
          }
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IilIiII + "-> " + iliIi1Ii);
    }
    typeof I11i1li1 == "object" && I11i1li1.errorMessage && I11i1li1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l11lI11I) {
    console.log(l11lI11I);
  }
}
function getPostRequest(IIIIiili, l1liII1I, i111i = "POST") {
  let lII111il = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIIIiili.indexOf("https://lzkj-isv.isvjd.com") > -1 && (lII111il.Referer = "https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId, lII111il.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": IIIIiili,
    "method": i111i,
    "headers": lII111il,
    "body": l1liII1I,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(IiiIIli => {
    let iIIIlIl1 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iIIIlIl1, async (I1I1IilI, lii11Iil, iilliIii) => {
      try {
        if (I1I1IilI) {
          if (lii11Iil && typeof lii11Iil.statusCode != "undefined") {
            if (lii11Iil.statusCode == 493) {
              console.log("getCk 此ip已被限制，请过10分钟后再执行脚本");
              $.outFlag = true;
            }
          }
          console.log(String(I1I1IilI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (lii11Iil.status == 200) setActivityCookie(lii11Iil);
        }
      } catch (iiil11I1) {
        $.logErr(iiil11I1, lii11Iil);
      } finally {
        IiiIIli();
      }
    });
  });
}
function setActivityCookie(IIlIl1) {
  if (IIlIl1) {
    if (IIlIl1.headers["set-cookie"]) {
      cookie = "";
      for (let iiIlIiIi of IIlIl1.headers["set-cookie"]) {
        lz_cookie[iiIlIiIi.split(";")[0].substr(0, iiIlIiIi.split(";")[0].indexOf("="))] = iiIlIiIi.split(";")[0].substr(iiIlIiIi.split(";")[0].indexOf("=") + 1);
      }
      for (const IilIIi of Object.keys(lz_cookie)) {
        cookie += IilIIi + "=" + lz_cookie[IilIIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(ililiIIi) {
  ililiIIi = ililiIIi || 32;
  let llIl1li = "abcdef0123456789",
    l1I11I1I = llIl1li.length,
    lii1lIii = "";
  for (i = 0; i < ililiIIi; i++) lii1lIii += llIl1li.charAt(Math.floor(Math.random() * l1I11I1I));
  return lii1lIii;
}
function jsonParse(lI1iIii) {
  if (typeof lI1iIii == "string") try {
    return JSON.parse(lI1iIii);
  } catch (iIliI) {
    return console.log(iIliI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async iI1l11i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1iil1i1 = "";
    if ($.shopactivityId) i1iil1i1 = ",\"activityId\":" + $.shopactivityId;
    const Ii1lIi1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1iil1i1 + ",\"channel\":406}",
      II1lIi1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii1lIi1l)
      },
      iI11Il = await getH5st("8adfb", II1lIi1),
      li1l1III = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ii1lIi1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI11Il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li1l1III, async (i1lili1l, iiIi1lII, Iiil111) => {
      try {
        Iiil111 = Iiil111 && Iiil111.match(/jsonp_.*?\((.*?)\);/) && Iiil111.match(/jsonp_.*?\((.*?)\);/)[1] || Iiil111;
        let lI1IIIl1 = $.toObj(Iiil111, Iiil111);
        if (lI1IIIl1 && typeof lI1IIIl1 == "object") {
          if (lI1IIIl1 && lI1IIIl1.success === true) {
            console.log(lI1IIIl1.message);
            $.errorJoinShop = lI1IIIl1.message;
            if (lI1IIIl1.result && lI1IIIl1.result.giftInfo) {
              for (let IillIliI of lI1IIIl1.result.giftInfo.giftList) {
                console.log("入会获得: " + IillIliI.discountString + IillIliI.prizeName + IillIliI.secondLineDesc);
              }
            }
            console.log("");
          } else lI1IIIl1 && typeof lI1IIIl1 == "object" && lI1IIIl1.message ? ($.errorJoinShop = lI1IIIl1.message, console.log("" + (lI1IIIl1.message || ""))) : console.log(Iiil111);
        } else console.log(Iiil111);
      } catch (lIlIIi) {
        $.logErr(lIlIIi, iiIi1lII);
      } finally {
        iI1l11i();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async Illi11Il => {
    let iiIll1i1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const llIlll = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiIll1i1)
      },
      l1liIi1 = await getH5st("ef79a", llIlll),
      IIill11i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iiIll1i1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1liIi1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIill11i, async (I1ll111, il1II, i1lI11il) => {
      try {
        i1lI11il = i1lI11il && i1lI11il.match(/jsonp_.*?\((.*?)\);/) && i1lI11il.match(/jsonp_.*?\((.*?)\);/)[1] || i1lI11il;
        let ii11lIiI = $.toObj(i1lI11il, i1lI11il);
        ii11lIiI && typeof ii11lIiI == "object" ? ii11lIiI && ii11lIiI.success == true && (console.log("\n去加入店铺会员：" + (ii11lIiI.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = ii11lIiI.result.interestsRuleList && ii11lIiI.result.interestsRuleList[0] && ii11lIiI.result.interestsRuleList[0].interestsInfo && ii11lIiI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i1lI11il);
      } catch (il1Iiiii) {
        $.logErr(il1Iiiii, il1II);
      } finally {
        Illi11Il();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
