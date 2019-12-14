import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SignIn from './SignIn'
import SignUp from './SignUp'

configure({ adapter: new Adapter() })

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}))

describe('<SignIn />', () => {
  const container = shallow(<SignIn />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('<SignUp />', () => {
  const container = shallow(<SignUp />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})
