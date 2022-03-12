import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert, CircularProgress, Button, Box, Typography, Container, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RechargeDialog from "./RechargeDialog";
import { getUserBalance } from "../../store/actions";
import { UserState } from '../../store/reducer';

type DispatchProps = {
  getUserBalance: () => void
}

const BalancePage = ({ userAccount, loading, error, getUserBalance }: UserState & DispatchProps): JSX.Element => {
  const [currentUserAccount, setCurrentUserAccount] = useState<IUserAccount>(userAccount)
  const [showBalance, setShowBalance] = useState<boolean>(false)
  const [openRechargeDialog, setOpenRechargeDialog] = useState<boolean>(false)

  useEffect(() => {
    getUserBalance()
  }, [getUserBalance])

  useEffect(() => {
    setCurrentUserAccount(userAccount)
  }, [userAccount])

  const handleBalance = (balance: number) => {
    return showBalance ? balance : '******'
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Current Balance
        </Typography>
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          {`${handleBalance(currentUserAccount.balance)}$`}
        </Typography>
        {loading &&
          <Box sx={{ height: 40 }}>
            <CircularProgress />
          </Box>
        }
        {error &&
          <Alert variant="filled" severity="error">{error}</Alert>
        }
        <IconButton
          sx={{ m: 1, bgcolor: 'secondary.main' }}
          aria-label="eye"
          size="large"
          data-testid="hideOrShow"
          onClick={() => setShowBalance(oldShowBalance => !oldShowBalance)}
        >
          {showBalance ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
        </IconButton>
        <Button
          data-testid="openRechargeDialog"
          fullWidth
          variant="contained"
          sx={{ m: 3 }}
          onClick={() => setOpenRechargeDialog(true)}
        >
          Recharge/Add Balance
        </Button>
      </Box>

      <RechargeDialog open={openRechargeDialog} handleClose={() => setOpenRechargeDialog(false)} />
    </Container>
  );
}


const mapStateToProps = (states: UserState): UserState => {
  return states
}

export default connect(mapStateToProps, { getUserBalance })(BalancePage)