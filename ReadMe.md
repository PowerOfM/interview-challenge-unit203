# Unit203 Technical Review

Hey there!

This is my submission for the UNIT 203 techincal assessment.

### Changes and Assumptions
I followed the requirements as best as possible, but some changes were made to the way the client and server interact.

1) Add Item
The server will send an random item to the client when the button is clicked. If the client provides the postal code, the estimated delivery date will also be sent. Because there were only 3 items, there may be multiple items with the same IDs in the list. When trying to remove an item, it will remove all. So the remove `removeLineItem` function was modified to remove by `index` instead of `id`.

2) Estimated Delivery
The estimated delivery date is hidden until you enter an postal code. When the postal code is added, the cart is re-fetched with the dates. Since this server isn't storing a proper cart with any sort of sessions, if you add new items to the cart, the server does not know of this. So instead, the client specifies what items are already in the cart so that the content maintains. 

## Launching
The project is built with a split client and server architecture. In production, the client would be deployed on a static host (like S3), and the server in a VM (like EC2). Alternatively, the server could be modified to host the compiled client as well. 

### Quick Start
If you're on Mac or Linux, type `./start.sh` in a terminal to install deps and run the server and client. Use Control+C to exit.

### Manual Start
On Windows, you'll have to manually install and open the client and server:
  - `cd server/`
  - `npm install`
  - `npm start`

In another terminal or tab
  - `cd client/`
  - `npm install`
  - `npm start`

Once running, CMD+Click on the url or open [`http://localhost:5173/](http://localhost:5173/) in your browser.