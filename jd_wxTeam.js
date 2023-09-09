/*
活动名称：组队瓜分奖品 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/wxTeam/activity/activity?activityId=<活动id>
        https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=<活动id>
环境变量：jd_wxTeam_activityUrl // 活动链接（必填）
        jd_wxTeam_joinMember // 是否入会（true/false），默认不入会
        jd_wxTeam_Notify // 是否推送通知（true/false），默认不推送
        jd_wxTeam_Concurrent // 是否启用并发模式（true/false），默认不开启
        jd_wxTeam_maxConcurrency // 控制最大并发线程数，默认3

队长无效或无法创建战队时会退出执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#组队瓜分奖品
1 1 1 1 * jd_wxTeam.js, tag=组队瓜分奖品, enabled=true


*/
let lnrun = 0;


const $ = new Env('组队瓜分奖品（超级无线/超级会员）')
const illI11 = require("./jdCookie"),
  ll11Ii = require("./function/jdCommon"),
  ll11Il = require("./function/sendJDNotify"),
  i11lI = require("./function/krgetToken"),
  Illl1 = require("./function/krh5st"),
  iii1I = process.env.jd_wxTeam_activityUrl || "",
  iliII = process.env.jd_wxTeam_joinMember === "true",
  ii1i1I = process.env.jd_wxTeam_Notify === "true",
  liIlI1 = process.env.jd_wxTeam_Concurrent === "true",
  iillIl = process.env.jd_wxTeam_maxConcurrency || "3";
let IiIi1I = "",
  iillIi = "",
  iii11 = "";
const iliI1 = Object.keys(illI11).map(Illli => illI11[Illli]).filter(i11il => i11il);
!iliI1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iii1I) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const liIlIi = ll11Ii.parseUrl(iii1I);
  if (!liIlIi) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iii1I;
  $.activityId = ll11Ii.getUrlParameter(iii1I, "activityId");
  $.hostname = liIlIi?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) $.activityMode = "cjhy";else $.hostname.includes("lzkj") && ($.activityMode = "lzkj", $.hostname = "lzkj-isv.isvjd.com");
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  ll11Il.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  if (!liIlI1) {
    for (let Iii1ll = 0; Iii1ll < iliI1.length; Iii1ll++) {
      $.index = Iii1ll + 1;
      IiIi1I = iliI1[Iii1ll];
      iii11 = iliI1[Iii1ll];
      $.UserName = decodeURIComponent(ll11Ii.getCookieValue(IiIi1I, "pt_pin"));
      $.UA = ll11Ii.genUA($.UserName);
      $.message = ll11Il.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 7){console.log(`\n【访问接口次数达到6次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      await i11iI();
      if ($.outFlag || $.runEnd) break;
    }
    const IliIi1 = ll11Il.getMessage();
    IliIi1 && (console.log("\n📣 运行结果\n" + IliIi1.replace(/：/g, " ➜ ")), ii1i1I && (ll11Il.updateContent(ll11Il.content + ("\n【活动地址】：" + $.activityUrl)), await ll11Il.push()));
  } else {
    console.log("当前为并发模式：已设置最大并发线程数 " + iillIl);
    for (let Iii1li = 0; Iii1li < 1; Iii1li++) {
      $.index = Iii1li + 1;
      IiIi1I = iliI1[Iii1li];
      iii11 = iliI1[Iii1li];
      $.UserName = decodeURIComponent(ll11Ii.getCookieValue(IiIi1I, "pt_pin"));
      $.UA = ll11Ii.genUA($.UserName);
      $.message = ll11Il.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 7){console.log(`\n【访问接口次数达到6次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      await i11iI();
      if ($.outFlag || $.runEnd) break;
    }
    !$.outFlag && !$.runEnd && (iliI1.shift(), console.log(""), await lIiII(iliI1, iillIl));
    const liIIiI = ll11Il.getMessage();
    liIIiI && ii1i1I && (ll11Il.updateContent(ll11Il.content + ("\n【活动地址】：" + $.activityUrl)), await ll11Il.push());
  }
})().catch(i11i1 => $.logErr(i11i1)).finally(() => $.done());
async function i11iI() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.secretPin = "";
    $.LZ_AES_PIN = "";
    iillIi = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    await ii1i1l($.activityUrl);
    await $.wait(500);
    if ($.outFlag) return;
    if ($.index === 1) {
      await ii1i1i("getSimpleActInfoVo");
      if (!$.venderId) {
        $.runEnd = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
    }
    $.token = await i11lI(iii11, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      $.index === 1 && ($.runEnd = true);
      return;
    }
    await ii1i1i("getMyPing");
    if ($.runEnd || $.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      $.index === 1 && ($.runEnd = true);
      return;
    }
    $.LZ_AES_PIN = ll11Ii.getCookieValue(iillIi, "LZ_AES_PIN");
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    switch ($.activityMode) {
      case "lzkj":
        await ii1i1i("accessLogWithAD");
        break;
      case "cjhy":
        await ii1i1i("accessLog");
        break;
    }
    $.activityMode === "cjhy" ? await $.wait(500) : await $.wait(200);
    if (iliII) {
      switch ($.activityMode) {
        case "lzkj":
          await ii1i1i("getActMemberInfo");
          break;
        case "cjhy":
          await ii1i1i("getOpenCardInfo");
          break;
      }
      if ($.outFlag) return;
      if (!$.isMember) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let l1IlIl = 0; l1IlIl < Array(3).length; l1IlIl++) {
          if (l1IlIl > 0) console.log("第" + l1IlIl + "次 重新入会");
          await iillII();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
            break;
          }
        }
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
          console.log("❌ 入会失败");
          $.skipRun = true;
          if ($.index === 1) {
            $.runEnd = true;
            return;
          }
        }
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    if ($.index === 1) {
      await ii1i1i("activityContent");
      if ($.runEnd || $.outFlag) return;
      if (!$.active) {
        console.log("未能获取到活动信息！");
        $.message.fix("未能获取到活动信息");
        return;
      }
      if ($.actStatus === 0) {
        console.log("活动将在 " + $.active.startTimeStr + " 开始，晚点再来吧~");
        $.message.fix("活动尚未进行，将于 " + $.active.startTimeStr + " 开始");
        $.runEnd = true;
        return;
      }
      $.membersPinArray = [];
      const llli11 = $.successRetList || [],
        Ili11l = $.list || [];
      let I1lill = "",
        I1lili = "";
      switch ($.active.prizeType) {
        case 6:
          I1lill = "京豆";
          I1lili = "🐶";
          break;
        case 9:
          I1lill = "积分";
          I1lili = "🎟️";
          break;
        default:
          I1lill = "未知";
          I1lili = "❓";
      }
      await ii1i1i("shopInfo");
      const i11Iil = ($.shopName && "店铺名称：" + $.shopName + "\n") + "开始时间：" + $.active.startTimeStr + "\n结束时间：" + $.active.endTimeStr + "\n奖品类型：" + I1lill + " " + I1lili + "\n总计奖池：" + $.active.sendNumbers + "\n可组队伍：" + $.active.maxGroup + " 🚗\n瓜分数量：" + 5 * $.active.prizeNumbers + " " + I1lili + "\n队长奖励：" + $.active.extraPrizeNumbers + " " + I1lili + "\n成员获得：" + $.active.prizeNumbers + " " + I1lili + "\n最高可得：" + ($.active.maxGroup * ($.active.extraPrizeNumbers + $.active.prizeNumbers) + $.active.prizeNumbers) + " " + I1lili + "\n";
      console.log(i11Iil);
      ll11Il.updateContent(ll11Il.content + ("\n" + i11Iil));
      if ($.actStatus === -1) {
        console.log("活动已于 " + $.active.startTimeStr + " 结束，下次早点来吧~");
        $.message.fix("活动已于 " + $.active.startTimeStr + " 结束");
        $.runEnd = true;
        return;
      }
      if ($.successRetList.length === $.active.maxGroup) {
        console.log("活动创建队伍已达到上限且成员已满");
        $.message.fix("活动创建队伍已达到上限且成员已满");
        $.runEnd = true;
        return;
      }
      const i11Iii = $.active.maxGroup * 4;
      if ($.signUuid) {
        $.captainUuid = $.signUuid;
        console.log("已经是队长了，队伍ID：" + $.captainUuid);
        $.message.fix("已是队长");
        llli11.length > 0 && llli11.forEach(Il1iI1 => {
          const IIIllI = Il1iI1?.["memberList"] || [];
          IIIllI.forEach(Ill1Ii => {
            Ill1Ii?.["pin"] !== $.secretPin && $.membersPinArray.push(Ill1Ii?.["pin"]);
          });
        });
        Ili11l.length > 1 && Ili11l.forEach(iIIII => {
          iIIII?.["pin"] !== $.secretPin && $.membersPinArray.push(iIIII?.["pin"]);
        });
        $.canJoinMembers = i11Iii - $.membersPinArray.length;
      } else {
        if ($.canCreate) {
          await ii1i1i("saveCaptain");
          if ($.runEnd || $.outFlag) return;
          $.canJoinMembers = i11Iii;
        } else {
          console.log("未知用户场景");
          $.message.fix("未知用户场景");
          $.runEnd = true;
          return;
        }
      }
    } else {
      if ($.membersPinArray.length > 0 && $.membersPinArray.includes($.secretPin)) {
        console.log("已经是此队的成员了，跳过");
        $.message.fix("已是此队成员");
        return;
      }
      await ii1i1i("saveMember");
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
  } catch (Iii1ii) {
    console.log("❌ 脚本运行遇到了错误\n" + Iii1ii);
  }
}
async function lIiII(l1iiI1, Iii1il) {
  let Ii1Ii = false,
    Il1iIl = 0,
    lIi1ll = 0;
  async function l1IIiI(lIi1l, iIIIii) {
    async function I1iiIi() {
      return new Promise(IIlIIl => {
        let lI1iI1 = {
          "url": $.activityUrl,
          "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": $.activityUrl,
            "User-Agent": liliII
          },
          "timeout": 30000
        };
        $.get(lI1iI1, (iIIIi1, lIiIiI, ilIliI) => {
          try {
            lIiIiI.status == 200 ? IIlIIl(ll11Ii.getResponseCookie(lIiIiI, I1IIil)) : IIlIIl(null);
          } catch (II1li) {
            IIlIIl(null);
          }
        });
      });
    }
    async function li1i1(Ii1lIi) {
      const ll1lII = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
      let Ii1lIl = "",
        iIIIiI = "",
        li1iI = "POST";
      switch (Ii1lIi) {
        case "getMyPing":
          Ii1lIl = $.baseUrl + "/customer/getMyPing";
          iIIIiI = "token=" + iIiiII + "&fromType=APP&userId=" + $.venderId;
          break;
        case "saveMember":
          Ii1lIl = $.baseUrl + "/wxTeam/saveMember";
          iIIIiI = "activityId=" + $.activityId + "&pin=" + I1IIii + "&pinImg=" + encodeURIComponent(ll1lII) + "&signUuid=" + $.captainUuid;
          break;
      }
      const I1IIi1 = {
          "url": Ii1lIl,
          "headers": {
            "Origin": $.origin,
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": I1IIil,
            "User-Agent": $.UA,
            "X-Requested-With": "XMLHttpRequest",
            "Referer": $.activityUrl
          },
          "body": iIIIiI,
          "timeout": 30000
        },
        {
          err: ll1lI1,
          res: II1ll,
          data: liii11
        } = await IiIi11(I1IIi1, li1iI);
      if (ll1lI1) typeof ll1lI1 === "string" && ll1lI1.includes("Timeout awaiting 'request'") ? (lastErrorMsg = Ii1lIi + " 请求超时，请检查网络重试", lI1iIl.fix("请求超时")) : lI1iIl.fix("请求失败 " + ll1lI1.message);else {
        Ii1lIi === "getMyPing" && (I1IIil = ll11Ii.getResponseCookie(II1ll, iillIi));
        try {
          const ll1Iii = JSON.parse(liii11);
          switch (Ii1lIi) {
            case "getMyPing":
              if (ll1Iii.result === true && ll1Iii.data) {
                if (ll1Iii.data?.["secretPin"]) ilIll1 = ll1Iii.data.secretPin;
              } else ll1Iii.errorMessage && lI1iIl.fix(Ii1lIi + " " + ll1Iii.errorMessage);
              break;
            case "saveMember":
              if (ll1Iii.result === true && ll1Iii.data) {
                lI1iIl.fix("加入队伍成功");
                $.canJoinMembers -= 1;
                if ($.canJoinMembers <= 0) {
                  console.log("战队已满，运行完毕");
                  Ii1Ii = true;
                }
              } else {
                if (ll1Iii.errorMessage) {
                  lI1iIl.fix(ll1Iii.errorMessage);
                  for (let lIi11l of ["未开始", "结束", "不存在", "不在"]) {
                    if (ll1Iii.errorMessage.includes(lIi11l)) {
                      Ii1Ii = true;
                      break;
                    }
                  }
                }
              }
              break;
          }
        } catch (IIlIIi) {
          lI1iIl.fix("❌ 未能正确处理 " + Ii1lIi + " 请求响应 " + (IIlIIi.message || IIlIIi));
        }
      }
    }
    const I1iiIl = decodeURIComponent(ll11Ii.getCookieValue(lIi1l, "pt_pin")),
      liliII = ll11Ii.genUA(I1iiIl),
      lI1iIl = ll11Il.create(iIIIii, I1iiIl);
    let iIiiII = "",
      ilIll1 = "",
      I1IIil = "",
      I1IIii = "";
    I1IIil = await I1iiIi();
    if (!I1IIil) lI1iIl.fix("获取[LZ_COOKIE]失败");else {
      iIiiII = await i11lI(lIi1l, $.baseUrl);
      if (!iIiiII) lI1iIl.fix("获取[Token]失败");else {
        await li1i1("getMyPing");
        if (!ilIll1) lI1iIl.fix("未能获取用户鉴权信息");else {
          if ($.membersPinArray.length > 0 && $.membersPinArray.includes(ilIll1)) lI1iIl.fix("已是此队成员");else {
            switch ($.activityMode) {
              case "lzkj":
                I1IIii = encodeURIComponent(ilIll1);
                break;
              case "cjhy":
                I1IIii = encodeURIComponent(encodeURIComponent(ilIll1));
                break;
            }
            await li1i1("saveMember");
          }
        }
      }
    }
    console.log(lI1iIl.getInlineContent());
    Il1iIl--;
    IlilIi();
  }
  async function IlilIi() {
    while (Il1iIl < Iii1il && l1iiI1.length > 0 && !Ii1Ii) {
      const Ii1Il1 = l1iiI1.shift();
      Il1iIl++;
      lIi1ll++;
      await l1IIiI(Ii1Il1, lIi1ll);
    }
    Ii1Ii && (await new Promise(iIIIli => {
      const I1IIll = setInterval(() => {
        Il1iIl === 0 && (clearInterval(I1IIll), iIIIli());
      }, 100);
    }));
  }
  const I1lilI = Math.min(l1iiI1.length, Iii1il),
    i11IiI = [];
  for (let ilIlli = 0; ilIlli < I1lilI; ilIlli++) {
    const ilIlll = l1iiI1.shift();
    Il1iIl++;
    lIi1ll++;
    i11IiI.push(l1IIiI(ilIlll, lIi1ll));
  }
  await Promise.all(i11IiI);
  IlilIi();
  await new Promise(Ii1Iii => {
    const ll1IiI = setInterval(() => {
      (Il1iIl === 0 || Ii1Ii) && (clearInterval(ll1IiI), Ii1Iii());
    }, 100);
  });
  console.log("\n并发运行完毕");
}
async function l1lii1(iliii1, i1IiI) {
  try {
    switch (iliii1) {
      case "getMyPing":
        if (i1IiI.result === true && i1IiI.data) {
          $.secretPin = i1IiI.data?.["secretPin"];
          $.nickname = i1IiI.data?.["nickname"];
        } else i1IiI.errorMessage ? (console.log(iliii1 + " " + i1IiI.errorMessage), $.index === 1 && ($.runEnd = true)) : (console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI)), $.index === 1 && ($.runEnd = true));
        break;
      case "getSimpleActInfoVo":
        if (i1IiI.result === true && i1IiI.data) {
          $.venderId = i1IiI.data?.["venderId"];
          $.activityType = i1IiI.data?.["activityType"];
        } else i1IiI.errorMessage ? console.log(iliii1 + " " + i1IiI.errorMessage) : console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI));
        break;
      case "getActMemberInfo":
        if (i1IiI.result === true && i1IiI.data) $.isMember = i1IiI.data.openCard || false;else i1IiI.errorMessage ? console.log(iliii1 + " " + i1IiI.errorMessage) : console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI));
      case "getOpenCardInfo":
        if (i1IiI.result === true && i1IiI.data) $.isMember = i1IiI.data.openedCard || false;else i1IiI.errorMessage ? console.log(iliii1 + " " + i1IiI.errorMessage) : console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI));
        break;
      case "activityContent":
        if (i1IiI.result === true && i1IiI.data) {
          $.actStatus = i1IiI.data?.["actStatus"];
          $.active = i1IiI.data?.["active"];
          $.list = i1IiI.data?.["list"];
          $.successRetList = i1IiI.data?.["successRetList"];
          $.signUuid = i1IiI.data?.["signUuid"];
          $.canCreate = i1IiI.data?.["canCreate"];
          $.canJoin = i1IiI.data?.["canJoin"];
        } else {
          if (i1IiI.errorMessage) {
            for (let I1I111 of ["未开始", "结束", "不存在", "不在"]) {
              if (i1IiI.errorMessage.includes(I1I111)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(iliii1 + " " + i1IiI.errorMessage);
          } else {
            console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI));
          }
        }
        break;
      case "shopInfo":
        if (i1IiI.result === true && i1IiI.data) $.shopName = i1IiI.data?.["shopName"];else i1IiI.errorMessage ? console.log("" + (i1IiI.errorMessage || "")) : console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI));
        break;
      case "saveCaptain":
        if (i1IiI.result === true && i1IiI.data) {
          $.captainUuid = i1IiI.data.signUuid;
          console.log("创建队伍成功");
          $.message.fix("创建队伍成功");
        } else i1IiI.errorMessage ? (console.log("" + i1IiI.errorMessage), $.message.fix(i1IiI.errorMessage), $.runEnd = true) : (console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI)), $.runEnd = true);
        break;
      case "saveMember":
        if (i1IiI.result === true && i1IiI.data) {
          console.log("加入队伍成功");
          $.message.fix("加入队伍成功");
          $.canJoinMembers -= 1;
          $.canJoinMembers <= 0 && (console.log("战队已满，运行完毕"), $.runEnd = true);
        } else {
          if (i1IiI.errorMessage) {
            console.log("" + i1IiI.errorMessage);
            $.message.fix(i1IiI.errorMessage);
            for (let Ili1il of ["未开始", "结束", "不存在", "不在"]) {
              if (i1IiI.errorMessage.includes(Ili1il)) {
                $.runEnd = true;
                break;
              }
            }
          } else console.log("❓" + iliii1 + " " + JSON.stringify(i1IiI));
        }
        break;
    }
  } catch (i1lII) {
    console.log("❌ 未能正确处理 " + iliii1 + " 请求响应 " + (i1lII.message || i1lII));
  }
}
async function ii1i1i(iII111) {
  if ($.runEnd || $.outFlag) return;
  const lIiIil = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  let llIiii = "",
    IlII = "",
    IiIili = "POST";
  switch (iII111) {
    case "getMyPing":
      llIiii = $.baseUrl + "/customer/getMyPing";
      IlII = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      llIiii = $.baseUrl + "/customer/getSimpleActInfoVo";
      IlII = "activityId=" + $.activityId;
      break;
    case "accessLog":
      llIiii = $.baseUrl + "/common/accessLog";
      IlII = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      llIiii = $.baseUrl + "/common/accessLogWithAD";
      IlII = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
      break;
    case "getActMemberInfo":
      llIiii = $.baseUrl + "/wxCommonInfo/getActMemberInfo";
      IlII = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
      break;
    case "getOpenCardInfo":
      llIiii = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      IlII = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
      break;
    case "activityContent":
      llIiii = $.baseUrl + "/wxTeam/activityContent";
      IlII = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&signUuid=";
      break;
    case "shopInfo":
      llIiii = $.baseUrl + "/wxTeam/shopInfo";
      IlII = "activityId=" + $.activityId;
      break;
    case "saveCaptain":
      llIiii = $.baseUrl + "/wxTeam/saveCaptain";
      IlII = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent(lIiIil);
      break;
    case "saveMember":
      llIiii = $.baseUrl + "/wxTeam/saveMember";
      IlII = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&pinImg=" + encodeURIComponent(lIiIil) + "&signUuid=" + $.captainUuid;
      break;
    default:
      console.log("❌ 未知请求 " + iII111);
      return;
  }
  const llIiil = {
      "url": llIiii,
      "headers": {
        "Origin": $.origin,
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": iillIi,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest",
        "Referer": $.activityUrl
      },
      "body": IlII,
      "timeout": 30000
    },
    IlIi11 = 5;
  let l1ll1l = 0,
    III1iI = null;
  while (l1ll1l < IlIi11) {
    l1ll1l > 0 && (await $.wait(1000));
    const {
      err: I1IlIi,
      res: l1ll1i,
      data: IiIil1
    } = await IiIi11(llIiil, IiIili);
    if (I1IlIi) {
      if (typeof I1IlIi === "string" && I1IlIi.includes("Timeout awaiting 'request'")) III1iI = iII111 + " 请求超时，请检查网络重试";else {
        const i111l = l1ll1i?.["statusCode"];
        if (i111l) {
          if ([403, 493].includes(i111l)) III1iI = iII111 + " 请求失败，IP已被限制（Response code " + i111l + "）";else [400, 404].includes(i111l) ? III1iI = iII111 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + i111l + "）" : III1iI = iII111 + " 请求失败（Response code " + i111l + "）";
        } else III1iI = iII111 + " API请求失败 => " + (I1IlIi.message || I1IlIi);
        console.log(III1iI);
      }
      l1ll1l++;
    } else {
      if (iII111 === "getMyPing") {
        iillIi = ll11Ii.getResponseCookie(l1ll1i, iillIi);
        const i111i = ll11Ii.getCookieValue(iillIi, "LZ_AES_PIN");
        i111i ? $.LZ_AES_PIN = i111i : $.LZ_AES_PIN && (iillIi += ";LZ_AES_PIN=" + $.LZ_AES_PIN);
      }
      if (!["accessLog", "accessLogWithAD"].includes(iII111)) try {
        const lIlli1 = JSON.parse(IiIil1);
        l1lii1(iII111, lIlli1);
        break;
      } catch (llIii1) {
        III1iI = "🚫 API请求失败，" + iII111 + " 接口响应数据解析失败: " + llIii1.message;
        console.log(String(IiIil1));
        l1ll1l++;
      } else break;
    }
  }
  l1ll1l >= IlIi11 && ($.outFlag = true, console.log(III1iI), $.message && $.message.fix("ip已被限制"));
}
async function IiIi11(I1IlII, l1III = "POST") {
  if (l1III === "POST") return new Promise(async IlIi => {
    $.post(I1IlII, (IlIl, IiII1, l1IIi) => {
      IlIi({
        "err": IlIl,
        "res": IiII1,
        "data": l1IIi
      });
    });
  });else {
    if (l1III === "GET") {
      return new Promise(async l1IIl => {
        $.get(I1IlII, (i1111, iIIlII, IlIi1l) => {
          l1IIl({
            "err": i1111,
            "res": iIIlII,
            "data": IlIi1l
          });
        });
      });
    } else {
      const lIllii = "不支持的请求方法";
      return {
        "err": lIllii,
        "res": null,
        "data": null
      };
    }
  }
}
function ii1i1l(l1il1) {
  return $.skipRun = true, new Promise(l1iiil => {
    let l1ilI = {
      "url": l1il1,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": l1il1,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1ilI, async (IIi1, illl1i, l1iiii) => {
      try {
        IIi1 ? (illl1i && typeof illl1i.statusCode != "undefined" && illl1i.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true), console.log(String(IIi1)), console.log("getFirstLZCK 请求失败，请检查网路重试")) : (l1iiii.match(/(活动已经结束)/) && l1iiii.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束")), illl1i.status == 200 && (iillIi = ll11Ii.getResponseCookie(illl1i, iillIi), $.skipRun = false));
      } catch (Il11I) {
        $.logErr(Il11I, illl1i);
      } finally {
        l1iiil();
      }
    });
  });
}
async function iillII() {
  if (!$.joinVenderId) return;
  return new Promise(async Iil1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiiIlI = "";
    if ($.shopactivityId) iiiIlI = ",\"activityId\":" + $.shopactivityId;
    const I1i11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiiIlI + ",\"channel\":406}",
      Ill1ii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1i11)
      },
      IllII = await Illl1("8adfb", Ill1ii),
      Ill1il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + I1i11 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IllII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iii11,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ill1il, async (IIlI, I1i1l, llIiIi) => {
      try {
        llIiIi = llIiIi && llIiIi.match(/jsonp_.*?\((.*?)\);/) && llIiIi.match(/jsonp_.*?\((.*?)\);/)[1] || llIiIi;
        let llIiIl = $.toObj(llIiIi, llIiIi);
        if (llIiIl && typeof llIiIl == "object") {
          if (llIiIl && llIiIl.success === true) {
            console.log(llIiIl.message);
            $.errorJoinShop = llIiIl.message;
            if (llIiIl.result && llIiIl.result.giftInfo) {
              for (let I1i1i of llIiIl.result.giftInfo.giftList) {
                console.log("入会获得: " + I1i1i.discountString + I1i1i.prizeName + I1i1i.secondLineDesc);
              }
            }
            console.log("");
          } else llIiIl && typeof llIiIl == "object" && llIiIl.message ? ($.errorJoinShop = llIiIl.message, console.log("" + (llIiIl.message || ""))) : console.log(llIiIi);
        } else console.log(llIiIi);
      } catch (l1iilI) {
        $.logErr(l1iilI, I1i1l);
      } finally {
        Iil1I();
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
