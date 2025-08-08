# AI Security Checklist

Comprehensive OWASP-based security checklist for AI systems with 65+ controls, 20+ test prompts, and interactive UI.

## Quick Start

Run locally:
```bash
./launch.sh
```

Or manually:
```bash
python3 -m http.server 8000
# Open: http://localhost:8000/index.html
```

## Features

- 65+ security checklist items across 6 categories
- 100+ security test prompts with bypass techniques
- 25 AI threat categories (T1-T25) 
- Dark/light theme toggle
- Export progress (JSON, CSV, Markdown)
- Interactive UI with animations
- Dedicated prompts and standards pages
- NIST, ISO, and industry framework alignment

## Usage

**Security Testing (Defensive Only)**
1. Navigate to "Prompt Examples" 
2. Copy test prompts
3. Test on authorized systems only
4. Document findings
5. Export progress reports

## File Structure
```
├── index.html  # Main application
├── prompts.html                # 100+ security testing prompts
├── standards.html              # NIST, ISO, industry frameworks
├── launch.sh                   # Launch script
├── red_team_prompts.txt       # Prompt collection
└── README.md                  # This file
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Responsible Use

✅ **Allowed:** Testing your own systems, defensive research, authorized testing  
❌ **Prohibited:** Unauthorized testing, malicious attacks