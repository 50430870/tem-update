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

[task_local]
#抽现金抽奖提现
11 11 11 11 * jd_cxjhelp_draw.js, tag=抽现金抽奖提现, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/
let lnrun = 0;


const $ = new Env("抽现金抽奖提现");
const ilii1IlI = $.isNode() ? require("./jdCookie") : "",
  iIii1111 = require("./utils/h5st"),
  I1illlIl = require("./function/krgetua");
let lIiliIiI = [],
  I1l1ill = "";
$.krtyhot = false;
let l1II1iI1 = ["3orGfh1YkwNLksxOcN8zWQ", "Wvzc_VpNTlSkiQdHT8r7QA"],
  iilIliii = ["京东转赚红包", "特价抽现金"],
  iIiillii = process.env.jd_cxjhelp_tjdh ? process.env.jd_cxjhelp_tjdh : "false",
  ilIliiii = process.env.jd_cxjhelp_jddh ? process.env.jd_cxjhelp_jddh : "false",
  lII1i1iI = "",
  i1iIiIil = process.env.jd_cxjhelp_num ? process.env.jd_cxjhelp_num : "1";
if ($.isNode()) {
  Object.keys(ilii1IlI).forEach(IlIilIl1 => {
    lIiliIiI.push(ilii1IlI[IlIilIl1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lIiliIiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIlI1IlI($.getdata("CookiesJD") || "[]").map(I1IIll11 => I1IIll11.cookie)].filter(liil1li => !!liil1li);
!(async () => {
  if (!lIiliIiI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前设置特价兑换红包：" + iIiillii);
  console.log("当前设置转赚兑换红包：" + ilIliiii);
  for (let lII11Ili = 0; lII11Ili < lIiliIiI.length; lII11Ili++) {
    if (lIiliIiI[lII11Ili]) {
      I1l1ill = lIiliIiI[lII11Ili];
      $.UserName = decodeURIComponent(I1l1ill.match(/pt_pin=([^; ]+)(?=;?)/) && I1l1ill.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lII11Ili + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      $.UA = await I1illlIl($.UserName);
      for (let i1Illil = 0; i1Illil < l1II1iI1.length; i1Illil++) {
        lII1i1iI = l1II1iI1[i1Illil];
        appName = iilIliii[i1Illil];
        console.log("\n开始第" + (i1Illil + 1) + "个活动：" + appName + "\n");
        await l111i1ll();
        await $.wait(2000);
      }
    }
  }
})().catch(I1Ili1i1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + I1Ili1i1 + "!", "");
}).finally(() => {
  $.done();
});
async function l111i1ll() {
  $.txhot = false;
  $.hbnums = 0;
  $.xjnums = 0;
  await ll1Iil1i();
  if ($.prizeNum > 0) {
    for (m = 1; $.prizeNum--; m++) {
      console.log("进行第" + m + "次抽奖");
      await I11i11II();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    }
  }
  console.log("\n当前设置轮询提现页数：" + i1iIiIil);
  for (let iI111lii = 0; iI111lii < i1iIiIil; iI111lii++) {
    $.pageNum = iI111lii + 1;
    console.log("\n开始轮询提现" + $.pageNum + "页");
    await il11lIii($.pageNum);
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    if ($.txhot) break;
  }
}
async function I11i11II() {
  return new Promise(async IIIi1liI => {
    let lIllli1I = {
      "ts": Date.now(),
      "ridx": -1,
      "hdid": IiII11I(43) + "=",
      "cipher": {},
      "appname": "wegame",
      "version": "1.0.0",
      "ciphertype": 5
    };
    const lil111I1 = {
        "functionId": "inviteFissionDrawPrize",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": lII1i1iI,
          "lbs": JSON.stringify(lIllli1I)
        }
      },
      lIIlii1I = await li1ll1("c02c6", lil111I1);
    let lIl11iiI = {
      "url": "https://api.m.jd.com/api?functionId=inviteFissionDrawPrize&" + lIIlii1I,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": I1l1ill
      },
      "timeout": 30 * 1000
    };
    $.get(lIl11iiI, async (ilil111I, IIIliIiI, iIl1iil1) => {
      try {
        if (ilil111I) {
          console.log("" + JSON.stringify(ilil111I));
        } else {
          iIl1iil1 = JSON.parse(iIl1iil1);
          if (iIl1iil1) {
            if (iIl1iil1.code == 0 && iIl1iil1.success == true) {
              if (iIl1iil1.data) {
                if (iIl1iil1?.["data"]?.["prizeType"] == 4) $.xjprizeValue = iIl1iil1?.["data"]?.["prizeValue"] || 0, $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100, $.xjnums = I1I1li($.xjnum), console.log("抽中现金：" + $.xjprizeValue + " 🎁 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");else {
                  if (iIl1iil1?.["data"]?.["prizeType"] == 2) {
                    $.hbprizeValue = iIl1iil1?.["data"]?.["prizeValue"] || 0;
                    $.hbnum = ($.hbprizeValue * 100 + $.hbnums * 100) / 100;
                    $.hbnums = I1I1li($.hbnum);
                    console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
                  } else {
                    if (iIl1iil1?.["data"]?.["prizeType"] == 1) {
                      console.log("抽中垃圾卷  🗑️");
                    } else {
                      if (iIl1iil1?.["data"]?.["prizeType"] == 6) console.log("抽中惊喜大礼包  🗑️");else iIl1iil1?.["data"]?.["prizeType"] == 0 ? console.log("抽中未知  🎁") : console.log(JSON.stringify(iIl1iil1?.["data"]));
                    }
                  }
                }
              }
            } else iIl1iil1.code == 2000 && iIl1iil1.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : (console.log(iIl1iil1.errMsg), iIl1iil1.errMsg.includes("火爆") && $.prizeNum++);
          }
        }
      } catch (iII1iiIl) {
        $.logErr(iII1iiIl, IIIliIiI);
      } finally {
        IIIi1liI();
      }
    });
  });
}
async function ll1Iil1i() {
  return new Promise(async ll1lIlil => {
    const IlIlillI = {
        "functionId": "inviteFissionHome",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": lII1i1iI,
          "inviter": ""
        }
      },
      IIiii1l = await li1ll1("eb67b", IlIlillI);
    let li1lI1I = {
      "url": "https://api.m.jd.com/?functionId=inviteFissionHome&" + IIiii1l,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": I1l1ill
      },
      "timeout": 30 * 1000
    };
    $.post(li1lI1I, async (iIilIii1, l1l1I11l, l11ilil) => {
      try {
        if (iIilIii1) console.log("" + JSON.stringify(iIilIii1));else {
          l11ilil = JSON.parse(l11ilil);
          if (l11ilil) {
            if (l11ilil.code == 0 && l11ilil.success == true) {
              var Ii1I1l = new Date().valueOf();
              $.drawPrizeNum = l11ilil.data.drawPrizeNum || 0;
              $.prizeNum = l11ilil.data.prizeNum || 0;
              $.countDownTime = l11ilil.data.countDownTime || 0;
              countDownTime = Ii1I1l + $.countDownTime;
              let lIlllI1l = l11ilil.data.inviter || "";
              const IIlIill1 = $.time("yyyy-MM-dd HH:mm:ss", countDownTime);
              console.log("到期时间：" + IIlIill1 + "\n助力码：" + lIlllI1l + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
            } else l11ilil.code == 2000 && l11ilil.errMsg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(l11ilil.errMsg);
          }
        }
      } catch (ll1III1I) {
        $.logErr(ll1III1I, l1l1I11l);
      } finally {
        ll1lIlil();
      }
    });
  });
}
async function il11lIii(I1I1lil) {
  return new Promise(async I1II1III => {
    const II1111ll = {
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": lII1i1iI,
          "pageNum": I1I1lil,
          "pageSize": 100,
          "business": "fission"
        }
      },
      Ii1lIi1I = await li1ll1("f2b1d", II1111ll);
    let iIii1Iil = {
      "url": "https://api.m.jd.com/?" + Ii1lIi1I,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": I1l1ill
      },
      "timeout": 30 * 1000
    };
    $.get(iIii1Iil, async (ll11IiIi, IIiiiI11, I1lIIlIl) => {
      try {
        if (ll11IiIi) console.log("" + JSON.stringify(ll11IiIi));else {
          I1lIIlIl = JSON.parse(I1lIIlIl);
          if (I1lIIlIl) {
            if (I1lIIlIl.code == 0 && I1lIIlIl.success == true) {
              const lI11I1iI = (I1lIIlIl.data.items || []).filter(IllIi1II => IllIi1II.prizeType === 4 && IllIi1II.state === 0 || IllIi1II.state === 2);
              for (let IIl1iI1I of lI11I1iI) {
                console.log("抽现金抽奖提现，去提现" + IIl1iI1I.amount + "现金");
                await i11ll11(IIl1iI1I.id, IIl1iI1I.poolBaseId, IIl1iI1I.prizeGroupId, IIl1iI1I.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，当月额度已满");
                  break;
                }
              }
            } else console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(I1lIIlIl));
          }
        }
      } catch (Illl1li) {
        $.logErr(Illl1li, IIiiiI11);
      } finally {
        I1II1III();
      }
    });
  });
}
async function i11ll11(lilIIiI, ilill1iI, iI1i1iII, lIilI11i) {
  return new Promise(async iIl1ilIi => {
    const l11li1Ii = {
        "linkId": lII1i1iI,
        "businessSource": "NONE",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": lilIIiI,
          "poolBaseId": ilill1iI,
          "prizeGroupId": iI1i1iII,
          "prizeBaseId": lIilI11i
        }
      },
      IiIlI1l1 = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(l11li1Ii)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": I1l1ill
        },
        "timeout": 30 * 1000
      };
    $.post(IiIlI1l1, async (ilIIiiI, lI1i1il1, I1I1lIlI) => {
      try {
        if (ilIIiiI) console.log("" + JSON.stringify(ilIIiiI)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (lIIiIi11(I1I1lIlI)) {
            I1I1lIlI = $.toObj(I1I1lIlI);
            if (I1I1lIlI.code === 0) {
              if (I1I1lIlI.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + I1I1lIlI.data.message);
                if (I1I1lIlI.data.message.includes("上限")) {
                  if (iIiillii == "true" && lII1i1iI == "Wvzc_VpNTlSkiQdHT8r7QA") await l11i1ii(lilIIiI, ilill1iI, iI1i1iII, lIilI11i);else ilIliiii == "true" && lII1i1iI == "3orGfh1YkwNLksxOcN8zWQ" ? await l11i1ii(lilIIiI, ilill1iI, iI1i1iII, lIilI11i) : $.txhot = true;
                } else I1I1lIlI.data.message.includes("已存在状态") && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await i11ll11(lilIIiI, ilill1iI, iI1i1iII, lIilI11i));
              }
            } else console.log("提现现金：异常:" + JSON.stringify(I1I1lIlI));
          }
        }
      } catch (l111ilil) {
        $.logErr(l111ilil, lI1i1il1);
      } finally {
        iIl1ilIi(I1I1lIlI);
      }
    });
  });
}
function l11i1ii(ili1il1i, IiiIliII, IllIiiII, l1illlI) {
  return new Promise(IlilIII1 => {
    const lli1llIi = {
        "linkId": lII1i1iI,
        "businessSource": "fission",
        "business": "business",
        "drawRecordId": ili1il1i,
        "poolId": IiiIliII,
        "prizeGroupId": IllIiiII,
        "prizeId": l1illlI
      },
      il1II1i = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(lli1llIi)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": I1l1ill
        },
        "timeout": 30 * 1000
      };
    $.post(il1II1i, async (l111l1ll, Iiil1i1i, iiI1Ilil) => {
      try {
        if (l111l1ll) {
          console.log("" + JSON.stringify(l111l1ll));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (lIIiIi11(iiI1Ilil)) {
            iiI1Ilil = $.toObj(iiI1Ilil);
            iiI1Ilil.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + iiI1Ilil.errMsg);
          }
        }
      } catch (iiI1ili1) {
        $.logErr(iiI1ili1, Iiil1i1i);
      } finally {
        IlilIII1(iiI1Ilil);
      }
    });
  });
}
function llI1IIli(I1iiil1l) {
  return I1iiil1l.then(lillI1ll => {
    return [null, lillI1ll];
  }).catch(IiIlIlI => [IiIlIlI]);
}
async function li1ll1(i1llii11, iIliIi11) {
  try {
    let ii1iliil = new iIii1111({
      "appId": i1llii11,
      "appid": "activities_platform",
      "clientVersion": iIliIi11?.["clientVersion"],
      "client": iIliIi11?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await ii1iliil.genAlgo(), body = await ii1iliil.genUrlParams(iIliIi11.functionId, iIliIi11.body), body;
  } catch (liI1iiI) {}
}
function IiII11I(lll1l11) {
  lll1l11 = lll1l11 || 32;
  let I1ilIIll = "0123456789abcdef",
    l11II11i = I1ilIIll.length,
    i1iIIli1 = "";
  for (let i1iiil1i = 0; i1iiil1i < lll1l11; i1iiil1i++) i1iIIli1 += I1ilIIll.charAt(Math.floor(Math.random() * l11II11i));
  return i1iIIli1;
}
function IIlI1IlI(iii1l111) {
  if (typeof iii1l111 == "string") try {
    return JSON.parse(iii1l111);
  } catch (IlIi1IiI) {
    return console.log(IlIi1IiI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function iililIiI(IilIiIl) {
  return new Promise(lI1I1IIl => {
    const iIIli1ll = {
      "url": IilIiIl + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIIli1ll, async (l1I1i1il, iIllI1i, Illl1il) => {
      try {
        if (l1I1i1il) $.getAuthorCodeListerr = false;else {
          if (Illl1il) Illl1il = JSON.parse(Illl1il);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1ll1I1l) {
        $.logErr(l1ll1I1l, iIllI1i);
        Illl1il = null;
      } finally {
        lI1I1IIl(Illl1il);
      }
    });
  });
}
function IlllilI(ii11lI1i, I1Il1II) {
  return Math.floor(Math.random() * (I1Il1II - ii11lI1i)) + ii11lI1i;
}
function I1I1li(IIii1I1i) {
  var II1lll = Number(IIii1I1i);
  if (!isNaN(parseFloat(II1lll))) {
    II1lll = II1lll.toFixed(2);
  }
  return II1lll;
}
function lIIiIi11(lIIIII1i) {
  try {
    if (typeof JSON.parse(lIIIII1i) == "object") {
      return true;
    }
  } catch (II1IiIIi) {
    return console.log(II1IiIIi), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
