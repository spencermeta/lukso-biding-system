import React, {useContext, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { GlobalContext } from '../contexts/GlobalContext';
import { makeStyles } from '@material-ui/core/styles';

const white = '#ffffff';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingBottom: theme.spacing(3),
    },
    status: {
      marginRight: theme.spacing(2),
      textAlign: 'right',
    },
    title: {
      marginRight: theme.spacing(3),
    },
    icon: {
      marginRight: theme.spacing(1),
      marginLeft: 'auto',
    },
  };
});

const sliceAddress = (address, sliceBy = 6) => {
  let sliceAddress = ""
  if (address) {
    let account = address.account;
    sliceAddress = `${account.slice(0, sliceBy + 2)}...${account.slice(-sliceBy)}`
  }

  return sliceAddress
}

const Header = () => {

  const { setAccount, account, setWalletConnected, walletConnected } = useContext(GlobalContext);

  const classes = useStyles();

  async function  walletClick () {

    if (!window.lukso) {
      alert('Please connect to Universal Profile Extension or MetaMask');
      return;
    }

    try {
      // request access to the extension
      window.lukso
          .request({
            method: 'eth_requestAccounts',
          })
          .then(function (accounts) {
            // check if any number of accounts was returned
            // IF go to the dashboard
            if (accounts.length) {
              setAccount(accounts[0]);
              setWalletConnected(true);
            } else {
              console.log('User denied access');
            }
          });
    } catch (error) {
      if (error.message === 'User denied access') {
        console.log('User denied access');
      } else {
        console.log(error);
      }
    }


  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lukso NFT Store
          </Typography>

          <PowerSettingsNewIcon className={classes.icon} />

          {walletConnected &&
            <div className={classes.status}> {sliceAddress({account})} </div>
          }
          {!walletConnected &&
            <Button variant="outlined" style={{color: white}} onClick={walletClick}>connect </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
