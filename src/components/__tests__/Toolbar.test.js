import { render, screen } from '@testing-library/react';

import Toolbar from '../Toolbar';

describe('<Toolbar /> component', () => {
  it("should render a loader component with specific class", () => {
    const { container } = render(<Toolbar />);

    expect(container.firstChild.classList.contains("toolbar")).toBeTruthy();
  });

  it('should contain a title of the application', () => {
    render(<Toolbar />);
    const headerElementWithTitle = screen.getByText(/simple content app/i);

    expect(headerElementWithTitle).toBeInTheDocument();
  });
});
