import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './components/App';

test('renders LightControl component', () => {
  render(<App />);
  const lightControlElement = screen.getByText(/light control/i);
  expect(lightControlElement).toBeInTheDocument();
});

test('turns light on and off', () => {
  render(<App />);
  
  const turnOnButton = screen.getByRole('button', { name: /turn on/i });
  const turnOffButton = screen.getByRole('button', { name: /turn off/i });

  fireEvent.click(turnOnButton);
  expect(screen.getByText(/light is on/i)).toBeInTheDocument();

  fireEvent.click(turnOffButton);
  expect(screen.getByText(/light is off/i)).toBeInTheDocument();
});