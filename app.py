from flask import Flask, render_template, request

app = Flask(__name__)
is_muted = False

@app.route('/')
def index():
    return render_template('index.html', muted=is_muted)

@app.route('/toggle', methods=['POST'])
def toggle():
    global is_muted
    is_muted = not is_muted
    return ('', 204)

if __name__ == '__main__':
    app.run(debug=True)
