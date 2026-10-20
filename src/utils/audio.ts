/**
 * Web Audio API interactive sound effects (wax seal crack, paper rustle, heart tap).
 * Background music loops removed - only "stupid song by Olivia Rodrigo" is played.
 */

class RomanticAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private gainNode: GainNode | null = null;

  public initCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playSealBreak() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;

      // Soft wax "crack" click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.gainNode || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);

      // Delicate golden chime sparkle
      const chimeFreqs = [880, 1108.73, 1318.51, 1760];
      chimeFreqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = 'triangle';
        chimeOsc.frequency.setValueAtTime(freq, now + idx * 0.04);

        chimeGain.gain.setValueAtTime(0, now + idx * 0.04);
        chimeGain.gain.linearRampToValueAtTime(0.08, now + idx * 0.04 + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.45);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.gainNode || this.ctx.destination);

        chimeOsc.start(now + idx * 0.04);
        chimeOsc.stop(now + idx * 0.04 + 0.5);
      });
    } catch {
      // Audio fallback silent
    }
  }

  public playPaperSlide() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.gainNode || this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.36);
    } catch {
      // Audio fallback silent
    }
  }

  public playHeartPop() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqs = [523.25, 659.25, 783.99, 1046.5];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, now);
      osc.frequency.exponentialRampToValueAtTime(randomFreq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.gainNode || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // fallback
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
  }
}

export const romanticAudio = new RomanticAudio();
