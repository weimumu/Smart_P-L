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


### get another's basic info

* GET `/api/user/:id`

* response: 

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

### get sent requests

* GET `/api/friend/request/send`

* response:

* ```json
  [
    {
      _id: requestId,
      "to": {
        "_id": userId,
        "comName": ""
      },
      "date": Date
    }
  ]
  ```

### get received requests

* GET `/api/friend/request/receive`

* response:

* ```json
  [
    {
      _id: requestId,
      "from": {
        "_id": userId,
        "comName": ""
      },
      "date": Date
    }
  ]
  ```

### accept add-friend request

* POST `/api/request/:requestId/accept`

### refuse request

* POST `/api/request/:requestId/refuse`

