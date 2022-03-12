import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";

export const renderWithRedux = (component: JSX.Element) => (
    render(
        <Provider store={store}>
            {component}
        </Provider>
    )
)

export const ReduxWrapper = ({ children }: { children: JSX.Element }) => (
    <Provider store={store}>{children}</Provider>
);