// 高雄景點 json 資料
// ajax
const xhr = new XMLHttpRequest();
let khcInf;
Object.freeze(xhr);
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
xhr.onload = function () {
    let khc = JSON.parse(xhr.responseText);
    khcInf = khc.result.records;
    // 撈出所有區
    let allZone = [];
    for (let i = 0; i < khcInf.length; i++) {
        allZone.push(khcInf[i].Zone);
    }

    // 移除重複區
    let result = allZone.filter(function (element, index, array) {
        return array.indexOf(element) === index;
    });

    // 在 select 加入區(不重複)
    let optStr = '<option>- - 請選擇行政區 - -</option>';
    for (let i = 0; i < result.length; i++) {
        let areaSelect = document.getElementById('areaSelect');
        optStr += '<option data-num="' + i + '" value="' + result[i] + '">' + result[i] + '</option>';
        areaSelect.innerHTML = optStr;
    }
    // init 載入三民區
    showList('三民區');
}

// 頁碼
let elPageNum = document.querySelector('.pageNum');
let pageNum;

// 顯示選到的區
let elZone = document.getElementById('select-zone');
let areaList = document.querySelector('.areaMain-list');

// 	list 內容
function showList(zone) {
    elZone.textContent = zone;
    // 顯示頁碼
    countPageNum(zone);
    // 區域, 頁面總數, 目標頁面 ( 0 開始)
    showPage(zone, pageNum, 0);
}

// change 事件 show 出該區
function showZone(e) {
    let getZone = e.target.value;
    // 改變 list 內容
    showList(getZone);
}

areaSelect.addEventListener('change', showZone, false);

// hashtag 熱門區
let hotTag = document.querySelector('.hotAreaTag ul');

function showHotZone(e) {
    if (e.target.nodeName !== 'A') {
        return
    };
    e.preventDefault();
    let getZone = e.target.firstChild.nodeValue;
    // 改變 list 內容
    showList(getZone);
}

hotTag.addEventListener('click', showHotZone, false);


// 計算所需頁數
function countPageNum(zone) {
    let page = [];
    for (let i = 0; i < khcInf.length; i++) {
        if (khcInf[i].Zone == zone) {
            page.push(khcInf[i]);
        }
    }
    // 該區資料數量
    let len = page.length;
    let pageStr = '';
    // 計算所需頁數
    (function (n) {
        pageNum = Math.ceil(n / 8);
    })(len);
    for (let j = 0; j < pageNum; j++) {
        pageStr += '<li><a href="#page' + (j + 1) + '" data-page="' + j + '">' + (j + 1) + '</a></li>';
    }
    elPageNum.innerHTML = '<ul>' + pageStr + '</ul><div class="clear"></div>';
}

// 根據使用者點擊的選項來決定顯示項目

// 顯示每頁的內容
function showPage(zone, pageNum, targetPage) {
    let array = [];
    let str = '';
    for (let i = 0; i < khcInf.length; i++) {
        if (khcInf[i].Zone === zone) {
            array.push(khcInf[i]);
        }
    }
    let len = array.length;

    // 第一頁跟最後一頁 資料數量可能不同
    if (pageNum == 1 || targetPage == pageNum - 1) {
        let i = targetPage;
        switch (len % 8) {
            case 0:
                for (let j = (0 + i * 8); j < (8 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
            case 1:
                for (let j = (0 + i * 8); j < (1 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
            case 2:
                for (let j = (0 + i * 8); j < (2 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
            case 3:
                for (let j = (0 + i * 8); j < (3 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
            case 4:
                for (let j = (0 + i * 8); j < (4 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
            case 5:
                for (let j = (0 + i * 8); j < (5 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
            case 6:
                for (let j = (0 + i * 8); j < (6 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
            case 7:
                for (let j = (0 + i * 8); j < (7 + i * 8); j++) {
                    str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                }
                break;
        }
    } else {
        for (let i = 0; i < pageNum - 1; i++) {
            switch (targetPage) {
                case i:
                    for (let j = (0 + i * 8); j < (8 + i * 8); j++) {
                        str += '<li><div class="areaMain-list_bg" style="background-image :url(\'' + array[j].Picture1 + '\')" ><div class="areaTitle_wrap"><h3>' + array[j].Name + '</h3><span>' + array[j].Zone + '</span></div></div><ol><li><img src="img/icons_clock.png" alt="clock" class="icon_clock">' + array[j].Opentime + '</li><li><img src="img/icons_pin.png" alt="pin" class="icon_pin">' + array[j].Add + '</li><li><img src="img/icons_phone.png" alt="phone" class="icon_phone">' + array[j].Tel + '<span class="visitPrice"><img src="img/icons_tag.png" alt="tag" class="icon_tag">' + array[j].Ticketinfo + '</span></li></ol></li>';
                    }
                    break;
            }
        }
    }

    areaList.innerHTML = str + '<div class="clear"></div>';
}

// 點擊頁碼產生不同頁面
function pageItem(e) {
    let target = e.target;
    if (target.nodeName !== 'A') {
        return
    };
    e.preventDefault();
    // 頁碼
    let page = parseInt(target.dataset.page);
    let zone = elZone.firstChild.nodeValue;
    showPage(zone, pageNum, page);


    // 因為開的不是新的網頁
    // switch (target.className) {
    // 	case 'prev':
    // 		e.preventDefault();
    //  	window.history.back();
    //  	break;
    // 	case 'next':
    // 		e.preventDefault();
    //  	window.history.forward();
    //  	break;
    // 	default :
    // 		showPage(zone, pageNum, page);
    // 	break;

    // }
}

elPageNum.addEventListener('click', pageItem, false)



