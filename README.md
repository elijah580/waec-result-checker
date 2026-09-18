# David Elijah

# RESULTCHECKER

RESULTCHECKER is a lightweight static web application for creating and printing WAEC-style result slips. It allows a candidate to enter their information, select a stream, add subjects and grades, and generate a polished result summary that can be printed or saved.

## Features

- Stream selection: Science, Arts, and Commercial
- Candidate information form with validation
- Dynamic subject entry and grade selection
- Result slip generation with summary details
- Print-friendly output for saving or printing results
- Responsive styling for a clean, modern result page

## Project Overview

This project is built using plain HTML, CSS, and JavaScript, so it does not require a backend or package installation. It is designed to be simple to run locally and easy to customize.

## Project Structure

- `index.html` – main entry page
- `result-page.html` – result builder and generated slip page
- `waec-design-1-working.html` – home layout / landing screen
- `css/` – all stylesheet files
- `js/` – JavaScript logic for interactivity and form handling

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Getting Started

### Option 1: Open directly in the browser

You can open the HTML files directly in a browser, but using a local web server is recommended.

### Option 2: Run a local server

From the project folder, run:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## How to Use

1. Open the project in a browser.
2. Navigate to the result builder page.
3. Enter the candidate details.
4. Choose the appropriate stream.
5. Add or edit subject names and grades.
6. Click "Generate Result Slip".
7. Review the generated output and use the print option if needed.

## Development Notes

- The logic for generating the slip is handled in `js/result-page.js`.
- Styling is defined in the CSS files inside the `css/` folder.
- The project is ideal for quick front-end demos, portfolio work, and educational result-builder prototypes.

## Customization

You can easily adjust:

- color theme and layout in the CSS files
- default subjects and grades in the JavaScript stream data
- validation messages and form labels in the HTML and JavaScript

## License

This project is intended for educational and demonstration purposes. If you are using it for a personal or commercial project, confirm the licensing requirements before deployment.

## Author

David Elijah

## Contact

- 08153011613
- 08055732902

## License

MIT

## GitHub

github.com/DavidElijah

Built for a WAEC-style result checker interface.
