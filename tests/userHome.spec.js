import axios from 'axios';
import React from 'react';
import { expect } from 'chai'
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../client/history';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import TestUtils from 'react-addons-test-utils';
// import ReactDOM from 'react-redux';

import { fetchRooms } from '../client/store/rooms';
import { RoomsList } from '../client/components/RoomsList';
import { UserHome } from '../client/components/UserHome'


configure({ adapter: new Adapter() });

const middleWare = [thunkMiddleware]
const mockStore = configureMockStore(middleWare)



describe('#HOME ', () => {
  let store;
  let mockAxios;
  let actions;
  const initialState = {};
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });
  describe('Gets rooms from Database', () => {
    it('eventually dispatches the fetchRoom action', () => {
      const fakeRoom = { name: 'Room1' };
      mockAxios.onGet('/api/rooms').replyOnce(200, fakeRoom);
    });
  });

  describe('Displays a list of existing rooms', () => {

    it('Renders a RoomList component ', () => {
      
      const fetchRooms = () => {
        const rooms = { room1: 'room1', room2: 'room2', room3: 'room3' }
        return rooms;
      }
      const wrapper = shallow(<UserHome rooms ={fetchRooms()} fetchRooms = {fetchRooms}/>);
      expect(wrapper.find(RoomsList).length).toEqual(1);
    })
})

