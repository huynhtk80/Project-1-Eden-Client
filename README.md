# Project-1-Eden-Playground

Installation
------------
Bash Terminal:

Client Side only

  To Download code via git hub
  
    Run git clone https://github.com/huynhtk80/Project-1-Eden-Client.git
  
  Install Dependencies
  
    Run npm install
  

  Host Server Locally Requires Downloading Project-1-Eden-Server from https://github.com/huynhtk80/Project-1-Eden-Server
    -program is defaulted to run on http://localhost:4002
  
  Access Remote Host
    - access client.js file in repository
    - comment out localhost URI
    - Uncomment 'https://guarded-atoll-77874.herokuapp.com' URI
    - due to current delay/bug in remote server comment out last line of code in index file
      line 151: setInterval(updateOnlinePlayer, 250), this will disable being able to see other players but makes the game more stable.
    
Run Game
--------
- Recomended to expand window to full size to prevent text wraping, do not change window terminal size once game has started
- in terminal run:
    
    Node index.js
