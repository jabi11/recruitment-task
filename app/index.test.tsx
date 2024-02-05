import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from './index';

describe('<HomeScreen />', () => {
  it('has 4 children', () => {
    const tree = renderer.create(<HomeScreen/>).toJSON();
    expect(tree.children.length).toBe(4);
  });
});
  