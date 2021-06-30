import { BIG_ZERO } from "./constants";
import { getTotalGasFeeForTransactions } from './blockchain';

export const getKeeperWinRate = (winnerEvents, newDataEvents) => {
    return winnerEvents.length / newDataEvents.length * 100;
}

export const getKeeperEarn = winnerEventsOfKeeper => {
    const reducer = (totalEarn, winnerEvent) => totalEarn.add(winnerEvent.returnValues._reward);

    return winnerEventsOfKeeper.reduce(reducer, BIG_ZERO);
}

export const getKeeperRows = (newDataEvents, winnerEvents) => {
    const keeperFromNewDataEvents = newDataEvents.map(newDataEvent => newDataEvent.returnValues._keeper);
    const uniqueKeepers = new Set(keeperFromNewDataEvents);

    return Array.from(uniqueKeepers).map(keeper => {
        const earn = getKeeperEarn(getEventByKeeper(winnerEvents, keeper));
        const totalGasFee = getTotalGasFeeForTransactions(getEventByKeeper(newDataEvents, keeper).map(i => i.transactionHash));
        const netProfit = earn.sub(totalGasFee);

        return {
            keeper,
            winRate: getKeeperWinRate(getEventByKeeper(winnerEvents, keeper), getEventByKeeper(newDataEvents, keeper)),
            earn: earn.toString(),
            estimatedSpent: totalGasFee.toString(),
            netProfit: netProfit.toString(),
        }

    });
}

export const getEventByKeeper = (events, keeper) => events.filter(event => event.returnValues._keeper === keeper);

