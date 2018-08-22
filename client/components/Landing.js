import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Coverflow from 'react-coverflow';
import { Header , Container} from 'semantic-ui-react';

export class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };
  }

  componentDidMount() {
    this.changer();
  }

  changer() {
    return setTimeout(() => {
      var num = Math.floor(Math.random() * 10 + 1);
      this.setState({
        active: num
      });
    }, 2000);
  }

  render() {
    
    return (
      <div>
        <div className='landing-text'>
        <Header>Emsync</Header>
        <Container>
          <p>The app that allows you to listen to music on Spotify 
            in sync with other users around the world.</p>
          </Container>
        </div>
        <Coverflow
          // style={{ width: "100%", height: "500px" }}
          displayQuantityOfSide={2}
          navigation={false}
          enableHeading={false}
          enableScroll={true}
          active={this.state.active}
        >
          <div role="menuitem" tabIndex="0">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/dd/Lady_Gaga_%E2%80%93_The_Fame_album_cover.png"
              alt="Album one"
            />
          </div>
          <img
            src="https://badgerherald.com/wordpress/wp-content/uploads/2016/12/asq3clffeu9gxo2qfuzr.jpg"
            alt="Album two"
          />
          <img
            src="https://store.taylorswift.com/mm5/graphics/00000001/reputation_cd.jpg"
            alt="Album three"
          />
          <img
            src="https://i.scdn.co/image/a809b53f724dab8416e399bda6c0fc2a16ab75ed"
            alt="Album four"
          />
          <img
            src="https://i.dailymail.co.uk/i/newpix/2018/05/02/01/4BBFCB2200000578-5680395-Brookelle_showed_her_followers_this_look_at_a_recreation_of_Aria-a-3_1525220967132.jpg"
            alt="Album five"
          />
          <img
            src="https://i.pinimg.com/originals/71/67/04/71670453736184be195d09a004ad60d9.jpg"
            alt="Album six"
            data-action="https://medium.com"
          />
          <img
            src="https://media.vanityfair.com/photos/561d1b04319af15240f9b03f/master/pass/t-rihanna-cover-art-roy-nachum.jpg"
            alt="Album seven"
          />
          <img
            src="https://images.complex.com/complex/images/c_limit,w_600/fl_lossy,pg_1,q_auto/mercxw8d2faixjfdc2yw/mayer-album-cover"
            alt="Album eight"
          />
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/51iof%2BA3I-L._SY355_.jpg"
            alt="Album nine"
          />
          <img
            src="http://images.genius.com/fc44439c55552eb23d4a9ecb28a21f06.1000x1000x1.jpg"
            alt="Album ten"
          />
          <img
            src="https://badgerherald.com/wordpress/wp-content/uploads/2016/12/asq3clffeu9gxo2qfuzr.jpg"
            alt="Album 12"
          />
          <img
            src="https://is2-ssl.mzstatic.com/image/thumb/Features4/v4/b1/dd/74/b1dd74bf-88b7-8bb4-e653-e0470d017b46/dj.qzivvmyc.jpg/1200x630bb.jpg"
            alt="Album eleven"
          />
        </Coverflow>
      </div>
    );
  }
}
