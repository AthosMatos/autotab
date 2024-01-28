// recorder-processor.js
class RecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffers = [];
    this.startTime = currentTime;
  }

  process(inputs, outputs, parameters) {
    if (inputs[0].length > 0) {
      // Assuming mono audio (one channel)
      const input = inputs[0][0];
      if (input) {
        this.buffers.push(new Float32Array(input));
      }
    }
    this.port.postMessage({
      msg: "time",
      currentTime: currentTime - this.startTime,
      audioData: this.getAudioData()
    });
    return true;
  }

  getAudioData() {
    let length = 0;
    this.buffers.forEach((buffer) => (length += buffer.length));
    const audioData = new Float32Array(length);
    let offset = 0;
    this.buffers.forEach((buffer) => {
      audioData.set(buffer, offset);
      offset += buffer.length;
    });
    return audioData;
  }
}

registerProcessor("recorder-processor", RecorderProcessor);
