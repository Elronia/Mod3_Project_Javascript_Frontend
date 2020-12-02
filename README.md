# Mod3_Project_Javascript_Frontend
Art Gallery is a full stack web application where you can browse around the gallery of famous artists' paintings. The inspiration of this app came during the time of COVID when most of the museums were closed. Art Gallery provides an opportunity to learn more about painters and their artworks.
## Getting Started
### Launching Frontend
* Have the rails server running on "localhost:3000"
* cd into Mod3_Project_Javascript_Frontend
* Open html file in browser  
  ```$ open gallery.html```
### CRUD Operations
* User is able to enter the name and the username
* User is able to add paintings to their favorites 
* User can click on a Painting and either see more information about it or add it to their favorites 
* User can remove paintings from favorites
* User is able to learn more about a particular artist that drew the painting that they clicked 
## Project Images 📷
### User Login and Change Username Forms
![Login Form](https://res.cloudinary.com/elronia/image/upload/v1606948281/Gallery_Project3/Screen_Shot_2020-11-20_at_1.39.14_PM_inp2mi.png)
![Change Username](https://res.cloudinary.com/elronia/image/upload/v1606948281/Gallery_Project3/Screen_Shot_2020-11-20_at_1.39.14_PM_inp2mi.png)
* User is able to login along with changing his username
### Gallery Page
![Gallery Page](https://res.cloudinary.com/elronia/image/upload/v1606948282/Gallery_Project3/Screen_Shot_2020-11-20_at_1.51.25_PM_wd3h45.png)
* Browse all the paintings of famous artists
![Like](https://res.cloudinary.com/elronia/image/upload/v1606948282/Gallery_Project3/Screen_Shot_2020-11-20_at_1.42.06_PM_sldrl5.png)
* Put like which will add the painting into the favorites
![Add to Favorites](https://res.cloudinary.com/elronia/image/upload/v1606948283/Gallery_Project3/Screen_Shot_2020-11-20_at_2.03.59_PM_kamiml.png)
### Favorites Page
![Favorites](https://res.cloudinary.com/elronia/image/upload/v1606948283/Gallery_Project3/Screen_Shot_2020-11-20_at_1.45.21_PM_gvxjse.png)
* See all the favorites
![Delete from favorites](https://res.cloudinary.com/elronia/image/upload/v1606948283/Gallery_Project3/Screen_Shot_2020-11-20_at_1.45.47_PM_qb4xul.png)
* Remove from Favorites
## Features
### User Login and Change Username
![Login](https://media.giphy.com/media/JKuZbmMuazrCjGvxTu/giphy.gif)
![Username](https://res.cloudinary.com/elronia/image/upload/v1606948282/Gallery_Project3/Screen_Shot_2020-11-20_at_1.41.04_PM_m3gai0.png)
### Add to Favorites
![Browse and Like](https://media.giphy.com/media/SqyqLkDvCUnHpr8ZQI/giphy-downsized.gif)
![Like](https://media.giphy.com/media/fX6i4sGHDzpZ7yXevf/giphy.gif)
![Add to Favorites](https://media.giphy.com/media/wUq9UGCSNZ6TXIvjJP/giphy.gif)
### Delete from Favorites
![Delete from Favorites](https://media.giphy.com/media/AXKtzJU8txrV9waCX3/giphy.gif)
### Learn more about a painting and its artist from both painting page and artist's page
![Painting and painter](https://media.giphy.com/media/fz4buM5zfNXDzav0j0/giphy.gif)
![Painter](https://media.giphy.com/media/QWu4A2uzG77A3WrSwK/giphy.gif)
### ActiveRecord Associations
* There are 4 models with `has_many`, `belongs_to` and `has_many through` associations
### Domain Model
<img src='./image/Gallery_ERD.png'> </img>
## Tech Stack
* Vanilla JavaScript (Frontend)
* Ruby on Rails API (Backend: https://github.com/Elronia/Mod3_Project_Gallery_Rails_Backend)
* PostgreSQL
* HTML
* CSS
* Active Record
## Tools
* [Rack CORS](https://github.com/cyu/rack-cors)
* [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers)
## Creators
* [Ekaterina Zarudnaya](https://github.com/Elronia)
* [Patrick Pierre](https://github.com/pierrewebdev)
