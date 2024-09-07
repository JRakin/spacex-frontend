import { render } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Spinner from '@/components/Spinner.vue'; // Adjust the path as necessary

describe('Spinner.vue', () => {
  it('renders the spinner correctly', () => {
    const { getByTestId } = render(Spinner);

    const svgElement = getByTestId('spinner-svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('animate-spin');
    expect(svgElement).toHaveClass('h-10');
    expect(svgElement).toHaveClass('w-10');
    expect(svgElement).toHaveClass('text-green-500');
  });
});
