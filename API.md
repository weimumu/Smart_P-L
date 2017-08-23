# API Document

## Notice

* response status code:
  - 200: ok
  - 400: incorrect request
  - 500: Internal Server Error (bug)



## User

### login

* POST `/api/user/login`

* request

  ```json
  {
    "email": "",
    "password": ""
  }
  ```

* session be set if succeeded

### logout

* GET `/api/user/logout` 

### regist

- POST `/api/user`

- request:

- ```json
  {
    "userEmail": "",
    "userPass": "",
    "comName": "",
    "comCode": "",
    "comCapital": "",
    "comTime": "",
    "comPerson": "",
    "comEmail": "",
    "comPhone": "",
    "comManager": "",
    "comRegistAddresss": "",
    "comWorkAddresss": "",
    "comField": "",
    "comProduct": "",
    "comIntro": "",
    "contactName": "",
    "contactJob": "",
    "contactMobile": "",
    "contactEmail": "",
    "contactQQ": "",
    "contactPhone": "" 
  }
  ```

### edit

* PUT `/api/user/self`
* request: the same as `regist` (except `userEmail`, which is **immutable**), only provided fields will be edited.

### get-self-info

* GET `/api/user/self`
* response: the same as `regist` except `userPass`


### get another's info

* GET `/api/user/:id`

* response: 

* if you are friends:

* ```json
  {
      "_id": "",
      "comName": "阿里巴巴",
      "comCode": "1",
      "comCapital": "1",
      "comTime": "1",
      "comPerson": "1",
      "comEmail": "1",
      "comPhone": "1",
      "comManager": "1",
      "comRegistAddresss": "1",
      "comWorkAddresss": "1",
      "comField": "1",
      "comProduct": "1",
      "comIntro": "1",
      "contactName": "1",
      "contactJob": "1",
      "contactMobile": "1",
      "contactEmail": "1",
      "contactQQ": "1",
      "contactPhone": "1",
      "isFriend": true
  }
  ```

* if not friends:

* ```json
  {
    "_id": "",
    "comName": "",
    "comTime": "",
    "comRegistAddresss": "",
    "comWorkAddresss": "",
    "comField": "",
    "comProduct": "",
    "comIntro": "",
    "comPhone": ""
  }
  ```

### search

* GET `/api/user/search?q=QUERY`
* response: `[{BASIC INFO}]`

## Friend

### get friend list

* GET `/api/friend/list`
* response: `[{DETAIL(same as get-self-info)}]`

### remove friend

* DELETE `/api/friend/:friendId`
* note: friendId given in the `_id` field in api responses

### request to add a friend

* POST `/api/friend/request?to=id`

### get messages (about friend-requesting)

* GET `/api/message/friend?size=SIZE&page=PAGE`

* response:

* ```json
  [
      {
          "_id": "", // message-id
          "from": {
              "_id": "", // sender-id
              "comName": "阿里巴巴",
              "comCapital": "900万元",
              "comTime": "1990.09.09",
              "comPhone": "0212-8989821",
              "comRegistAddresss": "",
              "comWorkAddresss": "",
              "comField": "",
              "comProduct": "",
              "comIntro": ""
          },
          "type": "FriendRequest-Received",
          "info": {
              "request": "599c2bfd8404c83370943d4e" // request-id
          },
          "__v": 0,
          "date": "2017-08-22T13:05:01.503Z",
          "read": false
      }
  ]
  ```

* example: GET `/api/message/friend?size=5&page=0`

* message types:

* ```javascript
  [
    'FriendRequest-Received', // when received a request
    'FriendRequest-Received&Accepted', // when received & accepted a request
    'FriendRequest-Received&Refused', // when received & refused a request
    'FriendRequest-Accepted', // when a request one sent is accepted
    'FriendRequest-Refused' // when a request one sent is refused
  ]
  ```

* ​

### get messages 

* GET `/api/message?size=SIZE&page=PAGE`

* response: TO-BE-DONE


### accept add-friend request

* POST `/api/friend/accept/:messageId`

### refuse request

* POST `/api/friend/refuse/:messageId`

