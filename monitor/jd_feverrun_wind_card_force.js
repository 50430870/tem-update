/*
入会开卡领取礼包
有豆子的时候， 再入会。
使用环境变量 VENDER_ID 提供 venderid，多个用&连接

export VENDER_ID="xxx"           入会店铺id
export OPENCARD_BEAN="xxx"       最低多少豆入会

cron "2 2 29 2 *" jd_card_force.js
*/

const $ = new Env('入会开卡领取礼包');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';


var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxf226a=["\x56\x45\x4E\x44\x45\x52\x5F\x49\x44","\x65\x6E\x76","","\x4F\x50\x45\x4E\x43\x41\x52\x44\x5F\x42\x45\x41\x4E","\x31\x30","\x6A\x64\x61\x70\x70\x3B\x61\x6E\x64\x72\x6F\x69\x64\x3B\x31\x31\x2E\x31\x2E\x34\x3B\x6A\x64\x53\x75\x70\x70\x6F\x72\x74\x44\x61\x72\x6B\x4D\x6F\x64\x65\x2F\x30\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x4C\x69\x6E\x75\x78\x3B\x20\x41\x6E\x64\x72\x6F\x69\x64\x20\x31\x30\x3B\x20\x50\x43\x43\x4D\x30\x30\x20\x42\x75\x69\x6C\x64\x2F\x51\x4B\x51\x31\x2E\x31\x39\x31\x30\x32\x31\x2E\x30\x30\x32\x3B\x20\x77\x76\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x35\x33\x37\x2E\x33\x36\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x56\x65\x72\x73\x69\x6F\x6E\x2F\x34\x2E\x30\x20\x43\x68\x72\x6F\x6D\x65\x2F\x38\x39\x2E\x30\x2E\x34\x33\x38\x39\x2E\x37\x32\x20\x4D\x51\x51\x42\x72\x6F\x77\x73\x65\x72\x2F\x36\x2E\x32\x20\x54\x42\x53\x2F\x30\x34\x36\x30\x31\x31\x20\x4D\x6F\x62\x69\x6C\x65\x20\x53\x61\x66\x61\x72\x69\x2F\x35\x33\x37\x2E\x33\x36","\x6A\x64\x61\x70\x70\x3B\x61\x6E\x64\x72\x6F\x69\x64\x3B\x31\x31\x2E\x32\x2E\x34\x3B\x6A\x64\x53\x75\x70\x70\x6F\x72\x74\x44\x61\x72\x6B\x4D\x6F\x64\x65\x2F\x30\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x4C\x69\x6E\x75\x78\x3B\x20\x41\x6E\x64\x72\x6F\x69\x64\x20\x31\x30\x3B\x20\x50\x43\x43\x4D\x30\x30\x20\x42\x75\x69\x6C\x64\x2F\x51\x4B\x51\x31\x2E\x31\x39\x31\x30\x32\x31\x2E\x30\x30\x32\x3B\x20\x77\x76\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x35\x33\x37\x2E\x33\x36\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x56\x65\x72\x73\x69\x6F\x6E\x2F\x34\x2E\x30\x20\x43\x68\x72\x6F\x6D\x65\x2F\x38\x39\x2E\x30\x2E\x34\x33\x38\x39\x2E\x37\x32\x20\x4D\x51\x51\x42\x72\x6F\x77\x73\x65\x72\x2F\x36\x2E\x32\x20\x54\x42\x53\x2F\x30\x34\x36\x30\x31\x31\x20\x4D\x6F\x62\x69\x6C\x65\x20\x53\x61\x66\x61\x72\x69\x2F\x35\x33\x37\x2E\x33\x36","\x68\x74\x74\x70\x3A\x2F\x2F\x68\x7A\x2E\x66\x65\x76\x65\x72\x72\x75\x6E\x2E\x74\x6F\x70\x3A\x39\x39\x2F\x73\x68\x61\x72\x65\x2F\x63\x61\x72\x64\x2F\x67\x65\x74\x54\x6F\x6B\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x68\x7A\x2E\x66\x65\x76\x65\x72\x72\x75\x6E\x2E\x74\x6F\x70\x3A\x39\x39\x2F\x73\x68\x61\x72\x65\x2F\x63\x61\x72\x64\x2F\x67\x65\x74\x43\x61\x72\x64","\x69\x73\x4E\x6F\x64\x65","\x70\x75\x73\x68","\x66\x6F\x72\x45\x61\x63\x68","\x6B\x65\x79\x73","\x4A\x44\x5F\x44\x45\x42\x55\x47","\x66\x61\x6C\x73\x65","\x6C\x6F\x67","\x66\x69\x6C\x74\x65\x72","\x43\x6F\x6F\x6B\x69\x65\x4A\x44","\x67\x65\x74\x64\x61\x74\x61","\x43\x6F\x6F\x6B\x69\x65\x4A\x44\x32","\x63\x6F\x6F\x6B\x69\x65","\x6D\x61\x70","\x43\x6F\x6F\x6B\x69\x65\x73\x4A\x44","\x5B\x5D","\x64\x6F\x6E\x65","\x66\x69\x6E\x61\x6C\x6C\x79","\x6C\x6F\x67\x45\x72\x72","\x63\x61\x74\x63\x68","\x6E\x61\x6D\x65","\u3010\u63D0\u793A\u3011\u8BF7\u5148\u83B7\u53D6\x63\x6F\x6F\x6B\x69\x65\x0A\u76F4\u63A5\u4F7F\u7528\x4E\x6F\x62\x79\x44\x61\u7684\u4EAC\u4E1C\u7B7E\u5230\u83B7\u53D6","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x62\x65\x61\x6E\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F","\x6D\x73\x67","\x6C\x65\x6E\x67\x74\x68","\x55\x73\x65\x72\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x69\x6E\x64\x65\x78","\x6E\x69\x63\x6B\x4E\x61\x6D\x65","\x2A\x2A\x2A\x2A\x2A\x2A\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7","\u3011","\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x2A","\x72\x61\x6E\x64\x6F\x6D","\x77\x61\x69\x74","\x26","\x73\x70\x6C\x69\x74","\x6A\x6F\x69\x6E\x56\x65\x6E\x64\x65\x72\x49\x64","\x76\x65\x6E\x64\x65\x72\x49\x64","\x65\x72\x72\x6F\x72\x4A\x6F\x69\x6E\x53\x68\x6F\x70","\u6D3B\u52A8\u592A\u706B\u7206\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5","\x69\x6E\x64\x65\x78\x4F\x66","\u52A0\u5165\u5E97\u94FA\u4F1A\u5458\u5931\u8D25","\u7B2C\x31\u6B21\u91CD\u8BD5","\u7B2C\x32\u6B21\u91CD\u8BD5","\x55\x41","\x6A\x64\x61\x70\x70\x3B\x69\x50\x68\x6F\x6E\x65\x3B\x31\x30\x2E\x34\x2E\x36\x3B\x31\x33\x2E\x31\x2E\x32\x3B","\x3B\x6E\x65\x74\x77\x6F\x72\x6B\x2F\x77\x69\x66\x69\x3B\x6D\x6F\x64\x65\x6C\x2F\x69\x50\x68\x6F\x6E\x65\x38\x2C\x31\x3B\x61\x64\x64\x72\x65\x73\x73\x69\x64\x2F\x32\x33\x30\x38\x34\x36\x30\x36\x31\x31\x3B\x61\x70\x70\x42\x75\x69\x6C\x64\x2F\x31\x36\x37\x38\x31\x34\x3B\x6A\x64\x53\x75\x70\x70\x6F\x72\x74\x44\x61\x72\x6B\x4D\x6F\x64\x65\x2F\x30\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x33\x5F\x31\x5F\x32\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x3B\x73\x75\x70\x70\x6F\x72\x74\x4A\x44\x53\x48\x57\x4B\x2F\x31","\x61\x62\x63\x64\x65\x66\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39","\x66\x6C\x6F\x6F\x72","\x63\x68\x61\x72\x41\x74","\x73\x68\x6F\x70\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64","\x6F\x70\x65\x6E\x43\x61\x72\x64\x53\x74\x61\x74\x75\x73","\x6F\x70\x65\x6E\x43\x61\x72\x64\x42\x65\x61\x6E","\x2C\x22\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x22\x3A","\u5DF2\u5165\u4F1A","\u5165\u4F1A\u9001\u3010","\u3011\u8C46\u5C11\u4E8E\u3010","\u8C46\u3011\x2C\u4E0D\u5165\u4F1A","\u53BB\u5F00\u5361\x3A\x20","\x7B\x22\x76\x65\x6E\x64\x65\x72\x49\x64\x22\x3A\x22","\x22\x2C\x22\x73\x68\x6F\x70\x49\x64\x22\x3A\x22","\x22\x2C\x22\x62\x69\x6E\x64\x42\x79\x56\x65\x72\x69\x66\x79\x43\x6F\x64\x65\x46\x6C\x61\x67\x22\x3A\x31\x2C\x22\x72\x65\x67\x69\x73\x74\x65\x72\x45\x78\x74\x65\x6E\x64\x22\x3A\x7B\x7D\x2C\x22\x77\x72\x69\x74\x65\x43\x68\x69\x6C\x64\x46\x6C\x61\x67\x22\x3A\x30\x2C\x22\x63\x68\x61\x6E\x6E\x65\x6C\x22\x3A\x34\x30\x36\x7D","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E\x3F\x61\x70\x70\x69\x64\x3D\x6A\x64\x5F\x73\x68\x6F\x70\x5F\x6D\x65\x6D\x62\x65\x72\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x62\x69\x6E\x64\x57\x69\x74\x68\x56\x65\x6E\x64\x65\x72\x26\x62\x6F\x64\x79\x3D","\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x39\x2E\x32\x2E\x30\x26\x63\x6C\x69\x65\x6E\x74\x3D\x48\x35\x26\x75\x75\x69\x64\x3D\x38\x38\x38\x38\x38\x26\x68\x35\x73\x74\x3D","\x74\x65\x78\x74\x2F\x70\x6C\x61\x69\x6E\x3B\x20\x43\x68\x61\x72\x73\x65\x74\x3D\x55\x54\x46\x2D\x38","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x2A\x2F\x2A","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x74\x6F\x4F\x62\x6A","\x6F\x62\x6A\x65\x63\x74","\x73\x75\x63\x63\x65\x73\x73","\x6D\x65\x73\x73\x61\x67\x65","\x72\x65\x73\x75\x6C\x74","\x67\x69\x66\x74\x49\x6E\x66\x6F","\x67\x69\x66\x74\x4C\x69\x73\x74","\u5165\u4F1A\u83B7\u5F97\uFF1A","\x64\x69\x73\x63\x6F\x75\x6E\x74\x53\x74\x72\x69\x6E\x67","\x70\x72\x69\x7A\x65\x4E\x61\x6D\x65","\x73\x65\x63\x6F\x6E\x64\x4C\x69\x6E\x65\x44\x65\x73\x63","\x67\x65\x74","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E\x3F\x61\x70\x70\x69\x64\x3D\x6A\x64\x5F\x73\x68\x6F\x70\x5F\x6D\x65\x6D\x62\x65\x72\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x67\x65\x74\x53\x68\x6F\x70\x4F\x70\x65\x6E\x43\x61\x72\x64\x49\x6E\x66\x6F\x26\x62\x6F\x64\x79\x3D\x25\x37\x42\x25\x32\x32\x76\x65\x6E\x64\x65\x72\x49\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32","\x25\x32\x32\x25\x32\x43\x25\x32\x32\x63\x68\x61\x6E\x6E\x65\x6C\x25\x32\x32\x25\x33\x41\x34\x30\x31\x25\x37\x44\x26\x63\x6C\x69\x65\x6E\x74\x3D\x48\x35\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x39\x2E\x32\x2E\x30\x26\x75\x75\x69\x64\x3D\x38\x38\x38\x38\x38","\u4F1A\u5458\u5361\u540D\u79F0\uFF1A","\x76\x65\x6E\x64\x65\x72\x43\x61\x72\x64\x4E\x61\x6D\x65","\x73\x68\x6F\x70\x4D\x65\x6D\x62\x65\x72\x43\x61\x72\x64\x49\x6E\x66\x6F","\x69\x6E\x74\x65\x72\x65\x73\x74\x73\x52\x75\x6C\x65\x4C\x69\x73\x74","\x69\x6E\x74\x65\x72\x65\x73\x74\x73\x49\x6E\x66\x6F","\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64","\x32\x39\x33\x38\x37\x35\x30","\x73\x68\x6F\x70\x61\x63\x74\x69\x76\x69\x74\x79\x54\x79\x70\x65","\x61\x63\x74\x69\x76\x69\x74\x79\x54\x79\x70\x65","\x31\x33","\x75\x73\x65\x72\x49\x6E\x66\x6F","\u4EAC\u8C46","\x69\x6E\x63\x6C\x75\x64\x65\x73","\x73\x74\x72\x69\x6E\x67","\x70\x61\x72\x73\x65","\u8BF7\u52FF\u968F\u610F\u5728\x42\x6F\x78\x4A\x73\u8F93\u5165\u6846\u4FEE\u6539\u5185\u5BB9\x0A\u5EFA\u8BAE\u901A\u8FC7\u811A\u672C\u53BB\u83B7\u53D6\x63\x6F\x6F\x6B\x69\x65","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E\x3F\x61\x70\x70\x69\x64\x3D\x6A\x64\x5F\x73\x68\x6F\x70\x5F\x6D\x65\x6D\x62\x65\x72\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x63\x6F\x6C\x6C\x65\x63\x74\x47\x69\x66\x74\x26\x62\x6F\x64\x79\x3D","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x26\x63\x6C\x69\x65\x6E\x74\x3D\x48\x35\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x39\x2E\x32\x2E\x30\x26\x75\x75\x69\x64\x3D\x38\x38\x38\x38\x38","\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39","\x73\x6C\x69\x63\x65","\x6E\x6F\x77","\x79\x79\x79\x79\x4D\x4D\x64\x64\x68\x68\x6D\x6D\x73\x73\x53\x53\x53","\x3B\x65\x66\x37\x39\x61\x3B\x74\x6B\x30\x32\x77\x39\x39\x62\x63\x31\x62\x39\x38\x31\x38\x6E\x38\x75\x46\x68\x52\x38\x6B\x73\x33\x72\x79\x51\x57\x4D\x4F\x5A\x7A\x6A\x70\x44\x56\x43\x49\x4E\x4A\x4A\x48\x38\x61\x50\x30\x79\x32\x52\x57\x46\x4C\x69\x4A\x42\x6D\x4C\x6B\x33\x5A\x37\x6A\x39\x72\x68\x6D\x35\x63\x6A\x37\x44\x4E\x30\x77\x39\x6D\x49\x48\x65\x73\x71\x6F\x6D\x75\x30\x42\x34\x36\x68\x30\x68\x3B\x35\x61\x62\x35\x65\x66\x64\x35\x64\x63\x37\x63\x33\x64\x35\x32\x64\x64\x31\x39\x61\x38\x65\x61\x61\x62\x63\x37\x62\x63\x39\x39\x63\x31\x62\x39\x64\x62\x38\x30\x30\x61\x34\x32\x30\x38\x62\x61\x31\x31\x34\x32\x63\x38\x61\x37\x63\x37\x62\x66\x38\x35\x32\x65\x3B\x33\x2E\x30\x3B","\x3B\x31\x36\x39\x66\x31\x3B\x74\x6B\x30\x32\x77\x63\x30\x66\x39\x31\x63\x38\x61\x31\x38\x6E\x76\x57\x56\x4D\x47\x72\x51\x4F\x31\x69\x46\x6C\x70\x51\x72\x65\x32\x53\x68\x32\x6D\x47\x74\x4E\x72\x6F\x31\x6C\x30\x55\x70\x5A\x71\x47\x4C\x52\x62\x48\x69\x79\x71\x66\x61\x55\x51\x61\x50\x79\x36\x34\x57\x54\x37\x75\x7A\x37\x45\x2F\x67\x75\x6A\x47\x41\x42\x35\x30\x6B\x79\x4F\x37\x68\x77\x42\x79\x57\x4B\x3B\x37\x37\x63\x38\x61\x30\x35\x65\x36\x61\x36\x36\x66\x61\x65\x65\x64\x30\x30\x65\x34\x65\x32\x38\x30\x61\x64\x38\x63\x34\x30\x66\x61\x62\x36\x30\x37\x32\x33\x62\x35\x62\x35\x36\x31\x32\x33\x30\x33\x38\x30\x65\x62\x34\x30\x37\x65\x31\x39\x33\x35\x34\x66\x37\x3B\x33\x2E\x30\x3B","\x3B\x65\x66\x37\x39\x61\x3B\x74\x6B\x30\x32\x77\x39\x32\x36\x33\x31\x62\x66\x61\x31\x38\x6E\x68\x44\x34\x75\x62\x66\x33\x51\x66\x4E\x69\x55\x38\x45\x44\x32\x50\x49\x32\x37\x30\x79\x67\x73\x6E\x2B\x76\x61\x6D\x75\x42\x51\x68\x30\x6C\x56\x45\x36\x76\x37\x55\x41\x77\x63\x6B\x7A\x33\x73\x32\x4F\x74\x6C\x46\x45\x66\x74\x68\x35\x4C\x62\x51\x64\x57\x4F\x50\x4E\x76\x50\x45\x59\x48\x75\x55\x32\x54\x77\x3B\x30\x66\x33\x36\x64\x64\x64\x65\x66\x66\x33\x66\x38\x37\x38\x36\x36\x36\x33\x62\x35\x30\x62\x62\x33\x34\x36\x36\x35\x63\x34\x65\x39\x64\x36\x30\x38\x35\x39\x66\x38\x66\x62\x65\x38\x32\x32\x66\x62\x35\x35\x66\x64\x30\x32\x65\x64\x32\x65\x38\x34\x66\x64\x32\x3B\x33\x2E\x30\x3B","\x3B","\x46\x6F\x72\x6D\x61\x74","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x67\x65\x74\x4D\x6F\x6E\x74\x68","\x67\x65\x74\x44\x61\x74\x65","\x67\x65\x74\x48\x6F\x75\x72\x73","\x67\x65\x74\x4D\x69\x6E\x75\x74\x65\x73","\x67\x65\x74\x53\x65\x63\x6F\x6E\x64\x73","\x67\x65\x74\x44\x61\x79","\x67\x65\x74\x4D\x69\x6C\x6C\x69\x73\x65\x63\x6F\x6E\x64\x73","\x74\x65\x73\x74","\x24\x31","\x73\x75\x62\x73\x74\x72","\x67\x65\x74\x46\x75\x6C\x6C\x59\x65\x61\x72","\x63\x6F\x6E\x63\x61\x74","\x72\x65\x70\x6C\x61\x63\x65","\x29","\x28","\x53\x2B","\x30\x30\x30","\x30\x30","\x3F\x74\x79\x70\x65\x3D\x73\x7A\x78\x79\x75\x6E","\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF","\x63\x6F\x64\x65","\x64\x61\x74\x61","\x3F\x76\x65\x6E\x64\x65\x72\x69\x64\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x71\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x75\x73\x65\x72\x2F\x69\x6E\x66\x6F\x2F\x51\x75\x65\x72\x79\x4A\x44\x55\x73\x65\x72\x49\x6E\x66\x6F\x3F\x73\x63\x65\x6E\x65\x76\x61\x6C\x3D\x32","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E\x2C\x74\x65\x78\x74\x2F\x70\x6C\x61\x69\x6E\x2C\x20\x2A\x2F\x2A","\x67\x7A\x69\x70\x2C\x20\x64\x65\x66\x6C\x61\x74\x65\x2C\x20\x62\x72","\x7A\x68\x2D\x63\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x71\x73\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x6D\x79\x2F\x6A\x69\x6E\x67\x64\x6F\x75\x2F\x6D\x79\x2E\x73\x68\x74\x6D\x6C\x3F\x73\x63\x65\x6E\x65\x76\x61\x6C\x3D\x32","\x6A\x64\x61\x70\x70\x3B\x69\x50\x68\x6F\x6E\x65\x3B\x39\x2E\x34\x2E\x34\x3B\x31\x34\x2E\x33\x3B\x6E\x65\x74\x77\x6F\x72\x6B\x2F\x34\x67\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x34\x5F\x33\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x3B\x73\x75\x70\x70\x6F\x72\x74\x4A\x44\x53\x48\x57\x4B\x2F\x31","\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5","\x72\x65\x74\x63\x6F\x64\x65","\x62\x61\x73\x65","\x6E\x69\x63\x6B\x6E\x61\x6D\x65","\u4EAC\u4E1C\u670D\u52A1\u5668\u8FD4\u56DE\u7A7A\u6570\u636E","\x70\x6F\x73\x74","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];const VENDER_ID=process[__Oxf226a[0x1]][__Oxf226a[0x0]]|| __Oxf226a[0x2];const OPENCARD_BEAN=process[__Oxf226a[0x1]][__Oxf226a[0x3]]|| __Oxf226a[0x4];let cookiesArr=[],cookie=__Oxf226a[0x2];let ver1=__Oxf226a[0x5];let ver2=__Oxf226a[0x6];let url1=__Oxf226a[0x7];let url2=__Oxf226a[0x8];if($[__Oxf226a[0x9]]()){Object[__Oxf226a[0xc]](jdCookieNode)[__Oxf226a[0xb]]((_0xa3e1x9)=>{cookiesArr[__Oxf226a[0xa]](jdCookieNode[_0xa3e1x9])});if(process[__Oxf226a[0x1]][__Oxf226a[0xd]]&& process[__Oxf226a[0x1]][__Oxf226a[0xd]]=== __Oxf226a[0xe]){console[__Oxf226a[0xf]]= ()=>{}}}else {cookiesArr= [$[__Oxf226a[0x12]](__Oxf226a[0x11]),$[__Oxf226a[0x12]](__Oxf226a[0x13]),...jsonParse($[__Oxf226a[0x12]](__Oxf226a[0x16])|| __Oxf226a[0x17])[__Oxf226a[0x15]]((_0xa3e1x9)=>{return _0xa3e1x9[__Oxf226a[0x14]]})][__Oxf226a[0x10]]((_0xa3e1x9)=>{return !!_0xa3e1x9})};allMessage= __Oxf226a[0x2];message= __Oxf226a[0x2];!(async ()=>{if(!cookiesArr[0x0]){$[__Oxf226a[0x1f]]($[__Oxf226a[0x1c]],__Oxf226a[0x1d],__Oxf226a[0x1e],{"\x6F\x70\x65\x6E\x2D\x75\x72\x6C":__Oxf226a[0x1e]});return};for(let _0xa3e1xb=0;_0xa3e1xb< cookiesArr[__Oxf226a[0x20]];_0xa3e1xb++){cookie= cookiesArr[_0xa3e1xb];if(cookie){$[__Oxf226a[0x21]]= decodeURIComponent(cookie[__Oxf226a[0x22]](/pt_pin=([^; ]+)(?=;?)/)&& cookie[__Oxf226a[0x22]](/pt_pin=([^; ]+)(?=;?)/)[0x1]);$[__Oxf226a[0x23]]= _0xa3e1xb+ 1;message= __Oxf226a[0x2];$[__Oxf226a[0x24]]= __Oxf226a[0x2];$[__Oxf226a[0x21]]= $[__Oxf226a[0x24]]|| $[__Oxf226a[0x21]];console[__Oxf226a[0xf]](`${__Oxf226a[0x25]}${$[__Oxf226a[0x23]]}${__Oxf226a[0x26]}${$[__Oxf226a[0x21]]}${__Oxf226a[0x27]}`); await getUA(); await run(); await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 3500+ 3000,10))}};if(allMessage){$[__Oxf226a[0x1f]]($[__Oxf226a[0x1c]],`${__Oxf226a[0x2]}`,`${__Oxf226a[0x2]}${allMessage}${__Oxf226a[0x2]}`)}})()[__Oxf226a[0x1b]]((_0xa3e1xa)=>{return $[__Oxf226a[0x1a]](_0xa3e1xa)})[__Oxf226a[0x19]](()=>{return $[__Oxf226a[0x18]]()});async function run(){try{const _0xa3e1xd=VENDER_ID[__Oxf226a[0x2b]](__Oxf226a[0x2a]);for(let _0xa3e1xb=0;_0xa3e1xb< _0xa3e1xd[__Oxf226a[0x20]];_0xa3e1xb++){$[__Oxf226a[0x2c]]= _0xa3e1xd[_0xa3e1xb];$[__Oxf226a[0x2d]]= _0xa3e1xd[_0xa3e1xb];$[__Oxf226a[0x2e]]= __Oxf226a[0x2]; await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 2500+ 500,10)); await joinShop(); await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 2500+ 2500,10));if($[__Oxf226a[0x2e]][__Oxf226a[0x30]](__Oxf226a[0x2f])>  -1|| $[__Oxf226a[0x2e]][__Oxf226a[0x30]](__Oxf226a[0x31])>  -1){console[__Oxf226a[0xf]](__Oxf226a[0x32]); await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 1500+ 1000,10)); await joinShop()};if($[__Oxf226a[0x2e]][__Oxf226a[0x30]](__Oxf226a[0x2f])>  -1|| $[__Oxf226a[0x2e]][__Oxf226a[0x30]](__Oxf226a[0x31])>  -1){console[__Oxf226a[0xf]](__Oxf226a[0x33]); await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 1500+ 1000,10)); await joinShop()}; await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 1500+ 500,10)); await collectGift(); await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 2500+ 2500,10))}}catch(e){console[__Oxf226a[0xf]](e)}}function getUA(){$[__Oxf226a[0x34]]= `${__Oxf226a[0x35]}${randomString(40)}${__Oxf226a[0x36]}`}function randomString(_0xa3e1xa){_0xa3e1xa= _0xa3e1xa|| 32;let _0xa3e1x10=__Oxf226a[0x37],_0xa3e1x11=_0xa3e1x10[__Oxf226a[0x20]],_0xa3e1x12=__Oxf226a[0x2];for(i= 0;i< _0xa3e1xa;i++){_0xa3e1x12+= _0xa3e1x10[__Oxf226a[0x39]](Math[__Oxf226a[0x38]](Math[__Oxf226a[0x28]]()* _0xa3e1x11))};return _0xa3e1x12}async function joinShop(){if(!$[__Oxf226a[0x2c]]){return};$[__Oxf226a[0x3a]]= __Oxf226a[0x2];$[__Oxf226a[0x2e]]= __Oxf226a[0x2];$[__Oxf226a[0x3b]]= false;$[__Oxf226a[0x3c]]= 0; await getshopactivityId();let _0xa3e1x14=`${__Oxf226a[0x2]}`;if($[__Oxf226a[0x3a]]){_0xa3e1x14= `${__Oxf226a[0x3d]}${$[__Oxf226a[0x3a]]}${__Oxf226a[0x2]}`};if($[__Oxf226a[0x3b]]){console[__Oxf226a[0xf]](`${__Oxf226a[0x3e]}`)}else {if($[__Oxf226a[0x3c]]< OPENCARD_BEAN){console[__Oxf226a[0xf]](`${__Oxf226a[0x3f]}${$[__Oxf226a[0x3c]]}${__Oxf226a[0x40]}${OPENCARD_BEAN}${__Oxf226a[0x41]}`)}else {console[__Oxf226a[0xf]](`${__Oxf226a[0x42]}${$[__Oxf226a[0x2c]]}${__Oxf226a[0x2]}`);body= __Oxf226a[0x43]+ $[__Oxf226a[0x2c]]+ __Oxf226a[0x44]+ $[__Oxf226a[0x2c]]+ __Oxf226a[0x45];let _0xa3e1x15=__Oxf226a[0x2];_0xa3e1x15=  await getCard($[__Oxf226a[0x2c]]);_0xa3e1x15= encodeURIComponent(_0xa3e1x15); await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 500+ 500,10));const _0xa3e1x16={url:`${__Oxf226a[0x46]}${body}${__Oxf226a[0x47]}${_0xa3e1x15}${__Oxf226a[0x2]}`,headers:{'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxf226a[0x48],'\x4F\x72\x69\x67\x69\x6E':__Oxf226a[0x49],'\x48\x6F\x73\x74':__Oxf226a[0x4a],'\x61\x63\x63\x65\x70\x74':__Oxf226a[0x4b],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':$[__Oxf226a[0x34]],'\x63\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65':__Oxf226a[0x4c],'\x43\x6F\x6F\x6B\x69\x65':cookie}}; await $[__Oxf226a[0x29]](parseInt(Math[__Oxf226a[0x28]]()* 500+ 500,10));$[__Oxf226a[0x58]](_0xa3e1x16,async (_0xa3e1x17,_0xa3e1x18,_0xa3e1x19)=>{try{let _0xa3e1x1a=$[__Oxf226a[0x4d]](_0xa3e1x19,_0xa3e1x19);if( typeof _0xa3e1x1a== __Oxf226a[0x4e]){if(_0xa3e1x1a[__Oxf226a[0x4f]]=== true){console[__Oxf226a[0xf]](_0xa3e1x1a[__Oxf226a[0x50]]);$[__Oxf226a[0x2e]]= _0xa3e1x1a[__Oxf226a[0x50]];if(_0xa3e1x1a[__Oxf226a[0x51]]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x52]]){for(let _0xa3e1xb of _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x52]][__Oxf226a[0x53]]){console[__Oxf226a[0xf]](`${__Oxf226a[0x54]}${_0xa3e1xb[__Oxf226a[0x55]]}${__Oxf226a[0x2]}${_0xa3e1xb[__Oxf226a[0x56]]}${__Oxf226a[0x2]}${_0xa3e1xb[__Oxf226a[0x57]]}${__Oxf226a[0x2]}`)}}}else {if( typeof _0xa3e1x1a== __Oxf226a[0x4e]&& _0xa3e1x1a[__Oxf226a[0x50]]){$[__Oxf226a[0x2e]]= _0xa3e1x1a[__Oxf226a[0x50]];console[__Oxf226a[0xf]](`${__Oxf226a[0x2]}${_0xa3e1x1a[__Oxf226a[0x50]]|| __Oxf226a[0x2]}${__Oxf226a[0x2]}`)}else {console[__Oxf226a[0xf]](_0xa3e1x19)}}}else {console[__Oxf226a[0xf]](_0xa3e1x19)}}catch(e){$[__Oxf226a[0x1a]](e,_0xa3e1x18)}finally{}})}}}function getshopactivityId(){return  new Promise((_0xa3e1x1c)=>{const _0xa3e1x16={url:`${__Oxf226a[0x59]}${$[__Oxf226a[0x2c]]}${__Oxf226a[0x5a]}`,headers:{'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxf226a[0x48],'\x4F\x72\x69\x67\x69\x6E':__Oxf226a[0x49],'\x48\x6F\x73\x74':__Oxf226a[0x4a],'\x61\x63\x63\x65\x70\x74':__Oxf226a[0x4b],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':$[__Oxf226a[0x34]],'\x63\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65':__Oxf226a[0x4c],'\x43\x6F\x6F\x6B\x69\x65':cookie}};$[__Oxf226a[0x58]](_0xa3e1x16,async (_0xa3e1x17,_0xa3e1x18,_0xa3e1x19)=>{try{let _0xa3e1x1a=$[__Oxf226a[0x4d]](_0xa3e1x19,_0xa3e1x19);if( typeof _0xa3e1x1a== __Oxf226a[0x4e]){if(_0xa3e1x1a[__Oxf226a[0x4f]]== true){console[__Oxf226a[0xf]](`${__Oxf226a[0x5b]}${_0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5d]][__Oxf226a[0x5c]]|| __Oxf226a[0x2]}${__Oxf226a[0x2]}`);$[__Oxf226a[0x3a]]= _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][0x0]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][0x0][__Oxf226a[0x5f]]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][0x0][__Oxf226a[0x5f]][__Oxf226a[0x60]]|| __Oxf226a[0x61];$[__Oxf226a[0x62]]= _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][0x0]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][0x0][__Oxf226a[0x5f]]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][0x0][__Oxf226a[0x5f]][__Oxf226a[0x63]]|| __Oxf226a[0x64];$[__Oxf226a[0x3b]]= _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x65]][__Oxf226a[0x3b]];if(_0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]]&& _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][__Oxf226a[0x20]]){for(let _0xa3e1xb=0;_0xa3e1xb< _0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][__Oxf226a[0x20]];_0xa3e1xb++){const _0xa3e1x9=_0xa3e1x1a[__Oxf226a[0x51]][__Oxf226a[0x5e]][_0xa3e1xb];if(_0xa3e1x9[__Oxf226a[0x56]]&& _0xa3e1x9[__Oxf226a[0x56]][__Oxf226a[0x67]](__Oxf226a[0x66])){$[__Oxf226a[0x3c]]= parseInt(_0xa3e1x9[__Oxf226a[0x55]]);break}}}}}else {console[__Oxf226a[0xf]](_0xa3e1x19)}}catch(e){$[__Oxf226a[0x1a]](e,_0xa3e1x18)}finally{_0xa3e1x1c()}})})}function jsonParse(_0xa3e1x1e){if( typeof _0xa3e1x1e== __Oxf226a[0x68]){try{return JSON[__Oxf226a[0x69]](_0xa3e1x1e)}catch(e){console[__Oxf226a[0xf]](e);$[__Oxf226a[0x1f]]($[__Oxf226a[0x1c]],__Oxf226a[0x2],__Oxf226a[0x6a]);return []}}}async function collectGift(){return  new Promise((_0xa3e1x1c)=>{body= {"\x76\x65\x6E\x64\x65\x72\x49\x64":$[__Oxf226a[0x2d]],"\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64":2979829,"\x61\x63\x74\x69\x76\x69\x74\x79\x54\x79\x70\x65":13};const _0xa3e1x16={url:`${__Oxf226a[0x6b]}${encodeURIComponent(JSON[__Oxf226a[0x6c]](body))}${__Oxf226a[0x6d]}`,headers:{'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxf226a[0x48],'\x4F\x72\x69\x67\x69\x6E':__Oxf226a[0x49],'\x48\x6F\x73\x74':__Oxf226a[0x4a],'\x61\x63\x63\x65\x70\x74':__Oxf226a[0x4b],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':$[__Oxf226a[0x34]],'\x63\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65':__Oxf226a[0x4c],'\x43\x6F\x6F\x6B\x69\x65':cookie}};$[__Oxf226a[0x58]](_0xa3e1x16,async (_0xa3e1x17,_0xa3e1x18,_0xa3e1x19)=>{try{console[__Oxf226a[0xf]](_0xa3e1x19)}catch(e){$[__Oxf226a[0x1a]](e,_0xa3e1x18)}finally{_0xa3e1x1c()}})})}function generateFp(){let _0xa3e1xa=__Oxf226a[0x6e];let _0xa3e1x11=13;let _0xa3e1xb=__Oxf226a[0x2];for(;_0xa3e1x11--;){_0xa3e1xb+= _0xa3e1xa[Math[__Oxf226a[0x28]]()* _0xa3e1xa[__Oxf226a[0x20]]| 0]};return (_0xa3e1xb+ Date[__Oxf226a[0x70]]())[__Oxf226a[0x6f]](0,16)}function geth5st(){let _0xa3e1x22=Date[__Oxf226a[0x70]]();let _0xa3e1x23=generateFp();let _0xa3e1x24= new Date(_0xa3e1x22).Format(__Oxf226a[0x71]);let _0xa3e1x25=__Oxf226a[0x2];let _0xa3e1x26=__Oxf226a[0x2];let _0xa3e1x27=[__Oxf226a[0x72],__Oxf226a[0x73],__Oxf226a[0x74]];let _0xa3e1x28=_0xa3e1x27[random(0,_0xa3e1x27[__Oxf226a[0x20]])];return encodeURIComponent(_0xa3e1x24+ __Oxf226a[0x75]+ _0xa3e1x28+ _0xa3e1x23+ __Oxf226a[0x2]+ Date[__Oxf226a[0x70]]())}function getH5st(){let _0xa3e1x22=Date[__Oxf226a[0x70]]();let _0xa3e1x23=generateFp();let _0xa3e1x24= new Date(_0xa3e1x22).Format(__Oxf226a[0x71]);return encodeURIComponent(_0xa3e1x24+ __Oxf226a[0x75]+ __Oxf226a[0x2]+ _0xa3e1x23+ __Oxf226a[0x73]+ Date[__Oxf226a[0x70]]())}Date[__Oxf226a[0x77]][__Oxf226a[0x76]]= function(_0xa3e1x2a){var _0xa3e1xa,_0xa3e1x12=this,_0xa3e1x2b=_0xa3e1x2a,_0xa3e1x2c={"\x4D\x2B":_0xa3e1x12[__Oxf226a[0x78]]()+ 1,"\x64\x2B":_0xa3e1x12[__Oxf226a[0x79]](),"\x44\x2B":_0xa3e1x12[__Oxf226a[0x79]](),"\x68\x2B":_0xa3e1x12[__Oxf226a[0x7a]](),"\x48\x2B":_0xa3e1x12[__Oxf226a[0x7a]](),"\x6D\x2B":_0xa3e1x12[__Oxf226a[0x7b]](),"\x73\x2B":_0xa3e1x12[__Oxf226a[0x7c]](),"\x77\x2B":_0xa3e1x12[__Oxf226a[0x7d]](),"\x71\x2B":Math[__Oxf226a[0x38]]((_0xa3e1x12[__Oxf226a[0x78]]()+ 3)/ 3),"\x53\x2B":_0xa3e1x12[__Oxf226a[0x7e]]()};/(y+)/i[__Oxf226a[0x7f]](_0xa3e1x2b)&& (_0xa3e1x2b= _0xa3e1x2b[__Oxf226a[0x84]](RegExp.$1,__Oxf226a[0x2][__Oxf226a[0x83]](_0xa3e1x12[__Oxf226a[0x82]]())[__Oxf226a[0x81]](4- RegExp[__Oxf226a[0x80]][__Oxf226a[0x20]])));for(var _0xa3e1x2d in _0xa3e1x2c){if( new RegExp(__Oxf226a[0x86][__Oxf226a[0x83]](_0xa3e1x2d,__Oxf226a[0x85]))[__Oxf226a[0x7f]](_0xa3e1x2b)){var _0xa3e1x10,_0xa3e1x11=__Oxf226a[0x87]=== _0xa3e1x2d?__Oxf226a[0x88]:__Oxf226a[0x89];_0xa3e1x2b= _0xa3e1x2b[__Oxf226a[0x84]](RegExp.$1,1== RegExp[__Oxf226a[0x80]][__Oxf226a[0x20]]?_0xa3e1x2c[_0xa3e1x2d]:(__Oxf226a[0x2][__Oxf226a[0x83]](_0xa3e1x11)+ _0xa3e1x2c[_0xa3e1x2d])[__Oxf226a[0x81]](__Oxf226a[0x2][__Oxf226a[0x83]](_0xa3e1x2c[_0xa3e1x2d])[__Oxf226a[0x20]]))}};return _0xa3e1x2b};function random(_0xa3e1x2f,_0xa3e1x30){return Math[__Oxf226a[0x38]](Math[__Oxf226a[0x28]]()* (_0xa3e1x30- _0xa3e1x2f))+ _0xa3e1x2f}async function getToken(){return  new Promise((_0xa3e1x1c)=>{$[__Oxf226a[0x58]]({url:`${__Oxf226a[0x2]}${url1}${__Oxf226a[0x8a]}`,headers:{"\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74":ver1},timeout:60000},(_0xa3e1x17,_0xa3e1x18,_0xa3e1x19)=>{try{if(_0xa3e1x17){console[__Oxf226a[0xf]](`${__Oxf226a[0x8b]}`)}else {try{_0xa3e1x19= JSON[__Oxf226a[0x69]](_0xa3e1x19);if(_0xa3e1x19[__Oxf226a[0x8c]]== 0){_0xa3e1x19= _0xa3e1x19[__Oxf226a[0x8d]]}else {_0xa3e1x19= __Oxf226a[0x2]}}catch(e){_0xa3e1x19= __Oxf226a[0x2]}}}catch(e){}finally{_0xa3e1x1c(_0xa3e1x19|| __Oxf226a[0x2])}})})}function getCard(_0xa3e1x33){return  new Promise((_0xa3e1x1c)=>{$[__Oxf226a[0x58]]({url:`${__Oxf226a[0x2]}${url2}${__Oxf226a[0x8e]}${_0xa3e1x33}${__Oxf226a[0x2]}`,headers:{"\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74":ver2},timeout:99000},(_0xa3e1x17,_0xa3e1x18,_0xa3e1x19)=>{try{if(_0xa3e1x17){console[__Oxf226a[0xf]](`${__Oxf226a[0x8b]}`)}else {_0xa3e1x19= _0xa3e1x19}}catch(e){}finally{_0xa3e1x1c(_0xa3e1x19|| __Oxf226a[0x2])}})})}function TotalBean(){return  new Promise(async (_0xa3e1x1c)=>{const _0xa3e1x16={"\x75\x72\x6C":`${__Oxf226a[0x8f]}`,"\x68\x65\x61\x64\x65\x72\x73":{"\x41\x63\x63\x65\x70\x74":__Oxf226a[0x90],"\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65":__Oxf226a[0x4c],"\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67":__Oxf226a[0x91],"\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65":__Oxf226a[0x92],"\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E":__Oxf226a[0x93],"\x43\x6F\x6F\x6B\x69\x65":cookie,"\x52\x65\x66\x65\x72\x65\x72":__Oxf226a[0x94],"\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74":__Oxf226a[0x95]}};$[__Oxf226a[0x9b]](_0xa3e1x16,(_0xa3e1x17,_0xa3e1x18,_0xa3e1x19)=>{try{if(_0xa3e1x17){console[__Oxf226a[0xf]](`${__Oxf226a[0x2]}${JSON[__Oxf226a[0x6c]](_0xa3e1x17)}${__Oxf226a[0x2]}`);console[__Oxf226a[0xf]](`${__Oxf226a[0x2]}${$[__Oxf226a[0x1c]]}${__Oxf226a[0x96]}`)}else {if(_0xa3e1x19){_0xa3e1x19= JSON[__Oxf226a[0x69]](_0xa3e1x19);if(_0xa3e1x19[__Oxf226a[0x97]]=== 0&& _0xa3e1x19[__Oxf226a[0x98]]&& _0xa3e1x19[__Oxf226a[0x98]][__Oxf226a[0x99]]){$[__Oxf226a[0x24]]= _0xa3e1x19[__Oxf226a[0x98]][__Oxf226a[0x99]]}}else {console[__Oxf226a[0xf]](`${__Oxf226a[0x9a]}`)}}}catch(e){$[__Oxf226a[0x1a]](e)}finally{_0xa3e1x1c()}})})}(function(_0xa3e1x35,_0xa3e1x36,_0xa3e1x37,_0xa3e1x38,_0xa3e1x39,_0xa3e1x2d){_0xa3e1x2d= __Oxf226a[0x9c];_0xa3e1x38= function(_0xa3e1x3a){if( typeof alert!== _0xa3e1x2d){alert(_0xa3e1x3a)};if( typeof console!== _0xa3e1x2d){console[__Oxf226a[0xf]](_0xa3e1x3a)}};_0xa3e1x37= function(_0xa3e1x11,_0xa3e1x35){return _0xa3e1x11+ _0xa3e1x35};_0xa3e1x39= _0xa3e1x37(__Oxf226a[0x9d],_0xa3e1x37(_0xa3e1x37(__Oxf226a[0x9e],__Oxf226a[0x9f]),__Oxf226a[0xa0]));try{_0xa3e1x35= __encode;if(!( typeof _0xa3e1x35!== _0xa3e1x2d&& _0xa3e1x35=== _0xa3e1x37(__Oxf226a[0xa1],__Oxf226a[0xa2]))){_0xa3e1x38(_0xa3e1x39)}}catch(e){_0xa3e1x38(_0xa3e1x39)}})({})


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}