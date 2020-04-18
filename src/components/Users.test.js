import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import Users from './Users';

afterEach(cleanup);
afterEach(nock.cleanAll);
afterAll(nock.restore);

test('should render User component - initial loading', () => {
  const { getByText } = render(<Users />);
  expect(getByText('Loading...')).toBeInTheDocument();
});

test('should render User component - mock async fetch data', async () => {
  nock('https://jsonplaceholder.typicode.com')
    .defaultReplyHeaders({
      'Access-Control-Allow-Origin': '*',
    })
    .get('/users')
    .reply(200, [
      {
        id: 1,
        name: 'John',
      },
      {
        id: 2,
        name: 'Bill',
      },
      {
        id: 3,
        name: 'Ted',
      },
    ]);

  const { getByText } = render(<Users />);
  expect(getByText('Loading...')).toBeInTheDocument();

  await wait(() => {
    expect(getByText('John'));
    expect(getByText('Bill'));
    expect(getByText('Ted'));
  });
});
