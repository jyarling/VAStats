import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
function Dummy() {
  return <div>Hello World</div>
}

test('renders a dummy component', () => {
  const { getByText } = render(<Dummy />)
  expect(getByText('Hello World')).toBeInTheDocument()
})
