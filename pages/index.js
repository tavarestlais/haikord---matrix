import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router'
import { route } from 'next/dist/server/router';


function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function HomePage() {
  //const username = 'haikoeamigos';
  const [username, setUsername] = React.useState('haikoeamigos');
  const roteamento = useRouter();
  const [alert, setAlert] = useState(false);


  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          //backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://images2.imgbox.com/01/72/SWtucoDo_o.png)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          height: '100%',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event){
                event.preventDefault();
                //window.location.href = '/chat'
                if(username.length > 2){
                  roteamento.push('/chat');
                }else{
                  setAlert(true);
                }
              }
            }
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Venha conhecer nosso perfil!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input 
              type='text'
              value={username}
              onChange={function Handler (event) {
                console.log('usuário digitou', event.target.value);
                const fieldValue = event.target.value;
                setUsername(fieldValue);
                }
              }
            /> */}
            

            <TextField
              value={username}
              onChange={function Handler (event) {
                console.log('usuário digitou', event.target.value);
                  const fieldValue = event.target.value;
                  setUsername(fieldValue);
                }
              }
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[700],
                  mainColor: appConfig.theme.colors.neutrals[999],
                  mainColorHighlight: appConfig.theme.colors.primary[900],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />

            {alert && (
              <Box as="p"
                styleSheet={{
                  position: 'relative',
                  MarginTop: '10px',
                  bottom: '18%',
                  left: '5%',
                  fontSize:'12px',
                  color: appConfig.theme.colors.neutrals["900"],
                }}>
                {(username.length > 0 && username.length <= 2)  ? 'Quantidade de caracteres inválida.' : ''}
              </Box>
            )}
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '2px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                border: '2px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                marginBottom: '16px',
                display: username.length > 2 ? 'block' : 'none'
              }}
              src={`https://images2.imgbox.com/6b/7c/k80fBQ5U_o.png`}
              //src={`https://github.com/{username}.png`}
              />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                display: username.length > 2 ? 'block' : 'none'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}