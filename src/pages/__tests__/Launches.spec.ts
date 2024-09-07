import { describe, it, expect, vi } from "vitest";
import Launches from "../Launches.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

vi.mock("launchStores", () => ({
  useLaunchStore: vi.fn(() => ({
    fetchAllLaunches: vi.fn(),
    launches: [
      {
        flight_number: 1,
        name: "Launch 1",
        date_utc: "2024-09-01T00:00:00Z",
        _id: "1",
      },
    ],
    loading: false,
    addLaunch: vi.fn(),
  })),
}));

describe("Launches", () => {
  it("should display Spinner while loading", async () => {
    const wrapper = mount(Launches, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              launchStore: {
                launches: [
                  {
                    flight_number: 1,
                    name: "Launch 1",
                    date_utc: "2024-09-01T00:00:00Z",
                    _id: "1",
                  },
                ],
                loading: true,
                addLaunch: vi.fn(),
              },
            },
          }),
        ],
      },
    });
    await wrapper.vm.$nextTick();

    const spinnerElement = wrapper.find('[data-testid="spinner-svg"]');
    expect(spinnerElement.exists()).toBe(true);
  });

  it("should render LaunchTable when not loading", async () => {
    const wrapper = mount(Launches, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              launchStore: {
                launches: [
                  {
                    flight_number: 1,
                    name: "Launch 1",
                    date_utc: "2024-09-01T00:00:00Z",
                    _id: "1",
                  },
                ],
                loading: false,
                addLaunch: vi.fn(),
              },
            },
          }),
        ],
      },
    });

    await wrapper.vm.$nextTick();
    const launchNameElement = wrapper.find('[data-testid="launch-name"]');
    const addButton = wrapper.find('[data-testid="add-button"]');
    expect(launchNameElement.exists()).toBe(true);
    expect(addButton.exists()).toBe(true);
    expect(launchNameElement.text()).toContain("Launch 1");
  });
});
