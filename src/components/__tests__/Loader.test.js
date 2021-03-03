import { render } from "@testing-library/react";

import Loader from "../Loader";

describe("<Loader /> component", () => {
  it("should render a loader component with specific class", () => {
    const { container } = render(<Loader />);

    expect(container.firstChild.classList.contains("lds-roller")).toBeTruthy();
  });
});
