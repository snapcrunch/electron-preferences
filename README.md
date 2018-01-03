# Electron Preferences

## Introduction

This module provides users of the [Electron](https://electronjs.org/) desktop application development framework with with a simple, consistent interface for managing user preferences. It includes two primary components:

- A GUI interface within which the users of your application can manage their preferences.
- An API for interacting with the service.

Using the API, developers can:

- Define default preferences
- Read / write values on demand
- Define the layout of the preferences window.

To see the library in action, clone this repository and see the demo Electron app that is included within the `example` folder:

    $ git clone https://github.com/tkambler/electron-preferences.git
    $ cd electron-Preferences
    $ npm i
    $ npm run example

<img src="misc/demo.gif" />

## Icons

The following icons come packaged with the library and can be specified when you define the layout of your preferences window.

<table style="width: 100%;">
<thead>
    <tr>
        <th>Name</th>
        <th>Icon</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>archive-2</td>
        <td><img src="assets/svg/archive-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>archive-paper</td>
        <td><img src="assets/svg/archive-paper.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>award-48</td>
        <td><img src="assets/svg/award-48.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>badge-13</td>
        <td><img src="assets/svg/badge-13.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>bag-09</td>
        <td><img src="assets/svg/bag-09.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>barcode-qr</td>
        <td><img src="assets/svg/barcode-qr.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>bear-2</td>
        <td><img src="assets/svg/bear-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>bell-53</td>
        <td><img src="assets/svg/bell-53.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>bookmark-2</td>
        <td><img src="assets/svg/bookmark-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>briefcase-24</td>
        <td><img src="assets/svg/briefcase-24.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>calendar-60</td>
        <td><img src="assets/svg/calendar-60.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>camera-20</td>
        <td><img src="assets/svg/camera-20.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>cart-simple</td>
        <td><img src="assets/svg/cart-simple.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>chat-46</td>
        <td><img src="assets/svg/chat-46.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>check-circle-07</td>
        <td><img src="assets/svg/check-circle-07.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>cloud-26</td>
        <td><img src="assets/svg/cloud-26.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>compass-05</td>
        <td><img src="assets/svg/compass-05.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>dashboard-level</td>
        <td><img src="assets/svg/dashboard-level.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>diamond</td>
        <td><img src="assets/svg/diamond.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>edit-78</td>
        <td><img src="assets/svg/edit-78.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>email-84</td>
        <td><img src="assets/svg/email-84.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>eye-19</td>
        <td><img src="assets/svg/eye-19.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>favourite-31</td>
        <td><img src="assets/svg/favourite-31.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>flag-points-32</td>
        <td><img src="assets/svg/flag-points-32.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>flash-21</td>
        <td><img src="assets/svg/flash-21.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>folder-15</td>
        <td><img src="assets/svg/folder-15.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>gift-2</td>
        <td><img src="assets/svg/gift-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>grid-45</td>
        <td><img src="assets/svg/grid-45.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>handout</td>
        <td><img src="assets/svg/handout.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>heart-2</td>
        <td><img src="assets/svg/heart-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>home-52</td>
        <td><img src="assets/svg/home-52.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>image</td>
        <td><img src="assets/svg/image.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>key-25</td>
        <td><img src="assets/svg/key-25.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>layers-3</td>
        <td><img src="assets/svg/layers-3.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>like-2</td>
        <td><img src="assets/svg/like-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>link-72</td>
        <td><img src="assets/svg/link-72.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>lock-open</td>
        <td><img src="assets/svg/lock-open.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>lock</td>
        <td><img src="assets/svg/lock.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>multiple-11</td>
        <td><img src="assets/svg/multiple-11.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>notes</td>
        <td><img src="assets/svg/notes.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>pencil</td>
        <td><img src="assets/svg/pencil.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>phone-2</td>
        <td><img src="assets/svg/phone-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>preferences</td>
        <td><img src="assets/svg/preferences.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>send-2</td>
        <td><img src="assets/svg/send-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>settings-gear-63</td>
        <td><img src="assets/svg/settings-gear-63.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>single-01</td>
        <td><img src="assets/svg/single-01.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>single-folded-content</td>
        <td><img src="assets/svg/single-folded-content.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>skull-2</td>
        <td><img src="assets/svg/skull-2.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>spaceship</td>
        <td><img src="assets/svg/spaceship.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>square-download</td>
        <td><img src="assets/svg/square-download.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>square-upload</td>
        <td><img src="assets/svg/square-upload.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>support-16</td>
        <td><img src="assets/svg/support-16.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>trash-simple</td>
        <td><img src="assets/svg/trash-simple.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>turtle</td>
        <td><img src="assets/svg/turtle.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>vector</td>
        <td><img src="assets/svg/vector.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>video-66</td>
        <td><img src="assets/svg/video-66.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>wallet-43</td>
        <td><img src="assets/svg/wallet-43.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>widget</td>
        <td><img src="assets/svg/widget.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>world</td>
        <td><img src="assets/svg/world.svg" height="40" width="40" /></td>
    </tr>
    <tr>
        <td>zoom-2</td>
        <td><img src="assets/svg/zoom-2.svg" height="40" width="40" /></td>
    </tr>
</tbody>
</table>
