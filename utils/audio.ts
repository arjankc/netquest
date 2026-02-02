// Simple audio synthesizer to avoid external asset dependencies and ensure offline functionality
class AudioController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }

  toggle(on: boolean) {
    this.enabled = on;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    if (!this.ctx || !this.enabled) return;
    
    // Resume context if suspended (browser policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playCorrect() {
    // High major arpeggio
    this.playTone(523.25, 'sine', 0.1); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.1), 100); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.4), 200); // G5
  }

  playIncorrect() {
    // Low dissonant tone
    this.playTone(150, 'sawtooth', 0.4, 0.2);
    setTimeout(() => this.playTone(110, 'sawtooth', 0.4, 0.2), 150);
  }

  playClick() {
    this.playTone(800, 'triangle', 0.05, 0.05);
  }

  playTurnChange() {
    this.playTone(440, 'sine', 0.3);
  }
}

export const gameAudio = new AudioController();