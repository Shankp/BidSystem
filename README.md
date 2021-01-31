# BidSystem

### Steps to run in local enviorment

1. Run `npm install` command inside the bidapp folder which contains React front end.

2. Open the `BidSystemServer` folder and open the solution(BidSystem.sln) by Visual studion 2019.

3. Run the `DBScript.sql` file(https://github.com/Shankp/BidSystem/blob/main/Docs/DBScript.sql ) in sql server to create the database.

4. Change the DB source in appsetting.development.json file inside the `BidSystem.AspNet` project (https://github.com/Shankp/BidSystem/blob/main/BidSystemServer/Server/BidSystem/appsettings.Development.json)

3. Run the Server app opened by visual studio .Make sure BidSystem.AspNet is the startup project.

4. Go to the location `bidapp/public/config.json` and change the BidAppServerBaseURL to the running BidSystemServer URL.(https://github.com/Shankp/BidSystem/blob/main/bidapp/public/config.json)

5. Open the `bidapp` by VScode or open cmd on bidapp project and run `npm start` command to run reactjs app

 Admin credentials
    
    email : admin@admin.com 
    
    password : 123







