<p align="center"><img src="https://i.imgur.com/A4T861z.png" alt="Katan Logo"/></p>
<h1 align="center">Katan UI</h1>

Katan is built in a modularly independent way, one thing depends on the other but each can be used by itself, the user interface is built separately and installed separately if necessary, with the existence of the command line interface, developers or even people with little command line knowledge can take advantage of Katan's potential directly from the command line without having to use the web server, saving resources.

The UI has several features such as visualization of data in real time such as use of resources and logs, handling of users, roles and servers.

## Installation
### Docker
It is recommended that you install the UI using Docker, it will make your life much easier and the installation will be very fast.\
Follow the tutorial for installing the UI using Docker through the [Official Documentation](https://github.com/KatanPanel/katan-website).

### Self-Hosted
#### Cloning
In order to run Katan UI, first you need to clone this repository.
```
$ git clone https://github.com/KatanPanel/katan-ui
```

#### Building
After cloning, install the dependencies and build.
```
$ npm install
```

```
// production build
$ npm run build

// serve for development
$ npm run serve
```

## License
Katan UI is licensed under the [MIT license](https://github.com/KatanPanel/katan-ui/blob/master/LICENSE).\
All icons used in the project are made by <a href="https://www.flaticon.com/br/autores/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com</a>.
