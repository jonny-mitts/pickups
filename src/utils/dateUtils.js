const dateDiff = {

    inSeconds: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
  
          return parseInt((t2-t1)/1000);
      },
  
  
    inMinutes: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
  
          return parseInt((t2-t1)/60000);
      },
  
    inHours: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
  
          return parseInt((t2-t1)/3600000);
      },
  
      inDays: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
  
          return parseInt((t2-t1)/(24*3600*1000));
      },
  
      inWeeks: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
  
          return parseInt((t2-t1)/(24*3600*1000*7));
      },
  
      inMonths: function(d1, d2) {
          var d1Y = d1.getFullYear();
          var d2Y = d2.getFullYear();
          var d1M = d1.getMonth();
          var d2M = d2.getMonth();
  
          return (d2M+12*d2Y)-(d1M+12*d1Y);
      },
  
      inYears: function(d1, d2) {
          return d2.getFullYear()-d1.getFullYear();
      }
}

const yearMonthDateFormat = (d) => {
    return d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' +  ('0' + d.getDate()).slice(-2)
}

const ymdAndTime = (d) => {
    return `${yearMonthDateFormat(d)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:00:000` 
    // return `${yearMonthDateFormat(d)}T${('0' + (d.getTimezoneOffset()/60)).slice(-2)}:${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:000Z`
}

const nth = (d) => {
    if (d > 3 && d < 21) return `${d}th`;
    switch (d % 10) {
      case 1:  return `${d}st`;
      case 2:  return `${d}nd`;
      case 3:  return `${d}rd`;
      default: return `${d}th`;
    }
  };

export {dateDiff, yearMonthDateFormat, ymdAndTime, nth}