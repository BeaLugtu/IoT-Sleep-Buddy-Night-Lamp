# IoT "Sleep Buddy" Night Lamp

## Project Overview:
The IoT "Sleep Buddy" Night Lamp aims to create a comfortable and personalized sleep environment by adjusting the light color and brightness based on the user’s bedtime schedule. The lamp can either be manually controlled or adjust dynamically based on the system time. This project is designed to improve sleep quality and can also act as a gentle wake-up light.

---

### 1. Intro: Build a Basic UI for Web App
Start by creating the UI for the web app. The user interface should be intuitive, enabling the user to set sleep schedules, customize light colors, and toggle between manual and automatic modes.

**Key features of the UI:**
- **Sleep Schedule**: A form to select the preferred sleep time and wake-up time.
- **Color Picker**: To choose the light color or select from presets.
- **Brightness Control**: Adjust the brightness for night and morning settings.
- **Manual/Automatic Toggle**: Switch between manual mode (where the user controls the light) and automatic mode (based on time and schedule).
- **Sunrise Mode**: Option to enable a gradual light increase in the morning.

---

### 2. Web App Tech Stack
- **Frontend**: HTML, CSS, JavaScript (use libraries like React.js or Vue.js if you want to build a more dynamic app).
- **Backend**: PHP (or Node.js) to handle requests, interface with the Arduino via API or cloud.
- **Communication Protocol**: Use HTTP or WebSocket for real-time communication between the web app and Arduino.

---

### 3. Hardware Setup

#### 3.1 Microcontroller (for controlling the lamp)
- **Arduino Uno or ESP32/ESP8266**:
  - Use Arduino Uno for a simple setup, but if you want Wi-Fi connectivity for remote control, go for the ESP8266 or ESP32. These microcontrollers will interact with your web app via an API (HTTP requests).
  - ESP8266/ESP32 will connect to Wi-Fi and receive commands from the web app to control the LED light.

#### 3.2 LED Lighting (for the lamp)
- **Basic Setup**:
  - **Single-Color LEDs**: For initial testing and prototyping, use simple 5mm or 10mm LEDs.
  - **RGB LED Strips (WS2812B)**: For final deployment, use RGB LED strips, which allow for dynamic color changes. The WS2812B LEDs are addressable, meaning each LED can be individually controlled for color effects.

#### 3.3 Power Supply
- **5V USB Adapter**: This will power the Arduino board and smaller LEDs for testing.
- **12V Adapter (for LED strips)**: If you're using higher-power LEDs, such as 12V RGB LED strips, you’ll need a compatible power supply for both the microcontroller and LEDs.

#### 3.4 Additional Components
- **Resistors**: Depending on the type of LEDs you're using, you'll need the appropriate resistors to protect the LEDs from excessive current.
- **Transistor (for controlling high-power LEDs)**: If you're using a high-power LED setup, a transistor (like MOSFET) will be needed to control the current to the LEDs.
- **Capacitors**: For smoothing voltage fluctuations, especially for larger LED setups.
- **Jumper Wires**: To connect your Arduino with the LEDs, switches, and sensors.
- **Breadboard**: For prototyping before moving to a final design.
- **Push buttons/sensors (Optional)**: For manual control if you want to add more interaction to your lamp setup.

#### 3.5 Housing/Enclosure (OPTIONAL)
- **Prototype Stage**: Use simple materials like cardboard, plastic, or 3D printed parts to create the structure of your lamp.
- **Final Design**: Consider a more durable and aesthetically pleasing housing, such as wooden, acrylic, or plastic enclosures for the lamp body.

---

### 4. How It Works

#### 4.1 Setting Up the Web App:
- **Web App UI**: Built using HTML, CSS, and JavaScript, the app allows users to:
  - Set their preferred sleep/wake times.
  - Choose light colors and brightness for night and morning.
  - Toggle between manual and automatic modes.

#### Real-Time Communication:
- Use **WebSockets** or **HTTP requests** to communicate between the web app and Arduino.
- The Arduino listens for commands via Wi-Fi (using ESP8266/ESP32).

#### 4.2 Arduino Code:
- Program the Arduino to receive inputs from the web app, process those inputs, and control the RGB LEDs based on the data received.
- Use **PWM (Pulse Width Modulation)** for smooth control over the light brightness.
- Use **HTTP requests** or **WebSockets** for the Arduino to receive commands for color, brightness, and mode.

Here's an example of Arduino code to send data to a web app hosted on **Vercel**:

```cpp
#include <ESP8266WiFi.h>
#include <HTTPClient.h>

const char* ssid = "your-SSID";
const char* password = "your-password";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi Connected");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("https://your-app.vercel.app/api/data");
    http.addHeader("Content-Type", "application/json");

    String data = "{\"temperature\": 25.0}";
    int httpCode = http.POST(data);

    if (httpCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    }
    http.end();
  }
  delay(10000);  // Wait for 10 seconds before sending the next request
}
