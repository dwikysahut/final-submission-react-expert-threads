/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/**
 * skenario test
 *
 * - asyncPopulateThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, expect, it, vi,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncGetAllThreads, getAllThreadsActionCreator } from './action';

const fakeThreadsResponse = {
  data: {
    data: {
      threads: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    },
  },
};
const fakeUsersResponse = {
  data: {
    data: {
      users: [
        {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'jane_doe',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'fulan',
          name: 'Si Fulan',
          email: 'fulan@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      ],
    },
  },
};
const fakeErrorResponse = new Error('Oops. Something wrong');
describe('asyncPopulateThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;

    // delete backup data
    delete api._getAllThreads;
    delete api._ggetAllUsers;
  });

  it('should dispatch action corretcly when data fetching success', async () => {
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    const dispatch = vi.fn();

    await asyncGetAllThreads()(dispatch);
    // expect(await api.getAllThreads()).toEqual(fakeThreadsResponse);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(getAllThreadsActionCreator(fakeThreadsResponse.data.data.threads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);

    // action
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // assert
    await asyncGetAllThreads()(dispatch);
    // expect(await api.getAllThreads()).toEqual(fakeThreadsResponse);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
