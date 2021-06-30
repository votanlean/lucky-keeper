import Faker from 'faker';
import { BIG_TEN, BIG_ZERO } from './constants';
import BN from 'bn.js';

function getTxGasFeeByTxHash(txHash) {
    return new BN(Faker.datatype.number({ min: 1, max: 99 })).mul(BIG_TEN.pow(new BN(14)));
}

export function getTotalGasFeeForTransactions(txHashes) {
    const allGasFees = txHashes.map(getTxGasFeeByTxHash);

    return allGasFees.reduce((agg, curr) => agg.add(curr), BIG_ZERO);
}