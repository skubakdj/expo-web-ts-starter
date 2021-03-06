import 'react-native'
import * as React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { Example } from './Example'

describe('Text', () => {
  it('jest snapshots should be working', () => {
    const tree = renderer.create(<Example />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('enzyme should be working', () => {
    const wrapper = shallow(<Example />)
    expect(wrapper).toBeTruthy()
  })
})
