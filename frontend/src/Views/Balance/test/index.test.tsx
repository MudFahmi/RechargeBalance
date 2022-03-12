import { fireEvent, render, screen } from '@testing-library/react';
import BalancePage from '../index';
import { ReduxWrapper } from '../../../utils/test';

describe("Balance Page", () => {
  beforeEach(() => {
    render(<BalancePage />, { wrapper: ReduxWrapper });
  });

  test('render Current Balance text', () => {
    const linkElement = screen.getByText(/Current Balance/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('render progressbar at intialize', () => {
    const linkElement = screen.getByRole('progressbar');
    expect(linkElement).toBeInTheDocument();
  });
  test('render default balance is hidden', () => {
    const linkElement = screen.getByText(/\*\$/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('render hide and show button', () => {
    const linkElement = screen.getByTestId('hideOrShow');
    expect(linkElement).toBeInTheDocument();
  });
  
  test('render show balance when click on eye button', () => {
    const buttonElement = screen.getByTestId('hideOrShow');
    fireEvent.click(buttonElement)
    const balanceElement = screen.getByText(/0\$/i);
    expect(balanceElement).toBeInTheDocument();
  });

  test('render recharge dialog when click on the button to open it', () => {
    const buttonElement = screen.getByTestId('openRechargeDialog');
    fireEvent.click(buttonElement)
    const dialogTitleElement = screen.getByTestId('chargeDialogTitle');
    expect(dialogTitleElement).toBeInTheDocument();
  });
})
