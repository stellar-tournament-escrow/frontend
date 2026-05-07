import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusBadge from '@/components/StatusBadge';

describe('StatusBadge', () => {
  it('renders the correct label for RegistrationOpen', () => {
    render(<StatusBadge status="RegistrationOpen" />);
    expect(screen.getByText('Registration Open')).toBeInTheDocument();
  });

  it('renders Completed', () => {
    render(<StatusBadge status="Completed" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders Disputed', () => {
    render(<StatusBadge status="Disputed" />);
    expect(screen.getByText('Disputed')).toBeInTheDocument();
  });
});
