import { render } from "@testing-library/react";
import RhythmischApp from "../pages/index";
import { RhythmsProvider } from '../hooks/rhythms';
import { setLocalStorageRhythms } from '../hooks/rhythms/local-storage';
import "@testing-library/jest-dom/extend-expect";

let rendered;

function setup() {
  rendered = render(
    <RhythmsProvider>
      <RhythmischApp />
    </RhythmsProvider>
  );
};

describe('render' , () => {
  beforeEach(() => {
    setup();
  });

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

  describe('with an empty list of rhythms', () => {
    beforeEach(() => {
      setLocalStorageRhythms([]);
      setup();
    });

    it("renders an empty rhythm list message", () => {
      const emptyRhythmsText = rendered.getByText("All out of rhythms, enjoy some fresh air 💜");
      expect(emptyRhythmsText).toBeInTheDocument();
    });
  });
});
