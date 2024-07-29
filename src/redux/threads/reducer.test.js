/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { THREADS_ACTION } from '../actionType';

/**
 * test scenario for threadsReducer
 *
 * - thread function
 *  - should return the initial state when given by unknown action
 *  - should return the talks with the new thread when given by ADD_THREAD action
 *
 */
describe('Threads Reducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });
  it('should return the talks with the new talk when given by ADD_TALK action', () => {
    // arrange

    const initialState = [
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
    ];
    const action = {
      type: THREADS_ACTION.ADD_THREADS,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([...initialState, action.payload.thread]);
  });
});
