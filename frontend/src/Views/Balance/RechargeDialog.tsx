import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import InputMask from 'react-input-mask'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import Api from '../../api/Api';
import { cvvRegExpression, expireDateRegExpression, masterRegExpression, visaRegExpression } from '../../constants/RegExpressions';
import { getUserBalance } from "../../store/actions";


const fireSuccessMessage = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Done!',
        text: 'You Request to add 10$ to your balance is success!',
        imageUrl: 'https://media.istockphoto.com/photos/money-graph-stock-market-finance-growth-chart-picture-id843522120',
        imageHeight: 120,
        imageAlt: 'Success Request',
        timer: 20000,
    })
}

const validationForm: Record<string, (value: string) => string> = {
    cardName: (value) => value ? '' : 'Name On Card is not valid',
    cardNumber: (value) => {
        if (visaRegExpression.test(value.split(' ').join('')) || masterRegExpression.test(value.split(' ').join(''))) {
            return ''
        }
        return 'Card Number is not valid'
    },
    expDate: (value) => {
        if (expireDateRegExpression.test(value)) {
            const today = new Date();
            const expireDay = new Date();
            expireDay.setFullYear(parseInt(value.split('/')[1]), parseInt(value.split('/')[0]), 1);
            if (expireDay < today) {
                return "The expiry date is before today's date. Please select a valid expiry date";
            }
            return ''
        }
        return 'Expiry Date is not valid'
    },
    cvv: (value) => {
        if (cvvRegExpression.test(value)) {
            return ''
        }
        return 'CVV Number is not valid'
    }
}

type CreditCardInfo = {
    cardName: string;
    cardNumber: string;
    expDate: string;
    cvv: string;
};

type RechargeDialogProps = {
    open: boolean;
    handleClose: () => void;
    getUserBalance: () => void
}
const RechargeDialog = ({ open, handleClose, getUserBalance }: RechargeDialogProps): JSX.Element => {

    const [formData, setFormData] = useState<Partial<CreditCardInfo>>({})
    const [formErrors, setFormErrors] = useState<Partial<CreditCardInfo>>({})
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(oldFormData => ({ ...oldFormData, [name]: value }))

        if (validationForm[name]) {
            setFormErrors(oldFormErrors => ({
                ...oldFormErrors,
                [name]: validationForm[name](value)
            }))
        }
    }

    const handleSubmit = () => {
        setIsLoading(true)
        const charge = { amount: 10 };
        Api.post('balance', charge)
            .then(() => {
                getUserBalance()
                handleClose()
                fireSuccessMessage()
            })
            .catch(err => setError(err?.response?.data?.error))
            .finally(() => setIsLoading(false))
    };

    const canSubmit = useMemo(() => {
        if (Object.values(formData).length === 4) {
            return Object.values(formErrors).every(value => {
                if (value === '') {
                    return true;
                }
                return false;
            });
        }
        return false
    }, [formData, formErrors])

    useEffect(() => {
        setError('')
    }, [open, formData])

    return (
        <div>
            <Dialog open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle data-testid="chargeDialogTitle">Recharge/Add Balance</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 1, mb: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error={Boolean(formErrors?.cardName)}
                                    helperText={formErrors?.cardName}
                                    required
                                    id="cardName"
                                    name="cardName"
                                    label="Name On Card"
                                    value={formData?.cardName}
                                    fullWidth
                                    autoComplete="cc-name"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputMask
                                    mask="9999 9999 9999 9999"
                                    required
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData?.cardNumber}
                                    autoComplete="cc-number"
                                    onChange={handleChange}
                                >
                                    {(inputProps: Record<string, string>) => (
                                        <TextField
                                            {...inputProps}
                                            error={Boolean(formErrors?.cardNumber)}
                                            helperText={formErrors?.cardNumber}
                                            label="Card Number"
                                            fullWidth
                                            variant="standard"
                                        />
                                    )
                                    }
                                </InputMask>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputMask
                                    mask="99/9999"
                                    maskPlaceholder="MM/YYYY"
                                    onChange={handleChange}
                                    required
                                    id="expDate"
                                    name="expDate"
                                    value={formData?.expDate}
                                    autoComplete="cc-exp"
                                >
                                    {(inputProps: Record<string, string>) => (
                                        <TextField
                                            {...inputProps}
                                            error={Boolean(formErrors?.expDate)}
                                            helperText={formErrors?.expDate}
                                            label="Expiry Date"
                                            fullWidth
                                            variant="standard"
                                        />
                                    )
                                    }
                                </InputMask>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error={Boolean(formErrors?.cvv)}
                                    helperText={formErrors?.cvv}
                                    required
                                    id="cvv"
                                    name="cvv"
                                    value={formData?.cvv}
                                    autoComplete="cc-csc"
                                    label="CVV"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    {error &&
                        <Alert variant="filled" severity="error">{error}</Alert>
                    }
                    {isLoading &&
                        <Box sx={{ height: 40 }}>
                            <CircularProgress />
                        </Box>
                    }
                </DialogContent>
                <DialogActions>
                    <Button type='button' onClick={handleClose}>Cancel</Button>
                    <Button
                        data-testId={'SubmitRecharge'}
                        type="submit"
                        disabled={!canSubmit}
                        onClick={handleSubmit}
                        variant='contained'
                    >
                        Charge 10$
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(undefined, { getUserBalance })(RechargeDialog)