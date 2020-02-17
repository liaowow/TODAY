# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'database_cleaner'
DatabaseCleaner.clean_with(:truncation)


## USERS
u1 = User.create(username:"liaowow", location:"NYC", first_name:"Annie", profile_pic:"https://ca.slack-edge.com/T02MD9XTF-UR5HZ1E6M-5342f93026b1-512")
u2 = User.create(username:"swb258", location:"NYC", first_name:"Sean", profile_pic:"https://ca.slack-edge.com/T02MD9XTF-UR0NMQM42-034fb56f3580-512")
u3 = User.create(username:"kgleeson", location:"Long Island", first_name:"Kevin", profile_pic:"https://ca.slack-edge.com/T02MD9XTF-URDG7620Y-1f912f45a62a-512")
u4 = User.create(username:"srizzo", location:"Austin", first_name:"Summer", profile_pic:"https://ca.slack-edge.com/T02MD9XTF-UR22G3D7D-5b7b5152272d-512")
u5 = User.create(username:"gmcguire", location:"Denver", first_name:"Gracie", profile_pic:"https://ca.slack-edge.com/T02MD9XTF-UD5PW68JW-55f48a258cbc-512")



## MOODS
m1 = Mood.create(name:"happy", words:"Happy,Excited,Great,Upbeat,Euphoric", emojis:"😀,🥳,🤪")
m2 = Mood.create(name:"sad", words:"Sad,Somber,Melancholic,Deflated,Lugubrious", emojis:"😔,😭,😫")
m3 = Mood.create(name:"angry", words:"Angry,Furious,Bitter,Resentful,Irritated", emojis:"😡,🤬,😤")
m4 = Mood.create(name:"calm", words:"Calm,Peaceful,Pensive,Neutral,Chill", emojis:"🧘‍♂️,😎,😶")


## QUOTES
50.times do
    Quote.create(content: Faker::Quote.yoda, author: Faker::Name.name)    
end


## ENTRIES
30.times do
    assigned_mood = Mood.all.sample
    assigned_mood_words = assigned_mood.words.split(",")
    assigned_mood_emojis = assigned_mood.emojis.split(",")
    combined_mood = assigned_mood_words + assigned_mood_emojis

    unsplash_imgs = []
    img_keywords = [
        "nature", "relax", "water", "vacation", "sad", "happy", "mad", "beautiful", "cool", "peaceful",
        "city", "landscape", "mountain", "work", "smile", "music", "fun", "serene", "loud", "sunny",
        "balloon", "object", "photography", "painting", "book", "cute", "animal", "horse", "bird", "tree"
    ]
    img_keywords.each{ |word| unsplash_imgs.push("https://source.unsplash.com/800x600/?#{word}")}

    Entry.create(title: Faker::Book.title, content: Faker::Lorem.paragraph(sentence_count: 10), current_mood: combined_mood.sample, image: unsplash_imgs.sample, song: Faker::Avatar.image, user_id: u1.id, mood_id: assigned_mood.id, quote_id: rand(1..50))
end

100.times do
    assigned_mood = Mood.all.sample
    assigned_mood_words = assigned_mood.words.split(",")
    assigned_mood_emojis = assigned_mood.emojis.split(",")
    combined_mood = assigned_mood_words + assigned_mood_emojis

    unsplash_imgs = []
    img_keywords = [
        "nature", "relax", "water", "vacation", "sad", "happy", "mad", "beautiful", "cool", "peaceful",
        "city", "landscape", "mountain", "work", "smile", "music", "fun", "serene", "loud", "sunny",
        "balloon", "object", "photography", "painting", "book", "cute", "animal", "horse", "bird", "tree"
    ]
    img_keywords.each{ |word| unsplash_imgs.push("https://source.unsplash.com/800x600/?#{word}")}

    Entry.create(title: Faker::Book.title, content: Faker::Lorem.paragraph(sentence_count: 10), current_mood: combined_mood.sample, image: unsplash_imgs.sample, song: Faker::Avatar.image, user_id: rand(2..5), mood_id: assigned_mood.id, quote_id: rand(1..50))
end
