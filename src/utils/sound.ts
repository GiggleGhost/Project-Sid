// Web Audio API Sound Synthesizer for romantic micro-interactions
// Operates smoothly without external audio dependencies or broken links

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Chapter 1 / Password: Dual Heartbeat
  public playHeartbeat() {
    const ctx = this.getContext();
    if (!ctx) return;

    const playThump = (time: number, freq: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(20, time + duration);

      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    };

    const now = ctx.currentTime;
    playThump(now, 85, 0.12);
    playThump(now + 0.15, 70, 0.18);
  }

  // Envelope Opening Sound
  public playEnvelopeOpen() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Sparkle Chime Sound
  public playSparkle() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C E G C E pentatonic

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.45);
    });
  }

  // Ribbon Untie Sound
  public playRibbonUntie() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Scratch sound for scratch card
  public playScratch() {
    const ctx = this.getContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200 + Math.random() * 600;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  }

  // Card Flip Sound
  public playFlip() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Confetti Pop / Success Sound
  public playPop() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Realistic Synthesized Firework Sound (Whistle + Boom + Crackles)
  public playFirework() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Launch Whistle
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistleOsc.type = 'sine';
    whistleOsc.frequency.setValueAtTime(250 + Math.random() * 100, now);
    whistleOsc.frequency.exponentialRampToValueAtTime(1100 + Math.random() * 300, now + 0.22);

    whistleGain.gain.setValueAtTime(0.01, now);
    whistleGain.gain.linearRampToValueAtTime(0.07, now + 0.12);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    whistleOsc.connect(whistleGain);
    whistleGain.connect(ctx.destination);
    whistleOsc.start(now);
    whistleOsc.stop(now + 0.26);

    // 2. Explosion Boom & Sparkling Crackles
    setTimeout(() => {
      const bCtx = this.getContext();
      if (!bCtx) return;
      const bNow = bCtx.currentTime;

      // Deep Boom
      const boomOsc = bCtx.createOscillator();
      const boomGain = bCtx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(140 + Math.random() * 40, bNow);
      boomOsc.frequency.exponentialRampToValueAtTime(25, bNow + 0.35);

      boomGain.gain.setValueAtTime(0.2, bNow);
      boomGain.gain.exponentialRampToValueAtTime(0.001, bNow + 0.35);

      boomOsc.connect(boomGain);
      boomGain.connect(bCtx.destination);
      boomOsc.start(bNow);
      boomOsc.stop(bNow + 0.38);

      // Sparkle Crackle Burst Notes
      const crackleFreqs = [783.99, 987.77, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00];
      crackleFreqs.forEach((freq) => {
        const delay = Math.random() * 0.25;
        const cOsc = bCtx.createOscillator();
        const cGain = bCtx.createGain();

        cOsc.type = 'sine';
        cOsc.frequency.setValueAtTime(freq + (Math.random() * 150 - 75), bNow + delay);

        cGain.gain.setValueAtTime(0, bNow + delay);
        cGain.gain.linearRampToValueAtTime(0.04, bNow + delay + 0.02);
        cGain.gain.exponentialRampToValueAtTime(0.001, bNow + delay + 0.18);

        cOsc.connect(cGain);
        cGain.connect(bCtx.destination);

        cOsc.start(bNow + delay);
        cOsc.stop(bNow + delay + 0.2);
      });
    }, 220);
  }
}

export const sounds = new SoundEngine();
