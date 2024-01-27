import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    "title": 'Component testing is done with react-testing-library',
    "author": "true",
    "url":"ahigj",
    "likes":94,
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(/Component testing is done with react-testing-library/i);
  expect(element).toBeDefined()
})

test('content after clicking view button', async () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'hello',
      likes: 100,
      user:{
        id:'kkkk'
      }
    }
    
  
    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} handleView={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText(/hello/i)
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  
  })