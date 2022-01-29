import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import { useState } from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isMsgEnable, setIsMsgEnable] = useState(false);

  function handleNewMessage(newMessage) {
    const message = {
      id: messageList.length + 1,
      from: "Haiko e amigos",
      text: newMessage,
    };
    if(message.text !== ''){
      setMessageList([
        ...messageList,
        message,
      ]);
    }
    setMessage('');
    setIsMsgEnable(false);
  }

  function removeMsg(messageId) {
    setMessageList(messageList.filter((msg) => msg.id != messageId));
  }  

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://images2.imgbox.com/01/72/SWtucoDo_o.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals[999],
        //textTransform: "uppercase",
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "50%",
          maxWidth: "50%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messageList={messageList} removeMsg={removeMsg}/>

          {messageList.map((mensagemAtual) => {
            return (
              <li key={mensagemAtual.id}>
                {mensagemAtual.from}: {mensagemAtual.text}
              </li>
            );
          })}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                event.preventDefault();
                const msgValue = event.target.value;
                if (event.target.value.length > 0) {
                  setIsMsgEnable(true);
                } else {
                  setIsMsgEnable(false);
                }
                setMessage(msgValue);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[700],
              }}
            />
            <Button
              type="submit"
              label="Send"
              disabled={!isMsgEnable}
              onClick={(event) => {
                event.preventDefault();
                handleNewMessage(message);
              }}
              buttonColors={{
                mainColor:appConfig.theme.colors.neutrals[900],
                mainColorStrong:appConfig.theme.colors.neutrals[900],
              }}
              styleSheet={
                isMsgEnable
                  ? {
                      display: "flex",
                      alignSelf: "flex-end",
                      boxShadow:appConfig.theme.colors.neutrals[999],
                      borderRadius: "1000px",
                      padding: "8px",
                      margin: "0px 18px 18px",
                      width: "100px",
                      color: appConfig.theme.colors.neutrals[800],
                      transition: "box-shadow 1s, color 2s",
                      hover: {
                        boxShadow:appConfig.theme.colors.neutrals[700],
                      },
                      focus: {
                        boxShadow:appConfig.theme.colors.neutrals[999],
                      },
                    }
                  : {
                      display: "flex",
                      alignSelf: "flex-end",
                      boxShadow: "none",
                      width: "100px",
                      borderRadius: "1000px",
                      color:appConfig.theme.colors.neutrals[700],
                      padding: "8px",
                      margin: "0px 18px 18px",
                      transition: "box-shadow 2s, color 2s",
                    }
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props, removeMsg) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        //overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}

      {...props.messageList.map((message) => {
        return (
          <Box
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={'https://github.com/tavarestlais.png'}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>

            </Box>
            <Text
              tag="span"
              styleSheet={{
                fontSize: "14px",
                marginLeft: "20px",
                color: appConfig.theme.colors.neutrals[300],
                padding: "0px 10px",
              }}
            >
            {message.text}
            </Text>
          </Box>
        );
      })}
    >

    </Box>
  );
}
