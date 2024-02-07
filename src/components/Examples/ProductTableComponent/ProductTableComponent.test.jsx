import { render, screen, waitFor } from '@testing-library/react';
import ProductTableComponent from './ProductTableComponent';
import { describe, it, vi, expect } from 'vitest';
import axios from 'axios';

/**
 * Test de renderizado de ProductTableComponent
 * Este test fue armado utilizando
 * https://stackoverflow.com/questions/70450576/how-to-test-react-component-with-axios-request-in-useeffect
 * https://www.meticulous.ai/blog/how-to-use-react-testing-library-to-wait-for-async-elements-a-step-by-step-guide
 *
 */
describe('ProductTableComponent', () => {
  // Debe tener la función async, ya que se espera un resultado asíncrono
  it('renders a table', async () => {
    // mock de la respuesta del servidor
    const axiosResponse = {
      data: [
        {
          name: 'Product 1',
          description: 'Description 1',
          sale_price: 100,
        },
        {
          name: 'Product 2',
          description: 'Description 2',
          sale_price: 200,
        },
      ],
    };
    // spy para interceptar la llamada a axios.get
    const spy = vi.spyOn(axios, 'get');
    spy.mockImplementationOnce(() => Promise.resolve(axiosResponse));
    // renderizado del componente
    render(<ProductTableComponent />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    // espera a que se renderice el contenido de la tabla
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });
});
