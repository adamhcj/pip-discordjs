# pip-discordjs
<p>Node application running discord bot</p>
<p>Built using https://discord.js.org/</p>
<p>"discord.js is a powerful Node.js module that allows you to interact with the Discord API very easily. It takes a much more object-oriented approach than most other JS Discord libraries, making your bot's code significantly tidier and easier to comprehend."</p>

## 📹 Preview (Please turn on sounds to hear the bot speak)
https://github.com/user-attachments/assets/16ef3388-5b94-4a6b-b090-18a00ce66033


<br>
<p>used Google Text-to-Speech for NodeJS https://www.npmjs.com/package/node-gtts</p>
<p>Allows bot to speak in a channel, good for people who have muted mics / shy / in a library</p>

![image](https://github.com/adamhcj/pip-discordjs/assets/82926705/e5a01f1b-2902-435d-9675-722162e58d21)



## discord bot token has been removed, insert your own token
<ol>
  <li>Lookup a guide on discord bot basics (api keys / Intents / Inviting to your own server) </li>
  <li>Insert bot token</li>
  <li>npm install</li>
  <li>node index.js</li>
</ol>
<br><br>

## If you want to keep it running on a server; personally I have hosted it on the cloud in an AWS EC2 instance (t2.micro Amazon Linux 2)

### getting the node files in EC2
Personally I installed git and authenticated github in my EC2 instance
https://medium.com/digitalcrafts/how-to-set-up-an-ec2-instance-with-github-node-js-and-postgresql-e363cb771826


### install external dependencies (if node does not already install)
get ffmpeg: https://gist.github.com/willmasters/382fe6caba44a4345a3de95d98d3aae5
<br>
yum install opus
<br>
*The above may not be necessary as it was only needed for my old discord.py script rather than the current discord.js script.
<br>
<br>
### make new terminal window with tmux (so that this terminal continues even when closing ssh connection):
sudo yum install tmux
<br>
tmux new -s mywindow

### view back the terminal window on the next session:
tmux a -t mywindow
