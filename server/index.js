// server/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

const problems = [
  {
    id: "rc-timer",
    title: "RC Discharge Timer",
    description: "Challenge:\nProgram the LED to blink at a delay determined by the RC discharge time. The RC circuit charges and discharges a capacitor, and the LED should toggle based on the capacitor's voltage crossing a threshold (use analogRead()).",
    hint: "Use an RC circuit where a capacitor discharges through a resistor. Monitor the voltage across the capacitor using analogRead(), and toggle the LED when it falls below a set threshold. Remember V(t) = V₀ * e^(-t/RC).",
    // diagram: "http://localhost:4000/images/rc_timer.jpg",
      simulationLink: "https://wokwi.com/projects/new/blank"
  },
  {
    id: "rlc-filter",
    title: "RLC Filter Audio Player",
    description: "Challenge:\nGenerate audio tones using PWM output and filter them with an RLC circuit to produce smooth analog signals. Demonstrates filtering and PWM techniques.",
    hint: "Use PWM to generate audio tones, and filter them with an RLC circuit to produce smooth analog signals. The filter's cutoff frequency should be set to the desired audio frequency.",
    // diagram: "http://localhost:4000/images/rlc_filter.jpg",
    simulationLink: "https://wokwi.com/projects/new/blank"
  },
  {
    id: "power-meter",
    title: "Power Meter Display",
    description: "Challenge:\nSense voltage and current using sensors, calculate power factor, and display the results. Involves sensor interfacing and power factor calculation.",
    hint: "Use a voltage divider to sense voltage, and a current transformer to sense current. Calculate power factor using the voltage and current readings.",
    // diagram: "http://localhost:4000/images/power_meter.jpg",
    simulationLink: "https://wokwi.com/projects/new/blank"
  },
  {
    id: "three-phase-led",
    title: "Three-Phase LED Sequencer",
    description: "Challenge:\nSimulate three-phase electrical logic by sequencing LEDs with appropriate phase angles. Demonstrates phase angle logic and timing.",
    hint: "Use three LEDs and a resistor to simulate three-phase electrical logic. Sequence the LEDs with appropriate phase angles to create a three-phase pattern.",
    // diagram: "http://localhost:4000/images/three_phase_led.jpg",
    simulationLink: "https://wokwi.com/projects/new/blank"
  },
  {
    id: "audio-crossover",
    title: "Audio Crossover Tuning",
    description: "Challenge:\nUse a serial interface to adjust RC values in an audio crossover circuit, allowing real-time analog tuning of filter characteristics.",
    hint: "Use a serial interface to adjust RC values in an audio crossover circuit. The filter's cutoff frequency should be set to the desired audio frequency.",
    // diagram: "http://localhost:4000/images/audio_crossover.jpg",
    simulationLink: "https://wokwi.com/projects/new/blank"
  },
  {
    id: "psu-status-monitor",
    title: "PSU Status Monitor",
    description: "Challenge:\nMonitor power supply voltage and display a transient flag when voltage fluctuations or transients are detected. Demonstrates transient detection and debouncing.",
    hint: "Use a voltage divider to sense voltage, and a comparator to detect voltage fluctuations. Display a transient flag when voltage fluctuations or transients are detected.",
    //  diagram: "http://localhost:4000/images/psu_status_monitor.jpg",
    simulationLink: "https://wokwi.com/projects/new/blank"
  }
];

app.get("/api/problems", (req, res) => {
  res.json(problems);
});

app.get("/api/problems/:id", (req, res) => {
  const problem = problems.find(p => p.id === req.params.id);
  res.json(problem);
});

app.use("/images", express.static("images"));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
// Add a root endpoint for health check and helpful info
app.get("/", (req, res) => {
  res.send("EE Circuit Platform API is running. Try /api/problems");
});

// Handle 404 for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Handle 404 for all other routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});
