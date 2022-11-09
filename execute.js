const rotateEvent = () => {
  document.body.style.transform = 'rotate(180deg)';
};
const reset = () => {
  document.body.style.transform = '';
};

var checkSpan = (name) => {
  var s = document.getElementsByTagName('span');
  for (i = 0; i < s.length; i++) {
    if (s[i].innerText === name) {
      return 'check';
    }
  }
}; //
var clickbtn = (name, classname) => {
  var s = $(classname);
  for (i = 0; i < s.length; i++) {
    if (s[i].innerText === name) {
      s[i].click();
    }
  }
};
var checkClass = (name, classname) => {
  var s = document.getElementsByClassName(classname);
  for (i = 0; i < s.length; i++) {
    if (s[i].innerText === name) {
      return 'check';
    }
  }
};

function checkTime(timeA) {
  var NowDate = new Date();
  var h = NowDate.getHours();
  var m = NowDate.getMinutes();
  var s = NowDate.getSeconds();
  var x = h + ':' + m + ':' + s;
  if (x === timeA) {
    window.location.reload();
  }
  console.log(x);
}

// 抓取select的值
function jsSelectItemByValue(objSelect, objItemText) {
  for (var i = 0; i < objSelect.options.length; i++) {
    if (objSelect.options[i].text == objItemText) {
      objSelect.options[i].selected = true;
      break;
    }
  }
}

//select option 改
var always = (inputData) => {
  //   console.log(inputData);

  var ticket = inputData.checktest.ticket;
  var ticketNumber = inputData.checktest.ticketNumber;
  var idNumbertext = inputData.checktest.idNumber;
  var creditNumber = inputData.checktest.creditNumber;
  var creditYear = inputData.checktest.creditYear;
  var creditMonth = inputData.checktest.creditMonth;
  var creditCheck = inputData.checktest.creditCheck;

  //選要買的票價 [0] 就是第一個 依此類推..
  if ((a = document.getElementsByClassName('btn-default plus')[ticket - 1])) {
    console.log(123);
    for (i = 0; i < ticketNumber; i++) {
      a.click();
    }
  }
  if ((a = document.getElementById('person_agree_terms'))) {
    if (a.checked == false) {
      a.click();
    }
  }
  if ((a = document.getElementsByName('captcha_answer')[0])) {
    a.focus();
    a.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        if (
          (a = document.getElementsByClassName(
            'btn btn-primary btn-lg ng-isolate-scope'
          )[0])
        ) {
          a.click();
        }
      }
    });
  } else {
    if (
      (a = document.getElementsByClassName(
        'btn btn-primary btn-lg ng-isolate-scope'
      )[0])
    ) {
      a.click();
    }
  }
  if (checkClass('選購的票券', 'caption ng-binding') === 'check') {
    clickbtn('完成選位', '.btn-primary.ng-binding');
  }
  setTimeout(function () {
    if (
      (a = document.getElementsByClassName(
        'btn btn-primary btn-lg ng-binding ng-isolate-scope'
      )[0])
    ) {
      setTimeout(() => {
        a.click();
      }, 500);
    }
    if ((a = document.getElementsByName('pickupType'))) {
      for (let index = 0; index < a.length; index++) {
        console.log(a[index].value);
        if (a[index].value == 'famiport') {
          a[index].click();
        }
      }
    }
    if ((a = document.getElementsByName('idNumber')[0])) {
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', true, true);
      a.value = inputData.checktest.idNumber;
      a.dispatchEvent(evt);
    }
    if ((a = document.getElementsByName('paymentMethodType'))) {
      for (let index = 0; index < a.length; index++) {
        if (a[index].value == 'ATM') {
          a[index].click();
        }
      }
    }
  }, 500);
};

var getChrome = (checkFun) => {
  chrome.storage.local.get('checktest', (items) => {
    if (items.checktest) {
      var timeCheckHour = items.checktest.timeCheckHour;
      var timeChecMin = items.checktest.timeChecMin;
      var timeCheckSecond = items.checktest.timeCheckSecond;
      var startCheck = items.checktest.startCheck;
      var NowDate = new Date();
      var timeNow =
        NowDate.getHours() * 10000 +
        NowDate.getMinutes() * 100 +
        NowDate.getSeconds();
      var timeInput =
        timeCheckHour * 10000 + timeChecMin * 100 + timeCheckSecond * 1;
      if (startCheck == '0' && checkFun == 'start') {
        setInterval(function () {
          always(items);
        }, 1000);
      } else if (startCheck == '0' && checkFun == 'time') {
        if (timeNow <= timeInput) {
          console.log('開始倒數');
          console.log(timeInput);
          var setTime =
            timeCheckHour + ':' + timeChecMin + ':' + timeCheckSecond; //設定時間
          setInterval(function () {
            checkTime(setTime);
          }, 1000);
        }
      }
    }
  });
};
getChrome('start');

const onMessage = async (message) => {
  switch (message.action) {
    case 'ROTATE':
      getChrome('time');
      break;

    case 'Save':
      window.location.reload();
      break;
    default:
      break;
  }
};

chrome.runtime.onMessage.addListener(onMessage);
