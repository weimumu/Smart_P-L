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


## Loan 借贷部分

###publish Lend

* POST `/api/loan/lend`

* ```json
  {
    "max_amount": 1,
    "loan_ddl": 12
  }
  ```

### publish Borrow

* POST `/api/loan/borrow`

* ```json
  {
    "city": "",
    "project": "",
    "max_amount": 1,
    "reason": "",
    "max_rate": 3,
    "loan_ddl": 12,
    "other_detail": ""
  }
  ```

### get my own borrow list

* GET `/api/loan/borrow`

* ```json
  [
      {
          "_id": "59a41435b80d0d38a465c2a3",
          "city": "广州1",
          "project": "smart_PL1",
          "max_amount": 10,
          "reason": "吃喝嫖赌",
          "max_rate": 4.3,
          "loan_ddl": 6,
          "other_detail": "我要钱",
          "from": "599fe35e6e76741bf0b321cd",
          "__v": 0,
          "date": "2017-08-28T13:01:41.112Z"
      }
  ]
  ```

### get my own lend list

* GET `/api/loan/lend`

* ```json
  [
      {
          "_id": "59a410a4599bfd1ae8c872fc",
          "max_amount": 30,
          "loan_ddl": 12,
          "from": "59a3bc193cde380b1cef10a5",
          "__v": 0,
          "date": "2017-08-28T12:46:28.484Z"
      }
  ]
  ```

### get borrow detail

* GET `/api/loan/detail/borrow?id=BORROWID`

* ```json
  {
      "_id": "59a56a1d42e9f105809ed944",
      "city": "广州",
      "project": "辣鸡",
      "max_amount": 200,
      "reason": "辣鸡",
      "max_rate": 4.9,
      "loan_ddl": 12,
      "mortgage_value": 0,
      "guarentee_amount": 0,
      "supportSales": false,
      "supportOther": false,
      "risk_factor": null,
      "total_risk_factor": null,
      "from": {
          "_id": "59a55a94ff71d31c94d5349c",
          "comName": "华为科技",
          "comCapital": 300,
          "comTime": "1997.09.10",
          "comPhone": "0992-2121898",
          "comRegistAddresss": "广东省揭阳市",
          "comWorkAddresss": "广东省揭阳市",
          "comField": "采矿业",
          "comProduct": "煤矿",
          "comIntro": "美好",
          "comCreditScore": 85,
          "comHistoryScore": 86,
          "comAttributeScore": 77,
          "comIntegrityScore": 89
      },
      "__v": 0,
      "date": "2017-08-29T13:20:29.903Z"
  }
  ```

### get lend detail

* GET `/api/loan/detail/lend?id=LENDID`

* ```json
  {
      "_id": "59a5694442e9f105809ed942",
      "max_amount": 200,
      "loan_ddl": 12,
      "from": {
          "_id": "59a55a94ff71d31c94d5349c",
          "comName": "华为科技",
          "comCapital": 300,
          "comTime": "1997.09.10",
          "comPhone": "0992-2121898",
          "comRegistAddresss": "广东省揭阳市",
          "comWorkAddresss": "广东省揭阳市",
          "comField": "采矿业",
          "comProduct": "煤矿",
          "comIntro": "美好",
          "comCreditScore": 85,
          "comHistoryScore": 86,
          "comAttributeScore": 77,
          "comIntegrityScore": 89
      },
      "__v": 0,
      "date": "2017-08-29T13:16:52.991Z"
  }
  ```

* ​

### get recommend for my Borrow

* GET `/api/loan/recommend?id=BORROWID`

* ```json
  [
      {
          "_id": "59a412aa5427b5622c4fdf11",
          "max_amount": 344,
          "loan_ddl": 12,
          "from": "59a3bc193cde380b1cef10a5",
          "__v": 0,
          "date": "2017-08-28T12:55:06.996Z"
      },
      {
          "_id": "59a412ab5427b5622c4fdf12",
          "max_amount": 344,
          "loan_ddl": 12,
          "from": "59a3bc193cde380b1cef10a5",
          "__v": 0,
          "date": "2017-08-28T12:55:07.270Z"
      },
      {
          "_id": "59a412ab5427b5622c4fdf13",
          "max_amount": 344,
          "loan_ddl": 12,
          "from": "59a3bc193cde380b1cef10a5",
          "__v": 0,
          "date": "2017-08-28T12:55:07.598Z"
      }
  ]
  ```

### get related messages

* GET `/api/loan/messages`

* ```json
  [
      {
          "_id": "59a41b35cc066138d0ac9b1e",
          "type": "BorrowContract-Accepted",
          "from": "59a3bc193cde380b1cef10a5",
          "info": {
              "transactionId": "59a415ee1437f23db0f4d8e8"
          },
          "__v": 0,
          "date": "2017-08-28T13:31:33.510Z",
          "read": false
      },
      {
          "_id": "59a41ae5e005ea1d70a4df6a",
          "type": "BorrowContract-Accepted",
          "from": "599fe35e6e76741bf0b321cd",
          "info": {
              "transactionId": "59a415ee1437f23db0f4d8e8"
          },
          "__v": 0,
          "date": "2017-08-28T13:30:13.487Z",
          "read": false
      },
      {
          "_id": "59a41a1e4527a415b4b42389",
          "type": "BorrowContract-Received",
          "from": "59a3bc193cde380b1cef10a5",
          "info": {
              "transactionId": "59a415ee1437f23db0f4d8e8"
          },
          "__v": 0,
          "date": "2017-08-28T13:26:54.448Z",
          "read": false
      },
      {
          "_id": "59a418e31a5c072fc0eb677a",
          "type": "BorrowRequest-Accepted",
          "from": "59a3bc193cde380b1cef10a5",
          "info": {
              "transactionId": "59a415ee1437f23db0f4d8e8"
          },
          "__v": 0,
          "date": "2017-08-28T13:21:39.453Z",
          "read": false
      }
  ]
  ```

* note: `info.transactionId` is quite important

### request (Loan - step 1)

* POST `/api/loan/request`

* ```json
  {
    "borrowId": "",
    "lendId": ""
  }
  ```

* note:

  * `borrowId` and `lendId` are provided in **get recommend** api and **get my borrow** api
  * once this API is called:
    * a **transaction** is created
    * the *lender* get a `BorrowRequest-Received` message

### accept request (Loan - step 2)

* POST `/api/loan/accept-request`

* ```json
  {
      "messageId": ""
  }
  ```

* note:

  * `messageId` is provided in message of type `BorrowRequest-Received` (field `_id`)
  * once this API is called, the *borrower* get a `BorrowRequest-Accepted` message

### send contract (Loan - step 3)

* POST `/api/loan/transaction`

* ```json
  {
      "messageId": ""
  }
  ```

* note:

  * `messageId` is provided in message of type `BorrowRequest-Accpted` (field `_id`)
  * once this API is called, the *lender* get a `BorrowContract-Received` message

### accept contract (Loan - step 4 - complete)

* POST `/api/loan/accept-transaction`

* ```json
  {
      "messageId": ""
  }
  ```

* note:

  - `messageId` is provided in message of type `BorrowContract-Received` (field `_id`)
  - once this API is called, both *lender* & *borrower* get a `Borrow-Completed` message

## Timeline

### get timeline

* GET `/api/timeline?page=PAGE&size=SIZE`

* ```json
  [
      {
          "_id": "59a531fa68aa9638dcce650a",
          "from": "59a3bc193cde380b1cef10a5",
          "type": "Borrow",
          "info": {
              "borrowId": "59a531fa68aa9638dcce6509"
          },
          "__v": 0,
          "date": "2017-08-29T09:20:58.257Z"
      },
      {
          "_id": "59a531d816c1c918fcf80f99",
          "from": "59a3bc193cde380b1cef10a5",
          "type": "Borrow",
          "info": {
              "borrowId": "59a531d816c1c918fcf80f98"
          },
          "__v": 0,
          "date": "2017-08-29T09:20:24.921Z"
      }
  ]
  ```

### get my own timeline

* GET `/api/timeline/me?page=PAGE&size=SIZE`
* same as **get timeline**


## Gurantee 担保部分

###  publish Offer

- POST `/api/gurantee/lend`

- ```json
  {
    "amount_gurantee": 1,
    "loan_ddl": 12,
    "min_rate": 0.3
  }
  ```

### publish Borrow

- POST `/api/gurantee/borrow`

- ```json
  {
    "city": "",
    "project": "",
    "amount_gurantee": 1,
    "reason": "",
    "max_rate": 3,
    "loan_ddl": 12,
    "other_detail": ""
  }
  ```

### get my own seek list

- GET `/api/gurantee/borrow`

- ```json
  [
      {
          "_id": "59b017762bc84c4c2cce798a",
          "city": "广州",
          "project": "smart",
          "cost": 12,
          "amount_gurantee": 30,
          "rate_gurantee": 0.7,
          "loan_ddl": 5,
          "reason": "no reason",
          "other_detail": "???",
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:42:46.279Z"
      },
      {
          "_id": "59b01d7d971a3f2e60e882b4",
          "city": "广州",
          "project": "smart",
          "cost": 12,
          "amount_gurantee": 30,
          "rate_gurantee": 0.7,
          "loan_ddl": 5,
          "reason": "no reason",
          "other_detail": "???",
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T16:08:29.497Z"
      }
  ]
  ```

### get my own offer list

- GET `/api/gurantee/lend`

- ```json
  [
      {
          "_id": "59b01551fd1b5147d87d4f12",
          "amount_guarantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:33:37.977Z"
      },
      {
          "_id": "59b015b740fb94502c910fc1",
          "amount_guarantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:35:19.656Z"
      },
      {
          "_id": "59b018e33c407d502ca7a8b9",
          "amount_gurantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:48:51.301Z"
      },
      {
          "_id": "59b018e43c407d502ca7a8bb",
          "amount_gurantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:48:52.275Z"
      }
  ]
  ```

### get seek detail

- GET `/api/gurantee/detail/seek?id=SEEKID`

- ```json
  {
      "_id": "59b017762bc84c4c2cce798a",
      "city": "广州",
      "project": "smart",
      "cost": 12,
      "amount_gurantee": 30,
      "rate_gurantee": 0.7,
      "loan_ddl": 5,
      "reason": "no reason",
      "other_detail": "???",
      "from": {
          "_id": "59ae8735dd5a292fa821f2cd",
          "comName": "华为短34",
          "comCapital": 23232,
          "comTime": "1",
          "comPhone": "1",
          "comRegistAddresss": "1",
          "comWorkAddresss": "1",
          "comField": "1",
          "comProduct": "1",
          "comIntro": "1",
          "comCreditScore": 89,
          "comHistoryScore": 70,
          "comAttributeScore": 88,
          "comIntegrityScore": 109
      },
      "__v": 0,
      "date": "2017-09-06T15:42:46.279Z"
  }
  ```

### get offer detail

- GET `/api/gurantee/detail/offer?id=OFFERID`

- ```json
  {
      "_id": "59b018e43c407d502ca7a8bb",
      "amount_gurantee": 300,
      "loan_ddl": 12,
      "min_rate": 0.3,
      "from": {
          "_id": "59ae8735dd5a292fa821f2cd",
          "comName": "华为短34",
          "comCapital": 23232,
          "comTime": "1",
          "comPhone": "1",
          "comRegistAddresss": "1",
          "comWorkAddresss": "1",
          "comField": "1",
          "comProduct": "1",
          "comIntro": "1",
          "comCreditScore": 89,
          "comHistoryScore": 70,
          "comAttributeScore": 88,
          "comIntegrityScore": 109
      },
      "__v": 0,
      "date": "2017-09-06T15:48:52.275Z"
  }
  ```

- ​

### get recommend for my Seek (single)

- GET `/api/gurantee/recommend/single?id=SEEKID`

- ```json
  [
      {
          "_id": "59b018e33c407d502ca7a8b9",
          "amount_gurantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:48:51.301Z"
      },
      {
          "_id": "59b018e43c407d502ca7a8bb",
          "amount_gurantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:48:52.275Z"
      }
  ]
  ```

### get recommend for my Seek (multi)

- GET `/api/gurantee/recommend/multi?id=SEEKID`

- ```json
  [
      {
          "_id": "59b018e33c407d502ca7a8b9",
          "amount_gurantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:48:51.301Z"
      },
      {
          "_id": "59b018e43c407d502ca7a8bb",
          "amount_gurantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:48:52.275Z"
      },
      {
          "_id": "59b01551fd1b5147d87d4f12",
          "amount_guarantee": 300,
          "loan_ddl": 12,
          "min_rate": 0.3,
          "from": "59ae8735dd5a292fa821f2cd",
          "__v": 0,
          "date": "2017-09-06T15:33:37.977Z"
      }
  ]
  ```

### get related messages

- GET `/api/gurantee/messages`

- ```json
  [
      {
          "_id": "59b01d7d971a3f2e60e882b6",
          "type": "Publish-GuranteeSeek",
          "info": {
              "seekId": "59b01d7d971a3f2e60e882b4"
          },
          "__v": 0,
          "date": "2017-09-06T16:08:29.511Z",
          "read": false
      },
      {
          "_id": "59b01c031565a86490e64acb",
          "type": "Gurantee-Completed",
          "info": {
              "transaction": {
                  "_id": "59b01b1d12ba8e44d802d7c3",
                  "from": "59ae8735dd5a292fa821f2cd",
                  "offer": "59b018e43c407d502ca7a8bb",
                  "seek": "59b017762bc84c4c2cce798a",
                  "__v": 0,
                  "status": "Progressing",
                  "date": "2017-09-06T15:58:21.058Z"
              }
          },
          "__v": 0,
          "date": "2017-09-06T16:02:11.763Z",
          "read": false
      },
      {
          "_id": "59b01c031565a86490e64aca",
          "type": "GuranteeContract-Accepted",
          "from": "59ae8735dd5a292fa821f2cd",
          "info": {
              "transaction": {
                  "_id": "59b01b1d12ba8e44d802d7c3",
                  "from": "59ae8735dd5a292fa821f2cd",
                  "offer": "59b018e43c407d502ca7a8bb",
                  "seek": "59b017762bc84c4c2cce798a",
                  "__v": 0,
                  "status": "Progressing",
                  "date": "2017-09-06T15:58:21.058Z"
              }
          },
          "__v": 0,
          "date": "2017-09-06T16:02:11.763Z",
          "read": false
      },
      {
          "_id": "59b01c031565a86490e64acb",
          "type": "Gurantee-Completed",
          "info": {
              "transaction": {
                  "_id": "59b01b1d12ba8e44d802d7c3",
                  "from": "59ae8735dd5a292fa821f2cd",
                  "offer": "59b018e43c407d502ca7a8bb",
                  "seek": "59b017762bc84c4c2cce798a",
                  "__v": 0,
                  "status": "Progressing",
                  "date": "2017-09-06T15:58:21.058Z"
              }
          },
          "__v": 0,
          "date": "2017-09-06T16:02:11.763Z",
          "read": false
      },
      {
          "_id": "59b01bd51565a86490e64ac8",
          "type": "GuranteeContract-Received&Accepted",
          "from": "59ae8735dd5a292fa821f2cd",
          "info": {
              "transaction": {
                  "_id": "59b01b1d12ba8e44d802d7c3",
                  "from": "59ae8735dd5a292fa821f2cd",
                  "offer": "59b018e43c407d502ca7a8bb",
                  "seek": "59b017762bc84c4c2cce798a",
                  "__v": 0,
                  "status": "Progressing",
                  "date": "2017-09-06T15:58:21.058Z"
              }
          },
          "__v": 0,
          "date": "2017-09-06T16:01:25.569Z",
          "read": false
      },
      {
          "_id": "59b01b901565a86490e64ac7",
          "type": "GuranteeRequest-Accepted",
          "from": "59ae8735dd5a292fa821f2cd",
          "info": {
              "transaction": {
                  "_id": "59b01b1d12ba8e44d802d7c3",
                  "from": "59ae8735dd5a292fa821f2cd",
                  "offer": "59b018e43c407d502ca7a8bb",
                  "seek": "59b017762bc84c4c2cce798a",
                  "__v": 0,
                  "status": "Progressing",
                  "date": "2017-09-06T15:58:21.058Z"
              }
          },
          "__v": 0,
          "date": "2017-09-06T16:00:16.398Z",
          "read": false
      },
      {
          "_id": "59b01b1d12ba8e44d802d7c4",
          "type": "GuranteeRequest-Received&Accepted",
          "from": "59ae8735dd5a292fa821f2cd",
          "info": {
              "transaction": {
                  "_id": "59b01b1d12ba8e44d802d7c3",
                  "from": "59ae8735dd5a292fa821f2cd",
                  "offer": "59b018e43c407d502ca7a8bb",
                  "seek": "59b017762bc84c4c2cce798a",
                  "__v": 0,
                  "status": "Progressing",
                  "date": "2017-09-06T15:58:21.058Z"
              }
          },
          "__v": 0,
          "date": "2017-09-06T15:58:21.061Z",
          "read": false
      },
      {
          "_id": "59b01b1d12ba8e44d802d7c5",
          "type": "GuranteeRequest-Sent",
          "info": {
              "transaction": {
                  "_id": "59b01b1d12ba8e44d802d7c3",
                  "from": "59ae8735dd5a292fa821f2cd",
                  "offer": "59b018e43c407d502ca7a8bb",
                  "seek": "59b017762bc84c4c2cce798a",
                  "__v": 0,
                  "status": "Progressing",
                  "date": "2017-09-06T15:58:21.058Z"
              }
          },
          "__v": 0,
          "date": "2017-09-06T15:58:21.061Z",
          "read": false
      },
      {
          "_id": "59b018e43c407d502ca7a8bc",
          "type": "Publish-GuranteeOffer",
          "info": {
              "offerId": "59b018e43c407d502ca7a8bb"
          },
          "__v": 0,
          "date": "2017-09-06T15:48:52.275Z",
          "read": false
      },
      {
          "_id": "59b018e33c407d502ca7a8ba",
          "type": "Publish-GuranteeOffer",
          "info": {
              "offerId": "59b018e33c407d502ca7a8b9"
          },
          "__v": 0,
          "date": "2017-09-06T15:48:51.302Z",
          "read": false
      },
      {
          "_id": "59b017762bc84c4c2cce798c",
          "type": "Publish-GuranteeSeek",
          "info": {
              "seekId": "59b017762bc84c4c2cce798a"
          },
          "__v": 0,
          "date": "2017-09-06T15:42:46.284Z",
          "read": false
      },
      {
          "_id": "59b015b740fb94502c910fc2",
          "type": "Publish-GuranteeOffer",
          "info": {
              "offerId": "59b015b740fb94502c910fc1"
          },
          "__v": 0,
          "date": "2017-09-06T15:35:19.659Z",
          "read": false
      }
  ]
  ```

- note: `info.transactionId` is quite important

### request (Loan - step 1)

- POST `/api/gurantee/request`

- ```json
  {
    "seekId": "",
    "offerId": ""
  }
  ```

- note:

  - `seekId` and `offerId` are provided in **get recommend** api and **get my seek** api
  - once this API is called:
    - a **transaction** is created
    - the *offerer* get a `GuranteeRequest-Received` message

### accept request (Loan - step 2)

- POST `/api/gurantee/accept-request`

- ```json
  {
      "messageId": ""
  }
  ```

- note:

  - `messageId` is provided in message of type `GuranteeRequest-Received` (field `_id`)
  - once this API is called, the *seeker* get a `GuranteeRequest-Accepted` message

### send contract (Loan - step 3)

- POST `/api/gurantee/transaction`

- ```json
  {
      "messageId": ""
  }
  ```

- note:

  - `messageId` is provided in message of type `GuranteeRequest-Accpted` (field `_id`)
  - once this API is called, the *offerer* get a `GuranteeContract-Received` message

### accept contract (Loan - step 4 - complete)

- POST `/api/gurantee/accept-transaction`

- ```json
  {
      "messageId": ""
  }
  ```

- note:

  - `messageId` is provided in message of type `GuranteeContract-Received` (field `_id`)
  - once this API is called, both *lender* & *seeker* get a `Gurantee-Completed` message
