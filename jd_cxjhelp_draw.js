/*
#抽现金抽奖提现

轮询提现变量：jd_cxjhelp_num //轮询提现页数

兑换红包变量：
export jd_cxjhelp_tjdh="true" // 特价抽现金兑换红包，默认关闭
export jd_cxjhelp_jddh="true" // 京东转赚红包兑换红包，默认关闭

注意：轮询页数也大，越容易403，请谨慎填写

更新提现失败重试
更新抽奖火爆重试（一直火爆一直重试）
更新统计
更新转赚红包 上限兑换红包
更新单独兑换红包变量，避免兑换失败一直请求
更新此次活动到期时间
更新京东版提现金

[task_local]
#抽现金抽奖提现
11 11 11 11 * jd_cxjhelp_draw.js, tag=抽现金抽奖提现, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/
let lnrun = 0;


const $ = new Env("抽现金抽奖提现");
const IIiliI1 = $.isNode() ? require("./jdCookie") : "",
  ililili1 = require("./function/h5st41.js"),
  il1Ili11 = require("./function/jdCommon");
let Il111l = [],
  ll1i1lli = "";
$.krtyhot = false;
let liIIlll = ["3orGfh1YkwNLksxOcN8zWQ", "Wvzc_VpNTlSkiQdHT8r7QA"],
  iIlIlIII = ["京东转赚红包", "特价抽现金"],
  Il11iill = process.env.jd_cxjhelp_tjdh ? process.env.jd_cxjhelp_tjdh : "false",
  I1iil = process.env.jd_cxjhelp_jddh ? process.env.jd_cxjhelp_jddh : "false",
  liIIIl11 = "",
  l1ilii1i = process.env.jd_cxjhelp_num ? process.env.jd_cxjhelp_num : "1";
if ($.isNode()) {
  Object.keys(IIiliI1).forEach(ii11Ii1 => {
    Il111l.push(IIiliI1[ii11Ii1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Il111l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIlilI($.getdata("CookiesJD") || "[]").map(liii1II => liii1II.cookie)].filter(I1i1Ii1l => !!I1i1Ii1l);
!(async () => {
  if (!Il111l[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前设置特价兑换红包：" + Il11iill);
  console.log("当前设置转赚兑换红包：" + I1iil);
  for (let iIi1Ii1l = 0; iIi1Ii1l < Il111l.length; iIi1Ii1l++) {
    if (Il111l[iIi1Ii1l]) {
      ll1i1lli = Il111l[iIi1Ii1l];
      $.UserName = decodeURIComponent(ll1i1lli.match(/pt_pin=([^; ]+)(?=;?)/) && ll1i1lli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIi1Ii1l + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      $.UA = il1Ili11.genUA($.UserName);
      for (let lllIIllI = 0; lllIIllI < liIIlll.length; lllIIllI++) {
        liIIIl11 = liIIlll[lllIIllI];
        appName = iIlIlIII[lllIIllI];
        console.log("\n开始第" + (lllIIllI + 1) + "个活动：" + appName + "\n");
        await liii1ilI();
        await $.wait(2000);
      }
    }
  }
})().catch(Il11iII => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Il11iII + "!", "");
}).finally(() => {
  $.done();
});
async function liii1ilI() {
  $.txhot = false;
  $.inviteFissionReceivehot = false;
  $.hbnums = 0;
  $.xjnums = 0;
  await l11lllli();
  if ($.prizeNum > 0) for (m = 1; $.prizeNum--; m++) {
    console.log("进行第" + m + "次抽奖");
    await I1iiIlii();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  }
  console.log("\n当前设置轮询提现页数：" + l1ilii1i);
  for (let I1IIIl = 0; I1IIIl < l1ilii1i; I1IIIl++) {
    $.pageNum = I1IIIl + 1;
    console.log("\n开始轮询提现" + $.pageNum + "页");
    await lIii($.pageNum);
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    if ($.txhot) break;
  }
}
async function I1iiIlii() {
  return new Promise(async l11ii1 => {
    let IIillI = {
      "ts": Date.now(),
      "ridx": -1,
      "hdid": ll1iiI(43) + "=",
      "cipher": {},
      "appname": "wegame",
      "version": "1.0.0",
      "ciphertype": 5
    };
    const ii1iIIil = {
        "functionId": "inviteFissionDrawPrize",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11,
          "lbs": JSON.stringify(IIillI)
        }
      },
      i1iIi1Ii = await iI1i1i11("c02c6", ii1iIIil);
    let Iiilii11 = {
      "url": "https://api.m.jd.com/api?functionId=inviteFissionDrawPrize&" + i1iIi1Ii,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.get(Iiilii11, async (Ill1Iili, i11il1l, I1i11lii) => {
      try {
        if (Ill1Iili) console.log("" + JSON.stringify(Ill1Iili));else {
          I1i11lii = JSON.parse(I1i11lii);
          if (I1i11lii) {
            if (I1i11lii.code == 0 && I1i11lii.success == true) {
              if (I1i11lii.data) {
                if (I1i11lii?.["data"]?.["prizeType"] == 4) $.xjprizeValue = I1i11lii?.["data"]?.["prizeValue"] || 0, $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100, $.xjnums = ii1iliIl($.xjnum), console.log("抽中现金：" + $.xjprizeValue + " 🎁 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");else {
                  if (I1i11lii?.["data"]?.["prizeType"] == 2) $.hbprizeValue = I1i11lii?.["data"]?.["prizeValue"] || 0, $.hbnum = ($.hbprizeValue * 100 + $.hbnums * 100) / 100, $.hbnums = ii1iliIl($.hbnum), console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");else {
                    if (I1i11lii?.["data"]?.["prizeType"] == 1) console.log("抽中垃圾卷  🗑️");else {
                      if (I1i11lii?.["data"]?.["prizeType"] == 6) console.log("抽中惊喜大礼包  🗑️");else {
                        if (I1i11lii?.["data"]?.["prizeType"] == 0) console.log("抽中未知  🎁");else {
                          console.log(JSON.stringify(I1i11lii?.["data"]));
                        }
                      }
                    }
                  }
                }
                !$.inviteFissionReceivehot && liIIIl11 == "3orGfh1YkwNLksxOcN8zWQ" && (await $.wait(parseInt(Math.random() * 1000 + 2000, 10)), await IIli1iI());
              }
            } else I1i11lii.code == 2000 && I1i11lii.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : (console.log(I1i11lii.errMsg), I1i11lii.errMsg.includes("火爆") && $.prizeNum++);
          }
        }
      } catch (liIiiilI) {
        $.logErr(liIiiilI, i11il1l);
      } finally {
        l11ii1();
      }
    });
  });
}
async function IIli1iI() {
  return new Promise(async Il1Il1i => {
    const iIli11ll = {
        "functionId": "inviteFissionReceive",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11
        }
      },
      IIIilI1I = await iI1i1i11("b8469", iIli11ll);
    let IlIli1I1 = {
      "url": "https://api.m.jd.com/?functionId=inviteFissionReceive&" + IIIilI1I,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.get(IlIli1I1, async (ll1I1lIl, li1i1I1l, Ii11l1i) => {
      try {
        if (ll1I1lIl) console.log("" + JSON.stringify(ll1I1lIl));else {
          Ii11l1i = JSON.parse(Ii11l1i);
          if (Ii11l1i) {
            if (Ii11l1i.code == 0 && Ii11l1i.success == true) console.log("仅差 " + Ii11l1i?.["data"]?.["leftAmount"] + " 提现金可提现 " + Ii11l1i?.["data"]?.["amount"] + " 元,进度值：" + Ii11l1i?.["data"]?.["rate"] + " %"), Ii11l1i?.["data"]?.["state"] == 3 && console.log("已成功获得 " + Ii11l1i?.["data"]?.["amount"] + " 元提现金，快去提现吧！");else {
              if (Ii11l1i.code == 80209 && Ii11l1i.errMsg == "活动太火爆，请稍候重试") console.log("当期额外提现任务已做过，跳过"), $.inviteFissionReceivehot = true;else Ii11l1i.code == 80208 && Ii11l1i.errMsg == "活动太火爆，请稍候重试" ? console.log("初始赠送次数不进行提现金抽奖，跳过") : console.log(Ii11l1i.errMsg);
            }
          }
        }
      } catch (iiiII1ll) {
        $.logErr(iiiII1ll, li1i1I1l);
      } finally {
        Il1Il1i();
      }
    });
  });
}
async function l11lllli() {
  return new Promise(async IillI1l => {
    const Illii1iI = {
        "functionId": "inviteFissionHome",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11,
          "inviter": ""
        }
      },
      iiiIiII1 = await iI1i1i11("eb67b", Illii1iI);
    let lI1IlII1 = {
      "url": "https://api.m.jd.com/?functionId=inviteFissionHome&" + iiiIiII1,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.post(lI1IlII1, async (I11ii1iI, Iii1ilIi, Ii1llI11) => {
      try {
        if (I11ii1iI) console.log("" + JSON.stringify(I11ii1iI));else {
          Ii1llI11 = JSON.parse(Ii1llI11);
          if (Ii1llI11) {
            if (Ii1llI11.code == 0 && Ii1llI11.success == true) {
              var Il1lI11I = new Date().valueOf();
              $.drawPrizeNum = Ii1llI11.data.drawPrizeNum || 0;
              $.prizeNum = Ii1llI11.data.prizeNum || 0;
              $.countDownTime = Ii1llI11.data.countDownTime || 0;
              countDownTime = Il1lI11I + $.countDownTime;
              let il1lIii1 = Ii1llI11.data.inviter || "";
              const lI1lI1I = $.time("yyyy-MM-dd HH:mm:ss", countDownTime);
              liIIIl11 == "3orGfh1YkwNLksxOcN8zWQ" && ($.cashVo = Ii1llI11.data.cashVo || "", console.log("限时额外提现金：\n已有 " + $.cashVo?.["amount"] + " 提现金，仅差 " + $.cashVo?.["leftAmount"] + " 提现金可提现 " + $.cashVo?.["totalAmount"] + " 元,进度值：" + $.cashVo?.["rate"] + " %\n"));
              console.log("到期时间：" + lI1lI1I + "\n助力码：" + il1lIii1 + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
            } else Ii1llI11.code == 2000 && Ii1llI11.errMsg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(Ii1llI11.errMsg);
          }
        }
      } catch (liIiiIl) {
        $.logErr(liIiiIl, Iii1ilIi);
      } finally {
        IillI1l();
      }
    });
  });
}
async function lIii(IiiiiIIi) {
  return new Promise(async iilliI11 => {
    const lIl1i1Il = {
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": liIIIl11,
          "pageNum": IiiiiIIi,
          "pageSize": 100,
          "business": "fission"
        }
      },
      l11llIil = await iI1i1i11("f2b1d", lIl1i1Il);
    let ill11lI1 = {
      "url": "https://api.m.jd.com/?" + l11llIil,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1i1lli
      },
      "timeout": 30 * 1000
    };
    $.get(ill11lI1, async (llliilli, liilllll, iiilllll) => {
      try {
        if (llliilli) console.log("" + JSON.stringify(llliilli));else {
          iiilllll = JSON.parse(iiilllll);
          if (iiilllll) {
            if (iiilllll.code == 0 && iiilllll.success == true) {
              const IliiiI1l = (iiilllll.data.items || []).filter(lI111il => lI111il.prizeType === 4 && lI111il.state === 0 || lI111il.state === 2);
              for (let ll11I of IliiiI1l) {
                console.log("抽现金抽奖提现，去提现" + ll11I.amount + "现金");
                await li1IlIII(ll11I.id, ll11I.poolBaseId, ll11I.prizeGroupId, ll11I.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，当月额度已满");
                  break;
                }
              }
            } else console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(iiilllll));
          }
        }
      } catch (Il11iI1) {
        $.logErr(Il11iI1, liilllll);
      } finally {
        iilliI11();
      }
    });
  });
}
async function li1IlIII(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i) {
  return new Promise(async ii1ili11 => {
    const iIIiiili = {
        "linkId": liIIIl11,
        "businessSource": "NONE",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": l11ii1lI,
          "poolBaseId": iI1iI1il,
          "prizeGroupId": IIl11iI,
          "prizeBaseId": Il11Il1i
        }
      },
      iI11iI1i = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(iIIiiili)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": ll1i1lli
        },
        "timeout": 30 * 1000
      };
    $.post(iI11iI1i, async (lii1l11l, iIIilili, li1lli1I) => {
      try {
        if (lii1l11l) {
          console.log("" + JSON.stringify(lii1l11l));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (iI1II1l(li1lli1I)) {
            li1lli1I = $.toObj(li1lli1I);
            if (li1lli1I.code === 0) {
              if (li1lli1I.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + li1lli1I.data.message);
                if (li1lli1I.data.message.includes("上限")) {
                  if (Il11iill == "true" && liIIIl11 == "Wvzc_VpNTlSkiQdHT8r7QA") await ll11Iili(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i);else I1iil == "true" && liIIIl11 == "3orGfh1YkwNLksxOcN8zWQ" ? await ll11Iili(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i) : $.txhot = true;
                } else {
                  if (li1lli1I.data.message.includes("已存在状态")) await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await li1IlIII(l11ii1lI, iI1iI1il, IIl11iI, Il11Il1i);else (li1lli1I.data.message.includes("未绑定微信") || li1lli1I.data.message.includes("绑定手机号")) && ($.txhot = true);
                }
              }
            } else {
              console.log("提现现金：异常:" + JSON.stringify(li1lli1I));
            }
          }
        }
      } catch (ilII1ill) {
        $.logErr(ilII1ill, iIIilili);
      } finally {
        ii1ili11(li1lli1I);
      }
    });
  });
}
function ll11Iili(iliIIii1, l11il1, iliiIiII, i11Ii1I) {
  return new Promise(lil1l1l1 => {
    const ii1Iil11 = {
        "linkId": liIIIl11,
        "businessSource": "fission",
        "business": "business",
        "drawRecordId": iliIIii1,
        "poolId": l11il1,
        "prizeGroupId": iliiIiII,
        "prizeId": i11Ii1I
      },
      lIII1I1I = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(ii1Iil11)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": ll1i1lli
        },
        "timeout": 30 * 1000
      };
    $.post(lIII1I1I, async (i1lliiiI, I1IIlI, i1lI11lI) => {
      try {
        i1lliiiI ? (console.log("" + JSON.stringify(i1lliiiI)), console.log($.name + " API请求失败，请检查网路重试")) : iI1II1l(i1lI11lI) && (i1lI11lI = $.toObj(i1lI11lI), i1lI11lI.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + i1lI11lI.errMsg));
      } catch (liiliIli) {
        $.logErr(liiliIli, I1IIlI);
      } finally {
        lil1l1l1(i1lI11lI);
      }
    });
  });
}
function ilil11I1(lIIll1ii) {
  return lIIll1ii.then(ill1iIiI => {
    return [null, ill1iIiI];
  }).catch(iiIIiiII => [iiIIiiII]);
}
async function iI1i1i11(iiII1III, lI11ll11) {
  try {
    let l1i1iili = new ililili1({
      "appId": iiII1III,
      "appid": "activities_platform",
      "clientVersion": lI11ll11?.["clientVersion"],
      "client": lI11ll11?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await l1i1iili.genAlgo(), body = await l1i1iili.genUrlParams(lI11ll11.functionId, lI11ll11.body), body;
  } catch (i1ll1l1) {}
}
function ll1iiI(iIIl1i1i) {
  iIIl1i1i = iIIl1i1i || 32;
  let iIliiIIi = "0123456789abcdef",
    ilIil1iI = iIliiIIi.length,
    li1Ii1I = "";
  for (let liIliil1 = 0; liIliil1 < iIIl1i1i; liIliil1++) li1Ii1I += iIliiIIi.charAt(Math.floor(Math.random() * ilIil1iI));
  return li1Ii1I;
}
function IIlilI(lIIIl1II) {
  if (typeof lIIIl1II == "string") try {
    return JSON.parse(lIIIl1II);
  } catch (II1I1I11) {
    return console.log(II1I1I11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function lll1i1Il(lI1IIIi1) {
  return new Promise(IliIliII => {
    const li1ii1il = {
      "url": lI1IIIi1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(li1ii1il, async (il1ili11, Illl1IIi, iiiIIli) => {
      try {
        if (il1ili11) $.getAuthorCodeListerr = false;else {
          if (iiiIIli) iiiIIli = JSON.parse(iiiIIli);
          $.getAuthorCodeListerr = true;
        }
      } catch (I1IiI11I) {
        $.logErr(I1IiI11I, Illl1IIi);
        iiiIIli = null;
      } finally {
        IliIliII(iiiIIli);
      }
    });
  });
}
function l1ii1i(ill1iiI, lII1iiI1) {
  return Math.floor(Math.random() * (lII1iiI1 - ill1iiI)) + ill1iiI;
}
function ii1iliIl(IIlIl11i) {
  var lIIl1li = Number(IIlIl11i);
  return !isNaN(parseFloat(lIIl1li)) && (lIIl1li = lIIl1li.toFixed(2)), lIIl1li;
}
function iI1II1l(Ii11IIi1) {
  try {
    if (typeof JSON.parse(Ii11IIi1) == "object") {
      return true;
    }
  } catch (lillIi1i) {
    return console.log(lillIi1i), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
