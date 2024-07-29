/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/**
 * skenario test
 *
 * - asyncPopulateDetailThread thunk
 *  - should dispatch action correctly when data fetching success
 */

import {
  describe, beforeEach, afterEach, expect, it, vi,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncGetThread, getAllThreadDetailActionCreator } from './action';

const fakeThreadsResponse = {
  data: {
    data: {
      detailThread: {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    },
  },
};

describe('asyncPopulateDetailThread thunk', () => {
  beforeEach(() => {
    api._getThread = api.getThread;
  });

  afterEach(() => {
    api.getThread = api._getThread;

    // delete backup data
    delete api._getThread;
  });

  it('should dispatch action corretcly when data fetching success', async () => {
    api.getThread = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();

    await asyncGetThread()(dispatch);
    // expect(await api.getAllThreads()).toEqual(fakeThreadsResponse);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      getAllThreadDetailActionCreator(fakeThreadsResponse.data?.data?.detailThread),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
