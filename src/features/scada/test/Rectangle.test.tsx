import Rectangle from '../Rectangle';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('#rect', () => {
  it('should exist', () => {
    const { container, baseElement } = render(<Rectangle />);
    baseElement.getBoundingClientRect();
  });
});
