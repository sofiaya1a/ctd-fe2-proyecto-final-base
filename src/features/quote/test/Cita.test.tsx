import { act, cleanup, render, screen, findByRole } from '../../../test/test-utils';
import { waitFor, fireEvent } from '@testing-library/react';
import Cita from '../../quote/test/Cita';

describe('Cita', () => {
  beforeEach(() => {
    render(<Cita />);
  });

  afterEach(() => {
    cleanup();
  });

  it("Should render button 'Obtener cita aleatoria' and empty input by default", async () => {
    const citaRandomButton = screen.queryByRole('button', { name: 'Obtener cita aleatoria' });

    const input = screen.queryByPlaceholderText('Ingresa el nombre del autor');

    expect(citaRandomButton).toBeInTheDocument();
    expect(input).toBeEmptyDOMElement();
  });

  it("should fetch random quote when clicking button 'Obtener cita aleatoria' ", async () => {
    const citaRandomButton = await screen.findByRole('button', { name: /Obtener cita aleatoria/i });

    act(async () => {
      await waitFor(() => {
        fireEvent.click(citaRandomButton);
      });
      await waitFor(() => {
        expect(screen.getByText("Hey, I'm the chief here. Bake him away, toys.")).toBeInTheDocument();
      });
      const quote = await screen.findByText("Hey, I'm the chief here. Bake him away, toys.");
      const author = await screen.findByText('Chief Wiggum');

      expect(quote).toBeInTheDocument();
      expect(author).toBeVisible();
    });
  });

});
export {};
