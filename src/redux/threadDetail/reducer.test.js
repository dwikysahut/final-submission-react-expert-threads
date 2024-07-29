/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from 'vitest';
import detailThreadsReducer from './reducer';
import { THREAD_DETAIL_ACTION } from '../actionType';

/**
 * test scenario for detailThreadsReducer  '
 *
 * - thread function
 *  - should return the initial state when given by unknown action
 *  - should return new array  when given by Up Vote action
 *
 */
describe('Threads Reducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });
  it('should return new array  when given by Up Vote action', () => {
    // arrange

    const initialState = {
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
    };

    const action = {
      type: THREAD_DETAIL_ACTION.UP_VOTE_THREAD_DETAIL,
      payload: {
        vote: {
          id: 'vote-2',
          userId: 'users-2',
          threadId: 'thread-1',
          voteType: 1,
        },
      },
    };

    // action
    const nextState = detailThreadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, upVotesBy: [action.payload.vote.userId] });
  });
});
