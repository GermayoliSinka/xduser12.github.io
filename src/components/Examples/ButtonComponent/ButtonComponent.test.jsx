import { render, screen } from '@testing-library/react';
import ButtonComponent from './ButtonComponent';
import { describe, it, expect } from 'vitest';

/**
 * Test de renderizado de ButtonComponent
 */
describe('ButtonComponent', () => {
  it('renders a button', () => {
    render(<ButtonComponent text="my button" />);
    const button = screen.getByText('my button');
    expect(button).toBeInTheDocument();
  });
});
