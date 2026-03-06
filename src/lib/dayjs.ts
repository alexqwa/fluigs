import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(utc)
dayjs.locale('pt-br')
dayjs.extend(duration)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.tz.setDefault('America/Sao_Paulo')
