import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount LinksList');
    window.onbeforeunload = () => { // run cleanup when page refreshes
        alert('unload');
            console.log('window.onbeforeunload');
    }

    this.linksTracker = Tracker.autorun(() => {
        Meteor.subscribe('links');
        let links = Links.find({visible: Session.get('showVisible')}).fetch();
        this.setState({ links });
    });
  }
  componentWillUnmount() {
    alert("unmount");
    console.log('componentWillUnmount LinksList');
    window.onbeforeunload = null;
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
        return (<div className="item">
                <p className="item__status-message">No links found.</p>
                </div>
        );
    } else {
        return this.state.links.map((link) => {
          const shortUrl = Meteor.absoluteUrl(link._id);
          return <LinksListItem key={link._id}  shortUrl={shortUrl} {...link}/>;
        //    return <p key={link._id}>{link.url}</p>;
        });
    }
  }

  render() {
    return (
      <div>
        <div>
          <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
    );
  }
};
