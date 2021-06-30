import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Toolbar,
  Typography,
  Paper,
  TableContainer,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import { useStyles, useToolbarStyles, useHeaderStyles } from './styles'
import { KEEPER_HISTORY_DATE_FILTER } from '../../shared/constants';
import { useAppDispatch } from '../../state';
import { fetchKeeperState } from '../../state/blockchain-events/thunks';
import { useEventData } from '../../state/blockchain-events/selectors';
import { getKeeperRows } from '../../shared/calculation';

const headCells = [
  { id: 'keeper', numeric: false, disablePadding: true, label: 'Keeper' },
  { id: 'winRate', numeric: true, disablePadding: false, label: 'Win Rate' },
  { id: 'earn', numeric: true, disablePadding: false, label: 'Earn' },
  { id: 'estimatedSpent', numeric: true, disablePadding: false, label: 'Estimated Spent' },
  { id: 'netProfit', numeric: true, disablePadding: false, label: 'Net Profit' },
];

function KeeperTableHead() {
  const classes = useHeaderStyles();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding='default'
            classes={{ root: classes.cellRoot }}
          >{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const KeeperTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(KEEPER_HISTORY_DATE_FILTER.LAST_DAY);

  const { onChangeFilter } = props;

  const handleFilterPeriod = (event) => {
    console.log('targetValue is:', event.target.value);
    const newValue = event.target.value;
    setValue(newValue);
    onChangeFilter(newValue);
  };

  return (
    <>
      <Toolbar
        className={clsx(classes.root)}
      >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Lucky Keeper
        </Typography>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.label }}>Range filter</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={handleFilterPeriod}
            label="Period"
            classes={{ root: classes.selectRoot, icon: classes.selectIcon }}
          >
            <MenuItem value={KEEPER_HISTORY_DATE_FILTER.LAST_DAY}>Last day</MenuItem>
            <MenuItem value={KEEPER_HISTORY_DATE_FILTER.LAST_WEEK}>Last week</MenuItem>
            <MenuItem value={KEEPER_HISTORY_DATE_FILTER.LAST_MONTH}>Last month</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </>
  );
};

export default function KeeperTable() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [currentDateRange, setDateRange] = useState(KEEPER_HISTORY_DATE_FILTER.LAST_DAY);

  const { events } = useEventData() || {};

  const rows = getKeeperRows(events.NewData, events.Winner);

  useEffect(() => {
    dispatch(fetchKeeperState(currentDateRange));
  }, [currentDateRange]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <KeeperTableToolbar onChangeFilter={setDateRange} />
        <TableContainer>
          <Table
            className={classes.table}
            size='medium'
          >
            <KeeperTableHead
              classes={classes}
            />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.name}
                    classes={{ root: classes.rowRootHover }}
                  >
                    <TableCell classes={{ root: classes.cellRoot }} component="th" id={labelId} scope="row">
                      {row.keeper}
                    </TableCell>
                    <TableCell classes={{ root: classes.cellRoot }} align="right">{row.winRate}</TableCell>
                    <TableCell classes={{ root: classes.cellRoot }} align="right">{row.earn}</TableCell>
                    <TableCell classes={{ root: classes.cellRoot }} align="right">{row.estimatedSpent}</TableCell>
                    <TableCell classes={{ root: classes.cellRoot }} align="right">{row.netProfit}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
