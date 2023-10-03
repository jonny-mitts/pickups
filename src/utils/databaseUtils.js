import moment from 'moment'
import { dateDiff, yearMonthDateFormat } from './dateUtils'

export const createUpdateStatementFromObject = (
  table,
  obj,
  whereField,
  whereValue,
  exclude
) => {
  const updateArray = Object.keys(obj).map((key) => {
    return !exclude.includes(key) ? ` ${key}='${obj[key]}'` : null
  })
  const joinedAndTrimmed = updateArray.join().slice(0, -1)
  const updateString = `UPDATE ${table} SET${joinedAndTrimmed} WHERE ${whereField}=${whereValue}`

  return updateString
}

const zeroPad = (i) => {
  if (i < 10) {
    return `${'0'}${i}`
  }
  return i
}

const convertToTailwindEvent = (event, {args = {}}) => {
  
  const {
    id,
    title,
    start,
    end,
    description,
    userId,
    time,
    location
  } = event
  return {
    id,
    location,
    start,
    end,
    description,
    userId,
    name: title,
    time,
    datetime: start,
    href: '#',
    ...args
  }
}

const getDateObject = ({ y, m, d, args = {} }) => {
  return { date: `${y}-${zeroPad(m + 1)}-${zeroPad(d + 1)}`, events: [], ...args }
}

const getEmptyDays = (offset, d) => {
  console.log("🚀 ~ file: databaseUtils.js:59 ~ getEmptyDays ~ offset, d:", offset, d)
  const date = moment(d)
  const numberOfDays = date.daysInMonth()
  const y = date.year()
  const m = date.month()
  const days = []
  for (let i = 1; i < offset; i++) {
    days.push(getDateObject({ y, m, d: numberOfDays - i }))
  }

  return [...days.reverse()]

  // for( let i = 0 ; i < numberOfDays ; i++ ){

  // }
}

export const resetSelectedDay = (data, d) => {
    return data.map((day) => {
        let newDay = {...day};
        newDay.isSelectedDay = false;
        newDay.isSelected = false;
        if(newDay.date === d.date){
            newDay.isSelectedDay = true
            newDay.isSelected = true
        }
        
        return newDay
        
    });
}

const getDaysInMonth = (month, year) => {
  const dim = new Date(year, month + 1, 0).getDate();
  return dim
}
 

export const convertToTailwindCalData = (
  data, currentDate = null
) => {
  const date = currentDate || new Date()
  const dateMonth = date.getMonth()
  console.log("🚀 ~ file: databaseUtils.js:102 ~ dateMonth:", dateMonth)
  const dateYear = date.getFullYear()
  const daysInMonth = getDaysInMonth(dateMonth, dateYear)
  const monthIndexArray = []
  let prefixedDays

  for (let i = 0; i < daysInMonth; i++) {
    let tempObj
    if (i === 0) {
      const firstDayStr = `${dateYear}-${zeroPad(dateMonth + 1)}-01`
      const firstDayIndex = moment(firstDayStr).day()
      console.log("🚀 ~ file: databaseUtils.js:113 ~ firstDayStr:", firstDayStr,firstDayIndex)
      prefixedDays = [
        ...getEmptyDays(
          firstDayIndex,
          `${dateYear}-${zeroPad(dateMonth)}-01`
        ),
      ]
    }
    tempObj = getDateObject({ y: dateYear, m: dateMonth, d: i, args:{isCurrentMonth:true} })
    
    if (i === date.getDate() - 1 && new Date().getMonth() === dateMonth) {
        tempObj.isToday = true
        // tempObj.isSelected = true;
        // tempObj.isSelectedDay = true;
    }

    if (i === date.getDate() - 1)  {
        // tempObj.isToday = true
        tempObj.isSelected = true;
        // tempObj.isSelectedDay = true;
    }

    monthIndexArray[i] = tempObj
  }
  
//   
  
  const parseCorrectDate = (dObj) => {
    console.log("🚀 ~ file: databaseUtils.js:138 ~ parseCorrectDate ~ dObj:", dObj)
    const dateArray = dObj.toString().split(':')
    const leftStr = dateArray[0].slice(0, -3)
    dateArray[0] = leftStr;
    return dateArray[0] + " " + dateArray[1] + ":" + dateArray[2];
  }

  data.forEach((day) => {
    
    
    console.log("🚀 ~ file: databaseUtils.js:148 ~ data.forEach ~ day:", day)
    const correctDate = parseCorrectDate(day.start);
    
    const correctEnd = parseCorrectDate(day.end);
    const d = new Date(correctDate)
    const mDate = new Date(day.start);
    const endD = new Date(day.end);
    const diff = dateDiff.inMinutes(mDate, endD)
    // const diff = endD.diff(mDate, 'minutes');
    
    
    const time = mDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    
    day.time = time;
    
    // const eventDate = `${d.getFullYear()}-${d.getFullYear()}`//d.format('YYYY-MM-DD')

    const eventDate = yearMonthDateFormat(d);
    const eventMonth = d.getMonth()
    const todayDay = date.getDay()
    const eventDay = d.getDay()
    const dateObject = monthIndexArray.filter(
      ({ date }) => {
        
        return date === eventDate
      }
    )[0];
    
    
    
    // dateObject.isSelectedDay = todayDay === eventDay;
    // dateObject.isSelected = todayDay === eventDay;
    
    // 
    if(dateObject){
        const calendarDataFormat = convertToTailwindEvent(day, {args:{
            correctedStart: d,
            correctedEnd: endD,
            diff:diff}
        });
        dateObject.events.push(calendarDataFormat);
    }
    
  })
  
  
  const returnArray = [...prefixedDays, ...monthIndexArray];
//   
  return returnArray;
}

export const encodeForTransport = (str) =>
  encodeURIComponent(str).replace(/[!'()*]/g, escape)

// export const createInsertOnDuplicateUpdateStatementFromObject = (table, obj, whereField, whereValue, exclude =[]) => {
//     const keys = [];
//     const values = [];

//     Object.keys(obj).forEach((key) => {
//         if(!exclude.includes(key)){
//             keys.push(key);
//             values.push(obj[key]);
//             return;
//         }
//         return;
//     })

//     const updateClauseString = Object.keys(obj).map((key) => {
//             // look at the duplicate key documentation and finish this

//     })

//     const keysString = keys.join();
//     const valuesString = values.join();
//     const updateString = `INSERT INTO ${table} (${keysString}) VALUES (${valuesString}) ON DUPLICATE KEY UPDATE ${whereField}=${whereValue}`;

//     return updateString;

// }
