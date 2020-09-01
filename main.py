from flask import Flask, render_template, request
from bot import getBotReply
app = Flask(__name__)

@app.route('/')
def index():
    return(render_template('index.html'))

@app.route('/chat')
def chat():
    userInput = request.args.get('msg')
    print(request.args)
    reply = getBotReply(userInput)
    print(f"User input is {userInput}. Bot Reply is: {reply}")
    return {'reply': reply}

if __name__ == "__main__":
    app.run()