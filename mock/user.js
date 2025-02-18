module.exports = [
  // user login
  {
    url: '/api/v3/ppc-management/auth/login',
    type: 'post',
    response: _ => {
      const token = 'admin-token'

      // mock error
      if (!token) {
        return {
          errorCode: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        errorCode: 0,
        message: 'success',
        data: 'Bearer eyJpYXRtaWxsIjoxNjI0ODc0MjcyMzQ0LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZG1pbiIsIm5iZiI6MTYyNDg3NDI3Miwicm9sZSI6IkFETUlOIiwicGVybWlzc2lvbnMiOiJBRE1JTl9QRVJNSVNTSU9OUyIsImlzcyI6ImNvbXBhbnkyIiwiYWdlbmN5SWQiOiIxMDAyIiwiZXhwIjoxNjI0ODkyMjcyLCJ1c2VyTmFtZSI6ImFkbWluIiwiaWF0IjoxNjI0ODc0MjcyLCJhZ2VuY3lOYW1lIjoiY29tcGFueTIifQ.lVCuJiEifXMZxFffLW3p767QFrfQSgLt9WBI-G0-KaY'
      }
    }
  },
  // user logout
  {
    url: '/api/v3/ppc-management/auth/logout',
    type: 'post',
    response: _ => {
      return {
        'version': '1',
        'errorCode': 0,
        'message': 'xxx'
      }
    }
  },

  // user register
  {
    url: '/api/v3/ppc-management/auth/register',
    type: 'post',
    response: _ => {
      return {
        'version': '1',
        'errorCode': 0,
        'message': 'success'
      }
    }
  },

  // user changePassword
  {
    url: '/api/v3/ppc-management/auth/change-password',
    type: 'post',
    response: _ => {
      return {
        'version': '1',
        'errorCode': 0,
        'message': 'success'
      }
    }
  },

  {
    url: '/api/v3/ppc-management/auth/delete-account',
    type: 'post',
    response: _ => {
      return {
        'version': '1',
        'errorCode': 0,
        'message': 'success'
      }
    }
  },

  // user authCode
  {
    url: '/api/v3/ppc-management/auth/image-code',
    type: 'get',
    response: _ => {
      return {
        version: '1.0',
        errorCode: 0,
        message: 'success',
        data: {
          randomToken: '',
          imageBase64: 'iVBORw0KGgoAAAANSUhEUgAAAJsAAAA8CAIAAAD+Gl+NAAADQUlEQVR42u3cMW7kMAwFUB1im9S5xQLpUi9yhhxiq82Vttw+N0q53WSAAQzDGtGfFClSGgpqknFsj58lk7Sd8vX/kn2lXi6N9u/zL/FjNqN2Pc6yvq2hIJyJOkyxf20M0XQNPkxvPUVXa0Ugl6gpmi2AaIZIa4pmGrOgqEWEnc1fNFuKZkvRbCmaLUVTdJ4mvllRt/ffP/c9Rc/b25/XQwf/8OXXE9gF+dgB8m5P0dCoxLic1zVF2ZzBUT2vo1zUbZIMghrTdRrR7WqHc+KiMs4UlYvuQ9Mxorj6o4se2EDUQ7LRGQSJUVuurA19PP+49YlFa7YNDxGtc0dHUdaStWKrLyJKSNOiNerhN1qoBBjrruKpqKJricaJiFrko0h8JBMFObVQI4oqopqWGkBUlmi/q5so8ik+6yoWBdUTGBpsMlFk/LmI0oV7Lip9A+AUTHfi9Rmj3NwUR6W995Z2xd56E2OiXDdR2WKnl1LEW/bYm3gG3lwXj3W1RAU1ffWcFcxzrn1YuOuTj4oX47pa1CJ66oIWES/0JlNYURy1dZdGsXjUCoy1khlQ0aeuq4tKXFbrBexQb5sQV3rFrnRk5yYqiHjrL9bSou/VyKbT1iklTlL36wFFkSg9kCiozgpoZdUG4gIJPpoEjsj6/COW6Xoj2MUVrAhqJaa6ySg4RokhSAxWVg7tL8qt8Q6oCI4UPe3c8N7hjre6qEXhXlbj1c1e6MgoxKwrdtVF5T6iPaB2j4iCj48HerqTeLahp6SgVV5QfJYMryIJXtt1fktCxnZ6vOxKRZ3Pj9U2BGTcKuD4FvBFdALp7kBMUSpkCMtJQ8r2vKxk2Rqpjq6tHaN3uAe1LGnZOuUHu7YsWVeK6PnoSM7WQRlGy9ouvUv4Ny1BVASHmPUn9SasUfHN4V8fuR4Xd06xUP+YtkMFOcWnMhEilCCcrEPcKbE/oy1QTy/eKkF4aw0lDieopWhgkd7Qc4DW5qYZo50fRaAlkkvFs4cY9yUg58Xjf8Fuk3BndUJrPeJDN5moaYBKh5GK/13H7rh1ifbstCCJvAyp1vZHKwMmkhQdLeo4QOWi1pyd2aoX6oOKLow68aw7XtS9yD7LGP0G/T53V67Tc1kAAAAASUVORK5CYII='
        }
      }
    }
  },
  // user pub
  {
    url: '/api/v3/ppc-management/auth/pub',
    type: 'get',
    response: _ => {
      return {
        version: '1.0',
        errorCode: 0,
        message: 'success',
        data: 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAiJ0u2c/Xze3Jv+beltOfoaavZtatVmldwctq3ItZZ5w60whzKiNdrsFcQZqj2PszLbwiYsC4fEFKQIcaTiHCXDSQ1Km25ay8/c+NKprl/ruevGB1pXDnQNZhQqoaghfzijTX2bl6DJqCnuSV46sCKgKfyKm3PNPcsMUxYWC1283an3cviUvdSnZyXHN++T2Otw77EVm55CNuDpX5MkOOIPTMSAxzweC9n9dJf5sGbmzqK2Yx8Jp/9vUA+jqR8ljqKJ7Q6bLVW3/xuqAN542U8a3dvPY3RVAkLVxgnl7UIfQl5PcBIxd4W3NZM6da/ZGmp76MAq/hxpceoU7DmQntkP9mX9ExtzcUTNFTm+LERwR530YRx4P7QB3EAAujEklZrlhXVwNa3phXnZRJWm4nuJ3qQB0I2VIw9q247aSLWEkoXQWu9CyRWzt7hmxgspwCYwsMdkvs0t8zv5L1LK0i8qXLHQCrasHkoJQ16+aztSDFmrAhJKtC4JN+ACnR1kMXAz/r2o3Y+pCO/2eBSDllsYSwCMRcgFwGvmutSD5dLes+zFZusxTRZ6vVnnnob+fOZ0NAdEDG9QY4UZoUxMjqSqM2db9jQ67QlcuMuEsc7uQ7T5mWlNORBnEVCz/UIjvFKnw7XnvGWcT/hKTPKYbgkqOJ/KQ05DoF/W3VHU+inPMCAwEAAQ=='
      }
    }
  },
  // invitation code
  {
    url: '/api/v3/ppc-management/auth/invitation-code',
    type: 'post',
    response: _ => {
      return {
        version: '1.0',
        errorCode: 0,
        message: 'success',
        data: [
          {
            'role': 'ADMIN',
            'code': 'ADMIN1234'
          },
          {
            'role': 'DATA_PROVIDER',
            'code': 'DATAPROVIDER1234'
          },
          {
            'role': 'ALGO_PROVIDER',
            'code': 'ALGOPROVIDER1234'
          },
          {
            'role': 'DATA_CONSUMER',
            'code': 'DATACONSUMER1234'
          },
          {
            'role': 'TEST_USER_APC',
            'code': 'TEST_USER_APC1234'
          }, {
            'role': 'TEST_USER_PPC',
            'code': 'TEST_USER_PPC1234'
          }
        ]
      }
    }
  },
  {
    url: '/api/v3/ppc-management/auth/need-mail-auth',
    type: 'get',
    response: _ => {
      return {
        version: '1.0',
        errorCode: 0,
        message: 'success',
        data: true
      }
    }
  },
  {
    url: '/api/v3/ppc-management/auth/mail-code',
    type: 'post',
    response: _ => {
      return {
        version: '1.0',
        errorCode: 0,
        message: 'success'
      }
    }
  }
]
