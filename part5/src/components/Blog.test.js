import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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