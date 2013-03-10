function creaNuovoMese() {
  Logger.clear();
  var mesi = [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ];
  var newMonthPos, newYear;
  
  var sheet = SpreadsheetApp.getActiveSheet();
  
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().duplicateActiveSheet();
  
  var lastName = sheet.getName();
  var oldMonth = lastName.replace(/[0-9]*$/gi,"");
  var oldYear = parseInt(lastName.replace(oldMonth, ""));
  var lastPos = mesi.indexOf(oldMonth);

  if(lastPos === 11){
    newMonthPos = 0;
    newYear = oldYear+1;
  }else{
    newMonthPos = lastPos + 1;
    newYear = oldYear;
  }
  
  newSheet.setName(mesi[newMonthPos]+newYear);
  
  newSheet.clearContents();
  // Copio headers
  var rangeToCopy = sheet.getRange("A1:C2");
  rangeToCopy.copyTo(newSheet.getRange(1, 1));
  // D8 =SUM(B:B)
  newSheet.getRange(8, 4).setFormula("=SUM(B:B)")
  // 3 1, 43 1
  var dateRowRange = newSheet.getRange(3, 1, 32, 1);
  var dateRowsCount = dateRowRange.getNumRows();
  
  var initialDate = new Date(newYear, newMonthPos, 1, 0, 0, 0, 0);
  
  var dateArray = [];
  for(var i=0, numRows=dateRowsCount-1; i<= numRows; i++){
    dateArray.push([initialDate.addDays(i)]);
  }
   dateRowRange.setValues(dateArray);
  
  SpreadsheetApp.setActiveSheet(newSheet);
  SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(1);
};

//function padLeft(valore){
//var str = "" + valore;
//var pad = "00";
//return pad.substring(0, pad.length - str.length) + str;
//}

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Nuovo Mese",
    functionName : "creaNuovoMese"
  }];
  sheet.addMenu("Script Center Menu", entries);
};

