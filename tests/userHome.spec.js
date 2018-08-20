import axios from 'axios';
import { expect } from 'chai'
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../client/history';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { fetchRooms } from '../client/store/rooms';
import RoomsList from '../client/components/RoomsList';
import UserHome from '../client/components/UserHome'


configure({adapter : new Adapter()});

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
      const fakeRoom = {name: 'Room1'};
      mockAxios.onGet('/api/rooms').replyOnce(200, fakeRoom);
      });
    });

    describe('Displays a list of existing rooms', () => {
      it('Renders a RoomList component ', () => {
        const wrapper = shallow(<UserHome/>);
        console.log('here1')
        const roomList = <h3 style-={{ 'text-align': 'center' }}>Welcome</h3>;
        console.log('here2')

        expect(wrapper.contains(roomList)).to.equal(true);
      })

      // spy(UserHome.prototype, 'componentDidMount');

      // describe('<UserHome />', () => {
      //   it('calls componentDidMount', () => {
      //     global.window = { location: { host: 'example.com' } };
      //     const wrapper = mount(<UserHome />);
      //     expect(UserHome.prototype.componentDidMount).to.have.property('callCount', 1);
      //   });
      // });
    })
  });

