import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveViewer from './InteractiveViewer';

describe('InteractiveViewer', () => {
  it('renders children correctly', () => {
    render(
      <InteractiveViewer>
        <div data-testid="child-element">Child content</div>
      </InteractiveViewer>
    );
    expect(screen.getByTestId('child-element')).toBeTruthy();
  });

  it('updates transform on keyboard navigation', () => {
    render(
      <InteractiveViewer>
        <div data-testid="child-element">Child content</div>
      </InteractiveViewer>
    );

    const container = screen.getByTestId('child-element').parentElement!;
    // container has tabIndex={0}
    expect(container.style.transform).toContain('translate(0px, 0px) scale(1)');

    // Simulate key down 'd' (move left -> pan x decreases)
    fireEvent.keyDown(screen.getByTestId('child-element').parentElement!.parentElement!, {
      key: 'd',
    });
    expect(container.style.transform).toContain('translate(-30px, 0px)');

    // Simulate key down '+' (zoom in)
    fireEvent.keyDown(screen.getByTestId('child-element').parentElement!.parentElement!, {
      key: '+',
    });
    expect(container.style.transform).toContain('scale(1.1)');
  });
});
