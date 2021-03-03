import React from "react";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { fromJS } from "immutable";

import appReducer, { initialAppState } from "../../../reducer";
import HomePage from "../index.js";

jest.mock("../../../actions", () => {
  const actualActions = jest.requireActual("../../../actions");

  return {
    ...actualActions,
    getContentById: () => ({ type: "unknown_action_type" }),
  };
});

const defaultStore = createStore(appReducer, initialAppState);

describe("<HomePage> component", () => {
  it("should have a wrapper component", () => {
    const Wrapper = ({ children }) => (
      <Provider store={defaultStore}>{children}</Provider>
    );

    const { container } = render(<HomePage />, { wrapper: Wrapper });
    expect(
      container.firstChild.classList.contains("home-page-content")
    ).toBeTruthy();
  });

  it("should render a loader if there is some loading", () => {
    const store = createStore(appReducer, initialAppState.set("loading", true));
    const Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { container } = render(<HomePage />, { wrapper: Wrapper });
    expect(container.getElementsByClassName("loader").length).toBe(1);
  });

  it("should not render any loader if there is not any loading", () => {
    const store = createStore(
      appReducer,
      initialAppState.set("loading", false)
    );
    const Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { container } = render(<HomePage />, { wrapper: Wrapper });
    expect(container.getElementsByClassName("loader").length).toBe(0);
  });

  it("should render a toastify component", () => {
    const Wrapper = ({ children }) => (
      <Provider store={defaultStore}>{children}</Provider>
    );

    const { container } = render(<HomePage />, { wrapper: Wrapper });
    expect(container.getElementsByClassName("Toastify").length).toBe(1);
  });

  it("should render an Article component if we had a content data", () => {
    const title = "Some Title";
    const store = createStore(
      appReducer,
      initialAppState.set(
        "contentElements",
        fromJS({ heading: { value: title } })
      )
    );
    const Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { container } = render(<HomePage />, { wrapper: Wrapper });
    expect(container.getElementsByClassName("article-full").length).toBe(1);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should not render any Article component if we had not any content data", () => {
    const Wrapper = ({ children }) => (
      <Provider store={defaultStore}>{children}</Provider>
    );

    const { container } = render(<HomePage />, { wrapper: Wrapper });
    expect(container.getElementsByClassName("article-full").length).toBe(0);
  });
});
