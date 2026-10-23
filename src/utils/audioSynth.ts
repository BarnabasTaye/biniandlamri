// Romantic acoustic chime & gentle ambient harp synthesizer using Web Audio API

class AmbientWeddingAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft romantic arpeggio notes in F Major / D Minor Pentatonic (Hz)
  private notes = [
    349.23, // F4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    698.46, // F5
    880.00, // A5
  ];

  // Chords progression for romantic ambient soundscape
  private chords = [
    [174.61, 261.63, 349.23, 440.00], // F major (F3, C4, F4, A4)
    [146.83, 220.00, 293.66, 349.23], // D minor (D3, A3, D4, F4)
    [116.54, 174.61, 233.08, 349.23], // Bb major (Bb2, F3, Bb3, F4)
    [130.81, 196.00, 261.63, 329.63], // C major (C3, G3, C4, E4)
  ];

  private playPluck(freq: number, time: number, duration: number = 2.2, gainLevel: number = 0.08) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Soft warm bell/harp tone (sine blended with triangle)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Natural exponential pluck decay
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(gainLevel, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.00001, time + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  public start(): boolean {
    try {
      this.init();
      if (!this.ctx) return false;
      if (this.isPlaying) return true;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);
      this.masterGain.connect(this.ctx.destination);

      this.isPlaying = true;
      let step = 0;
      let chordIndex = 0;

      const scheduleTick = () => {
        if (!this.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;
        const currentChord = this.chords[chordIndex % this.chords.length];

        // Sustained warm base root note
        this.playPluck(currentChord[0], now, 3.5, 0.09);

        // Arpeggiated melody notes
        const melodyNote1 = currentChord[(step % (currentChord.length - 1)) + 1];
        this.playPluck(melodyNote1, now + 0.2, 2.0, 0.07);

        const highTone = this.notes[(step * 2 + chordIndex) % this.notes.length];
        this.playPluck(highTone, now + 0.7, 2.4, 0.05);

        const fillTone = this.notes[(step + 3) % this.notes.length];
        this.playPluck(fillTone, now + 1.2, 1.8, 0.04);

        step++;
        if (step % 4 === 0) {
          chordIndex++;
        }
      };

      scheduleTick();
      this.intervalId = window.setInterval(scheduleTick, 2400);
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    const gain = this.masterGain;
    if (gain && this.ctx) {
      gain.gain.cancelScheduledValues(this.ctx.currentTime);
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.00001, this.ctx.currentTime + 0.6);
      setTimeout(() => {
        gain.disconnect();
        if (this.masterGain === gain) this.masterGain = null;
      }, 700);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return this.start();
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientWeddingAudio();
