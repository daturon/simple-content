import { screen, render } from "@testing-library/react";
import { fromJS } from "immutable";

import Article from "../../components/Article";

const defaultElements = fromJS({
  heading: {
    value: "Some title",
  },
  author: {
    value: "Some author",
  },
  body: {
    values: ["<p>Test</p>", "<p>Another Test</p>"],
  },
  date: {
    value: "2020-09-06T22:00:00Z",
  },
  mainImage: {
    value: {
      leadImage: {
        renditions: {
          card: {
            url: "test.png",
          },
        },
        asset: {
          altText: "Some image",
        },
      },
    },
  },
});

describe("<Article /> component", () => {
  it("should contain a title if it was passed", () => {
    render(<Article elements={defaultElements} />);
    expect(screen.getByText("Some title")).toBeInTheDocument();
  });

  it("should contain an author name if it was passed", () => {
    render(<Article elements={defaultElements} />);
    expect(screen.getByText("Some author")).toBeInTheDocument();
  });

  it("should contain HTML body of an article if it was passed", () => {
    render(<Article elements={defaultElements} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Another Test")).toBeInTheDocument();
  });

  it("should contain a published date in DD.MM.YYYY format", () => {
    render(<Article elements={defaultElements} />);
    expect(screen.getByText(/[0-9]{2}.[0-9]{2}.2020/)).toBeInTheDocument();
  });

  it("should contain a post image if it was passed", () => {
    render(<Article elements={defaultElements} />);
    expect(screen.getByAltText("Some image")).toBeInTheDocument();
  });
});
