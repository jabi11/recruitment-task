import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../app/index';

describe('Home Screen', () => {
  it('has 4 children', () => {
    const tree = renderer.create(<HomeScreen/>).toJSON();
    expect(tree?.children.length).toBe(4);
  });
});
  