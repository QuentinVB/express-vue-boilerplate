# Account creation process 

``` mermaid
sequenceDiagram
    box rgb(20,66,128) User Mailbox
        participant M as MailBox 📩
    end
    box rgb(33,66,99) App
        participant L as Login view
        participant RP as Register view
        participant AS as Auth Service
    end
    box rgb(10,66,10) Server
        participant R as Router
        participant RD as Redirect page
        participant AC as Auth Controller
    end
    RP->>AS:Send usrName, mail, & pwd
    Note over RP : check password consistency
    AS->>R:POST usrName,mail, & pwd
    R->>AC:usrName,mail, & pwd
    opt 401 Error
        AC->>RP: User Already created
    end
    Note over AC : Hashing pwd, store user in DB 😃<br/> (marked as not confirmed though)
    par 
        AC->>RP : HTTP response 201 with JSON and sucess msg
        AC-->>M : SMTP Confirm Email 📧 with URL and Query (userId + key)
    end
    Note over M : User click on url
    Note over AS : redirect to login 
    M-->>R : GET emailconfirm/ with (userId + key)
    R-->>AC: decode key
    opt 403 Error
        AC->>RP: Invalid URL
    end
    AC-->> RD : render waiting page
    RD -->> L : redirect to App and Login page
```