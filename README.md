# RestaurantApp

## Database setup with Docker
`docker run --name=db-webtechProjekt -e MYSQL_ROOT_PASSWORD=securepassword -e MYSQL_DATABASE=restaurantdb -p 3306:3306 -d mariadb`
`docker run --name phpMyAdmin-webtechProjekt -d --link db-webtechProjekt:db -p 8080:80 phpmyadmin/phpmyadmin`

## Installing Dependencies
Run `./install.sh` to download and install all required node modules for the nodeAPI and the AngularFrontend.

## Run Development server
Run `./start.sh` for a dev server. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 
The nodeAPI is hosted under `http://localhost:3000/`

## Login Angular FrontEnd
username: Giovanni
password: password

## Further help
If there is any need of further help please don't hesitate to contact us direct via mail:
 * philippfis@edu.aau.at
 * dominikpot@edu.aau.at

## GitHub Repo
https://github.com/Pote16/restaurant-app/

## Video Instructions
01-Installation: https://share.vidyard.com/watch/SGcpwN18LvU6xJoxGVNTm8?
02-FrontEnd-UserDemo: https://share.vidyard.com/watch/6XLAUghxTtuNxfe7N3Ae7v?
03-NodeApi-Code: https://share.vidyard.com/watch/Yr6hgMmsRH9QvQRhYBTkd4?
04-Angular-Code: https://share.vidyard.com/watch/9KShrDzVahoY1WmRnNLsSZ?

## URL Application on LiveServer 
https://webtech.salespool.at/admin/
