
import 'react-native';
import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Text } from './Text';

describe('Text', () => {
  it('jest snapshots should be working', () => {
    const tree = renderer.create(<Text />).toJSON(); 
    expect(tree).toMatchSnapshot();
  })

  it('enzyme should be working', () => {
    const wrapper = shallow(<Text />);
    expect(wrapper).toBeTruthy();
  })
})