/*
活动名称：关注店铺有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lorealjdcampaign-rc.isvjcloud.com/interact/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_lkFollowShop_url // 活动链接
		jd_lzkj_loreal_lkFollowShop_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_lkFollowShop_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_lkFollowShop_break // 493后继续执行，默认退出运行（true/false）
		
请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#关注店铺有礼（超级无线）
1 1 1 1 * jd_lzkj_loreal_lkFollowShop.js, tag=关注店铺有礼（超级无线）, enabled=true


*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('关注店铺有礼（超级无线）')
var version_ = "jsjiami.com.v7";
const lllII = require("./jdCookie"),
  l11iII = require("./function/jdCommon"),
  l1i11i = require("./function/sendJDNotify"),
  l11iI1 = require("./function/krgetToken"),
  {
    wuxianDefense: IliiI
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: lI111i
  } = require("./function/krsavePrize"),
  I1lIII = process.env.jd_lzkj_loreal_lkFollowShop_url || "",
  liIlll = process.env.jd_lzkj_loreal_lkFollowShop_opencard === "true",
  I1iI1I = process.env.jd_lzkj_loreal_lkFollowShop_break === "true",
  illll1 = process.env.jd_lzkj_loreal_lkFollowShop_Notify === "true";
let IIIIl1 = "",
  liiilI = "";
const lI111l = Object.keys(lllII).map(l1ilIi => lllII[l1ilIi]).filter(l11iIi => l11iIi);
!lI111l[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!I1lIII) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const iliIlI = l11iII.parseUrl(I1lIII);
  if (!iliIlI) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = I1lIII;
  $.activityId = l11iII.getUrlParameter(I1lIII, "activityId");
  $.activityType = l11iII.getUrlParameter(I1lIII, "activityType");
  $.hostname = iliIlI.hostname;
  $.pathname = iliIlI.pathname;
  let lI111I = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      lI111I = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (lI111I = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + lI111I;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !lI111I || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  l1i11i.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let ii1III = 0; ii1III < lI111l.length; ii1III++) {
    $.index = ii1III + 1;
    IIIIl1 = lI111l[ii1III];
    liiilI = lI111l[ii1III];
    l11iII.setCookie(liiilI);
    $.UserName = decodeURIComponent(l11iII.getCookieValue(IIIIl1, "pt_pin"));
    $.UA = l11iII.genUA($.UserName);
    $.UUID = l11iII.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = l1i11i.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await liiii1();
    l11iII.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  illll1 && l1i11i.getMessage() && (l1i11i.updateContent(l1i11i.content + ("\n【活动地址】" + $.activityUrl)), await l1i11i.push());
})().catch(ll11ll => $.logErr(ll11ll)).finally(() => $.done());
async function liiii1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await l11iI1(liiilI, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await l1ilIl("login");
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await l1ilIl("follow");
          await $.wait(500);
          await l1ilIl("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await l1ilIl("follow");
          await $.wait(500);
          await l1ilIl("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (liIlll) {
            const Iii1Ii = await l11iII.joinShopMember($.venderId);
            if (Iii1Ii) {
              console.log("加入店铺会员成功");
              await l1ilIl("login");
              if ($.runEnd || $.outFlag || $.skipRun) {
                return;
              }
              await $.wait(500);
            } else {
              console.log("加入店铺会员失败，活动仅限店铺会员参与哦~");
              $.message.fix("加入店铺会员失败，活动仅限店铺会员参与");
              return;
            }
          } else {
            console.log("活动仅限店铺会员参与哦~");
            $.message.fix("活动仅限店铺会员参与");
            return;
          }
          break;
        default:
          if ($.joinCode !== "1001") {
            console.log($.joinDes);
            $.message.fix($.joinDes);
            return;
          }
          break;
      }
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await l1ilIl("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await l1ilIl("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10069":
          break;
        case "":
          console.log("未能获取活动类型");
          $.message.fix("未能获取活动类型");
          $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
          $.message.fix("活动类型（" + $.activityType + "）不受支持");
          $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) {
        return;
      }
      await $.wait(500);
    }
    if ($.index === 1) {
      await l1ilIl("drawPrize");
      await $.wait(500);
      const l1iIiI = $.prizeInfo[0]?.["prizeName"],
        illlli = $.prizeInfo[0]?.["prizeType"],
        illlll = $.prizeInfo[0]?.["leftNum"];
      let IIIIiI = illlll >= 1,
        II1I1 = "" + l1iIiI + (illlli === 5 ? "[专享价]" : illlli === 3 ? "[实物]" : "") + "，" + (illlll >= 1 ? "剩余" + illlll + "件" : "已发完");
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + II1I1 + "\n");
      l1i11i.updateContent(l1i11i.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + II1I1));
      const i1i111 = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        ii1l1I = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const lI1lII = Date.now();
          if ($.actStartTime && lI1lII < $.actStartTime) {
            console.log("活动将在 " + i1i111 + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + i1i111);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && lI1lII > $.actEndTime) {
            console.log("活动已于 " + ii1l1I + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + ii1l1I);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + i1i111 + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + i1i111);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + ii1l1I + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + ii1l1I);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!IIIIiI) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    await l1ilIl("getUserFollowInfo");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    $.followShop ? (await l1ilIl("saveFollowInfo"), await $.wait(500)) : (console.log("仅限新关注店铺用户参与哦~"), $.message.fix("仅限新用户参与"));
  } catch (iIiil1) {
    console.log("❌ 脚本运行遇到了错误\n" + iIiil1);
  }
}
async function IIiiIl(l1lI1i, l1lI1l) {
  try {
    switch (l1lI1i) {
      case "login":
        if (l1lI1l.resp_code === 0 && l1lI1l.data) {
          $.token = l1lI1l?.["data"]?.["token"];
          $.joinInfo = l1lI1l?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = l1lI1l?.["data"]?.["shopId"];
          $.venderId = l11iII.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = l1lI1l?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          l1lI1l.resp_msg ? (console.log(l1lI1i + " " + l1lI1l.resp_msg), $.message.fix(l1lI1l.resp_msg), $.skipRun = true) : console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l));
        }
        break;
      case "follow":
        if (!(l1lI1l.resp_code === 0)) {
          l1lI1l.resp_msg ? (console.log(l1lI1i + " " + l1lI1l.resp_msg), $.message.fix(l1lI1l.resp_msg), $.skipRun = true) : console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l));
        }
        break;
      case "initPinToken":
        if (l1lI1l.resp_code === 0 && l1lI1l.data) {
          l1lI1l = JSON.parse(l1lI1l.data);
          if (l1lI1l.resp_code === 0 && l1lI1l.data) {
            $.pinToken = l1lI1l?.["data"]?.["pinToken"];
            $.encryptPin = l1lI1l?.["data"]?.["encryptPin"];
          } else {
            if (l1lI1l.resp_code === 1000) {
              console.log(l1lI1i + " " + l1lI1l.resp_msg);
              $.message.fix(l1lI1l.resp_msg);
              $.skipRun = true;
            } else {
              l1lI1l.resp_msg ? (console.log(l1lI1i + " " + l1lI1l.resp_msg), $.message.fix(l1lI1l.resp_msg), $.skipRun = true) : (console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l));
        }
        break;
      case "basicInfo":
        if (l1lI1l.resp_code === 0 && l1lI1l.data) {
          $.actStartTime = l1lI1l.data?.["startTime"];
          $.actEndTime = l1lI1l.data?.["endTime"];
          $.actStatus = l1lI1l.data?.["actStatus"];
          !$.activityType && ($.activityType = String(l1lI1l.data?.["actType"] || ""));
        } else {
          if (l1lI1l.resp_msg) {
            console.log(l1lI1i + " " + l1lI1l.resp_msg);
            $.message.fix(l1lI1l.resp_msg);
          } else {
            console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l));
          }
        }
        break;
      case "drawPrize":
        if (l1lI1l.resp_code === 0) {
          $.prizeInfo = l1lI1l?.["data"]?.["prizeInfo"] || [];
        } else {
          l1lI1l.resp_msg ? (console.log(l1lI1i + " " + l1lI1l.resp_msg), ["未开始", "结束", "不存在", "不在"].some(i11lII => l1lI1l.resp_msg.includes(i11lII)) && ($.runEnd = true), $.message.fix(l1lI1l.resp_msg)) : console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l));
        }
        break;
      case "getUserFollowInfo":
        if (l1lI1l.resp_code === 0 && l1lI1l.data) {
          $.followShop = l1lI1l.data?.["followShop"];
        } else {
          l1lI1l.resp_msg ? (["未开始", "结束", "不存在", "不在"].some(ll1li1 => l1lI1l.resp_msg.includes(ll1li1)) && ($.runEnd = true), console.log(l1lI1i + " " + l1lI1l.resp_msg), $.message.fix(l1lI1l.resp_msg), $.skipRun = true) : (console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l)), $.skipRun = true);
        }
        break;
      case "saveFollowInfo":
        if (l1lI1l.resp_code === 0) {
          const iIIlll = l1lI1l.data;
          if (iIIlll) {
            switch (iIIlll.prizeType) {
              case 1:
                console.log("🎉 " + iIIlll.prizeName + " 🐶");
                $.message.insert(iIIlll.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const iiI1il = l1lI1l.data.addressId,
                  iiI1ii = iIIlll.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + iiI1ii);
                if (iIIlll.showImg) {
                  console.log("预览图片：" + iIIlll.showImg);
                }
                const I1iii1 = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: liiilI,
                    ua: $.UA,
                    token: $.token,
                    prizeName: iiI1ii,
                    orderCode: iiI1il
                  },
                  lilii1 = await lI111i(I1iii1);
                !illll1 && lilii1 && (await l1i11i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iiI1ii + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(iiI1ii + "(" + (lilii1 ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + iIIlll.prizeName + " 🎟️");
                $.message.insert("🗑️ " + iIIlll.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + iIIlll.prizeName + " 🧧");
                $.message.insert("🎉 " + iIIlll.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + iIIlll.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + iIIlll.prizeName + " 🎁");
                !illll1 && (await l1i11i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + iIIlll.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(iIIlll);
                break;
            }
          } else {
            console.log("💨 空气");
            $.message.insert("💨 空气");
          }
        } else {
          if (l1lI1l.resp_msg) {
            console.log(l1lI1i + " " + l1lI1l.resp_msg);
            ["未开始", "结束", "不存在", "不在"].some(iIiii1 => l1lI1l.resp_msg.includes(iIiii1)) && ($.runEnd = true);
            $.message.fix(l1lI1l.resp_msg);
          } else {
            console.log("❓" + l1lI1i + " " + JSON.stringify(l1lI1l));
          }
        }
        break;
    }
  } catch (Illlll) {
    console.log("❌ 未能正确处理 " + l1lI1i + " 请求响应 " + (Illlll.message || Illlll));
  }
}
async function l1ilIl(llli1l) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let llli1i = $.newbaseUrl,
    iiI1l1 = {},
    i11lI1 = {},
    liliiI = "POST";
  switch (llli1l) {
    case "login":
      llli1i += "/api/user-info/login";
      iiI1l1 = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      llli1i += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      liliiI = "GET";
      llli1i += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      llli1i += "/api/active/basicInfo";
      iiI1l1 = {
        activityId: $.activityId
      };
      break;
    case "drawPrize":
      llli1i += "/api/prize/drawPrize";
      break;
    case "getUserFollowInfo":
      liliiI = "GET";
      llli1i += "/api/task/lkFollowShop/getUserFollowInfo";
      break;
    case "saveFollowInfo":
      liliiI = "GET";
      llli1i += "/api/task/lkFollowShop/saveFollowInfo?actType=10069";
      break;
    default:
      console.log("❌ 未知请求 " + llli1l);
      return;
  }
  const ilIIiI = liliiI === "POST" && $.pathname.includes("/prod/cc/interactsaas") && IliiI.isDefenseApi(llli1i.replace($.newbaseUrl, "").split("?")[0]);
  ilIIiI && (iiI1l1.actId = $.activityId, i11lI1 = {
    ecyText: IliiI.encrypt(iiI1l1, $.pinToken, $.te)
  });
  const lIl1ii = {
    url: llli1i,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      Connection: "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      Host: $.hostname,
      Origin: $.origin,
      Referer: $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    body: JSON.stringify(ilIIiI ? i11lI1 : iiI1l1),
    timeout: 30000
  };
  $.token && (lIl1ii.headers.token = $.token);
  liliiI === "GET" && (delete lIl1ii.body, delete lIl1ii.headers["Content-Type"]);
  const lIl1il = 5;
  let Ii1l11 = 0,
    IIlii1 = null,
    iiI1lI = false;
  while (Ii1l11 < lIl1il) {
    Ii1l11 > 0 && (await $.wait(1000));
    const {
      err: ll1lll,
      res: Illlil,
      data: I1iili
    } = await IIiiIi(lIl1ii, liliiI);
    if (ll1lll) {
      if (typeof ll1lll === "string" && ll1lll.includes("Timeout awaiting 'request'")) {
        IIlii1 = llli1l + " 请求超时，请检查网络重试";
      } else {
        const I1iill = Illlil?.["statusCode"];
        if (I1iill) {
          if ([403, 493].includes(I1iill)) {
            IIlii1 = llli1l + " 请求失败，IP被限制（Response code " + I1iill + "）";
            iiI1lI = true;
          } else {
            if ([400, 404].includes(I1iill)) {
              IIlii1 = llli1l + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1iill + "）";
            } else {
              [500].includes(I1iill) && ilIIiI ? lIl1ii.body = JSON.stringify({
                ecyText: IliiI.encrypt(iiI1l1, $.pinToken, $.te)
              }) : IIlii1 = llli1l + " 请求失败（Response code " + I1iill + "）";
            }
          }
        } else {
          IIlii1 = llli1l + " 请求失败 => " + (ll1lll.message || ll1lll);
        }
      }
      Ii1l11++;
    } else {
      const Ii111 = l11iII.getResponseCookie(Illlil);
      switch (llli1l) {
        case "initPinToken":
          const l111l = l11iII.getCookieValue(Ii111, "te");
          l111l && ($.te = l111l);
          break;
      }
      if (I1iili) {
        try {
          const I1iilI = JSON.parse(I1iili);
          IIiiIl(llli1l, I1iilI);
          break;
        } catch (Ii1II1) {
          IIlii1 = "❌ " + llli1l + " 接口响应数据解析失败: " + Ii1II1.message;
          console.log("🚫 " + llli1l + " => " + String(I1iili));
          Ii1l11++;
        }
      } else {
        ilIIiI && (lIl1ii.body = JSON.stringify({
          ecyText: IliiI.encrypt(iiI1l1, $.pinToken, $.te)
        }));
        IIlii1 = "❌ " + llli1l + " 接口无响应数据";
        Ii1l11++;
      }
      iiI1lI = false;
    }
  }
  if (Ii1l11 >= lIl1il) {
    console.log(IIlii1);
    if (iiI1lI) {
      !I1iI1I && ($.outFlag = true, $.message && $.message.fix(IIlii1));
    }
  }
}
async function IIiiIi(IllliI, IliIll = "POST") {
  if (IliIll === "POST") {
    return new Promise(async l1lI1 => {
      $.post(IllliI, (Ili1I1, lI1I1i, liI1II) => {
        l1lI1({
          err: Ili1I1,
          res: lI1I1i,
          data: liI1II
        });
      });
    });
  } else {
    if (IliIll === "GET") {
      return new Promise(async i1Iii1 => {
        $.get(IllliI, (i1ll1, lilI1I, lI1I1l) => {
          i1Iii1({
            err: i1ll1,
            res: lilI1I,
            data: lI1I1l
          });
        });
      });
    } else {
      const Il1Il = "不支持的请求方法";
      return {
        err: Il1Il,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
