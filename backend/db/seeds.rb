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
u1 = User.create(username:"liaowow", location:"NYC", first_name:"annie", profile_pic:"")


## MOODS
m1 = Mood.create(name:"happy", words:"Happy,Excited,Great,Upbeat,Euphoric", emojis:"😀,🥳,🤪")
m2 = Mood.create(name:"sad", words:"Sad,Somber,Melancholic,Deflated,Lugubrious", emojis:"😔,😭,😫")
m3 = Mood.create(name:"angry", words:"Angry,Furious,Bitter,Resentful,Irritated", emojis:"😡,🤬,😤")
m4 = Mood.create(name:"calm", words:"Calm,Peaceful,Pensive,Neutral,Chill", emojis:"🧘‍♂️,😎,😶")


## QUOTES
q1 = Quote.create(content: "as;figuhre;osa", author:"Sean")


## ENTRIES
e1 = Entry.create(title:"Frist One", content:"Something", current_mood: "happy", image: "url", song: "url", user_id: u1.id, mood_id: m1.id, quote_id: q1.id)
e2 = Entry.create(title:"Frist One", content:"Something", current_mood: "happy", image: "url", song: "url", user_id: u1.id, mood_id: m1.id)