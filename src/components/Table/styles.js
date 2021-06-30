import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    padding: '20px 0',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    background: '#424242',
    color: '#ffffff'
  },
  table: {
    minWidth: 750,
  },
  cellRoot: {
    borderBottom: '1px solid rgba(81, 81, 81, 1)',
    color: '#ffffff',
  },
  rowRootHover: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
    }
  }
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  label: {
    color: "#ffffff"
  },
  selectIcon: {
    color: "#ffffff"
  },
  selectRoot: {
    color: "#ffffff"
  },
}));

const useHeaderStyles = makeStyles((theme) => ({
  cellRoot: {
    borderBottom: '1px solid rgba(81, 81, 81, 1)',
    color: '#ffffff',
    fontWeight: 600
  }
}));

export { useStyles, useToolbarStyles, useHeaderStyles }