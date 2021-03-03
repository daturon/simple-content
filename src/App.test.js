import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./App";
import appReducer, { initialAppState } from "./reducer";

const defaultStore = createStore(appReducer, initialAppState);

test("renders core App component", () => {
  const Wrapper = ({ children }) => (
    <Provider store={defaultStore}>{children}</Provider>
  );

  const { container } = render(<App />, { wrapper: Wrapper });
  expect(container.firstChild.classList.contains("app")).toBeTruthy();
});
