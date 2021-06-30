import { KEEPER_HISTORY_DATE_FILTER } from './constants';
import dayjs from 'dayjs';

export function convertDateRangeInStringToTimestamp(dateRangeString) {
    switch (dateRangeString) {
        case KEEPER_HISTORY_DATE_FILTER.LAST_DAY:
            return Math.round(dayjs().subtract(1, 'day').valueOf() / 1000); // convert to seconds;
        case KEEPER_HISTORY_DATE_FILTER.LAST_WEEK:
            return Math.round(dayjs().subtract(1, 'week').valueOf() / 1000);
        case KEEPER_HISTORY_DATE_FILTER.LAST_MONTH:
            return Math.round(dayjs().subtract(1, 'month').valueOf() / 1000);
        default:
            throw new Error('Date range filter not supported');
    }
}