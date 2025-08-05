from flask import Flask, render_template, request
import sounddevice as sd
import threading

app = Flask(__name__)
is_muted = False

samplerate = 48000
blocksize = 128
channels = 1

def audio_loop():
    global is_muted
    def callback(indata, outdata, frames, time, status):
        if is_muted:
            outdata.fill(0)
        else:
            outdata[:] = indata
    with sd.Stream(samplerate=samplerate, blocksize=blocksize,
                   dtype='float32', channels=channels,
                   callback=callback, latency='low'):
        threading.Event().wait()  # Keeps thread alive

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/toggle', methods=['POST'])
def toggle():
    global is_muted
    is_muted = not is_muted
    return ('', 204)

if __name__ == '__main__':
    threading.Thread(target=audio_loop, daemon=True).start()
    app.run(debug=False, host='0.0.0.0')
