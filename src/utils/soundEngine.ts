// Web Audio API Sound Synthesizer for Kisku Bus Driver Experience
class SoundEngine {
  private ctx: AudioContext | null = null;
  private engineGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private isEngineRunning: boolean = false;
  public isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play Air Horn (The iconic PAAPO PAAPO dual tone pneumatic horn)
  public playAirHorn() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Dual tone frequencies typical of pneumatic bus horns (F4 & A4 tuned slightly sharp)
    const freq1 = 349.23; // F4
    const freq2 = 440.0;  // A4
    const freq3 = 698.46; // F5 harmonic

    // Osc 1
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq1, now);
    osc1.frequency.exponentialRampToValueAtTime(freq1 * 1.02, now + 0.6);

    // Osc 2
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq2, now);
    osc2.frequency.exponentialRampToValueAtTime(freq2 * 1.015, now + 0.6);

    // Osc 3 (high punch)
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'square';
    osc3.frequency.setValueAtTime(freq3, now);

    // Filter to give brassy acoustic body
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(3.5, now);

    // Distortion/Overdrive effect for raw horn punch
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.05); // Attack
    gain.gain.setValueAtTime(0.35, now + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7); // Release

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + 0.75);
    osc2.stop(now + 0.75);
    osc3.stop(now + 0.75);
  }

  // Play Conductor Whistle
  public playWhistle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    
    // Whistle frequency with rapid trill
    osc.frequency.setValueAtTime(2600, now);
    
    // Vibrato
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(28, now); // 28Hz trill
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, now);
    lfo.connect(osc.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    lfo.start(now);
    osc.start(now);
    
    lfo.stop(now + 0.4);
    osc.stop(now + 0.4);
  }

  // Play Conductor Brass Bell ("Trin Trin")
  public playBell() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    [1200, 2400, 3600].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      const vol = 0.25 / (idx + 1);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.8);
    });
  }

  // Ticket Puncher Click
  public playPunchSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Metallic click (Noise buffer)
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    // Ping resonance
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.15, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    noise.start(now);
    osc.start(now);
  }

  // Wiper swoosh
  public playWiperSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.linearRampToValueAtTime(800, now + 0.2);
    filter.frequency.linearRampToValueAtTime(150, now + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Toggle Engine Rumble Sound
  public toggleEngine(speedPercent: number = 0) {
    this.initCtx();
    if (!this.ctx) return;

    if (this.isEngineRunning) {
      if (this.engineGain && this.ctx) {
        this.engineGain.gain.setValueAtTime(this.engineGain.gain.value, this.ctx.currentTime);
        this.engineGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.engineOsc?.stop();
          this.engineOsc = null;
          this.isEngineRunning = false;
        }, 500);
      }
      return false;
    } else {
      const now = this.ctx.currentTime;
      this.engineOsc = this.ctx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      
      this.engineFilter = this.ctx.createBiquadFilter();
      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(120 + speedPercent * 3, now);

      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.001, now);
      this.engineGain.gain.linearRampToValueAtTime(0.08, now + 0.5);

      this.engineOsc.frequency.setValueAtTime(35 + speedPercent * 0.8, now);

      this.engineOsc.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start(now);
      this.isEngineRunning = true;
      return true;
    }
  }

  public updateEngineRpm(speedPercent: number) {
    if (!this.ctx || !this.isEngineRunning || !this.engineOsc || !this.engineFilter) return;
    const now = this.ctx.currentTime;
    const targetFreq = 35 + (speedPercent * 0.65);
    const targetFilter = 120 + (speedPercent * 4.5);
    this.engineOsc.frequency.setTargetAtTime(targetFreq, now, 0.1);
    this.engineFilter.frequency.setTargetAtTime(targetFilter, now, 0.1);
  }
}

export const soundEngine = new SoundEngine();
