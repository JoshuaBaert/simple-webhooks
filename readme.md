example config.js

```
module.exports = {
    port: 9090,
    endpoints: [
        {
            command: '/bin/bash ./scripts/some.sh',
            passPhrase: 'password',
            url: '/minecraft-master',
        },
    ],
};
```
