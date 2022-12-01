[![MIT License][license-shield]][license-url]
[![Docker][Docker.com]][Docker-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">CEH - Pivoting</h3>
  <p align="center">
    Docker's images to create a vulnerable environnement to a pivoting attack.
    <br />
  </p>
</div>
 <br />


## Installation

1. Create a bidge network
```sh
docker network create --driver bridge --subnet 172.18.0.0/16 server-database
```

2. Build images
```sh
docker build -t ceh-database database/
docker build -t ceh-server server/
```

3. Run containers
```sh
docker run -d --name database --net server-database --ip 172.18.0.3 ceh-database
docker run -p 80:80 -d --name server ceh-server
docker network connect --ip 172.18.0.2 server-database server
```



## Getting Started

**Go to http://localhost and try to exploit it.**




<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/github/license/xThaySan/CEH.svg?style=for-the-badge
[license-url]: https://github.com/xThaySan/CEH/blob/master/LICENSE.txt
[Docker.com]: https://img.shields.io/badge/Docker-0073ec?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://docker.com 