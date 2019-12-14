import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SignIn from './SignIn'
import SignUp from './SignUp'
import AuthLayout from './components/AuthLayout'
import AuthButton from './components/AuthButton'
import AuthEmailField from './components/AuthEmailField'
import AuthPasswordField from './components/AuthPasswordField'

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

describe('<AuthLayout />', () => {
  const container = shallow(<AuthLayout />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('<AuthButton></AuthButton>', () => {
  const container = mount(<AuthButton>Test</AuthButton>)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('<AuthEmailField />', () => {
  const container = mount(<AuthEmailField />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('<AuthPasswordField />', () => {
  const container = mount(<AuthPasswordField />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})
