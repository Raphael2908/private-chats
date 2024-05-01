# Goal 
To create a chat app that mimics how Telegram's secret chats work in the backend by implementing the Diffie-hellman algorithm and cesar cipher (to simulate an encryption algorithm)

# Sub goal
To built this app using the bare minimum amount of dependancies. No Vue, No tailwind, No Nuxt

# Learning points
Building a chat app using pure JS, HTML and CSS with the help of Socket.io was such an enjoyable experience. I did not have to read up on a framework's documentation and could apply what I learned from my basics in Javasript course that I did in 2020. This journey has also opened my eyes and showed me how impressive Nuxt is. I could appreciate the features that Nuxt provide like server-side rendering and actual working server-side code. However, I found the development processed more streamlined by using only what I needed. Not only was the code required for this project simple but I did not have to read through mountains of documentation to use a tool in a framework. 

TLDR; No framework -> Only wrote and used what was required -> Try not to be dependant on dependencies 

# Demo
https://youtu.be/K6sNfN9Z_n0?si=GSNjJfkew-yDEZqZ&t=193

# Todo
- [x] Chat interface
- [x] Diffie Hellman Key Exchange algo in backend
- [x] Cesar cipher  
- [x] Cesar Cipher showcase
    - [x] button to toggle private key
    - [X] button to toggle cesar cipher
    - [x] button to show calculations
- [x] Fix Cipher bug where a user sends a message when toggle cipher is off, causing encrypted text to be treated as decrypted text
