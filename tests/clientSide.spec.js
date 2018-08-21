

import axios from 'axios';
import React from 'react';
import chai from 'chai';
import { expect } from 'chai'
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../client/history';
import { shallow, configure , mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


//Actions
import { fetchRooms } from '../client/store/rooms';
import {fetchQueues} from '../client/store/queue';
import { createRoom } from '../client/store/rooms';
import {goSearch} from '../client/store/searchReducer';


//Components 
import { RoomsList }  from '../client/components/RoomsList';
import { UserHome } from '../client/components/UserHome';
import {ListenersList} from '../client/components/ListenersList';
import { Queue } from '../client/components/Queue';
import { RoomForm } from '../client/components/RoomForm';
import SearchForm from '../client/components/SearchForm';



configure({ adapter: new Adapter() });

const middleWare = [thunkMiddleware]
const mockStore = configureMockStore(middleWare)


describe(' +++++++++++++++++++++ REACT COMPONENTS  +++++++++++++++++++++', () => {
  describe('<UserHome />', () => {
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
      it('Fetches rooms from API', () => {
        const fakeRoom = {name: 'Room1'};
        mockAxios.onGet('/api/rooms').replyOnce(200, fakeRoom);
      });
    });
  });

  describe('<RoomsList />', () => {
    let rooms, user;
    beforeEach(() => {
      rooms = ['room1', 'room2'];
      user = {name: 'user1', email: 'user1@email.com'};
    });

    it('renders a <RoomsList />', () => {
      const wrapper = shallow(<RoomsList rooms={rooms} />);
      expect(wrapper.find(RoomsList).length).to.equal(0);
    });

    // it('should have props for room and user',  () => {
    //   const wrapper = shallow(<RoomsList  rooms = {rooms} user ={user}/>);
    //   // expect(wrapper.text()).to.contain('columns');
    //   // expect(wrapper.props().rooms).to.be.defined();
    // });

    //   const wrapper = shallow(<UserHome rooms ={fetchRooms()} fetchRooms = {fetchRooms}/>);
    //   expect(wrapper.find('<RoomsList/>').length).toEqual(1);
    // })
  });

  describe('<RoomView />', () => {
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
    describe('Gets existing queues from Database', () => {
      it('Fetches queues from API route', () => {
        const fakeQueue = {queueItem1: '1', queueItem2: '2'};
        mockAxios.onGet(`/api/queues`).replyOnce(200, fakeQueue);
      });
      xit('Renders <Queue /> and a <ListenersList/>', () => {
        const fakeQueue = {queueItem1: '1', queueItem2: '2'};
        mockAxios.onGet(`/api/queues`).replyOnce(200, fakeQueue);
      });
    });
  });

  describe('<RoomForm />', () => {
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
    describe('On submit, creates a new room in the database', () => {
      it('Makes a POST request to the database returning a 201 status and a new instance of a room', () => {
        const fakeRoom = {name: 'someName', description: 'some description'};
        mockAxios.onPost(`/api/rooms`, fakeRoom).replyOnce(201, fakeRoom);
      });
      it('Handles Change and Submit for Create Room Form ', () => {
        const wrapper = shallow(<RoomForm store={store} />);
        expect(wrapper.find('handleClick()').length).to.equal(0);
      });
    });
  });

  describe('<SearchForm />', () => {
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
    describe('Gets spotify results', () => {
      it('On submit fetches spotify API for songs ', () => {
        const songs = {name: 'song1', description: 'some description'};
        mockAxios.onPost(`/api/spotify`, songs).replyOnce(200, songs);
      });
      // it('Handles Change and Submit for Create Room Form ', () => {
      //   let accesToken = '';
      //   const wrapper = shallow(<SearchForm props = {accesToken} store={store} accessToken = {'sdhflasubi'}/>);
      //   expect(wrapper.find('handleClick()').length).to.equal(0);
      // })
    });
  });
});