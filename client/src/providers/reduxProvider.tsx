import { Provider } from 'react-redux'
import { store } from "../store/store";

type ReduxProviderProps = {
    children: JSX.Element
    reduxStore: typeof store
}

const ReduxProvider = ({ children, reduxStore }: ReduxProviderProps) => (
    <Provider store={reduxStore}>{children}</Provider>
)

export const wrapper = (children: JSX.Element) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
);