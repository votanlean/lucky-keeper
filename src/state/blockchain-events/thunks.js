import Faker from 'faker';
import BN from 'bn.js';

import { blockchainEventActions } from '.';
import dayjs from 'dayjs';
import { convertDateRangeInStringToTimestamp } from '../../shared/timestamp';
import { BIG_TEN, CURRENT_BLOCK, KEEPER_HISTORY_DATE_FILTER } from '../../shared/constants';

function generateMockBlockchainData() {
  const mockBlockchainData = {
    NewData: [],
    Winner: [],
  };

  // Assume that blocktime is 1 day;
  const mockDataCount = 30;
  const totalKeepersCount = 10;

  for (let i = 0; i < mockDataCount; i++) {
    const blockNumber = i + 1;
    const todayKeeperCount = Faker.datatype.number({ min: 3, max: 5 });

    const tempNewData = [];

    for (let j = 0; j < todayKeeperCount; j++) {
      tempNewData.push({
        blockNumber,
        transactionHash: Faker.datatype.uuid(),
        returnValues: {
          _keeper: Faker.datatype.number({ min: 1, max: totalKeepersCount }),
          _price: new BN(Faker.datatype.number({ min: 1, max: 100 })).mul(BIG_TEN.pow(new BN(18))),
          _timestamp: Math.round(Faker.datatype.datetime({
            min: Math.round(dayjs().subtract(1, 'month').valueOf() / 1000),
            max: Math.round(dayjs().valueOf() / 1000),
          }).valueOf() / 1000),
        },
      });
    }

    const winnerIndex = Faker.datatype.number({ min: 0, max: tempNewData.length - 1 });
    const winner = tempNewData[winnerIndex];

    mockBlockchainData.NewData.push(...tempNewData);
    mockBlockchainData.Winner.push({
      blockNumber,
      transactionHash: Faker.datatype.uuid(),
      returnValues: {
        _keeper: winner.returnValues._keeper,
        _reward: new BN(Faker.datatype.number({ min: 1, max: 99 })).mul(BIG_TEN.pow(new BN(17))),
        _timestamp: Math.round(Faker.datatype.datetime({
          min: Math.round(dayjs().subtract(1, 'month').valueOf() / 1000),
          max: Math.round(dayjs().valueOf() / 1000),
        }).valueOf() / 1000),
      },
    });
  }

  return mockBlockchainData;
}

const mockBlockChainData = generateMockBlockchainData();

export const fetchKeeperState = (dateRange) => async (dispatch) => {
  const NewDataEventData = await queryBlockChainForFilter({ dateRange, eventName: 'NewData' });
  const WinnerEventData = await queryBlockChainForFilter({ dateRange, eventName: 'Winner' });

  dispatch(blockchainEventActions.fetchEventData({
    events: {
      NewData: NewDataEventData,
      Winner: WinnerEventData,
    },
  }));
}

async function queryBlockChainForFilter({ dateRange, eventName }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockEventData = mockBlockChainData[eventName];

      let fromBlock;

      switch (dateRange) {
        case KEEPER_HISTORY_DATE_FILTER.LAST_DAY:
          fromBlock = CURRENT_BLOCK - 1;
          break;
        case KEEPER_HISTORY_DATE_FILTER.LAST_WEEK:
          fromBlock = CURRENT_BLOCK - 7;
          break;
        case KEEPER_HISTORY_DATE_FILTER.LAST_MONTH:
          fromBlock = CURRENT_BLOCK - 30;
          break;
        default:
          throw new Error('Invalid date range');
      }

      resolve(mockEventData.filter(event => event.blockNumber >= fromBlock));
    }, 300);
  });
}