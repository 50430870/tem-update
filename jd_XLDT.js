/*
骁龙答题

随机答题 抽奖


有水的时候运行


请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#骁龙答题
11 11 11 11 * jd_XLDT.js, tag=骁龙答题, enabled=true

*/
let lnrun = 0;


const $ = new Env('骁龙答题')
const l1iiI1 = $.isNode() ? require("./jdCookie.js") : "",
  Iii1il = $.isNode() ? require("./sendNotify") : "",
  lIi1li = require("./function/krgetToken"),
  Ii1Ii = require("./function/krgetua"),
  Il1iIl = require("./function/krh5st"),
  lIi1ll = require("./function/wxSavePrize");
let l1IIiI = "https://lzdz1-isv.isvjd.com",
  IlilIi = {},
  I1lilI = [],
  i11IiI = "";
if ($.isNode()) {
  Object.keys(l1iiI1).forEach(iIiiIl => {
    I1lilI.push(l1iiI1[iIiiIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1lilI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIilIi($.getdata("CookiesJD") || "[]").map(lIilIl => lIilIl.cookie)].filter(iIiiIi => !!iIiiIi);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iIlill = "",
  IlilIl = "",
  iIlili = "https://lzdz1-isv.isvjd.com/m/707261/dza2d3c5aac6d64cdfa884e3f117bf/";
!(async () => {
  if (!I1lilI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "dza2d3c5aac6d64cdfa884e3f117bf";
  $.shareUuid = "";
  console.log("请在有水的时候运行");
  console.log("入口:\nhttps://lzdz1-isv.isvjd.com/m/707261/dza2d3c5aac6d64cdfa884e3f117bf/");
  for (let ll1lIi = 0; ll1lIi < I1lilI.length; ll1lIi++) {
    i11IiI = I1lilI[ll1lIi];
    originCookie = I1lilI[ll1lIi];
    if (i11IiI) {
      $.UserName = decodeURIComponent(i11IiI.match(/pt_pin=([^; ]+)(?=;?)/) && i11IiI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ll1lIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      $.UA = await Ii1Ii($.UserName);
      await Ii1II();
      await $.wait(3000);
      if ($.outFlag || $.activityEnd || $.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let lIi1i = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lIi1i);
    if ($.isNode()) await Iii1il.sendNotify("" + $.name, "" + lIi1i);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(iIIIil => $.logErr(iIIIil)).finally(() => $.done());
async function Ii1II() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    iIlill = "";
    $.Token = "";
    $.Pin = "";
    let II1li = false;
    $.Token = await lIi1li(i11IiI, l1IIiI);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IIiii1();
    if (IlilIl == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await Iii1l1("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await Iii1l1("accessLogWithAD");
    await Iii1l1("activityContent");
    await Iii1l1("drawContent");
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.openCard == false) {
      console.log("开卡任务");
      II1li = true;
      $.joinVenderId = 707261;
      $.shopactivityId = "";
      for (let Ii1lIl = 0; Ii1lIl < Array(2).length; Ii1lIl++) {
        if (Ii1lIl > 0) console.log("第" + Ii1lIl + "次 重新开卡");
        await I1lil1();
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 可能是开卡黑号,跳过运行");
        return;
      }
      await Iii1l1("drawContent");
      await Iii1l1("activityContent");
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    } else console.log("已全部开卡");
    if ($.hotFlag) return;
    await Iii1l1("improve");
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    console.log("开始做日常任务......");
    $.log("骁龙答题礼: " + $.answerStatus);
    if (!$.answerStatus && !$.outFlag) {
      II1li = true;
      await Iii1l1("getQuestionList");
      for (let li1iI = 0; li1iI < $.questionList.length; li1iI++) {
        console.log("答题ID：" + $.questionList[li1iI].questionId + ",答题题目：" + $.questionList[li1iI].content + "，选项：A、" + $.questionList[li1iI].choiceA + "，B、" + $.questionList[li1iI].choiceB);
        $.questionIdindex = li1iI + 1;
        $.questionId = $.questionList[li1iI].questionId;
        $.answer = ["A", "B"];
        $.questionIdanswer = $.answer[i11Ii1(0, $.answer.length)];
        console.log("随机答题中......选择： " + $.questionIdanswer);
        await Iii1l1("answerQuestion");
      }
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
    await Iii1l1("activityContent");
    console.log("\n目前抽奖次数为：" + $.score + "\n");
    $.runFalag = true;
    let Ii1lIi = $.score;
    for (m = 1; Ii1lIi--; m++) {
      console.log("第" + m + "次抽奖");
      await Iii1l1("draw");
      if ($.runFalag == false) break;
      if (Number(Ii1lIi) <= 0) break;
      if (m >= 3) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (liii11) {
    console.log(liii11);
  }
}
async function Iii1l1(Il1I11) {
  if ($.outFlag) return;
  let Ii1Ili = "https://lzdz1-isv.isvjd.com",
    IIiI11 = "",
    Ii1Ill = "POST";
  switch (Il1I11) {
    case "getMyPing":
      url = Ii1Ili + "/customer/getMyCidPing";
      IIiI11 = "token=" + $.Token + "&fromType=APP&userId=707261&pin=";
      break;
    case "getSimpleActInfoVo":
      url = Ii1Ili + "/common/brand/getSimpleActInfoVo";
      IIiI11 = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = Ii1Ili + "/common/accessLogWithAD";
      let Il1I1i = "https://lzdz1-isv.isvjd.com/m/707261/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      IIiI11 = "venderId=707261&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Il1I1i);
      break;
    case "activityContent":
      url = Ii1Ili + "/dingzhi/snapdragon/superbrandday/activityContent";
      IIiI11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "improve":
      url = Ii1Ili + "/dingzhi/snapdragon/superbrandday/improve";
      IIiI11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getGift":
      url = Ii1Ili + "/dingzhi/snapdragon/superbrandday/getGift";
      IIiI11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getQuestionList":
      url = Ii1Ili + "/dingzhi/snapdragon/superbrandday/getQuestionList";
      IIiI11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "answerQuestion":
      url = Ii1Ili + "/dingzhi/snapdragon/superbrandday/answerQuestion";
      IIiI11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&index=" + $.questionIdindex + "&questionId=" + $.questionId + "&answer=" + $.questionIdanswer;
      break;
    case "kldraw":
      url = Ii1Ili + "/dingzhi/snapdragon/superbrandday/kldraw";
      IIiI11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&password=%E9%AA%81%E9%BE%99%E8%B5%A2%E5%9C%A8%E6%8E%8C%E4%B8%AD";
      break;
    case "drawContent":
      url = Ii1Ili + "/dingzhi/taskact/common/drawContent";
      IIiI11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = Ii1Ili + "/dingzhi/snapdragon/superbrandday/draw";
      IIiI11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + Il1I11);
  }
  let IIlII1 = l1IIi1(url, IIiI11, Ii1Ill);
  return new Promise(async lIilI1 => {
    $.post(IIlII1, (iIIIll, ll1Ii1, li1ll) => {
      try {
        IlilII(ll1Ii1);
        iIIIll ? (ll1Ii1 && typeof ll1Ii1.statusCode != "undefined" && ll1Ii1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(iIIIll, iIIIll)), console.log("API请求失败，请检查网路重试")) : iIlil1(Il1I11, li1ll);
      } catch (lIllil) {
        console.log(lIllil, ll1Ii1);
      } finally {
        lIilI1();
      }
    });
  });
}
async function iIlil1(I1I11l, I1I11i) {
  let III1ll = "";
  try {
    (I1I11l != "accessLogWithAD" || I1I11l != "drawContent") && I1I11i && (III1ll = JSON.parse(I1I11i));
  } catch (l1I1ii) {
    console.log("执行任务异常");
    console.log(I1I11i);
    $.runFalag = false;
  }
  try {
    switch (I1I11l) {
      case "getMyPing":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) {
            if (III1ll.data && typeof III1ll.data.secretPin != "undefined") $.Pin = III1ll.data.secretPin;
            if (III1ll.data && typeof III1ll.data.nickname != "undefined") $.nickname = III1ll.data.nickname;
          } else III1ll.errorMessage ? console.log("" + (III1ll.errorMessage || "")) : console.log("" + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "saveTask":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) console.log("任务完成，获得机会：" + III1ll.data.addChance);else {
            if (III1ll.errorMessage) {
              console.log("" + (III1ll.errorMessage || ""));
            } else console.log(" " + I1I11i);
          }
        } else console.log("" + I1I11i);
        break;
      case "getGift":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) console.log("任务完成，获得线下兑换码：" + III1ll.data.gift);else III1ll.errorMessage ? console.log("" + (III1ll.errorMessage || "")) : console.log(" " + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "answerQuestion":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) {
            console.log("任务完成，获得：抽奖机会：" + III1ll.data.score + "，答题序列：" + III1ll.data.answerRight + "，");
          } else III1ll.errorMessage ? console.log("" + (III1ll.errorMessage || "")) : console.log(" " + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "improve":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) console.log("任务完成");else III1ll.errorMessage ? console.log("" + (III1ll.errorMessage || "")) : console.log("" + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "getQuestionList":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) $.questionList = III1ll.data.questionList || [];else III1ll.errorMessage ? console.log("" + (III1ll.errorMessage || "")) : console.log("" + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "activityContent":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) {
            $.endTime = III1ll.data.endTime || III1ll.data.activityVo && III1ll.data.activityVo.endTime || III1ll.data.activity.endTime || 0;
            $.hasEnd = III1ll.data.hasEnd || false;
            $.score = III1ll.data.score || 0;
            $.assistStatus = III1ll.data.assistStatus || 0;
            $.gift = III1ll.data.gift || "";
            $.answerStatus = III1ll.data.answerStatus || false;
            $.improveStatus = III1ll.data.improveStatus || false;
            $.openCard = III1ll.data.openCard || false;
            $.actorUuid = III1ll.data.actorUuid || 0;
          } else III1ll.errorMessage ? console.log("" + (III1ll.errorMessage || "")) : console.log("" + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "draw":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) {
            if (typeof III1ll.data == "object") {
              drawInfo = III1ll.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = III1ll.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let l1ilI = await lIi1ll("https://lzkjdz-isv.isvjcloud.com", i11IiI, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  if (l1ilI) $.isNode() && (await Iii1il.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjd.com/m/707261/" + $.activityId));else {
                    if ($.isNode()) {
                      await Iii1il.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjd.com/m/707261/" + $.activityId);
                    }
                  }
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await Iii1il.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjd.com/m/707261/" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + I1I11i);
          } else III1ll.errorMessage ? ($.runFalag = false, console.log("" + (III1ll.errorMessage || ""))) : console.log("" + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "kldraw":
        if (typeof III1ll == "object") {
          if (III1ll.result && III1ll.result === true) {
            if (typeof III1ll.data == "object") {
              drawInfo = III1ll.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = III1ll.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let iiiIl1 = await lIi1ll("https://lzkjdz-isv.isvjcloud.com", i11IiI, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  if (iiiIl1) {
                    if ($.isNode()) {
                      await Iii1il.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjd.com/m/707261/" + $.activityId);
                    }
                  } else {
                    $.isNode() && (await Iii1il.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjd.com/m/707261/" + $.activityId));
                  }
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await Iii1il.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjd.com/m/707261/" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  if (drawInfo.name.includes("券")) {
                    console.log("🗑️ 优惠券");
                  } else {
                    console.log("获得：" + drawInfo.name);
                  }
                  break;
              } else console.log("💨  空气");
            } else console.log("" + I1I11i);
          } else III1ll.errorMessage ? ($.runFalag = false, console.log("" + (III1ll.errorMessage || ""))) : console.log("" + I1I11i);
        } else console.log("" + I1I11i);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getQuestion":
        break;
      default:
        console.log(I1I11l + "-> " + I1I11i);
    }
    typeof III1ll == "object" && III1ll.errorMessage && III1ll.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (illIIl) {
    console.log(illIIl);
  }
}
function l1IIi1(iiiIlI, I1i11, Ill1ii = "POST") {
  let Ill1il = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": i11IiI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iiiIlI.indexOf("https://lzdz1-isv.isvjd.com") > -1 && (Ill1il.Referer = iIlili, Ill1il.Cookie = "" + (iIlill && iIlill || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + IlilIl), {
    "url": iiiIlI,
    "method": Ill1ii,
    "headers": Ill1il,
    "body": I1i11,
    "timeout": 30000
  };
}
function IIiii1() {
  return new Promise(Ill1iI => {
    let IIll = {
      "url": "https://lzdz1-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": i11IiI,
        "Referer": iIlili,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(IIll, async (i1Ii1i, iiiIll, iilliI) => {
      try {
        if (i1Ii1i) {
          iiiIll && typeof iiiIll.statusCode != "undefined" && iiiIll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(i1Ii1i));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iII1i = iilliI.match(/(活动已经结束)/) && iilliI.match(/(活动已经结束)/)[1] || "";
          iII1i && ($.activityEnd = true, console.log("活动已结束"));
          IlilII(iiiIll);
        }
      } catch (i11Il) {
        $.logErr(i11Il, iiiIll);
      } finally {
        Ill1iI();
      }
    });
  });
}
function IlilII(i11Ii) {
  if (i11Ii) {
    if (i11Ii.headers["set-cookie"]) {
      i11IiI = originCookie + ";";
      for (let IIli of i11Ii.headers["set-cookie"]) {
        IlilIi[IIli.split(";")[0].substr(0, IIli.split(";")[0].indexOf("="))] = IIli.split(";")[0].substr(IIli.split(";")[0].indexOf("=") + 1);
      }
      for (const iII11 of Object.keys(IlilIi)) {
        i11IiI += iII11 + "=" + IlilIi[iII11] + ";";
      }
      IlilIl = i11IiI;
    }
  }
}
function iIII1(l1I11) {
  l1I11 = l1I11 || 32;
  let IlIiI = "abcdef0123456789",
    l1iI1I = IlIiI.length,
    ilI1i1 = "";
  for (i = 0; i < l1I11; i++) ilI1i1 += IlIiI.charAt(Math.floor(Math.random() * l1iI1I));
  return ilI1i1;
}
async function I1lil1() {
  if (!$.joinVenderId) return;
  return new Promise(async liIII1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l1Ili1 = "";
    if ($.shopactivityId) l1Ili1 = ",\"activityId\":" + $.shopactivityId;
    const iliili = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1Ili1 + ",\"channel\":406}",
      iliill = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iliili)
      },
      I111ii = await Il1iIl("8adfb", iliill),
      Ililll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iliili + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I111ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i11IiI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ililll, async (i11l1i, iI11l1, IlIii) => {
      try {
        if (i11l1i) iI11l1 && typeof iI11l1.statusCode != "undefined" && iI11l1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IlIii = IlIii && IlIii.match(/jsonp_.*?\((.*?)\);/) && IlIii.match(/jsonp_.*?\((.*?)\);/)[1] || IlIii;
          let IlillI = $.toObj(IlIii, IlIii);
          if (IlillI && typeof IlillI == "object") {
            if (IlillI && IlillI.success === true) {
              console.log(" >> " + IlillI.message);
              $.errorJoinShop = IlillI.message;
              if (IlillI.result && IlillI.result.giftInfo) {
                for (let iIliII of IlillI.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + iIliII.discountString + iIliII.prizeName + iIliII.secondLineDesc);
                }
              }
            } else IlillI && typeof IlillI == "object" && IlillI.message ? ($.errorJoinShop = IlillI.message, console.log("" + (IlillI.message || ""))) : console.log(IlIii);
          } else console.log(IlIii);
        }
      } catch (IlIil) {
        $.logErr(IlIil, iI11l1);
      } finally {
        liIII1();
      }
    });
  });
}
function iIlilI(iI11i1) {
  return new Promise(i11l11 => {
    const I111iI = {
      "url": "" + iI11i1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I111iI, async (IlIlI, IIil1I, II1i1l) => {
      try {
        if (IlIlI) {} else II1i1l ? II1i1l = JSON.parse(II1i1l) : console.log("未获取到数据,请重新运行");
      } catch (l1IllI) {
        $.logErr(l1IllI, IIil1I);
        II1i1l = null;
      } finally {
        i11l11(II1i1l);
      }
    });
  });
}
function i11Ii1(lili, lIi1Il) {
  return Math.floor(Math.random() * (lIi1Il - lili)) + lili;
}
function lIilIi(IIl111) {
  if (typeof IIl111 == "string") {
    try {
      return JSON.parse(IIl111);
    } catch (IIl11I) {
      return console.log(IIl11I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
