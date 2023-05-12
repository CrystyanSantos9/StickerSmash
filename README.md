### Gerar Build com expo

| NODE Version | Expo CLI Version | JAVA Version                             | SDK Version |
| ------------ | ---------------- | ---------------------------------------- | ----------- |
| v14.17.3     | 6.3.7            | openjdk version "11.0.18" 2023-01-17 LTS | 34          |

[Create Your First Build](https://docs.expo.dev/build/setup/)

- Instalar AES CLI

```
npm install -g eas-cli
```

- Em seguida é necessário realizar um login no Expo

```
eas login
```

- Dentro da pasta de configuração do seu projeto expo, vamos criar um projeto EAS que será utilizado para realizar o Build

```
eas build:configure
```

- Para gerar o APK vamos alterar o arquivo eas.json deixando ele assim

<pre style="background: #2F4F4F; color: #FF8C00; font-weight: bolder;">
{
  "cli": {
    "version": ">= 3.12.0"
  },
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  }
}
</pre>

- Depois execute o comando abaixo, onde profile é um identificador do seu build

```
eas build -p android --profile preview
```

- Acompanhe o progresso de build na tela de BKO do expo, e ao final baixe o apk

![BKOEXPO](github\images\image1.png)

- Com o APK em mãos basta instalá-lo em seu smartphone compatível

### Sobre rotas privadas

- Para fazer com que suas rotas sejam privadas, temos algumas estratégias assim como no React

Como documentações de apoio temos:

[React Navigation Authentication Flows](https://reactnavigation.org/docs/auth-flow/)

- Para o React temos esse vídeo que explica uma estratégia de autenticação, e uso de rotas privadas

[Login React - Criando um sistema de autenticação](https://www.youtube.com/watch?v=5KqP3Vx8Y4s)

No seu componente de rotas, incluímos uma renderização condicional que permitira a transição somente as telas que passarem no teste condicional

```javascript
function Routes() {
  const { authenticated } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {!authenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            initialRouteName="Login"
          />
        </>
      ) : (
        <>
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen name="Info" component={Info} />
        </>
      )}
    </Stack.Navigator>
  );
}
```

Quando fizer isso, o uso do hook useNavigation ( React Native ) só será possível entre as Screens agrupadas nos blocos condicionais. Por exemplo, se Tentar fazer navegação entre Login e UserDetails, receberemos um alerta. Para essa navegação, não é necessário utilizar o navigation, a própria StackNavigation fará o redirecionamento de uma tela à outra.

Mais detalhes na documentação.

### Usando AsyncStorage no Expo

Para salvar dados localmente, vamos usar o Async Storage do Expo

Mais detalhes na documentação [Expo AsyncStorage ](https://docs.expo.dev/versions/latest/sdk/async-storage/)

### Para comunicação HTTP usando o Axios

```
npx expo install axios
```

Mais detalhes de uso podem ser vistos nesse artigo [How to use Axios...](https://sunnychopper.medium.com/how-to-use-axios-to-quickly-connect-to-an-api-in-your-react-native-application-a69c1c048f8e)

### Para comunicação com socket.io

```
yarn add socket.io-client
```

Mais detalhes nesse artigo [Building a chat app with Socket.io and React Native](https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b)
