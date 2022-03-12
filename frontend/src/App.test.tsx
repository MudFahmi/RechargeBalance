import { render } from '@testing-library/react';
import App from './App';
import { ReduxWrapper } from './utils/test';

describe("App", () => {
  test('render without craching', () => {
    render(<App />, { wrapper: ReduxWrapper });
  });
})
