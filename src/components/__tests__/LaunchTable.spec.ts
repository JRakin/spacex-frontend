import { render, fireEvent, screen } from '@testing-library/vue';
import LaunchTable from '@/components/LaunchTable.vue';
import type { Launch } from '@/types/launch';
import { describe, it, expect, vi } from 'vitest'; 
import '@testing-library/jest-dom';

vi.mock('helper', () => ({
  convertDate: (date: string) => date,
}));

describe('LaunchTable.vue', () => {
  const launches: Launch[] = [
    { flight_number: 1, name: 'Launch 1', date_utc: new Date('2024-09-01T00:00:00Z'), _id: '1' },
    { flight_number: 2, name: 'Launch 2', date_utc: new Date('2024-09-02T00:00:00Z'), _id: '2' },
  ];

  it('renders launch data correctly', () => {
    const { getByText } = render(LaunchTable, {
      props: { launches }
    });

    expect(getByText('Flight Number')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Date')).toBeInTheDocument();
    expect(getByText('Action')).toBeInTheDocument();
    expect(getByText('Launch 1')).toBeInTheDocument();
    expect(getByText('Launch 2')).toBeInTheDocument();
  });

  it('shows "Add" button when showDeleteButton is false', () => {
    const { getAllByTestId } = render(LaunchTable, {
      props: { launches, showDeleteButton: false }
    });

    const addButtons = getAllByTestId('add-button');
    expect(addButtons.length).toBe(2);
  });

  it('shows "Delete" button when showDeleteButton is true', () => {
    const { getAllByRole } = render(LaunchTable, {
      props: { launches, showDeleteButton: true }
    });

    const deleteButtons = getAllByRole('button', { name: /Delete/i });
    expect(deleteButtons.length).toBe(2);
  });

  it('calls addLaunch when "Add" button is clicked', async () => {
    const addLaunch = vi.fn();
    const { getByRole } = render(LaunchTable, {
      props: { launches, showDeleteButton: false, addLaunch }
    });

    const addButtons = screen.getAllByTestId('add-button');

    await fireEvent.click(addButtons[0]);
    expect(addLaunch).toHaveBeenCalledWith(launches[0]);
  });

  it('calls deleteLaunch when "Delete" button is clicked', async () => {
    const deleteLaunch = vi.fn();
    const { getByRole } = render(LaunchTable, {
      props: { launches, showDeleteButton: true, deleteLaunch }
    });

    const deleteButtons = screen.getAllByTestId('delete-button');

    await fireEvent.click(deleteButtons[0]);
    expect(deleteLaunch).toHaveBeenCalledWith('1');
  });
});
