
export const dateFormatter = new Intl.DateTimeFormat(undefined, {
     dateStyle: "medium",
     timeStyle: "short"
})


export const TimeFormatter = new Intl.RelativeTimeFormat('en', {
     numeric: "auto"
})


export const CalcTime = (time: number) => {
     const currTime = Date.now();;
     const TimeDiff = currTime - time;

     if (TimeDiff >= 31536000000) {
          const d = Math.floor(TimeDiff / 31536000000);
          return TimeFormatter.format(-d, 'years')
     } else if (TimeDiff >= 2419200000) {
          const d = Math.floor(TimeDiff / 2419200000);
          return TimeFormatter.format(-d, 'months')
     } else if (TimeDiff >= 86400000) {
          const d = Math.floor(TimeDiff / 86400000);
          return TimeFormatter.format(-d, 'days')
     } else if (TimeDiff >= 3600000) {
          const d = Math.floor(TimeDiff / 3600000);
          return TimeFormatter.format(-d, 'hours')
     } else if (TimeDiff >= 60000) {
          const d = Math.floor(TimeDiff / 60000);
          return TimeFormatter.format(-d, 'minutes')
     } else {
          const d = Math.floor(TimeDiff / 1000);
          return TimeFormatter.format(-d, 'seconds')
     }
}

export function NumberFormat(num: number) {
     return num.toLocaleString()
}