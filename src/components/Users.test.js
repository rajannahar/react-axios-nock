import React from "react";
import { render, cleanup, wait, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";
import Users from "./Users";

import axiosMock from "axios";

afterEach(cleanup);
// afterEach(nock.cleanAll);
// afterAll(nock.restore);

test("should render User component - initial loading", () => {
  const { getByText } = render(<Users />);
  expect(getByText("Loading...")).toBeInTheDocument();
});

// test('should render User component - mock async fetch data', async () => {
//   nock('https://jsonplaceholder.typicode.com')
//     .defaultReplyHeaders({
//       'Access-Control-Allow-Origin': '*',
//     })
//     .get('/users')
//     .reply(200, [
//       {
//         id: 1,
//         name: 'John',
//       },
//       {
//         id: 2,
//         name: 'Bill',
//       },
//       {
//         id: 3,
//         name: 'Ted',
//       },
//     ]);

//   const { getByText } = render(<Users />);
//   expect(getByText('Loading...')).toBeInTheDocument();

//   await wait(() => {
//     expect(getByText('John'));
//     expect(getByText('Bill'));
//     expect(getByText('Ted'));
//   });
// });



test("should render User component - mock async fetch data", async () => {

  axiosMock.get.mockResolvedValueOnce({
    data: [
      {
        id: 1,
        name: "John",
      },
      {
        id: 2,
        name: "Bill",
      },
      {
        id: 3,
        name: "Ted",
      },
    ],
  });



  const { getByText, getByTestId, debug } = render(<Users />);
  expect(getByText("Loading...")).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByText(/loading/i))

  await wait(() => {
    expect(getByText("John"));
    expect(getByText("Bill"));
    expect(getByText("Ted"));
    expect(getByTestId('user-list').children).toHaveLength(3);
    expect(axiosMock.get).toHaveBeenCalled();
    expect(axiosMock.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

  });
});
