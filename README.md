<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

![iSpyLogo](https://user-images.githubusercontent.com/93365813/193400966-e740ca15-decf-47fb-823c-49c305034dfd.png)


<h3 align="center">iSpy: Find the Hidden Objects</h3>

  <p align="center">
    Find the hidden objects in three different maps in as little amount of time as possible.
    <br />
    <a href="https://github.com/enzorod10/iSpy"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://where-s-waldo-590ec.web.app/">View Demo</a>
    ·
    <a href="https://github.com/enzorod10/iSpy/issues">Report Bug</a>
    ·
    <a href="https://github.com/enzorod10/iSpy/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This project was created with React. The goal is to find the hidden objects in every map, in as little time as possible. I've placed the locations of the
hidden objects in a firebase database, so that nobody can hack the locations through the front end. When a user clicks on an area of the screen, they will be prompted with a menu where they can select which object they think they have found. If they find the object, give or take a few pixels, then that obejct will turn green, indicating that it has been found. The leaderboard displays who has performed the best in each map!

![beach](https://user-images.githubusercontent.com/93365813/193401420-6525a927-ef22-4651-867b-03e22d6c04e5.png)
![moon](https://user-images.githubusercontent.com/93365813/193401440-6b40e5a2-8b5a-47a7-8a62-33744ec1fcf6.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Have node package manager (npm) installed
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/enzorod10/iSpy.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the application
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This can be a fun and competitive game to play with your friends. Challenge each other to see who can find all objects the quickest. First log in (don't need to create an account; simply just enter a name and log in). Then, select a level and click play. After clicking on any spot in the level, you will see which objects to find. 

![gamepreview](https://user-images.githubusercontent.com/93365813/193401640-edc822c8-6022-48b7-93e7-148359017f31.png)

Good luck!



_For more examples, please refer to the [Documentation](https://github.com/enzorod10/iSpy.git)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Object locations for every object stored in the backend (firebase)
- [x] Responsiveness on any device
- [x] Added leaderboard for every map

See the [open issues](https://github.com/enzorod10/iSpy/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Enzo Rodriguez - [Personal Website](https://enzorod.com) - me@enzorod.com

Project Link: [https://github.com/enzorod10/iSpy](https://github.com/enzorod10/iSpy)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [Icons8](https://icons8.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/enzorod10/iSpy.svg?style=for-the-badge
[contributors-url]: https://github.com/enzorod10/iSpy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/enzorod10/iSpy.svg?style=for-the-badge
[forks-url]: https://github.com/enzorod10/iSpy/network/members
[stars-shield]: https://img.shields.io/github/stars/enzorod10/iSpy.svg?style=for-the-badge
[stars-url]: https://github.com/enzorod10/iSpy/stargazers
[issues-shield]: https://img.shields.io/github/issues/enzorod10/iSpy.svg?style=for-the-badge
[issues-url]: https://github.com/enzorod10/iSpy/issues
[license-shield]: https://img.shields.io/github/license/enzorod10/iSpy.svg?style=for-the-badge
[license-url]: https://github.com/enzorod10/iSpy/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/enzo-rod
