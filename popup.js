var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);

    chrome.storage.local.get("checktest", items=>{
      if(items.checktest){
        document.getElementById('ticket').value = items.checktest.ticket;
        document.getElementById('ticketNumber').value = items.checktest.ticketNumber;
        document.getElementById('idNumber').value = items.checktest.idNumber;
        document.getElementById('creditNumber').value = items.checktest.creditNumber;
        document.getElementById('creditYear').value = items.checktest.creditYear;
        document.getElementById('creditMonth').value = items.checktest.creditMonth;
        document.getElementById('creditCheck').value = items.checktest.creditCheck;
        document.getElementById('timeCheckHour').value = items.checktest.timeCheckHour;
        document.getElementById('timeChecMin').value = items.checktest.timeChecMin;
        document.getElementById('timeCheckSecond').value = items.checktest.timeCheckSecond;
        $('input[name="startCheck"]')[items.checktest.startCheck].checked = true
      } 
    });
  
    
    //$('input[name="startCheck"]')[1].checked = true
    //var method =$("input[name='doway']:checked").val();
    document.getElementById('rotate').addEventListener('click', () => sendMessage({ action: 'ROTATE' }));
    document.getElementById('saveData').addEventListener('click', (event) => {

      chrome.storage.local.set({
        checktest:  {
          ticket:document.getElementById('ticket').value,
          ticketNumber:document.getElementById('ticketNumber').value,
          idNumber:document.getElementById('idNumber').value,
          creditNumber:document.getElementById('creditNumber').value,
          creditYear:document.getElementById('creditYear').value,
          creditMonth:document.getElementById('creditMonth').value,
          creditCheck:document.getElementById('creditCheck').value,
          timeCheckHour:document.getElementById('timeCheckHour').value,
          timeChecMin:document.getElementById('timeChecMin').value,
          timeCheckSecond:document.getElementById('timeCheckSecond').value,
          startCheck:$("input[name='startCheck']:checked").val() 
          }
      });
      
      window.location.reload();
      sendMessage({ action: 'Save' })
    });
    
    
  }
  chrome.tabs.getSelected(null, getSelectedTab);
  