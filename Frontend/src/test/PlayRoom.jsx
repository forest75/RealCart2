/* eslint-disable */
import React, { useRef } from "react";
import kurentoUtils from "kurento-utils";
import Stomp from "stompjs";

function PlayRoom() {
  var ws = new WebSocket("wss://13.125.13.39:8090/call");
  var socket = new WebSocket("wss://13.125.13.39:8090/chat");
  var stompClient;
  var stompClient = Stomp.over(socket);
  stompClient.connect({}, function () {
    stompClient.subscribe("/subscribe", function (greeting) {
      console.log(greeting.body);
    });
  });
  // useEffect(() => {
  //   connect();
  // }, []);
  var video = useRef(null);
  var text = useRef(null);
  var webRtcPeer;
  var mediaId;

  window.onload = function () {
    connect();
    // video = document.getElementById("video");
    // text = document.getElementById("text");
  };

  window.onbeforeunload = function () {
    ws.close();
  };

  ws.onmessage = function (message) {
    var parsedMessage = JSON.parse(message.data);
    console.info("Received message: " + message.data);

    switch (parsedMessage.id) {
      case "presenterResponse":
        presenterResponse(parsedMessage);
        break;
      case "viewerResponse":
        viewerResponse(parsedMessage);
        break;
      case "iceCandidate":
        webRtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
          if (error) return console.error("Error adding candidate: " + error);
        });
        break;
      case "stopCommunication":
        dispose();
        break;
      default:
        console.error("Unrecognized message", parsedMessage);
    }
  };

  function presenterResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function connect() {
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
      stompClient.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
      });
    });
  }

  function sendChat() {
    stompClient.send(
      "/publish/messages",
      {},
      JSON.stringify({
        message: text.current.value,
        senderId: 7,
        receiverId: 14,
      })
    );
  }

  function viewerResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      console.log("webrtcpeer", webRtcPeer);
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function presenter(num) {
    if (!webRtcPeer) {
      // showSpinner(video);
    }
    var options = {
      localVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    mediaId = num;
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        webRtcPeer.generateOffer(onOfferPresenter);
      }
    );
  }

  function onOfferPresenter(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "presenter",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function viewer(num) {
    if (!webRtcPeer) {
      // showSpinner(video);
    }
    mediaId = num;
    console.log(num);
    var options = {
      remoteVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(onOfferViewer);
      }
    );
  }

  function onOfferViewer(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "viewer",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function onIceCandidate(candidate) {
    console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id: "onIceCandidate",
      candidate: candidate,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function stop() {
    var message = {
      id: "stop",
    };
    sendMessage(message);
    dispose();
  }

  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
    // hideSpinner(video);
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    ws.send(jsonMessage);
  }

  function showSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].poster = "./img/transparent-1px.png";
      arguments[i].style.background =
        'center transparent url("./img/spinner.gif") no-repeat';
    }
  }

  function hideSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].src = "";
      arguments[i].poster = "./img/webrtc.png";
      arguments[i].style.background = "";
    }
  }

  return (
    <div className="App">
      <header>
        <div className="navbar navbar-inverse navbar-fixed-top"></div>
        <textarea id="text" ref={text}></textarea>
        <button onClick={sendChat}>sendMessage</button>
      </header>
      <div>
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-12">
                <button
                  onClick={() => {
                    presenter(1);
                  }}
                  id="presenter1"
                  href="#"
                  className="btn btn-success"
                >
                  <span className="glyphicon glyphicon-play"></span> Presenter1{" "}
                </button>
                <button
                  onClick={() => {
                    presenter(2);
                  }}
                  id="presenter2"
                  href="#"
                  className="btn btn-success"
                >
                  <span className="glyphicon glyphicon-play"></span> Presenter2{" "}
                </button>
                <button
                  onClick={() => {
                    presenter(3);
                  }}
                  id="presenter3"
                  href="#"
                  className="btn btn-success"
                >
                  <span className="glyphicon glyphicon-play"></span> Presenter3{" "}
                </button>
                <button
                  onClick={() => {
                    viewer(1);
                  }}
                  id="viewer"
                  href="#"
                  className="btn btn-primary"
                >
                  <span className="glyphicon glyphicon-user"></span> Viewer1
                </button>
                <button
                  onClick={() => {
                    viewer(2);
                  }}
                  id="viewer"
                  href="#"
                  className="btn btn-primary"
                >
                  <span className="glyphicon glyphicon-user"></span> Viewer2
                </button>
                <button
                  onClick={() => {
                    viewer(3);
                  }}
                  id="viewer"
                  href="#"
                  className="btn btn-primary"
                >
                  <span className="glyphicon glyphicon-user"></span> Viewer3
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div id="videoBig">
              <video
                ref={video}
                id="video"
                autoPlay
                width="640px"
                height="480px"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayRoom;
