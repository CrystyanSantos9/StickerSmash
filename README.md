### Gerar Build com expo

NODE Version |Expo CLI Version | JAVA Version | SDK Version | 
--- | --- | --- | --- |
v14.17.3 | 6.3.7 | openjdk version "11.0.18" 2023-01-17 LTS | 34 |

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



