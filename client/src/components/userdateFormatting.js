function monthName(month){
    if(month === 1){
        return "Jan"
    }
    if(month === 2){
        return "Feb"
    }
    if(month === 3){
        return "Mar"
    }
    if(month === 4){
        return "Apr"
    }
    if(month === 5){
        return "May"
    }
    if(month === 6){
        return "Jun"
    }
    if(month === 7){
        return "Jul"
    }
    if(month === 8){
        return "Aug"
    }
    if(month === 9){
        return "Sep"
    }
    if(month === 10){
        return "Oct"
    }
    if(month === 11){
        return "Nov"
    }
    if(month === 12){
        return "Dec"
    }
}

export function getUserDateFormat(dateObj){
    var currentDate = new Date();

    const timeDiffMS = currentDate - dateObj;
    const timeDiffS = timeDiffMS / 1000;

    const timeDiffM = timeDiffS / 60;
    const timeDiffH = timeDiffM / 60;
    //const timeDiffD = timeDiffH / 24;
    // const timeDiffMon = timeDiffD / 30;
    // const timeDiffY = timeDiffD / 365;

    /*console.log("++++++" + timeDiffMS)
    console.log(timeDiffS)

    console.log("DATE POSTED IS " + dateObj)
    console.log(timeDiffYear)
    console.log(timeDiffMonth)
    console.log(timeDiffDay)
    console.log(timeDiffHour)
    console.log(timeDiffMin)
    console.log(timeDiffSec)
    console.log(timeDiffMS)*/

    if(timeDiffS > 31536000){
      if(dateObj.getMinutes() > 10){
      return "since " + (monthName(dateObj.getMonth()+1)) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
      }
      return "since " + (monthName(dateObj.getMonth()+1)) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();

    }else if(timeDiffS > 86400){
      if(dateObj.getMinutes() > 10){
      return "since " + (monthName(dateObj.getMonth()+1)) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
      }
      return "since " + (monthName(dateObj.getMonth()+1)) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();

    }else if(timeDiffS <= 86400 && timeDiffS > 3600){
      return "for "+Math.floor(timeDiffH) + " hours";   

    }else if(timeDiffS <= 3600 && timeDiffS > 60){
      return "for "+Math.floor(timeDiffM) + " minutes";

    }else if(timeDiffS <= 60){
      return "for "+Math.floor(timeDiffS) + " seconds";
    }

  }