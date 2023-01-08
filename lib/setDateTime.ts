import moment from "moment"

const setDateTime = (date: string): string => {
  let customDate: string
  if (moment().format('L') == moment.utc(date).format('L')) {
    const time = moment(date).subtract(7, 'hour')
    customDate = time.from(moment())
  } else customDate = moment.utc(date).calendar()

  return customDate
}

export default setDateTime