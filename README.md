# EuropeHUB AI Security CTF

EuropeHUB AI CTF is an educational platform designed to demonstrate and test the security of Large Language Models (LLMs). It challenges participants to identify and exploit vulnerabilities such as prompt injection and data poisoning in a safe, controlled environment. I developed this platform for the AI Security Workshop I ran in Venice, Italy, this event was organized by YourEuropeHUB.

## Prerequisites

*   **Docker** installed on your machine.
*   **8GB+ RAM** available (required to run the 1B parameter AI model).

## Quick Start (Run with Docker)

You can run the entire platform (Frontend, Backend, and AI Model) with a single command.

### 1. Run the Container
```bash
docker run -p 8080:8080 firdeusdikellari/europehub-ctf:latest
```
*Make sure to pull the latest image if updating.*

> **Note**: On the very first run, the container will download the `gemma3:1b` model (approx. 1-2GB). Please be patient; the platform is ready when you see "Services started. CTF is ready." in the logs.

### 2. Access the Platform
Open your browser and navigate to:
[http://localhost:8080](http://localhost:8080)

### 3. Stop the Container
To stop the CTF, simply press `Ctrl+C` in your terminal or run:
```bash
docker stop <container-id>
```

## Build from Source (GitHub)

If you have cloned the repository from GitHub and want to build the image locally:

### 1. Build the Docker Image
```bash
docker build -t europehub-ctf .
```

### 2. Run the Container
```bash
docker run -p 8080:8080 europehub-ctf
```
*(The initial run will download the AI model, which may take a few minutes)*

## Features

### Downloadable Dataset
For the **Data Poisoning** challenges, a base dataset (`dataset.csv`) is provided directly within the platform.
*   Navigate to Data Poisoning Challenge 1 or 2.
*   Click the **"Download Base Dataset (CSV)"** button.
*   Start your poisoning attack using this file!

*Dataset based on the SMS Spam Collection (UCI Machine Learning Repository).*

---
**Disclaimer**: This project is for educational purposes only. The vulnerabilities demonstrated here are real; use this knowledge to defend legitimate systems.
