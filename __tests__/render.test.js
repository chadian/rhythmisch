import { render } from "@testing-library/react";
import RhythmischApp from "../pages/index";
import "@testing-library/jest-dom/extend-expect";

let rendered;

beforeEach(() => {
  rendered = render(<RhythmischApp/>);
})

describe('render' , () => {
  it("renders the Rhythmisch header text", () => {
    const headerText = rendered.getByText('Rhythmisch', { exact: true , selector: 'header > *' });
    expect(headerText).toBeInTheDocument();
  });

  it("renders an Add button", () => {
    const addButton = rendered.getByRole('button', { name: 'Add' });
    expect(addButton).toBeInTheDocument();
  });

  it("renders the default Rhythm", () => {
    const action = rendered.getByText('Use Rhythmisch');
    expect(action).toBeInTheDocument();

    const frequency = rendered.getByText('once every day');
    expect(frequency).toBeInTheDocument();

    const reason = rendered.getByText('because I want to get into the rhythm');
    expect(reason).toBeInTheDocument();

    const historicalOccurrences = rendered.getAllByLabelText(/Missed target on /);
    expect(historicalOccurrences).toHaveLength(13);

    const todaysOccurrence = rendered.getByLabelText(/Mark as /);
    expect(todaysOccurrence).toBeInTheDocument();
  });
});
