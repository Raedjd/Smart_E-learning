import React, { Component } from "react";
import axios from "axios";
import "./chatbot.css";
import { GrClose } from "react-icons/gr";
class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);

    this.handeInputKeyPress = this.handeInputKeyPress.bind(this);
    this.state = {
      messages: [],
      clicked: false,
    };

    this.clickedChat = 0;
  }

  async df_text_query(text) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: text,
        },
      },
    };

    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("http://localhost:5000/api/df_text_query", {
      text,
    });
    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }
  async df_event_query(event) {
    const res = await axios.post("http://localhost:5000/api/df_event_query", {
      event,
    });
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  componentDidMount() {
    this.df_event_query("Welcome");
  }
  componentDidUpdate() {}

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((msg, i) => {
        // return <Message speaks={msg.speaks} text={msg.msg.text.text} key={i} />;
        if (msg.speaks === "bot") {
          return (
            <div className="botspeaks" key={i}>
              <p>{msg.msg.text.text}</p>
            </div>
          );
        } else if (msg.speaks === "me") {
          return (
            <div className="userspeaks" key={i}>
              <p>{msg.msg.text.text}</p>
            </div>
          );
        }
      });
    } else {
      return null;
    }
  }

  handeInputKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  chatClick = () => {
    if (!this.state.clicked) {
      this.setState({ clicked: true });
    }
  };
  chatClose = () => {
    this.setState({ clicked: false });
  };

  render() {
    return (
      <div className="chatbot" onClick={this.chatClick}>
        <div className="chatbotlogo">
          {this.state.clicked ? (
            <div className="chatcard">
              <div className="chatTitle">
                <div className="name">
                  <div className="online"></div>
                  <div className="rookie">Rookie</div>
                </div>
                <div className="closeBtn">
                  <GrClose color="white" size="1em" onClick={this.chatClose} />
                </div>
              </div>
              <div className="chatmsgs">
                {this.renderMessages(this.state.messages)}
                <div
                  ref={(el) => {
                    this.messagesEnd = el;
                  }}
                  style={{ float: "left", clear: "both" }}
                ></div>
              </div>
              <div className="chatinput">
                <input
                  type="text"
                  placeholder="Enter your text ..."
                  onKeyPress={this.handeInputKeyPress}
                />
                <div className="sendBtn">
                  {/* <GrSend color="blue" size="40px" /> */}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Chatbot;
