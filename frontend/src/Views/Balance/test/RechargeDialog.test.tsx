import { fireEvent, render, screen } from '@testing-library/react';
import RechargeDialog from '../RechargeDialog';
import { ReduxWrapper } from '../../../utils/test';

describe("Recharge Dialog", () => {
  beforeEach(() => {
    render(<RechargeDialog open={true} handleClose={jest.fn()} />, { wrapper: ReduxWrapper });
  });

  test('render Dialog title', () => {
    const linkElement = screen.getByTestId('chargeDialogTitle');
    expect(linkElement).toBeInTheDocument();
  });

  test('render Recharge Button', () => {
    const buttonElement = screen.getByTestId('SubmitRecharge');
    expect(buttonElement).toBeInTheDocument();
  });
  test('render Recharge Button is disabled as default', () => {
    const buttonElement = screen.getByTestId('SubmitRecharge') as HTMLButtonElement;
    expect(buttonElement.disabled).toBeTruthy();
  });
  test('render Recharge Button is abled after fill form with valid values', () => {
    const buttonElement = screen.getByTestId('SubmitRecharge') as HTMLButtonElement;
    fireEvent.change(screen.getByLabelText(/^Name On Card/i), { target: { value: 'Test Suite' } })
    fireEvent.change(screen.getByLabelText(/^Card Number/i), { target: { value: '5212123412873246' } })
    fireEvent.change(screen.getByLabelText(/^Expiry Date/i), { target: { value: '122022' } })
    fireEvent.change(screen.getByLabelText(/^CVV/i), { target: { value: '222' } })
    expect(buttonElement.disabled).toBeFalsy();
  });

  test('validate on Card Name and show error message', () => {
    const inputElement = screen.getByLabelText(/^Name On Card /i)
    fireEvent.change(inputElement, { target: { value: 'test' } })
    fireEvent.change(inputElement, { target: { value: '' } })
    const inputErrorElement = screen.getByText(/Name On Card is not valid/i);
    expect(inputErrorElement).toBeInTheDocument();
  });
  test('validate on Card Name and do not show error message', () => {
    const inputElement = screen.getByLabelText(/^Name On Card/i)
    fireEvent.change(inputElement, { target: { value: 'Test Suite' } })
    const inputErrorElement = screen.queryByText(/Name On Card is not valid/i);
    expect(inputErrorElement).not.toBeInTheDocument();
  });

  test('validate on Card number and show error message', () => {
    const cardNumberInputElement = screen.getByLabelText(/^Card Number/i)
    fireEvent.change(cardNumberInputElement, { target: { value: '2312' } })
    const cardNumberErrorElement = screen.getByText(/Card Number is not valid/i);
    expect(cardNumberErrorElement).toBeInTheDocument();
  });

  test('validate on Card number and do not show error message', () => {
    const cardNumberInputElement = screen.getByLabelText(/^Card Number/i)
    fireEvent.change(cardNumberInputElement, { target: { value: '5212123412873246' } })
    const cardNumberErrorElement = screen.queryByText(/Card Number is not valid/i);
    expect(cardNumberErrorElement).not.toBeInTheDocument();
  });

  test('create mask on Card number value', () => {
    const cardNumberInputElement = screen.getByLabelText(/^Card Number/i) as HTMLInputElement
    fireEvent.change(cardNumberInputElement, { target: { value: '2312134585648493MoreChars' } })
    expect(cardNumberInputElement.value).toBe('2312 1345 8564 8493');
  });

  test('create mask on Expiry Date value', () => {
    const inputElement = screen.getByLabelText(/^Expiry Date/i) as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: '122022' } })
    expect(inputElement.value).toBe('12/2022');
  });

  test('validate on Expiry Date and show error message', () => {
    const inputElement = screen.getByLabelText(/^Expiry Date/i)
    fireEvent.change(inputElement, { target: { value: '222222' } })
    const inputErrorElement = screen.getByText(/Expiry Date is not valid/i);
    expect(inputErrorElement).toBeInTheDocument();
  });

  test('validate on Expiry Date when in past and show error message', () => {
    const inputElement = screen.getByLabelText(/^Expiry Date/i)
    fireEvent.change(inputElement, { target: { value: '122021' } })
    const inputErrorElement = screen.getByText(/Please select a valid expiry date/i);
    expect(inputErrorElement).toBeInTheDocument();
  });

  test('validate on Expiry Date and do not show error message', () => {
    const inputElement = screen.getByLabelText(/^Expiry Date/i)
    fireEvent.change(inputElement, { target: { value: '122022' } })
    const inputErrorElement = screen.queryByText(/Expiry Date is not valid/i);
    expect(inputErrorElement).not.toBeInTheDocument();
  });

  test('validate on CVV and show error message', () => {
    const inputElement = screen.getByLabelText(/^CVV/i)
    fireEvent.change(inputElement, { target: { value: '22212' } })
    const inputErrorElement = screen.getByText(/CVV Number is not valid/i);
    expect(inputErrorElement).toBeInTheDocument();
  });
  test('validate on CVV and do not show error message', () => {
    const inputElement = screen.getByLabelText(/^CVV/i)
    fireEvent.change(inputElement, { target: { value: '222' } })
    const inputErrorElement = screen.queryByText(/CVV Number is not valid/i);
    expect(inputErrorElement).not.toBeInTheDocument();
  });

  // test('render default balance is hidden', () => {
  //   const linkElement = screen.getByText(/\*\$/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
  // test('render hide and show button', () => {
  //   const linkElement = screen.getByTestId('hideOrShow');
  //   expect(linkElement).toBeInTheDocument();
  // });

  // test('render show balance when click on eye button', () => {
  //   const buttonElement = screen.getByTestId('hideOrShow');
  //   fireEvent.click(buttonElement)
  //   const balanceElement = screen.getByText(/0\$/i);
  //   expect(balanceElement).toBeInTheDocument();
  // });

  // test('render recharge dialog when click on the button to open it', () => {
  //   const buttonElement = screen.getByTestId('openRechargeDialog');
  //   fireEvent.click(buttonElement)
  //   const dialogTitleElement = screen.getByTestId('chargeDialogTitle');
  //   expect(dialogTitleElement).toBeInTheDocument();
  // });
})
