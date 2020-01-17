const rotateEvent = () => {
    document.body.style.transform = 'rotate(180deg)';
  };
  const reset = () => {
    document.body.style.transform = '';
  }

var checkSpan = (name) => {
    var s = document.getElementsByTagName("span");
    for (i = 0;i < s.length; i++) {
        if (s[i].innerText === name) {
            return "check";
        }
    }
  }
  var clickbtn = (name,classname) => {
    var s = $(classname);
    for (i = 0;i < s.length; i++) {
        if (s[i].innerText === name) {
            s[i].click();
        }
    }
  }
  var checkClass = (name,classname) => {
    var s = document.getElementsByClassName(classname);
    for (i = 0;i < s.length; i++) {
        if (s[i].innerText === name) {
            return "check";
        }
    }
  }

  function checkTime(timeA){
    　var NowDate=new Date();
    　var h=NowDate.getHours();
    　var m=NowDate.getMinutes();
    　var s=NowDate.getSeconds();　
    　var x = h+':'+m+':'+s;
    if( x === timeA){
        window.location.reload();
    }
        console.log(x);
    }
//select option 改
var always = () => {
    if(checkSpan("自行選位") === "check"){
        //選要買的票價 [0] 就是第一個 依此類推..
        if(a = document.getElementsByClassName("btn-default plus")[0]){
            a.click();
        }
        if(a = document.getElementsByClassName("ng-pristine ng-untouched ng-valid ng-empty")[0]){
            a.click();
        }
        if(a = document.getElementsByClassName("btn btn-primary btn-lg ng-isolate-scope")[0]){
            a.click();
        }
    }else if(checkClass("選購的票券","caption ng-binding") === "check"){
        clickbtn("完成選位",".btn-primary.ng-binding")
    }
    setTimeout(function(){ 
        if(a = document.getElementsByClassName("btn btn-primary btn-lg ng-binding ng-isolate-scope")[0]){
            a.click();
        }
        
        /*if(a = document.getElementsByClassName("ng-dirty ng-valid-parse ng-touched ng-invalid ng-empty ng-invalid-required ng-valid-pattern")[0]){
            a.value = "A128418109";
        }
        if(a = document.getElementsByClassName("ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required ng-touched")[0]){
            a.value = "A128418109";
        }*/
        
     }, 500);

    
}

var getChrome = (checkFun) => {
    chrome.storage.local.get("checktest", items=>{
        if(items.checktest){
        var ticket = items.checktest.ticket;
        var ticketNumber = items.checktest.ticketNumber;
        var idNumber = items.checktest.idNumber;
        var creditNumber = items.checktest.creditNumber;
        var creditYear = items.checktest.creditYear;
        var creditMonth = items.checktest.creditMonth;
        var creditCheck = items.checktest.creditCheck;
        var timeCheckHour = items.checktest.timeCheckHour;
        var timeChecMin = items.checktest.timeChecMin;
        var timeCheckSecond = items.checktest.timeCheckSecond;
        var startCheck = items.checktest.startCheck;
        var NowDate=new Date();
        var timeNow=(NowDate.getHours()*10000)+(NowDate.getMinutes()*100)+(NowDate.getSeconds());
        var timeInput = (timeCheckHour*10000)+(timeChecMin*100)+(timeCheckSecond*1);
            if(startCheck == '0' && checkFun == 'start'){
                setTimeout(always, 1000);
            }else if (startCheck == '0' && checkFun == 'time'){
                if(timeNow <= timeInput){
                    console.log("開始倒數");
                    console.log(timeInput);
                    var setTime = timeCheckHour+':'+timeChecMin+':'+timeCheckSecond;//設定時間
                    setInterval(function(){ checkTime(setTime); },1000);
                }
            }
        }
    });
}
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
  }
  
  chrome.runtime.onMessage.addListener(onMessage);