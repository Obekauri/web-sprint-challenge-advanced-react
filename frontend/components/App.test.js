import React from 'react'
import AppFunctional from "./AppFunctional"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


describe('MyComponent', () => {
  
  test('renders coordinates', () => {
    render(<AppFunctional />);
    screen.getByText('Coordinates (2, 2)')
  });

  test('check moves', () => {
    render(<AppFunctional />);
    screen.getByText('You moved 0 times')
  })

  test('check submit button', () => {
    render(<AppFunctional />);
    screen.getByText('UP')
  })

  test('check button', () => {
    render(<AppFunctional />);
    screen.getByText('DOWN')
  })

  test('check button', () => {
    render(<AppFunctional />);
    screen.getByText('reset')
  })
});
