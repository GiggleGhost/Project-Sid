// Web Audio API Romantic Ambient Synth
// Generates a soft, lush, relaxing romantic chord progression using Web Audio API as a fail-safe

class RomanticSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private volume = 0.25;

  private chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23], // G7
  ];

  private currentChordIndex = 0;

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.playNextChord();
      this.intervalId = window.setInterval(() => {
        this.playNextChord();
      }, 4000);
    } catch {
      // AudioContext not allowed or failed
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = vol;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  private playNextChord() {
    if (!this.ctx || !this.isPlaying) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const duration = 3.8;

    chord.forEach((freq, idx) => {
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm triangle wave for soft piano/rhodes/pad feel
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Detune slightly for lush warmth
      osc.detune.setValueAtTime((idx - 1.5) * 4, now);

      // Smooth attack & decay envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.12, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });
  }
}

export const romanticSynth = new RomanticSynth();
