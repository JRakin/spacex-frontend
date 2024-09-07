import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLaunchStore } from './launchStores';
import { apiClient } from '@/helper/helper';
import { toast } from 'vue3-toastify';
import type { Mock } from 'vitest';

vi.mock('@/helper/helper', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('vue3-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('LaunchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetchAllLaunches should fetch and set launches', async () => {
    const mockLaunches = [
      { flight_number: 1, name: 'Launch 1', date_utc: '2024-09-01T00:00:00Z', _id: '1' },
    ];

    (apiClient.get as Mock).mockResolvedValue({ data: mockLaunches });

    const store = useLaunchStore();
    await store.fetchAllLaunches();

    expect(store.launches).toEqual(mockLaunches);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('fetchAllLaunches should handle errors', async () => {
    (apiClient.get as Mock).mockRejectedValue(new Error('Network Error'));

    const store = useLaunchStore();
    await store.fetchAllLaunches();

    expect(store.launches).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe('Failed to fetch launches data');
    expect(toast.error).toHaveBeenCalledWith('Failed to fetch data');
  });

  it('fetchSavedLaunches should fetch and set saved launches', async () => {
    const mockLaunches = [
      { flight_number: 2, name: 'Launch 2', date_utc: '2024-09-02T00:00:00Z', _id: '2' },
    ];

    (apiClient.get as Mock).mockResolvedValue({ data: mockLaunches });

    const store = useLaunchStore();
    await store.fetchSavedLaunches();

    expect(store.launches).toEqual(mockLaunches);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it('fetchSavedLaunches should handle errors', async () => {
    (apiClient.get as Mock).mockRejectedValue(new Error('Network Error'));

    const store = useLaunchStore();
    await store.fetchSavedLaunches();

    expect(store.launches).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe('Failed to fetch launches data');
  });

  it('addLaunch should add a launch and handle success', async () => {
    const newLaunch = { flight_number: 3, name: 'Launch 3', date_utc: '2024-09-03T00:00:00Z', _id: '3' };
    
    (apiClient.post as Mock).mockResolvedValue({ data: newLaunch });

    const store = useLaunchStore();
    store.launches = [
      { flight_number: 1, name: 'Launch 1', date_utc: '2024-09-01T00:00:00Z', _id: '1' },
    ];

    await store.addLaunch(newLaunch);

    expect(store.launches).toHaveLength(1);
    expect(toast.success).toHaveBeenCalledWith('Launch added successfully');
  });

  it('addLaunch should handle errors', async () => {
    (apiClient.post as Mock).mockRejectedValue(new Error('Failed to add launch'));

    const store = useLaunchStore();
    await store.addLaunch({ flight_number: 4, name: 'Launch 4', date_utc: '2024-09-04T00:00:00Z', _id: '4' });

    expect(toast.error).toHaveBeenCalledWith('Failed to add launch');
  });

  it('deleteLaunch should delete a launch and handle success', async () => {
    (apiClient.delete as Mock).mockResolvedValue({});

    const store = useLaunchStore();
    store.launches = [
      { flight_number: 1, name: 'Launch 1', date_utc: '2024-09-01T00:00:00Z', _id: '1' },
      { flight_number: 2, name: 'Launch 2', date_utc: '2024-09-02T00:00:00Z', _id: '2' },
    ];
    await store.deleteLaunch('1');

    expect(store.launches).toHaveLength(1);
    expect(store.launches[0]._id).toBe('2');
    expect(toast.success).toHaveBeenCalledWith('Launch deleted successfully');
  });

  it('deleteLaunch should handle errors', async () => {
    (apiClient.delete as Mock).mockRejectedValue(new Error('Failed to delete launch'));

    const store = useLaunchStore();
    await store.deleteLaunch('1');

    expect(toast.error).toHaveBeenCalledWith('Failed to delete launch');
  });
});
